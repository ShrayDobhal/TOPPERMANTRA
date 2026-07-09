-- ==============================================================================================
-- TOPPER MANTRA — CANONICAL SCHEMA
-- supabase/migrations/20260709000000_canonical_schema.sql
--
-- This is the SINGLE SOURCE OF TRUTH for the database schema.
-- It merges all previous divergent schema files into one canonical migration.
-- ==============================================================================================

-- 0. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Custom types
CREATE TYPE project_status AS ENUM ('Planning', 'Active', 'Completed', 'Paused');
CREATE TYPE task_status AS ENUM ('Backlog', 'In Progress', 'In Review', 'Completed');
CREATE TYPE application_status AS ENUM ('Saved', 'Applied', 'Interview', 'Shortlisted', 'Rejected', 'Offer');
CREATE TYPE user_role AS ENUM ('Student', 'Mentor', 'Admin');

-- ==============================================================================================
-- 2. CORE — Profiles (extends Supabase Auth)
-- ==============================================================================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  role user_role DEFAULT 'Student',
  bio TEXT,
  college TEXT,
  branch TEXT,
  year TEXT,
  career_goal TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  contribution_score INT DEFAULT 0,
  streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  freeze_until TIMESTAMPTZ,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ==============================================================================================
-- 3. PROJECTS MODULE
-- ==============================================================================================
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  domain TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  status project_status DEFAULT 'Planning',
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  github_url TEXT,
  live_url TEXT,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projects are viewable by everyone."
  ON public.projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create projects."
  ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Creators can update their projects."
  ON public.projects FOR UPDATE
  USING (auth.uid() = creator_id)
  WITH CHECK (creator_id = auth.uid());

-- 3.1 Project Tasks (Subparts)
CREATE TABLE public.project_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT,
  estimated_hours INT,
  xp_reward INT DEFAULT 100,
  status task_status DEFAULT 'Backlog',
  assignee_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  claimed_at TIMESTAMPTZ,
  last_submission_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tasks viewable by everyone."
  ON public.project_tasks FOR SELECT USING (true);
-- NOTE: Direct UPDATE is restricted to current assignees updating their own tasks
-- (e.g. submitting for review). Claiming is done via the claim_task() RPC function.
CREATE POLICY "Assignees can update own claimed tasks."
  ON public.project_tasks FOR UPDATE
  USING (auth.uid() = assignee_id)
  WITH CHECK (assignee_id = auth.uid());

-- Max 2 active tasks enforcement trigger
CREATE OR REPLACE FUNCTION check_max_tasks()
RETURNS TRIGGER AS $$
DECLARE
  active_task_count INT;
BEGIN
  IF NEW.assignee_id IS NOT NULL THEN
    SELECT count(*) INTO active_task_count
    FROM public.project_tasks
    WHERE assignee_id = NEW.assignee_id
      AND status IN ('In Progress', 'In Review');

    IF active_task_count >= 2 THEN
      RAISE EXCEPTION 'You cannot claim more than 2 tasks at the same time to prevent hoarding.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_max_tasks ON public.project_tasks;
CREATE TRIGGER enforce_max_tasks
  BEFORE UPDATE ON public.project_tasks
  FOR EACH ROW
  WHEN (NEW.assignee_id IS NOT NULL AND OLD.assignee_id IS DISTINCT FROM NEW.assignee_id)
  EXECUTE PROCEDURE check_max_tasks();

-- ======================================================================
-- SECURITY DEFINER: claim_task(task_id uuid)
-- Safely handles claiming an unassigned task. RLS on project_tasks
-- blocks direct .update() because assignee_id IS NULL doesn't match
-- USING (auth.uid() = assignee_id). This function bypasses RLS
-- while enforcing the max-2-tasks rule server-side.
-- ======================================================================
CREATE OR REPLACE FUNCTION public.claim_task(p_task_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_task RECORD;
  v_active_count INT;
BEGIN
  -- 1. Get the authenticated user
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Not authenticated');
  END IF;

  -- 2. Lock and fetch the target task
  SELECT * INTO v_task
  FROM public.project_tasks
  WHERE id = p_task_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Task not found');
  END IF;

  IF v_task.status != 'Backlog' OR v_task.assignee_id IS NOT NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Task is not available for claiming');
  END IF;

  -- 3. Enforce max-2-tasks rule
  SELECT count(*) INTO v_active_count
  FROM public.project_tasks
  WHERE assignee_id = v_user_id
    AND status IN ('In Progress', 'In Review');

  IF v_active_count >= 2 THEN
    RETURN jsonb_build_object('success', false, 'error', 'You cannot claim more than 2 tasks at the same time');
  END IF;

  -- 4. Claim the task
  UPDATE public.project_tasks
  SET assignee_id = v_user_id,
      status = 'In Progress',
      claimed_at = NOW(),
      last_submission_at = NOW()
  WHERE id = p_task_id;

  RETURN jsonb_build_object('success', true, 'task_id', p_task_id);
END;
$$;

-- 3.2 Task Aid Requests (Intelligent Doubt System)
CREATE TABLE public.task_aid_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_task_id UUID REFERENCES public.project_tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  request_type TEXT NOT NULL CHECK (request_type IN ('video', 'code')),
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.task_aid_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Aid requests viewable by everyone."
  ON public.task_aid_requests FOR SELECT USING (true);
CREATE POLICY "Users can create their own aid requests."
  ON public.task_aid_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3.3 Task Submissions
CREATE TABLE public.task_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_task_id UUID REFERENCES public.project_tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  code_url TEXT,
  demo_url TEXT,
  mentor_feedback TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.task_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Submissions viewable by everyone."
  ON public.task_submissions FOR SELECT USING (true);
CREATE POLICY "Users can submit own tasks."
  ON public.task_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3.4 Task Waitlist
CREATE TABLE public.task_waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_task_id UUID REFERENCES public.project_tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_task_id, user_id)
);

ALTER TABLE public.task_waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Waitlist viewable by everyone."
  ON public.task_waitlist FOR SELECT USING (true);
CREATE POLICY "Users can join waitlist."
  ON public.task_waitlist FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==============================================================================================
-- 4. OPPORTUNITIES MODULE (Discover Hub)
-- ==============================================================================================
CREATE TABLE public.opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  logo_url TEXT,
  location TEXT,
  type TEXT NOT NULL,
  workplace_type TEXT,
  paid_status TEXT,
  stipend TEXT,
  duration TEXT,
  deadline TIMESTAMPTZ,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Opportunities are viewable by everyone."
  ON public.opportunities FOR SELECT USING (true);

-- 4.1 Applications (Application Tracker)
CREATE TABLE public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
  status application_status DEFAULT 'Saved',
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, opportunity_id)
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own applications."
  ON public.applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own applications."
  ON public.applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own applications."
  ON public.applications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (user_id = auth.uid());

-- ==============================================================================================
-- 5. COHORTS MODULE
-- ==============================================================================================
CREATE TABLE public.cohorts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  branch TEXT NOT NULL,
  mentor_id UUID REFERENCES public.profiles(id),
  max_size INT DEFAULT 50,
  current_week INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cohorts viewable by everyone."
  ON public.cohorts FOR SELECT USING (true);

-- 5.1 Cohort Members
CREATE TABLE public.cohort_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cohort_id UUID REFERENCES public.cohorts(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active',
  last_participation_at TIMESTAMPTZ DEFAULT NOW(),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(cohort_id, student_id)
);

ALTER TABLE public.cohort_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members viewable by everyone."
  ON public.cohort_members FOR SELECT USING (true);

-- 5.2 Cohort Challenges (Weekly Mastery Challenge)
CREATE TABLE public.cohort_challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cohort_id UUID REFERENCES public.cohorts(id) ON DELETE CASCADE,
  mentor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  week_number INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cohort_challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Challenges viewable by cohort members."
  ON public.cohort_challenges FOR SELECT USING (true);

-- 5.3 Cohort Challenge Responses
CREATE TABLE public.cohort_challenge_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID REFERENCES public.cohort_challenges(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvotes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cohort_challenge_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Responses viewable by everyone."
  ON public.cohort_challenge_responses FOR SELECT USING (true);
CREATE POLICY "Students can insert responses."
  ON public.cohort_challenge_responses FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Response owner can update."
  ON public.cohort_challenge_responses FOR UPDATE
  USING (auth.uid() = student_id)
  WITH CHECK (student_id = auth.uid());

-- 5.4 Cohort Messages (Mentor Rooms)
CREATE TABLE public.cohort_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cohort_id UUID REFERENCES public.cohorts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cohort_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Messages viewable by cohort members."
  ON public.cohort_messages FOR SELECT USING (true);
CREATE POLICY "Members can insert messages."
  ON public.cohort_messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==============================================================================================
-- 6. COMMUNITY HUB MODULE
-- ==============================================================================================
CREATE TABLE public.channels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'branch',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Hub viewable by everyone"
  ON public.channels FOR SELECT USING (true);

-- 6.1 Hub Posts
CREATE TABLE public.hub_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID REFERENCES public.channels(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  upvotes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.hub_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts viewable by everyone"
  ON public.hub_posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts"
  ON public.hub_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own posts"
  ON public.hub_posts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (user_id = auth.uid());

-- Hub rate limiting trigger (anti-spam)
CREATE OR REPLACE FUNCTION check_hub_rate_limit()
RETURNS TRIGGER AS $$
DECLARE
  daily_posts INT;
  user_score INT;
BEGIN
  SELECT contribution_score INTO user_score FROM public.profiles WHERE id = NEW.user_id;

  IF user_score < 50 THEN
    SELECT count(*) INTO daily_posts
    FROM public.hub_posts
    WHERE user_id = NEW.user_id
      AND created_at >= NOW() - INTERVAL '1 day';

    IF daily_posts >= 3 THEN
      RAISE EXCEPTION 'Rate limit exceeded: Level 1 students can only post 3 questions per day.';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_hub_rate_limit ON public.hub_posts;
CREATE TRIGGER enforce_hub_rate_limit
  BEFORE INSERT ON public.hub_posts
  FOR EACH ROW
  EXECUTE PROCEDURE check_hub_rate_limit();

-- 6.2 Hub Comments
CREATE TABLE public.hub_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.hub_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvotes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.hub_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comments viewable by everyone"
  ON public.hub_comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments"
  ON public.hub_comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ==============================================================================================
-- 7. GAMIFICATION MODULE
-- ==============================================================================================
CREATE TABLE public.badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  criteria_type TEXT NOT NULL,
  threshold INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Badges viewable by everyone"
  ON public.badges FOR SELECT USING (true);

CREATE TABLE public.user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User Badges viewable by everyone"
  ON public.user_badges FOR SELECT USING (true);

-- ==============================================================================================
-- 8. ACTIVITY LOGS TABLE (referenced by custodian-bot and frontend useStudentStore)
-- ==============================================================================================
CREATE TABLE public.activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  entity_id UUID,
  entity_name TEXT,
  xp_earned INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own activity."
  ON public.activity_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert activity logs."
  ON public.activity_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ==============================================================================================
-- 9. REALTIME PUBLICATION
-- ==============================================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.applications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.hub_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cohort_messages;

-- ==============================================================================================
-- 10. AUTO-CREATE PROFILE ON SIGNUP
-- ==============================================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==============================================================================================
-- 11. CUSTODIAN BOT SCHEDULER (pg_cron)
-- ==============================================================================================
CREATE EXTENSION IF NOT EXISTS pg_net;
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- ⚠️ IMPORTANT: Store anon key in Vault FIRST. See README or Phase 1 audit.
--   SELECT vault.create_secret('<KEY>', 'supabase_anon_key', 'Anon key for pg_cron');
--   ALTER DATABASE postgres SET app.settings.supabase_url = 'https://<ref>.supabase.co';

SELECT cron.schedule(
  'invoke-custodian-bot',
  '0 2 * * *',
  $$
  SELECT net.http_post(
      url := current_setting('app.settings.supabase_url', true) || '/functions/v1/custodian-bot',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || (
          SELECT decrypted_secret FROM vault.decrypted_secrets
          WHERE name = 'supabase_anon_key' LIMIT 1
        )
      )
  ) AS request_id;
  $$
);

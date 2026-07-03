-- TOPPER MANTRA SUPABASE SCHEMA

-- 0. Clean up existing tables and types to prevent "already exists" errors
DROP TABLE IF EXISTS public.applications CASCADE;
DROP TABLE IF EXISTS public.opportunities CASCADE;
DROP TABLE IF EXISTS public.project_tasks CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.cohort_members CASCADE;
DROP TABLE IF EXISTS public.cohorts CASCADE;
DROP TABLE IF EXISTS public.user_badges CASCADE;
DROP TABLE IF EXISTS public.badges CASCADE;
DROP TABLE IF EXISTS public.hub_comments CASCADE;
DROP TABLE IF EXISTS public.hub_posts CASCADE;
DROP TABLE IF EXISTS public.channels CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

DROP TYPE IF EXISTS project_status CASCADE;
DROP TYPE IF EXISTS task_status CASCADE;
DROP TYPE IF EXISTS application_status CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;
-- 1. Create custom types
CREATE TYPE project_status AS ENUM ('Planning', 'Active', 'Completed', 'Paused');
CREATE TYPE task_status AS ENUM ('Backlog', 'In Progress', 'In Review', 'Completed');
CREATE TYPE application_status AS ENUM ('Saved', 'Applied', 'Interview', 'Shortlisted', 'Rejected', 'Offer');
CREATE TYPE user_role AS ENUM ('Student', 'Mentor', 'Admin');

-- 2. Create Profiles Table (extends Supabase Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  role user_role DEFAULT 'Student',
  bio TEXT,
  college TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  contribution_score INT DEFAULT 0,
  streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active', -- active, yellow, red, removed
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for Profiles
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 3. Create Projects Table
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
  last_activity_at TIMESTAMPTZ DEFAULT NOW(), -- Used by Custodian Bot to archive dead projects
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.5 Create Project Tasks Table (Subparts)
CREATE TABLE public.project_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status task_status DEFAULT 'Backlog',
  assignee_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  claimed_at TIMESTAMPTZ,
  last_submission_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tasks viewable by everyone." ON public.project_tasks FOR SELECT USING (true);
CREATE POLICY "Users can claim up to 2 tasks." ON public.project_tasks FOR UPDATE USING (auth.uid() = assignee_id);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projects are viewable by everyone." ON public.projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create projects." ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Creators can update their projects." ON public.projects FOR UPDATE USING (auth.uid() = creator_id);

-- 4. Create Opportunities Table (For Discover Hub)
CREATE TABLE public.opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  logo_url TEXT,
  location TEXT,
  type TEXT NOT NULL, -- Internship, Hackathon, etc.
  workplace_type TEXT, -- Remote, Hybrid
  paid_status TEXT, -- Paid, Unpaid
  stipend TEXT,
  duration TEXT,
  deadline TIMESTAMPTZ,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Opportunities are viewable by everyone." ON public.opportunities FOR SELECT USING (true);

-- 5. Create Applications Table (For Application Tracker)
CREATE TABLE public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
  status application_status DEFAULT 'Saved',
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, opportunity_id)
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own applications." ON public.applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own applications." ON public.applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own applications." ON public.applications FOR UPDATE USING (auth.uid() = user_id);

-- 6. Create Cohorts Table
CREATE TABLE public.cohorts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  branch TEXT NOT NULL,
  mentor_id UUID REFERENCES public.profiles(id),
  max_size INT DEFAULT 50,
  current_week INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Create Cohort Members Table
CREATE TABLE public.cohort_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cohort_id UUID REFERENCES public.cohorts(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active', -- active, yellow, red, removed
  last_participation_at TIMESTAMPTZ DEFAULT NOW(),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(cohort_id, student_id)
);

ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cohort_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cohorts viewable by everyone." ON public.cohorts FOR SELECT USING (true);
CREATE POLICY "Members viewable by everyone." ON public.cohort_members FOR SELECT USING (true);

-- 8. Create Community Hub Tables
CREATE TABLE public.channels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'branch', -- branch, global
  created_at TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE TABLE public.hub_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.hub_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvotes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Create Gamification Tables
CREATE TABLE public.badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  criteria_type TEXT NOT NULL,
  threshold INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hub_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hub_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hub viewable by everyone" ON public.channels FOR SELECT USING (true);
CREATE POLICY "Posts viewable by everyone" ON public.hub_posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON public.hub_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own posts" ON public.hub_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Comments viewable by everyone" ON public.hub_comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON public.hub_comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Badges viewable by everyone" ON public.badges FOR SELECT USING (true);
CREATE POLICY "User Badges viewable by everyone" ON public.user_badges FOR SELECT USING (true);

-- Set up Realtime
alter publication supabase_realtime add table public.projects;
alter publication supabase_realtime add table public.applications;
alter publication supabase_realtime add table public.hub_posts;

-- 10. Automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

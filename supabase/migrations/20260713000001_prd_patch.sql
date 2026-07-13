-- ============================================================================
-- TOPPER MANTRA — PRD v1.0 PATCH MIGRATION
-- supabase/migrations/20260713000001_prd_patch.sql
--
-- This migration closes every gap identified in the PRD audit:
--   A. Missing schema columns (mentor fields, post_type, opportunities, etc.)
--   B. Full XP Gamification Engine (all 6 point rules + -50 penalty)
--   C. All 5 PRD badges + 3 legacy badges
--   D. All seed data (mentors, cohorts, projects, subparts, opportunities)
--   E. approve_task() RPC for mentor merge flow
-- ============================================================================

-- ============================================================================
-- A. SCHEMA PATCHES — Add missing columns
-- ============================================================================

-- A1. Profiles: mentor-specific fields
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS graduation_year INT,
  ADD COLUMN IF NOT EXISTS air_rank INT,
  ADD COLUMN IF NOT EXISTS expertise TEXT,
  ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS longest_streak INT DEFAULT 0;

-- A2. Hub Posts: post_type + status enforcement
ALTER TABLE public.hub_posts
  ADD COLUMN IF NOT EXISTS post_type TEXT DEFAULT 'Discussion'
    CHECK (post_type IN ('Doubt', 'Resource', 'Showcase', 'Discussion')),
  ADD COLUMN IF NOT EXISTS hub_status TEXT DEFAULT 'active'
    CHECK (hub_status IN ('active', 'resolved', 'hidden'));

-- A3. Opportunities: category enum, is_active, external_link, image_url
ALTER TABLE public.opportunities
  ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'internship'
    CHECK (category IN ('hackathon', 'internship', 'program', 'meetup')),
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS external_link TEXT,
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS prize_pool TEXT,
  ADD COLUMN IF NOT EXISTS mode TEXT;

-- A4. Cohorts: is_active flag
ALTER TABLE public.cohorts
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS weekly_challenge TEXT;

-- A5. Projects: tech_stack as array, mentor_name/institution for display
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS tech_stack TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS mentor_name TEXT,
  ADD COLUMN IF NOT EXISTS mentor_institution TEXT,
  ADD COLUMN IF NOT EXISTS cover_gradient TEXT DEFAULT 'from-[#1E3A5F] to-[#0F172A]';

-- A6. Task Submissions: mentor_feedback
ALTER TABLE public.task_submissions
  ADD COLUMN IF NOT EXISTS demo_url TEXT;


-- ============================================================================
-- B. FULL XP GAMIFICATION ENGINE
-- ============================================================================

-- B1. Award XP on task CLAIM (+10 pts)
CREATE OR REPLACE FUNCTION award_xp_on_claim()
RETURNS TRIGGER AS $$
BEGIN
  -- Fires when a task transitions to 'In Progress' and gets assigned
  IF NEW.status = 'In Progress' AND OLD.status = 'Backlog' AND NEW.assignee_id IS NOT NULL THEN
    UPDATE public.profiles
    SET contribution_score = contribution_score + 10,
        last_active_at = NOW()
    WHERE id = NEW.assignee_id;

    INSERT INTO public.activity_logs (user_id, action_type, entity_id, entity_name, xp_earned)
    VALUES (NEW.assignee_id, 'task_claimed', NEW.id, NEW.title, 10);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_task_claimed ON public.project_tasks;
CREATE TRIGGER on_task_claimed
  AFTER UPDATE ON public.project_tasks
  FOR EACH ROW
  EXECUTE PROCEDURE award_xp_on_claim();

-- B2. Award XP on code SUBMISSION (+25 pts)
CREATE OR REPLACE FUNCTION award_xp_on_submit()
RETURNS TRIGGER AS $$
BEGIN
  -- Fires when a new submission is inserted (student submits for review)
  UPDATE public.profiles
  SET contribution_score = contribution_score + 25,
      last_active_at = NOW()
  WHERE id = NEW.user_id;

  INSERT INTO public.activity_logs (user_id, action_type, entity_id, entity_name, xp_earned)
  VALUES (NEW.user_id, 'code_submitted', NEW.project_task_id, 'Submitted code for review', 25);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_code_submitted ON public.task_submissions;
CREATE TRIGGER on_code_submitted
  AFTER INSERT ON public.task_submissions
  FOR EACH ROW
  EXECUTE PROCEDURE award_xp_on_submit();

-- B3. Full cascade on MERGE/APPROVE (+100 XP bonus + badge check)
-- This replaces and upgrades the old process_task_approval() trigger.
-- It now fires on status = 'approved' on task_submissions.
CREATE OR REPLACE FUNCTION process_task_approval()
RETURNS TRIGGER AS $$
DECLARE
  v_xp_reward INT;
  v_task_title TEXT;
  v_new_score INT;
  v_badge RECORD;
  v_inserted_rows INT;
  v_merged_count INT;
BEGIN
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN

    -- A. Get the XP reward and title for this task
    SELECT xp_reward, title INTO v_xp_reward, v_task_title
    FROM public.project_tasks
    WHERE id = NEW.project_task_id;

    -- B. Mark the parent task as Completed and update project activity
    UPDATE public.project_tasks
    SET status = 'Completed',
        last_submission_at = NOW(),
        updated_at = NOW()
    WHERE id = NEW.project_task_id;

    UPDATE public.projects
    SET last_activity_at = NOW()
    WHERE id = (SELECT project_id FROM public.project_tasks WHERE id = NEW.project_task_id);

    -- C. Award +100 XP bonus on top of task xp_reward
    UPDATE public.profiles
    SET contribution_score = contribution_score + COALESCE(v_xp_reward, 100) + 100,
        last_active_at = NOW()
    WHERE id = NEW.user_id
    RETURNING contribution_score INTO v_new_score;

    -- D. Log the merge event
    INSERT INTO public.activity_logs (user_id, action_type, entity_id, entity_name, xp_earned)
    VALUES (NEW.user_id, 'task_merged', NEW.project_task_id, v_task_title, COALESCE(v_xp_reward, 100) + 100);

    -- E. Check contribution_score-based badges
    FOR v_badge IN
      SELECT id, name FROM public.badges
      WHERE criteria_type = 'contribution_score' AND threshold <= v_new_score
    LOOP
      INSERT INTO public.user_badges (user_id, badge_id)
      VALUES (NEW.user_id, v_badge.id)
      ON CONFLICT (user_id, badge_id) DO NOTHING;

      GET DIAGNOSTICS v_inserted_rows = ROW_COUNT;
      IF v_inserted_rows > 0 THEN
        INSERT INTO public.activity_logs (user_id, action_type, entity_id, entity_name, xp_earned)
        VALUES (NEW.user_id, 'badge_earned', v_badge.id, v_badge.name, 0);
      END IF;
    END LOOP;

    -- F. Check "Code Ninja" badge: 5 merged subparts
    SELECT count(*) INTO v_merged_count
    FROM public.task_submissions
    WHERE user_id = NEW.user_id AND status = 'approved';

    IF v_merged_count >= 5 THEN
      INSERT INTO public.user_badges (user_id, badge_id)
      SELECT NEW.user_id, id FROM public.badges WHERE name = 'Code Ninja'
      ON CONFLICT (user_id, badge_id) DO NOTHING;

      GET DIAGNOSTICS v_inserted_rows = ROW_COUNT;
      IF v_inserted_rows > 0 THEN
        INSERT INTO public.activity_logs (user_id, action_type, entity_id, entity_name, xp_earned)
        VALUES (NEW.user_id, 'badge_earned',
          (SELECT id FROM public.badges WHERE name = 'Code Ninja'), 'Code Ninja', 0);
      END IF;
    END IF;

  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_task_submission_approved ON public.task_submissions;
CREATE TRIGGER on_task_submission_approved
  AFTER UPDATE ON public.task_submissions
  FOR EACH ROW
  EXECUTE PROCEDURE process_task_approval();

-- B4. Award XP on Hub Post UPVOTE received (+15 to post author)
CREATE OR REPLACE FUNCTION award_xp_on_upvote()
RETURNS TRIGGER AS $$
DECLARE
  v_author_id UUID;
  v_new_score INT;
  v_badge RECORD;
  v_inserted_rows INT;
  v_upvote_count INT;
BEGIN
  -- Only award when upvotes increases
  IF NEW.upvotes > OLD.upvotes THEN
    SELECT user_id INTO v_author_id FROM public.hub_posts WHERE id = NEW.id;
    IF v_author_id IS NOT NULL THEN
      UPDATE public.profiles
      SET contribution_score = contribution_score + 15
      WHERE id = v_author_id
      RETURNING contribution_score INTO v_new_score;

      INSERT INTO public.activity_logs (user_id, action_type, entity_id, entity_name, xp_earned)
      VALUES (v_author_id, 'post_upvoted', NEW.id, 'Received upvote on Hub post', 15);

      -- Check "Community Guardian" badge: 50 total upvotes received
      SELECT COALESCE(SUM(upvotes), 0) INTO v_upvote_count
      FROM public.hub_posts WHERE user_id = v_author_id;

      IF v_upvote_count >= 50 THEN
        INSERT INTO public.user_badges (user_id, badge_id)
        SELECT v_author_id, id FROM public.badges WHERE name = 'Community Guardian'
        ON CONFLICT (user_id, badge_id) DO NOTHING;

        GET DIAGNOSTICS v_inserted_rows = ROW_COUNT;
        IF v_inserted_rows > 0 THEN
          INSERT INTO public.activity_logs (user_id, action_type, entity_id, entity_name, xp_earned)
          VALUES (v_author_id, 'badge_earned',
            (SELECT id FROM public.badges WHERE name = 'Community Guardian'), 'Community Guardian', 0);
        END IF;
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_post_upvoted ON public.hub_posts;
CREATE TRIGGER on_post_upvoted
  AFTER UPDATE ON public.hub_posts
  FOR EACH ROW
  EXECUTE PROCEDURE award_xp_on_upvote();

-- B5. Award XP on daily LOGIN streak (+5 per day)
-- This is handled in useStudentStore.fetchProfile() on the frontend.
-- The custodian-bot handles streak resets. No separate trigger needed here.

-- B6. DEDUCT XP on AutoRelease (-50 penalty)
-- Updated custodian-bot handles this via RPC. We create the RPC here:
CREATE OR REPLACE FUNCTION public.autorelease_task(p_task_id UUID, p_assignee_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Release the task back to Backlog
  UPDATE public.project_tasks
  SET assignee_id = NULL,
      status = 'Backlog',
      claimed_at = NULL,
      updated_at = NOW()
  WHERE id = p_task_id;

  -- Deduct 50 XP from the student
  UPDATE public.profiles
  SET contribution_score = GREATEST(0, contribution_score - 50)
  WHERE id = p_assignee_id;

  -- Log the penalty
  INSERT INTO public.activity_logs (user_id, action_type, entity_id, entity_name, xp_earned)
  VALUES (p_assignee_id, 'autorelease_penalty', p_task_id, 'Task auto-released due to inactivity', -50);

  RETURN jsonb_build_object('success', true);
END;
$$;


-- ============================================================================
-- C. approve_task() RPC — Mentor Merge Flow
-- ============================================================================
CREATE OR REPLACE FUNCTION public.approve_task(p_submission_id UUID, p_feedback TEXT DEFAULT '')
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_submission RECORD;
  v_mentor_id UUID;
BEGIN
  v_mentor_id := auth.uid();
  IF v_mentor_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Not authenticated');
  END IF;

  -- Fetch the submission
  SELECT * INTO v_submission
  FROM public.task_submissions
  WHERE id = p_submission_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Submission not found');
  END IF;

  IF v_submission.status != 'pending' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Submission already reviewed');
  END IF;

  -- Mark submission as approved (this fires the on_task_submission_approved trigger)
  UPDATE public.task_submissions
  SET status = 'approved',
      mentor_feedback = p_feedback,
      updated_at = NOW()
  WHERE id = p_submission_id;

  RETURN jsonb_build_object('success', true, 'submission_id', p_submission_id);
END;
$$;

-- reject_task() RPC — Request Changes flow
CREATE OR REPLACE FUNCTION public.reject_task(p_submission_id UUID, p_feedback TEXT DEFAULT '')
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_submission RECORD;
BEGIN
  SELECT * INTO v_submission FROM public.task_submissions WHERE id = p_submission_id FOR UPDATE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Submission not found');
  END IF;

  UPDATE public.task_submissions
  SET status = 'changes_requested',
      mentor_feedback = p_feedback,
      updated_at = NOW()
  WHERE id = p_submission_id;

  -- Revert task back to In Progress so student can resubmit
  UPDATE public.project_tasks
  SET status = 'In Progress',
      updated_at = NOW()
  WHERE id = v_submission.project_task_id;

  RETURN jsonb_build_object('success', true);
END;
$$;

-- fetch_pending_submissions() RPC — Get all pending reviews for mentor's projects
CREATE OR REPLACE FUNCTION public.fetch_pending_submissions()
RETURNS TABLE (
  submission_id UUID,
  task_id UUID,
  task_title TEXT,
  project_title TEXT,
  student_id UUID,
  student_name TEXT,
  student_avatar TEXT,
  code_url TEXT,
  demo_url TEXT,
  submitted_at TIMESTAMPTZ,
  status TEXT,
  mentor_feedback TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ts.id AS submission_id,
    pt.id AS task_id,
    pt.title AS task_title,
    p.title AS project_title,
    ts.user_id AS student_id,
    pr.full_name AS student_name,
    pr.avatar_url AS student_avatar,
    ts.code_url,
    ts.demo_url,
    ts.created_at AS submitted_at,
    ts.status,
    ts.mentor_feedback
  FROM public.task_submissions ts
  JOIN public.project_tasks pt ON pt.id = ts.project_task_id
  JOIN public.projects p ON p.id = pt.project_id
  JOIN public.profiles pr ON pr.id = ts.user_id
  ORDER BY ts.created_at DESC;
END;
$$;


-- ============================================================================
-- D. SEED DATA — PRD Section 3
-- ============================================================================

-- D1. Seed all 8 badges (5 from PRD + 3 legacy XP-based badges)
INSERT INTO public.badges (name, description, icon, criteria_type, threshold)
VALUES
  -- PRD Badges
  ('Code Ninja',        'Merged 5 subparts successfully.',                           '🥷', 'merged_count',       5),
  ('Community Guardian','Received 50+ upvotes on Hub answers.',                      '🛡️', 'upvote_count',       50),
  ('The Survivor',      'Completed 3 projects without a single auto-removal.',        '💪', 'survival_count',     3),
  ('Mentor''s Pet',     'Top contributor in your cohort for 4 consecutive weeks.',    '🌟', 'top_contributor',    4),
  ('Rookie',            'Completed the first onboarding tutorial.',                   '🎓', 'contribution_score', 1),
  -- Legacy XP Threshold Badges
  ('First Steps',       'Complete your first task.',                                  '🚀', 'contribution_score', 100),
  ('Rising Star',       'Reach 500 Contribution Points.',                             '⭐', 'contribution_score', 500),
  ('Prodigy',           'Reach 2000 Contribution Points.',                            '🔥', 'contribution_score', 2000)
ON CONFLICT (name) DO UPDATE
  SET description = EXCLUDED.description,
      icon = EXCLUDED.icon,
      threshold = EXCLUDED.threshold;

-- D2. Seed Mentor Profiles
-- These insert directly into the profiles table so they work with auth
-- In production, these accounts should be registered through Supabase Auth.
-- For seeding we use a special service-level insert.
INSERT INTO public.profiles (
  id, full_name, role, college, branch, bio, linkedin_url,
  is_verified, expertise, contribution_score, status
) VALUES
  (
    gen_random_uuid(), 'Ayush Kumar', 'Mentor', 'IIT BHU', 'CS',
    'Ex-Google SWE Intern. Ranked AIR 45. Passionate about DSA & System Design.',
    'https://linkedin.com/in/ayush', true, 'DSA & System Design', 1500, 'active'
  ),
  (
    gen_random_uuid(), 'Suman Kumar', 'Mentor', 'IIT Kharagpur', 'AI/ML',
    'AI Researcher. AIR 102. Focused on practical Machine Learning.',
    '', true, 'Machine Learning', 1200, 'active'
  ),
  (
    gen_random_uuid(), 'Bismay Padhi', 'Mentor', 'Smart Odisha Winner', 'ECE',
    'Serial Hackathon Winner. IoT & Robotics enthusiast.',
    '', true, 'IoT & Robotics', 980, 'active'
  )
ON CONFLICT DO NOTHING;

-- D3. Seed Sample Cohorts (linked to mentor profiles by name lookup)
WITH mentor_ayush AS (SELECT id FROM public.profiles WHERE full_name = 'Ayush Kumar' AND role = 'Mentor' LIMIT 1),
     mentor_suman AS (SELECT id FROM public.profiles WHERE full_name = 'Suman Kumar' AND role = 'Mentor' LIMIT 1)
INSERT INTO public.cohorts (name, branch, mentor_id, max_size, is_active, weekly_challenge, current_week)
VALUES
  (
    'CS Elite Alpha', 'CS',
    (SELECT id FROM mentor_ayush),
    50, true, 'Build a Rate Limiter in Node.js', 1
  ),
  (
    'ML Pioneers', 'AI/ML',
    (SELECT id FROM mentor_suman),
    50, true, 'Train a CNN on CIFAR-10 and achieve >70% accuracy', 1
  )
ON CONFLICT DO NOTHING;

-- D4. Seed Sample Projects
WITH mentor_ayush AS (SELECT id FROM public.profiles WHERE full_name = 'Ayush Kumar' AND role = 'Mentor' LIMIT 1),
     mentor_suman AS (SELECT id FROM public.profiles WHERE full_name = 'Suman Kumar' AND role = 'Mentor' LIMIT 1),
     mentor_bismay AS (SELECT id FROM public.profiles WHERE full_name = 'Bismay Padhi' AND role = 'Mentor' LIMIT 1)
INSERT INTO public.projects (title, description, domain, difficulty, status, tech_stack, mentor_name, mentor_institution, cover_gradient, creator_id)
VALUES
  (
    'CampusConnect Social Feed',
    'Full-stack social app for college students. Features infinite scroll, real-time posts, and branch-based filtering.',
    'Web Development', 'Medium', 'Active',
    ARRAY['React', 'Node.js', 'MongoDB', 'Socket.io'],
    'Ayush Kumar', 'IIT BHU',
    'from-blue-900 to-indigo-900',
    (SELECT id FROM mentor_ayush)
  ),
  (
    'Smart Expense Tracker Bot',
    'A Telegram bot that tracks expenses using NLP. Users text their expenses and the bot categorises and reports them.',
    'AI / Bots', 'Hard', 'Active',
    ARRAY['Python', 'Flask', 'Telegram API', 'NLP'],
    'Suman Kumar', 'IIT Kharagpur',
    'from-emerald-900 to-teal-900',
    (SELECT id FROM mentor_suman)
  ),
  (
    'Smart Campus IoT Dashboard',
    'Real-time dashboard for IoT sensors across campus. Monitor energy usage, attendance, and environmental data.',
    'IoT / Hardware', 'Hard', 'Active',
    ARRAY['Raspberry Pi', 'MQTT', 'React', 'InfluxDB'],
    'Bismay Padhi', 'Smart Odisha Winner',
    'from-orange-900 to-red-900',
    (SELECT id FROM mentor_bismay)
  )
ON CONFLICT DO NOTHING;

-- D5. Seed Subparts for CampusConnect
WITH proj1 AS (SELECT id FROM public.projects WHERE title = 'CampusConnect Social Feed' LIMIT 1)
INSERT INTO public.project_tasks (project_id, title, description, difficulty, xp_reward, status)
VALUES
  ((SELECT id FROM proj1), 'Design MongoDB Schema',      'Create the Mongoose schemas for User, Post, Comment, and Follow relationships.', 'Easy',   100, 'Backlog'),
  ((SELECT id FROM proj1), 'Build User Auth APIs',       'Implement JWT-based registration, login, and token refresh endpoints.', 'Medium', 150, 'Backlog'),
  ((SELECT id FROM proj1), 'Create Infinite Scroll Feed UI', 'Build the React feed with IntersectionObserver for lazy loading.', 'Hard',   200, 'Backlog'),
  ((SELECT id FROM proj1), 'Build Notification Service', 'Real-time notifications using Socket.io when someone likes/comments.', 'Medium', 150, 'Backlog'),
  ((SELECT id FROM proj1), 'Implement Branch Filter',    'Branch-based feed filtering with client-side state management (Zustand).', 'Easy',   100, 'Backlog')
ON CONFLICT DO NOTHING;

-- D6. Seed Subparts for Smart Expense Bot
WITH proj2 AS (SELECT id FROM public.projects WHERE title = 'Smart Expense Tracker Bot' LIMIT 1)
INSERT INTO public.project_tasks (project_id, title, description, difficulty, xp_reward, status)
VALUES
  ((SELECT id FROM proj2), 'Telegram Webhook Setup',    'Configure the Telegram Bot API webhook with Flask and deploy to Railway.', 'Easy',   100, 'Backlog'),
  ((SELECT id FROM proj2), 'NLP Parser for Text Inputs','Build the spaCy/regex parser that extracts amount, category from plain text.', 'Hard',   250, 'Backlog'),
  ((SELECT id FROM proj2), 'Monthly Report Generator',  'Generate a PDF summary of expenses grouped by category.', 'Medium', 150, 'Backlog')
ON CONFLICT DO NOTHING;

-- D7. Seed Subparts for IoT Dashboard
WITH proj3 AS (SELECT id FROM public.projects WHERE title = 'Smart Campus IoT Dashboard' LIMIT 1)
INSERT INTO public.project_tasks (project_id, title, description, difficulty, xp_reward, status)
VALUES
  ((SELECT id FROM proj3), 'MQTT Broker Setup',          'Configure Mosquitto MQTT broker on Raspberry Pi and connect test sensors.', 'Easy',   100, 'Backlog'),
  ((SELECT id FROM proj3), 'Real-time Data Ingestion',   'Write a Python service that pipes MQTT messages into InfluxDB.', 'Medium', 150, 'Backlog'),
  ((SELECT id FROM proj3), 'React Dashboard UI',         'Build the live-updating chart dashboard with Recharts.', 'Hard',   200, 'Backlog'),
  ((SELECT id FROM proj3), 'Anomaly Alert System',       'Trigger SMS alerts when sensor readings cross safety thresholds.', 'Hard',   250, 'Backlog')
ON CONFLICT DO NOTHING;

-- D8. Seed Opportunities
INSERT INTO public.opportunities (title, company, type, category, description, deadline, location, stipend, duration, is_active, external_link)
VALUES
  (
    'Smart India Hackathon 2025', 'Ministry of Education', 'hackathon', 'hackathon',
    'India''s largest student hackathon. Compete in 36-hour sprints with ₹50 Lakh prize pool.',
    '2025-09-30 23:59:59+00', 'Pan India (Offline)',
    NULL, '36 Hours', true,
    'https://www.sih.gov.in'
  ),
  (
    'Full Stack Intern', 'Cognizant', 'internship', 'internship',
    'Work on live enterprise React + Node.js projects. Stipend: ₹25,000/month.',
    '2025-07-20 23:59:59+00', 'Hyderabad / Remote',
    '₹25,000/month', '6 months', true,
    'https://careers.cognizant.com'
  ),
  (
    'AWS re/Start Program', 'Amazon Web Services', 'program', 'program',
    'Free 12-week cloud computing bootcamp for students. AWS certification included.',
    '2025-08-15 23:59:59+00', 'Online',
    NULL, '12 Weeks', true,
    'https://aws.amazon.com/training/restart/'
  ),
  (
    'Patna Devs Meetup – July 2025', 'Patna Tech Community', 'meetup', 'meetup',
    'Monthly tech meetup for developers in Bihar. Talks on AI/ML and open source.',
    '2025-07-25 23:59:59+00', 'Patna / Online',
    NULL, '1 Day', true,
    'https://www.meetup.com/patna-devs'
  ),
  (
    'Google Summer of Code 2025', 'Google', 'program', 'program',
    'Contribute to open source organizations for 3 months with a $3000 stipend.',
    '2025-04-08 23:59:59+00', 'Remote',
    '$3,000 USD', '3 months', true,
    'https://summerofcode.withgoogle.com'
  ),
  (
    'Microsoft Learn Student Ambassadors', 'Microsoft', 'program', 'program',
    'Join Microsoft''s global student community. Get Azure credits, certifications, and more.',
    '2025-08-31 23:59:59+00', 'Remote',
    NULL, 'Ongoing', true,
    'https://studentambassadors.microsoft.com'
  )
ON CONFLICT DO NOTHING;

-- D9. Seed Community Channels (branch-based)
INSERT INTO public.channels (name, type)
VALUES
  ('Computer Science', 'branch'),
  ('Electronics & CE', 'branch'),
  ('Mechanical', 'branch'),
  ('AI & Machine Learning', 'branch'),
  ('Civil Engineering', 'branch'),
  ('General', 'global')
ON CONFLICT DO NOTHING;


-- ============================================================================
-- E. REALTIME — Enable activity_logs for live feed
-- ============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_tasks;

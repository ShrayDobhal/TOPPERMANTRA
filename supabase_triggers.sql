-- ============================================================================
-- TOPPER MANTRA: EVENT-DRIVEN CONTRIBUTION ENGINE (PHASE 1)
-- ============================================================================
-- This file creates the necessary tables and PostgreSQL triggers to ensure
-- that XP, Badges, and Activity Logs are updated automatically on the backend
-- whenever a student completes a task or challenge.
-- ============================================================================

-- 1. Create the Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL, -- e.g., 'task_approved', 'badge_earned', 'hub_post'
  entity_id UUID, -- ID of the task, badge, or post
  entity_name TEXT NOT NULL, -- Human readable name for the UI
  xp_earned INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and Realtime for Activity Logs so the UI updates instantly
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Activity logs viewable by everyone." ON public.activity_logs FOR SELECT USING (true);
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_logs;

-- 2. The Core Contribution Engine Function
-- This function fires when a mentor approves a task submission.
CREATE OR REPLACE FUNCTION process_task_approval()
RETURNS TRIGGER AS $$
DECLARE
  v_xp_reward INT;
  v_task_title TEXT;
  v_new_score INT;
  v_badge RECORD;
  v_inserted_rows INT;
BEGIN
  -- We only trigger the cascade if the status transitions to 'approved'
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    
    -- A. Get the XP reward and title for this task from project_tasks
    SELECT xp_reward, title INTO v_xp_reward, v_task_title 
    FROM public.project_tasks 
    WHERE id = NEW.project_task_id;
    
    -- B. Add XP to the user's profile and return the new score
    UPDATE public.profiles 
    SET contribution_score = contribution_score + COALESCE(v_xp_reward, 100)
    WHERE id = NEW.user_id
    RETURNING contribution_score INTO v_new_score;
    
    -- C. Log the activity (This will be broadcasted via Realtime to the UI)
    INSERT INTO public.activity_logs (user_id, action_type, entity_id, entity_name, xp_earned)
    VALUES (NEW.user_id, 'task_approved', NEW.project_task_id, v_task_title, COALESCE(v_xp_reward, 100));
    
    -- D. Check for new badges based on the user's new contribution_score
    FOR v_badge IN 
      SELECT id, name FROM public.badges 
      WHERE criteria_type = 'contribution_score' AND threshold <= v_new_score
    LOOP
      -- Try to insert the badge. Will do nothing if the user already earned it.
      INSERT INTO public.user_badges (user_id, badge_id)
      VALUES (NEW.user_id, v_badge.id)
      ON CONFLICT (user_id, badge_id) DO NOTHING;
      
      GET DIAGNOSTICS v_inserted_rows = ROW_COUNT;
      
      -- If they actually earned a new badge, log it in activity feed
      IF v_inserted_rows > 0 THEN
        INSERT INTO public.activity_logs (user_id, action_type, entity_id, entity_name, xp_earned)
        VALUES (NEW.user_id, 'badge_earned', v_badge.id, v_badge.name, 0);
      END IF;
    END LOOP;
    
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Attach the Trigger to Task Submissions
DROP TRIGGER IF EXISTS on_task_submission_approved ON public.task_submissions;
CREATE TRIGGER on_task_submission_approved
  AFTER UPDATE ON public.task_submissions
  FOR EACH ROW
  EXECUTE PROCEDURE process_task_approval();

-- ============================================================================
-- SEED INITIAL BADGES FOR TESTING
-- ============================================================================
INSERT INTO public.badges (name, description, icon, criteria_type, threshold)
VALUES 
  ('First Steps', 'Complete your first task', '🚀', 'contribution_score', 100),
  ('Rising Star', 'Reach 500 Contribution Points', '⭐', 'contribution_score', 500),
  ('Prodigy', 'Reach 2000 Contribution Points', '🔥', 'contribution_score', 2000)
ON CONFLICT (name) DO UPDATE 
SET threshold = EXCLUDED.threshold, icon = EXCLUDED.icon;

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  try {
    // The Custodian Bot runs daily at 2:00 AM to enforce the "Parallel IIT" rules.
    console.log("🤖 Custodian Bot initialized. Running daily sweep...");

    const now = new Date();
    
    // ============================================================
    // 1. INACTIVE STUDENTS (Cohort Governance)
    // ============================================================
    console.log("➡️ Checking Inactive Students (Cohorts)...");
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const twentyOneDaysAgo = new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000);

    // 2 weeks without commenting -> Yellow Flag
    const { error: yellowFlagError } = await supabase
      .from('cohort_members')
      .update({ status: 'yellow' })
      .lt('last_participation_at', fourteenDaysAgo.toISOString())
      .gte('last_participation_at', twentyOneDaysAgo.toISOString())
      .eq('status', 'active');
      
    if (yellowFlagError) console.error("Error setting yellow flags:", yellowFlagError);

    // 3 weeks without commenting -> Red Flag (Auto-removal)
    const { error: redFlagError } = await supabase
      .from('cohort_members')
      .update({ status: 'removed' })
      .lt('last_participation_at', twentyOneDaysAgo.toISOString());
      
    if (redFlagError) console.error("Error setting red flags:", redFlagError);

    // ============================================================
    // 2. DEAD PROJECTS & TASKS (Project Forge Governance)
    // ============================================================
    console.log("➡️ Checking Dead Projects & Stagnant Tasks...");
    
    // Tasks: 10 days inactive = Unassign task (7 day warning is usually done via a different cron or DB trigger)
    const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
    const { error: unassignError } = await supabase
      .from('project_tasks')
      .update({ assignee_id: null, status: 'Backlog', claimed_at: null })
      .lt('last_submission_at', tenDaysAgo.toISOString())
      .not('assignee_id', 'is', null)
      .neq('status', 'Completed');

    if (unassignError) console.error("Error unassigning tasks:", unassignError);

    // Projects: 15 days no submission = Archive
    const fifteenDaysAgo = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);
    const { error: archiveProjectError } = await supabase
      .from('projects')
      .update({ status: 'Paused' })
      .lt('last_activity_at', fifteenDaysAgo.toISOString())
      .neq('status', 'Completed')
      .neq('status', 'Paused');

    if (archiveProjectError) console.error("Error archiving projects:", archiveProjectError);

    // 3-Day Nudge (Student is stuck but didn't ask for help)
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const { data: stuckTasks } = await supabase
      .from('project_tasks')
      .select('assignee_id')
      .lt('claimed_at', threeDaysAgo.toISOString())
      .eq('status', 'In Progress');

    if (stuckTasks && stuckTasks.length > 0) {
      console.log(`Sending 3-day nudge to ${stuckTasks.length} stuck students.`);
      // In a real app, this would insert rows into a `notifications` table
    }

    // ============================================================
    // 3. STREAK UPDATES (Increment or Reset)
    // ============================================================
    console.log("➡️ Running Streak Updates...");
    // Reset streak if last_active_at is older than 48 hours ago
    const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    
    const { error: resetStreakError } = await supabase
      .from('profiles')
      .update({ streak: 0 })
      .lt('last_active_at', twoDaysAgo.toISOString())
      .gt('streak', 0);
    
    if (resetStreakError) console.error("Error resetting streaks:", resetStreakError);

    // ============================================================
    // 4. BADGE ELIGIBILITY
    // ============================================================
    console.log("➡️ Checking Badge Eligibility...");
    
    // Auto-grant badges based on threshold (e.g., Code Ninja)
    const { data: allUsers } = await supabase.from('profiles').select('id, contribution_score, streak');
    const { data: allBadges } = await supabase.from('badges').select('*');
    
    if (allUsers && allBadges) {
      for (const user of allUsers) {
        for (const badge of allBadges) {
          let isEligible = false;
          if (badge.criteria_type === 'streak' && user.streak >= badge.threshold) isEligible = true;
          if (badge.criteria_type === 'contributionScore' && user.contribution_score >= badge.threshold) isEligible = true;
          
          if (isEligible) {
            // Attempt to insert (will fail gracefully if UNIQUE constraint exists)
            await supabase.from('user_badges').insert({ user_id: user.id, badge_id: badge.id }).select().single();
          }
        }
      }
    }

    console.log("✅ Custodian Bot sweep completed successfully.");
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Custodian Bot sweep completed." 
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Custodian Bot encountered an error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

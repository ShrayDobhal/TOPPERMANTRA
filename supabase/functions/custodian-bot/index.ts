import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  try {
    console.log("🤖 Custodian Bot initialized. Running daily sweep...");
    const now = new Date();
    const report = {
      yellowFlagged: 0,
      autoRemovedFromCohort: 0,
      tasksAutoReleased: 0,
      tasksReassigned: 0,
      projectsArchived: 0,
      streaksReset: 0,
      badgesAwarded: 0,
    };

    // ===========================================================
    // 1. COHORT GOVERNANCE — Inactive Member Flags
    // ===========================================================
    console.log("➡️ [1/5] Checking Inactive Cohort Members...");

    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const twentyOneDaysAgo = new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000);

    // Exclude frozen accounts
    const { data: frozenProfiles } = await supabase
      .from('profiles')
      .select('id')
      .gt('freeze_until', now.toISOString());
    const frozenIds = frozenProfiles?.map(p => p.id) || [];
    const frozenFilter = frozenIds.length > 0 ? `(${frozenIds.join(',')})` : null;

    // 2 weeks inactive → Yellow Flag
    let yellowQuery = supabase
      .from('cohort_members')
      .update({ status: 'yellow' })
      .lt('last_participation_at', fourteenDaysAgo.toISOString())
      .gte('last_participation_at', twentyOneDaysAgo.toISOString())
      .eq('status', 'active');
    if (frozenFilter) yellowQuery = yellowQuery.not('student_id', 'in', frozenFilter);
    const { error: yellowErr, count: yellowCount } = await yellowQuery;
    if (yellowErr) console.error("Error setting yellow flags:", yellowErr);
    report.yellowFlagged = yellowCount || 0;

    // 3 weeks inactive → Auto-Removal from cohort
    let redQuery = supabase
      .from('cohort_members')
      .update({ status: 'removed' })
      .lt('last_participation_at', twentyOneDaysAgo.toISOString())
      .neq('status', 'removed');
    if (frozenFilter) redQuery = redQuery.not('student_id', 'in', frozenFilter);
    const { error: redErr, count: redCount } = await redQuery;
    if (redErr) console.error("Error setting auto-removals:", redErr);
    report.autoRemovedFromCohort = redCount || 0;

    // ===========================================================
    // 2. PROJECT FORGE GOVERNANCE — Stagnant Tasks
    // ===========================================================
    console.log("➡️ [2/5] Checking Stagnant Tasks (7-day warning / 10-day autorelease)...");

    const sevenDaysAgo  = new Date(now.getTime() - 7  * 24 * 60 * 60 * 1000);
    const tenDaysAgo    = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);

    // PRD Rule: No activity for 7 days → Yellow Flag (log warning)
    // We check activity_logs for any action in last 7 days by the assignee.
    // For now, we log this as a warning — email/push notification would go here.
    const { data: warnTasks } = await supabase
      .from('project_tasks')
      .select('id, assignee_id')
      .lt('claimed_at', sevenDaysAgo.toISOString())
      .gte('claimed_at', tenDaysAgo.toISOString())
      .not('assignee_id', 'is', null)
      .not('status', 'in', '(Completed,In Review)');

    if (warnTasks && warnTasks.length > 0) {
      console.log(`⚠️ Warning: ${warnTasks.length} students inactive on tasks for 7 days. Would send push/email.`);
      // TODO: Insert into a `notifications` table when that feature is built.
    }

    // PRD Rule: No activity for 10 days → AutoRelease + -50 XP penalty
    const { data: stagnantTasks } = await supabase
      .from('project_tasks')
      .select('id, assignee_id')
      .lt('claimed_at', tenDaysAgo.toISOString())
      .not('assignee_id', 'is', null)
      .not('status', 'in', '(Completed,In Review)');

    if (stagnantTasks && stagnantTasks.length > 0) {
      for (const task of stagnantTasks) {
        const assigneeId = task.assignee_id;

        // Check waitlist — give to next person first
        const { data: waitlist } = await supabase
          .from('task_waitlist')
          .select('user_id')
          .eq('project_task_id', task.id)
          .order('joined_at', { ascending: true })
          .limit(1);

        if (waitlist && waitlist.length > 0) {
          const nextAssignee = waitlist[0].user_id;

          // Reassign to next person on waitlist
          await supabase
            .from('project_tasks')
            .update({
              assignee_id: nextAssignee,
              status: 'In Progress',
              claimed_at: now.toISOString(),
              last_submission_at: now.toISOString(),
            })
            .eq('id', task.id);

          // Remove from waitlist
          await supabase
            .from('task_waitlist')
            .delete()
            .eq('project_task_id', task.id)
            .eq('user_id', nextAssignee);

          report.tasksReassigned++;
          console.log(`🔄 Reassigned task ${task.id} to ${nextAssignee} from waitlist.`);
        } else {
          // No one on waitlist — autorelease via RPC (deducts -50 XP)
          const { data: releaseResult } = await supabase
            .rpc('autorelease_task', { p_task_id: task.id, p_assignee_id: assigneeId });

          if (releaseResult?.success) {
            report.tasksAutoReleased++;
            console.log(`🗑️ AutoReleased task ${task.id} from ${assigneeId}. -50 XP deducted.`);
          }
        }
      }
    }

    // ===========================================================
    // 3. PROJECT ARCHIVAL — 15 days no submission
    // ===========================================================
    console.log("➡️ [3/5] Checking Dead Projects (15-day archive rule)...");

    const fifteenDaysAgo = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);

    const { data: deadProjects } = await supabase
      .from('projects')
      .select('id, title, creator_id')
      .lt('last_activity_at', fifteenDaysAgo.toISOString())
      .eq('status', 'Active');

    if (deadProjects && deadProjects.length > 0) {
      const deadIds = deadProjects.map(p => p.id);
      await supabase
        .from('projects')
        .update({ status: 'Paused' })  // PRD: 'archived' → mapped to 'Paused'
        .in('id', deadIds);

      // Notify mentors (log to activity feed for now)
      for (const proj of deadProjects) {
        if (proj.creator_id) {
          await supabase.from('activity_logs').insert({
            user_id: proj.creator_id,
            action_type: 'project_archived',
            entity_id: proj.id,
            entity_name: proj.title,
            xp_earned: 0,
          });
        }
      }

      report.projectsArchived = deadProjects.length;
      console.log(`📦 Archived ${deadProjects.length} inactive projects.`);
    }

    // ===========================================================
    // 4. STREAK UPDATES — Reset stale streaks
    // ===========================================================
    console.log("➡️ [4/5] Running Streak Resets...");

    const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    // Reset streaks for users who haven't been active in 48 hours (and aren't frozen)
    const { error: streakResetErr, count: streakResetCount } = await supabase
      .from('profiles')
      .update({ streak: 0 })
      .lt('last_active_at', twoDaysAgo.toISOString())
      .gt('streak', 0)
      .or(`freeze_until.is.null,freeze_until.lt.${now.toISOString()}`);

    if (streakResetErr) console.error("Error resetting streaks:", streakResetErr);
    report.streaksReset = streakResetCount || 0;

    // ===========================================================
    // 5. STREAK BADGE ELIGIBILITY CHECK
    // ===========================================================
    console.log("➡️ [5/5] Checking Streak Badge Eligibility...");

    const { data: streakBadges } = await supabase
      .from('badges')
      .select('*')
      .eq('criteria_type', 'streak');

    if (streakBadges && streakBadges.length > 0) {
      for (const badge of streakBadges) {
        const { data: eligible } = await supabase
          .from('profiles')
          .select('id')
          .gte('streak', badge.threshold);

        if (eligible && eligible.length > 0) {
          const insertPromises = eligible.map(u =>
            supabase.from('user_badges').insert({ user_id: u.id, badge_id: badge.id }).select().single()
          );

          const results = await Promise.allSettled(insertPromises);
          const newEarners = results
            .filter(r => r.status === 'fulfilled' && r.value.data && !r.value.error)
            .map(r => r.value.data.user_id);

          if (newEarners.length > 0) {
            await supabase.from('activity_logs').insert(
              newEarners.map(userId => ({
                user_id: userId,
                action_type: 'badge_earned',
                entity_id: badge.id,
                entity_name: badge.name,
                xp_earned: 0,
              }))
            );
            report.badgesAwarded += newEarners.length;
          }
        }
      }
    }

    console.log("✅ Custodian Bot sweep complete.", report);

    return new Response(JSON.stringify({ success: true, report }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("🔥 Custodian Bot fatal error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

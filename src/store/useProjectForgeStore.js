import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import useStudentStore from './useStudentStore';
import toast from 'react-hot-toast';

const useProjectForgeStore = create((set, get) => ({
  projects: [],
  subparts: [],
  aidRequests: [],
  submissions: [],
  waitlists: {},
  loading: false,

  fetchProjects: async () => {
    set({ loading: true });
    
    // Fetch projects
    const { data: projectsData, error: projError } = await supabase
      .from('projects')
      .select('*');
      
    // Fetch tasks
    const { data: tasksData, error: taskError } = await supabase
      .from('project_tasks')
      .select(`*, profiles(full_name)`);

    if (projError) console.error("Error fetching projects:", projError);
    if (taskError) console.error("Error fetching tasks:", taskError);

    const formattedTasks = (tasksData || []).map(task => ({
      ...task,
      claimedBy: task.assignee_id ? { id: task.assignee_id, name: task.profiles?.full_name } : null
    }));

    if (!projectsData || projectsData.length === 0) {
      set({ projects: [], subparts: [], loading: false });
      return;
    }

    // Attach task summary stats to projects
    const formattedProjects = (projectsData || []).map(proj => {
      const projTasks = formattedTasks.filter(t => t.project_id === proj.id);
      return {
        ...proj,
        techStack: proj.tech_stack || ['React', 'Node.js'],
        mentor: { name: proj.mentor_name || 'Mentor', institution: proj.mentor_institution || 'IIT' },
        coverGradient: proj.cover_gradient,
        totalSubparts: projTasks.length,
        completedSubparts: projTasks.filter(t => t.status === 'Completed').length,
        claimedSubparts: projTasks.filter(t => t.status === 'In Progress' || t.status === 'In Review').length,
        availableSubparts: projTasks.filter(t => t.status === 'Backlog').length,
      };
    });

    set({ projects: formattedProjects, subparts: formattedTasks, loading: false });
  },

  getSubparts: (projectId) => {
    return get().subparts.filter(s => s.project_id === projectId);
  },

  getAvailable: (projectId) => get().getSubparts(projectId).filter(s => s.status === 'Backlog'),
  getClaimed: (projectId) => get().getSubparts(projectId).filter(s => s.status === 'In Progress' || s.status === 'In Review'),
  getCompleted: (projectId) => get().getSubparts(projectId).filter(s => s.status === 'Completed'),

  claimTask: async (subpartId, projectId, user) => {
    const canClaim = useStudentStore.getState().canClaimTask();
    if (!canClaim) {
      toast.error("You have reached the maximum number of active claims.");
      return false;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("You must be logged in to claim tasks.");
      return false;
    }
    const userId = session.user.id;

    // Use the SECURITY DEFINER RPC function to safely claim an unassigned task.
    // Direct .update() fails because RLS USING(auth.uid() = assignee_id) blocks
    // updates when assignee_id IS NULL. The RPC handles this + max-2-tasks check.
    const { data, error } = await supabase
      .rpc('claim_task', { p_task_id: subpartId });

    if (error) {
      console.error("Error claiming task:", error);
      toast.error(error.message || "Could not claim this task.");
      return false;
    }

    // The RPC returns { success: bool, error?: string, task_id?: string }
    if (data && !data.success) {
      toast.error(data.error || "Could not claim this task. Someone else may have claimed it.");
      return false;
    }

    // Refresh UI
    await get().fetchProjects();
    
    // Update student claims count in UI
    useStudentStore.getState().setProfile({
      ...useStudentStore.getState().profile,
      activeClaims: useStudentStore.getState().profile.activeClaims + 1
    });

    return true;
  },

  requestAid: async (subpartId, type, description, student) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;

    const { error } = await supabase
      .from('task_aid_requests')
      .insert([{
        project_task_id: subpartId,
        user_id: session.user.id,
        request_type: type, // 'video' or 'code'
        content: description,
        status: 'pending'
      }]);

    if (error) {
      console.error("Error requesting aid:", error);
      toast.error("Failed to submit request.");
      return false;
    }
    
    toast.success("Help request submitted to the mentor.");
    return true;
  },

  submitForReview: async (subpartId, codeUrl, student) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;

    // Create submission record
    const { error: subError } = await supabase
      .from('task_submissions')
      .insert([{
        project_task_id: subpartId,
        user_id: session.user.id,
        code_url: codeUrl,
        status: 'pending'
      }]);

    if (subError) {
      console.error("Error submitting for review:", subError);
      toast.error("Failed to submit.");
      return false;
    }

    // Update task status
    const { error: taskError } = await supabase
      .from('project_tasks')
      .update({ 
        status: 'In Review',
        last_submission_at: new Date().toISOString()
      })
      .eq('id', subpartId);

    if (taskError) console.error("Error updating task status:", taskError);

    await get().fetchProjects();
    toast.success("Task submitted for review!");
    return true;
  },

  getProjectsByStatus: (status) => {
    return get().projects.filter(p => p.status === status);
  },

  // ---- Mentor Actions ----
  fetchPendingSubmissions: async () => {
    const { data, error } = await supabase.rpc('fetch_pending_submissions');
    if (error) {
      console.error('Error fetching submissions:', error);
      return [];
    }
    return data || [];
  },

  approveTask: async (submissionId, feedback = '') => {
    const { data, error } = await supabase.rpc('approve_task', {
      p_submission_id: submissionId,
      p_feedback: feedback,
    });
    if (error) { toast.error(error.message); return false; }
    if (data && !data.success) { toast.error(data.error); return false; }
    toast.success('Submission merged! Student awarded XP.');
    await get().fetchProjects();
    return true;
  },

  rejectTask: async (submissionId, feedback = '') => {
    const { data, error } = await supabase.rpc('reject_task', {
      p_submission_id: submissionId,
      p_feedback: feedback,
    });
    if (error) { toast.error(error.message); return false; }
    if (data && !data.success) { toast.error(data.error); return false; }
    toast('Changes requested. Student will be notified.', { icon: '📝' });
    return true;
  },
}));

export default useProjectForgeStore;

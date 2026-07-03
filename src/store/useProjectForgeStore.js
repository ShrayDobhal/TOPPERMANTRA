import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import useStudentStore from './useStudentStore';

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
      .from('tasks')
      .select('*, claimed_by(first_name, last_name)');

    if (projError) console.error("Error fetching projects:", projError);
    if (taskError) console.error("Error fetching tasks:", taskError);

    const formattedTasks = (tasksData || []).map(task => ({
      ...task,
      claimedBy: task.claimed_by ? { id: task.claimed_by, name: `${task.claimed_by.first_name} ${task.claimed_by.last_name}` } : null
    }));

    // Attach task summary stats to projects
    const formattedProjects = (projectsData || []).map(proj => {
      const projTasks = formattedTasks.filter(t => t.project_id === proj.id);
      return {
        ...proj,
        techStack: proj.tech_stack,
        mentor: { name: proj.mentor_name, institution: proj.mentor_institution },
        coverGradient: proj.cover_gradient,
        totalSubparts: projTasks.length,
        completedSubparts: projTasks.filter(t => t.status === 'completed').length,
        claimedSubparts: projTasks.filter(t => t.status === 'claimed').length,
        availableSubparts: projTasks.filter(t => t.status === 'available').length,
      };
    });

    set({ projects: formattedProjects, subparts: formattedTasks, loading: false });
  },

  getSubparts: (projectId) => {
    return get().subparts.filter(s => s.project_id === projectId);
  },

  getAvailable: (projectId) => get().getSubparts(projectId).filter(s => s.status === 'available'),
  getClaimed: (projectId) => get().getSubparts(projectId).filter(s => s.status === 'claimed'),
  getCompleted: (projectId) => get().getSubparts(projectId).filter(s => s.status === 'completed'),

  claimTask: async (subpartId, projectId, user) => {
    const canClaim = useStudentStore.getState().canClaimTask();
    if (!canClaim) {
      alert("You have reached the maximum number of active claims.");
      return false;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert("You must be logged in to claim tasks.");
      return false;
    }
    const userId = session.user.id;

    // Supabase claim
    const { error } = await supabase
      .from('tasks')
      .update({ 
        status: 'claimed', 
        claimed_by: userId, 
        claimed_at: new Date().toISOString() 
      })
      .eq('id', subpartId)
      .eq('status', 'available'); 

    if (error) {
      console.error("Error claiming task:", error);
      alert("Could not claim this task. Someone else may have claimed it.");
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

  requestAid: (subpartId, type, description, student) => {
    console.log("Mock request aid sent", { subpartId, type, description, student });
  },

  submitForReview: (subpartId, codeUrl, student) => {
    console.log("Mock submit for review", { subpartId, codeUrl, student });
  },

  getProjectsByStatus: (status) => {
    return get().projects.filter(p => p.status === status);
  }
}));

export default useProjectForgeStore;

import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useCohortStore = create((set, get) => ({
  // ---- Cohort Data ----
  cohort: null,
  members: [],
  
  // ---- Weekly Challenge ----
  currentChallenge: null,
  previousChallenges: [],
  challengeResponses: [],

  // ---- Fetch from API ----
  fetchCohort: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const userId = session.user.id;
      
      // Get the student's cohort
      let { data: memberData } = await supabase
        .from('cohort_members')
        .select('cohort_id, status, cohort:cohorts(*)')
        .eq('student_id', userId)
        .maybeSingle();
        
      if (!memberData) {
        console.log("User not in a cohort, executing self-healing auto-join...");
        // 1. Fetch user's profile to get their branch/major
        const { data: profile } = await supabase
          .from('profiles')
          .select('branch')
          .eq('id', userId)
          .maybeSingle();

        const branch = profile?.branch || 'Engineering';

        // 2. Search for an existing cohort for this branch
        const { data: existingCohorts } = await supabase
          .from('cohorts')
          .select('*')
          .eq('branch', branch)
          .limit(1);

        let targetCohortId;

        if (existingCohorts && existingCohorts.length > 0) {
          targetCohortId = existingCohorts[0].id;
          console.log(`Found existing cohort for ${branch}:`, existingCohorts[0].name);
        } else {
          // 3. Create a default cohort for this branch
          console.log(`No cohort found for ${branch}. Creating default cohort...`);
          const { data: newCohort, error: createError } = await supabase
            .from('cohorts')
            .insert([{
              name: `${branch} Alpha Cohort`,
              branch: branch,
              max_size: 50,
              current_week: 1
            }])
            .select()
            .single();

          if (createError) throw createError;
          targetCohortId = newCohort.id;
        }

        // 4. Join the user to this cohort
        const { error: joinError } = await supabase
          .from('cohort_members')
          .insert([{
            cohort_id: targetCohortId,
            student_id: userId,
            status: 'active'
          }]);

        if (joinError) throw joinError;

        // 5. Refetch memberData
        const { data: refetchedMemberData } = await supabase
          .from('cohort_members')
          .select('cohort_id, status, cohort:cohorts(*)')
          .eq('student_id', userId)
          .single();

        memberData = refetchedMemberData;
      }
      
      const cohortId = memberData.cohort_id;
      
      // Get all members
      const { data: membersData } = await supabase
        .from('cohort_members')
        .select('*, student:profiles(full_name, avatar_url, contribution_score)')
        .eq('cohort_id', cohortId);
        
      // Get current challenge
      const { data: challenges } = await supabase
        .from('cohort_challenges')
        .select('*')
        .eq('cohort_id', cohortId)
        .order('week_number', { ascending: false })
        .limit(1);
        
      let challenge = null;
      let responses = [];
      
      if (challenges && challenges.length > 0) {
        challenge = challenges[0];
        // Get responses
        const { data: responsesData } = await supabase
          .from('cohort_challenge_responses')
          .select('*, student:profiles(full_name, avatar_url)')
          .eq('challenge_id', challenge.id)
          .order('upvotes', { ascending: false });
          
        if (responsesData) responses = responsesData;
      }

      const mappedMembers = (membersData || []).map(m => ({
        ...m,
        name: m.student?.full_name || 'Anonymous',
        avatar: m.student?.avatar_url || null,
        contributionScore: m.student?.contribution_score || 0,
        college: 'Your College',
        isCurrentUser: m.student_id === userId
      }));

      set({ 
        cohort: memberData.cohort, 
        members: mappedMembers.length > 0 ? mappedMembers : [],
        currentChallenge: challenge || null,
        challengeResponses: responses.length > 0 ? responses : []
      });
    } catch (err) {
      console.error('Failed to fetch cohort', err);
    }
  },

  // ---- Actions ----
  addResponse: async (responseContent, user) => {
    try {
      const challengeId = get().currentChallenge?.id;
      if (!challengeId) return;
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('cohort_challenge_responses')
        .insert([{
          challenge_id: challengeId,
          student_id: session.user.id,
          content: responseContent
        }])
        .select('*, student:profiles(full_name, avatar_url)')
        .single();
        
      if (error) throw error;

      if (data) {
        set((s) => ({
          challengeResponses: [...s.challengeResponses, data],
          currentChallenge: { ...s.currentChallenge, responsesCount: (s.currentChallenge.responsesCount || 0) + 1 },
        }));
        
        // Update last participation
        await supabase
          .from('cohort_members')
          .update({ last_participation_at: new Date().toISOString(), status: 'active' })
          .eq('student_id', session.user.id)
          .eq('cohort_id', get().cohort.id);
      }
    } catch (err) {
      console.error('Failed to post response', err);
    }
  },

  upvoteResponse: async (responseId) => {
    try {
      const response = get().challengeResponses.find(r => r.id === responseId);
      if (!response) return;
      
      const newUpvotes = (response.upvotes || 0) + 1;
      
      const { error } = await supabase
        .from('cohort_challenge_responses')
        .update({ upvotes: newUpvotes })
        .eq('id', responseId);
        
      if (error) throw error;

      set((s) => ({
        challengeResponses: s.challengeResponses.map(r =>
          r.id === responseId ? { ...r, upvotes: newUpvotes } : r
        ).sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0)), // Sort by upvotes
      }));
    } catch (err) {
      console.error('Failed to upvote response', err);
    }
  },

  // ---- Member Activity ----
  getActiveCount: () => get().members.filter(m => m.status === 'active').length,
  getYellowFlagged: () => get().members.filter(m => m.status === 'yellow'),
  getRedFlagged: () => get().members.filter(m => m.status === 'red' || m.status === 'removed'),
}));

export default useCohortStore;


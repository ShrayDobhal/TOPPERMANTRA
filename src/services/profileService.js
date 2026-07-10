import { supabase } from '../lib/supabase';

export const ProfileService = {
  /**
   * Updates a user's onboarding profile.
   * Splits the update to prevent schema cache issues from blocking the main flow.
   */
  async updateOnboardingProfile(userId, onboardingData) {
    if (!userId) throw new Error("No user ID provided");

    const mainPayload = {
      college: onboardingData.college || '',
      branch: onboardingData.branch || '',
      year: onboardingData.year || '',
      career_goal: onboardingData.careerGoal || '',
      github_url: onboardingData.github || '',
      linkedin_url: onboardingData.linkedin || '',
      avatar_url: onboardingData.avatarUrl || ''
    };

    const { error } = await supabase
      .from('profiles')
      .update(mainPayload)
      .eq('id', userId);

    if (error) throw error;

    // Gracefully update potentially missing columns
    const { error: extraError } = await supabase
      .from('profiles')
      .update({
        portfolio_url: onboardingData.portfolio || '',
        resume_url: onboardingData.resumeUrl || ''
      })
      .eq('id', userId);

    if (extraError) {
      console.warn("Note: portfolio_url or resume_url failed to save. Schema cache might need reloading.", extraError);
    }

    return true;
  }
};

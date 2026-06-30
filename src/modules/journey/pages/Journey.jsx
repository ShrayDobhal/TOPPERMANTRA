import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import api from '../../../lib/api';

import JourneyHero from '../../../components/journey/JourneyHero';
import CurrentMissionBanner from '../../../components/journey/CurrentMissionBanner';
import JourneyTimeline from '../../../components/journey/JourneyTimeline';
import SkillTree from '../../../components/journey/SkillTree';
import ActivityHistory from '../../../components/journey/ActivityHistory';
import ContributionCalendar from '../../../components/journey/ContributionCalendar';
import HealthScoreCard from '../../../components/journey/HealthScoreCard';
import WeeklyGoals from '../../../components/journey/WeeklyGoals';
import AchievementsBoard from '../../../components/journey/AchievementsBoard';
import AIRecommendations from '../../../components/journey/AIRecommendations';

export default function Journey() {
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      try {
        const response = await api.get('/dashboard');
        return response.data.data;
      } catch (err) {
        return { profile: { level: 9, streak: 21 } };
      }
    },
    retry: false
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-[#FF5722] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-red-500 font-bold mb-2">Error loading journey data</p>
        <p className="text-gray-500 text-sm">Please try refreshing the page.</p>
      </div>
    );
  }

  const profile = dashboardData?.profile || {};

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 sm:space-y-8">
      
      {/* 1. Top Hero */}
      <JourneyHero profile={profile} />

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Left Column (Primary Focus) */}
        <div className="xl:col-span-8 flex flex-col gap-6 sm:gap-8">
          <CurrentMissionBanner />
          <JourneyTimeline />
          <SkillTree />
          <ActivityHistory />
        </div>
        
        {/* Right Column (Gamification & Health) */}
        <div className="xl:col-span-4 flex flex-col gap-6 sm:gap-8">
          <ContributionCalendar />
          <HealthScoreCard />
          <WeeklyGoals />
          <AchievementsBoard />
          <AIRecommendations />
        </div>

      </div>
      
    </div>
  );
}

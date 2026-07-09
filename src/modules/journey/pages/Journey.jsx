import { useEffect } from 'react';
import useStudentStore from '../../../store/useStudentStore';

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
  const profile = useStudentStore((s) => s.profile);
  const fetchProfile = useStudentStore((s) => s.fetchProfile);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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

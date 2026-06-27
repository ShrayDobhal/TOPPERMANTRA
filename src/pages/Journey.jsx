import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import api from '../lib/api';

import JourneyHero from '../components/journey/JourneyHero';
import NextActionBanner from '../components/journey/NextActionBanner';
import HealthScoreCard from '../components/journey/HealthScoreCard';
import JourneyTimeline from '../components/journey/JourneyTimeline';
import GamificationBoard from '../components/journey/GamificationBoard';
import StatsAndRecs from '../components/journey/StatsAndRecs';

export default function Journey() {
  // We reuse the dashboard endpoint for now since it returns the user profile
  // In a real app, this might be a specific /api/journey endpoint
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await api.get('/dashboard');
      return response.data.data;
    }
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
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Hero & Next Action */}
      <div className="space-y-6">
        <JourneyHero profile={profile} />
        <NextActionBanner />
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Left Column: Timeline */}
        <div className="lg:col-span-7 xl:col-span-8">
          <JourneyTimeline />
        </div>
        
        {/* Right Column: Widgets */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 sm:space-y-8 flex flex-col">
          <div className="shrink-0">
            <HealthScoreCard />
          </div>
          
          <div className="flex-1">
            <GamificationBoard />
          </div>
          
          <div className="shrink-0">
            <StatsAndRecs />
          </div>
        </div>

      </div>
      
    </div>
  );
}

import React from 'react';
import CommunityHero from '../components/community/CommunityHero';
import CommunitySpaces from '../components/community/CommunitySpaces';
import CollegeChapters from '../components/community/CollegeChapters';
import DiscussionFeed from '../components/community/DiscussionFeed';
import Announcements from '../components/community/Announcements';
import CommunityEvents from '../components/community/CommunityEvents';
import CommunityLeaderboard from '../components/community/CommunityLeaderboard';
import ChatInterfacePreview from '../components/community/ChatInterfacePreview';
import CommunityCta from '../components/community/CommunityCta';

export default function Community() {
  return (
    <div className="bg-white min-h-screen">
      <CommunityHero />
      <CommunitySpaces />
      <CollegeChapters />
      <DiscussionFeed />
      
      {/* Three Column Dashboard Layout for Widgets */}
      <section className="py-24 bg-white border-b border-[#E9ECEF]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="h-[400px] lg:h-[500px]">
              <Announcements />
            </div>
            <div className="h-[400px] lg:h-[500px]">
              <CommunityEvents />
            </div>
            <div className="h-[400px] lg:h-[500px]">
              <CommunityLeaderboard />
            </div>
          </div>
        </div>
      </section>

      <ChatInterfacePreview />
      <CommunityCta />
    </div>
  );
}

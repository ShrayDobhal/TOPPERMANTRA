import React, { useState } from 'react';
import MentorsHero from '../components/mentors/MentorsHero';
import MentorsStats from '../components/mentors/MentorsStats';
import WhyMentors from '../components/mentors/WhyMentors';
import FeaturedMentors from '../components/mentors/FeaturedMentors';
import MentorCategories from '../components/mentors/MentorCategories';
import MentorsDirectory from '../components/mentors/MentorsDirectory';
import TopCollegeNetwork from '../components/mentors/TopCollegeNetwork';
import HowMentorshipWorks from '../components/mentors/HowMentorshipWorks';
import MentorSuccessStories from '../components/mentors/MentorSuccessStories';
import StudentReviews from '../components/mentors/StudentReviews';
import LiveSessions from '../components/mentors/LiveSessions';
import BecomeMentorCta from '../components/mentors/BecomeMentorCta';
import MentorsFaq from '../components/mentors/MentorsFaq';
import MentorsFinalCta from '../components/mentors/MentorsFinalCta';
import MentorProfileModal from '../components/mentors/MentorProfileModal';
import BookingModal from '../components/mentors/BookingModal';
import { mockMentors } from '../lib/mockMentors';

export default function Mentors() {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [bookingMentor, setBookingMentor] = useState(null);
  const [initialCategory, setInitialCategory] = useState(null);

  const handleViewProfile = (mentor) => {
    setSelectedMentor(mentor);
  };

  const handleBookSession = (mentor) => {
    setSelectedMentor(null);
    setBookingMentor(mentor);
  };

  return (
    <div className="bg-white min-h-screen">
      <MentorsHero />
      <MentorsStats />
      
      <WhyMentors />
      
      <FeaturedMentors 
        mentors={mockMentors} 
        onViewProfile={handleViewProfile}
      />
      
      <MentorCategories 
        onSelectCategory={(category) => setInitialCategory(category)} 
      />
      
      <MentorsDirectory 
        mentors={mockMentors} 
        onViewProfile={handleViewProfile}
        initialCategory={initialCategory}
      />
      
      <TopCollegeNetwork />
      
      <HowMentorshipWorks />
      
      <MentorSuccessStories />
      
      <StudentReviews />
      
      <LiveSessions />
      
      <BecomeMentorCta />
      
      <MentorsFaq />
      
      <MentorsFinalCta />

      {/* Modals */}
      <MentorProfileModal 
        mentor={selectedMentor} 
        onClose={() => setSelectedMentor(null)} 
        onBookSession={handleBookSession}
      />
      
      <BookingModal 
        mentor={bookingMentor} 
        onClose={() => setBookingMentor(null)} 
      />
    </div>
  );
}

import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, FileText, Bell, MessageSquare, Award, Clock } from 'lucide-react';
import { fadeUp } from '../../lib/animations';

export default function MockDashboard() {
  const location = useLocation();
  const pathName = location.pathname.split('/').pop();
  
  // Create mock data based on the route
  const getMockData = () => {
    switch (pathName) {
      case 'events':
        return {
          title: 'Upcoming Events',
          icon: <Calendar className="w-6 h-6 text-white" />,
          color: 'bg-blue-500',
          items: [
            { id: 1, title: 'Web3 Builders Hackathon', desc: 'Join 500+ devs to build the future of decentralized finance.', time: 'Tomorrow, 10:00 AM' },
            { id: 2, title: 'AI Pitch Day', desc: 'Present your AI startups to top tier VCs from Sequoia and a16z.', time: 'Next Week, Friday' },
            { id: 3, title: 'React Performance Masterclass', desc: 'Deep dive into React 18 concurrent features.', time: 'Oct 24, 2:00 PM' }
          ]
        };
      case 'certificates':
        return {
          title: 'My Certificates',
          icon: <Award className="w-6 h-6 text-white" />,
          color: 'bg-amber-500',
          items: [
            { id: 1, title: 'Advanced Full-Stack Engineering', desc: 'Issued by Topper Mantra - Verified credentials.', time: 'Issued: Sep 2026' },
            { id: 2, title: 'Google Cloud Architect', desc: 'Passed the professional certification exam.', time: 'Issued: Aug 2026' }
          ]
        };
      case 'messages':
        return {
          title: 'Messages',
          icon: <MessageSquare className="w-6 h-6 text-white" />,
          color: 'bg-purple-500',
          items: [
            { id: 1, title: 'Sarah (Mentor)', desc: 'Great job on the recent project deploy! Let\'s chat tomorrow.', time: '2 hours ago' },
            { id: 2, title: 'Team Alpha', desc: 'Are we still on for the sync up at 5?', time: '5 hours ago' }
          ]
        };
      case 'notifications':
        return {
          title: 'Notifications',
          icon: <Bell className="w-6 h-6 text-white" />,
          color: 'bg-red-500',
          items: [
            { id: 1, title: 'Project Approved', desc: 'Your recent submission "AI Resume Builder" was approved.', time: '1 hour ago' },
            { id: 2, title: 'New Mentor Match', desc: 'You have been matched with a Senior Dev from Google.', time: '1 day ago' }
          ]
        };
      case 'hackathons':
        return {
          title: 'Live Hackathons',
          icon: <Clock className="w-6 h-6 text-white" />,
          color: 'bg-[#FF5722]',
          items: [
            { id: 1, title: 'Global AI Hackathon', desc: 'Build generative AI apps using Gemini.', time: 'Ends in 2 days' },
            { id: 2, title: 'Fintech Disruption 2026', desc: 'Reinvent the way students handle micro-transactions.', time: 'Starts next week' }
          ]
        };
      default:
        return {
          title: 'Dashboard',
          icon: <FileText className="w-6 h-6 text-white" />,
          color: 'bg-slate-800',
          items: [
            { id: 1, title: 'Sample Item 1', desc: 'This is some sample description for this item.', time: 'Just now' },
            { id: 2, title: 'Sample Item 2', desc: 'This is another sample item with details.', time: 'Yesterday' }
          ]
        };
    }
  };

  const data = getMockData();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${data.color} shadow-lg`}>
          {data.icon}
        </div>
        <h1 className="text-3xl font-black text-[#0F172A] font-heading">{data.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.items.map((item, i) => (
          <motion.div 
            key={item.id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-[#0F172A] leading-tight">{item.title}</h3>
            </div>
            <p className="text-slate-600 text-sm mb-6">{item.desc}</p>
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-500 rounded-full">
                {item.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

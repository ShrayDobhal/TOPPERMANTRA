import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

const interestsList = [
  'Hackathons', 'Open Source Projects', '1:1 Mentorship', 'Leadership Roles',
  'Research Papers', 'Summer Internships', 'Startup Building', 'Networking Events',
  'Coding Competitions', 'Tech Communities', 'Public Speaking', 'Freelancing'
];

export default function Step4Interests({ data = [], updateData }) {
  
  const toggleInterest = (interest) => {
    if (data.includes(interest)) {
      updateData(data.filter(i => i !== interest));
    } else {
      updateData([...data, interest]);
    }
  };

  return (
    <div className="w-full">
      <p className="text-sm text-[#64748B] mb-6">Select all that apply.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {interestsList.map((interest) => {
          const isSelected = data.includes(interest);

          return (
            <motion.button
              key={interest}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleInterest(interest)}
              className={cn(
                "p-4 rounded-xl text-sm font-bold transition-all border flex items-center gap-3 text-left",
                isSelected 
                  ? "bg-[#FF5722]/10 border-[#FF5722] text-[#FF5722]" 
                  : "bg-white border-[#E9ECEF] text-[#64748B] hover:border-[#CBD5E1] hover:text-[#0F172A]"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors",
                isSelected ? "bg-[#FF5722] border-[#FF5722] text-white" : "bg-white border-[#CBD5E1]"
              )}>
                {isSelected && <Check size={12} strokeWidth={3} />}
              </div>
              {interest}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

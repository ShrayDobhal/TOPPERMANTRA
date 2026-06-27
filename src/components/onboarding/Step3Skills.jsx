import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

const skillsList = [
  'Python', 'Java', 'C++', 'JavaScript', 'React', 'Node.js', 
  'AI', 'Machine Learning', 'Deep Learning', 'Cloud Computing', 'AWS', 
  'UI/UX Design', 'Figma', 'Power BI', 'SQL', 'Data Analytics', 
  'Blockchain', 'IoT', 'Docker', 'Kubernetes', 'Next.js', 'Tailwind CSS'
];

export default function Step3Skills({ data = [], updateData }) {
  
  const toggleSkill = (skill) => {
    if (data.includes(skill)) {
      updateData(data.filter(s => s !== skill));
    } else {
      if (data.length < 5) {
        updateData([...data, skill]);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-end">
        <p className="text-sm text-[#64748B]">Select up to 5 core skills.</p>
        <span className="text-xs font-bold text-[#FF5722] bg-[#FF5722]/10 px-2 py-1 rounded-md">
          {data.length} / 5
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {skillsList.map((skill) => {
          const isSelected = data.includes(skill);
          const isDisabled = !isSelected && data.length >= 5;

          return (
            <motion.button
              key={skill}
              whileHover={!isDisabled ? { scale: 1.05 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
              onClick={() => !isDisabled && toggleSkill(skill)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-bold transition-all border flex items-center gap-2",
                isSelected 
                  ? "bg-[#0F172A] border-[#0F172A] text-white shadow-md shadow-[#0F172A]/20" 
                  : isDisabled
                    ? "bg-[#F8FAFC] border-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed"
                    : "bg-white border-[#E9ECEF] text-[#64748B] hover:border-[#0F172A] hover:text-[#0F172A]"
              )}
            >
              {isSelected && <Check size={14} />}
              {skill}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

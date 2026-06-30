import { motion } from 'framer-motion';

const categories = [
  "Artificial Intelligence", "Machine Learning", "Web Development", 
  "App Development", "Cloud Computing", "Cyber Security", 
  "Blockchain", "Data Science", "IoT", "Robotics", 
  "UI UX", "Open Source", "Research", "Startup", "Product Management"
];

export default function CategoryCarousel() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            className="whitespace-nowrap px-4 py-2 bg-white border border-[#E9ECEF] rounded-full text-sm font-semibold text-[#64748B] hover:border-[#FF5722]/50 hover:text-[#0F172A] hover:shadow-sm transition-all shadow-sm"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

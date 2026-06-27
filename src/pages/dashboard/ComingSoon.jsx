import { motion } from 'framer-motion';
import { Hammer, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function ComingSoon() {
  const location = useLocation();
  const pathName = location.pathname.split('/').pop();
  const titleName = pathName.charAt(0).toUpperCase() + pathName.slice(1);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-12 rounded-[40px] border border-[#E9ECEF] shadow-lg max-w-lg w-full relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl mb-6">
            <Hammer size={32} className="text-[#FF5722]" />
          </div>
          
          <h2 className="text-3xl font-heading font-extrabold text-[#0F172A] mb-3">
            {titleName} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">Coming Soon</span>
          </h2>
          
          <p className="text-[#64748B] mb-8 font-medium">
            We are working hard to build the most premium {titleName.toLowerCase()} experience for you. This module will be available in the next phase!
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] border border-[#E9ECEF] rounded-full text-sm font-bold text-[#0F172A]">
            <Sparkles size={16} className="text-[#F59E0B]" />
            Stay tuned for updates
          </div>
        </div>
      </motion.div>
    </div>
  );
}

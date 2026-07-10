import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center font-sans p-4 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF5722]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        className="max-w-lg w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 relative z-10 text-center shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="w-20 h-20 bg-gradient-to-br from-[#FF5722] to-[#FE6D4D] rounded-2xl mx-auto flex items-center justify-center text-white mb-8 shadow-lg shadow-[#FF5722]/20"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Sparkles size={36} />
        </motion.div>

        <motion.h1 
          className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Welcome to Topper Mantra
        </motion.h1>
        
        <motion.p 
          className="text-[#94A3B8] text-lg mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Let's build your future together. We just need a few details to personalize your experience.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <p className="text-sm font-bold text-[#FF5722] uppercase tracking-wider mb-6">Step 1 of 5</p>
          <button 
            onClick={() => navigate('/onboarding')}
            className="w-full sm:w-auto mx-auto inline-flex items-center justify-center gap-3 py-4 px-8 bg-white hover:bg-gray-50 text-[#0F172A] text-lg font-bold rounded-xl shadow-xl transition-all hover:scale-105 group"
          >
            Let's Begin 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </motion.div>
    </div>
  );
}

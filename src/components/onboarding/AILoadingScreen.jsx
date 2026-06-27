import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const messages = [
  "Analyzing your profile...",
  "Estimating skill level...",
  "Finding mentors...",
  "Matching opportunities...",
  "Building your roadmap...",
  "Finding communities...",
  "Recommended internships...",
  "Recommended projects...",
  "Preparing dashboard..."
];

export default function AILoadingScreen({ onComplete }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Total duration is 4 seconds. We have ~9 messages.
    // Let's change message every 400ms.
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(prev => {
        if (prev < messages.length - 1) return prev + 1;
        return prev;
      });
    }, 400);

    // After 4 seconds, show "Ready" state
    const readyTimeout = setTimeout(() => {
      clearInterval(messageInterval);
      setIsReady(true);
    }, 4000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(readyTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center font-sans p-4 relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#FF5722]/20 to-[#3B82F6]/20 rounded-full blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        />
      </div>

      <div className="max-w-md w-full relative z-10 flex flex-col items-center text-center">
        
        {!isReady ? (
          <>
            <motion.div 
              className="w-24 h-24 relative mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
              <motion.div 
                className="absolute inset-0 border-4 border-transparent border-t-[#FF5722] border-r-[#FE6D4D] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "linear", repeat: Infinity }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <Sparkles size={32} className="animate-pulse text-[#FF5722]" />
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessageIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-xl font-bold font-heading text-white"
              >
                {messages[currentMessageIndex]}
              </motion.p>
            </AnimatePresence>
            
            {/* Progress Bar under text */}
            <div className="w-64 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
              />
            </div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-[#22C55E]/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-white mb-4">
              Your personalized ecosystem is ready.
            </h2>
            <button 
              onClick={onComplete}
              className="mt-4 py-4 px-8 bg-white hover:bg-gray-50 text-[#0F172A] text-lg font-bold rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all hover:scale-105 flex items-center gap-2 group"
            >
              Continue to Dashboard
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Target, Shield, ChevronDown } from "lucide-react";
import TiltCard from "../components/ui/TiltCard";
import MentorCard from "../components/mentors/MentorCard";
import { mockMentors } from "../lib/mockMentors";

export default function Mentors() {
  const { scrollY } = useScroll();
  const [scrollInVh, setScrollInVh] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrollInVh(latest / window.innerHeight);
    });
  }, [scrollY]);

  // Derived states based on exact viewport heights scrolled
  const showHero = scrollInVh < 0.8;
  const showText1 = scrollInVh >= 0.8 && scrollInVh < 1.6;
  const showText2 = scrollInVh >= 1.6 && scrollInVh < 2.2;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{ minHeight: "400vh" }} className="bg-[#FFFFFF] text-[#0F172A] relative selection:bg-[#FF5722] selection:text-white font-sans overflow-x-hidden">
      
      {/* Ambient Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
          className="absolute top-[20%] left-[15%] w-[400px] h-[400px] bg-[#FE6D4D]/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
          className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-[#FF5722]/5 blur-[120px] rounded-full" 
        />
      </div>

      <AnimatePresence>
        {/* STAGE 1: Hero */}
        {showHero && (
          <motion.div 
            key="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4 pt-20"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFFFF] border border-[#E9ECEF] text-[#FF5722] shadow-sm text-xs font-bold uppercase tracking-[0.2em] mb-12">
              <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" />
              Elite Mentorship
            </div>

            <h1 className="text-[5vw] sm:text-[6vw] lg:text-[7vw] font-extrabold tracking-tighter leading-[0.9] text-center max-w-7xl text-[#0F172A]">
              You don't need another roadmap<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B0B0B0] to-[#0F172A]">You need a guide</span>
            </h1>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute bottom-12 flex flex-col items-center text-[#B0B0B0]"
            >
              <ChevronDown className="w-6 h-6 text-[#FF5722]" />
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 2: Reality */}
        {showText1 && (
          <motion.div 
            key="text1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none px-4"
          >
            <div className="max-w-4xl text-center">
              <p className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#0F172A] leading-tight">
                95% of students ask AI for career advice
              </p>
              <p className="text-xl md:text-3xl text-[#FE6D4D] mt-6 font-bold">
                The top 1% ask the engineers who built it
              </p>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: Secret */}
        {showText2 && (
          <motion.div 
            key="text2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none px-4"
          >
            <div className="max-w-4xl text-center">
              <p className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] leading-tight">
                No sugarcoating <br/>
                Just brutal, <span className="text-[#FF5722]">actionable truths</span> to get you hired
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* STAGE 4: Final View */}
      <div 
        style={{ paddingTop: "300vh" }} 
        className="relative z-30 w-full pointer-events-none"
      >
        <div className="bg-[#FFFFFF] pb-32 px-4 sm:px-6 lg:px-8 shadow-[0_-40px_40px_rgba(255,255,255,1)] pointer-events-auto">
          <div className="max-w-[1200px] mx-auto pt-20">
            
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 text-[#0F172A]">
                The Inner <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">Circle</span>
              </h2>
              <p className="text-xl text-[#0F172A] max-w-2xl mx-auto font-semibold leading-relaxed">
                Direct access to senior engineers from Google, Amazon, Microsoft, and elite YC startups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
              {/* Box 1 */}
              <TiltCard className="md:col-span-1 row-span-1 h-full">
                <div className="bg-[#FFFFFF] rounded-3xl p-8 border border-[#E9ECEF] shadow-sm flex flex-col justify-between h-full group hover:border-[#FF5722]/30 transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 text-[#FF5722]">
                      <Star size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-3 tracking-tight">1-on-1 Guidance</h3>
                    <p className="text-[#64748B] font-medium leading-relaxed">
                      Personalized career roadmaps designed specifically for your strengths.
                    </p>
                  </div>
                </div>
              </TiltCard>

              {/* Box 2 */}
              <TiltCard className="md:col-span-1 row-span-1 h-full">
                <div className="bg-[#FFFFFF] rounded-3xl p-8 border border-[#E9ECEF] shadow-sm flex flex-col justify-between h-full group hover:border-[#FF5722]/30 transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 text-[#FF5722]">
                      <Target size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-3 tracking-tight">Interview Prep</h3>
                    <p className="text-[#64748B] font-medium leading-relaxed">
                      Mock interviews with engineers who actually conduct them at top companies.
                    </p>
                  </div>
                </div>
              </TiltCard>

              {/* Box 3 */}
              <TiltCard className="md:col-span-1 row-span-1 h-full">
                <div className="bg-[#FFFFFF] rounded-3xl p-8 border border-[#E9ECEF] shadow-sm flex flex-col justify-between h-full group hover:border-[#FF5722]/30 transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 text-[#FF5722]">
                      <Shield size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-3 tracking-tight">Resume Reviews</h3>
                    <p className="text-[#64748B] font-medium leading-relaxed">
                      Tear-downs and rebuilds of your resume to bypass ATS filters effortlessly.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>

            <div className="mt-24 mb-8 text-center">
              <h3 className="text-3xl font-bold text-[#0F172A] mb-4">Meet Your Mentors</h3>
              <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
                Select from our curated list of elite engineers ready to guide your journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} onViewProfile={() => window.location.href = '/signup'} />
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex justify-center"
            >
              <Link 
                to="/signup"
                className="px-8 py-4 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold rounded-xl transition-all duration-300 flex items-center gap-3 group"
              >
                Find Your Mentor
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Zap, Users, Globe, ChevronDown } from "lucide-react";
import TiltCard from "../components/ui/TiltCard";

export default function Community() {
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
              The Network
            </div>

            <h1 className="text-[5vw] sm:text-[6vw] lg:text-[7vw] font-extrabold tracking-tighter leading-[0.9] text-center max-w-7xl text-[#0F172A]">
              Lone wolves don't build unicorns<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B0B0B0] to-[#0F172A]">Welcome to the collective</span>
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
                Most students grind LeetCode in total isolation
              </p>
              <p className="text-xl md:text-3xl text-[#FE6D4D] mt-6 font-bold">
                The top 1% build alongside founders, hackers, and prodigies
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
                A high-frequency network where your next <br/>
                <span className="text-[#FF5722]">co-founder</span> is already waiting
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
                Connect. Build. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">Scale</span>
              </h2>
              <p className="text-xl text-[#0F172A] max-w-2xl mx-auto font-semibold leading-relaxed">
                Find teammates, get code reviews from seniors, and participate in exclusive hackathons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <TiltCard className="h-full">
                <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E9ECEF] shadow-sm hover:border-[#FF5722]/30 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 text-[#FF5722]">
                    <Users size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">Find Teammates</h3>
                  <p className="text-[#64748B] font-medium leading-relaxed">Filter by skill, stack, and ambition level to find your perfect match.</p>
                </div>
              </TiltCard>

              {/* Feature 2 */}
              <TiltCard className="h-full">
                <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E9ECEF] shadow-sm hover:border-[#FF5722]/30 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 text-[#FF5722]">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">Live AMAs</h3>
                  <p className="text-[#64748B] font-medium leading-relaxed">Weekly unrecorded voice sessions with industry leaders.</p>
                </div>
              </TiltCard>

              {/* Feature 3 */}
              <TiltCard className="h-full">
                <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E9ECEF] shadow-sm hover:border-[#FF5722]/30 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 text-[#FF5722]">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">Hackathons</h3>
                  <p className="text-[#64748B] font-medium leading-relaxed">Compete in high-stakes builds with cash prizes and investor eyes.</p>
                </div>
              </TiltCard>

              {/* Feature 4 */}
              <TiltCard className="h-full">
                <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E9ECEF] shadow-sm hover:border-[#FF5722]/30 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 text-[#FF5722]">
                    <Globe size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">Global Reach</h3>
                  <p className="text-[#64748B] font-medium leading-relaxed">Connect with ambitious builders from top universities worldwide.</p>
                </div>
              </TiltCard>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex justify-center"
            >
              <Link 
                to="/login"
                className="px-8 py-4 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold rounded-xl transition-all duration-300 flex items-center gap-3 group"
              >
                Join the Community
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

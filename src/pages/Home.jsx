import React, { useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Code, Zap, Briefcase, ChevronDown, Users } from "lucide-react";
import TiltCard from "../components/ui/TiltCard";
import MagneticButton from "../components/ui/MagneticButton";

export default function Home() {
  const { scrollY } = useScroll();
  const [scrollInVh, setScrollInVh] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      // Calculate exactly how many viewport heights the user has scrolled
      setScrollInVh(latest / window.innerHeight);
    });
  }, [scrollY]);

  // Because Stage 4 starts at 300vh, its content enters the bottom of the screen at 2.0 vh and reaches the middle at 2.5 vh.
  // We guarantee Stage 3 unmounts gracefully at 2.2 vh, BEFORE Stage 4 can possibly overlap it!
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
      
      {/* Ambient Orbs - Fixed to background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
          className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#FE6D4D]/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
          className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[#FF5722]/5 blur-[120px] rounded-full" 
        />
      </div>

      {/* The Storytelling Text Layers */}
      <AnimatePresence>
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
              Talent Is Everywhere. Opportunity Isn't
            </div>

            <h1 className="text-[5vw] sm:text-[6vw] lg:text-[7vw] font-extrabold tracking-tighter leading-[0.9] text-center max-w-7xl text-[#0F172A]">
              The Education System <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B0B0B0] to-[#0F172A]">is Mass Producing You</span>
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
                1.5 Million engineers graduate in India every year
              </p>
              <p className="text-xl md:text-3xl text-[#FE6D4D] mt-6 font-bold">
                90% of them are deemed unemployable
              </p>
            </div>
          </motion.div>
        )}

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
                While you memorize textbooks <br/>
                the <span className="text-[#FF5722]">Top 1%</span> are building a parallel ecosystem
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 4: The Ecosystem - Uses inline paddingTop to reliably push the content down 3 screens */}
      <div 
        style={{ paddingTop: "300vh" }} 
        className="relative z-30 w-full pointer-events-none"
      >
        {/* The actual content wrapper which re-enables pointer events and has a solid background */}
        <div className="bg-[#FFFFFF] pb-32 px-4 sm:px-6 lg:px-8 shadow-[0_-40px_40px_rgba(255,255,255,1)] pointer-events-auto">
          <div className="max-w-[1400px] mx-auto pt-20">
            
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 text-[#0F172A]">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">Topper Mantra</span>
              </h2>
              <p className="text-xl text-[#0F172A] max-w-2xl mx-auto font-semibold leading-relaxed">
                Not a course. Not a bootcamp. A high-pressure, elite environment that forces you to become an exceptional engineer.
              </p>
            </div>

            {/* The Bento Grid Ecosystem */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 auto-rows-min">
              
              {/* Box 1: IIT Mentorship */}
              <TiltCard className="col-span-1">
                <div className="h-full bg-[#FFFFFF] rounded-3xl p-8 lg:p-10 border border-[#E9ECEF] shadow-sm flex flex-col justify-start group hover:border-[#FF5722] hover:shadow-[0_20px_60px_-15px_rgba(255,87,34,0.3)] transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF5722]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="w-16 h-16 rounded-2xl bg-[#FF5722]/10 flex items-center justify-center mb-6 text-[#FF5722] group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <Users size={28} />
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#0F172A] mb-4 tracking-tight relative z-10">Mentorship That Matters</h3>
                  <p className="text-[#64748B] text-lg font-medium leading-relaxed relative z-10 group-hover:text-[#0F172A]/80 transition-colors duration-500">
                    Learn from IIT students, alumni, researchers, and engineers who have recently cracked the journey you're about to begin. Get practical guidance, personalized feedback, and roadmaps shaped by real industry experience - not outdated theory
                  </p>
                </div>
              </TiltCard>

              {/* Box 2: Competitive Cohorts */}
              <TiltCard className="col-span-1">
                <div className="h-full bg-[#FFFFFF] rounded-3xl p-8 lg:p-10 border border-[#E9ECEF] shadow-sm flex flex-col justify-start group hover:border-[#FF5722] hover:shadow-[0_20px_60px_-15px_rgba(255,87,34,0.3)] transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-bl from-[#FF5722]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 text-[#FF5722] group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <Lock size={28} />
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#0F172A] mb-4 tracking-tight relative z-10">Competitive Cohorts</h3>
                  <p className="text-[#64748B] text-lg font-medium leading-relaxed relative z-10 group-hover:text-[#0F172A]/80 transition-colors duration-500">
                    Join a carefully selected cohort of ambitious students where consistency matters. Solve weekly challenges, receive mentor feedback, collaborate with high-performing peers, and grow in an environment built around accountability - not attendance
                  </p>
                </div>
              </TiltCard>

              {/* Box 3: Real Production Projects */}
              <TiltCard className="col-span-1">
                <div className="h-full bg-[#FFFFFF] rounded-3xl p-8 lg:p-10 border border-[#E9ECEF] shadow-sm flex flex-col justify-start group hover:border-[#FF5722] hover:shadow-[0_20px_60px_-15px_rgba(255,87,34,0.3)] transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5722]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 text-[#FF5722] group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <Code size={28} />
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#0F172A] mb-4 tracking-tight relative z-10">Real Production Projects</h3>
                  <p className="text-[#64748B] text-lg font-medium leading-relaxed relative z-10 group-hover:text-[#0F172A]/80 transition-colors duration-500">
                    Move beyond tutorial projects. Work on scalable applications with real users, collaborate through structured workflows, and graduate with a portfolio that speaks louder than a resume
                  </p>
                </div>
              </TiltCard>

              {/* Box 4: Builder Community */}
              <TiltCard className="col-span-1">
                <div className="h-full bg-[#FFFFFF] rounded-3xl p-8 lg:p-10 border border-[#E9ECEF] shadow-sm flex flex-col justify-start group hover:border-[#FF5722] hover:shadow-[0_20px_60px_-15px_rgba(255,87,34,0.3)] transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-tl from-[#FF5722]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 text-[#FF5722] group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <Zap size={28} />
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#0F172A] mb-4 tracking-tight relative z-10">Builder Community</h3>
                  <p className="text-[#64748B] text-lg font-medium leading-relaxed relative z-10 group-hover:text-[#0F172A]/80 transition-colors duration-500">
                    Join a focused community where builders help builders. Ask questions, share resources, participate in discussions, discover opportunities, and collaborate with students who are committed to continuous growth
                  </p>
                </div>
              </TiltCard>
              
              {/* Box 5: Recruitment Banner */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.4 }}
                className="md:col-span-2 bg-[#0F172A] rounded-3xl p-8 md:p-12 lg:p-16 border border-[#E9ECEF]/10 shadow-2xl overflow-hidden relative group mt-4"
              >
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF5722] via-transparent to-transparent group-hover:opacity-30 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full gap-8">
                  <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#FE6D4D] shadow-sm text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                      <Briefcase size={14} />
                      Career Transformation
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Stop Applying <br/>Start Getting Recruited</h3>
                    <p className="text-gray-400 font-medium text-lg">
                      When you build what matters, companies come to you. 
                    </p>
                  </div>
                  
                  <MagneticButton>
                    <Link 
                      to="/signup"
                      className="px-8 py-4 bg-[#FF5722] hover:bg-[#FE6D4D] text-white font-bold rounded-xl transition-all duration-300 flex items-center gap-3 shrink-0 shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_30px_rgba(255,87,34,0.6)]"
                    >
                      Join the Ecosystem
                      <ArrowRight size={20} />
                    </Link>
                  </MagneticButton>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

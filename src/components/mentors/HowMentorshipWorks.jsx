import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, CalendarCheck, Map, Compass, Rocket, Code, Award } from "lucide-react";
import { fadeUp, staggerContainer } from "../../lib/animations";

export default function HowMentorshipWorks() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const steps = [
    { icon: <Search />, title: "Choose Mentor", desc: "Filter by college, expertise, and goals." },
    { icon: <CalendarCheck />, title: "Book Session", desc: "Select a time that works for both of you." },
    { icon: <Map />, title: "Personalized Roadmap", desc: "Get a custom plan based on your current level." },
    { icon: <Compass />, title: "Weekly Guidance", desc: "Stay on track with regular 1-on-1 check-ins." },
    { icon: <Code />, title: "Project Reviews", desc: "Get your code reviewed by industry professionals." },
    { icon: <Rocket />, title: "Mock Interviews", desc: "Practice real interview questions and scenarios." },
    { icon: <Award />, title: "Career Preparation", desc: "Nail your internship or job placement." },
  ];

  return (
    <section ref={containerRef} className="py-24 bg-white relative">
      <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4 text-[#0F172A]"
          >
            How Mentorship <span className="text-[#FF5722]">Works</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#64748B] max-w-2xl mx-auto"
          >
            A structured path from finding the right guide to landing your dream role.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Line Background */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 rounded-full" />
          
          {/* Animated Scroll Line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-[#FF5722] -translate-x-1/2 rounded-full origin-top"
            style={{ scaleY: scrollYProgress }}
          />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12 md:space-y-24 relative"
          >
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div 
                  key={i} 
                  variants={fadeUp}
                  className={`flex flex-col md:flex-row items-start md:items-center justify-between w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-[45%]"></div>

                  {/* Icon Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-slate-200 shadow-sm z-10 transition-colors duration-500 group-hover:border-[#FF5722]">
                    <div className="text-slate-400 group-hover:text-[#FF5722] transition-colors duration-500 w-5 h-5">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 border border-[#E9ECEF] shadow-sm hover:shadow-xl hover:border-[#FF5722]/30 transition-all duration-300">
                      <div className="text-[#FF5722] font-black text-4xl opacity-10 mb-2 font-heading">
                        0{i + 1}
                      </div>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-2">{step.title}</h3>
                      <p className="text-[#64748B] text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

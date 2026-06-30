import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { UserPlus, Users, Code, MessagesSquare, Trophy, Briefcase, Award } from "lucide-react";

const steps = [
  { title: "Student Joins", desc: "Creates a profile and sets career goals.", icon: <UserPlus size={20} /> },
  { title: "Finds Mentor", desc: "Connects with an IIT or industry expert for 1-on-1 guidance.", icon: <Users size={20} /> },
  { title: "Builds Project", desc: "Collaborates on open source or personal projects to build proof-of-work.", icon: <Code size={20} /> },
  { title: "Joins Community", desc: "Engages in goal-based spaces and college chapters.", icon: <MessagesSquare size={20} /> },
  { title: "Wins Hackathon", desc: "Competes and validates skills globally.", icon: <Trophy size={20} /> },
  { title: "Gets Internship", desc: "Lands an internship through AI-matched opportunities.", icon: <Briefcase size={20} /> },
  { title: "Gets Job", desc: "Secures a full-time role at a top tech company.", icon: <Award size={20} /> },
];

export default function StudentJourney() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // The glowing line height fills up from 0 to 100% as you scroll down
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={containerRef}>
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-[#0F172A]">
          The Proven <span className="text-[#FF5722]">Journey</span>
        </h2>
        <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
          We don't just provide resources. We guide you through the exact blueprint to go from an absolute beginner to a top-tier engineer.
        </p>
      </div>

      <div className="relative max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Background Track */}
        <div className="absolute left-[39px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-slate-100 rounded-full" />
        
        {/* Glowing Animated Line */}
        <motion.div 
          className="absolute left-[39px] md:left-1/2 md:-translate-x-1/2 top-0 w-1 bg-gradient-to-b from-[#FF5722] to-[#FE6D4D] rounded-full shadow-[0_0_10px_rgba(255,87,34,0.6)]"
          style={{ height: lineHeight }}
        />

        {steps.map((step, index) => {
          // Determine if the node is "active" based on scroll position
          // Just a simple trigger: if scroll progress passes a certain threshold
          const stepProgress = index / (steps.length - 1);
          const isActive = useTransform(scrollYProgress, (v) => v >= stepProgress - 0.05);

          return (
            <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 last:mb-0">
              
              {/* Left Side (Empty on mobile, alternating on desktop) */}
              <div className={`hidden md:block w-[45%] text-right ${index % 2 === 0 ? "md:pr-12" : "md:order-3 md:pl-12 md:text-left"}`}>
                {index % 2 === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{step.title}</h3>
                    <p className="text-[#64748B]">{step.desc}</p>
                  </motion.div>
                )}
                {index % 2 !== 0 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{step.title}</h3>
                    <p className="text-[#64748B]">{step.desc}</p>
                  </motion.div>
                )}
              </div>

              {/* Center Node */}
              <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center z-10 md:order-2">
                <motion.div 
                  className="w-full h-full rounded-full bg-[#FF5722] flex items-center justify-center text-white shadow-lg"
                  style={{ opacity: isActive }}
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                >
                  {step.icon}
                </motion.div>
              </div>

              {/* Mobile Right Side (Desktop Alternating) */}
              <div className={`w-full pl-20 md:w-[45%] md:pl-0 ${index % 2 === 0 ? "md:order-3 md:pl-12 md:text-left" : "md:order-1 md:pr-12 md:text-right"}`}>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="md:hidden"
                >
                   <h3 className="text-xl font-bold text-[#0F172A] mb-1">{step.title}</h3>
                   <p className="text-[#64748B] text-sm">{step.desc}</p>
                </motion.div>
                
                {/* Desktop layout duplicate logic for the missing side to keep flex balanced */}
                <div className="hidden md:block">
                    {/* Empty placeholder to keep flex space */}
                </div>
              </div>
              
            </div>
          );
        })}
      </div>
    </section>
  );
}

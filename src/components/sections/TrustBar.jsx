import React from "react";
import { motion } from "framer-motion";

const companies = [
  "Google", "Microsoft", "Amazon", "Adobe", "Atlassian", "NVIDIA"
];

const colleges = [
  "IIT Delhi", "IIT Bombay", "IIT Kanpur", "IIT Madras", 
  "IIT Roorkee", "IIT Kharagpur", "BITS Pilani", "IIIT Hyderabad", "NIT Trichy"
];

const hackathons = [
  "SIH", "GSoC", "ICPC", "ETHIndia", "HackMIT"
];

export default function TrustBar() {
  const allLogos = [...companies, ...colleges, ...hackathons];

  return (
    <section className="py-12 bg-slate-50 border-b border-[#E9ECEF] overflow-hidden relative">
      <div className="text-center mb-8">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Trusted by students from & hired at
        </p>
      </div>

      <div className="relative flex overflow-x-hidden w-full group">
        {/* Left Gradient Fade */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10" />
        
        {/* Right Gradient Fade */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap gap-12 sm:gap-20 items-center px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* We duplicate the array to create a seamless infinite loop */}
          {[...allLogos, ...allLogos].map((logo, index) => (
            <div 
              key={index} 
              className="text-xl md:text-2xl font-bold font-heading text-slate-300 transition-colors hover:text-[#0F172A] cursor-default"
            >
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { fadeUp, staggerContainer } from "../../lib/animations";

export default function StudentReviews() {
  const reviews = [
    {
      student: "Arjun Verma",
      college: "Tier-3 Engineering College",
      rating: 5,
      text: "I was completely lost in DSA. My mentor from IIT Delhi structured a 3-month roadmap for me. Not only did I understand DP, but I cleared my Amazon OA last week.",
      mentor: "Rahul Sharma"
    },
    {
      student: "Sneha Patel",
      college: "NIT Surathkal",
      rating: 5,
      text: "The resume review session was an eye-opener. I learned how ATS systems work and completely rewrote my bullet points. Landed 3 interviews the next month.",
      mentor: "Priya Das"
    },
    {
      student: "Karan Singh",
      college: "BITS Pilani",
      rating: 5,
      text: "Building my first SaaS product seemed impossible. Having a founder mentor me meant I avoided all the rookie mistakes with auth and database architecture.",
      mentor: "Arjun Reddy"
    }
  ];

  return (
    <section className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF5722]/10 rounded-full blur-[120px] pointer-events-none -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -ml-64 -mb-64" />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white"
          >
            Don't Just Take <span className="text-[#FF5722]">Our Word</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Hear from students who transformed their careers through 1-on-1 mentorship.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {reviews.map((rev, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative group hover:bg-white/10 transition-colors duration-300"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5 rotate-180 group-hover:text-[#FF5722]/20 transition-colors duration-300" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(rev.rating)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-slate-300 leading-relaxed mb-8 italic min-h-[120px]">
                "{rev.text}"
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-lg">
                  {rev.student.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{rev.student}</h4>
                  <p className="text-xs text-slate-400 mb-1">{rev.college}</p>
                  <p className="text-[10px] font-bold text-[#FF5722] uppercase tracking-wider">
                    Mentored by {rev.mentor}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

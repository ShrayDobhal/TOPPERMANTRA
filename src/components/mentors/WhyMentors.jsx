import React from "react";
import { motion } from "framer-motion";
import { Target, Users, CheckCircle, Clock } from "lucide-react";
import { fadeUp, staggerContainer } from "../../lib/animations";

export default function WhyMentors() {
  const reasons = [
    {
      icon: <Target className="w-8 h-8 text-[#FF5722]" />,
      title: "Recently Cracked The Journey",
      desc: "Students receive practical guidance from mentors who recently achieved these milestones. No outdated advice.",
    },
    {
      icon: <Users className="w-8 h-8 text-[#FF5722]" />,
      title: "Peer-Like Guidance",
      desc: "Advice is relatable because mentors have recently walked the same path. It feels like talking to a senior.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-[#FF5722]" />,
      title: "Verified Achievements",
      desc: "Every mentor is manually verified before joining. We ensure their college, degree, and company are 100% authentic.",
    },
    {
      icon: <Clock className="w-8 h-8 text-[#FF5722]" />,
      title: "Long-Term Mentorship",
      desc: "Students build ongoing relationships instead of one-time calls. It's about career growth, not just resume reviews.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 border-y border-[#E9ECEF]">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4 text-[#0F172A]"
          >
            Why Topper Mantra Mentors Are <span className="text-[#FF5722]">Different</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#64748B] max-w-2xl mx-auto"
          >
            We don't just list executives who have been out of touch with the hiring market for 15 years.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((r, i) => (
            <motion.div 
              key={i}
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 border border-[#E9ECEF] shadow-sm hover:shadow-xl hover:border-[#FF5722]/30 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#FF5722]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FF5722]/20 transition-all duration-300">
                {r.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{r.title}</h3>
              <p className="text-[#64748B] leading-relaxed text-sm">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { fadeUp, staggerContainer } from "../../lib/animations";

export default function MentorSuccessStories() {
  const stories = [
    {
      student: { name: "Ananya S.", status: "Tier-3 College", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" },
      mentor: { name: "Kunal M.", status: "SDE @ Amazon", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
      achievement: "Amazon SDE Intern",
      quote: "My mentor helped me realize my resume was getting auto-rejected by ATS. We fixed it, did 3 mock interviews, and I finally cleared the OA."
    },
    {
      student: { name: "Vikram R.", status: "Self-taught Developer", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" },
      mentor: { name: "Sanya P.", status: "GSoC Mentor", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
      achievement: "GSoC '24 Contributor",
      quote: "I was intimidated by open source. Sanya guided me through my first PR, taught me git workflow, and I successfully contributed to Mozilla."
    }
  ];

  return (
    <section className="py-24 bg-[#0F172A] border-t border-slate-800 overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white"
          >
            The <span className="text-[#FF5722]">Before & After</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Real transformations powered by 1-on-1 guidance.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {stories.map((story, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-slate-800/50 rounded-3xl p-8 border border-slate-700/50 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-[#FF5722]/10 transition-colors" />
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 relative z-10">
                {/* Student */}
                <div className="flex flex-col items-center text-center">
                  <img src={story.student.img} alt={story.student.name} className="w-20 h-20 rounded-full border-4 border-slate-700 mb-3 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <h4 className="text-white font-bold">{story.student.name}</h4>
                  <p className="text-xs text-slate-400">{story.student.status}</p>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center">
                  <div className="bg-[#FF5722] text-white text-[10px] font-bold px-3 py-1 rounded-full mb-2 shadow-[0_0_15px_rgba(255,87,34,0.4)]">
                    {story.achievement}
                  </div>
                  <ArrowRight className="w-8 h-8 text-[#FF5722]" />
                </div>

                {/* Mentor */}
                <div className="flex flex-col items-center text-center">
                  <img src={story.mentor.img} alt={story.mentor.name} className="w-20 h-20 rounded-full border-4 border-[#FF5722]/30 mb-3 object-cover" />
                  <h4 className="text-white font-bold">{story.mentor.name}</h4>
                  <p className="text-xs text-[#FF5722]">{story.mentor.status}</p>
                </div>
              </div>

              <div className="relative z-10 bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
                <Quote className="absolute top-4 right-4 w-12 h-12 text-slate-800 rotate-180" />
                <p className="text-slate-300 italic relative z-10 text-sm md:text-base leading-relaxed">
                  "{story.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

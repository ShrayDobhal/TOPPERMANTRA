import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/animations";

export default function MentorCategories({ onSelectCategory }) {
  const categories = [
    { icon: "🏛", title: "IIT Mentors", desc: "Cracked JEE & top tech companies" },
    { icon: "🎓", title: "Alumni", desc: "Industry veterans from top colleges" },
    { icon: "🏆", title: "Hackathon Winners", desc: "Global champions (SIH, ETH)" },
    { icon: "🚀", title: "Startup Founders", desc: "Funded and bootstrapped builders" },
    { icon: "💻", title: "Open Source", desc: "GSoC and major contributors" },
    { icon: "📚", title: "Research", desc: "Published authors & interns" },
    { icon: "🤖", title: "AI Experts", desc: "LLMs, ML, and Data Science" },
    { icon: "📈", title: "Product Mentors", desc: "PMs from FAANG and Unicorns" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold font-heading text-[#0F172A] mb-2">Explore Categories</h2>
            <p className="text-[#64748B]">Find the exact mentor for your specific goals.</p>
          </div>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={i}
              variants={fadeUp}
              onClick={() => onSelectCategory(cat.title)}
              className="group text-left bg-white border border-[#E9ECEF] rounded-2xl p-6 hover:border-[#FF5722] hover:shadow-[0_8px_30px_rgb(255,87,34,0.12)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF5722]/5 to-transparent rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150"></div>
              
              <div className="text-4xl mb-4 relative z-10 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                {cat.icon}
              </div>
              <h3 className="font-bold text-[#0F172A] mb-1 relative z-10 group-hover:text-[#FF5722] transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-[#64748B] relative z-10">
                {cat.desc}
              </p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

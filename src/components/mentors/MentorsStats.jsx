import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Counter = ({ from, to, duration = 2, suffix = "+" }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      const currentCount = Math.floor(from + (to - from) * easeOut);
      
      setCount(currentCount);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration, isInView]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default function MentorsStats() {
  const stats = [
    { label: "Verified Mentors", value: 500, suffix: "+" },
    { label: "IIT Alumni", value: 40, suffix: "+" },
    { label: "Hackathon Winners", value: 150, suffix: "+" },
    { label: "Mentorship Sessions", value: 10000, suffix: "+" },
    { label: "Student Satisfaction", value: 95, suffix: "%" }
  ];

  return (
    <section className="py-12 bg-[#0F172A] border-y border-slate-800 relative z-20">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center md:justify-between gap-8 md:gap-4 text-center">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center min-w-[140px]"
            >
              <div className="text-3xl md:text-5xl font-black font-heading text-[#FF5722] mb-2 tracking-tight">
                <Counter from={0} to={stat.value} duration={2.5} suffix={stat.suffix} />
              </div>
              <div className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

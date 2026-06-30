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
      
      // Easing out function
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

export default function SocialProof() {
  const stats = [
    { label: "Students Building", value: 50000 },
    { label: "IIT Mentors", value: 500 },
    { label: "Projects Built", value: 10000 },
    { label: "Hackathons", value: 250 },
    { label: "Partner Colleges", value: 100 }
  ];

  return (
    <section className="py-16 md:py-20 border-y border-[#E9ECEF] bg-white relative z-20">
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
              <div className="text-4xl md:text-5xl font-black font-heading text-[#FF5722] mb-2 tracking-tight">
                <Counter from={0} to={stat.value} duration={2.5} />
              </div>
              <div className="text-sm md:text-base font-bold text-slate-500 uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

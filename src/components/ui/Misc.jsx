import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "../../lib/utils";

export function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-[#FF5722]/10 text-[#FF5722]",
    success: "bg-[#22C55E]/10 text-[#22C55E]",
    warning: "bg-[#FACC15]/10 text-[#FACC15]",
    error: "bg-[#EF4444]/10 text-[#EF4444]",
    neutral: "bg-[#E9ECEF] text-[#64748B]"
  };
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider", variants[variant], className)}>
      {children}
    </span>
  );
}

export function Tag({ children, className }) {
  return (
    <span className={cn("inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-[#E9ECEF]/50 text-[#64748B] hover:bg-[#E9ECEF] hover:text-[#0F172A] transition-colors cursor-pointer", className)}>
      {children}
    </span>
  );
}

export function Divider({ className }) {
  return (
    <div className={cn("w-full h-[1px] bg-gradient-to-r from-transparent via-[#E9ECEF] to-transparent my-8", className)}></div>
  );
}

export function AnimatedCounter({ end, duration = 2, suffix = "", className }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let startTime;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={cn("font-heading font-bold text-[#0F172A]", className)}>
      {count}{suffix}
    </span>
  );
}

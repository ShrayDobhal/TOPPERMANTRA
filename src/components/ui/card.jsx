import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const baseCard = "rounded-[24px] overflow-hidden transition-all duration-300";

export function FeatureCard({ children, className, ...props }) {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)" }}
      className={cn(baseCard, "bg-white border border-[#E9ECEF] p-8", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function GlassCard({ children, className, ...props }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={cn(baseCard, "bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] p-8", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function GradientCard({ children, className, ...props }) {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(255,87,34,0.2)" }}
      className={cn(baseCard, "bg-gradient-to-br from-[#FF5722]/5 to-[#FE6D4D]/10 border border-[#FF5722]/20 p-8", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CTACard({ children, className, ...props }) {
  return (
    <motion.div 
      className={cn(baseCard, "bg-[#0F172A] text-white p-12 relative shadow-2xl", className)}
      {...props}
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF5722]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Reusable parts inside cards
export function CardHeading({ children, className }) {
  return <h3 className={cn("text-[24px] font-heading font-bold text-[#0F172A] mb-3", className)}>{children}</h3>;
}

import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function Button({ 
  children, 
  variant = "primary", 
  className, 
  ...props 
}) {
  const baseStyles = "relative inline-flex items-center justify-center font-sans font-medium rounded-full transition-all duration-300 px-6 py-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-[#FF5722] text-white hover:bg-[#E64A19] shadow-[0_4px_14px_0_rgba(255,87,34,0.39)] hover:shadow-[0_6px_20px_rgba(255,87,34,0.23)] hover:-translate-y-0.5 focus:ring-[#FF5722]",
    secondary: "bg-[#FE6D4D]/10 text-[#FF5722] hover:bg-[#FE6D4D]/20 focus:ring-[#FE6D4D]",
    outline: "border-2 border-[#E9ECEF] bg-transparent text-[#0F172A] hover:border-[#FF5722] hover:text-[#FF5722] focus:ring-[#E9ECEF]",
    gradient: "bg-gradient-to-r from-[#FF5722] to-[#FE6D4D] text-white shadow-[0_4px_14px_0_rgba(254,109,77,0.39)] hover:shadow-[0_6px_20px_rgba(254,109,77,0.23)] hover:-translate-y-0.5 focus:ring-[#FF5722]"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

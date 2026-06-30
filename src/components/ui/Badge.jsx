import { cn } from "../../lib/utils";

export function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-[#F1F5F9] text-[#64748B]",
    primary: "bg-[#FF5722]/10 text-[#FF5722]",
    success: "bg-[#22C55E]/10 text-[#22C55E]",
    warning: "bg-[#F59E0B]/10 text-[#F59E0B]",
    danger: "bg-[#EF4444]/10 text-[#EF4444]",
    info: "bg-[#3B82F6]/10 text-[#3B82F6]",
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}

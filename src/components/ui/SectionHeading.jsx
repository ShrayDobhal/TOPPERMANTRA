import { cn } from "../../lib/utils";

export function SectionHeading({ title, subtitle, className, alignment = "center" }) {
  return (
    <div className={cn("mb-16", alignment === "center" ? "text-center mx-auto" : "text-left", className)}>
      <h2 className="text-[48px] font-heading font-bold text-dark-text tracking-tight mb-4 leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[18px] text-gray-text max-w-2xl font-sans leading-relaxed text-balance mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function HeroHeading({ children, className }) {
  return (
    <h1 className={cn("text-[64px] md:text-[72px] font-heading font-extrabold text-dark-text tracking-tighter leading-[1.05]", className)}>
      {children}
    </h1>
  );
}

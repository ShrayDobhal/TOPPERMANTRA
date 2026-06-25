import { cn } from "../../lib/utils";

export function SectionWrapper({ children, className, id, ...props }) {
  return (
    <section 
      id={id}
      className={cn("py-24 md:py-32 relative", className)} 
      {...props}
    >
      {children}
    </section>
  );
}

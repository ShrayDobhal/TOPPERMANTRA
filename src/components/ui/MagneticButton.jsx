import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export default function MagneticButton({
  children,
  className,
  variant = "default",
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    default: "bg-primary text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20",
    outline: "border border-orange-200/50 bg-white text-gray-900 hover:border-primary hover:text-primary shadow-sm hover:bg-orange-50/50",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-orange-50/50"
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative flex items-center justify-center px-6 py-3 rounded-full font-medium transition-colors duration-300",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

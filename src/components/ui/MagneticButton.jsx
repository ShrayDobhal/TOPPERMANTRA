import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className, onClick }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Move the button 30% of the distance from the center
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-block cursor-pointer ${className}`}
    >
      <motion.div
        whileTap={{ scale: 0.93 }}
        onClick={onClick}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, staggerContainer } from '../../lib/animations';
import { Button } from '../ui/Button';

// Avatar Mock Data
const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
];

// Floating Particle Component
const Particle = ({ delay, duration, xOffset, yOffset, size, opacity }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-white blur-[1px]"
      style={{
        width: size,
        height: size,
        opacity: opacity,
        left: `${50 + xOffset}%`,
        top: `${50 + yOffset}%`
      }}
      animate={{
        y: [0, -100, 0],
        x: [0, Math.random() * 50 - 25, 0],
        scale: [1, 1.5, 1],
        opacity: [opacity, opacity * 2, opacity]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );
};

export default function FinalCta() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <section ref={containerRef} className="relative py-12 md:py-20 overflow-hidden bg-[#0F172A] z-0">
      
      {/* Massive Orange Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#FF5722] rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-blob"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#FE6D4D] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob animation-delay-2000"
        />
        <div className="absolute top-[20%] left-[60%] w-[500px] h-[500px] bg-[#FACC15] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-blob animation-delay-4000" />
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <Particle 
          key={i}
          delay={Math.random() * 5}
          duration={5 + Math.random() * 5}
          xOffset={(Math.random() - 0.5) * 80}
          yOffset={(Math.random() - 0.5) * 80}
          size={2 + Math.random() * 4}
          opacity={0.1 + Math.random() * 0.3}
        />
      ))}

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center text-center">
        
        <motion.div 
          style={{ scale }}
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Main Headline */}
          <motion.h2 
            variants={fadeUp} 
            className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-heading font-extrabold text-white tracking-tighter leading-[1.05] mb-8"
          >
            Don't Wait For Opportunities. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 relative">
              Build Them.
              {/* Glowing underline effect */}
              <motion.span 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 h-[4px] bg-gradient-to-r from-[#FF5722] to-[#FE6D4D] rounded-full shadow-[0_0_20px_rgba(255,87,34,0.8)]"
              />
            </span>
          </motion.h2>

          {/* Supporting Text */}
          <motion.p 
            variants={fadeUp} 
            className="text-[20px] md:text-[24px] text-white/70 font-sans leading-relaxed mb-4 max-w-3xl text-balance"
          >
            Thousands of ambitious students are already building projects, connecting with mentors, discovering opportunities and creating careers beyond the classroom.
          </motion.p>
          <motion.p 
            variants={fadeUp} 
            className="text-[20px] md:text-[24px] text-white font-bold font-sans mb-12"
          >
            Now it's your turn.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5 mb-20 w-full sm:w-auto">
            <Button 
              variant="primary" 
              className="h-16 px-12 text-lg font-bold shadow-[0_0_40px_rgba(255,87,34,0.4)] hover:shadow-[0_0_60px_rgba(255,87,34,0.6)] hover:scale-105 transition-all duration-300 border border-white/10"
            >
              Join Ecosystem
            </Button>
            <Button 
              variant="outline" 
              className="h-16 px-12 text-lg font-bold bg-white/5 border-white/20 text-white hover:bg-white hover:text-[#0F172A] hover:scale-105 transition-all duration-300 backdrop-blur-md"
            >
              Start Your Journey
            </Button>
          </motion.div>

          {/* Trust Section & Avatars */}
          <motion.div variants={fadeUp} className="flex flex-col items-center">
            <div className="flex -space-x-4 mb-6">
              {avatars.map((avatar, i) => (
                <motion.div 
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.2, 
                    ease: "easeInOut" 
                  }}
                  className="w-14 h-14 rounded-full border-4 border-[#0F172A] shadow-xl overflow-hidden relative z-10"
                  style={{ zIndex: 10 - i }}
                >
                  <img src={avatar} alt="Student" className="w-full h-full object-cover" />
                </motion.div>
              ))}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 5 * 0.2, ease: "easeInOut" }}
                className="w-14 h-14 rounded-full border-4 border-[#0F172A] shadow-xl bg-gradient-to-br from-[#FF5722] to-[#FE6D4D] flex items-center justify-center text-white text-xs font-bold relative z-0"
              >
                +10k
              </motion.div>
            </div>
            
            <p className="text-white/60 font-medium tracking-wide uppercase text-sm">
              Trusted by ambitious students across India.
            </p>
          </motion.div>

        </motion.div>
      </div>

      {/* Subtle Bottom Wave Overlay */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.93,197.36,108.99,239.5,102.13,281.39,81.41,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  );
}

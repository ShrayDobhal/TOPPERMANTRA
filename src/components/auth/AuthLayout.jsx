import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Rocket, Users, Target } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      
      {/* Left Side - Branding & Illustration (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] relative flex-col justify-between p-12 overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-[#FF5722]/20 to-[#FE6D4D]/5 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#3B82F6]/20 to-[#8B5CF6]/10 rounded-full blur-3xl opacity-30"></div>
        </div>

        {/* Top: Branding */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF5722] to-[#FE6D4D] rounded-xl flex items-center justify-center text-white font-bold font-heading text-xl shadow-lg shadow-[#FF5722]/20">
              T
            </div>
            <span className="font-heading font-extrabold text-white text-2xl tracking-tight">Topper Mantra</span>
          </Link>
        </div>

        {/* Middle: Mission & Features */}
        <div className="relative z-10 max-w-lg mt-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl xl:text-5xl font-extrabold font-heading text-white leading-tight mb-6">
              Your Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">Student Growth</span> Operating System.
            </h1>
            <p className="text-[#94A3B8] text-lg mb-10 leading-relaxed">
              Join the ecosystem designed for Tier 2 and Tier 3 college students. Get mentorship, build projects, and unlock premium career opportunities.
            </p>

            <div className="space-y-6">
              {[
                { icon: <Target className="text-[#FF5722]" size={20} />, text: "Personalized Career Roadmaps" },
                { icon: <Rocket className="text-[#3B82F6]" size={20} />, text: "Exclusive Internships & Hackathons" },
                { icon: <Users className="text-[#22C55E]" size={20} />, text: "1:1 Mentorship from Industry Leaders" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <span className="text-white font-medium text-sm md:text-base">{feature.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom: Social Proof */}
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-xs font-bold text-white z-[4-i]">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#F59E0B] mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-sm text-[#94A3B8]">Join <strong className="text-white">10,000+</strong> students building their future</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 xl:p-24 relative overflow-hidden">
        
        {/* Mobile Background Blob */}
        <div className="absolute top-0 right-0 w-full h-full lg:hidden overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#FF5722]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#3B82F6]/10 rounded-full blur-3xl"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-md relative"
        >
          {/* Glass Card Container */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 relative z-10">
            
            <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF5722] to-[#FE6D4D] rounded-xl flex items-center justify-center text-white font-bold font-heading text-xl shadow-lg shadow-[#FF5722]/20">
                T
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0F172A] mb-2 tracking-tight">{title}</h2>
              {subtitle && <p className="text-[#64748B] text-sm">{subtitle}</p>}
            </div>

            {children}
            
          </div>
        </motion.div>
      </div>

    </div>
  );
}

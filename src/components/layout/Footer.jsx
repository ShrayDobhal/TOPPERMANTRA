import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from '../ui/Button';
import { 
  ArrowRight, Mail
} from "lucide-react";

const footerLinks = {
  platform: [
    { name: "Projects", href: "#projects" },
    { name: "Roadmaps", href: "#roadmaps" },
    { name: "Mentors", href: "#mentors" },
    { name: "Opportunities", href: "#opportunities" }
  ],
  resources: [
    { name: "Blog", href: "#" },
    { name: "FAQ", href: "#faq" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Contact", href: "#contact" }
  ]
};

const socialLinks = [
  { icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>, href: "#" },
  { icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>, href: "#" },
  { icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>, href: "#" },
  { icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>, href: "#" }
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-[#E9ECEF] pt-20 pb-10 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF5722]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Four Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <button onClick={scrollToTop} className="flex items-center space-x-2 group mb-6">
              <span className="font-heading font-bold text-2xl tracking-tighter text-[#0F172A] group-hover:text-[#FF5722] transition-colors">
                Topper<span className="text-[#FF5722] group-hover:text-[#0F172A] transition-colors">Mantra</span>
              </span>
            </button>
            <p className="text-sm text-[#64748B] leading-relaxed mb-8 max-w-xs">
              India's premium student growth ecosystem. Bridging the gap between tier-2 colleges and tier-1 opportunities through mentorship, projects, and community.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 rounded-full border border-[#E9ECEF] bg-white flex items-center justify-center text-[#64748B] hover:text-[#FF5722] hover:border-[#FF5722]/30 shadow-sm hover:shadow-md transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-[#0F172A] mb-6">Platform</h4>
            <ul className="space-y-4">
              {footerLinks.platform.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-[#64748B] hover:text-[#FF5722] transition-colors flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 ease-out flex items-center">
                      <ArrowRight size={12} className="mr-1" />
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-[#0F172A] mb-6">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-[#64748B] hover:text-[#FF5722] transition-colors flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 ease-out flex items-center">
                      <ArrowRight size={12} className="mr-1" />
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="font-bold text-[#0F172A] mb-6">Stay Updated</h4>
            <p className="text-sm text-[#64748B] mb-6">
              Join our newsletter for the latest hackathons, mentorship programs, and career opportunities delivered weekly.
            </p>
            <form className="relative flex items-center max-w-sm group" onSubmit={(e) => e.preventDefault()}>
              <div className="absolute left-4 text-[#64748B] group-focus-within:text-[#FF5722] transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full h-12 pl-12 pr-32 bg-[#FAFAFA] border border-[#E9ECEF] rounded-full text-sm text-[#0F172A] focus:outline-none focus:border-[#FF5722]/50 focus:ring-4 focus:ring-[#FF5722]/10 transition-all shadow-sm"
                required
              />
              <div className="absolute right-1">
                <Button variant="primary" className="h-10 px-6 rounded-full text-xs font-bold">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#E9ECEF] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#64748B] font-medium">
            © {new Date().getFullYear()} Topper Mantra. All rights reserved.
          </p>
          <p className="text-xs text-[#64748B] font-medium flex items-center">
            Made with <span className="text-red-500 mx-1 animate-pulse">❤️</span> for India's Future Builders.
          </p>
        </div>
      </div>
    </footer>
  );
}

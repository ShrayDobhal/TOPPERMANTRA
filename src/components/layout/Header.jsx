import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Mentors", path: "/mentors" },
  { name: "Projects", path: "/projects" },
  { name: "Community", path: "/community" },
  { name: "Discover", path: "/discover" }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/80 backdrop-blur-xl border-[#E9ECEF] shadow-sm py-4" 
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left Section: Logo */}
        <div className="flex-1 flex items-center justify-start">
          <Link to="/" className="flex items-center space-x-2 group shrink-0">
            <span className="font-heading font-bold text-2xl tracking-tighter text-[#0F172A] group-hover:text-[#FF5722] transition-colors">
              Topper<span className="text-[#FF5722] group-hover:text-[#0F172A] transition-colors">Mantra</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden xl:flex items-center justify-center gap-[36px] lg:gap-[40px] shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-[14px] lg:text-[15px] font-sans font-semibold transition-colors relative group py-2 whitespace-nowrap",
                location.pathname === link.path ? "text-[#FF5722]" : "text-[#64748B] hover:text-[#0F172A]"
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.span 
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5722] rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Section: Buttons */}
        <div className="hidden xl:flex items-center justify-end space-x-4 flex-1">
          {user ? (
            <Link to="/dashboard">
              <Button variant="primary" className="py-2.5 px-6 font-bold shadow-[0_4px_14px_0_rgba(255,87,34,0.39)] hover:shadow-[0_6px_20px_rgba(255,87,34,0.23)]">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-[15px] font-sans font-bold text-[#64748B] hover:text-[#0F172A] transition-colors px-4 py-2">
                Login
              </Link>
              <Link to="/signup">
                <Button variant="primary" className="py-2.5 px-6 font-bold shadow-[0_4px_14px_0_rgba(255,87,34,0.39)] hover:shadow-[0_6px_20px_rgba(255,87,34,0.23)]">
                  Join Ecosystem
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="xl:hidden p-2 text-[#64748B] hover:text-[#FF5722] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-[#E9ECEF] shadow-xl p-4 max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-base font-semibold transition-colors",
                    location.pathname === link.path ? "bg-[#FF5722]/10 text-[#FF5722]" : "text-[#64748B] hover:bg-[#E9ECEF]/50 hover:text-[#0F172A]"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-[#E9ECEF] flex flex-col space-y-3 px-2 mt-2">
                {user ? (
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button variant="primary" className="w-full h-12 font-bold shadow-[0_4px_14px_0_rgba(255,87,34,0.39)]">Go to Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="text-center font-bold text-[#64748B] py-2 hover:text-[#0F172A] transition-colors">
                      Login
                    </Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}>
                      <Button variant="primary" className="w-full h-12 font-bold shadow-[0_4px_14px_0_rgba(255,87,34,0.39)]">Join Ecosystem</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

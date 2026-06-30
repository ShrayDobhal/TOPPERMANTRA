import { useState, useEffect } from 'react';
import { Search, Command, Users, Briefcase, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  // Handle Cmd+K
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        isOpen ? onClose() : onClose(true); // Toggle logic would be handled by parent
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0F172A]/20 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden border border-[#E9ECEF]"
          >
            <div className="flex items-center px-4 py-3 border-b border-[#E9ECEF]">
              <Search className="text-[#94A3B8] w-5 h-5 mr-3" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search students, projects, mentors..."
                className="flex-1 bg-transparent border-none outline-none text-[#0F172A] text-lg placeholder:text-[#94A3B8]"
              />
              <button onClick={onClose} className="p-1 rounded-lg text-[#94A3B8] hover:bg-[#F1F5F9] transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {/* Example Categories */}
              <div className="mb-4">
                <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2 px-2">Suggestions</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-[#F8FAFC] cursor-pointer group transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center group-hover:bg-[#3B82F6] group-hover:text-white transition-colors">
                      <Users size={16} />
                    </div>
                    <span className="text-sm font-semibold text-[#0F172A]">Find a Mentor</span>
                  </div>
                  <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-[#F8FAFC] cursor-pointer group transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center group-hover:bg-[#22C55E] group-hover:text-white transition-colors">
                      <Briefcase size={16} />
                    </div>
                    <span className="text-sm font-semibold text-[#0F172A]">Browse Projects</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#F8FAFC] px-4 py-2 border-t border-[#E9ECEF] flex items-center gap-4 text-xs font-medium text-[#64748B]">
              <span className="flex items-center gap-1">
                <kbd className="bg-white border border-[#E9ECEF] px-1.5 py-0.5 rounded shadow-sm text-[10px]">↑</kbd>
                <kbd className="bg-white border border-[#E9ECEF] px-1.5 py-0.5 rounded shadow-sm text-[10px]">↓</kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="bg-white border border-[#E9ECEF] px-1.5 py-0.5 rounded shadow-sm text-[10px]">Enter</kbd>
                <span>Select</span>
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

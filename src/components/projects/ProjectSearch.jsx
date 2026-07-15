import React, { useState } from "react";
import { Search, Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const projectFilters = {
  domains: ["Web Development", "AI / Bots", "IoT / Hardware", "Mobile App", "Data Science", "Web3 / Crypto"],
  difficulties: ["Beginner", "Intermediate", "Advanced"],
  statuses: ["Recruiting", "In Progress", "Completed"]
};

export default function ProjectSearch({ onSearch, onFilterChange, currentFilters }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null); // 'domain', 'difficulty', 'status'

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch(val);
  };

  const toggleFilter = (filterType, value) => {
    const currentList = currentFilters[filterType] || [];
    const newList = currentList.includes(value)
      ? currentList.filter(item => item !== value)
      : [...currentList, value];
    
    onFilterChange(filterType, newList);
  };

  const clearAllFilters = () => {
    onFilterChange("domains", []);
    onFilterChange("difficulties", []);
    onFilterChange("statuses", []);
  };

  const hasActiveFilters = 
    (currentFilters.domains?.length > 0) || 
    (currentFilters.difficulties?.length > 0) || 
    (currentFilters.statuses?.length > 0);

  const Dropdown = ({ title, type, options }) => (
    <div className="relative">
      <button 
        onClick={() => setActiveDropdown(activeDropdown === type ? null : type)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
          (currentFilters[type]?.length > 0) || activeDropdown === type
            ? "bg-[#FF5722] text-white border border-[#FF5722] shadow-md" 
            : "bg-[#FFFFFF] border border-[#E9ECEF] text-[#000000] hover:bg-[#F8FAFC]"
        }`}
      >
        {title} 
        {currentFilters[type]?.length > 0 && <span className="bg-[#FFFFFF] text-[#FF5722] text-[10px] w-4 h-4 rounded flex items-center justify-center font-bold">{currentFilters[type].length}</span>}
        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === type ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {activeDropdown === type && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 left-0 w-56 bg-[#FFFFFF] border border-[#E9ECEF] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] z-50 p-2 max-h-64 overflow-y-auto custom-scrollbar"
          >
            {options.map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-2.5 hover:bg-[#F8FAFC] rounded-lg cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={currentFilters[type]?.includes(opt)}
                  onChange={() => toggleFilter(type, opt)}
                  className="w-4 h-4 rounded border-[#B0B0B0] text-[#FF5722] focus:ring-[#FF5722] cursor-pointer"
                />
                <span className="text-sm font-semibold text-[#0F172A]/70 group-hover:text-[#000000]">{opt}</span>
              </label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div id="project-search" className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div className="bg-[#FFFFFF] rounded-[24px] shadow-sm border border-[#E9ECEF] p-4 md:p-6 flex flex-col gap-4">
        
        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0F172A]/50 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search projects, domains, or tech stacks..." 
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-14 pr-4 py-4 rounded-xl border border-[#E9ECEF] focus:outline-none focus:ring-2 focus:ring-[#FE6D4D]/20 focus:border-[#FE6D4D] text-base font-medium text-[#000000] placeholder:text-[#0F172A]/50 bg-[#FFFFFF] transition-all"
            />
          </div>
          
          <button 
            className={`md:hidden p-4 rounded-xl border transition-colors ${
              isFiltersOpen ? "bg-[#F8FAFC] border-[#E9ECEF]" : "bg-[#FFFFFF] border-[#E9ECEF]"
            }`}
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <SlidersHorizontal className="w-5 h-5 text-[#000000]" />
          </button>
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:flex items-center justify-between mt-2 pt-4 border-t border-[#E9ECEF]">
          <div className="flex items-center gap-4">
            <span className="text-xs font-extrabold text-[#0F172A]/60 uppercase tracking-widest mr-2 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </span>
            <Dropdown title="Domain" type="domains" options={projectFilters.domains} />
            <Dropdown title="Difficulty" type="difficulties" options={projectFilters.difficulties} />
            <Dropdown title="Status" type="statuses" options={projectFilters.statuses} />
          </div>

          {hasActiveFilters && (
            <button 
              onClick={clearAllFilters}
              className="text-sm font-bold text-[#FF5722] hover:text-[#FE6D4D] transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Mobile Filters */}
        <AnimatePresence>
          {isFiltersOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden flex flex-col gap-4 mt-4 pt-4 border-t border-[#E9ECEF] overflow-hidden"
            >
              <Dropdown title="Domain" type="domains" options={projectFilters.domains} />
              <Dropdown title="Difficulty" type="difficulties" options={projectFilters.difficulties} />
              <Dropdown title="Status" type="statuses" options={projectFilters.statuses} />
              
              {hasActiveFilters && (
                <button 
                  onClick={clearAllFilters}
                  className="w-full py-3 bg-[#FEF2F2] rounded-xl text-sm font-bold text-[#FF5722]"
                >
                  Clear All Filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

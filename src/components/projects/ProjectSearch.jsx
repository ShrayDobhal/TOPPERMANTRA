import React, { useState } from "react";
import { Search, Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { projectFilters } from "../../lib/mockProjects";
import { motion, AnimatePresence } from "framer-motion";

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
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
          (currentFilters[type]?.length > 0) || activeDropdown === type
            ? "bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/20" 
            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
        }`}
      >
        {title} 
        {currentFilters[type]?.length > 0 && <span className="bg-[#FF5722] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{currentFilters[type].length}</span>}
        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === type ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {activeDropdown === type && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 left-0 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 max-h-64 overflow-y-auto custom-scrollbar"
          >
            {options.map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={currentFilters[type]?.includes(opt)}
                  onChange={() => toggleFilter(type, opt)}
                  className="w-4 h-4 rounded border-slate-300 text-[#FF5722] focus:ring-[#FF5722] cursor-pointer"
                />
                <span className="text-sm text-slate-700 group-hover:text-[#0F172A]">{opt}</span>
              </label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div id="project-search" className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 md:p-6 flex flex-col gap-4">
        
        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search projects, domains, or tech stacks..." 
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] text-base shadow-inner bg-slate-50/50"
            />
          </div>
          
          <button 
            className={`md:hidden p-4 rounded-xl border transition-colors ${
              isFiltersOpen ? "bg-slate-100 border-slate-300" : "bg-white border-slate-200"
            }`}
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <SlidersHorizontal className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:flex items-center justify-between mt-2 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mr-2 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </span>
            <Dropdown title="Domain" type="domains" options={projectFilters.domains} />
            <Dropdown title="Difficulty" type="difficulties" options={projectFilters.difficulties} />
            <Dropdown title="Status" type="statuses" options={projectFilters.statuses} />
          </div>

          {hasActiveFilters && (
            <button 
              onClick={clearAllFilters}
              className="text-sm font-semibold text-[#FF5722] hover:underline"
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
              className="md:hidden flex flex-col gap-4 mt-4 pt-4 border-t border-slate-100 overflow-hidden"
            >
              <Dropdown title="Domain" type="domains" options={projectFilters.domains} />
              <Dropdown title="Difficulty" type="difficulties" options={projectFilters.difficulties} />
              <Dropdown title="Status" type="statuses" options={projectFilters.statuses} />
              
              {hasActiveFilters && (
                <button 
                  onClick={clearAllFilters}
                  className="w-full py-2 bg-slate-100 rounded-lg text-sm font-semibold text-[#FF5722]"
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

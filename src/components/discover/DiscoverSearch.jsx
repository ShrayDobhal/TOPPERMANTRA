import React, { useState } from "react";
import { Search, Filter, SlidersHorizontal, ChevronDown, MapPin, Briefcase } from "lucide-react";
import { filterOptions } from "../../lib/showcaseDiscover";
import { motion, AnimatePresence } from "framer-motion";

export default function DiscoverSearch({ onSearch, onFilterChange, currentFilters = {} }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) onSearch(val);
  };

  const toggleFilter = (filterType, value) => {
    const currentList = currentFilters[filterType] || [];
    const newList = currentList.includes(value)
      ? currentList.filter(item => item !== value)
      : [...currentList, value];
    
    if (onFilterChange) onFilterChange(filterType, newList);
  };

  const clearAllFilters = () => {
    if (onFilterChange) {
      onFilterChange("types", []);
      onFilterChange("workplace", []);
      onFilterChange("paid", []);
      onFilterChange("experience", []);
    }
  };

  const hasActiveFilters = 
    (currentFilters.types?.length > 0) || 
    (currentFilters.workplace?.length > 0) || 
    (currentFilters.paid?.length > 0) ||
    (currentFilters.experience?.length > 0);

  const Dropdown = ({ title, type, options, icon: Icon }) => (
    <div className="relative">
      <button 
        onClick={() => setActiveDropdown(activeDropdown === type ? null : type)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
          (currentFilters[type]?.length > 0) || activeDropdown === type
            ? "bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/20" 
            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
        }`}
      >
        {Icon && <Icon className="w-4 h-4 text-slate-400" />}
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
    <div id="discover-search" className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 md:p-6 flex flex-col gap-4">
        
        {/* Main Search Bar - Advanced Multi-Input Style */}
        <div className="flex flex-col md:flex-row items-center gap-0 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#FF5722]/20 focus-within:border-[#FF5722] transition-all bg-white">
          
          <div className="flex-1 w-full relative border-b md:border-b-0 md:border-r border-slate-200">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search roles, companies, or keywords..." 
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-4 focus:outline-none text-base bg-transparent text-[#0F172A]"
            />
          </div>
          
          <div className="flex-1 w-full relative hidden md:block">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="City, state, zip code, or 'remote'" 
              className="w-full pl-12 pr-4 py-4 focus:outline-none text-base bg-transparent text-[#0F172A]"
            />
          </div>
          
          <button className="hidden md:block bg-[#FF5722] text-white px-8 py-4 font-bold hover:bg-[#E64A19] transition-colors">
            Search
          </button>
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:flex items-center justify-between mt-2 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mr-2 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </span>
            <Dropdown title="Opportunity Type" type="types" options={filterOptions.types} icon={Briefcase} />
            <Dropdown title="Workplace" type="workplace" options={filterOptions.workplace} icon={MapPin} />
            <Dropdown title="Compensation" type="paid" options={filterOptions.paid} />
            <Dropdown title="Experience Level" type="experience" options={filterOptions.experience} />
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

        {/* Mobile Toggle & Search Button */}
        <div className="flex md:hidden gap-3">
           <button 
            className="flex-1 p-3 rounded-xl border border-slate-200 flex justify-center items-center gap-2 font-semibold text-slate-700 bg-slate-50"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <SlidersHorizontal className="w-5 h-5" /> Filters
          </button>
          <button className="flex-1 p-3 rounded-xl bg-[#FF5722] text-white font-bold flex justify-center items-center">
            Search
          </button>
        </div>

        {/* Mobile Filters */}
        <AnimatePresence>
          {isFiltersOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden flex flex-col gap-4 mt-2 pt-4 border-t border-slate-100 overflow-hidden"
            >
              <Dropdown title="Opportunity Type" type="types" options={filterOptions.types} />
              <Dropdown title="Workplace" type="workplace" options={filterOptions.workplace} />
              <Dropdown title="Compensation" type="paid" options={filterOptions.paid} />
              <Dropdown title="Experience Level" type="experience" options={filterOptions.experience} />
              
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

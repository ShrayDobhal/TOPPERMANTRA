import React, { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import MentorCard from "./MentorCard";
import { filterOptions } from "../../lib/mockMentors";

export default function MentorsDirectory({ mentors, onViewProfile, initialCategory }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : []);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync initial category if changed externally
  React.useEffect(() => {
    if (initialCategory) {
      if (!selectedCategories.includes(initialCategory)) {
        setSelectedCategories([initialCategory]);
      }
      // Scroll to directory if category is selected
      document.getElementById("mentors-directory")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [initialCategory]);

  const toggleFilter = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const clearFilters = () => {
    setSelectedColleges([]);
    setSelectedCategories([]);
    setSelectedExperience([]);
    setSearchQuery("");
  };

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      // Search
      const matchesSearch = 
        searchQuery === "" || 
        `${mentor.firstName} ${mentor.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.company.toLowerCase().includes(searchQuery.toLowerCase());

      // Filters
      const matchesCollege = selectedColleges.length === 0 || selectedColleges.includes(mentor.college);
      const matchesCategory = selectedCategories.length === 0 || mentor.categories.some(c => selectedCategories.includes(c));
      const matchesExp = selectedExperience.length === 0 || selectedExperience.includes(mentor.experienceType);

      return matchesSearch && matchesCollege && matchesCategory && matchesExp;
    });
  }, [mentors, searchQuery, selectedColleges, selectedCategories, selectedExperience]);

  const FilterSidebar = () => (
    <div className="bg-white rounded-2xl border border-[#E9ECEF] p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-[#0F172A] flex items-center gap-2">
          <Filter className="w-5 h-5" /> Filters
        </h3>
        {(selectedColleges.length > 0 || selectedCategories.length > 0 || selectedExperience.length > 0) && (
          <button onClick={clearFilters} className="text-xs text-[#FF5722] font-semibold hover:underline">
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Expertise</h4>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {filterOptions.categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                  className="w-4 h-4 rounded border-slate-300 text-[#FF5722] focus:ring-[#FF5722] cursor-pointer"
                />
                <span className="text-sm text-slate-600 group-hover:text-[#0F172A] transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Experience Level</h4>
          <div className="flex flex-col gap-2">
            {filterOptions.experience.map((exp) => (
              <label key={exp} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedExperience.includes(exp)}
                  onChange={() => toggleFilter(selectedExperience, setSelectedExperience, exp)}
                  className="w-4 h-4 rounded border-slate-300 text-[#FF5722] focus:ring-[#FF5722] cursor-pointer"
                />
                <span className="text-sm text-slate-600 group-hover:text-[#0F172A] transition-colors">{exp}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Colleges */}
        <div>
          <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Colleges</h4>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {filterOptions.colleges.map((college) => (
              <label key={college} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedColleges.includes(college)}
                  onChange={() => toggleFilter(selectedColleges, setSelectedColleges, college)}
                  className="w-4 h-4 rounded border-slate-300 text-[#FF5722] focus:ring-[#FF5722] cursor-pointer"
                />
                <span className="text-sm text-slate-600 group-hover:text-[#0F172A] transition-colors">{college}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="mentors-directory" className="py-20 bg-slate-50">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold font-heading text-[#0F172A] mb-2">Find Your Mentor</h2>
            <p className="text-[#64748B]">Browse {filteredMentors.length} highly vetted professionals.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by name, company..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] text-sm"
              />
            </div>
            <button 
              className="md:hidden p-2.5 rounded-xl border border-slate-300 bg-white text-slate-600"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-72 shrink-0">
            <FilterSidebar />
          </div>

          {/* Grid */}
          <div className="flex-grow">
            {filteredMentors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMentors.map((mentor) => (
                  <MentorCard 
                    key={mentor.id} 
                    mentor={mentor} 
                    onViewProfile={onViewProfile}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">No mentors found</h3>
                <p className="text-[#64748B] mb-6">Try adjusting your filters or search query.</p>
                <button 
                  onClick={clearFilters}
                  className="text-[#FF5722] font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters Overlay */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
            <div className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-right">
              <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex items-center justify-between z-10">
                <h3 className="font-bold text-[#0F172A]">Filters</h3>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-1 rounded-md text-slate-500 hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <FilterSidebar />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

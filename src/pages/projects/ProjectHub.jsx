import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, Briefcase, Plus, Star, Users, Flame } from 'lucide-react';
import { cn } from '../../lib/utils';
import { mockProjects } from '../../lib/mockProjects';

export default function ProjectHub() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Artificial Intelligence", "Web Development", "Blockchain", "Data Science", "Mobile Apps", "Open Source"];

  const filteredProjects = activeCategory === "All" 
    ? mockProjects 
    : mockProjects.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header & Hero */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0F172A] mb-2 flex items-center gap-2">
            <Briefcase className="text-[#FF5722]" size={28} />
            Project Ecosystem
          </h1>
          <p className="text-[#64748B] text-sm">Discover, build, and showcase real-world projects.</p>
        </div>
        <button className="py-2.5 px-6 bg-[#FF5722] hover:bg-[#E64A19] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#FF5722]/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 shrink-0">
          <Plus size={18} /> Create Project
        </button>
      </div>

      {/* Continue Building Widget */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-3xl p-6 sm:p-8 border border-[#334155] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="flex items-center gap-6 relative z-10 w-full sm:w-auto">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden shrink-0">
            <img src={mockProjects[0].coverImage} alt="Project" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#FF5722] uppercase tracking-wider mb-1 flex items-center gap-1">
              <Flame size={14} /> Continue Building
            </p>
            <h3 className="text-xl font-bold text-white">{mockProjects[0].title}</h3>
            <p className="text-sm text-white/60">Milestone: API Integration • Due in 3 days</p>
          </div>
        </div>
        
        <Link 
          to={`/dashboard/projects/${mockProjects[0].id}/board`}
          className="w-full sm:w-auto py-3 px-8 bg-white text-[#0F172A] text-sm font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center relative z-10"
        >
          Open Board
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-2 border border-[#E9ECEF] shadow-sm flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input 
            type="text" 
            placeholder="Search projects, technologies, or skills..." 
            className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border-transparent focus:bg-white focus:border-[#FF5722]/30 focus:ring-4 focus:ring-[#FF5722]/10 rounded-xl text-sm transition-all outline-none"
          />
        </div>
        <button className="py-3 px-6 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] text-sm font-bold rounded-xl border border-transparent transition-all flex items-center justify-center gap-2 shrink-0">
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all border",
              activeCategory === cat 
                ? "bg-[#0F172A] text-white border-[#0F172A] shadow-md shadow-[#0F172A]/10" 
                : "bg-white text-[#64748B] border-[#E9ECEF] hover:border-[#CBD5E1]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <Link to={`/dashboard/projects/${project.id}`} className="block h-full">
              <div className="bg-white rounded-3xl border border-[#E9ECEF] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col group">
                
                {/* Cover Image */}
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#0F172A] text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                      {project.category}
                    </span>
                  </div>
                  {project.status === 'completed' && (
                    <div className="absolute top-4 right-4 px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                      Completed
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold font-heading text-[#0F172A] mb-2 group-hover:text-[#FF5722] transition-colors">{project.title}</h3>
                  <p className="text-sm text-[#64748B] mb-4 line-clamp-2 flex-1">{project.description}</p>
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold rounded-md">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer Metrics */}
                  <div className="pt-4 border-t border-[#E9ECEF] flex items-center justify-between">
                    
                    {/* Team Avatars */}
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">
                          {member.avatar}
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-[#64748B]">
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <Users size={14} />
                        {project.openRoles.length} Open
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <Star size={14} />
                        {project.githubStats.stars}
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

    </div>
  );
}

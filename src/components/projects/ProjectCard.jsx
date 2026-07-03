import React from "react";
import { Star, Eye, Bookmark, Users, Shield, Target, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "../ui/TiltCard";

export default function ProjectCard({ project, onClick }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Recruiting": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "In Progress": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "Completed": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default: return "bg-slate-500/10 text-slate-600 border-slate-500/20";
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "Beginner": return "text-emerald-500";
      case "Intermediate": return "text-amber-500";
      case "Advanced": return "text-red-500";
      default: return "text-slate-500";
    }
  };

  return (
    <TiltCard className="h-full">
      <motion.div 
        onClick={() => onClick(project.id)}
        className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full group cursor-pointer hover:border-[#FF5722]/30"
      >
        {/* Banner */}
        <div className="relative h-40 bg-slate-100 overflow-hidden shrink-0">
          <img 
            src={project.bannerUrl} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <span className="bg-black/40 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md border border-white/20">
              {project.domain}
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border backdrop-blur-md ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-bold text-xl line-clamp-1 mb-1">{project.title}</h3>
            <p className="text-xs text-white/80 line-clamp-1">{project.organization}</p>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.slice(0, 4).map((tech, i) => (
              <span key={i} className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-1 rounded">
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-1 rounded">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Meta Info Grid */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-slate-500 mb-5 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <Target className={`w-4 h-4 shrink-0 ${getDifficultyColor(project.difficulty)}`} />
              <span className="truncate">{project.difficulty}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 shrink-0 text-slate-400" />
              <span className="truncate">{project.teamSize.current}/{project.teamSize.max} Members</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2">
              <Shield className="w-4 h-4 shrink-0 text-slate-400" />
              <span className="truncate">Mentored by <span className="font-semibold text-slate-700">{project.mentor.name}</span></span>
            </div>
          </div>

          {/* Open Roles */}
          {project.openRoles.length > 0 && (
            <div className="mb-5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Looking For</span>
              <div className="flex flex-wrap gap-1.5">
                {project.openRoles.map((role, i) => (
                  <span key={i} className="text-xs text-[#FF5722] bg-[#FF5722]/5 border border-[#FF5722]/20 px-2 py-0.5 rounded-full">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Progress Bar (if in progress) */}
          {project.status !== "Recruiting" && (
            <div className="mb-5">
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Progress
                </span>
                <span className="text-[#FF5722]">{project.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FF5722] rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Footer Metrics */}
          <div className="mt-auto pt-2 flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-400 text-xs font-semibold">
              <span className="flex items-center gap-1 hover:text-amber-500 transition-colors">
                <Star className="w-4 h-4" /> {project.metrics.stars}
              </span>
              <span className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                <Eye className="w-4 h-4" /> {project.metrics.views}
              </span>
              <span className="flex items-center gap-1 hover:text-[#FF5722] transition-colors">
                <Bookmark className="w-4 h-4" /> {project.metrics.bookmarks}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#FF5722] group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

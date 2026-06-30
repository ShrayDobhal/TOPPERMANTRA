import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Zap, Users, ShieldCheck, Bookmark, ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Badge } from '../../../components/ui/Badge';
import { Avatar } from '../../../components/ui/Avatar';

export default function ProjectCard({ project }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-[24px] border border-[#E9ECEF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
    >
      {/* Cover Image Placeholder with Gradient */}
      <div className={cn("h-32 w-full relative", project.coverGradient || "bg-gradient-to-r from-blue-500 to-purple-500")}>
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 cursor-pointer hover:bg-white/40 transition-colors">
          <Bookmark size={18} className="text-white" />
        </div>
        <div className="absolute -bottom-6 left-6 w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center p-1.5 border border-[#E9ECEF]">
          {/* Logo mock */}
          <div className={cn("w-full h-full rounded-lg bg-gradient-to-br", project.logoGradient || "from-gray-100 to-gray-200")}></div>
        </div>
      </div>
      
      <div className="p-6 pt-10 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold font-heading text-[#0F172A] leading-tight group-hover:text-[#FF5722] transition-colors line-clamp-1">
            {project.title}
          </h3>
          <Badge variant="outline" className="shrink-0 bg-[#F1F5F9] text-[#64748B] border-[#E9ECEF]">
            {project.difficulty}
          </Badge>
        </div>
        
        <p className="text-sm text-[#64748B] mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack?.slice(0,3).map(tech => (
            <span key={tech} className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider bg-[#F8FAFC] border border-[#E9ECEF] px-2 py-0.5 rounded-md">
              {tech}
            </span>
          ))}
          {project.techStack?.length > 3 && (
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider bg-[#F8FAFC] border border-[#E9ECEF] px-2 py-0.5 rounded-md">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1 flex items-center gap-1"><Clock size={12}/> Duration</span>
            <span className="text-sm font-bold text-[#0F172A]">{project.duration}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider mb-1 flex items-center gap-1"><Zap size={12}/> Reward</span>
            <span className="text-sm font-bold text-[#F59E0B]">+{project.xp} XP</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#E9ECEF]">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <Avatar size="sm" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${project.id}1`} />
              <Avatar size="sm" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${project.id}2`} />
            </div>
            <span className="text-xs font-semibold text-[#64748B]">+{project.openPositions} open</span>
          </div>
          <Link 
            to={`/dashboard/projects/${project.id}`}
            className="flex items-center gap-1 text-sm font-bold text-[#FF5722] hover:text-[#E64A19] transition-colors"
          >
            Workspace <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

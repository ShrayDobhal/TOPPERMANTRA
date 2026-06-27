import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, GitBranch, ExternalLink, Users, Calendar, Star, GitFork, AlertCircle, FileCode2, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { mockProjects } from '../../lib/mockProjects';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = mockProjects.find(p => p.id === id) || mockProjects[0];

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Navigation */}
      <Link to="/dashboard/projects" className="inline-flex items-center gap-2 text-sm font-bold text-[#64748B] hover:text-[#0F172A] transition-colors">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      {/* Header Section */}
      <div className="bg-white rounded-3xl border border-[#E9ECEF] shadow-sm overflow-hidden">
        <div className="h-48 sm:h-64 relative">
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex gap-2 mb-3">
                <span className="px-3 py-1 bg-[#FF5722] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                  {project.category}
                </span>
                <span className={cn(
                  "px-3 py-1 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm backdrop-blur-md",
                  project.status === 'completed' ? "bg-emerald-500/80" : "bg-white/20"
                )}>
                  {project.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-2">{project.title}</h1>
              <p className="text-white/80 text-sm sm:text-base max-w-2xl">{project.tagline}</p>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <button className="px-6 py-2.5 bg-white text-[#0F172A] text-sm font-bold rounded-xl shadow-lg hover:bg-[#F8FAFC] transition-colors">
                Save
              </button>
              <Link 
                to={`/dashboard/projects/${project.id}/board`}
                className="px-6 py-2.5 bg-[#FF5722] text-white text-sm font-bold rounded-xl shadow-lg hover:bg-[#E64A19] transition-colors"
              >
                View Board
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* Overview */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm">
            <h2 className="text-xl font-bold font-heading text-[#0F172A] mb-4">Overview</h2>
            <p className="text-[#64748B] leading-relaxed mb-8">{project.description}</p>
            
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="px-4 py-2 bg-[#F8FAFC] text-[#0F172A] text-xs font-bold rounded-xl border border-[#E9ECEF]">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline & Milestones */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm">
            <h2 className="text-xl font-bold font-heading text-[#0F172A] mb-6">Project Milestones</h2>
            <div className="space-y-6 relative">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-[#F1F5F9]"></div>
              {project.milestones.map((milestone, idx) => (
                <div key={idx} className="flex gap-4 relative z-10">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm mt-0.5",
                    milestone.status === 'completed' ? "bg-emerald-500 text-white" : 
                    milestone.status === 'in-progress' ? "bg-[#FF5722] text-white" : "bg-[#E2E8F0] text-[#94A3B8]"
                  )}>
                    {milestone.status === 'completed' ? <CheckCircle2 size={12} /> : 
                     milestone.status === 'in-progress' ? <Clock size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">{milestone.title}</h4>
                    <p className="text-xs text-[#64748B] mt-1">{milestone.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Widgets (Right) */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* GitHub Widget */}
          <div className="bg-[#0F172A] rounded-3xl p-6 border border-[#334155] shadow-lg text-white">
            <div className="flex items-center gap-3 mb-6">
              <GitBranch size={24} />
              <h3 className="text-lg font-bold">Repository Stats</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 text-white/60 mb-1">
                  <Star size={14} /> <span className="text-[10px] font-bold uppercase tracking-wider">Stars</span>
                </div>
                <span className="text-2xl font-bold">{project.githubStats.stars}</span>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 text-white/60 mb-1">
                  <GitFork size={14} /> <span className="text-[10px] font-bold uppercase tracking-wider">Forks</span>
                </div>
                <span className="text-2xl font-bold">{project.githubStats.forks}</span>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 text-white/60 mb-1">
                  <AlertCircle size={14} /> <span className="text-[10px] font-bold uppercase tracking-wider">Issues</span>
                </div>
                <span className="text-2xl font-bold">{project.githubStats.issues}</span>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 text-white/60 mb-1">
                  <FileCode2 size={14} /> <span className="text-[10px] font-bold uppercase tracking-wider">Commits</span>
                </div>
                <span className="text-2xl font-bold">{project.githubStats.commits}</span>
              </div>
            </div>
            
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-full py-3 bg-white text-[#0F172A] text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#F8FAFC] transition-colors">
              View Repository <ExternalLink size={16} />
            </a>
          </div>

          {/* Team Widget */}
          <div className="bg-white rounded-3xl p-6 border border-[#E9ECEF] shadow-sm">
            <h3 className="text-lg font-bold font-heading text-[#0F172A] mb-6 flex items-center gap-2">
              <Users size={20} className="text-[#FF5722]" /> Team Members
            </h3>
            
            <div className="space-y-4">
              {project.team.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white text-sm font-bold shadow-sm shrink-0">
                    {member.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">{member.name}</h4>
                    <p className="text-xs text-[#64748B]">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {project.openRoles.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#E9ECEF]">
                <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-4">Open Positions</h4>
                <div className="space-y-3">
                  {project.openRoles.map((role, idx) => (
                    <div key={idx} className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E9ECEF]">
                      <h5 className="text-sm font-bold text-[#0F172A]">{role.role}</h5>
                      <p className="text-[10px] text-[#64748B] mt-1">{role.description}</p>
                      <button className="mt-3 text-[10px] font-bold text-[#FF5722] uppercase tracking-wider hover:underline">Apply Now</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

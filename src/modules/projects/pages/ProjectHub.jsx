import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, SlidersHorizontal, Hammer, Users, CheckCircle2,
  Clock, Star, ArrowRight, AlertTriangle, GitMerge
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import useProjectForgeStore from '../../../store/useProjectForgeStore';
import useStudentStore from '../../../store/useStudentStore';

const difficultyColors = {
  Beginner: 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20',
  Intermediate: 'bg-[#F59E0B]/10 text-[#D97706] border-[#F59E0B]/20',
  Advanced: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
};

export default function ProjectHub() {
  const projects = useProjectForgeStore((s) => s.projects);
  const fetchProjects = useProjectForgeStore((s) => s.fetchProjects);
  const profile = useStudentStore((s) => s.profile);
  
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('all');

  const filtered = projects
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    .filter(p => diffFilter === 'all' || p.difficulty === diffFilter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[32px] p-8 sm:p-12 border border-[#334155] text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#FF5722]/20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#A855F7]/10 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF5722] to-[#FF9800] flex items-center justify-center">
              <Hammer size={24} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-heading leading-tight">
                The Project <span className="text-[#FF5722]">Forge</span>
              </h1>
            </div>
          </div>
          <p className="text-[#94A3B8] text-lg mb-6 font-medium">
            Claim tasks, build real-world projects with IIT mentors. One student. One task. Real code. Real reviews.
          </p>

          {/* Stats Row */}
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-lg font-extrabold">{projects.length}</p>
              <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Active Projects</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-lg font-extrabold">{profile.activeClaims}/{profile.maxClaims}</p>
              <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Your Claims</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-lg font-extrabold text-[#22C55E]">{projects.reduce((acc, p) => acc + p.availableSubparts, 0)}</p>
              <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Open Tasks</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={20} />
              <input
                type="text"
                placeholder="Search projects by name or tech..."
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 px-1">
        {['all', 'Beginner', 'Intermediate', 'Advanced'].map(f => (
          <button
            key={f}
            onClick={() => setDiffFilter(f)}
            className={cn(
              "text-xs font-bold px-4 py-2 rounded-xl transition-colors",
              diffFilter === f
                ? "bg-[#0F172A] text-white"
                : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]"
            )}
          >
            {f === 'all' ? 'All Projects' : f}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link to={`/dashboard/projects/${project.id}`}>
              <div className="bg-white rounded-[28px] border border-[#E9ECEF] shadow-sm hover:shadow-lg transition-all group cursor-pointer overflow-hidden">
                {/* Cover gradient */}
                <div className={cn("h-3 bg-gradient-to-r", project.coverGradient)} />

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold font-heading text-[#0F172A] group-hover:text-[#FF5722] transition-colors mb-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#64748B] font-semibold">
                        {project.mentor.name} · {project.mentor.institution}
                      </p>
                    </div>
                    <span className={cn("text-[9px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider shrink-0", difficultyColors[project.difficulty])}>
                      {project.difficulty}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#64748B] font-medium leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techStack.map(tech => (
                      <span key={tech} className="bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold px-2.5 py-1 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Progress</span>
                      <span className="text-[10px] font-bold text-[#0F172A]">
                        {project.completedSubparts}/{project.totalSubparts} subparts
                      </span>
                    </div>
                    <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#22C55E] to-[#14B8A6] rounded-full transition-all"
                        style={{ width: `${(project.completedSubparts / project.totalSubparts) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#E9ECEF]">
                    <div className="flex items-center gap-4 text-xs font-semibold text-[#64748B]">
                      <span className="flex items-center gap-1"><Users size={12} /> {project.contributors}</span>
                      <span className="flex items-center gap-1 text-[#22C55E]"><CheckCircle2 size={12} /> {project.availableSubparts} open</span>
                      <span className="flex items-center gap-1"><GitMerge size={12} /> {project.completedSubparts} merged</span>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] flex items-center justify-center group-hover:bg-[#FF5722] transition-colors">
                      <ArrowRight size={14} className="text-[#64748B] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lg font-bold text-[#0F172A] mb-2">No projects found</p>
          <p className="text-sm text-[#64748B]">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}

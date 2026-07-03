import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft, Users, Clock, Hammer, GitMerge, AlertTriangle,
  CheckCircle2, Star, Shield, ArrowRight
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import useProjectForgeStore from '../../../store/useProjectForgeStore';
import useStudentStore from '../../../store/useStudentStore';
import SubpartBoard from '../components/SubpartBoard';
import RequestAidModal from '../components/RequestAidModal';
import SubmitReviewModal from '../components/SubmitReviewModal';

export default function ProjectForgePage() {
  const { id } = useParams();
  
  const fetchProjects = useProjectForgeStore((s) => s.fetchProjects);
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const projects = useProjectForgeStore((s) => s.projects);
  const getSubparts = useProjectForgeStore((s) => s.getSubparts);
  const claimTask = useProjectForgeStore((s) => s.claimTask);
  const requestAid = useProjectForgeStore((s) => s.requestAid);
  const submitForReview = useProjectForgeStore((s) => s.submitForReview);
  const canClaimTask = useStudentStore((s) => s.canClaimTask);

  const [aidModal, setAidModal] = useState({ open: false, subpart: null });
  const [submitModal, setSubmitModal] = useState({ open: false, subpart: null });

  const project = projects.find(p => p.id === id) || projects[0];
  const subparts = getSubparts(project.id);

  const handleClaim = (subpartId) => {
    const success = claimTask(subpartId, project.id, { id: 'stu-001', name: 'Shray D.' });
    if (!success) alert('You can only claim a maximum of 2 subparts at the same time.');
  };

  const handleRequestAid = (subpartId) => {
    const subpart = subparts.find(s => s.id === subpartId);
    setAidModal({ open: true, subpart });
  };

  const handleSubmitReview = (subpartId) => {
    const subpart = subparts.find(s => s.id === subpartId);
    setSubmitModal({ open: true, subpart });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Back + Project Header */}
      <div>
        <Link to="/dashboard/projects" className="flex items-center gap-1.5 text-sm font-bold text-[#64748B] hover:text-[#FF5722] transition-colors mb-4">
          <ChevronLeft size={16} /> Back to Project Forge
        </Link>

        <div className={cn("bg-gradient-to-br rounded-[32px] p-8 sm:p-10 text-white relative overflow-hidden", `${project.coverGradient}`)}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Hammer size={24} />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#FF5722]">{project.title}</h1>
                    <p className="text-white/70 text-sm font-medium">
                      Mentored by {project.mentor.name} · {project.mentor.institution}
                    </p>
                  </div>
                </div>
                <p className="text-white/80 text-sm max-w-2xl mt-2 leading-relaxed">{project.description}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {[
                  { label: 'Total', value: project.totalSubparts, icon: <Star size={14} /> },
                  { label: 'Completed', value: project.completedSubparts, icon: <CheckCircle2 size={14} /> },
                  { label: 'Contributors', value: project.contributors, icon: <Users size={14} /> },
                ].map((stat, i) => (
                  <div key={i} className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
                    <p className="text-2xl font-extrabold font-heading">{stat.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/60 flex items-center justify-center gap-1">{stat.icon} {stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mt-5">
              {project.techStack.map(tech => (
                <span key={tech} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {tech}
                </span>
              ))}
            </div>

            {/* Max Claims Warning */}
            {!canClaimTask() && (
              <div className="mt-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center gap-3">
                <AlertTriangle size={18} className="text-[#F59E0B]" />
                <p className="text-sm font-semibold">
                  You have reached the maximum of 2 claimed tasks. Complete or submit one to claim more.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subpart Board — The Core */}
      <div>
        <h2 className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-4 px-1 flex items-center gap-2">
          <GitMerge size={14} className="text-[#3B82F6]" />
          Task Board · {subparts.length} subparts
        </h2>
        <SubpartBoard
          subparts={subparts}
          onClaimTask={handleClaim}
          onRequestAid={handleRequestAid}
          onSubmitReview={handleSubmitReview}
          canClaim={canClaimTask()}
        />
      </div>

      {/* Modals */}
      <RequestAidModal
        isOpen={aidModal.open}
        onClose={() => setAidModal({ open: false, subpart: null })}
        subpart={aidModal.subpart}
        onSubmit={(data) => requestAid(aidModal.subpart?.id, data)}
      />
      <SubmitReviewModal
        isOpen={submitModal.open}
        onClose={() => setSubmitModal({ open: false, subpart: null })}
        subpart={submitModal.subpart}
        onSubmit={(data) => submitForReview(submitModal.subpart?.id, data)}
      />
    </div>
  );
}

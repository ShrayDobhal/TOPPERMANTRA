import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Star, Eye, Bookmark, Share2, Shield, Target, 
  Users, MapPin, GitBranch as Github, ExternalLink, Calendar, CheckCircle2 
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { showcaseProjects } from "../../../lib/showcaseProjects";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  
  // Find project or use first one as fallback for demo
  const project = showcaseProjects.find(p => p.id === id) || showcaseProjects[0];

  const tabs = ["Overview", "Open Roles", "Team", "Roadmap"];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Banner Area */}
      <div className="relative h-64 md:h-80 bg-slate-900 w-full">
        <img 
          src={project.bannerUrl} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        {/* Navigation & Actions */}
        <div className="absolute top-6 left-0 right-0 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto flex justify-between items-center z-10">
          <button 
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </button>
          
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-[#FF5722] hover:bg-white/20 transition-all">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (Main Content) */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200 mb-8">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-[#FF5722]/10 text-[#FF5722] text-xs font-bold px-3 py-1.5 rounded-md border border-[#FF5722]/20 uppercase tracking-wider">
                  {project.domain}
                </span>
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-md border border-slate-200 uppercase tracking-wider">
                  {project.status}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black font-heading text-[#0F172A] mb-4 tracking-tight">
                {project.title}
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                {project.shortDescription}
              </p>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-slate-100 mb-8">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Difficulty</span>
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Target className="w-4 h-4 text-[#FF5722]" /> {project.difficulty}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Team Size</span>
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Users className="w-4 h-4 text-[#FF5722]" /> {project.teamSize.current}/{project.teamSize.max} Members
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Completion Date</span>
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Calendar className="w-4 h-4 text-[#FF5722]" /> {project.estimatedCompletion}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Metrics</span>
                  <div className="flex items-center gap-3 text-slate-700 font-semibold">
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500"/> {project.metrics.stars}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-blue-500"/> {project.metrics.views}</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex overflow-x-auto gap-8 border-b border-slate-200 mb-8 custom-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-bold transition-colors whitespace-nowrap relative ${
                      activeTab === tab ? "text-[#FF5722]" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="activeProjectTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5722]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "Overview" && (
                  <div className="space-y-10 text-slate-700 leading-relaxed">
                    <section>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-4">Problem Statement</h3>
                      <p>{project.problemStatement}</p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-4">Project Overview</h3>
                      <p>{project.overview}</p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-4">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#FF5722]"></div>
                            {tech}
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {activeTab === "Open Roles" && (
                  <div className="space-y-4">
                    {project.openRoles.length > 0 ? project.openRoles.map((role, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-bold text-[#0F172A] mb-1">{role}</h4>
                          <p className="text-sm text-slate-500">Looking for someone with experience in {project.techStack.join(", ")}</p>
                        </div>
                        <Button variant="outline">Apply for Role</Button>
                      </div>
                    )) : (
                      <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200">
                        <p className="text-slate-500">This project is not currently recruiting new members.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "Team" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.members.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl bg-white hover:border-[#FF5722]/30 transition-colors">
                        <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <h4 className="font-bold text-[#0F172A]">{member.name}</h4>
                          <p className="text-xs text-slate-500">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === "Roadmap" && (
                  <div className="space-y-6">
                    {project.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className={`mt-1 flex-shrink-0 ${task.status === 'Completed' ? 'text-green-500' : 'text-slate-300'}`}>
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${task.status === 'Completed' ? 'text-slate-800 line-through' : 'text-[#0F172A]'}`}>{task.title}</h4>
                          <p className="text-sm text-slate-500">Assigned to: {task.assignee}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full lg:w-[350px] shrink-0 space-y-6">
            {/* Primary CTA Box */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
              {project.status === "Recruiting" ? (
                <>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">Join this Project</h3>
                  <p className="text-sm text-slate-600 mb-6">Build your portfolio by contributing to a real-world product.</p>
                  <Button variant="primary" className="w-full h-12 text-base font-bold shadow-md hover:shadow-lg mb-3">
                    Request to Join
                  </Button>
                  <p className="text-center text-xs text-slate-400">Usually responds within 24 hours</p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">Workspace Access</h3>
                  <p className="text-sm text-slate-600 mb-6">You are a member of this project.</p>
                  <Button variant="primary" className="w-full h-12 text-base font-bold shadow-md hover:shadow-lg" onClick={() => navigate(`/dashboard/projects/${project.id}`)}>
                    Open Workspace
                  </Button>
                </>
              )}
            </div>

            {/* Mentor Info */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Mentored By
              </h3>
              <div className="flex items-center gap-4">
                <img src={project.mentor.avatar} alt={project.mentor.name} className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-[#0F172A]">{project.mentor.name}</h4>
                  <p className="text-xs text-slate-500">{project.mentor.role}</p>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Resources</h3>
              <div className="space-y-3">
                <a href={`https://${project.github}`} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                  <div className="flex items-center gap-3 text-slate-700 font-semibold text-sm">
                    <Github className="w-5 h-5" /> GitHub Repository
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#FF5722]" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

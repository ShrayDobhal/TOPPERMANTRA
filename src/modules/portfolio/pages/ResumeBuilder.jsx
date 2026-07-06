import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, Download, FileText, CheckCircle2, LayoutTemplate, 
  Settings2, Sparkles, Wand2
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import useStudentStore from '../../../store/useStudentStore';
import usePortfolioStore from '../../../store/usePortfolioStore';

export default function ResumeBuilder() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  
  const profile = useStudentStore(s => s.profile);
  const { projects, badges, loading, fetchPortfolioData } = usePortfolioStore();

  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  // Section visibility state
  const [sections, setSections] = useState({
    'Contact Info': true,
    'Professional Summary': false,
    'Experience': true,
    'Projects': true,
    'Education': true,
    'Skills': true
  });

  const [activeTemplate, setActiveTemplate] = useState('Harvard Minimal');

  const handleExport = () => {
    setIsExporting(true);
    // Simulate PDF generation delay
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3000);
    }, 2000);
  };

  const toggleSection = (section) => {
    setSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="p-4 lg:px-10 border-b border-[#E9ECEF] bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/portfolio" className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-xl transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h2 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2">
              <FileText className="text-[#3B82F6]" size={20} /> Resume Builder
            </h2>
          </div>
        </div>
        
        <button 
          onClick={handleExport}
          disabled={isExporting || exportComplete || isSyncing}
          className={cn(
            "px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm",
            exportComplete 
              ? "bg-[#22C55E] text-white" 
              : (isExporting || loading)
              ? "bg-[#E2E8F0] text-[#64748B] cursor-not-allowed"
              : "bg-[#0F172A] text-white hover:bg-[#1E293B]"
          )}
        >
          {exportComplete ? (
            <><CheckCircle2 size={18} /> Downloaded</>
          ) : isExporting ? (
            <><div className="w-4 h-4 border-2 border-[#64748B] border-t-transparent rounded-full animate-spin"></div> Generating PDF...</>
          ) : (
            <><Download size={18} /> Export PDF</>
          )}
        </button>
      </div>

      {/* Main Content - Dual Pane */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Sidebar - Controls */}
        <div className="w-80 shrink-0 bg-white border-r border-[#E9ECEF] flex flex-col overflow-y-auto custom-scrollbar z-10 relative">
          
          <div className="p-6 border-b border-[#E9ECEF]">
            <h3 className="text-sm font-extrabold text-[#0F172A] mb-4 flex items-center gap-2">
              <Sparkles className="text-[#A855F7]" size={16} /> ATS Analysis
            </h3>
            <div className="flex items-center gap-4 bg-[#F8FAFC] p-4 rounded-2xl border border-[#E9ECEF]">
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="#E2E8F0" strokeWidth="6" fill="none" />
                  <circle cx="32" cy="32" r="28" stroke="#22C55E" strokeWidth="6" fill="none" strokeDasharray="175.93" strokeDashoffset="17.59" strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-[#0F172A]">90</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#0F172A]">Excellent Score</p>
                <p className="text-xs font-semibold text-[#64748B] mt-0.5">Highly readable by ATS systems.</p>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-[#E9ECEF]">
            <h3 className="text-sm font-extrabold text-[#0F172A] mb-4 flex items-center gap-2">
              <LayoutTemplate className="text-[#64748B]" size={16} /> Templates
            </h3>
            <div className="space-y-3">
              {['Harvard Minimal', 'Modern Tech', 'Creative Grid'].map((template) => (
                <button 
                  key={template} 
                  onClick={() => setActiveTemplate(template)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all border",
                    activeTemplate === template ? "bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6]" : "bg-white border-[#E9ECEF] text-[#64748B] hover:border-[#94A3B8]"
                  )}
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6 pb-24">
            <h3 className="text-sm font-extrabold text-[#0F172A] mb-4 flex items-center gap-2">
              <Settings2 className="text-[#64748B]" size={16} /> Included Sections
            </h3>
            <div className="space-y-3">
              {Object.keys(sections).map(section => (
                <label key={section} className="flex items-center justify-between group cursor-pointer" onClick={() => toggleSection(section)}>
                  <span className="text-sm font-semibold text-[#0F172A]">{section}</span>
                  <div className={cn("w-10 h-6 rounded-full relative transition-colors", sections[section] ? "bg-[#3B82F6]" : "bg-[#CBD5E1]")}>
                    <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200", sections[section] ? "right-1" : "left-1")}></div>
                  </div>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Right Pane - Live Preview */}
        <div className="flex-1 bg-[#F1F5F9] p-8 overflow-y-auto custom-scrollbar flex justify-center items-start">
          
          {/* A4 Paper Preview */}
          <div className="relative w-[800px] min-h-[1131px] bg-white shadow-xl flex flex-col p-12 shrink-0 transition-all">
            
            {/* Auto Generate Overlay */}
            {loading && (
              <div className="absolute inset-0 z-20 bg-white/50 backdrop-blur-[2px] flex items-center justify-center">
                <div className="bg-white p-4 rounded-2xl border border-[#E9ECEF] shadow-2xl flex items-center gap-3 animate-pulse">
                  <Wand2 className="text-[#A855F7]" size={20} />
                  <span className="text-sm font-bold text-[#0F172A]">Auto-syncing from Showcase...</span>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="border-b-2 border-[#0F172A] pb-6 mb-6 text-center">
              <h1 className="text-4xl font-serif text-[#0F172A] uppercase tracking-wider mb-2">{profile?.name || 'Student Name'}</h1>
              {sections['Contact Info'] && (
                <p className="text-sm text-[#475569] font-sans">
                  {profile?.email || 'email@example.com'} 
                  {profile?.githubUrl && ` • github.com/${profile.githubUrl.replace('https://github.com/', '')}`}
                  {profile?.linkedinUrl && ` • linkedin.com/in/${profile.linkedinUrl.replace('https://www.linkedin.com/in/', '')}`}
                </p>
              )}
            </div>
            
            {/* Professional Summary */}
            {sections['Professional Summary'] && (
              <div className="mb-6">
                <h2 className="text-lg font-serif text-[#0F172A] uppercase tracking-widest border-b border-[#E2E8F0] pb-1 mb-3">Professional Summary</h2>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Results-driven software engineering student with a strong foundation in modern web technologies and a passion for building scalable, high-performance applications. Proven ability to quickly learn new tools and collaborate effectively in fast-paced environments.
                </p>
              </div>
            )}

            {/* Education */}
            {sections['Education'] && (
              <div className="mb-6">
                <h2 className="text-lg font-serif text-[#0F172A] uppercase tracking-widest border-b border-[#E2E8F0] pb-1 mb-3">Education</h2>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-[#0F172A]">{profile?.college || 'University Name'}</h3>
                  <span className="text-sm text-[#475569]">Expected 2027</span>
                </div>
                <p className="text-sm text-[#475569] italic">Bachelor of Technology in {profile?.branch || 'Computer Science'}</p>
              </div>
            )}
            
            {/* Experience */}
            {sections['Experience'] && (
              <div className="mb-6">
                <h2 className="text-lg font-serif text-[#0F172A] uppercase tracking-widest border-b border-[#E2E8F0] pb-1 mb-3">Experience</h2>
                
                <div className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-base font-bold text-[#0F172A]">Google</h3>
                    <span className="text-sm text-[#475569]">Summer 2026</span>
                  </div>
                  <p className="text-sm text-[#475569] italic mb-2">Software Engineering Intern</p>
                  <ul className="list-disc list-outside ml-4 text-sm text-[#475569] space-y-1">
                    <li>Designed and implemented a distributed caching system using Redis, reducing API latency by 40%.</li>
                    <li>Collaborated with a team of 5 engineers to migrate legacy monolith architecture to Go microservices.</li>
                  </ul>
                </div>
              </div>
            )}
            
            {/* Projects & Experience from Tasks */}
            {sections['Projects'] && (
              <div className="mb-6">
                <h2 className="text-lg font-serif text-[#0F172A] uppercase tracking-widest border-b border-[#E2E8F0] pb-1 mb-3">Completed Projects</h2>
                
                {projects.length === 0 ? (
                  <p className="text-sm text-[#475569] italic">No completed projects yet. Claim and finish tasks to build your portfolio!</p>
                ) : (
                  projects.map(project => (
                    <div key={project.id} className="mb-4">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-base font-bold text-[#0F172A]">{project.projectTitle}</h3>
                        <span className="text-sm text-[#475569]">{project.completedAt}</span>
                      </div>
                      <p className="text-sm text-[#475569] italic mb-2">{project.title}</p>
                      <ul className="list-disc list-outside ml-4 text-sm text-[#475569] space-y-1">
                        <li>{project.description}</li>
                      </ul>
                    </div>
                  ))
                )}
              </div>
            )}
            
            {/* Skills & Badges */}
            {sections['Skills'] && (
              <div>
                <h2 className="text-lg font-serif text-[#0F172A] uppercase tracking-widest border-b border-[#E2E8F0] pb-1 mb-3">Achievements & Skills</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  {badges.length === 0 ? (
                    <span className="text-sm text-[#475569]">Earn badges to display them here.</span>
                  ) : (
                    badges.map(badge => (
                      <span key={badge.id} className="text-xs font-bold text-[#0F172A] bg-[#F1F5F9] px-2.5 py-1 rounded-lg border border-[#E2E8F0] flex items-center gap-1.5">
                        {badge.icon} {badge.name}
                      </span>
                    ))
                  )}
                </div>
                {profile?.skills && (
                   <p className="text-sm text-[#475569] mb-1 mt-3"><span className="font-bold text-[#0F172A]">Technical Skills:</span> {profile.skills.join(', ')}</p>
                )}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

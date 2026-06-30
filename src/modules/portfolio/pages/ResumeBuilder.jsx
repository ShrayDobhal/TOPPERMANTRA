import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, Download, FileText, CheckCircle2, LayoutTemplate, 
  Settings2, Sparkles, Wand2
} from 'lucide-react';
import { cn } from '../../../lib/utils';

export default function ResumeBuilder() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    // Simulate PDF generation delay
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3000);
    }, 2000);
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
          disabled={isExporting || exportComplete}
          className={cn(
            "px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm",
            exportComplete 
              ? "bg-[#22C55E] text-white" 
              : isExporting
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
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - Controls */}
        <div className="w-80 shrink-0 bg-white border-r border-[#E9ECEF] flex flex-col overflow-y-auto custom-scrollbar">
          
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
              {['Harvard Minimal', 'Modern Tech', 'Creative Grid'].map((template, i) => (
                <button key={template} className={cn(
                  "w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all border",
                  i === 0 ? "bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6]" : "bg-white border-[#E9ECEF] text-[#64748B] hover:border-[#94A3B8]"
                )}>
                  {template}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-sm font-extrabold text-[#0F172A] mb-4 flex items-center gap-2">
              <Settings2 className="text-[#64748B]" size={16} /> Included Sections
            </h3>
            <div className="space-y-3">
              {['Contact Info', 'Professional Summary', 'Experience', 'Projects', 'Education', 'Skills'].map(section => (
                <label key={section} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm font-semibold text-[#0F172A]">{section}</span>
                  <div className="w-10 h-6 bg-[#3B82F6] rounded-full relative transition-colors">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                  </div>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Right Pane - Live Preview */}
        <div className="flex-1 bg-[#F1F5F9] p-8 overflow-y-auto custom-scrollbar flex justify-center">
          
          {/* A4 Paper Preview */}
          <div className="w-[800px] h-[1131px] bg-white shadow-xl flex flex-col p-12 shrink-0">
            {/* Header */}
            <div className="border-b-2 border-[#0F172A] pb-6 mb-6 text-center">
              <h1 className="text-4xl font-serif text-[#0F172A] uppercase tracking-wider mb-2">Shray Dobhal</h1>
              <p className="text-sm text-[#475569] font-sans">
                shraydobhal@gmail.com • +91 9876543210 • linkedin.com/in/shray • github.com/shray
              </p>
            </div>
            
            {/* Education */}
            <div className="mb-6">
              <h2 className="text-lg font-serif text-[#0F172A] uppercase tracking-widest border-b border-[#E2E8F0] pb-1 mb-3">Education</h2>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-bold text-[#0F172A]">Topper Mantra University</h3>
                <span className="text-sm text-[#475569]">Expected 2027</span>
              </div>
              <p className="text-sm text-[#475569] italic">Bachelor of Technology in Computer Science</p>
            </div>
            
            {/* Experience */}
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
            
            {/* Projects */}
            <div className="mb-6">
              <h2 className="text-lg font-serif text-[#0F172A] uppercase tracking-widest border-b border-[#E2E8F0] pb-1 mb-3">Projects</h2>
              
              <div className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-[#0F172A]">Spaces Collaboration Engine</h3>
                  <span className="text-sm text-[#475569]">React, Node.js, WebSockets</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-sm text-[#475569] space-y-1">
                  <li>Built a real-time collaborative workspace supporting 10,000+ concurrent users with zero latency tab switching.</li>
                  <li>Implemented drag-and-drop Kanban boards and integrated video conferencing APIs for live office hours.</li>
                </ul>
              </div>
            </div>
            
            {/* Skills */}
            <div>
              <h2 className="text-lg font-serif text-[#0F172A] uppercase tracking-widest border-b border-[#E2E8F0] pb-1 mb-3">Technical Skills</h2>
              <p className="text-sm text-[#475569] mb-1"><span className="font-bold text-[#0F172A]">Languages:</span> JavaScript, TypeScript, Python, Java, Go, C++</p>
              <p className="text-sm text-[#475569] mb-1"><span className="font-bold text-[#0F172A]">Frameworks:</span> React, Next.js, Express, Spring Boot, Tailwind CSS</p>
              <p className="text-sm text-[#475569]"><span className="font-bold text-[#0F172A]">Tools & Cloud:</span> AWS, Docker, Kubernetes, Git, GitHub Actions, Figma</p>
            </div>
            
            {/* Auto Generate Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-[#E9ECEF] shadow-xl flex items-center gap-3 animate-pulse">
              <Wand2 className="text-[#A855F7]" size={20} />
              <span className="text-sm font-bold text-[#0F172A]">Auto-syncing from Showcase...</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

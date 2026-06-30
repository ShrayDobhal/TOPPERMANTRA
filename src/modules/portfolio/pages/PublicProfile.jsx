import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MapPin, Building, GraduationCap, Globe, ExternalLink, 
  Download, Code, Star, GitBranch as Github, Terminal, CheckCircle2, ChevronRight,
  Trophy, Award, GitBranch
} from 'lucide-react';
import { Avatar } from '../../../components/ui/Avatar';
import { cn } from '../../../lib/utils';

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'activity', label: 'Activity' }
];

export default function PublicProfile() {
  const { username } = useParams();
  const [activeSection, setActiveSection] = useState('about');

  // Smooth scroll helper
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#3B82F6] selection:text-white">
      
      {/* Sticky Top Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-[#E9ECEF] z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-extrabold text-lg flex items-center gap-2 tracking-tight">
            <span className="bg-[#0F172A] text-white px-2 py-1 rounded-lg">TM</span> @{username || 'shraydobhal'}
          </div>
          
          <div className="hidden md:flex items-center gap-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#E9ECEF]">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-sm font-bold transition-all",
                  activeSection === link.id 
                    ? "bg-white text-[#0F172A] shadow-sm" 
                    : "text-[#64748B] hover:text-[#0F172A]"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-[#F8FAFC] border border-[#E9ECEF] text-[#0F172A] px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#F1F5F9] transition-colors flex items-center gap-2">
              <Download size={16} /> Resume
            </button>
            <button className="bg-[#3B82F6] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#2563EB] transition-colors shadow-sm">
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 pb-32 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Hero Section */}
        <section className="mt-8 mb-16 relative">
          <div className="h-48 sm:h-64 rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#3B82F6] overflow-hidden relative shadow-lg">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          </div>
          
          <div className="px-4 sm:px-8 relative -mt-20 sm:-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-6">
              <div className="p-2 bg-[#F8FAFC] rounded-[32px] inline-block shadow-sm">
                <Avatar size="2xl" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shray" className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl border-4 border-white shadow-md" />
              </div>
              <div className="flex items-center gap-3 mb-2 sm:mb-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-[#E9ECEF] flex items-center justify-center text-[#0F172A] hover:text-[#3B82F6] hover:border-[#3B82F6] transition-colors shadow-sm"><Globe size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-[#E9ECEF] flex items-center justify-center text-[#0F172A] hover:text-[#3B82F6] hover:border-[#3B82F6] transition-colors shadow-sm"><Github size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-[#E9ECEF] flex items-center justify-center text-[#0F172A] hover:text-[#3B82F6] hover:border-[#3B82F6] transition-colors shadow-sm"><ExternalLink size={18} /></a>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Shray Dobhal</h1>
                <span className="bg-[#22C55E]/10 text-[#22C55E] p-1 rounded-full"><CheckCircle2 size={20} /></span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#3B82F6] mb-4">Software Engineer • Open Source Contributor</h2>
              
              <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-[#64748B]">
                <span className="flex items-center gap-1.5"><GraduationCap size={16}/> B.Tech CSE (2027)</span>
                <span className="flex items-center gap-1.5"><Building size={16}/> Topper Mantra University</span>
                <span className="flex items-center gap-1.5"><MapPin size={16}/> Remote, India</span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-16 scroll-mt-24">
          <h3 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
            <Terminal size={24} className="text-[#3B82F6]" /> About Me
          </h3>
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9ECEF] shadow-sm">
            <p className="text-base text-[#475569] leading-relaxed font-medium">
              I am a passionate software engineer specializing in building scalable web applications and distributed systems. 
              Currently exploring AI integration and high-performance backend architectures. I love contributing to open source 
              and helping peers in the developer community. My ultimate goal is to build products that impact millions of users.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-16 scroll-mt-24">
          <h3 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
            <Code size={24} className="text-[#A855F7]" /> Technical Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-[#E9ECEF] shadow-sm">
              <h4 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider mb-4">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'C++'].map(skill => (
                  <span key={skill} className="bg-[#F8FAFC] border border-[#E9ECEF] px-3 py-1.5 rounded-lg text-sm font-bold">{skill}</span>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#E9ECEF] shadow-sm">
              <h4 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider mb-4">Frameworks & Cloud</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'Node.js', 'AWS', 'Docker', 'Kubernetes'].map(skill => (
                  <span key={skill} className="bg-[#F8FAFC] border border-[#E9ECEF] px-3 py-1.5 rounded-lg text-sm font-bold">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-16 scroll-mt-24">
          <h3 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
            <Building size={24} className="text-[#F59E0B]" /> Experience
          </h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#E2E8F0] before:to-transparent">
            
            {/* Timeline Item 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#F8FAFC] bg-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 overflow-hidden p-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-3xl border border-[#E9ECEF] shadow-sm">
                <h4 className="text-lg font-extrabold text-[#0F172A]">Software Engineering Intern</h4>
                <p className="text-sm font-bold text-[#3B82F6] mb-3">Google • May 2026 - Aug 2026</p>
                <p className="text-sm text-[#475569] font-medium leading-relaxed">
                  Engineered a high-throughput data processing pipeline in Go, reducing latency by 40%. Collaborated with cross-functional teams to deploy microservices on Kubernetes.
                </p>
              </div>
            </div>
            
            {/* Timeline Item 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#F8FAFC] bg-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 overflow-hidden p-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Startup" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-3xl border border-[#E9ECEF] shadow-sm">
                <h4 className="text-lg font-extrabold text-[#0F172A]">Frontend Developer</h4>
                <p className="text-sm font-bold text-[#3B82F6] mb-3">TechNova Startup • Jan 2025 - Dec 2025</p>
                <p className="text-sm text-[#475569] font-medium leading-relaxed">
                  Led the development of a student dashboard using React and Tailwind CSS. Improved lighthouse performance score from 65 to 98.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-16 scroll-mt-24">
          <h3 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
            <Terminal size={24} className="text-[#10B981]" /> Featured Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Project Card */}
            <div className="bg-white rounded-3xl border border-[#E9ECEF] overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
              <div className="h-40 bg-[#F1F5F9] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/20 to-[#3B82F6]/20"></div>
                <Code size={48} className="text-[#0F172A]/20" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="text-xl font-extrabold text-[#0F172A] mb-2 group-hover:text-[#3B82F6] transition-colors">Spaces Engine</h4>
                <p className="text-sm text-[#475569] font-medium mb-4 flex-1">
                  A high-performance real-time collaborative workspace supporting zero-latency state sync via WebSockets.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F8FAFC] border border-[#E9ECEF] px-2 py-1 rounded-md">React</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F8FAFC] border border-[#E9ECEF] px-2 py-1 rounded-md">Node.js</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F8FAFC] border border-[#E9ECEF] px-2 py-1 rounded-md">Socket.io</span>
                </div>
                <div className="flex items-center gap-3">
                  <a href="#" className="flex-1 bg-[#F8FAFC] border border-[#E9ECEF] text-[#0F172A] py-2 rounded-xl text-sm font-bold text-center hover:bg-[#F1F5F9] transition-colors">GitHub</a>
                  <a href="#" className="flex-1 bg-[#3B82F6] text-white py-2 rounded-xl text-sm font-bold text-center hover:bg-[#2563EB] transition-colors shadow-sm">Live Demo</a>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="bg-white rounded-3xl border border-[#E9ECEF] overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
              <div className="h-40 bg-[#F1F5F9] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#A855F7]/20 to-[#EC4899]/20"></div>
                <Trophy size={48} className="text-[#0F172A]/20" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="text-xl font-extrabold text-[#0F172A] mb-2 group-hover:text-[#A855F7] transition-colors">AI Mentor Match</h4>
                <p className="text-sm text-[#475569] font-medium mb-4 flex-1">
                  An intelligent recommendation system that pairs students with industry experts using semantic matching.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F8FAFC] border border-[#E9ECEF] px-2 py-1 rounded-md">Python</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F8FAFC] border border-[#E9ECEF] px-2 py-1 rounded-md">FastAPI</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F8FAFC] border border-[#E9ECEF] px-2 py-1 rounded-md">Pinecone</span>
                </div>
                <div className="flex items-center gap-3">
                  <a href="#" className="flex-1 bg-[#F8FAFC] border border-[#E9ECEF] text-[#0F172A] py-2 rounded-xl text-sm font-bold text-center hover:bg-[#F1F5F9] transition-colors">GitHub</a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="mb-16 scroll-mt-24">
          <h3 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
            <Award size={24} className="text-[#F43F5E]" /> Honors & Awards
          </h3>
          <div className="bg-white p-6 rounded-3xl border border-[#E9ECEF] shadow-sm space-y-4">
            <div className="flex items-start gap-4 p-4 hover:bg-[#F8FAFC] rounded-2xl transition-colors">
              <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-xl flex items-center justify-center shrink-0">
                <Trophy size={24} className="text-[#F59E0B]" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[#0F172A]">Smart India Hackathon Winner</h4>
                <p className="text-sm font-semibold text-[#64748B] mb-1">Government of India • 2026</p>
                <p className="text-sm text-[#475569] font-medium">Secured 1st position among 500+ teams nationwide for building a blockchain-based land registry system.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Activity Section (GitHub style) */}
        <section id="activity" className="mb-16 scroll-mt-24">
          <h3 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
            <GitBranch size={24} className="text-[#0F172A]" /> Open Source & Activity
          </h3>
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9ECEF] shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm font-bold text-[#64748B] uppercase tracking-wider mb-1">Contributions</p>
                <p className="text-3xl font-black text-[#0F172A]">1,452</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#64748B] uppercase tracking-wider mb-1">Stars Earned</p>
                <p className="text-3xl font-black text-[#0F172A] flex items-center justify-end gap-2"><Star size={24} className="text-[#F59E0B] fill-current" /> 128</p>
              </div>
            </div>
            
            {/* Fake Contribution Graph */}
            <div className="flex gap-1 overflow-x-auto custom-scrollbar pb-2">
              {Array.from({ length: 40 }).map((_, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-1 shrink-0">
                  {Array.from({ length: 7 }).map((_, rowIndex) => {
                    // Randomize cell colors to simulate activity
                    const rand = Math.random();
                    let color = 'bg-[#F1F5F9]';
                    if (rand > 0.9) color = 'bg-[#1E40AF]';
                    else if (rand > 0.7) color = 'bg-[#3B82F6]';
                    else if (rand > 0.5) color = 'bg-[#93C5FD]';
                    else if (rand > 0.3) color = 'bg-[#DBEAFE]';
                    
                    return (
                      <div key={rowIndex} className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${color}`}></div>
                    )
                  })}
                </div>
              ))}
            </div>
            
          </div>
        </section>

      </main>

    </div>
  );
}

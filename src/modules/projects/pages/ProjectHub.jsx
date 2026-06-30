import { useState } from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import CategoryCarousel from '../components/CategoryCarousel';
import ProjectCard from '../components/ProjectCard';

const mockProjects = [
  {
    id: 'p1',
    title: 'AI Resume Analyzer',
    description: 'Build an NLP-powered resume parser that grades resumes against JD requirements.',
    techStack: ['Python', 'FastAPI', 'React', 'OpenAI'],
    difficulty: 'Advanced',
    duration: '4 Weeks',
    xp: 1200,
    openPositions: 2,
    coverGradient: 'bg-gradient-to-br from-[#FF5722]/80 to-[#A855F7]/80',
    logoGradient: 'from-[#FF5722] to-[#FE6D4D]'
  },
  {
    id: 'p2',
    title: 'Open Source UI Library',
    description: 'Contribute to a modern accessibility-first React component library.',
    techStack: ['React', 'Tailwind', 'Storybook', 'Typescript'],
    difficulty: 'Intermediate',
    duration: 'Ongoing',
    xp: 500,
    openPositions: 5,
    coverGradient: 'bg-gradient-to-br from-blue-500/80 to-cyan-500/80',
    logoGradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'p3',
    title: 'Campus Event Manager',
    description: 'A complete platform for managing college tech fests and hackathons.',
    techStack: ['Next.js', 'PostgreSQL', 'Prisma'],
    difficulty: 'Beginner',
    duration: '2 Weeks',
    xp: 800,
    openPositions: 1,
    coverGradient: 'bg-gradient-to-br from-emerald-500/80 to-teal-500/80',
    logoGradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'p4',
    title: 'Blockchain Voting System',
    description: 'Secure, decentralized voting mechanism for student council elections.',
    techStack: ['Solidity', 'Ethereum', 'React', 'Web3.js'],
    difficulty: 'Advanced',
    duration: '6 Weeks',
    xp: 1500,
    openPositions: 3,
    coverGradient: 'bg-gradient-to-br from-purple-500/80 to-pink-500/80',
    logoGradient: 'from-purple-500 to-pink-500'
  }
];

export default function ProjectHub() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[32px] p-8 sm:p-12 border border-[#334155] text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#FF5722]/20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mb-4 leading-tight">
            Discover, Collaborate, and <span className="text-[#FF5722]">Build</span>.
          </h1>
          <p className="text-[#94A3B8] text-lg mb-8 font-medium">
            Join India's largest student project ecosystem. Recruit teammates, claim open issues, and earn XP to build your automated portfolio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={20} />
              <input 
                type="text" 
                placeholder="Search projects, skills, or mentors..." 
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-colors shrink-0">
              <SlidersHorizontal size={20} />
              <span className="font-bold">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 px-2">Browse by Category</h2>
        <CategoryCarousel />
      </div>

      {/* Recommended Projects */}
      <div>
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-2xl font-bold font-heading text-[#0F172A] flex items-center gap-2">
            <Sparkles className="text-[#A855F7]" size={24} /> Recommended For You
          </h2>
          <button className="text-sm font-bold text-[#FF5722] hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {mockProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Trending Projects */}
      <div className="pt-8">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-2xl font-bold font-heading text-[#0F172A]">Trending Open Source</h2>
          <button className="text-sm font-bold text-[#FF5722] hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {mockProjects.slice().reverse().map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

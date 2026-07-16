import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import useGamificationStore from './useGamificationStore';
import toast from 'react-hot-toast';

// Mock AI Data for Resume Analysis
const MOCK_AI_ANALYSIS = {
  overallScore: 82,
  atsScore: 78,
  qualityScore: {
    grammar: 95,
    formatting: 80,
    achievements: 70,
    leadership: 60,
    projects: 85,
    technicalSkills: 90,
    communication: 85,
    experienceQuality: 75
  },
  careerReadiness: 80,
  interviewReadiness: {
    score: 75,
    weakTopics: ["System Design", "Behavioral"],
    strongTopics: ["React", "JavaScript", "Frontend Architecture"],
    likelyQuestions: [
      "Tell me about a time you optimized a React application.",
      "How did you measure the impact of your projects?"
    ]
  },
  atsAnalysis: {
    formatting: { score: 92, reason: "Good spacing but inconsistent bullet indentation.", suggestion: "Use a single bullet style throughout the resume." },
    keywordOptimization: { score: 70, reason: "Missing key industry buzzwords.", suggestion: "Add keywords like 'Microservices', 'GraphQL'." },
    structure: { score: 85, reason: "Standard layout used.", suggestion: "Move education below experience since you have 2+ years of experience." }
  },
  sectionReviews: [
    { section: "Projects", strength: "Strong technical stack.", weakness: "No measurable outcomes.", suggestion: "Add metrics such as users served, latency improvement, revenue generated, downloads, accuracy, etc.", priority: "High", impact: "+10 ATS Score" },
    { section: "Experience", strength: "Good action verbs.", weakness: "Too many bullet points per role.", suggestion: "Limit to 4-5 high-impact bullet points.", priority: "Medium", impact: "+5 Quality Score" }
  ],
  missingSections: [
    { section: "Portfolio", suggestion: "Add a link to your live projects." },
    { section: "Open Source", suggestion: "Highlight any open-source contributions to stand out." }
  ],
  keywordIntelligence: {
    present: ["React", "Node.js", "MongoDB", "TailwindCSS"],
    missing: ["TypeScript", "AWS", "Docker", "System Design"],
    overused: ["Developed", "Created"],
    suggested: ["Architected", "Engineered", "Orchestrated"],
    densityScore: 65
  },
  salaryEstimate: {
    current: "₹12,00,000 - ₹15,00,000",
    potential: "₹18,00,000 - ₹24,00,000",
    confidence: "85%"
  },
  suitableRoles: [
    { role: "Software Engineer", match: 90 },
    { role: "Frontend Developer", match: 95 },
    { role: "Full Stack Engineer", match: 80 },
    { role: "Product Manager", match: 40 }
  ],
  skillCategories: {
    "Programming Languages": ["JavaScript", "Python", "Java"],
    "Frameworks": ["React", "Express.js", "Next.js"],
    "Tools": ["Git", "Postman", "Figma"]
  }
};

const useResumeStore = create((set, get) => ({
  resumeData: null, // Parsed text/sections
  analysisResults: null,
  stage: 'idle', // 'idle' | 'uploading' | 'parsing' | 'analyzing' | 'complete'
  progress: 0, // 0 to 100
  file: null,

  reset: () => set({ resumeData: null, analysisResults: null, stage: 'idle', progress: 0, file: null }),

  uploadResume: async (file) => {
    set({ stage: 'uploading', progress: 10, file });
    
    // 1. Upload to Supabase Storage
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id || 'guest';
      const filePath = `${userId}/${Date.now()}_${file.name}`;
      
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);
        
      if (uploadError) {
        console.warn("Storage upload failed, proceeding with local parsing.", uploadError);
      }
    } catch (e) {
      console.warn("Could not upload to storage:", e);
    }
    
    set({ progress: 30, stage: 'parsing' });

    // 2. Parse Resume (Mocking the parsing delay for PDF.js / Mammoth)
    await new Promise(resolve => setTimeout(resolve, 2000));
    set({ progress: 60, stage: 'analyzing' });

    // 3. AI Analysis via Edge Function (Mocking the response)
    // In production: await supabase.functions.invoke('resume-analyzer', { body: { text: parsedText }})
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    set({ 
      progress: 100, 
      stage: 'complete',
      resumeData: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+91 9876543210",
        education: "B.Tech Computer Science",
        experience: "2 Years at Tech Startup"
      },
      analysisResults: MOCK_AI_ANALYSIS
    });
    
    toast.success("Resume Analyzed Successfully!");
    
    // Add Gamification XP
    useGamificationStore.getState().awardXP('Upload Resume', 50);
    useGamificationStore.getState().awardXP('Complete Resume Analysis', 100);
  },

  optimizeBullet: async (bulletText, style) => {
    // Mock AI bullet optimization
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `[${style}] Architected and deployed scalable feature X, resulting in 40% performance improvement and accelerating user adoption by 25%.`;
  }
}));

export default useResumeStore;

import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import useGamificationStore from './useGamificationStore';
import toast from 'react-hot-toast';

import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set up PDF.js worker (use CDN to avoid build configuration issues)
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const extractTextFromFile = async (file) => {
  if (file.type === 'application/pdf') {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    return fullText;
  } else if (file.name.endsWith('.docx')) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }
  throw new Error("Unsupported file type");
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

    // 2. Parse Resume Text
    let parsedText = '';
    try {
      parsedText = await extractTextFromFile(file);
    } catch (e) {
      console.error("Parsing failed:", e);
      toast.error("Failed to parse resume document.");
      set({ stage: 'idle', progress: 0 });
      return;
    }
    
    set({ progress: 60, stage: 'analyzing' });

    // 3. AI Analysis via Edge Function
    let aiResults = null;
    try {
      const { data, error } = await supabase.functions.invoke('resume-analyzer', {
        body: { text: parsedText }
      });

      if (error) throw error;
      aiResults = data;
    } catch (e) {
      console.error("AI Analysis failed:", e);
      toast.error("AI analysis failed. Please ensure GEMINI_API_KEY is configured.");
      set({ stage: 'idle', progress: 0 });
      return;
    }
    
    set({ 
      progress: 100, 
      stage: 'complete',
      resumeData: {
        name: "Parsed User",
        email: "user@example.com",
        phone: "-",
        education: "-",
        experience: "-"
      },
      analysisResults: aiResults
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

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Step1BasicInfo from '../../components/onboarding/Step1BasicInfo';
import Step2CareerGoal from '../../components/onboarding/Step2CareerGoal';
import Step3Skills from '../../components/onboarding/Step3Skills';
import Step4Interests from '../../components/onboarding/Step4Interests';
import Step5Socials from '../../components/onboarding/Step5Socials';
import AILoadingScreen from '../../components/onboarding/AILoadingScreen';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useMutation } from '@tanstack/react-query';
import api from '../../lib/api';
import { useUser } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const TOTAL_STEPS = 5;

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  // Mock State
  const [data, setData] = useState({
    basicInfo: {},
    careerGoal: null,
    skills: [],
    interests: [],
    socials: {}
  });

  const { user } = useUser();

  // Mutation to save onboarding data
  const { mutate: saveOnboarding, isPending: isSaving } = useMutation({
    mutationFn: async (onboardingData) => {
      if (!user) throw new Error("No user found");
      
      const { error } = await supabase
        .from('profiles')
        .update({
          college: onboardingData.college || '',
          branch: onboardingData.branch || '',
          year: onboardingData.year || '',
          career_goal: onboardingData.careerGoal || '',
          github_url: onboardingData.githubUrl || '',
          linkedin_url: onboardingData.linkedinUrl || ''
        })
        .eq('id', user.id);

      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      setIsCompleted(true);
    },
    onError: (error) => {
      console.error("Failed to save onboarding data:", error);
      toast.error("There was an issue saving your data. Please try again.");
    }
  });

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(curr => curr + 1);
    } else {
      // Final step: construct payload and save
      const payload = {
        ...data.basicInfo,
        careerGoal: data.careerGoal,
        skills: data.skills,
        interests: data.interests,
        ...data.socials
      };
      saveOnboarding(payload);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(curr => curr - 1);
    }
  };

  // If completed, show AI loading screen
  if (isCompleted) {
    return <AILoadingScreen onComplete={() => navigate('/dashboard')} />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo data={data.basicInfo} updateData={(val) => setData({...data, basicInfo: val})} />;
      case 2:
        return <Step2CareerGoal data={data.careerGoal} updateData={(val) => setData({...data, careerGoal: val})} />;
      case 3:
        return <Step3Skills data={data.skills} updateData={(val) => setData({...data, skills: val})} />;
      case 4:
        return <Step4Interests data={data.interests} updateData={(val) => setData({...data, interests: val})} />;
      case 5:
        return <Step5Socials data={data.socials} updateData={(val) => setData({...data, socials: val})} />;
      default:
        return null;
    }
  };

  const stepTitles = [
    "Tell us about yourself",
    "What is your primary goal?",
    "Select your core skills",
    "What are you interested in?",
    "Connect your profiles"
  ];

  const stepSubtitles = [
    "This helps us match you with students from similar backgrounds.",
    "We'll customize your roadmap based on your ambition.",
    "Pick up to 5 skills you want to highlight or improve.",
    "This helps us recommend events, hackathons, and mentors.",
    "Showcase your work and professional network (Optional)."
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* Top Progress Bar */}
      <div className="h-1.5 w-full bg-[#E9ECEF]">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]"
          initial={{ width: `${((currentStep - 1) / TOTAL_STEPS) * 100}%` }}
          animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col pt-12 sm:pt-16">
        
        {/* Header */}
        <div className="text-center mb-12 relative">
          {currentStep > 1 && (
            <button 
              onClick={prevStep}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-[#64748B] hover:text-[#0F172A] transition-colors rounded-lg hover:bg-white"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <h2 className="text-sm font-bold text-[#FF5722] uppercase tracking-wider mb-3">Step {currentStep} of {TOTAL_STEPS}</h2>
          <h1 className="text-3xl font-extrabold font-heading text-[#0F172A] mb-2">{stepTitles[currentStep - 1]}</h1>
          <p className="text-[#64748B] text-sm sm:text-base">{stepSubtitles[currentStep - 1]}</p>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col items-center max-w-2xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-1"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 py-6 border-t border-[#E9ECEF] flex items-center justify-between">
          <button 
            className="text-sm font-bold text-[#94A3B8] hover:text-[#0F172A] transition-colors"
            onClick={() => {/* Autosave logic */}}
          >
            Autosaved just now
          </button>

          <button 
            onClick={nextStep}
            disabled={isSaving}
            className={cn(
              "py-3.5 px-8 bg-[#0F172A] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#0F172A]/20 transition-all hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0",
              currentStep === TOTAL_STEPS && "bg-[#FF5722] shadow-[#FF5722]/20 hover:bg-[#E64A19]"
            )}
          >
            {isSaving ? 'Saving...' : currentStep === TOTAL_STEPS ? 'Complete' : 'Continue'}
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}

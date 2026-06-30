import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/Button";

const steps = [
  { id: 1, title: "Basic Info" },
  { id: 2, title: "Description" },
  { id: 3, title: "Problem" },
  { id: 4, title: "Skills" },
  { id: 5, title: "Open Positions" },
  { id: 6, title: "Mentorship" },
  { id: 7, title: "Publish" }
];

export default function ProjectCreationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 7) setCurrentStep(prev => prev + 1);
    else navigate('/projects'); // Submit action
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
    else navigate('/projects');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 flex flex-col">
      <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 flex-grow flex flex-col">
        
        {/* Header & Progress */}
        <div className="mb-8">
          <button onClick={handleBack} className="text-slate-500 hover:text-slate-800 flex items-center gap-2 text-sm font-semibold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          <div className="flex justify-between items-end mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">Start a Project</h1>
              <p className="text-sm text-slate-500">Step {currentStep} of {steps.length}: {steps[currentStep-1].title}</p>
            </div>
            <div className="text-sm font-bold text-[#FF5722]">{Math.round((currentStep / steps.length) * 100)}%</div>
          </div>
          
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#FF5722]"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Wizard Form Area */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200 flex-grow relative overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-grow flex flex-col"
            >
              {/* Step 1 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#0F172A]">What are you building?</h2>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Project Name</label>
                    <input type="text" placeholder="e.g. AI Resume Analyzer" className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Domain</label>
                    <select className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] outline-none bg-white">
                      <option>Web Development</option>
                      <option>AI / Machine Learning</option>
                      <option>App Development</option>
                      <option>Blockchain</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#0F172A]">Describe your project</h2>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Short Description (Max 150 chars)</label>
                    <textarea placeholder="A brief one-liner explaining what it does..." rows={2} className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] outline-none resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Overview</label>
                    <textarea placeholder="Explain the architecture, target audience, and goals..." rows={5} className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] outline-none resize-none" />
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#0F172A]">What problem does it solve?</h2>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Problem Statement</label>
                    <textarea placeholder="E.g. Students struggle to pass ATS systems..." rows={4} className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] outline-none resize-none" />
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#0F172A]">Tech Stack</h2>
                  <p className="text-sm text-slate-500 mb-4">What technologies will you use to build this?</p>
                  <div>
                    <input type="text" placeholder="Type a skill and press enter (e.g. React, Python)" className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] outline-none" />
                  </div>
                  {/* Mock Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-600 flex items-center gap-2">React <button className="text-slate-400 hover:text-red-500">×</button></span>
                    <span className="bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-600 flex items-center gap-2">Tailwind <button className="text-slate-400 hover:text-red-500">×</button></span>
                  </div>
                </div>
              )}

              {/* Step 5 */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#0F172A]">Recruit your team</h2>
                  <p className="text-sm text-slate-500 mb-4">Are you looking for teammates? Define open roles.</p>
                  <div className="p-4 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-center gap-4">
                      <input type="text" placeholder="Role Title (e.g. UI Designer)" className="flex-1 p-3 rounded-lg border border-slate-200 outline-none" />
                      <Button variant="outline">Add Role</Button>
                    </div>
                  </div>
                  {/* Mock Roles */}
                  <div className="space-y-2">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                      <span className="font-semibold text-slate-700">Frontend Developer</span>
                      <button className="text-red-500 text-sm font-semibold hover:underline">Remove</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6 */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#0F172A]">Need a Mentor?</h2>
                  <p className="text-sm text-slate-500 mb-4">Would you like to request an industry mentor to review your project code and guide your team?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border-2 border-[#FF5722] bg-[#FF5722]/5 p-6 rounded-xl cursor-pointer relative">
                      <div className="absolute top-4 right-4 text-[#FF5722]"><Check className="w-5 h-5" /></div>
                      <h3 className="font-bold text-[#0F172A] mb-1">Yes, request mentor</h3>
                      <p className="text-sm text-slate-600">Connect with an IIT/Industry mentor for weekly guidance.</p>
                    </div>
                    <div className="border-2 border-slate-200 p-6 rounded-xl cursor-pointer hover:border-slate-300 transition-colors">
                      <h3 className="font-bold text-[#0F172A] mb-1">No, independent</h3>
                      <p className="text-sm text-slate-600">We will build this independently without official mentorship.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 7 */}
              {currentStep === 7 && (
                <div className="space-y-6 text-center py-10 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#0F172A]">Ready to Launch!</h2>
                  <p className="text-slate-500 max-w-md mx-auto">Your project workspace will be generated immediately, and open roles will be posted to the public hub.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
            <button 
              onClick={handleBack} 
              className={`text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors ${currentStep === 1 ? 'invisible' : ''}`}
            >
              Previous Step
            </button>
            <Button 
              variant="primary" 
              onClick={handleNext} 
              className="flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              {currentStep === 7 ? "Publish Project" : "Continue"} <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

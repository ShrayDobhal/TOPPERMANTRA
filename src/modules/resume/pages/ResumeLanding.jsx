import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FileText, UploadCloud, File, AlertCircle } from 'lucide-react';
import useResumeStore from '../../../store/useResumeStore';
import { fadeUp } from '../../../lib/animations';

export default function ResumeLanding() {
  const navigate = useNavigate();
  const { uploadResume, stage, progress } = useResumeStore();

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      await uploadResume(file);
      navigate('/dashboard/resume/dashboard');
    }
  }, [uploadResume, navigate]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-sm font-bold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" />
            AI Resume Intelligence Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] mb-6 tracking-tight font-heading">
            Stop Guessing. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-orange-400">
              Start Landing Interviews.
            </span>
          </h1>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
            Upload your resume and our advanced AI engine will analyze ATS compatibility, job fit, keyword optimization, and provide an actionable roadmap to get you hired faster.
          </p>
        </motion.div>

        {stage === 'idle' ? (
          <motion.div 
            variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-3xl p-12 cursor-pointer transition-all duration-300 relative overflow-hidden bg-white
                ${isDragActive ? 'border-[#FF5722] bg-[#FF5722]/5 scale-105' : 'border-slate-300 hover:border-[#FF5722]/50 hover:bg-slate-50'}
                ${isDragReject ? 'border-red-500 bg-red-50' : ''}
              `}
            >
              <input {...getInputProps()} />
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-300
                  ${isDragActive ? 'bg-[#FF5722] text-white' : 'bg-slate-100 text-slate-500'}
                  ${isDragReject ? 'bg-red-500 text-white' : ''}
                `}>
                  {isDragReject ? <AlertCircle className="w-10 h-10" /> : <UploadCloud className="w-10 h-10" />}
                </div>
                
                <div>
                  <p className="text-xl font-bold text-[#0F172A] mb-2">
                    {isDragActive 
                      ? "Drop it like it's hot!" 
                      : isDragReject 
                        ? "Unsupported file type" 
                        : "Drag & drop your resume here"
                    }
                  </p>
                  <p className="text-slate-500 text-sm">
                    Supports PDF and DOCX (Max 5MB)
                  </p>
                </div>
                
                <button className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:-translate-y-1 shadow-lg">
                  Browse Files
                </button>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-8 text-sm text-slate-500 font-semibold">
              <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#FF5722]" /> ATS Optimized</span>
              <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#FF5722]" /> AI Grammar Check</span>
              <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#FF5722]" /> Salary Insights</span>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-white rounded-3xl p-10 border border-slate-200 shadow-xl"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-24 h-24 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="45" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                  <circle cx="48" cy="48" r="45" fill="none" stroke="#FF5722" strokeWidth="6" 
                    strokeDasharray="283" 
                    strokeDashoffset={283 - (283 * progress) / 100} 
                    className="transition-all duration-500 ease-out" 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-[#0F172A] text-xl">
                  {progress}%
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                {stage === 'uploading' && "Uploading securely to cloud..."}
                {stage === 'parsing' && "Extracting text and structure..."}
                {stage === 'analyzing' && "AI is analyzing your career profile..."}
              </h3>
              <p className="text-slate-500 text-sm">
                This usually takes about 5-10 seconds.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

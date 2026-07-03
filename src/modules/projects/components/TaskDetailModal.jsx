import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Video, Code, Send, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function TaskDetailModal({ task, onClose }) {
  const [aidMode, setAidMode] = useState(null); // 'video' or 'code'
  const [codeSnippet, setCodeSnippet] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!task) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-bold uppercase tracking-wider">
                  {task.id}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                  task.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {task.status}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#0F172A]">{task.title}</h2>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              This subpart requires you to build out the feature as described in the PRD. Ensure all tests pass before submitting for review.
            </p>

            {/* Request Aid Section */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">Stuck? Request Aid</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Don't waste days debugging alone. Request help from the mentor, but you must provide context to remove vagueness.
                  </p>
                </div>
              </div>

              {!aidMode && !submitted && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button 
                    onClick={() => setAidMode('video')}
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <Video size={24} />
                    </div>
                    <span className="font-bold text-sm text-slate-700">Record Screen</span>
                    <span className="text-xs text-slate-400 text-center">Max 2 mins showing the bug</span>
                  </button>

                  <button 
                    onClick={() => setAidMode('code')}
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <Code size={24} />
                    </div>
                    <span className="font-bold text-sm text-slate-700">Paste Code</span>
                    <span className="text-xs text-slate-400 text-center">Share the failing snippet</span>
                  </button>
                </div>
              )}

              {aidMode === 'video' && !submitted && (
                <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center bg-white text-center">
                    <Upload size={32} className="text-slate-400 mb-3" />
                    <p className="text-sm font-bold text-slate-700 mb-1">Click to upload screen recording</p>
                    <p className="text-xs text-slate-500 mb-4">MP4 or WebM (Max 2 mins)</p>
                    <button 
                      onClick={() => setSubmitted(true)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                    >
                      Simulate Upload
                    </button>
                  </div>
                  <button onClick={() => setAidMode(null)} className="text-xs font-bold text-slate-500 mt-3 hover:text-slate-700">← Back</button>
                </div>
              )}

              {aidMode === 'code' && !submitted && (
                <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <textarea 
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    placeholder="Paste your problematic code block here..."
                    className="w-full h-32 bg-slate-900 text-green-400 p-4 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  />
                  <div className="flex items-center justify-between">
                    <button onClick={() => setAidMode(null)} className="text-xs font-bold text-slate-500 hover:text-slate-700">← Back</button>
                    <button 
                      onClick={() => setSubmitted(true)}
                      disabled={!codeSnippet.trim()}
                      className="bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Send size={16} /> Submit Code Context
                    </button>
                  </div>
                </div>
              )}

              {submitted && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-in fade-in duration-300">
                  <CheckCircle2 size={24} className="text-green-600" />
                  <div>
                    <h4 className="font-bold text-green-900">Aid Request Sent</h4>
                    <p className="text-sm text-green-700">The mentor has been pinged with your context.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">
                {task.assignee.charAt(0)}
              </div>
              <span className="text-sm font-semibold text-slate-600">Assigned to you</span>
            </div>
            
            <button className="bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-[0_4px_15px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 flex items-center gap-2">
              Submit for Review <CheckCircle2 size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

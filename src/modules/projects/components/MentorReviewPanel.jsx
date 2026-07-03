import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Code, Play, GitMerge } from 'lucide-react';
import { cn } from '../../../lib/utils';

export default function MentorReviewPanel({ submissions = [], onApprove, onReject }) {
  const [activeTab, setActiveTab] = useState('pending'); // pending | reviewed

  const pending = submissions.filter(s => s.status === 'pending');
  const reviewed = submissions.filter(s => s.status !== 'pending');

  const displayList = activeTab === 'pending' ? pending : reviewed;

  return (
    <div className="bg-white rounded-[28px] border border-[#E9ECEF] shadow-sm p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#0F172A]">Mentor Review Panel</h2>
          <p className="text-sm font-semibold text-[#64748B]">Review and merge student submissions.</p>
        </div>
        <div className="flex gap-2 bg-[#F1F5F9] p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('pending')}
            className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", activeTab === 'pending' ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B] hover:text-[#0F172A]")}
          >
            Pending ({pending.length})
          </button>
          <button 
            onClick={() => setActiveTab('reviewed')}
            className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", activeTab === 'reviewed' ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B] hover:text-[#0F172A]")}
          >
            Reviewed ({reviewed.length})
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {displayList.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-[#E9ECEF] rounded-2xl">
            <p className="text-[#64748B] font-bold">No submissions to review.</p>
          </div>
        ) : (
          displayList.map(sub => (
            <div key={sub.id} className="border border-[#E9ECEF] rounded-2xl p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm">
                      {sub.studentName?.charAt(0) || 'S'}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A]">{sub.studentName}</h4>
                      <p className="text-xs text-[#64748B] font-semibold">{new Date(sub.submittedAt).toLocaleString()}</p>
                    </div>
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-[#F1F5F9] text-[#64748B] px-2 py-1 rounded-md">
                      {sub.subpartTitle}
                    </span>
                  </div>
                  <p className="text-sm text-[#475569] font-medium mt-3 mb-4">"{sub.notes}"</p>
                  
                  <div className="flex gap-3">
                    {sub.codeUrl && (
                      <a href={sub.codeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-[#3B82F6] bg-[#EFF6FF] px-3 py-1.5 rounded-lg hover:bg-[#DBEAFE] transition-colors">
                        <Code size={14} /> View Code
                      </a>
                    )}
                    {sub.demoUrl && (
                      <a href={sub.demoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-3 py-1.5 rounded-lg hover:bg-[#D1FAE5] transition-colors">
                        <Play size={14} /> Play Demo
                      </a>
                    )}
                  </div>
                </div>

                {activeTab === 'pending' ? (
                  <div className="flex md:flex-col gap-2 shrink-0">
                    <button 
                      onClick={() => onApprove?.(sub.id)}
                      className="flex items-center justify-center gap-1.5 bg-[#22C55E] hover:bg-[#16A34A] text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm"
                    >
                      <GitMerge size={16} /> Approve & Merge
                    </button>
                    <button 
                      onClick={() => onReject?.(sub.id)}
                      className="flex items-center justify-center gap-1.5 bg-white border border-[#E9ECEF] hover:bg-[#FEF2F2] hover:text-[#EF4444] hover:border-[#FECACA] text-[#64748B] px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                      <XCircle size={16} /> Request Changes
                    </button>
                  </div>
                ) : (
                  <div className="shrink-0 flex items-center h-full">
                    <span className={cn(
                      "flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-xl",
                      sub.status === 'approved' ? "text-[#22C55E] bg-[#22C55E]/10" : "text-[#EF4444] bg-[#EF4444]/10"
                    )}>
                      {sub.status === 'approved' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      {sub.status === 'approved' ? 'Merged' : 'Changes Requested'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

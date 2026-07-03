import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Video, Code, AlertCircle, Upload, Send } from 'lucide-react';
import { cn } from '../../../lib/utils';

export default function RequestAidModal({ isOpen, onClose, subpart, onSubmit }) {
  const [aidType, setAidType] = useState(null); // 'video' | 'code'
  const [description, setDescription] = useState('');
  const [codeContent, setCodeContent] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const canSubmit = aidType && description.trim().length > 10 && (
    aidType === 'video' ? videoFile !== null : codeContent.trim().length > 10
  );

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit?.({
      type: aidType,
      description,
      codeContent: aidType === 'code' ? codeContent : null,
      videoUrl: aidType === 'video' ? URL.createObjectURL(videoFile) : null,
      userName: 'Shray D.',
      userId: 'stu-001',
    });
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-[28px] w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#E9ECEF]">
            <div>
              <h2 className="text-xl font-bold font-heading text-[#0F172A]">Request Aid</h2>
              <p className="text-xs text-[#64748B] font-medium mt-1">
                for "{subpart?.title}"
              </p>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center hover:bg-[#E2E8F0] transition-colors">
              <X size={18} className="text-[#64748B]" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Rule Explanation */}
            <div className="bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-2xl p-4 flex gap-3">
              <AlertCircle size={18} className="text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-[#92400E]">You must provide evidence</p>
                <p className="text-xs text-[#A16207] font-medium mt-1">
                  Upload a 2-minute screen recording showing where you are stuck, OR paste the specific code block. This removes vagueness.
                </p>
              </div>
            </div>

            {/* Type Selection — Forced Choice */}
            <div>
              <p className="text-sm font-bold text-[#0F172A] mb-3">Choose one:</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setAidType('video')}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-center transition-all",
                    aidType === 'video'
                      ? "border-[#FF5722] bg-[#FF5722]/5 shadow-sm"
                      : "border-[#E9ECEF] hover:border-[#CBD5E1]"
                  )}
                >
                  <Video size={28} className={cn("mx-auto mb-2", aidType === 'video' ? "text-[#FF5722]" : "text-[#94A3B8]")} />
                  <p className="text-sm font-bold text-[#0F172A]">Upload Video</p>
                  <p className="text-[10px] text-[#64748B] font-medium mt-1">2-min screen recording</p>
                </button>
                <button
                  onClick={() => setAidType('code')}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-center transition-all",
                    aidType === 'code'
                      ? "border-[#FF5722] bg-[#FF5722]/5 shadow-sm"
                      : "border-[#E9ECEF] hover:border-[#CBD5E1]"
                  )}
                >
                  <Code size={28} className={cn("mx-auto mb-2", aidType === 'code' ? "text-[#FF5722]" : "text-[#94A3B8]")} />
                  <p className="text-sm font-bold text-[#0F172A]">Paste Code</p>
                  <p className="text-[10px] text-[#64748B] font-medium mt-1">Specific code block</p>
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-bold text-[#0F172A] mb-2 block">Describe the problem</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="What exactly are you stuck on? Be specific..."
                className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-2xl p-4 text-sm focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-all resize-none h-24"
              />
            </div>

            {/* Dynamic Content Area */}
            {aidType === 'video' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <label className="text-sm font-bold text-[#0F172A] mb-2 block">Upload Screen Recording</label>
                <div className="border-2 border-dashed border-[#E9ECEF] rounded-2xl p-8 text-center hover:border-[#FF5722]/30 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('video-upload')?.click()}
                >
                  <Upload size={32} className="mx-auto mb-3 text-[#94A3B8]" />
                  <p className="text-sm font-bold text-[#64748B]">
                    {videoFile ? videoFile.name : 'Click to upload video (max 2 min)'}
                  </p>
                  <p className="text-[10px] text-[#94A3B8] mt-1">MP4, WebM, or MOV</p>
                  <input id="video-upload" type="file" accept="video/*" className="hidden" onChange={e => setVideoFile(e.target.files?.[0])} />
                </div>
              </motion.div>
            )}

            {aidType === 'code' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <label className="text-sm font-bold text-[#0F172A] mb-2 block">Paste Your Code</label>
                <textarea
                  value={codeContent}
                  onChange={e => setCodeContent(e.target.value)}
                  placeholder="Paste the exact code block you're struggling with..."
                  className="w-full bg-[#0F172A] text-[#E2E8F0] border border-[#334155] rounded-2xl p-4 text-sm font-mono focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-all resize-none h-40"
                />
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#E9ECEF] flex items-center justify-between">
            <button onClick={onClose} className="text-sm font-bold text-[#64748B] hover:text-[#0F172A] transition-colors">Cancel</button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all",
                canSubmit
                  ? "bg-[#FF5722] text-white hover:bg-[#E64A19] shadow-[0_4px_14px_0_rgba(255,87,34,0.39)]"
                  : "bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed"
              )}
            >
              <Send size={16} />
              Submit Aid Request
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Link as LinkIcon, Send, FileText, ExternalLink } from 'lucide-react';
import { cn } from '../../../lib/utils';

export default function SubmitReviewModal({ isOpen, onClose, subpart, onSubmit }) {
  const [codeUrl, setCodeUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [notes, setNotes] = useState('');

  const canSubmit = codeUrl.trim().length > 5;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit?.({ subpartId: subpart?.id, codeUrl, demoUrl, notes, userId: 'stu-001', userName: 'Shray D.' });
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
          className="bg-white rounded-[28px] w-full max-w-lg shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#E9ECEF]">
            <div>
              <h2 className="text-xl font-bold font-heading text-[#0F172A]">Submit for Review</h2>
              <p className="text-xs text-[#64748B] font-medium mt-1">"{subpart?.title}"</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center hover:bg-[#E2E8F0] transition-colors">
              <X size={18} className="text-[#64748B]" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Code URL (Required) */}
            <div>
              <label className="text-sm font-bold text-[#0F172A] mb-2 block">
                Code Repository <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="url"
                  value={codeUrl}
                  onChange={e => setCodeUrl(e.target.value)}
                  placeholder="https://github.com/username/repo"
                  className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-all"
                />
              </div>
            </div>

            {/* Demo URL (Optional) */}
            <div>
              <label className="text-sm font-bold text-[#0F172A] mb-2 block">
                Live Demo <span className="text-xs font-normal text-[#94A3B8]">(optional)</span>
              </label>
              <div className="relative">
                <ExternalLink size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="url"
                  value={demoUrl}
                  onChange={e => setDemoUrl(e.target.value)}
                  placeholder="https://your-demo.vercel.app"
                  className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-all"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-bold text-[#0F172A] mb-2 block">Notes for Mentor</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Anything the mentor should know while reviewing..."
                className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-2xl p-4 text-sm focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-all resize-none h-24"
              />
            </div>

            {/* What happens next */}
            <div className="bg-[#F0FDF4] border border-[#22C55E]/20 rounded-2xl p-4">
              <p className="text-xs font-bold text-[#166534] mb-1">What happens next?</p>
              <p className="text-xs text-[#15803D] font-medium">
                Your mentor will receive a notification and review your submission. If approved, it gets merged and your Contribution Score increases.
              </p>
            </div>
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
                  ? "bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-[0_4px_14px_0_rgba(34,197,94,0.3)]"
                  : "bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed"
              )}
            >
              <Send size={16} />
              Submit for Review
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  GitMerge, XCircle, Code, Play, RefreshCw, CheckCircle2,
  AlertTriangle, Clock, Users, Zap, Star, MessageSquare
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { supabase } from '../../../lib/supabase';

// ---- Feedback Modal ----
function FeedbackModal({ isOpen, title, onConfirm, onClose, actionLabel, actionColor, placeholder }) {
  const [feedback, setFeedback] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-[#0F172A] mb-2">{title}</h3>
        <p className="text-sm text-[#64748B] mb-5">
          This action will update the student's task status and fire XP awards.
        </p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={placeholder || 'Add your feedback (optional)...'}
          rows={4}
          className="w-full border border-[#E2E8F0] rounded-xl p-4 text-sm text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 resize-none mb-5"
        />
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] font-bold text-sm hover:bg-[#F8FAFC] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(feedback); setFeedback(''); }}
            className={cn("flex-1 px-4 py-2.5 rounded-xl text-white font-bold text-sm transition-all shadow-sm", actionColor)}
          >
            {actionLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ---- Submission Card ----
function SubmissionCard({ sub, onApprove, onReject, isReviewed }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "border rounded-2xl p-6 transition-all",
        isReviewed
          ? "border-[#E9ECEF] bg-white opacity-80"
          : "border-[#E9ECEF] bg-white hover:border-[#3B82F6]/30 hover:shadow-md"
      )}
    >
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
        {/* Left: Student Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-base shrink-0">
              {sub.student_name?.charAt(0) || 'S'}
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-[#0F172A] truncate">{sub.student_name || 'Student'}</h4>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EFF6FF] text-[#3B82F6] px-2 py-0.5 rounded-md">
                  {sub.task_title}
                </span>
                <span className="text-[10px] font-semibold text-[#94A3B8]">
                  {sub.project_title}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#64748B] font-medium mb-4">
            <Clock size={12} />
            Submitted {new Date(sub.submitted_at).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'short', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-2">
            {sub.code_url && (
              <a
                href={sub.code_url} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-[#3B82F6] bg-[#EFF6FF] px-3 py-1.5 rounded-lg hover:bg-[#DBEAFE] transition-colors"
              >
                <Code size={13} /> View Code
              </a>
            )}
            {sub.demo_url && (
              <a
                href={sub.demo_url} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-3 py-1.5 rounded-lg hover:bg-[#D1FAE5] transition-colors"
              >
                <Play size={13} /> Live Demo
              </a>
            )}
          </div>

          {/* Mentor feedback (if reviewed) */}
          {isReviewed && sub.mentor_feedback && (
            <div className="mt-4 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
              <p className="text-xs font-bold text-[#64748B] mb-1 flex items-center gap-1">
                <MessageSquare size={11} /> Your Feedback
              </p>
              <p className="text-sm text-[#334155]">{sub.mentor_feedback}</p>
            </div>
          )}
        </div>

        {/* Right: Actions or Status */}
        {isReviewed ? (
          <div className="shrink-0 flex items-start pt-1">
            <span className={cn(
              "flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl",
              sub.status === 'approved'
                ? "text-[#22C55E] bg-[#22C55E]/10"
                : "text-[#F59E0B] bg-[#F59E0B]/10"
            )}>
              {sub.status === 'approved'
                ? <><CheckCircle2 size={15} /> Merged</>
                : <><AlertTriangle size={15} /> Changes Requested</>
              }
            </span>
          </div>
        ) : (
          <div className="flex lg:flex-col gap-2 shrink-0">
            <button
              onClick={() => onApprove(sub.submission_id)}
              className="flex items-center justify-center gap-1.5 bg-[#22C55E] hover:bg-[#16A34A] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm"
            >
              <GitMerge size={16} /> Approve & Merge
            </button>
            <button
              onClick={() => onReject(sub.submission_id)}
              className="flex items-center justify-center gap-1.5 bg-white border border-[#E9ECEF] hover:bg-[#FEF2F2] hover:text-[#EF4444] hover:border-[#FECACA] text-[#64748B] px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
            >
              <XCircle size={16} /> Request Changes
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ---- Empty State ----
function EmptyState({ type }) {
  return (
    <div className="text-center py-16 border-2 border-dashed border-[#E9ECEF] rounded-2xl">
      <div className="w-16 h-16 bg-[#F1F5F9] rounded-2xl flex items-center justify-center mx-auto mb-4">
        {type === 'pending'
          ? <CheckCircle2 size={28} className="text-[#22C55E]" />
          : <Star size={28} className="text-[#94A3B8]" />
        }
      </div>
      <p className="text-base font-bold text-[#0F172A] mb-1">
        {type === 'pending' ? 'All caught up! 🎉' : 'No reviewed submissions yet'}
      </p>
      <p className="text-sm text-[#64748B]">
        {type === 'pending'
          ? 'No pending submissions right now. Check back later.'
          : 'Your reviewed submissions will appear here.'
        }
      </p>
    </div>
  );
}

// ---- Main Component ----
export default function MentorReviewDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [refreshing, setRefreshing] = useState(false);

  // Feedback modal state
  const [approveModal, setApproveModal] = useState({ open: false, submissionId: null });
  const [rejectModal,  setRejectModal]  = useState({ open: false, submissionId: null });

  const fetchSubmissions = useCallback(async () => {
    try {
      const { data, error } = await supabase.rpc('fetch_pending_submissions');
      if (error) throw error;
      setSubmissions(data || []);
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
      toast.error('Could not load submissions.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSubmissions();
  };

  const handleApprove = async (submissionId, feedback) => {
    setApproveModal({ open: false, submissionId: null });
    const toastId = toast.loading('Merging submission...');
    try {
      const { data, error } = await supabase.rpc('approve_task', {
        p_submission_id: submissionId,
        p_feedback: feedback,
      });
      if (error) throw error;
      if (data && !data.success) throw new Error(data.error);

      toast.success('✅ Submission merged! Student awarded XP.', { id: toastId });
      // Optimistic UI update
      setSubmissions(prev =>
        prev.map(s => s.submission_id === submissionId
          ? { ...s, status: 'approved', mentor_feedback: feedback }
          : s
        )
      );
    } catch (err) {
      console.error('Approve error:', err);
      toast.error(err.message || 'Failed to approve submission.', { id: toastId });
    }
  };

  const handleReject = async (submissionId, feedback) => {
    setRejectModal({ open: false, submissionId: null });
    const toastId = toast.loading('Sending feedback...');
    try {
      const { data, error } = await supabase.rpc('reject_task', {
        p_submission_id: submissionId,
        p_feedback: feedback,
      });
      if (error) throw error;
      if (data && !data.success) throw new Error(data.error);

      toast('📝 Changes requested. Student will be notified.', { icon: '📝', id: toastId });
      setSubmissions(prev =>
        prev.map(s => s.submission_id === submissionId
          ? { ...s, status: 'changes_requested', mentor_feedback: feedback }
          : s
        )
      );
    } catch (err) {
      console.error('Reject error:', err);
      toast.error(err.message || 'Failed to request changes.', { id: toastId });
    }
  };

  const pending  = submissions.filter(s => s.status === 'pending');
  const reviewed = submissions.filter(s => s.status !== 'pending');
  const displayList = activeTab === 'pending' ? pending : reviewed;

  return (
    <div className="flex-1 overflow-y-auto h-full bg-[#F8FAFC] p-6 lg:p-10" data-lenis-prevent="true">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold font-heading text-[#0F172A] tracking-tight">
              Review Dashboard
            </h1>
            <p className="text-sm text-[#64748B] font-medium mt-1">
              Review student submissions to award XP and unlock their badges.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-sm font-bold text-[#64748B] hover:bg-[#F1F5F9] transition-all disabled:opacity-50"
          >
            <RefreshCw size={15} className={cn(refreshing && 'animate-spin')} />
            Refresh
          </button>
        </div>

        {/* Stats Row */}
        {!loading && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Pending Review', value: pending.length, icon: <Clock size={18} />, color: 'text-[#F59E0B] bg-[#FEF3C7]' },
              { label: 'Merged',  value: reviewed.filter(s => s.status === 'approved').length, icon: <GitMerge size={18} />, color: 'text-[#22C55E] bg-[#DCFCE7]' },
              { label: 'Changes Requested', value: reviewed.filter(s => s.status !== 'approved').length, icon: <AlertTriangle size={18} />, color: 'text-[#EF4444] bg-[#FEE2E2]' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-[#E9ECEF] shadow-sm flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.color)}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-extrabold font-heading text-[#0F172A]">{stat.value}</p>
                  <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* XP Info Banner */}
        <div className="mb-6 bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4] border border-[#BFDBFE] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
            <Zap size={16} className="text-[#3B82F6]" />
          </div>
          <p className="text-sm font-semibold text-[#1E40AF]">
            Approving a submission awards the student{' '}
            <span className="font-extrabold">+100 XP bonus</span> on top of the task's base XP.
            Rejecting sets the task back to "In Progress" so they can resubmit.
          </p>
        </div>

        {/* Main Panel */}
        <div className="bg-white rounded-[28px] border border-[#E9ECEF] shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center justify-between px-6 pt-5 pb-0 border-b border-[#E9ECEF]">
            <div className="flex gap-1">
              {['pending', 'reviewed'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-3 text-sm font-bold border-b-2 transition-all capitalize relative top-[1px]",
                    activeTab === tab
                      ? "border-[#FF5722] text-[#FF5722]"
                      : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                  )}
                >
                  {tab} ({tab === 'pending' ? pending.length : reviewed.length})
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="h-32 bg-[#F1F5F9] rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {displayList.length === 0 ? (
                  <EmptyState type={activeTab} />
                ) : (
                  <div className="space-y-4">
                    {displayList.map(sub => (
                      <SubmissionCard
                        key={sub.submission_id}
                        sub={sub}
                        isReviewed={activeTab === 'reviewed'}
                        onApprove={(id) => setApproveModal({ open: true, submissionId: id })}
                        onReject={(id) => setRejectModal({ open: true, submissionId: id })}
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      <AnimatePresence>
        <FeedbackModal
          isOpen={approveModal.open}
          title="Approve & Merge Submission"
          actionLabel="Confirm Merge ✓"
          actionColor="bg-[#22C55E] hover:bg-[#16A34A]"
          placeholder="Great work! Your code is clean and handles edge cases well..."
          onClose={() => setApproveModal({ open: false, submissionId: null })}
          onConfirm={(feedback) => handleApprove(approveModal.submissionId, feedback)}
        />
      </AnimatePresence>

      {/* Reject Modal */}
      <AnimatePresence>
        <FeedbackModal
          isOpen={rejectModal.open}
          title="Request Changes"
          actionLabel="Send Feedback"
          actionColor="bg-[#EF4444] hover:bg-[#DC2626]"
          placeholder="Please add error handling for the case where the API returns 404..."
          onClose={() => setRejectModal({ open: false, submissionId: null })}
          onConfirm={(feedback) => handleReject(rejectModal.submissionId, feedback)}
        />
      </AnimatePresence>
    </div>
  );
}

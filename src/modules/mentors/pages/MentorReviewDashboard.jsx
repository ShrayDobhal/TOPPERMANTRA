import React from 'react';
import MentorReviewPanel from '../../projects/components/MentorReviewPanel';
import toast from 'react-hot-toast';

export default function MentorReviewDashboard() {
  // In a real app, fetch these from Supabase where status = 'pending'
  const mockSubmissions = [
    {
      id: 'sub-1',
      studentName: 'Aarav K.',
      subpartTitle: 'Login API',
      submittedAt: new Date().toISOString(),
      notes: 'I used JWT for stateless authentication as requested. Please check the middleware.',
      codeUrl: 'https://github.com/aarav/login-api',
      demoUrl: null,
      status: 'pending'
    }
  ];

  const handleApprove = (id) => {
    toast.success('Submission Merged! Student awarded XP.');
  };

  const handleReject = (id) => {
    console.log('Request Changes:', id);
    toast('Changes requested. Notification sent to student.', { icon: '📝' });
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar h-full bg-[#F8FAFC] p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        <MentorReviewPanel 
          submissions={mockSubmissions}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
}

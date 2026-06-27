import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="We'll send you a link to reset your password."
    >
      {!isSent ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-bold text-[#0F172A]">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com" 
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3.5 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#0F172A]/20 transition-all hover:-translate-y-0.5"
          >
            Send Reset Link
          </button>

          <div className="text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A] transition-colors font-semibold">
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </form>
      ) : (
        <div className="text-center space-y-6 py-4">
          <div className="w-16 h-16 bg-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Check your email</h3>
            <p className="text-sm text-[#64748B]">We sent a reset link to <span className="font-semibold text-[#0F172A]">{email}</span></p>
          </div>
          
          <div className="pt-4">
            <Link to="/login" className="text-sm font-bold text-[#FF5722] hover:text-[#E64A19] transition-colors">
              Return to Login
            </Link>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}

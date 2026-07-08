import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/auth/AuthLayout';
import { Mail, ArrowRight } from 'lucide-react';
import api from '../../lib/api';

export default function VerifyEmail() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { isMockMode } = useAuth();
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError('');

    try {
      if (isMockMode) {
        await new Promise(resolve => setTimeout(resolve, 800));
        navigate('/welcome');
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        email: localStorage.getItem('signup_email'), // In a real app we'd pass this via state
        token: code,
        type: 'signup'
      });

      if (error) {
        setError(error.message);
      } else {
        navigate('/welcome');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during verification');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      if (isMockMode) {
        toast.success("Verification email resent! (Mock)");
        return;
      }
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: localStorage.getItem('signup_email')
      });
      
      if (error) throw error;
      toast.success("Verification email resent!");
    } catch (err) {
      console.error(err);
      setError("Failed to resend email.");
    }
  };

  return (
    <AuthLayout 
      title="Verify Your Email" 
      subtitle="We've sent a verification code to your email address."
    >
      <div className="text-center space-y-8 py-4">
        <div className="w-20 h-20 bg-[#FF5722]/10 rounded-full flex items-center justify-center mx-auto relative">
          <div className="absolute inset-0 bg-[#FF5722]/20 rounded-full animate-ping opacity-75"></div>
          <Mail size={32} className="text-[#FF5722] relative z-10" />
        </div>
        
        <div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <p className="text-sm text-[#64748B] max-w-xs mx-auto mb-6">
            Please check your inbox and enter the verification code to complete your account setup.
          </p>
          
          <form onSubmit={handleVerify} className="space-y-4">
            <input 
              type="text" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code" 
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl text-sm text-center tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all"
              required
            />

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-[#FF5722] hover:bg-[#E64A19] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#FF5722]/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 mb-4 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? 'Verifying...' : 'Verify Email'} <ArrowRight size={16} />
            </button>
          </form>
          
          <button onClick={handleResend} className="text-sm font-bold text-[#64748B] hover:text-[#0F172A] transition-colors">
            Resend Email
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}

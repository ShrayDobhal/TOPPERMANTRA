import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import AuthLayout from '../../components/auth/AuthLayout';
import CaptchaWidget from '../../components/auth/CaptchaWidget';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const { isMockMode, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/welcome');
    }
  }, [user, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (isMockMode) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        navigate('/welcome');
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (error) {
        setError(error.message);
      } else {
        // Since Email Confirmations are off, we can bypass the verify-email page
        navigate('/welcome');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      if (isMockMode) {
        await new Promise(resolve => setTimeout(resolve, 800));
        navigate('/welcome');
        return;
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/welcome`
        }
      });
      
      if (error) throw error;
    } catch (err) {
      console.error(err);
      setError('An error occurred during Google sign up');
    }
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join 10,000+ students building their future."
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}
      <form onSubmit={handleSignup} className="space-y-4">
        
        <div className="space-y-1">
          <label className="text-sm font-bold text-[#0F172A]">Full Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe" 
            className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-[#0F172A]">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com" 
            className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-[#0F172A]">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-[#0F172A]">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all"
              required
            />
          </div>
        </div>

        <div className="flex items-start gap-2 pt-2">
          <input type="checkbox" id="terms" required className="mt-1 rounded text-[#FF5722] focus:ring-[#FF5722]/20 border-[#CBD5E1]" />
          <label htmlFor="terms" className="text-xs text-[#64748B] font-medium leading-relaxed">
            I agree to the <a href="#" className="text-[#0F172A] hover:underline">Terms of Service</a> and <a href="#" className="text-[#0F172A] hover:underline">Privacy Policy</a>
          </label>
        </div>

        <CaptchaWidget onVerify={setCaptchaVerified} />

        <button 
          type="submit" 
          disabled={isLoading || !captchaVerified}
          className="w-full py-3.5 px-4 bg-[#FF5722] hover:bg-[#E64A19] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#FF5722]/20 transition-all hover:-translate-y-0.5 mt-2 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        <button type="button" onClick={handleGoogleSignup} disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[#E9ECEF] rounded-xl text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors shadow-sm disabled:opacity-70">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm text-[#64748B] mt-6">
          Already have an account? <Link to="/login" className="text-[#0F172A] font-bold hover:text-[#FF5722] transition-colors">Login</Link>
        </p>

      </form>
    </AuthLayout>
  );
}

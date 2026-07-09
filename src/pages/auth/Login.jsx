import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import AuthLayout from '../../components/auth/AuthLayout';
import CaptchaWidget from '../../components/auth/CaptchaWidget';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  
  const { isMockMode, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isMockMode) {
        // Simulate network delay for mock mode
        await new Promise(resolve => setTimeout(resolve, 800));
        navigate('/dashboard');
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      if (isMockMode) {
        await new Promise(resolve => setTimeout(resolve, 800));
        navigate('/dashboard');
        return;
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) throw error;
    } catch (err) {
      console.error(err);
      setError('An error occurred during Google sign in');
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to continue your growth journey."
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin} className="space-y-5">
        
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

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-[#0F172A]">Password</label>
            <Link to="/forgot-password" className="text-xs font-semibold text-[#FF5722] hover:text-[#E64A19] transition-colors">
              Forgot Password?
            </Link>
          </div>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all"
            required
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input type="checkbox" id="remember" className="rounded text-[#FF5722] focus:ring-[#FF5722]/20 border-[#CBD5E1]" />
          <label htmlFor="remember" className="text-sm text-[#64748B] font-medium">Remember me for 30 days</label>
        </div>

        <CaptchaWidget onVerify={setCaptchaVerified} />

        <button 
          type="submit" 
          disabled={isLoading || !captchaVerified}
          className="w-full py-3.5 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#0F172A]/20 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-[#E9ECEF]"></div>
          <span className="flex-shrink-0 mx-4 text-[#94A3B8] text-xs font-semibold uppercase tracking-wider">Or continue with</span>
          <div className="flex-grow border-t border-[#E9ECEF]"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={handleGoogleLogin} disabled={isLoading} className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-[#E9ECEF] rounded-xl text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors shadow-sm disabled:opacity-70">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-[#E9ECEF] rounded-xl text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors shadow-sm relative group">
            <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
            <span className="absolute -top-2.5 -right-2 bg-[#FF5722] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-sm group-hover:scale-110 transition-transform">Soon</span>
          </button>
        </div>

        <p className="text-center text-sm text-[#64748B] mt-6">
          Don't have an account? <Link to="/signup" className="text-[#0F172A] font-bold hover:text-[#FF5722] transition-colors">Create Account</Link>
        </p>

      </form>
    </AuthLayout>
  );
}

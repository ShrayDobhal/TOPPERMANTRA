import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock reset - redirect to login
    navigate('/login');
  };

  return (
    <AuthLayout 
      title="Set New Password" 
      subtitle="Your new password must be different from previous used passwords."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-bold text-[#0F172A]">New Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-[#0F172A]">Confirm New Password</label>
          <input 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••" 
            className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all"
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-3.5 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#0F172A]/20 transition-all hover:-translate-y-0.5 mt-2"
        >
          Reset Password
        </button>
      </form>
    </AuthLayout>
  );
}

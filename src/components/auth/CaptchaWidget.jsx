import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function CaptchaWidget({ onVerify }) {
  const [status, setStatus] = useState('idle'); // 'idle', 'verifying', 'verified'

  const handleClick = () => {
    if (status !== 'idle') return;
    
    setStatus('verifying');
    // Simulate smart detection delay
    setTimeout(() => {
      setStatus('verified');
      if (onVerify) {
        onVerify(true);
      }
    }, 1200);
  };

  return (
    <div 
      onClick={handleClick}
      className={cn(
        "flex items-center justify-between p-4 rounded-xl border transition-all duration-300 select-none bg-white",
        status === 'verified' 
          ? "border-[#22C55E]/30 bg-[#22C55E]/5 shadow-sm" 
          : status === 'verifying'
          ? "border-slate-200 cursor-wait bg-slate-50/50"
          : "border-slate-200 hover:border-slate-300 cursor-pointer shadow-sm"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center shrink-0">
          <input 
            type="checkbox" 
            checked={status === 'verified'}
            readOnly
            className={cn(
              "w-5 h-5 rounded border-2 transition-all duration-300 pointer-events-none appearance-none flex items-center justify-center",
              status === 'verified'
                ? "bg-[#22C55E] border-[#22C55E] text-white"
                : status === 'verifying'
                ? "border-slate-300 bg-white"
                : "border-slate-300 bg-white group-hover:border-slate-400"
            )}
          />
          {status === 'verifying' && (
            <div className="absolute w-5 h-5 border-2 border-[#FF5722] border-t-transparent rounded-full animate-spin"></div>
          )}
          {status === 'verified' && (
            <svg className="absolute w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
        </div>
        <div>
          <p className="text-sm font-bold text-[#0F172A]">
            {status === 'verified' ? 'Verification Successful' : 'Verify you are human'}
          </p>
          <p className="text-[10px] font-semibold text-[#64748B] mt-0.5">
            Cloudflare Turnstile Enterprise
          </p>
        </div>
      </div>
      
      <div className="flex flex-col items-end shrink-0 text-right opacity-80">
        <ShieldCheck className={cn(
          "w-6 h-6 transition-colors duration-300",
          status === 'verified' ? "text-[#22C55E]" : "text-[#94A3B8]"
        )} />
        <span className="text-[8px] font-bold text-[#94A3B8] mt-1 tracking-wider uppercase">Privacy • Terms</span>
      </div>
    </div>
  );
}

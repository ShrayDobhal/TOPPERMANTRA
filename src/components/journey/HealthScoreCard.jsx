import { motion } from 'framer-motion';
import { Activity, ShieldCheck } from 'lucide-react';

export default function HealthScoreCard() {
  const score = 87;
  const breakdown = [
    { label: 'Skills', value: 92, color: 'bg-blue-500' },
    { label: 'Projects', value: 85, color: 'bg-purple-500' },
    { label: 'Networking', value: 65, color: 'bg-amber-500' },
    { label: 'Resume', value: 100, color: 'bg-emerald-500' },
    { label: 'Interview', value: 40, color: 'bg-red-500' },
    { label: 'Portfolio', value: 90, color: 'bg-pink-500' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-heading text-[#0F172A] flex items-center gap-2">
          <Activity size={24} className="text-[#FF5722]" />
          Career Health
        </h2>
        <div className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full flex items-center gap-1 border border-green-100">
          <ShieldCheck size={14} /> Excellent
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Circular Progress SVG Background */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="45" 
              fill="transparent" 
              stroke="#F1F5F9" 
              strokeWidth="10"
            />
            <motion.circle 
              cx="50" cy="50" r="45" 
              fill="transparent" 
              stroke="#FF5722" 
              strokeWidth="10" 
              strokeDasharray={283} // 2 * pi * r
              strokeDashoffset={283}
              strokeLinecap="round"
              animate={{ strokeDashoffset: 283 - (283 * score) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-[#0F172A]">{score}%</span>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Overall</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {breakdown.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-[#0F172A]">{item.label}</span>
              <span className="text-[#64748B]">{item.value}%</span>
            </div>
            <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                viewport={{ once: true }}
                className={`h-full rounded-full ${item.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

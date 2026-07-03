import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, Bookmark, Share2, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import TiltCard from '../ui/TiltCard';

export default function OpportunityCard({ opportunity, onClick }) {
  const isClosingSoon = opportunity.daysLeft <= 7 && opportunity.daysLeft > 0;
  const isClosed = opportunity.daysLeft === 0;

  return (
    <TiltCard className="h-full">
      <div 
        onClick={() => onClick && onClick(opportunity.id)}
        className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:border-[#FF5722]/30 transition-all duration-300 flex flex-col h-full group cursor-pointer relative overflow-hidden"
      >
        {/* AI Recommendation Glow (if score > 90) */}
        {opportunity.matchScore > 90 && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full -z-10 group-hover:bg-indigo-500/10 transition-colors"></div>
        )}

        {/* Header: Logo & Badges */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-14 h-14 rounded-xl bg-white border border-slate-100 shadow-sm p-2 flex items-center justify-center shrink-0 overflow-hidden">
            <img src={opportunity.logo} alt={opportunity.company} className="max-w-full max-h-full object-contain" />
          </div>
          
          <div className="flex flex-col items-end gap-2">
            {opportunity.matchScore > 90 && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md tracking-wider">
                <Sparkles className="w-3 h-3" /> {opportunity.matchScore}% MATCH
              </span>
            )}
            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-[10px] font-bold tracking-wider">
              {opportunity.type}
            </span>
          </div>
        </div>

        {/* Title & Company */}
        <div className="mb-4">
          <h3 className="font-bold text-lg text-[#0F172A] leading-tight mb-1 group-hover:text-[#FF5722] transition-colors">
            {opportunity.title}
          </h3>
          <p className="text-sm font-semibold text-slate-500">
            {opportunity.company}
          </p>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-slate-500 mb-5 pb-5 border-b border-slate-100 flex-grow">
          <div className="flex items-center gap-1.5 col-span-2">
            <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
            <span className="truncate">{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 shrink-0 text-slate-400" />
            <span className="truncate">{opportunity.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
             <span className="font-semibold text-[#0F172A]">{opportunity.stipend}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {opportunity.skills.slice(0, 3).map((skill, i) => (
            <span key={i} className="bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-1 rounded">
              {skill}
            </span>
          ))}
        </div>

        {/* Footer: Status & Actions */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex flex-col">
            {isClosed ? (
              <span className="text-xs font-bold text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Applications Closed
              </span>
            ) : isClosingSoon ? (
              <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Ends in {opportunity.daysLeft} days
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {opportunity.applicants.toLocaleString()} applied
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#FF5722] hover:bg-[#FF5722]/10 transition-colors"
              onClick={(e) => { e.stopPropagation(); /* handle save */ }}
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`px-4 h-8 text-xs group-hover:bg-[#FF5722] group-hover:text-white group-hover:border-[#FF5722] ${isClosed ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isClosed}
            >
              {isClosed ? 'Closed' : 'Apply'}
            </Button>
          </div>
        </div>

      </div>
    </TiltCard>
  );
}

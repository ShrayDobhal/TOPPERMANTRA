import React from "react";
import { Star, MapPin, Briefcase, Award, Clock } from "lucide-react";
import { Button } from "../ui/Button";
import TiltCard from "../ui/TiltCard";

export default function MentorCard({ mentor, onViewProfile }) {
  return (
    <TiltCard className="h-full">
      <div className="bg-white rounded-2xl border border-[#E9ECEF] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full group">
        
        {/* Banner & Avatar */}
        <div className="relative h-24 bg-gradient-to-r from-slate-100 to-slate-50">
          <div className="absolute -bottom-10 left-6">
            <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
              <img 
                src={mentor.avatarUrl} 
                alt={`${mentor.firstName} ${mentor.lastName}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
          
          {/* Availability Badge */}
          {mentor.isAvailable ? (
            <div className="absolute top-4 right-4 bg-green-500/10 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full border border-green-500/20 flex items-center gap-1.5 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              Available
            </div>
          ) : (
            <div className="absolute top-4 right-4 bg-slate-500/10 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-full border border-slate-500/20 backdrop-blur-sm">
              Booked
            </div>
          )}
        </div>

        <div className="pt-12 px-6 pb-6 flex flex-col flex-grow">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">
                {mentor.firstName} {mentor.lastName}
              </h3>
              <p className="text-sm font-semibold text-[#FF5722]">
                {mentor.role} @ {mentor.company}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-amber-700 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              {mentor.rating}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2 mt-2 mb-4 text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              {mentor.college} • {mentor.degree}
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-400" />
              {mentor.yearsOfExperience} YOE • {mentor.experienceType}
            </div>
            {mentor.achievements.length > 0 && (
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{mentor.achievements[0]}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {mentor.skills.slice(0, 3).map((skill, i) => (
              <span key={i} className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-1 rounded">
                {skill}
              </span>
            ))}
            {mentor.skills.length > 3 && (
              <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-1 rounded">
                +{mentor.skills.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> {mentor.totalSessions} Sessions
              </span>
              <span className="text-sm font-bold text-[#0F172A]">
                {mentor.price === 0 ? "Free" : `₹${mentor.price}/hr`}
              </span>
            </div>
            <Button 
              variant="primary" 
              size="sm" 
              className="px-4 py-2 text-sm shadow-md shadow-[#FF5722]/20"
              onClick={() => onViewProfile(mentor)}
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

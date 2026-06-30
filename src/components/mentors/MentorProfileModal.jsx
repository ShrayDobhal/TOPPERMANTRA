import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, MapPin, Briefcase, ExternalLink, Calendar, MessageSquare, Plus } from "lucide-react";
import { Button } from "../ui/Button";

export default function MentorProfileModal({ mentor, onClose, onBookSession }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (mentor) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [mentor]);

  if (!mentor) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header Cover Image Area */}
          <div className="relative h-48 sm:h-64 bg-gradient-to-r from-slate-800 to-slate-900 shrink-0">
            {/* Abstract Background pattern */}
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPgoJCTxwYXRoIGQ9Ik0wIDEwaDQwdjJIMGg0MHpNMCAzMGg0MHYySDBoNDB6IiBmaWxsPSIjZmZmZmZmIi8+Cjwvc3ZnPg==')] mix-blend-overlay"></div>
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            
            {/* Top Profile Section */}
            <div className="px-6 sm:px-10 pb-8 relative -mt-20">
              <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white shrink-0">
                  <img src={mentor.avatarUrl} alt={mentor.firstName} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-[#0F172A]">
                        {mentor.firstName} {mentor.lastName}
                      </h2>
                      <p className="text-lg font-medium text-[#FF5722]">
                        {mentor.role} @ {mentor.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" className="h-10 px-4 flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Follow
                      </Button>
                      <Button variant="outline" className="h-10 w-10 p-0 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges / Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-8 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 fill-current" /> {mentor.rating} ({mentor.reviews.length} reviews)
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" /> {mentor.college}
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-slate-400" /> {mentor.yearsOfExperience} YOE
                </div>
                <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full font-bold">
                  {mentor.price === 0 ? "Free Mentorship" : `₹${mentor.price}/hour`}
                </div>
              </div>

              {/* Main Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* Left Column (Main Content) */}
                <div className="lg:col-span-2 space-y-10">
                  
                  {/* Bio */}
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-3">About Me</h3>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                      {mentor.bio}
                    </p>
                  </div>

                  {/* Journey */}
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-3">My Journey</h3>
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF5722] rounded-l-2xl"></div>
                      <p className="text-slate-600 leading-relaxed text-sm italic">
                        "{mentor.journey}"
                      </p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-3">Expertise & Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {mentor.skills.map((skill, i) => (
                        <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Projects/Links */}
                  {mentor.projects.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A] mb-3">Projects & Work</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {mentor.projects.map((proj, i) => (
                          <a key={i} href="#" className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-[#FF5722] transition-colors group">
                            <span className="font-semibold text-slate-700 group-hover:text-[#FF5722] text-sm">{proj.name}</span>
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#FF5722]" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reviews */}
                  {mentor.reviews.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A] mb-4">Student Reviews</h3>
                      <div className="space-y-4">
                        {mentor.reviews.map((rev, i) => (
                          <div key={i} className="border-b border-slate-100 pb-4 last:border-0">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-slate-800 text-sm">{rev.studentName}</span>
                              <span className="text-xs text-slate-400">{rev.date}</span>
                            </div>
                            <div className="flex gap-0.5 mb-2">
                              {[...Array(rev.rating)].map((_, idx) => (
                                <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <p className="text-slate-600 text-sm">{rev.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Right Column (Booking & Availability) */}
                <div className="lg:col-span-1">
                  <div className="bg-white border border-[#E9ECEF] rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-6">
                    <h3 className="text-lg font-bold text-[#0F172A] mb-6 border-b border-slate-100 pb-4">Book a Session</h3>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3 text-sm text-slate-600">
                        <Calendar className="w-5 h-5 text-[#FF5722] shrink-0" />
                        <div>
                          <span className="block font-bold text-slate-800 mb-1">1:1 Mentorship (45 mins)</span>
                          Includes resume review, mock interviews, or general career guidance.
                        </div>
                      </div>
                    </div>

                    <Button 
                      variant="primary" 
                      className="w-full h-12 text-base font-bold shadow-md"
                      disabled={!mentor.isAvailable}
                      onClick={() => onBookSession(mentor)}
                    >
                      {mentor.isAvailable ? "Select a Time" : "Currently Booked"}
                    </Button>
                    
                    {!mentor.isAvailable && (
                      <p className="text-center text-xs text-slate-400 mt-3">
                        This mentor is not accepting new students right now.
                      </p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

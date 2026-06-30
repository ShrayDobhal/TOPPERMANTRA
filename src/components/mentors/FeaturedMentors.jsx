import React from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Briefcase, Award } from "lucide-react";
import { Button } from "../ui/Button";
import { fadeUp, staggerContainer } from "../../lib/animations";

export default function FeaturedMentors({ mentors, onViewProfile }) {
  // Only show top rated or specifically featured mentors
  const featured = mentors.filter(m => m.rating >= 4.9).slice(0, 5);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-50 rounded-full -mr-[400px] -mt-[400px] pointer-events-none" />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1.5 px-4 rounded-full bg-[#FF5722]/10 text-[#FF5722] font-semibold text-sm border border-[#FF5722]/20 mb-4"
          >
            Exclusive Access
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4 text-[#0F172A]"
          >
            Featured <span className="text-[#FF5722]">Mentors</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#64748B] max-w-2xl mx-auto"
          >
            Learn directly from the top 1% of students and alumni who have achieved exactly what you're working toward.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-6 overflow-x-auto pb-8 pt-4 snap-x custom-scrollbar"
        >
          {featured.map((mentor, i) => (
            <motion.div 
              key={i}
              variants={fadeUp}
              className="min-w-[340px] md:min-w-[420px] shrink-0 snap-center bg-white rounded-3xl border border-[#E9ECEF] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 group relative flex flex-col"
            >
              {/* Banner Area */}
              <div className="h-28 bg-gradient-to-r from-slate-900 to-slate-800 relative">
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPgoJCTxwYXRoIGQ9Ik0wIDEwaDQwdjJIMGg0MHpNMCAzMGg0MHYySDBoNDB6IiBmaWxsPSIjZmZmZmZmIi8+Cjwvc3ZnPg==')] mix-blend-overlay"></div>
                
                {/* Avatar */}
                <div className="absolute -bottom-12 left-6">
                  <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden shadow-lg bg-white rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <img 
                      src={mentor.avatarUrl} 
                      alt={mentor.firstName} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white font-bold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {mentor.rating}
                </div>
              </div>

              {/* Content Area */}
              <div className="pt-16 px-6 pb-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-[#0F172A] mb-1">
                    {mentor.firstName} {mentor.lastName}
                  </h3>
                  <p className="text-sm font-bold text-[#FF5722]">
                    {mentor.role} @ {mentor.company}
                  </p>
                </div>

                <div className="space-y-2 mb-6 text-sm text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {mentor.college}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    {mentor.yearsOfExperience} YOE • {mentor.experienceType}
                  </div>
                  {mentor.achievements.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1 font-medium text-slate-700">{mentor.achievements[0]}</span>
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {mentor.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="bg-slate-50 border border-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-md">
                      {skill}
                    </span>
                  ))}
                  {mentor.skills.length > 3 && (
                    <span className="bg-slate-50 border border-slate-100 text-slate-500 text-xs font-semibold px-2.5 py-1 rounded-md">
                      +{mentor.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="mt-auto flex items-center gap-3">
                  <Button 
                    variant="primary" 
                    className="flex-1 shadow-md hover:shadow-lg transition-shadow"
                    onClick={() => onViewProfile(mentor)} // Directly opening booking inside profile view, or we could open booking directly
                  >
                    Book Session
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => onViewProfile(mentor)}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

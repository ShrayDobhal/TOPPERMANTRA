import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { fadeUp, staggerContainer } from "../../lib/animations";

export default function LiveSessions() {
  const sessions = [
    {
      title: "GenAI Masterclass: Building with LLMs",
      date: "Oct 20, 2026",
      time: "6:00 PM IST",
      mentor: "Neha Kapoor",
      institution: "OpenAI Intern",
      seatsRemaining: 12,
      totalSeats: 50,
      tags: ["AI", "Masterclass"]
    },
    {
      title: "Resume Review: Cracking FAANG ATS",
      date: "Oct 22, 2026",
      time: "8:00 PM IST",
      mentor: "Rahul Sharma",
      institution: "SDE @ Google",
      seatsRemaining: 5,
      totalSeats: 30,
      tags: ["Career", "Workshop"]
    },
    {
      title: "DSA Bootcamp: Dynamic Programming",
      date: "Oct 25, 2026",
      time: "10:00 AM IST",
      mentor: "Sneha Iyer",
      institution: "Atlassian",
      seatsRemaining: 25,
      totalSeats: 100,
      tags: ["DSA", "Bootcamp"]
    }
  ];

  return (
    <section className="py-24 bg-white border-y border-[#E9ECEF]">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold font-heading mb-4 text-[#0F172A]"
            >
              Upcoming <span className="text-[#FF5722]">Live Sessions</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#64748B] max-w-xl"
            >
              Join group masterclasses, bootcamps, and workshops hosted by our top mentors.
            </motion.p>
          </div>
          <Button variant="outline" className="hidden md:flex items-center gap-2">
            View All Calendar <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-6 overflow-x-auto pb-8 snap-x custom-scrollbar"
        >
          {sessions.map((session, i) => (
            <motion.div 
              key={i}
              variants={fadeUp}
              className="min-w-[320px] md:min-w-[400px] shrink-0 snap-start bg-white rounded-2xl border border-[#E9ECEF] p-6 hover:shadow-xl hover:border-[#FF5722]/30 transition-all duration-300"
            >
              <div className="flex gap-2 mb-4">
                {session.tags.map((tag, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl font-bold text-[#0F172A] mb-4 line-clamp-2 min-h-[56px]">
                {session.title}
              </h3>
              
              <div className="space-y-3 mb-6 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-3 text-sm text-[#64748B]">
                  <Calendar className="w-4 h-4 text-[#FF5722]" /> {session.date}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#64748B]">
                  <Clock className="w-4 h-4 text-[#FF5722]" /> {session.time}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#64748B]">
                  <Users className="w-4 h-4 text-[#FF5722]" /> Hosted by <span className="font-bold text-[#0F172A]">{session.mentor}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold">
                  <span className={session.seatsRemaining < 10 ? "text-red-500" : "text-green-600"}>
                    {session.seatsRemaining} seats left
                  </span>
                  <span className="text-slate-400"> / {session.totalSeats}</span>
                </div>
                <Button variant="primary" size="sm" className="px-6">
                  Register
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <Button variant="outline" className="w-full md:hidden flex items-center justify-center gap-2 mt-4">
          View All Calendar <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}

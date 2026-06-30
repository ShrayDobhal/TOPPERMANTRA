import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeUp, staggerContainer } from "../../lib/animations";

export default function MentorsFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How are mentors verified?",
      answer: "Every mentor goes through a strict manual verification process. We verify their university email, LinkedIn profile, and check references to ensure their achievements (like GSoC or SIH wins) are 100% authentic before they can join the platform."
    },
    {
      question: "Can I choose multiple mentors?",
      answer: "Absolutely. You can book sessions with different mentors depending on your current needs. For example, you might want an IIT Delhi mentor for your DSA preparation, and a startup founder for your product ideas."
    },
    {
      question: "Are the sessions recorded?",
      answer: "By default, 1-on-1 sessions are not recorded to maintain privacy and encourage open conversation. However, if both you and the mentor agree, you can record the Google Meet session for your personal reference."
    },
    {
      question: "How are bookings and reschedulings managed?",
      answer: "You can book an available slot directly on a mentor's profile. If you need to reschedule, you can do so up to 24 hours before the session without any penalty through your student dashboard."
    },
    {
      question: "How do reviews work?",
      answer: "After a session is completed, you will receive a prompt to rate and review your experience. These reviews are public and help other students choose the best mentors. We maintain a zero-tolerance policy for fake reviews."
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4 text-[#0F172A]"
          >
            Frequently Asked <span className="text-[#FF5722]">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#64748B]"
          >
            Everything you need to know about our mentorship program.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              variants={fadeUp}
              className="bg-white border border-[#E9ECEF] rounded-2xl overflow-hidden shadow-sm hover:border-[#FF5722]/30 transition-colors duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-bold text-[#0F172A] pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180 text-[#FF5722]" : ""}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-[#64748B] leading-relaxed border-t border-slate-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

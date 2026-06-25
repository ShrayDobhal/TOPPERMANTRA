import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "../lib/animations";
import { cn } from "../lib/utils";
import { Badge } from "./ui/Misc";
import { Button } from "./ui/Button";
import { Search, Plus, Minus, MessageSquareText } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What is Topper Mantra?",
    answer: "Topper Mantra is an exclusive growth ecosystem designed for ambitious students from Tier 2 and Tier 3 colleges. It bridges the opportunity gap by providing access to elite mentorship, live projects, hackathons, and career pathways typically reserved for Tier 1 institutions."
  },
  {
    id: 2,
    question: "Who can join?",
    answer: "Any college student who is passionate about building products, learning modern technologies, and advancing their career can join. Whether you're a first-year student exploring options or a final-year student looking for placements, the ecosystem has tailored pathways for you."
  },
  {
    id: 3,
    question: "Is it free?",
    answer: "Joining the basic community and accessing public resources, open source projects, and standard roadmaps is completely free. We also offer premium cohorts and 1-on-1 mentorship programs that are affordably priced to ensure high-quality, dedicated guidance."
  },
  {
    id: 4,
    question: "How do mentors work?",
    answer: "Our mentors are industry professionals from top companies (Google, Microsoft, YC Startups, etc.). You can book 1-on-1 sessions for portfolio reviews, interview preparation, career strategy, and project feedback through our unified scheduling platform."
  },
  {
    id: 5,
    question: "How do projects work?",
    answer: "You can either browse the Project Ecosystem to join an existing team looking for your specific skills, or pitch your own idea to recruit a team. Projects simulate real-world startup environments, complete with sprints, GitHub collaboration, and mentor code reviews."
  },
  {
    id: 6,
    question: "How are opportunities verified?",
    answer: "Every internship, scholarship, and hackathon listed in our Opportunity Hub is manually vetted by our team to ensure authenticity. We prioritize roles that offer genuine learning experiences and fair stipends, actively filtering out scams or unpaid labor."
  },
  {
    id: 7,
    question: "Can first-year students join?",
    answer: "Absolutely! First-year students are highly encouraged to join. Starting early gives you a massive advantage. We have specific beginner roadmaps designed to help you discover your interests before diving deep into specialized tracks."
  },
  {
    id: 8,
    question: "How do hackathons work?",
    answer: "We host internal digital hackathons and partner with global MLH events. You can use our Team Builder tool to find co-hackers based on complementary skills, brainstorm ideas, and build MVPs over a weekend with guidance from roaming mentors."
  },
  {
    id: 9,
    question: "How do I become a mentor?",
    answer: "If you have 2+ years of industry experience and a passion for teaching, you can apply through our Mentor Portal. Our team will review your profile, conduct a brief onboarding call, and help you set up your availability calendar."
  },
  {
    id: 10,
    question: "How do I join?",
    answer: "Simply click the 'Join Ecosystem' button in the navigation bar. You'll create a profile, select your current skills and career goals, and our platform will automatically generate your personalized growth roadmap to get you started immediately."
  }
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <motion.div 
      layout
      className={cn(
        "bg-white/70 backdrop-blur-md border rounded-[20px] overflow-hidden transition-all duration-300",
        isOpen ? "border-[#FF5722]/30 shadow-[0_10px_30px_-15px_rgba(255,87,34,0.15)]" : "border-[#E9ECEF] hover:border-[#FF5722]/20 shadow-sm"
      )}
    >
      <button 
        onClick={onToggle}
        className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left gap-4 group"
      >
        <span className={cn(
          "font-heading font-bold text-lg md:text-xl transition-colors duration-300",
          isOpen ? "text-[#FF5722]" : "text-[#0F172A] group-hover:text-[#FF5722]"
        )}>
          {faq.question}
        </span>
        <div className={cn(
          "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
          isOpen ? "bg-[#FF5722] text-white" : "bg-[#E9ECEF]/50 text-[#64748B] group-hover:bg-[#FF5722]/10 group-hover:text-[#FF5722]"
        )}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8 text-[#64748B] font-sans leading-relaxed text-sm md:text-base">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState(1); // First open by default
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative py-12 md:py-20 bg-white overflow-hidden" ref={containerRef}>
      
      {/* Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-[#FF5722]/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E9ECEF_1px,transparent_1px),linear-gradient(to_bottom,#E9ECEF_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_20%,transparent_100%)] opacity-30" />
      </div>

      <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-6 flex justify-center">
              <Badge variant="neutral" className="bg-[#FF5722]/5 text-[#FF5722] border border-[#FF5722]/20">FAQ</Badge>
            </motion.div>
            
            <motion.h2 variants={fadeUp} className="text-[40px] md:text-[56px] font-heading font-extrabold text-[#0F172A] tracking-tighter leading-[1.1] mb-6 text-balance">
              Questions? <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">We've Got Answers.</span>
            </motion.h2>

            {/* Search Bar */}
            <motion.div variants={fadeUp} className="max-w-xl mx-auto mt-10">
              <div className={cn(
                "relative bg-white rounded-full p-2 flex items-center shadow-md transition-all duration-300 border",
                searchFocused ? "border-[#FF5722]/50 shadow-[0_0_20px_rgba(255,87,34,0.1)] ring-4 ring-[#FF5722]/10" : "border-[#E9ECEF]"
              )}>
                <div className="pl-4 pr-2 text-[#64748B]">
                  <Search size={20} className={searchFocused ? "text-[#FF5722]" : ""} />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search frequently asked questions..." 
                  className="flex-1 bg-transparent border-none outline-none text-[#0F172A] text-base font-medium placeholder:text-[#64748B]/50"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="pr-4 text-[#64748B] hover:text-[#0F172A] text-xs font-bold"
                  >
                    CLEAR
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Accordions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4 mb-24 min-h-[400px]"
        >
          <AnimatePresence>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <FaqItem 
                  key={faq.id} 
                  faq={faq} 
                  isOpen={openId === faq.id} 
                  onToggle={() => setOpenId(openId === faq.id ? null : faq.id)} 
                />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-[#E9ECEF]/50 flex items-center justify-center mx-auto mb-4 text-[#64748B]">
                  <Search size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">No results found</h3>
                <p className="text-[#64748B]">We couldn't find any questions matching "{searchQuery}".</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#FAFAFA] border border-[#E9ECEF] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex items-center gap-6 relative z-10 text-center md:text-left">
            <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white shadow-sm border border-[#E9ECEF] items-center justify-center text-[#FF5722]">
              <MessageSquareText size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-heading font-bold text-[#0F172A] mb-2">Still have questions?</h3>
              <p className="text-[#64748B]">Our team is always here to help you get started.</p>
            </div>
          </div>
          
          <Button variant="outline" className="relative z-10 h-12 px-8 text-base font-bold bg-white text-[#0F172A] border-[#E9ECEF] hover:border-[#FF5722] hover:text-[#FF5722]">
            Contact Us
          </Button>
        </motion.div>

      </div>
    </section>
  );
}

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Star, Briefcase, MapPin, Building, Calendar, 
  MessageSquare, UserPlus, CheckCircle2, Video, X, Clock, IndianRupee, FileText
} from 'lucide-react';
import { Avatar } from '../../../components/ui/Avatar';
import { cn } from '../../../lib/utils';

export default function MentorProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  
  // Booking Flow State
  const [bookingStep, setBookingStep] = useState(1); // 1: Date/Time, 2: Agenda, 3: Confirmation

  const mentor = {
    name: 'Alex Kumar',
    role: 'Senior Software Engineer',
    company: 'Google',
    location: 'Bangalore, India',
    experience: '8 Years',
    rating: 4.9,
    reviews: 124,
    students: 450,
    avatar: 'Alex',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
    bio: 'Passionate about helping students crack FAANG interviews. I specialize in System Design and large-scale distributed systems.',
    skills: ['System Design', 'React', 'Node.js', 'Go', 'AWS'],
    sessions: [
      { id: 's1', title: 'Resume Review', duration: '30 Min', price: 'Free', icon: FileText, desc: 'Detailed feedback on your resume to pass the ATS screen.' },
      { id: 's2', title: 'Mock Interview (DSA)', duration: '60 Min', price: '₹499', icon: Video, desc: 'A full 60-minute algorithmic mock interview with feedback.' },
      { id: 's3', title: 'Career Guidance', duration: '30 Min', price: 'Free', icon: MessageSquare, desc: 'General 1:1 chat to discuss your career trajectory.' }
    ]
  };

  const openBooking = (session) => {
    setSelectedSession(session);
    setBookingStep(1);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar h-full bg-[#F8FAFC]">
      
      {/* Navigation Header */}
      <div className="sticky top-0 z-40 bg-[#F8FAFC]/80 backdrop-blur-xl border-b border-[#E9ECEF] p-4 lg:px-10 flex items-center justify-between">
        <Link to="/dashboard/mentors" className="inline-flex items-center gap-1 text-[10px] font-bold text-[#64748B] hover:text-[#0F172A] uppercase tracking-wider transition-colors">
          <ChevronLeft size={14} /> Back to Mentors
        </Link>
        <div className="flex items-center gap-2 text-sm font-bold">
          <button className="px-4 py-2 text-[#0F172A] bg-white border border-[#E9ECEF] rounded-xl shadow-sm hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
            <UserPlus size={16} /> Follow
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 lg:p-10 space-y-8 pb-24">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl border border-[#E9ECEF] shadow-sm relative overflow-hidden">
          {/* Cover Banner */}
          <div className="h-48 bg-gradient-to-r from-[#3B82F6] to-[#A855F7] w-full relative">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          </div>
          
          <div className="px-6 md:px-10 pb-10 relative">
            {/* Avatar & Logo */}
            <div className="relative inline-block -mt-16 mb-4">
              <div className="p-1.5 bg-white rounded-3xl shadow-sm inline-block">
                <Avatar size="2xl" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.avatar}`} className="rounded-2xl" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl p-1.5 shadow-md border border-[#E9ECEF]">
                <img src={mentor.logo} alt={mentor.company} className="w-full h-full object-contain" />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">{mentor.name}</h1>
                  <CheckCircle2 size={20} className="text-[#3B82F6] fill-[#3B82F6]/20" />
                </div>
                <p className="text-lg font-bold text-[#3B82F6] mb-4">{mentor.role} @ {mentor.company}</p>
                <p className="text-[15px] text-[#475569] leading-relaxed font-medium max-w-2xl mb-6">
                  {mentor.bio}
                </p>
                
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
                      <Star size={20} className="text-[#F59E0B] fill-current" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-[#0F172A]">{mentor.rating}</p>
                      <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">{mentor.reviews} Reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center">
                      <Briefcase size={20} className="text-[#22C55E]" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-[#0F172A]">{mentor.experience}</p>
                      <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Experience</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
                      <UserPlus size={20} className="text-[#3B82F6]" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-[#0F172A]">{mentor.students}+</p>
                      <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Mentees</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto shrink-0 flex flex-col gap-3">
                <button 
                  onClick={() => openBooking(mentor.sessions[0])}
                  className="w-full md:w-48 bg-[#0F172A] text-white px-6 py-3.5 rounded-xl font-extrabold hover:bg-[#1E293B] transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  Book Session
                </button>
                <button className="w-full md:w-48 bg-white text-[#0F172A] border border-[#E9ECEF] px-6 py-3.5 rounded-xl font-extrabold hover:bg-[#F8FAFC] transition-colors shadow-sm flex items-center justify-center gap-2">
                  Message
                </button>
              </div>
            </div>
            
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-[#E9ECEF]">
              {['about', 'sessions', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-3 text-sm font-bold capitalize transition-all border-b-2",
                    activeTab === tab ? "border-[#3B82F6] text-[#3B82F6]" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'about' && (
              <div className="space-y-8">
                <div className="bg-white border border-[#E9ECEF] rounded-3xl p-6 md:p-8 shadow-sm">
                  <h3 className="text-lg font-extrabold text-[#0F172A] mb-4">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.skills.map(skill => (
                      <span key={skill} className="bg-[#F8FAFC] border border-[#E9ECEF] text-[#0F172A] text-xs font-bold px-3 py-1.5 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white border border-[#E9ECEF] rounded-3xl p-6 md:p-8 shadow-sm">
                  <h3 className="text-lg font-extrabold text-[#0F172A] mb-6">Experience Timeline</h3>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#E2E8F0] before:to-transparent">
                    {/* Timeline Item */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#3B82F6] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Briefcase size={16} />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#F8FAFC] p-5 rounded-2xl border border-[#E9ECEF] shadow-sm">
                        <h4 className="font-bold text-[#0F172A]">Senior SWE</h4>
                        <p className="text-sm font-semibold text-[#3B82F6]">Google • 2024 - Present</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'sessions' && (
              <div className="space-y-4">
                {mentor.sessions.map(session => (
                  <div key={session.id} className="bg-white border border-[#E9ECEF] rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm hover:border-[#3B82F6]/30 hover:shadow-md transition-all group cursor-pointer" onClick={() => openBooking(session)}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#3B82F6] group-hover:text-white transition-colors">
                        <session.icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#0F172A] mb-1 group-hover:text-[#3B82F6] transition-colors">{session.title}</h3>
                        <p className="text-sm font-semibold text-[#64748B] mb-2 leading-relaxed">{session.desc}</p>
                        <div className="flex flex-wrap gap-3 text-xs font-bold text-[#0F172A]">
                          <span className="flex items-center gap-1 bg-[#F1F5F9] px-2 py-1 rounded-md"><Clock size={12}/> {session.duration}</span>
                          <span className={cn("flex items-center gap-1 px-2 py-1 rounded-md border", session.price === 'Free' ? "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20" : "bg-[#F8FAFC] border-[#E9ECEF]")}>
                            <IndianRupee size={12}/> {session.price}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full sm:w-auto shrink-0 bg-[#0F172A] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#1E293B] transition-colors shadow-sm">
                      Select
                    </button>
                  </div>
                ))}
              </div>
            )}
            
          </div>

          {/* Side Column */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E9ECEF] rounded-3xl p-6 shadow-sm">
              <h3 className="text-base font-extrabold text-[#0F172A] mb-4">Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-[#64748B]">Weekdays</span>
                  <span className="text-[#0F172A]">6:00 PM - 9:00 PM</span>
                </div>
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-[#64748B]">Weekends</span>
                  <span className="text-[#0F172A]">10:00 AM - 2:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Booking Modal Overlay */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-[100]"
              onClick={() => setIsBookingModalOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl border-l border-[#E9ECEF] flex flex-col"
            >
              <div className="p-6 border-b border-[#E9ECEF] flex items-center justify-between shrink-0 bg-[#F8FAFC]">
                <div>
                  <h3 className="text-lg font-extrabold text-[#0F172A]">Book Session</h3>
                  <p className="text-xs font-semibold text-[#64748B]">{selectedSession?.title} • {selectedSession?.duration}</p>
                </div>
                <button onClick={() => setIsBookingModalOpen(false)} className="p-2 text-[#94A3B8] hover:bg-[#E2E8F0] rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                {bookingStep === 1 && (
                  <div className="space-y-6">
                    <h4 className="font-bold text-[#0F172A]">1. Select Date & Time</h4>
                    <div className="bg-[#F8FAFC] border border-[#E9ECEF] rounded-2xl p-4 text-center text-sm font-bold text-[#64748B]">
                      (Mock Calendar Interface) <br/><br/>
                      Select Oct 28, 10:00 AM
                    </div>
                    <button onClick={() => setBookingStep(2)} className="w-full bg-[#0F172A] text-white py-3.5 rounded-xl font-bold hover:bg-[#1E293B] transition-colors shadow-sm">
                      Continue
                    </button>
                  </div>
                )}
                {bookingStep === 2 && (
                  <div className="space-y-6">
                    <h4 className="font-bold text-[#0F172A]">2. What do you want to achieve?</h4>
                    <textarea 
                      className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-2xl p-4 text-sm font-medium text-[#0F172A] focus:outline-none focus:border-[#3B82F6] focus:ring-4 focus:ring-[#3B82F6]/10 transition-all resize-none h-32"
                      placeholder="Share your goals, questions, or specific topics you want to cover..."
                    ></textarea>
                    <div className="flex gap-3">
                      <button onClick={() => setBookingStep(1)} className="flex-1 bg-white border border-[#E9ECEF] text-[#0F172A] py-3.5 rounded-xl font-bold hover:bg-[#F8FAFC] transition-colors">Back</button>
                      <button onClick={() => setBookingStep(3)} className="flex-1 bg-[#3B82F6] text-white py-3.5 rounded-xl font-bold hover:bg-[#2563EB] transition-colors shadow-[0_4px_14px_rgba(59,130,246,0.4)]">Confirm Booking</button>
                    </div>
                  </div>
                )}
                {bookingStep === 3 && (
                  <div className="flex flex-col items-center justify-center text-center h-full space-y-4">
                    <div className="w-16 h-16 bg-[#22C55E]/10 rounded-2xl flex items-center justify-center text-[#22C55E]">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-xl font-extrabold text-[#0F172A]">Session Confirmed!</h4>
                    <p className="text-sm font-medium text-[#64748B] mb-4">
                      Your session with {mentor.name} has been booked. You will receive an email with the Google Meet link.
                    </p>
                    <button onClick={() => setIsBookingModalOpen(false)} className="bg-[#F8FAFC] border border-[#E9ECEF] text-[#0F172A] px-6 py-2.5 rounded-xl font-bold hover:bg-[#F1F5F9] transition-colors">
                      Done
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

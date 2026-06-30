import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Video, CheckCircle } from "lucide-react";
import { Button } from "../ui/Button";

export default function BookingModal({ mentor, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  
  if (!mentor) return null;

  // Mock dates (Next 3 days)
  const dates = ["Today, Oct 15", "Tomorrow, Oct 16", "Thu, Oct 17"];
  const times = ["10:00 AM", "2:00 PM", "6:30 PM", "8:00 PM"];

  const handleBook = () => {
    setStep(2);
    // Simulate API call
    setTimeout(() => {
      setStep(3);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h3 className="font-bold text-lg text-[#0F172A]">Book a Session</h3>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                {/* Mentor Summary */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <img src={mentor.avatarUrl} alt={mentor.firstName} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-[#0F172A]">{mentor.firstName} {mentor.lastName}</h4>
                    <p className="text-xs text-slate-500">{mentor.role} @ {mentor.company}</p>
                  </div>
                  <div className="ml-auto font-bold text-[#FF5722]">
                    {mentor.price === 0 ? "Free" : `₹${mentor.price}`}
                  </div>
                </div>

                {/* Date Selection */}
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" /> Select Date
                </h4>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {dates.map((date, i) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedDate(date)}
                      className={`py-3 px-2 text-center rounded-lg border text-xs font-semibold transition-all ${
                        selectedDate === date 
                          ? "border-[#FF5722] bg-[#FF5722]/5 text-[#FF5722]" 
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-8">
                    <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" /> Select Time
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                      {times.map((time, i) => (
                        <button 
                          key={i}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-1 text-center rounded-md border text-xs font-medium transition-all ${
                            selectedTime === time 
                              ? "border-[#FF5722] bg-[#FF5722] text-white" 
                              : "border-slate-200 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <Button 
                  variant="primary" 
                  className="w-full h-12" 
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleBook}
                >
                  Confirm Booking
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-[#FF5722] rounded-full animate-spin mb-6"></div>
                <h3 className="font-bold text-lg text-[#0F172A] mb-2">Processing Booking...</h3>
                <p className="text-sm text-slate-500">Securing your slot with {mentor.firstName}.</p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-2xl text-[#0F172A] mb-2">Session Booked!</h3>
                <p className="text-slate-600 mb-6">
                  Your 1:1 session with {mentor.firstName} is confirmed for <br/> 
                  <span className="font-bold text-[#0F172A]">{selectedDate} at {selectedTime}</span>.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-[#FF5722] bg-[#FF5722]/5 px-4 py-2 rounded-lg font-semibold mb-8">
                  <Video className="w-4 h-4" /> Google Meet link sent to email
                </div>
                <Button variant="primary" className="w-full h-12" onClick={onClose}>
                  Back to Directory
                </Button>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

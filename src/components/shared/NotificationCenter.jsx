import { useState } from 'react';
import { Bell, Check, Clock, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export function NotificationCenter({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('all');
  
  const notifications = [
    { id: 1, title: 'New Mentor Reply', desc: 'Sarah Chen replied to your message.', time: '2m ago', type: 'message', unread: true },
    { id: 2, title: 'Project Update', desc: 'Your project "AI Resume Builder" was approved.', time: '1h ago', type: 'system', unread: true },
    { id: 3, title: 'Upcoming Session', desc: 'You have a session in 30 minutes.', time: '2h ago', type: 'alert', unread: false },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#E9ECEF] z-50 overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E9ECEF] bg-[#F8FAFC]">
            <h3 className="font-bold text-[#0F172A] flex items-center gap-2">
              Notifications <span className="bg-[#EF4444] text-white text-[10px] px-1.5 py-0.5 rounded-full">2</span>
            </h3>
            <div className="flex items-center gap-2">
              <button className="text-[11px] font-bold text-[#3B82F6] hover:text-[#2563EB]">Mark all read</button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 px-4 py-2 border-b border-[#E9ECEF] text-xs font-semibold">
            <button 
              onClick={() => setActiveTab('all')}
              className={cn("pb-2 border-b-2 transition-colors", activeTab === 'all' ? "border-[#FF5722] text-[#FF5722]" : "border-transparent text-[#64748B] hover:text-[#0F172A]")}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab('unread')}
              className={cn("pb-2 border-b-2 transition-colors", activeTab === 'unread' ? "border-[#FF5722] text-[#FF5722]" : "border-transparent text-[#64748B] hover:text-[#0F172A]")}
            >
              Unread
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            {notifications.length > 0 ? (
              <div className="flex flex-col">
                {notifications.map(notification => (
                  <div key={notification.id} className={cn(
                    "p-4 border-b border-[#E9ECEF] hover:bg-[#F8FAFC] transition-colors cursor-pointer flex gap-3",
                    notification.unread ? "bg-blue-50/50" : ""
                  )}>
                    <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center shrink-0 mt-1">
                      {notification.type === 'message' ? <User size={14} /> : 
                       notification.type === 'alert' ? <Clock size={14} /> : 
                       <Check size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm mb-0.5", notification.unread ? "font-bold text-[#0F172A]" : "font-semibold text-[#0F172A]")}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-[#64748B] truncate">{notification.desc}</p>
                      <p className="text-[10px] font-bold text-[#94A3B8] mt-1 uppercase tracking-wider">{notification.time}</p>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 rounded-full bg-[#3B82F6] shrink-0 mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center flex flex-col items-center justify-center">
                <Bell size={32} className="text-[#CBD5E1] mb-3" />
                <p className="font-semibold text-[#0F172A]">All caught up!</p>
                <p className="text-xs text-[#64748B]">You have no new notifications.</p>
              </div>
            )}
          </div>
          
          <div className="p-2 border-t border-[#E9ECEF] bg-[#F8FAFC]">
            <button className="w-full py-2 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors">
              View All Notifications
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

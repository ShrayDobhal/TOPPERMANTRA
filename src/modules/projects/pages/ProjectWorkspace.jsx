import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  KanbanSquare, GitMerge, Settings, Bell, Search, 
  MessageSquare, FileText, ChevronLeft, Calendar 
} from "lucide-react";
import KanbanBoard from "../components/KanbanBoard";
import { mockProjects } from "../../../lib/mockProjects";
import { fadeUp } from "../../../lib/animations";

export default function ProjectWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Board");
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Fallback to first project for demo
  const project = mockProjects.find(p => p.id === id) || mockProjects[0];

  const navItems = [
    { id: "Board", icon: <KanbanSquare className="w-5 h-5" /> },
    { id: "Docs", icon: <FileText className="w-5 h-5" /> },
    { id: "Chat", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "Github", icon: <GitMerge className="w-5 h-5" /> },
    { id: "Calendar", icon: <Calendar className="w-5 h-5" /> }
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* Sidebar Navigation */}
      <motion.div 
        animate={{ width: isSidebarOpen ? 240 : 80 }}
        className="bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 relative z-20"
      >
        <div className="h-16 flex items-center px-4 border-b border-slate-800">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 text-white hover:bg-[#FF5722] transition-colors shrink-0">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 font-bold text-white truncate"
              >
                Back to Hub
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5722] to-orange-400 p-0.5 shrink-0">
              <img src={project.bannerUrl} alt="Logo" className="w-full h-full rounded-[10px] object-cover" />
            </div>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="overflow-hidden"
                >
                  <h2 className="font-bold text-white text-sm truncate">{project.title}</h2>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">{project.status}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === item.id 
                  ? "bg-[#FF5722]/10 text-[#FF5722]" 
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className={activeTab === item.id ? "text-[#FF5722]" : "text-slate-400"}>
                {item.icon}
              </span>
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-medium text-sm"
                  >
                    {item.id}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 transition-colors">
            <Settings className="w-5 h-5 text-slate-400 shrink-0" />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-medium text-sm"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <h1 className="font-bold text-lg text-[#0F172A]">{activeTab}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search tasks, docs..." 
                className="pl-9 pr-4 py-2 bg-slate-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:bg-white transition-all w-64 border border-transparent focus:border-[#FF5722]"
              />
            </div>
            
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            <div className="flex -space-x-2 mr-2">
              {project.members.slice(0, 3).map((m, i) => (
                <img key={i} src={m.avatar} alt="member" className="w-8 h-8 rounded-full border-2 border-white" />
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                +2
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 p-6 overflow-y-auto"
            >
              {activeTab === "Board" && (
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center mb-6 shrink-0">
                    <div>
                      <h2 className="text-xl font-bold text-[#0F172A]">Sprint 4</h2>
                      <p className="text-sm text-slate-500">Oct 12 - Oct 26</p>
                    </div>
                    <button className="bg-[#0F172A] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#1E293B] transition-colors shadow-sm">
                      New Issue
                    </button>
                  </div>
                  
                  {/* Kanban Board Component */}
                  <KanbanBoard tasks={project.tasks} />
                </div>
              )}

              {activeTab !== "Board" && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    {navItems.find(i => i.id === activeTab)?.icon}
                  </div>
                  <h2 className="text-xl font-bold text-[#0F172A] mb-2">{activeTab} Integration</h2>
                  <p className="text-slate-500 max-w-sm">
                    This module is connected to Supabase Realtime. When teammates update {activeTab.toLowerCase()}, changes will appear here instantly.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

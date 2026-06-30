import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, MoreHorizontal, MessageSquare, Paperclip, LayoutDashboard } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { mockProjects, mockTasks } from '../../../lib/mockProjects';

export default function ProjectBoard() {
  const { id } = useParams();
  const project = mockProjects.find(p => p.id === id) || mockProjects[0];
  
  // Local state for dragging simulation
  const [tasks, setTasks] = useState(mockTasks);

  const columns = [
    { id: "backlog", title: "Backlog", color: "bg-gray-100", textColor: "text-gray-700", dot: "bg-gray-400" },
    { id: "todo", title: "To Do", color: "bg-blue-50", textColor: "text-blue-700", dot: "bg-blue-500" },
    { id: "in-progress", title: "In Progress", color: "bg-orange-50", textColor: "text-orange-700", dot: "bg-[#FF5722]" },
    { id: "review", title: "In Review", color: "bg-purple-50", textColor: "text-purple-700", dot: "bg-purple-500" },
    { id: "completed", title: "Completed", color: "bg-green-50", textColor: "text-green-700", dot: "bg-emerald-500" },
  ];

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <Link to={`/dashboard/projects/${project.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#64748B] hover:text-[#0F172A] transition-colors mb-2">
            <ArrowLeft size={16} /> Back to Project
          </Link>
          <h1 className="text-2xl font-bold font-heading text-[#0F172A] flex items-center gap-2">
            <LayoutDashboard className="text-[#FF5722]" size={24} />
            {project.title} Board
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 mr-2">
            {project.team.map((member, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] border-2 border-[#F8FAFC] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {member.avatar}
              </div>
            ))}
          </div>
          <button className="py-2.5 px-4 bg-[#0F172A] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#0F172A]/20 hover:bg-[#1E293B] transition-colors flex items-center gap-2">
            <Plus size={16} /> New Task
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar pb-4">
        <div className="flex gap-6 h-full min-w-max px-1">
          {columns.map(col => {
            const colTasks = tasks.filter(t => t.status === col.id);
            
            return (
              <div key={col.id} className="w-[320px] flex flex-col h-full bg-[#F1F5F9]/50 rounded-2xl border border-[#E9ECEF]">
                
                {/* Column Header */}
                <div className="p-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <span className={cn("w-2 h-2 rounded-full", col.dot)}></span>
                    <h3 className="font-bold text-[#0F172A]">{col.title}</h3>
                    <span className="px-2 py-0.5 bg-white text-[#64748B] text-xs font-bold rounded-full shadow-sm border border-[#E9ECEF]">
                      {colTasks.length}
                    </span>
                  </div>
                  <button className="text-[#94A3B8] hover:text-[#0F172A] transition-colors">
                    <Plus size={18} />
                  </button>
                </div>

                {/* Column Body (Task List) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 pt-0 space-y-3">
                  <AnimatePresence>
                    {colTasks.map(task => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={task.id}
                        className="bg-white p-4 rounded-xl shadow-sm border border-[#E9ECEF] group hover:border-[#CBD5E1] transition-colors cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span className={cn("px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider", getPriorityColor(task.priority))}>
                            {task.priority}
                          </span>
                          <button className="text-[#94A3B8] opacity-0 group-hover:opacity-100 hover:text-[#0F172A] transition-all">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                        
                        <h4 className="text-sm font-bold text-[#0F172A] mb-4 leading-snug">{task.title}</h4>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-3 text-[#94A3B8]">
                            <div className="flex items-center gap-1 text-xs">
                              <MessageSquare size={14} /> 2
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Paperclip size={14} /> 1
                            </div>
                          </div>
                          
                          {task.assignee !== 'Unassigned' ? (
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white text-[10px] font-bold" title={task.assignee}>
                              {task.assignee.charAt(0)}
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border border-dashed border-[#CBD5E1] flex items-center justify-center text-[#94A3B8] text-[10px]">
                              ?
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}

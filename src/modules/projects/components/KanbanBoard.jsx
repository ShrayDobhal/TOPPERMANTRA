import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MoreHorizontal, CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";
import { fadeUp } from "../../../lib/animations";

export default function KanbanBoard({ tasks }) {
  // Group tasks by status
  const [boardData, setBoardData] = useState({
    "Backlog": tasks.filter(t => t.status === "Backlog"),
    "To Do": tasks.filter(t => t.status === "To Do"),
    "In Progress": tasks.filter(t => t.status === "In Progress"),
    "Review": tasks.filter(t => t.status === "Review"),
    "Completed": tasks.filter(t => t.status === "Completed"),
  });

  const columns = ["Backlog", "To Do", "In Progress", "Review", "Completed"];

  const getStatusIcon = (status) => {
    switch(status) {
      case "Backlog": return <Circle className="w-4 h-4 text-slate-300" />;
      case "To Do": return <Circle className="w-4 h-4 text-slate-400" />;
      case "In Progress": return <Clock className="w-4 h-4 text-amber-500" />;
      case "Review": return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case "Completed": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default: return <Circle className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-250px)] gap-6 overflow-x-auto pb-6 custom-scrollbar -mx-6 px-6">
      {columns.map((col, i) => (
        <div key={col} className="min-w-[320px] w-[320px] shrink-0 flex flex-col">
          
          {/* Column Header */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              {getStatusIcon(col)}
              <h3 className="font-semibold text-[#0F172A]">{col}</h3>
              <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {boardData[col]?.length || 0}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Container */}
          <div className="flex-1 bg-slate-100/50 rounded-2xl p-2.5 overflow-y-auto custom-scrollbar flex flex-col gap-2.5 border border-slate-200/50">
            <AnimatePresence>
              {boardData[col]?.map((task, idx) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-[#FF5722]/40 hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-semibold text-[#0F172A] leading-snug group-hover:text-[#FF5722] transition-colors">
                      {task.title}
                    </p>
                  </div>
                  
                  {/* Mock Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-semibold uppercase tracking-wider">Frontend</span>
                    <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-[10px] font-semibold uppercase tracking-wider">High</span>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
                    <span className="text-xs font-medium text-slate-400">{task.id}</span>
                    <div className="flex -space-x-1">
                      {/* Avatar Mock */}
                      <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                        {task.assignee.charAt(0)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {(!boardData[col] || boardData[col].length === 0) && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm italic opacity-50">
                Drop tasks here
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

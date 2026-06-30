import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MoreHorizontal, Clock, User as AvatarIcon } from 'lucide-react';
import { Avatar } from '../../../../components/ui/Avatar';
import { cn } from '../../../../lib/utils';

const initialColumns = {
  'ideas': { title: 'Ideas', color: 'bg-slate-200 text-slate-700', taskIds: ['t1', 't2'] },
  'todo': { title: 'To Do', color: 'bg-blue-100 text-blue-700', taskIds: ['t3'] },
  'inProgress': { title: 'In Progress', color: 'bg-orange-100 text-orange-700', taskIds: ['t4', 't5'] },
  'review': { title: 'In Review', color: 'bg-purple-100 text-purple-700', taskIds: [] },
  'done': { title: 'Completed', color: 'bg-green-100 text-green-700', taskIds: ['t6'] },
};

const initialTasks = {
  't1': { id: 't1', title: 'Add dark mode toggle', priority: 'Low', assignee: 'Alex', due: 'Oct 20' },
  't2': { id: 't2', title: 'Design landing page', priority: 'Medium', assignee: null, due: 'Oct 25' },
  't3': { id: 't3', title: 'Setup database schema', priority: 'High', assignee: 'Priya', due: 'Oct 15' },
  't4': { id: 't4', title: 'Build React components', priority: 'High', assignee: 'Rahul', due: 'Oct 18' },
  't5': { id: 't5', title: 'Integrate OpenAI API', priority: 'High', assignee: 'Alex', due: 'Oct 19' },
  't6': { id: 't6', title: 'Project Initialization', priority: 'Medium', assignee: 'Alex', due: 'Oct 10' },
};

export default function ProjectKanban() {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('taskId', taskId);
    // Add a slight delay to allow the drag image to be generated before styling
    setTimeout(() => {
      e.target.style.opacity = '0.4';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedTaskId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (!taskId) return;

    // Find source column
    let sourceColumnId = null;
    for (const [colId, col] of Object.entries(columns)) {
      if (col.taskIds.includes(taskId)) {
        sourceColumnId = colId;
        break;
      }
    }

    if (sourceColumnId === columnId) return;

    // Move task
    setColumns(prev => {
      const sourceTaskIds = Array.from(prev[sourceColumnId].taskIds);
      sourceTaskIds.splice(sourceTaskIds.indexOf(taskId), 1);
      
      const targetTaskIds = Array.from(prev[columnId].taskIds);
      targetTaskIds.push(taskId);
      
      return {
        ...prev,
        [sourceColumnId]: { ...prev[sourceColumnId], taskIds: sourceTaskIds },
        [columnId]: { ...prev[columnId], taskIds: targetTaskIds }
      };
    });
  };

  return (
    <div className="flex h-full min-h-[600px] gap-6 overflow-x-auto custom-scrollbar pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      {Object.entries(columns).map(([columnId, column]) => (
        <div 
          key={columnId} 
          className="w-[320px] shrink-0 flex flex-col bg-[#F8FAFC] rounded-3xl border border-[#E9ECEF] max-h-[800px]"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, columnId)}
        >
          {/* Column Header */}
          <div className="p-4 flex items-center justify-between border-b border-[#E9ECEF] shrink-0">
            <div className="flex items-center gap-2">
              <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full", column.color)}>
                {column.title}
              </span>
              <span className="text-xs font-bold text-[#94A3B8]">{column.taskIds.length}</span>
            </div>
            <button className="text-[#94A3B8] hover:text-[#0F172A] transition-colors">
              <Plus size={18} />
            </button>
          </div>

          {/* Task List */}
          <div className="p-3 flex-1 overflow-y-auto custom-scrollbar space-y-3">
            <AnimatePresence>
              {column.taskIds.map(taskId => {
                const task = tasks[taskId];
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={taskId}
                    draggable
                    onDragStart={(e) => handleDragStart(e, taskId)}
                    onDragEnd={handleDragEnd}
                    className="bg-white p-4 rounded-2xl border border-[#E9ECEF] shadow-sm hover:shadow-md hover:border-[#FF5722]/30 transition-all cursor-grab active:cursor-grabbing group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={cn(
                        "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md",
                        task.priority === 'High' ? 'bg-red-50 text-red-600' :
                        task.priority === 'Medium' ? 'bg-yellow-50 text-yellow-600' :
                        'bg-blue-50 text-blue-600'
                      )}>
                        {task.priority}
                      </span>
                      <button className="text-[#CBD5E1] hover:text-[#0F172A] opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                    
                    <h4 className="text-sm font-bold text-[#0F172A] mb-3 leading-snug">{task.title}</h4>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                        <Clock size={12} /> {task.due}
                      </div>
                      {task.assignee ? (
                        <Avatar size="xs" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignee}`} />
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-dashed border-[#CBD5E1] flex items-center justify-center bg-[#F8FAFC]">
                          <AvatarIcon size={12} className="text-[#CBD5E1]" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}

import { KanbanSquare, Plus, Clock, User } from 'lucide-react';
import { Avatar } from '../../../components/ui/Avatar';

const columns = [
  { id: 'todo', title: 'To Do', color: 'border-l-[#94A3B8]', tasks: [
    { id: 1, title: 'Solve 10 Leetcode DP problems', type: 'Study', priority: 'High', assignee: 'Alex' },
    { id: 2, title: 'Read System Design Chapter 3', type: 'Reading', priority: 'Medium', assignee: 'Priya' }
  ]},
  { id: 'inprogress', title: 'In Progress', color: 'border-l-[#3B82F6]', tasks: [
    { id: 3, title: 'Build Mock Interview app UI', type: 'Project', priority: 'High', assignee: 'Shray' }
  ]},
  { id: 'done', title: 'Completed', color: 'border-l-[#22C55E]', tasks: [
    { id: 4, title: 'Setup GitHub repository', type: 'Project', priority: 'Low', assignee: 'Rahul' }
  ]}
];

export default function SpaceTasks() {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="p-6 border-b border-[#E9ECEF] flex items-center justify-between shrink-0 bg-white shadow-sm z-10">
        <div>
          <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center gap-2 mb-1">
            <KanbanSquare className="text-[#3B82F6]" size={24} /> Space Tasks
          </h2>
          <p className="text-sm font-semibold text-[#64748B]">Manage goals, reading lists, and project tasks.</p>
        </div>
        <button className="bg-[#3B82F6] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#2563EB] transition-colors flex items-center gap-2 shadow-sm">
          <Plus size={18} /> New Task
        </button>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-x-auto custom-scrollbar p-6">
        <div className="flex gap-6 min-w-max h-full">
          {columns.map(col => (
            <div key={col.id} className="w-[300px] flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className={`text-sm font-bold text-[#0F172A] border-l-4 ${col.color} pl-2`}>{col.title}</h3>
                <span className="bg-[#E2E8F0] text-[#64748B] text-xs font-bold px-2 py-0.5 rounded-full">{col.tasks.length}</span>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-3 pb-4">
                {col.tasks.map(task => (
                  <div key={task.id} className="bg-white border border-[#E9ECEF] rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-[#3B82F6]/30 transition-all cursor-grab active:cursor-grabbing">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider bg-[#F1F5F9] px-2 py-1 rounded-md">
                        {task.type}
                      </span>
                      {task.priority === 'High' && (
                        <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-[#0F172A] mb-4 leading-snug">{task.title}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B]">
                        <Clock size={14} /> Oct 24
                      </div>
                      <Avatar size="xs" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignee}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

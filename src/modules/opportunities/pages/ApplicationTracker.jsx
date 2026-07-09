import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { showcaseApplications } from '../../../lib/showcaseDiscover';

export default function ApplicationTracker() {
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Applied': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'Shortlisted': return <CheckCircle className="w-4 h-4 text-amber-500" />;
      case 'Interview': return <AlertCircle className="w-4 h-4 text-indigo-500" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Applied': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Shortlisted': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Interview': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-[#0F172A] mb-2">Application Tracker</h1>
        <p className="text-slate-500">Track and manage all your opportunity applications in one place.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-5 pl-2">Role & Company</div>
          <div className="col-span-3">Date Applied</div>
          <div className="col-span-4 text-right pr-2">Status</div>
        </div>

        {/* List */}
        <div className="divide-y divide-slate-100">
          {showcaseApplications.map((app, i) => (
            <motion.div 
              key={app.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 hover:bg-slate-50 transition-colors items-center"
            >
              <div className="md:col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A] text-base leading-tight">{app.title}</h3>
                  <div className="text-sm font-semibold text-slate-500">{app.company}</div>
                </div>
              </div>

              <div className="md:col-span-3 text-sm text-slate-600 font-medium">
                {new Date(app.dateApplied).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>

              <div className="md:col-span-4 flex items-center md:justify-end">
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(app.status)}`}>
                  {getStatusIcon(app.status)} {app.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

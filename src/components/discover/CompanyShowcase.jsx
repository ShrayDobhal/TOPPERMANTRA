import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { showcaseCompanies } from '../../lib/showcaseDiscover';
import { Button } from '../ui/Button';

export default function CompanyShowcase() {
  return (
    <section className="py-24 bg-white border-b border-[#E9ECEF] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold font-heading text-[#0F172A] mb-3"
            >
              Top Organizations Hiring
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#64748B] text-lg max-w-2xl"
            >
              Explore product companies, research labs, and fast-growing startups actively recruiting students on Topper Mantra.
            </motion.p>
          </div>
          <button className="text-sm font-bold text-[#FF5722] hover:text-[#E64A19] flex items-center gap-1 group whitespace-nowrap">
            View All Companies <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {showcaseCompanies.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[280px] w-[280px] shrink-0 snap-start bg-slate-50 rounded-3xl border border-slate-200 p-6 hover:border-indigo-500/30 hover:shadow-xl transition-all group flex flex-col items-center text-center cursor-pointer relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-white border border-slate-100 shadow-sm p-3 flex items-center justify-center shrink-0 mb-4 group-hover:scale-105 transition-transform">
                <img src={company.logo} alt={company.name} className="max-w-full max-h-full object-contain" />
              </div>
              
              <h3 className="font-bold text-xl text-[#0F172A] leading-tight mb-2">{company.name}</h3>
              
              <div className="bg-indigo-500/10 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold mb-6">
                {company.openRoles} Open Roles
              </div>

              <div className="w-full flex items-center justify-center gap-2 text-sm font-bold text-slate-500 group-hover:text-indigo-600 transition-colors mt-auto">
                View Profile <ExternalLink className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

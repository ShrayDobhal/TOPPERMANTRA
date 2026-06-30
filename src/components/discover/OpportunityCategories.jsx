import React from 'react';
import { motion } from 'framer-motion';
import OpportunityCard from './OpportunityCard';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OpportunityCategories({ opportunities, filters, searchQuery }) {
  const navigate = useNavigate();
  
  // Determine if any filters are active
  const hasFilters = searchQuery || Object.values(filters).some(arr => arr.length > 0);

  // If filtered, show a single grid of results
  if (hasFilters) {
    return (
      <section className="py-20 bg-slate-50 min-h-[50vh]">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold font-heading text-[#0F172A]">
              Search Results <span className="text-slate-400 font-normal">({opportunities.length})</span>
            </h2>
          </div>
          
          {opportunities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {opportunities.map(opp => (
                <OpportunityCard 
                  key={opp.id} 
                  opportunity={opp} 
                  onClick={(id) => navigate(`/discover/${id}`)} 
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">No opportunities found</h3>
              <p className="text-[#64748B]">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Otherwise, group by category swimlanes
  const categoriesToDisplay = [
    { id: "Recommended For You", title: "⭐ Recommended For You", desc: "Curated based on your skills, roadmap, and interests." },
    { id: "Featured This Week", title: "🔥 Featured This Week", desc: "Top-tier roles highly sought after by students." },
    { id: "Trending Internships", title: "🚀 Trending Internships", desc: "Roles gaining the most traction across the platform." },
    { id: "Hackathons", title: "🏆 Upcoming Hackathons", desc: "Compete, build, and win prizes." },
  ];

  const getOppForCategory = (catId) => {
    return opportunities.filter(o => o.category === catId);
  };

  return (
    <div className="py-20 bg-slate-50 space-y-24">
      {categoriesToDisplay.map((cat, idx) => {
        const categoryOpps = getOppForCategory(cat.id);
        if (categoryOpps.length === 0) return null;

        return (
          <section key={cat.id} className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-3xl font-bold font-heading text-[#0F172A] mb-2"
                >
                  {cat.title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-sm text-[#64748B]"
                >
                  {cat.desc}
                </motion.p>
              </div>
              <button className="text-sm font-semibold text-[#FF5722] hover:text-[#E64A19] flex items-center gap-1 group">
                View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-8 snap-x custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {categoryOpps.map((opp, i) => (
                <motion.div 
                  key={opp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="min-w-[300px] w-[300px] sm:min-w-[340px] sm:w-[340px] shrink-0 snap-start"
                >
                  <OpportunityCard opportunity={opp} onClick={(id) => navigate(`/discover/${id}`)} />
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

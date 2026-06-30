import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Briefcase, Share2, Bookmark, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { mockOpportunities } from '../../../lib/mockDiscover';

export default function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const opportunity = mockOpportunities.find(opp => opp.id === id) || mockOpportunities[0]; // fallback for demo

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      
      {/* Header Strip */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/discover')}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0F172A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Discover
          </button>
          
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#FF5722] hover:border-[#FF5722] hover:bg-[#FF5722]/5 transition-all">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0F172A] hover:border-[#0F172A] hover:bg-slate-50 transition-all">
              <Share2 className="w-4 h-4" />
            </button>
            <Button variant="primary" className="px-8 shadow-md">Apply Now</Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Title Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
             {opportunity.matchScore > 90 && (
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-bl-[100px] -z-10"></div>
            )}
            
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-white border border-slate-100 shadow-sm p-4 flex items-center justify-center shrink-0">
                <img src={opportunity.logo} alt={opportunity.company} className="max-w-full max-h-full object-contain" />
              </div>
              <div>
                <h1 className="text-3xl font-black font-heading text-[#0F172A] mb-2">{opportunity.title}</h1>
                <div className="text-lg font-bold text-slate-600 mb-3">{opportunity.company}</div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase">
                    {opportunity.type}
                  </span>
                  {opportunity.matchScore > 90 && (
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> AI Top Match
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Location</div>
                <div className="font-semibold text-slate-700 text-sm">{opportunity.location}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Briefcase className="w-3 h-3"/> Workplace</div>
                <div className="font-semibold text-slate-700 text-sm">{opportunity.workplaceType}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Duration</div>
                <div className="font-semibold text-slate-700 text-sm">{opportunity.duration}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Stipend</div>
                <div className="font-bold text-[#0F172A] text-sm">{opportunity.stipend}</div>
              </div>
            </div>
          </div>

          {/* Description Block */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-8">
            <section>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">About the Role</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                {opportunity.description}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">What you'll do</h3>
              <ul className="space-y-3">
                {opportunity.responsibilities.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">Eligibility</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                {opportunity.eligibility}
              </p>
            </section>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          
          {/* Important Dates */}
          <div className="bg-white rounded-3xl border border-[#FF5722]/20 p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5722]/5 rounded-bl-full -z-10"></div>
            
            <h3 className="font-bold text-[#0F172A] mb-4">Application Timeline</h3>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-4 h-4 rounded-full border-4 border-white bg-[#FF5722] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-[2px] md:ml-0 z-10"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-4 md:ml-0 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="text-xs font-bold text-[#FF5722] mb-1">Applications Close</div>
                  <div className="text-sm font-semibold text-[#0F172A]">{new Date(opportunity.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  <div className="text-xs text-slate-500 mt-1">({opportunity.daysLeft} days left)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Checklist */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-[#0F172A] mb-4">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {opportunity.skills.map((skill, i) => (
                <span key={i} className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

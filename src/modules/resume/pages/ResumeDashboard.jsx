import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, RefreshCw, FileText, CheckCircle2, 
  AlertCircle, Briefcase, Zap, IndianRupee, Target, Award
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import useResumeStore from '../../../store/useResumeStore';
import { fadeUp } from '../../../lib/animations';

export default function ResumeDashboard() {
  const navigate = useNavigate();
  const { analysisResults, resumeData, reset } = useResumeStore();
  const [isExporting, setIsExporting] = useState(false);
  const handleExportPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById('resume-report-content');
    if (!element) {
      setIsExporting(false);
      return;
    }
    
    try {
      const dataUrl = await htmlToImage.toJpeg(element, { quality: 0.95, backgroundColor: '#F8FAFC' });
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(dataUrl, 'JPEG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('Resume_Intelligence_Report.pdf');
    } catch (err) {
      console.error("PDF Export error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  if (!analysisResults) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 flex-col gap-4">
        <AlertCircle className="w-12 h-12 text-slate-400" />
        <p className="text-lg font-bold text-slate-600">No analysis data found.</p>
        <button onClick={() => navigate('/dashboard/resume')} className="text-[#FF5722] font-bold hover:underline">
          Go back to Upload
        </button>
      </div>
    );
  }

  const { 
    overallScore, atsScore, qualityScore, atsAnalysis, sectionReviews, 
    missingSections, keywordIntelligence, salaryEstimate, suitableRoles 
  } = analysisResults;

  const radarData = Object.keys(qualityScore).map(key => ({
    subject: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
    A: qualityScore[key],
    fullMark: 100,
  }));

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500 bg-green-50 border-green-200";
    if (score >= 60) return "text-amber-500 bg-amber-50 border-amber-200";
    return "text-red-500 bg-red-50 border-red-200";
  };

  const CircularScore = ({ score, label }) => {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    const colorClass = score >= 80 ? "stroke-green-500" : score >= 60 ? "stroke-amber-500" : "stroke-red-500";

    return (
      <div className="flex flex-col items-center shrink-0">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          <svg viewBox="0 0 96 96" className="w-full h-full transform -rotate-90 absolute inset-0">
            <circle cx="48" cy="48" r={radius} fill="none" stroke="#F1F5F9" strokeWidth="6" />
            <circle 
              cx="48" cy="48" r={radius} 
              fill="none" 
              strokeWidth="6" 
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`transition-all duration-1000 ease-out ${colorClass}`} 
            />
          </svg>
          <span className="text-2xl font-black text-[#0F172A]">{score}</span>
        </div>
        <span className="mt-2 text-sm font-bold text-slate-500 uppercase tracking-wider">{label}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] print:bg-white pb-24 print:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 print:hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { reset(); navigate('/dashboard/resume'); }} 
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black text-[#0F172A] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#FF5722]" /> 
              Resume Intelligence Report
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <RefreshCw className="w-4 h-4" /> Re-Analyze
            </button>
            <button 
              onClick={handleExportPDF} 
              disabled={isExporting}
              className={`flex items-center gap-2 px-4 py-2 text-white rounded-xl text-sm font-bold transition-all shadow-md ${isExporting ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#0F172A] hover:bg-[#1E293B] hover:shadow-lg'}`}
            >
              {isExporting ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Exporting...</>
              ) : (
                <><Download className="w-4 h-4" /> Export PDF</>
              )}
            </button>
          </div>
        </div>
      </header>

      <div id="resume-report-content" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row print:flex-col print:block gap-8 print:gap-4 print:py-0 bg-[#F8FAFC]">
        
        {/* Left Column - Main Analysis */}
        <div className="flex-1 space-y-8">
          
          {/* Top Scores */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4">
              <CircularScore score={overallScore} label="" />
              <div>
                <h3 className="text-slate-500 font-bold mb-1">Overall Match</h3>
                <p className="text-3xl font-black text-[#0F172A] break-words">{overallScore}/100</p>
                <p className="text-sm text-green-500 font-semibold mt-2 flex items-center justify-center gap-1 bg-green-50 px-3 py-1.5 rounded-xl text-balance">
                  <Target className="w-4 h-4" /> Top 15%
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4">
              <CircularScore score={atsScore} label="" />
              <div>
                <h3 className="text-slate-500 font-bold mb-1">ATS Compatibility</h3>
                <p className="text-3xl font-black text-[#0F172A] break-words">{atsScore}/100</p>
                <p className="text-sm text-amber-500 font-semibold mt-2 bg-amber-50 px-3 py-1.5 rounded-xl text-balance">
                  Minor formatting tweaks
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4">
              <div className="w-24 h-24 rounded-full bg-orange-50 border-[6px] border-orange-100 flex items-center justify-center text-[#FF5722] shrink-0">
                <IndianRupee className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-slate-500 font-bold mb-1">AI Salary Estimate</h3>
                <p className="text-2xl font-black text-[#0F172A] break-words text-balance">{salaryEstimate.current}</p>
                <p className="text-sm text-[#FF5722] font-semibold mt-2 bg-[#FF5722]/10 px-3 py-1.5 rounded-xl text-balance">
                  Potential: {salaryEstimate.potential}
                </p>
              </div>
            </motion.div>
          </section>

          {/* Section Reviews (Bullet Optimizer) */}
          <motion.section variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#FF5722]" /> Deep Section Analysis
            </h2>
            <div className="space-y-6">
              {sectionReviews.map((review, i) => (
                <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-[#FF5722]/30 transition-all group print:break-inside-avoid">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-[#0F172A]">{review.section}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      review.priority === 'High' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-amber-50 text-amber-600 border-amber-200'
                    }`}>
                      {review.priority} Priority
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Strength</p>
                        <p className="text-sm text-slate-700">{review.strength}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Weakness</p>
                        <p className="text-sm text-slate-700">{review.weakness}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FF5722]/5 border border-[#FF5722]/20 rounded-xl p-4 flex gap-3">
                    <Zap className="w-5 h-5 text-[#FF5722] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#FF5722] uppercase tracking-wider mb-1">AI Suggestion ({review.impact})</p>
                      <p className="text-sm text-slate-800 font-medium">{review.suggestion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Missing Sections */}
          {missingSections.length > 0 && (
            <motion.section variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" /> Missing Opportunities
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {missingSections.map((section, i) => (
                  <div key={i} className="flex gap-3 p-4 border border-dashed border-slate-300 rounded-xl bg-slate-50">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                      <Plus className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-700">{section.section}</h4>
                      <p className="text-xs text-slate-500 mt-1">{section.suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

        </div>

        {/* Right Column - Charts & Keywords */}
        <div className="w-full lg:w-[400px] print:w-full shrink-0 space-y-6 print:space-y-4">
          
          {/* Quality Radar Chart */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-[#0F172A] mb-2">Resume Quality Map</h3>
            <p className="text-xs text-slate-500 mb-6">Visual breakdown of your resume's core components.</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 10, fontWeight: 600 }} />
                  <Radar name="Score" dataKey="A" stroke="#FF5722" fill="#FF5722" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* ATS Analysis Breakdown */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-[#0F172A]">ATS Breakdown</h3>
            
            {Object.entries(atsAnalysis).map(([key, data]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className={data.score >= 80 ? 'text-green-500' : 'text-amber-500'}>{data.score}/100</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${data.score >= 80 ? 'bg-green-500' : 'bg-amber-500'}`}
                    style={{ width: `${data.score}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{data.suggestion}</p>
              </div>
            ))}
          </motion.div>

          {/* Job Fit Predictions */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-500" /> Top Career Matches
            </h3>
            <div className="space-y-3">
              {suitableRoles.map((role, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <span className="text-sm font-semibold text-slate-700">{role.role}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    role.match >= 80 ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {role.match}% Match
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Keyword Intelligence */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-500" /> Keyword Density
            </h3>
            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Missing Critical Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {keywordIntelligence.missing.map(kw => (
                  <span key={kw} className="bg-red-50 text-red-600 border border-red-100 px-2.5 py-1 rounded-md text-xs font-semibold">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Overused Buzzwords (Remove)</h4>
              <div className="flex flex-wrap gap-2">
                {keywordIntelligence.overused.map(kw => (
                  <span key={kw} className="bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-1 rounded-md text-xs font-semibold line-through">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
// Placeholder for Lucide Plus icon
const Plus = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

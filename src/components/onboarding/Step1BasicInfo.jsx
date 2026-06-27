import { Upload } from 'lucide-react';

export default function Step1BasicInfo({ data, updateData }) {
  const handleChange = (e) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-[#F1F5F9] rounded-full border-2 border-dashed border-[#CBD5E1] flex items-center justify-center cursor-pointer hover:border-[#FF5722] hover:bg-[#FF5722]/5 transition-colors group relative overflow-hidden">
          <Upload size={24} className="text-[#94A3B8] group-hover:text-[#FF5722]" />
          <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center transition-all">
            <span className="text-white text-[10px] font-bold uppercase tracking-wider">Upload</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">College Name</label>
          <input 
            type="text" 
            name="college"
            value={data.college || ''}
            onChange={handleChange}
            placeholder="e.g. Graphic Era" 
            className="w-full px-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all shadow-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">University</label>
          <input 
            type="text" 
            name="university"
            value={data.university || ''}
            onChange={handleChange}
            placeholder="e.g. GEU" 
            className="w-full px-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Branch/Major</label>
          <input 
            type="text" 
            name="branch"
            value={data.branch || ''}
            onChange={handleChange}
            placeholder="e.g. Computer Science" 
            className="w-full px-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all shadow-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Year of Graduation</label>
          <select 
            name="year"
            value={data.year || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all shadow-sm appearance-none"
          >
            <option value="">Select Year</option>
            {[2024, 2025, 2026, 2027, 2028].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">City</label>
          <input 
            type="text" 
            name="city"
            value={data.city || ''}
            onChange={handleChange}
            placeholder="e.g. Dehradun" 
            className="w-full px-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all shadow-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">State</label>
          <input 
            type="text" 
            name="state"
            value={data.state || ''}
            onChange={handleChange}
            placeholder="e.g. Uttarakhand" 
            className="w-full px-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all shadow-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Country</label>
          <input 
            type="text" 
            name="country"
            value={data.country || 'India'}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl text-sm text-[#64748B] focus:outline-none shadow-sm"
            readOnly
          />
        </div>
      </div>

    </div>
  );
}

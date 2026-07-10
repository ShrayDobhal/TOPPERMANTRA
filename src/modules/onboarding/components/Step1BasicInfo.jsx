import { useState } from 'react';
import { Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useUser } from '../../../contexts/AuthContext';
import { cn } from '../../../lib/utils';

export default function Step1BasicInfo({ data, updateData }) {
  const { user } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleChange = (e) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileClick = () => {
    document.getElementById('avatar-upload-input').click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image size must be less than 2MB");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar_${Date.now()}.${fileExt}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update state
      updateData({ ...data, avatarUrl: publicUrl });
    } catch (err) {
      console.error("Error uploading avatar:", err);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-8">
        <input 
          type="file" 
          id="avatar-upload-input" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange} 
        />
        <div 
          onClick={handleFileClick}
          className="w-24 h-24 bg-[#F1F5F9] rounded-full border-2 border-dashed border-[#CBD5E1] flex items-center justify-center cursor-pointer hover:border-[#FF5722] hover:bg-[#FF5722]/5 transition-colors group relative overflow-hidden"
        >
          {data.avatarUrl ? (
            <img src={data.avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
          ) : isUploading ? (
            <Loader2 className="w-6 h-6 text-[#FF5722] animate-spin" />
          ) : (
            <Upload size={24} className="text-[#94A3B8] group-hover:text-[#FF5722]" />
          )}
          
          <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center transition-all">
            <span className="text-white text-[10px] font-bold uppercase tracking-wider">
              {isUploading ? 'Uploading...' : 'Upload'}
            </span>
          </div>
        </div>
        {uploadError && (
          <p className="text-xs text-red-500 font-semibold mt-2 flex items-center gap-1">
            <AlertCircle size={12} /> {uploadError}
          </p>
        )}
        {data.avatarUrl && !isUploading && (
          <p className="text-xs text-green-500 font-semibold mt-2 flex items-center gap-1">
            <CheckCircle2 size={12} /> Uploaded successfully
          </p>
        )}
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

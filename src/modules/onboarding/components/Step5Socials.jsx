import { useState } from 'react';
import { Globe, FileText, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useUser } from '../../../contexts/AuthContext';
import { cn } from '../../../lib/utils';

export default function Step5Socials({ data = {}, updateData }) {
  const { user } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [fileName, setFileName] = useState(data.resumeName || null);

  const handleChange = (e) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileClick = () => {
    document.getElementById('resume-upload-input').click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size must be less than 5MB");
      return;
    }

    // Validate extension
    const allowedExts = ['pdf', 'doc', 'docx'];
    const fileExt = file.name.split('.').pop().toLowerCase();
    if (!allowedExts.includes(fileExt)) {
      setUploadError("Invalid file type. Only PDF and Word docs are supported.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const filePath = `${user.id}/resume_${Date.now()}.${fileExt}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      setFileName(file.name);
      // Update state
      updateData({ ...data, resumeUrl: publicUrl, resumeName: file.name });
    } catch (err) {
      console.error("Error uploading resume:", err);
      setUploadError("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full space-y-5">
      
      <div className="space-y-1">
        <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> LinkedIn Profile
        </label>
        <input 
          type="url" 
          name="linkedin"
          value={data.linkedin || ''}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/username" 
          className="w-full px-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all shadow-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg> GitHub Profile
        </label>
        <input 
          type="url" 
          name="github"
          value={data.github || ''}
          onChange={handleChange}
          placeholder="https://github.com/username" 
          className="w-full px-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all shadow-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
          <Globe size={14} className="text-[#3B82F6]" /> Portfolio Website
        </label>
        <input 
          type="url" 
          name="portfolio"
          value={data.portfolio || ''}
          onChange={handleChange}
          placeholder="https://yourwebsite.com" 
          className="w-full px-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all shadow-sm"
        />
      </div>

      <div className="pt-4">
        <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2 mb-2">
          <FileText size={14} className="text-[#FF5722]" /> Resume Upload
        </label>
        
        <input 
          type="file" 
          id="resume-upload-input" 
          accept=".pdf,.doc,.docx" 
          className="hidden" 
          onChange={handleFileChange} 
        />

        <div 
          onClick={handleFileClick}
          className={cn(
            "w-full border-2 border-dashed border-[#CBD5E1] rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-[#FF5722] hover:bg-[#FF5722]/5 transition-all cursor-pointer group",
            isUploading && "pointer-events-none opacity-80"
          )}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-10 h-10 text-[#FF5722] animate-spin mb-3" />
              <p className="text-sm font-bold text-[#0F172A] mb-1">Uploading resume...</p>
            </div>
          ) : fileName ? (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
                <CheckCircle2 size={24} className="text-[#22C55E]" />
              </div>
              <p className="text-sm font-bold text-[#0F172A] mb-1">{fileName}</p>
              <p className="text-xs text-[#64748B]">Click or drag to replace file</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-[#F1F5F9] rounded-full flex items-center justify-center mb-3 group-hover:bg-white group-hover:shadow-sm transition-all">
                <Upload size={20} className="text-[#64748B] group-hover:text-[#FF5722]" />
              </div>
              <p className="text-sm font-bold text-[#0F172A] mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-[#94A3B8]">PDF, DOCX up to 5MB</p>
            </>
          )}
        </div>

        {uploadError && (
          <p className="text-xs text-red-500 font-semibold mt-2 flex items-center gap-1">
            <AlertCircle size={12} /> {uploadError}
          </p>
        )}
      </div>

    </div>
  );
}

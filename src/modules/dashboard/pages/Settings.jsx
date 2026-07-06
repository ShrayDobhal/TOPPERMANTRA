import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Building2, BookOpen, Target, Link as LinkIcon, Camera, Save, Loader2, Shield } from 'lucide-react';
import useStudentStore from '../../../store/useStudentStore';

export default function Settings() {
  const profile = useStudentStore((s) => s.profile);
  const updateProfile = useStudentStore((s) => s.updateProfile);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    college: '',
    branch: '',
    year: '',
    careerGoal: '',
    bio: '',
    githubUrl: '',
    linkedinUrl: ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        email: profile.email || '',
        college: profile.college || '',
        branch: profile.branch || '',
        year: profile.year || '',
        careerGoal: profile.careerGoal || '',
        bio: profile.bio || '',
        githubUrl: profile.githubUrl || '',
        linkedinUrl: profile.linkedinUrl || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');
    try {
      await updateProfile(formData);
      setSaveMessage('Profile updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      setSaveMessage('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarClick = () => {
    alert("Avatar upload will connect to Supabase Storage. (Coming Soon)");
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 pb-20">
      
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0F172A]">Account Settings</h1>
        <p className="text-[#64748B] text-sm mt-1">Manage your public profile and ecosystem preferences.</p>
      </div>

      <div className="bg-white rounded-[24px] border border-[#E9ECEF] shadow-sm overflow-hidden">
        
        {/* Profile Picture Section */}
        <div className="p-8 border-b border-[#E9ECEF] flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF5722] to-[#FF9800] flex items-center justify-center text-white text-3xl font-bold shadow-md">
              {profile?.fullName ? profile.fullName.charAt(0) : 'S'}
            </div>
            <button 
              onClick={handleAvatarClick}
              className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera className="text-white" size={24} />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-[#0F172A] mb-1">Profile Picture</h3>
            <p className="text-sm text-[#64748B] mb-3">Upload a square image, max 2MB.</p>
            <button 
              onClick={handleAvatarClick}
              className="px-4 py-2 bg-[#F1F5F9] text-[#0F172A] text-sm font-bold rounded-xl hover:bg-[#E2E8F0] transition-colors"
            >
              Change Picture
            </button>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSave} className="p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <User size={16} className="text-[#94A3B8]" /> Full Name
              </label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <Mail size={16} className="text-[#94A3B8]" /> Email Address
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                disabled
                className="w-full bg-[#F1F5F9] border border-[#E9ECEF] rounded-xl px-4 py-2.5 text-sm text-[#64748B] cursor-not-allowed"
              />
              <p className="text-[10px] text-[#94A3B8]">Email cannot be changed.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <Building2 size={16} className="text-[#94A3B8]" /> College / University
              </label>
              <input 
                type="text" 
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <BookOpen size={16} className="text-[#94A3B8]" /> Branch
              </label>
              <input 
                type="text" 
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
                placeholder="Computer Science"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <Target size={16} className="text-[#94A3B8]" /> Career Goal
              </label>
              <input 
                type="text" 
                name="careerGoal"
                value={formData.careerGoal}
                onChange={handleChange}
                className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
                placeholder="Software Engineer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0F172A]">Bio</label>
            <textarea 
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <hr className="border-[#E9ECEF]" />

          <h3 className="text-lg font-bold text-[#0F172A] mb-4">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <LinkIcon size={16} className="text-[#94A3B8]" /> GitHub URL
              </label>
              <input 
                type="url" 
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
                placeholder="https://github.com/username"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <LinkIcon size={16} className="text-[#94A3B8]" /> LinkedIn URL
              </label>
              <input 
                type="url" 
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E9ECEF]">
            {saveMessage && (
              <p className={cn(
                "text-sm font-bold animate-in fade-in",
                saveMessage.includes('Failed') ? "text-red-500" : "text-green-500"
              )}>
                {saveMessage}
              </p>
            )}
            <button 
              type="submit" 
              disabled={isSaving}
              className="ml-auto flex items-center gap-2 px-6 py-2.5 bg-[#FF5722] text-white font-bold rounded-xl hover:bg-[#E64A19] transition-colors disabled:opacity-50"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Save Changes
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

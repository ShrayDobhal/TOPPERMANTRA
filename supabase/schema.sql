-- TOPPER MANTRA SUPABASE SCHEMA

-- 1. Create custom types
CREATE TYPE project_status AS ENUM ('Planning', 'Active', 'Completed', 'Paused');
CREATE TYPE task_status AS ENUM ('Backlog', 'In Progress', 'In Review', 'Completed');
CREATE TYPE application_status AS ENUM ('Saved', 'Applied', 'Interview', 'Shortlisted', 'Rejected', 'Offer');
CREATE TYPE user_role AS ENUM ('Student', 'Mentor', 'Admin');

-- 2. Create Profiles Table (extends Supabase Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  role user_role DEFAULT 'Student',
  bio TEXT,
  college TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for Profiles
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 3. Create Projects Table
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  domain TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  status project_status DEFAULT 'Planning',
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  github_url TEXT,
  live_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projects are viewable by everyone." ON public.projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create projects." ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Creators can update their projects." ON public.projects FOR UPDATE USING (auth.uid() = creator_id);

-- 4. Create Opportunities Table (For Discover Hub)
CREATE TABLE public.opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  logo_url TEXT,
  location TEXT,
  type TEXT NOT NULL, -- Internship, Hackathon, etc.
  workplace_type TEXT, -- Remote, Hybrid
  paid_status TEXT, -- Paid, Unpaid
  stipend TEXT,
  duration TEXT,
  deadline TIMESTAMPTZ,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Opportunities are viewable by everyone." ON public.opportunities FOR SELECT USING (true);

-- 5. Create Applications Table (For Application Tracker)
CREATE TABLE public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
  status application_status DEFAULT 'Saved',
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, opportunity_id)
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own applications." ON public.applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own applications." ON public.applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own applications." ON public.applications FOR UPDATE USING (auth.uid() = user_id);

-- Set up Realtime
alter publication supabase_realtime add table public.projects;
alter publication supabase_realtime add table public.applications;

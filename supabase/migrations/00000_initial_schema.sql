-- ==============================================================================================
-- TOPPER MANTRA BACKEND PHASE B1: SUPABASE FOUNDATION
-- 00000_initial_schema.sql
-- ==============================================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For future full text search

-- 2. CUSTOM TYPES (ENUMS)
CREATE TYPE user_role AS ENUM ('STUDENT', 'MENTOR', 'RECRUITER', 'COLLEGE_ADMIN', 'COMPANY_ADMIN', 'ADMIN', 'SUPER_ADMIN');
CREATE TYPE project_status AS ENUM ('PLANNING', 'ACTIVE', 'COMPLETED', 'ARCHIVED');
CREATE TYPE application_status AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'INTERVIEWING', 'OFFERED', 'REJECTED', 'ACCEPTED');
CREATE TYPE opportunity_type AS ENUM ('INTERNSHIP', 'FULL_TIME', 'FREELANCE', 'HACKATHON', 'SCHOLARSHIP', 'RESEARCH');
CREATE TYPE priority_level AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
CREATE TYPE session_status AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- 3. COMMON FUNCTIONS
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ==============================================================================================
-- 4. CORE IDENTITIES MODULE
-- ==============================================================================================

-- PROFILES (Base User Table tied to auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'STUDENT',
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    website TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    twitter_url TEXT,
    is_onboarded BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- STUDENT PROFILES (Extended data for students)
CREATE TABLE student_profiles (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    college_id UUID, -- Foreign key added later when colleges table is created
    graduation_year INT,
    degree TEXT,
    major TEXT,
    cgpa NUMERIC(3,2),
    resume_url TEXT,
    availability_status TEXT DEFAULT 'OPEN_TO_OPPORTUNITIES',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MENTOR PROFILES (Extended data for mentors)
CREATE TABLE mentor_profiles (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    company_id UUID, -- Foreign key added later
    job_title TEXT NOT NULL,
    years_of_experience INT,
    hourly_rate NUMERIC(10,2) DEFAULT 0.00,
    is_accepting_mentees BOOLEAN DEFAULT true,
    rating NUMERIC(2,1) DEFAULT 5.0,
    total_reviews INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- COMPANIES
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    website TEXT,
    industry TEXT,
    description TEXT,
    size TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- COLLEGES
CREATE TABLE colleges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    website TEXT,
    location TEXT,
    tier TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add Foreign Keys
ALTER TABLE student_profiles ADD CONSTRAINT fk_student_college FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE SET NULL;
ALTER TABLE mentor_profiles ADD CONSTRAINT fk_mentor_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL;


-- ==============================================================================================
-- 5. TAXONOMY & GROWTH MODULE
-- ==============================================================================================

CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_skills (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level INT CHECK (proficiency_level BETWEEN 1 AND 5),
    is_verified BOOLEAN DEFAULT false,
    PRIMARY KEY (user_id, skill_id)
);

CREATE TABLE career_tracks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    track_id UUID REFERENCES career_tracks(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    difficulty TEXT,
    estimated_weeks INT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE roadmap_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    order_index INT NOT NULL,
    resource_urls JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_progress (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    step_id UUID REFERENCES roadmap_steps(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'NOT_STARTED',
    completed_at TIMESTAMPTZ,
    PRIMARY KEY (user_id, step_id)
);

-- ==============================================================================================
-- 6. PROJECTS MODULE
-- ==============================================================================================

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    repository_url TEXT,
    demo_url TEXT,
    thumbnail_url TEXT,
    status project_status DEFAULT 'PLANNING',
    is_public BOOLEAN DEFAULT true,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE project_members (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'MEMBER',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (project_id, user_id)
);

CREATE TABLE project_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'TODO',
    priority priority_level DEFAULT 'MEDIUM',
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    due_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE task_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID REFERENCES project_tasks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================================
-- 7. COMMUNITY & SPACES MODULE
-- ==============================================================================================

CREATE TABLE spaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    avatar_url TEXT,
    cover_url TEXT,
    is_private BOOLEAN DEFAULT false,
    college_id UUID REFERENCES colleges(id) ON DELETE CASCADE, -- Optional, for college-specific spaces
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE space_members (
    space_id UUID REFERENCES spaces(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'MEMBER',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (space_id, user_id)
);

CREATE TABLE space_channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    space_id UUID REFERENCES spaces(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT DEFAULT 'TEXT',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel_id UUID REFERENCES space_channels(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    attachments JSONB DEFAULT '[]',
    parent_id UUID REFERENCES messages(id) ON DELETE CASCADE, -- For threading
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE message_reactions (
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    emoji TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (message_id, user_id, emoji)
);

-- ==============================================================================================
-- 8. DISCOVER (OPPORTUNITIES) MODULE
-- ==============================================================================================

CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type opportunity_type NOT NULL,
    location TEXT,
    is_remote BOOLEAN DEFAULT false,
    description TEXT NOT NULL,
    requirements TEXT,
    stipend_salary_range TEXT,
    deadline TIMESTAMPTZ,
    status TEXT DEFAULT 'OPEN',
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    status application_status DEFAULT 'SUBMITTED',
    resume_url TEXT,
    cover_letter TEXT,
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(opportunity_id, user_id)
);

CREATE TABLE saved_opportunities (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, opportunity_id)
);

-- ==============================================================================================
-- 9. SYSTEM & NOTIFICATIONS MODULE
-- ==============================================================================================

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    link_url TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================================
-- 10. TRIGGERS
-- ==============================================================================================

CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER set_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER set_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==============================================================================================
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can view profiles, but users can only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Projects: Public projects viewable by everyone, creators/members can update
CREATE POLICY "Public projects are viewable by everyone" ON projects FOR SELECT USING (is_public = true OR auth.uid() IN (SELECT user_id FROM project_members WHERE project_id = projects.id));
CREATE POLICY "Creators can insert projects" ON projects FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Creators and members can update projects" ON projects FOR UPDATE USING (auth.uid() IN (SELECT user_id FROM project_members WHERE project_id = projects.id) OR auth.uid() = created_by);

-- Messages: Only space members can view and insert messages
CREATE POLICY "Space members can view messages" ON messages FOR SELECT USING (
    auth.uid() IN (
        SELECT user_id FROM space_members sm 
        JOIN space_channels sc ON sm.space_id = sc.space_id 
        WHERE sc.id = messages.channel_id
    )
);
CREATE POLICY "Space members can insert messages" ON messages FOR INSERT WITH CHECK (
    auth.uid() IN (
        SELECT user_id FROM space_members sm 
        JOIN space_channels sc ON sm.space_id = sc.space_id 
        WHERE sc.id = messages.channel_id
    )
);

-- ==============================================================================================
-- 12. STORAGE BUCKETS
-- ==============================================================================================
-- Note: In a real Supabase migration, buckets are inserted into the storage schema.
INSERT INTO storage.buckets (id, name, public) VALUES 
('avatars', 'avatars', true),
('project-images', 'project-images', true),
('project-files', 'project-files', false),
('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Set up storage RLS (example for avatars)
CREATE POLICY "Avatar images are publicly accessible." ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Anyone can upload an avatar." ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid() = owner);
CREATE POLICY "Anyone can update their own avatar." ON storage.objects FOR UPDATE USING (auth.uid() = owner) WITH CHECK (bucket_id = 'avatars');

-- ==============================================================================================
-- 13. REALTIME PUBLICATION
-- ==============================================================================================
-- Supabase realtime requires tables to be added to the publication
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime FOR TABLE messages, notifications, project_updates, space_channels;
  ELSE
    ALTER PUBLICATION supabase_realtime ADD TABLE messages, notifications, project_updates, space_channels;
  END IF;
END
$$;

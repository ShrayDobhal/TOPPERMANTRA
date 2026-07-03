-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Linked to Supabase Auth)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  last_name text,
  email text unique,
  college text,
  branch text,
  year text,
  career_goal text,
  
  -- Gamification
  level integer default 1,
  xp integer default 0,
  streak integer default 0,
  active_claims integer default 0,
  max_claims integer default 2,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PROJECTS TABLE (The Project Forge Hub)
create table projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  mentor_name text,
  mentor_institution text,
  branch text,
  difficulty text, -- Beginner, Intermediate, Advanced
  tech_stack text[], -- Array of strings
  cover_gradient text,
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. TASKS TABLE (Subparts of Projects)
create table tasks (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
  title text not null,
  description text not null,
  difficulty text,
  estimated_hours integer,
  xp_reward integer,
  status text default 'available', -- available, claimed, submitted, completed
  
  claimed_by uuid references profiles(id) on delete set null,
  claimed_at timestamp with time zone,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ROW LEVEL SECURITY (RLS) POLICIES
alter table profiles enable row level security;
alter table projects enable row level security;
alter table tasks enable row level security;

-- Profiles: Anyone can read profiles, but users can only update their own
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Projects: Anyone can view active projects
create policy "Projects are viewable by everyone." on projects for select using (true);

-- Tasks: Anyone can view tasks, users can update tasks they have claimed
create policy "Tasks are viewable by everyone." on tasks for select using (true);
create policy "Users can update their claimed tasks." on tasks for update using (auth.uid() = claimed_by or claimed_by is null);

-- TRIGGERS: Automatically create a profile when a new user signs up
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

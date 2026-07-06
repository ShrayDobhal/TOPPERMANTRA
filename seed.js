import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env file directly
const envPath = path.resolve(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim();
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const forgeProjects = [
  {
    title: 'Food Delivery App',
    description: 'Full-stack food delivery platform with real-time order tracking, payment integration, and restaurant management.',
    domain: 'Full Stack',
    difficulty: 'Advanced',
    creator_id: null,
    github_url: null,
    live_url: null,
    status: 'Active'
  },
  {
    title: 'AI Resume Analyzer',
    description: 'NLP-powered resume parser that grades resumes against JD requirements with actionable feedback.',
    domain: 'AI/ML',
    difficulty: 'Advanced',
    creator_id: null,
    github_url: null,
    live_url: null,
    status: 'Active'
  },
  {
    title: 'Campus Event Manager',
    description: 'Complete event management platform for college tech fests with registration, ticketing, and live dashboards.',
    domain: 'Web Development',
    difficulty: 'Intermediate',
    creator_id: null,
    github_url: null,
    live_url: null,
    status: 'Active'
  }
];

const subpartsData = [
  { title: 'User Authentication & JWT', description: 'Secure registration, login, password reset with JWT.', difficulty: 'Intermediate', estimated_hours: 12, xp_reward: 200, status: 'Backlog' },
  { title: 'Database Schema & Prisma Setup', description: 'Complete database schema for the platform.', difficulty: 'Intermediate', estimated_hours: 8, xp_reward: 150, status: 'Backlog' },
  { title: 'Payment Gateway Integration', description: 'Stripe payment with checkout flow, success/failure handling.', difficulty: 'Advanced', estimated_hours: 16, xp_reward: 300, status: 'Backlog' },
  { title: 'Search & Filter Module', description: 'Restaurant/menu search with cuisine, price, rating filters.', difficulty: 'Intermediate', estimated_hours: 10, xp_reward: 200, status: 'Backlog' },
  { title: 'Real-time Order Tracking', description: 'WebSocket-based order status with map integration.', difficulty: 'Advanced', estimated_hours: 20, xp_reward: 350, status: 'Backlog' },
  { title: 'Cart & Checkout Flow', description: 'Shopping cart with multi-step checkout.', difficulty: 'Intermediate', estimated_hours: 14, xp_reward: 250, status: 'Backlog' },
  { title: 'Restaurant Review System', description: 'Star ratings, text reviews, photo uploads.', difficulty: 'Beginner', estimated_hours: 8, xp_reward: 150, status: 'Backlog' },
  { title: 'Admin Dashboard', description: 'Restaurant owner dashboard for menus, orders, revenue.', difficulty: 'Advanced', estimated_hours: 18, xp_reward: 300, status: 'Backlog' }
];

async function seed() {
  console.log("Seeding Supabase...");
  // Clear existing
  await supabase.from('project_tasks').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  for (const proj of forgeProjects) {
    const { data: insertedProj, error: err1 } = await supabase.from('projects').insert(proj).select();
    if (err1) {
      console.error(err1);
      continue;
    }
    const projectId = insertedProj[0].id;
    
    // Add subparts for this project
    const tasksToInsert = subpartsData.map(s => ({ ...s, project_id: projectId }));
    const { error: err2 } = await supabase.from('project_tasks').insert(tasksToInsert);
    if (err2) {
      console.error(err2);
    } else {
      console.log(`Inserted project ${proj.title} with tasks.`);
    }
  }
  console.log("Seeding Complete!");
}

seed();


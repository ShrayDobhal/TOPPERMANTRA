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
    mentor_name: 'Dr. Amit Kumar', 
    mentor_institution: 'IIT Delhi',
    status: 'active', branch: 'CS/IT',
    tech_stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Socket.io'],
    difficulty: 'Advanced',
    cover_gradient: 'from-[#FF5722] to-[#FF9800]',
  },
  {
    title: 'AI Resume Analyzer',
    description: 'NLP-powered resume parser that grades resumes against JD requirements with actionable feedback.',
    mentor_name: 'Prof. Meera Sharma', 
    mentor_institution: 'IIT Bombay',
    status: 'active', branch: 'CS/IT',
    tech_stack: ['Python', 'FastAPI', 'React', 'OpenAI', 'spaCy'],
    difficulty: 'Advanced',
    cover_gradient: 'from-[#A855F7] to-[#6366F1]',
  },
  {
    title: 'Campus Event Manager',
    description: 'Complete event management platform for college tech fests with registration, ticketing, and live dashboards.',
    mentor_name: 'Dr. Rajesh Gupta', 
    mentor_institution: 'IIT Kanpur',
    status: 'active', branch: 'CS/IT',
    tech_stack: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind'],
    difficulty: 'Intermediate',
    cover_gradient: 'from-[#22C55E] to-[#14B8A6]',
  }
];

const subpartsData = [
  { title: 'User Authentication & JWT', description: 'Secure registration, login, password reset with JWT.', difficulty: 'Intermediate', estimated_hours: 12, xp_reward: 200 },
  { title: 'Database Schema & Prisma Setup', description: 'Complete database schema for the platform.', difficulty: 'Intermediate', estimated_hours: 8, xp_reward: 150 },
  { title: 'Payment Gateway Integration', description: 'Stripe payment with checkout flow, success/failure handling.', difficulty: 'Advanced', estimated_hours: 16, xp_reward: 300 },
  { title: 'Search & Filter Module', description: 'Restaurant/menu search with cuisine, price, rating filters.', difficulty: 'Intermediate', estimated_hours: 10, xp_reward: 200 },
  { title: 'Real-time Order Tracking', description: 'WebSocket-based order status with map integration.', difficulty: 'Advanced', estimated_hours: 20, xp_reward: 350 },
  { title: 'Cart & Checkout Flow', description: 'Shopping cart with multi-step checkout.', difficulty: 'Intermediate', estimated_hours: 14, xp_reward: 250 },
  { title: 'Restaurant Review System', description: 'Star ratings, text reviews, photo uploads.', difficulty: 'Beginner', estimated_hours: 8, xp_reward: 150 },
  { title: 'Admin Dashboard', description: 'Restaurant owner dashboard for menus, orders, revenue.', difficulty: 'Advanced', estimated_hours: 18, xp_reward: 300 }
];

async function seed() {
  console.log("Seeding Supabase...");
  // Clear existing
  await supabase.from('tasks').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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
    const { error: err2 } = await supabase.from('tasks').insert(tasksToInsert);
    if (err2) {
      console.error(err2);
    } else {
      console.log(`Inserted project ${proj.title} with tasks.`);
    }
  }
  console.log("Seeding Complete!");
}

seed();

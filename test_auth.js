import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim();
});

const supabase = createClient(envVars.VITE_SUPABASE_URL, envVars.VITE_SUPABASE_ANON_KEY);

async function testAuth() {
  console.log("Testing Auth...");
  
  const testEmail = `test_${Date.now()}@example.com`;
  console.log(`Signing up with ${testEmail}...`);
  
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: testEmail,
    password: 'password123',
    options: {
      data: {
        first_name: 'Test',
        last_name: 'User'
      }
    }
  });

  if (signUpError) {
    console.error("Signup failed:", signUpError.message);
    return;
  }
  
  console.log("Signup success! User ID:", signUpData.user?.id);
  console.log("Session:", !!signUpData.session ? "Active session returned!" : "NO SESSION RETURNED (Email confirmation might still be on!)");
  
  // Try to login right away
  console.log("Attempting to login...");
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: 'password123',
  });
  
  if (loginError) {
    console.error("Login failed:", loginError.message);
  } else {
    console.log("Login success! Session active.");
  }
}

testAuth();

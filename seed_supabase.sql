-- Insert Mock Projects
INSERT INTO public.projects (title, description, mentor_name, mentor_institution, branch, difficulty, tech_stack, cover_gradient, status)
VALUES
('Food Delivery App', 'Full-stack food delivery platform with real-time order tracking, payment integration, and restaurant management.', 'Dr. Amit Kumar', 'IIT Delhi', 'CS/IT', 'Advanced', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Socket.io'], 'from-[#FF5722] to-[#FF9800]', 'active'),
('AI Resume Analyzer', 'NLP-powered resume parser that grades resumes against JD requirements with actionable feedback.', 'Prof. Meera Sharma', 'IIT Bombay', 'CS/IT', 'Advanced', ARRAY['Python', 'FastAPI', 'React', 'OpenAI', 'spaCy'], 'from-[#A855F7] to-[#6366F1]', 'active'),
('Campus Event Manager', 'Complete event management platform for college tech fests with registration, ticketing, and live dashboards.', 'Dr. Rajesh Gupta', 'IIT Kanpur', 'CS/IT', 'Intermediate', ARRAY['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind'], 'from-[#22C55E] to-[#14B8A6]', 'active');

-- Insert Mock Tasks (subparts) for the first project (Food Delivery App)
DO $$
DECLARE
    project1_id UUID;
BEGIN
    SELECT id INTO project1_id FROM public.projects WHERE title = 'Food Delivery App' LIMIT 1;
    
    INSERT INTO public.tasks (project_id, title, description, difficulty, estimated_hours, xp_reward, status)
    VALUES
    (project1_id, 'User Authentication & JWT', 'Secure registration, login, password reset with JWT.', 'Intermediate', 12, 200, 'available'),
    (project1_id, 'Database Schema & Prisma Setup', 'Complete database schema for the platform.', 'Intermediate', 8, 150, 'available'),
    (project1_id, 'Payment Gateway Integration', 'Stripe payment with checkout flow, success/failure handling.', 'Advanced', 16, 300, 'available'),
    (project1_id, 'Search & Filter Module', 'Restaurant/menu search with cuisine, price, rating filters.', 'Intermediate', 10, 200, 'available'),
    (project1_id, 'Real-time Order Tracking', 'WebSocket-based order status with map integration.', 'Advanced', 20, 350, 'available'),
    (project1_id, 'Cart & Checkout Flow', 'Shopping cart with multi-step checkout.', 'Intermediate', 14, 250, 'available'),
    (project1_id, 'Restaurant Review System', 'Star ratings, text reviews, photo uploads.', 'Beginner', 8, 150, 'available'),
    (project1_id, 'Admin Dashboard', 'Restaurant owner dashboard for menus, orders, revenue.', 'Advanced', 18, 300, 'available');
END $$;

-- Clear existing
DELETE FROM public.project_tasks;
DELETE FROM public.projects;

-- Insert Mock Projects
INSERT INTO public.projects (id, title, description, domain, difficulty, status)
VALUES
('11111111-1111-1111-1111-111111111111', 'Food Delivery App', 'Full-stack food delivery platform with real-time order tracking, payment integration, and restaurant management.', 'Full Stack', 'Advanced', 'Active'),
('22222222-2222-2222-2222-222222222222', 'AI Resume Analyzer', 'NLP-powered resume parser that grades resumes against JD requirements with actionable feedback.', 'AI/ML', 'Advanced', 'Active'),
('33333333-3333-3333-3333-333333333333', 'Campus Event Manager', 'Complete event management platform for college tech fests with registration, ticketing, and live dashboards.', 'Web Development', 'Intermediate', 'Active');

-- Insert Mock Tasks (subparts) for the first project (Food Delivery App)
INSERT INTO public.project_tasks (project_id, title, description, difficulty, estimated_hours, xp_reward, status)
VALUES
('11111111-1111-1111-1111-111111111111', 'User Authentication & JWT', 'Secure registration, login, password reset with JWT.', 'Intermediate', 12, 200, 'Backlog'),
('11111111-1111-1111-1111-111111111111', 'Database Schema & Prisma Setup', 'Complete database schema for the platform.', 'Intermediate', 8, 150, 'Backlog'),
('11111111-1111-1111-1111-111111111111', 'Payment Gateway Integration', 'Stripe payment with checkout flow, success/failure handling.', 'Advanced', 16, 300, 'Backlog'),
('11111111-1111-1111-1111-111111111111', 'Search & Filter Module', 'Restaurant/menu search with cuisine, price, rating filters.', 'Intermediate', 10, 200, 'Backlog'),
('11111111-1111-1111-1111-111111111111', 'Real-time Order Tracking', 'WebSocket-based order status with map integration.', 'Advanced', 20, 350, 'Backlog'),
('11111111-1111-1111-1111-111111111111', 'Cart & Checkout Flow', 'Shopping cart with multi-step checkout.', 'Intermediate', 14, 250, 'Backlog'),
('11111111-1111-1111-1111-111111111111', 'Restaurant Review System', 'Star ratings, text reviews, photo uploads.', 'Beginner', 8, 150, 'Backlog'),
('11111111-1111-1111-1111-111111111111', 'Admin Dashboard', 'Restaurant owner dashboard for menus, orders, revenue.', 'Advanced', 18, 300, 'Backlog');


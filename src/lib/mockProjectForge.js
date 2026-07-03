// ============================================================
// Mock Project Forge Data — PRD Pillar 2: The Project Forge
// ============================================================

export const forgeProjects = [
  {
    id: 'proj-001', title: 'Food Delivery App',
    description: 'Full-stack food delivery platform with real-time order tracking, payment integration, and restaurant management.',
    mentor: { name: 'Dr. Amit Kumar', institution: 'IIT Delhi' },
    status: 'active', branch: 'CS/IT',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Socket.io'],
    difficulty: 'Advanced', createdAt: '2026-06-01',
    lastSubmissionAt: '2026-07-01', totalSubparts: 8,
    completedSubparts: 2, claimedSubparts: 3, availableSubparts: 3,
    contributors: 5, coverGradient: 'from-[#FF5722] to-[#FF9800]',
  },
  {
    id: 'proj-002', title: 'AI Resume Analyzer',
    description: 'NLP-powered resume parser that grades resumes against JD requirements with actionable feedback.',
    mentor: { name: 'Prof. Meera Sharma', institution: 'IIT Bombay' },
    status: 'active', branch: 'CS/IT',
    techStack: ['Python', 'FastAPI', 'React', 'OpenAI', 'spaCy'],
    difficulty: 'Advanced', createdAt: '2026-06-10',
    lastSubmissionAt: '2026-06-28', totalSubparts: 6,
    completedSubparts: 1, claimedSubparts: 2, availableSubparts: 3,
    contributors: 3, coverGradient: 'from-[#A855F7] to-[#6366F1]',
  },
  {
    id: 'proj-003', title: 'Campus Event Manager',
    description: 'Complete event management platform for college tech fests with registration, ticketing, and live dashboards.',
    mentor: { name: 'Dr. Rajesh Gupta', institution: 'IIT Kanpur' },
    status: 'active', branch: 'CS/IT',
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind'],
    difficulty: 'Intermediate', createdAt: '2026-06-15',
    lastSubmissionAt: '2026-07-02', totalSubparts: 5,
    completedSubparts: 3, claimedSubparts: 1, availableSubparts: 1,
    contributors: 4, coverGradient: 'from-[#22C55E] to-[#14B8A6]',
  },
  {
    id: 'proj-004', title: 'Smart Bridge Monitor',
    description: 'IoT-based structural health monitoring system for bridges using strain gauges and real-time dashboards.',
    mentor: { name: 'Dr. Sunil Verma', institution: 'IIT Roorkee' },
    status: 'active', branch: 'Civil',
    techStack: ['AutoCAD', 'Python', 'IoT Sensors', 'Grafana'],
    difficulty: 'Advanced', createdAt: '2026-06-20',
    lastSubmissionAt: '2026-06-25', totalSubparts: 4,
    completedSubparts: 0, claimedSubparts: 2, availableSubparts: 2,
    contributors: 2, coverGradient: 'from-[#F59E0B] to-[#EF4444]',
  },
];

export const projectSubparts = {
  'proj-001': [
    { id: 'sub-001', projectId: 'proj-001', title: 'User Authentication & JWT', description: 'Secure registration, login, password reset with JWT.', status: 'completed', difficulty: 'Intermediate', estimatedHours: 12, claimedBy: { id: 'mem-001', name: 'Aarav K.' }, completedAt: '2026-06-12', mergedBy: 'Dr. Amit Kumar', xpReward: 200 },
    { id: 'sub-002', projectId: 'proj-001', title: 'Database Schema & Prisma Setup', description: 'Complete database schema for the platform.', status: 'completed', difficulty: 'Intermediate', estimatedHours: 8, claimedBy: { id: 'mem-005', name: 'Vikram T.' }, completedAt: '2026-06-10', mergedBy: 'Dr. Amit Kumar', xpReward: 150 },
    { id: 'sub-003', projectId: 'proj-001', title: 'Payment Gateway Integration', description: 'Stripe payment with checkout flow, success/failure handling.', status: 'claimed', difficulty: 'Advanced', estimatedHours: 16, claimedBy: { id: 'stu-001', name: 'Shray D.' }, claimedAt: '2026-06-28', dueDate: '2026-07-06', daysLeft: 3, lastUpload: null, hasAidRequest: false, xpReward: 300 },
    { id: 'sub-004', projectId: 'proj-001', title: 'Search & Filter Module', description: 'Restaurant/menu search with cuisine, price, rating filters.', status: 'claimed', difficulty: 'Intermediate', estimatedHours: 10, claimedBy: { id: 'mem-002', name: 'Priya M.' }, claimedAt: '2026-07-01', dueDate: '2026-07-09', daysLeft: 6, lastUpload: '2026-07-02', hasAidRequest: false, xpReward: 200 },
    { id: 'sub-005', projectId: 'proj-001', title: 'Real-time Order Tracking', description: 'WebSocket-based order status with map integration.', status: 'claimed', difficulty: 'Advanced', estimatedHours: 20, claimedBy: { id: 'mem-010', name: 'Meera V.' }, claimedAt: '2026-06-25', dueDate: '2026-07-03', daysLeft: 0, lastUpload: null, hasAidRequest: true, xpReward: 350, flagged: true },
    { id: 'sub-006', projectId: 'proj-001', title: 'Cart & Checkout Flow', description: 'Shopping cart with multi-step checkout.', status: 'available', difficulty: 'Intermediate', estimatedHours: 14, waitlistCount: 2, xpReward: 250 },
    { id: 'sub-007', projectId: 'proj-001', title: 'Restaurant Review System', description: 'Star ratings, text reviews, photo uploads.', status: 'available', difficulty: 'Beginner', estimatedHours: 8, waitlistCount: 0, xpReward: 150 },
    { id: 'sub-008', projectId: 'proj-001', title: 'Admin Dashboard', description: 'Restaurant owner dashboard for menus, orders, revenue.', status: 'available', difficulty: 'Advanced', estimatedHours: 18, waitlistCount: 1, xpReward: 300 },
  ],
};

export const aidRequests = [
  { id: 'aid-001', subpartId: 'sub-005', userId: 'mem-010', userName: 'Meera V.', type: 'video', description: 'Stuck on WebSocket heartbeat mechanism. Connection drops after 30s.', status: 'open', createdAt: '2026-07-01', responses: 1 },
];

export const submissions = [
  { id: 'submit-001', subpartId: 'sub-001', userId: 'mem-001', userName: 'Aarav K.', codeUrl: 'https://github.com/aarav/food-app-auth', status: 'approved', reviewedBy: 'Dr. Amit Kumar', reviewNote: 'Excellent JWT refresh flow.', submittedAt: '2026-06-11', reviewedAt: '2026-06-12' },
  { id: 'submit-002', subpartId: 'sub-002', userId: 'mem-005', userName: 'Vikram T.', codeUrl: 'https://github.com/vikram/food-app-db', status: 'approved', reviewedBy: 'Dr. Amit Kumar', reviewNote: 'Good schema design.', submittedAt: '2026-06-09', reviewedAt: '2026-06-10' },
];

export const waitlists = {
  'sub-006': [
    { userId: 'mem-008', userName: 'Diya B.', position: 1 },
    { userId: 'mem-015', userName: 'Amit A.', position: 2 },
  ],
  'sub-008': [
    { userId: 'mem-020', userName: 'Simran I.', position: 1 },
  ],
};

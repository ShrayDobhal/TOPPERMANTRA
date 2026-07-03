// ============================================================
// Mock Hub Data — PRD Pillar 3: Community Hub
// ============================================================

export const channels = [
  { id: 'ch-cs', name: 'CS/IT', branch: 'CS/IT', type: 'branch', members: 1240, postsToday: 18 },
  { id: 'ch-mech', name: 'Mechanical', branch: 'Mechanical', type: 'branch', members: 650, postsToday: 7 },
  { id: 'ch-civil', name: 'Civil', branch: 'Civil', type: 'branch', members: 430, postsToday: 4 },
  { id: 'ch-eee', name: 'Electrical', branch: 'Electrical', type: 'branch', members: 380, postsToday: 5 },
  { id: 'ch-global', name: 'Global', branch: null, type: 'global', members: 3200, postsToday: 42 },
];

export const postTags = ['Doubt', 'Resource', 'Showcase', 'Discussion'];

export const hubPosts = [
  {
    id: 'post-001', channelId: 'ch-cs', tag: 'Discussion',
    title: 'What is the best state management for React in 2026?',
    content: 'I have been using Redux for a while but Zustand seems much simpler. What are your experiences with large-scale apps?',
    author: { id: 'mem-001', name: 'Aarav K.', level: 5, contributionScore: 2800 },
    upvotes: 34, comments: 12, createdAt: '2026-07-02T10:00:00',
  },
  {
    id: 'post-002', channelId: 'ch-cs', tag: 'Doubt',
    title: 'Why does useEffect run twice in React 18 Strict Mode?',
    content: 'My API call fires twice on mount in development. Is this a bug or expected behavior?',
    author: { id: 'mem-004', name: 'Sneha D.', level: 3, contributionScore: 1200 },
    upvotes: 22, comments: 8, createdAt: '2026-07-02T14:30:00',
  },
  {
    id: 'post-003', channelId: 'ch-cs', tag: 'Resource',
    title: 'Free System Design Course by MIT (2026 Edition)',
    content: 'MIT just released their updated distributed systems course for free. Covers consensus, replication, and fault tolerance.',
    author: { id: 'mem-005', name: 'Vikram T.', level: 6, contributionScore: 3100 },
    upvotes: 89, comments: 15, createdAt: '2026-07-01T09:00:00',
  },
  {
    id: 'post-004', channelId: 'ch-cs', tag: 'Showcase',
    title: 'I built a real-time collaborative code editor',
    content: 'Used CRDTs + WebSockets to build a Google Docs-like code editor. Here is the demo and source code.',
    author: { id: 'stu-001', name: 'Shray D.', level: 8, contributionScore: 2480 },
    upvotes: 56, comments: 20, createdAt: '2026-06-30T16:00:00', isCurrentUser: true,
  },
  {
    id: 'post-005', channelId: 'ch-global', tag: 'Discussion',
    title: 'Mechanical Engineers: How are you using AI in your field?',
    content: 'Curious to hear from non-CS branches. Are you using any ML/AI tools in mechanical design or manufacturing?',
    author: { id: 'mem-030', name: 'Gaurav G.', level: 4, contributionScore: 1800 },
    upvotes: 41, comments: 18, createdAt: '2026-07-01T11:00:00',
  },
];

export const postComments = {
  'post-001': [
    { id: 'cmt-001', postId: 'post-001', author: { name: 'Priya M.', level: 4 }, content: 'Zustand is the way to go for 90% of apps. Redux Toolkit only if you need middleware-heavy patterns.', upvotes: 18, createdAt: '2026-07-02T10:30:00' },
    { id: 'cmt-002', postId: 'post-001', author: { name: 'Shray D.', level: 8 }, content: 'I use Zustand for client state and TanStack Query for server state. Best combo in 2026.', upvotes: 24, createdAt: '2026-07-02T11:00:00', isCurrentUser: true },
    { id: 'cmt-003', postId: 'post-001', author: { name: 'Vikram T.', level: 6 }, content: 'Jotai is underrated. Atomic state model works great for complex forms.', upvotes: 8, createdAt: '2026-07-02T12:00:00' },
  ],
};

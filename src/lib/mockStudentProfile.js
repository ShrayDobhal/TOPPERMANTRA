// ============================================================
// Mock Student Profile — The logged-in student's full data
// Used by useStudentStore and Dashboard Mission Control
// ============================================================

export const currentStudent = {
  id: 'stu-001',
  fullName: 'Shray Dobhal',
  email: 'shray@upes.ac.in',
  profileImage: null,
  college: 'UPES Dehradun',
  university: 'UPES',
  branch: 'CS/IT',
  year: '3rd Year',
  city: 'Dehradun',
  state: 'Uttarakhand',
  careerGoal: 'AI Engineer',

  // ---- The Currency ----
  contributionScore: 2480,
  
  // ---- Streak ----
  streak: 21,
  longestStreak: 34,
  lastActiveAt: new Date().toISOString(),
  
  // ---- Ranking ----
  cohortRank: 14,
  globalRank: 87,
  
  // ---- Level & XP ----
  level: 8,
  xp: 2480,
  xpToNextLevel: 3000,
  
  // ---- Cohort ----
  cohortId: 'cohort-cs-01',
  cohortName: 'CS/IT Cohort Alpha',
  cohortStatus: 'active', // active | yellow | red | removed
  
  // ---- Project Claims ----
  activeClaims: 2, // max 2
  maxClaims: 2,
  
  // ---- Community ----
  communityLevel: 3,
  postsToday: 1,
  maxPostsPerDay: 5, // Level 3 = 5 posts/day
  
  // ---- Freeze ----
  freezeActive: false,
  freezeEndDate: null,
  
  // ---- Flags ----
  hasYellowFlag: false,
  hasRedFlag: false,
  yellowFlagDate: null,

  // ---- Health Score ----
  healthScore: 92,
};

// ---- Upcoming Deadlines ----
export const upcomingDeadlines = [
  {
    id: 'dl-1',
    projectTitle: 'Food Delivery App',
    subpartTitle: 'Payment Gateway Integration',
    dueDate: '2026-07-06T23:59:00',
    daysLeft: 3,
    status: 'in-progress',
    urgency: 'high', // high (<=3 days), medium (4-7), low (>7)
  },
  {
    id: 'dl-2',
    projectTitle: 'AI Resume Analyzer',
    subpartTitle: 'NLP Pipeline Setup',
    dueDate: '2026-07-10T23:59:00',
    daysLeft: 7,
    status: 'in-progress',
    urgency: 'medium',
  },
];

// ---- Custodian Alerts (from the 2 AM bot) ----
export const custodianAlerts = [
  {
    id: 'alert-1',
    type: 'nudge', // nudge | warning | removal | badge | streak
    title: 'You seem stuck on Payment Gateway',
    message: 'No code uploaded in 3 days. Click here to Request Aid.',
    action: 'request-aid',
    actionLabel: 'Request Aid',
    subpartId: 'sub-003',
    createdAt: '2026-07-03T02:00:00',
    isRead: false,
  },
  {
    id: 'alert-2',
    type: 'badge',
    title: 'New Badge Earned!',
    message: 'You earned the "First Blood" badge for your first merged subpart.',
    action: 'view-badge',
    actionLabel: 'View Badge',
    badgeId: 'badge-first-blood',
    createdAt: '2026-07-02T02:00:00',
    isRead: false,
  },
  {
    id: 'alert-3',
    type: 'streak',
    title: 'Streak on Fire!',
    message: 'You are on a 21-day streak. Keep going to unlock Streak Master badge at 30 days.',
    action: null,
    actionLabel: null,
    createdAt: '2026-07-03T02:00:00',
    isRead: true,
  },
];

// ---- Recent Activity ----
export const recentActivity = [
  { id: 'act-1', text: 'Submitted Payment Gateway code for review', time: '2 hours ago', type: 'submission' },
  { id: 'act-2', text: 'Replied to Weekly Challenge in CS/IT Cohort', time: '5 hours ago', type: 'cohort' },
  { id: 'act-3', text: 'Upvoted answer in "React State Management" thread', time: 'Yesterday', type: 'community' },
  { id: 'act-4', text: 'Claimed "NLP Pipeline Setup" in AI Resume Analyzer', time: '2 days ago', type: 'project' },
  { id: 'act-5', text: 'Earned "First Blood" badge', time: '3 days ago', type: 'badge' },
  { id: 'act-6', text: 'Merged User Auth subpart in Food Delivery App', time: '4 days ago', type: 'merge' },
];

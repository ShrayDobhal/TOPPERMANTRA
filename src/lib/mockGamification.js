// ============================================================
// Mock Gamification Data — Profile, Badges, Leaderboard
// Maps to PRD: Profile & Gamification Engine
// ============================================================

export const badgeDefinitions = [
  { id: 'badge-code-ninja', name: 'Code Ninja', description: 'Merged 5 subparts', icon: '⚔️', criteria: { type: 'mergedSubparts', threshold: 5 }, color: 'from-[#EF4444] to-[#DC2626]' },
  { id: 'badge-guardian', name: 'Community Guardian', description: 'Gave 50 useful upvotes', icon: '🛡️', criteria: { type: 'upvotesGiven', threshold: 50 }, color: 'from-[#3B82F6] to-[#2563EB]' },
  { id: 'badge-survivor', name: 'Survivor', description: 'Completed a project without auto-removal', icon: '🏆', criteria: { type: 'projectCompleteNoRemoval', threshold: 1 }, color: 'from-[#F59E0B] to-[#D97706]' },
  { id: 'badge-first-blood', name: 'First Blood', description: 'First merged subpart', icon: '🩸', criteria: { type: 'mergedSubparts', threshold: 1 }, color: 'from-[#EC4899] to-[#DB2777]' },
  { id: 'badge-mentors-pick', name: "Mentor's Pick", description: '3 mentor-approved submissions in a row', icon: '⭐', criteria: { type: 'consecutiveApprovals', threshold: 3 }, color: 'from-[#A855F7] to-[#9333EA]' },
  { id: 'badge-streak-master', name: 'Streak Master', description: '30-day unbroken streak', icon: '🔥', criteria: { type: 'streak', threshold: 30 }, color: 'from-[#FF5722] to-[#E64A19]' },
  { id: 'badge-helping-hand', name: 'Helping Hand', description: '10 aid responses answered', icon: '🤝', criteria: { type: 'aidResponses', threshold: 10 }, color: 'from-[#22C55E] to-[#16A34A]' },
];

export const earnedBadges = [
  { badgeId: 'badge-first-blood', earnedAt: '2026-06-12' },
  { badgeId: 'badge-guardian', earnedAt: '2026-06-25' },
];

export const leaderboard = [
  { rank: 1, name: 'Aarav K.', college: 'UPES Dehradun', contributionScore: 4200, streak: 28, badges: 5, isCurrentUser: false },
  { rank: 2, name: 'Priya M.', college: 'SRM Chennai', contributionScore: 3950, streak: 32, badges: 4, isCurrentUser: false },
  { rank: 3, name: 'Vikram T.', college: 'VIT Vellore', contributionScore: 3800, streak: 19, badges: 4, isCurrentUser: false },
  { rank: 4, name: 'Sneha D.', college: 'Manipal University', contributionScore: 3650, streak: 24, badges: 3, isCurrentUser: false },
  { rank: 5, name: 'Karan P.', college: 'Amity Noida', contributionScore: 3400, streak: 15, badges: 3, isCurrentUser: false },
  { rank: 6, name: 'Ananya R.', college: 'LPU Jalandhar', contributionScore: 3200, streak: 20, badges: 3, isCurrentUser: false },
  { rank: 7, name: 'Rohan S.', college: 'KIIT Bhubaneswar', contributionScore: 3100, streak: 18, badges: 2, isCurrentUser: false },
  { rank: 8, name: 'Diya B.', college: 'Chitkara University', contributionScore: 2950, streak: 14, badges: 2, isCurrentUser: false },
  { rank: 9, name: 'Arjun G.', college: 'Chandigarh University', contributionScore: 2800, streak: 22, badges: 2, isCurrentUser: false },
  { rank: 10, name: 'Meera V.', college: 'Thapar University', contributionScore: 2650, streak: 10, badges: 2, isCurrentUser: false },
  { rank: 14, name: 'Shray D.', college: 'UPES Dehradun', contributionScore: 2480, streak: 21, badges: 2, isCurrentUser: true },
];

export const projectPortfolio = [
  { id: 'port-001', projectTitle: 'Food Delivery App', subpartTitle: 'User Authentication & JWT', mergedAt: '2026-06-12', xpEarned: 200, techStack: ['Node.js', 'JWT', 'bcrypt'] },
  { id: 'port-002', projectTitle: 'Campus Event Manager', subpartTitle: 'Event Registration Flow', mergedAt: '2026-06-20', xpEarned: 180, techStack: ['Next.js', 'Prisma'] },
];

export const contributionHistory = [
  { date: '2026-06-15', score: 45 }, { date: '2026-06-16', score: 30 },
  { date: '2026-06-17', score: 60 }, { date: '2026-06-18', score: 20 },
  { date: '2026-06-19', score: 0 },  { date: '2026-06-20', score: 80 },
  { date: '2026-06-21', score: 55 }, { date: '2026-06-22', score: 35 },
  { date: '2026-06-23', score: 70 }, { date: '2026-06-24', score: 45 },
  { date: '2026-06-25', score: 90 }, { date: '2026-06-26', score: 25 },
  { date: '2026-06-27', score: 50 }, { date: '2026-06-28', score: 65 },
  { date: '2026-06-29', score: 40 }, { date: '2026-06-30', score: 75 },
  { date: '2026-07-01', score: 55 }, { date: '2026-07-02', score: 85 },
  { date: '2026-07-03', score: 30 },
];

import { motion } from 'framer-motion';
import useStudentStore from '../../../store/useStudentStore';
import useGamificationStore from '../../../store/useGamificationStore';

// Dashboard Components — Mission Control
import WelcomeStrip from '../components/WelcomeStrip';
import ContributionScore from '../components/ContributionScore';
import StreakCounter from '../components/StreakCounter';
import QuickActionPillars from '../components/QuickActionPillars';
import LeaderboardPanel from '../components/LeaderboardPanel';
import UpcomingDeadlines from '../components/UpcomingDeadlines';
import ActivityTimeline from '../components/ActivityTimeline';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export default function Dashboard() {
  const profile = useStudentStore((s) => s.profile);
  const deadlines = useStudentStore((s) => s.deadlines);
  const activity = useStudentStore((s) => s.activity);
  
  const leaderboard = useGamificationStore((s) => s.leaderboard);
  const userRank = useGamificationStore((s) => s.getUserRank);

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-6"
      >
        {/* 1. WELCOME STRIP — Clean header with stats */}
        <WelcomeStrip profile={profile} />

        {/* 2. PROGRESS METRICS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContributionScore
            score={profile.contributionScore}
            todayGain={85}
          />
          <StreakCounter
            streak={profile.streak}
            longestStreak={profile.longestStreak}
          />
        </div>

        {/* 3. THE THREE CORE PILLARS */}
        <div className="mt-4">
          <QuickActionPillars />
        </div>

        {/* 4. DEADLINES & ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div className="lg:col-span-2 flex flex-col">
            <h2 className="text-lg font-bold font-heading text-[#0F172A] mb-4 tracking-tight">Immediate Actions</h2>
            <div className="flex-1">
              <UpcomingDeadlines deadlines={deadlines} />
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold font-heading text-[#0F172A] mb-4 tracking-tight">Recent Activity</h2>
            <div className="flex-1 bg-white rounded-3xl p-6 border border-[#E9ECEF] shadow-sm overflow-hidden">
              <ActivityTimeline activities={activity} />
            </div>
          </div>
        </div>

        {/* 5. LEADERBOARD */}
        <div className="mt-4">
          <h2 className="text-lg font-bold font-heading text-[#0F172A] mb-4 tracking-tight">Top Performers</h2>
          <div className="bg-white rounded-3xl p-6 border border-[#E9ECEF] shadow-sm">
            <LeaderboardPanel
              leaderboard={leaderboard}
              userRank={userRank()}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

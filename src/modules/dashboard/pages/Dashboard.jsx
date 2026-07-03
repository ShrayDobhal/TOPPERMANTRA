import { motion } from 'framer-motion';
import useStudentStore from '../../../store/useStudentStore';
import useGamificationStore from '../../../store/useGamificationStore';

// Dashboard Components — Mission Control
import WelcomeStrip from '../components/WelcomeStrip';
import ContributionScore from '../components/ContributionScore';
import StreakCounter from '../components/StreakCounter';
import UpcomingDeadlines from '../components/UpcomingDeadlines';
import QuickActionPillars from '../components/QuickActionPillars';
import CustodianAlerts from '../components/CustodianAlerts';
import LeaderboardPanel from '../components/LeaderboardPanel';
import ActivityTimeline from '../components/ActivityTimeline';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export default function Dashboard() {
  const profile = useStudentStore((s) => s.profile);
  const deadlines = useStudentStore((s) => s.deadlines);
  const alerts = useStudentStore((s) => s.alerts);
  const activity = useStudentStore((s) => s.activity);
  const dismissAlert = useStudentStore((s) => s.dismissAlert);
  const markAlertRead = useStudentStore((s) => s.markAlertRead);

  const leaderboard = useGamificationStore((s) => s.leaderboard);
  const userRank = useGamificationStore((s) => s.getUserRank);

  return (
    <div className="max-w-[1600px] mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-8"
      >
        {/* 1. WELCOME STRIP — Name, College, Rank */}
        <WelcomeStrip profile={profile} />

        {/* 2. SCORE + STREAK ROW */}
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

        {/* 3. UPCOMING DEADLINES */}
        <UpcomingDeadlines deadlines={deadlines} />

        {/* 4. THREE PILLAR CARDS — Cohort, Project, Community */}
        <QuickActionPillars />

        {/* 5. CUSTODIAN ALERTS */}
        <CustodianAlerts
          alerts={alerts}
          onDismiss={dismissAlert}
          onMarkRead={markAlertRead}
        />

        {/* 6. LEADERBOARD + ACTIVITY (Side by side on desktop) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <LeaderboardPanel
            leaderboard={leaderboard}
            userRank={userRank()}
          />
          <ActivityTimeline activities={activity} />
        </div>
      </motion.div>
    </div>
  );
}

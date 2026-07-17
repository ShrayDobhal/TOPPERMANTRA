import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { setTokenProvider } from './lib/api'
import Lenis from 'lenis'

import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import Mentors from './pages/Mentors'
import Projects from './pages/Projects'
import Community from './pages/Community'
import Discover from './pages/Discover'
import Dashboard from './modules/dashboard/pages/Dashboard'
import Contact from './pages/Contact'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import VerifyEmail from './pages/auth/VerifyEmail'
import Welcome from './modules/onboarding/pages/Welcome'
import Onboarding from './modules/onboarding/pages/Onboarding'
import Journey from './modules/journey/pages/Journey'
import ProjectHub from './modules/projects/pages/ProjectHub'
import ProjectWorkspace from './modules/projects/pages/ProjectWorkspace'
import ProjectLayout from './modules/projects/layouts/ProjectLayout'
import ProjectDetail from './modules/projects/pages/ProjectDetail'
import ProjectCreationWizard from './modules/projects/pages/ProjectCreationWizard'
import CommunityHub from './modules/community/pages/CommunityHub'
import CommunitySpace from './modules/community/pages/CommunitySpace'
import CommunityLayout from './modules/community/layouts/CommunityLayout'
import SpaceWorkspace from './modules/spaces/pages/SpaceWorkspace'
import SpaceLayout from './modules/spaces/layouts/SpaceLayout'
import DiscoverLayout from './modules/opportunities/layouts/DiscoverLayout'
import DiscoverHub from './modules/opportunities/pages/DiscoverHub'
import OpportunityDetail from './modules/opportunities/pages/OpportunityDetail'
import ApplicationTracker from './modules/opportunities/pages/ApplicationTracker'
import MentorLayout from './modules/mentors/layouts/MentorLayout'
import MentorHub from './modules/mentors/pages/MentorHub'
import SessionDashboard from './modules/mentors/pages/SessionDashboard'
import MentorProfile from './modules/mentors/pages/MentorProfile'
import MentorReviewDashboard from './modules/mentors/pages/MentorReviewDashboard'
import PortfolioDashboard from './modules/portfolio/pages/PortfolioDashboard'
import ResumeLanding from './modules/resume/pages/ResumeLanding'
import ResumeDashboard from './modules/resume/pages/ResumeDashboard'
import PublicProfile from './modules/portfolio/pages/PublicProfile'
import CohortLayout from './modules/cohort/layouts/CohortLayout'
import CohortDashboard from './modules/cohort/pages/CohortDashboard'
import ProjectForgePage from './modules/projects/pages/ProjectForgePage'
import Settings from './modules/dashboard/pages/Settings'
import MockDashboard from './components/shared/MockDashboard'
import ScrollToTop from './components/shared/ScrollToTop'
import CustomCursor from './components/shared/CustomCursor'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { Toaster } from 'react-hot-toast'

export default function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    // Inject the getToken function into our API client
    setTokenProvider(getToken);
  }, [getToken]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.8,
      wheelMultiplier: 1.8,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <Toaster position="top-right" />
      <ScrollToTop />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="mentors" element={<Mentors />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="community" element={<Community />} />
          <Route path="discover" element={<Discover />} />
          <Route path="discover/:id" element={<OpportunityDetail />} />
          {/* Public routes only */}
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Protected Routes (Require Authentication) */}
        <Route element={<ProtectedRoute />}>
          {/* Onboarding Routes */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Standalone Dashboard/Project Routes */}
          <Route path="/dashboard/projects/create" element={<ProjectCreationWizard />} />
          <Route path="/dashboard/projects/my-projects" element={<ProjectWorkspace />} />
          <Route path="/dashboard/projects/:id/workspace" element={<ProjectWorkspace />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="journey" element={<Journey />} />
            <Route path="cohort" element={<CohortLayout />}>
              <Route index element={<CohortDashboard />} />
            </Route>
            <Route path="projects" element={<ProjectLayout />}>
              <Route index element={<ProjectHub />} />
              <Route path="open" element={<ProjectHub />} />
              <Route path="hackathon" element={<ProjectHub />} />
              <Route path="research" element={<ProjectHub />} />
              <Route path="opensource" element={<ProjectHub />} />
              <Route path=":id" element={<ProjectForgePage />} />
            </Route>
            <Route path="community" element={<CommunityLayout />}>
              <Route index element={<CommunityHub />} />
              <Route path="c/:id" element={<CommunitySpace />} />
            </Route>
            <Route path="spaces" element={<SpaceLayout />}>
              <Route path=":id" element={<SpaceWorkspace />} />
            </Route>
            
            {/* Coming Soon / Placeholder Routes */}
            <Route path="mentors" element={<MentorLayout />}>
              <Route index element={<MentorHub />} />
              <Route path="sessions" element={<SessionDashboard />} />
              <Route path="reviews" element={<MentorReviewDashboard />} />
              <Route path=":id" element={<MentorProfile />} />
            </Route>
            <Route path="opportunities" element={<DiscoverLayout />}>
              <Route index element={<DiscoverHub />} />
              <Route path="tracker" element={<ApplicationTracker />} />
              <Route path=":id" element={<OpportunityDetail />} />
            </Route>
            <Route path="hackathons" element={<MockDashboard />} />
            <Route path="portfolio" element={<PortfolioDashboard />} />
            <Route path="resume">
              <Route index element={<ResumeLanding />} />
              <Route path="dashboard" element={<ResumeDashboard />} />
            </Route>
            <Route path="certificates" element={<MockDashboard />} />
            <Route path="events" element={<MockDashboard />} />
            <Route path="messages" element={<MockDashboard />} />
            <Route path="notifications" element={<MockDashboard />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Public Portfolio Route */}
        <Route path="/@:username" element={<PublicProfile />} />
      </Routes>
    </Router>
  )
}

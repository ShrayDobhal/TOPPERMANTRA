import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { setTokenProvider } from './lib/api'

import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import About from './pages/About'
import Mentors from './pages/Mentors'
import Community from './pages/Community'
import Hackathons from './pages/Hackathons'
import Projects from './pages/Projects'
import Entrepreneurship from './pages/Entrepreneurship'
import Opportunities from './pages/Opportunities'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import VerifyEmail from './pages/auth/VerifyEmail'
import Welcome from './pages/onboarding/Welcome'
import Onboarding from './pages/onboarding/Onboarding'
import Journey from './pages/Journey'
import ProjectHub from './pages/projects/ProjectHub'
import ProjectDetail from './pages/projects/ProjectDetail'
import ProjectBoard from './pages/projects/ProjectBoard'
import CommunityHub from './pages/community/CommunityHub'
import CommunityDetail from './pages/community/CommunityDetail'
import DiscussionDetail from './pages/community/DiscussionDetail'
import ComingSoon from './pages/dashboard/ComingSoon'

export default function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    // Inject the getToken function into our API client
    setTokenProvider(getToken);
  }, [getToken]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="mentors" element={<Mentors />} />
          <Route path="community" element={<Community />} />
          <Route path="hackathons" element={<Hackathons />} />
          <Route path="projects" element={<Projects />} />
          <Route path="entrepreneurship" element={<Entrepreneurship />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Onboarding Routes */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="journey" element={<Journey />} />
          <Route path="projects">
            <Route index element={<ProjectHub />} />
            <Route path=":id" element={<ProjectDetail />} />
            <Route path=":id/board" element={<ProjectBoard />} />
          </Route>
          <Route path="community">
            <Route index element={<CommunityHub />} />
            <Route path="c/:id" element={<CommunityDetail />} />
            <Route path="post/:id" element={<DiscussionDetail />} />
          </Route>
          
          {/* Coming Soon / Placeholder Routes */}
          <Route path="mentors" element={<ComingSoon />} />
          <Route path="opportunities" element={<ComingSoon />} />
          <Route path="hackathons" element={<ComingSoon />} />
          <Route path="portfolio" element={<ComingSoon />} />
          <Route path="resume" element={<ComingSoon />} />
          <Route path="certificates" element={<ComingSoon />} />
          <Route path="events" element={<ComingSoon />} />
          <Route path="messages" element={<ComingSoon />} />
          <Route path="notifications" element={<ComingSoon />} />
          <Route path="settings" element={<ComingSoon />} />
        </Route>
      </Routes>
    </Router>
  )
}

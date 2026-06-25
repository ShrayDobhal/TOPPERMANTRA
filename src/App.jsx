import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

export default function App() {
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

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

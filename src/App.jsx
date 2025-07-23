import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'

// Seeker App Components
import SeekerSidebar from './components/SeekerSidebar'
import SeekerTopHeader from './components/SeekerTopHeader'
import SeekerDashboard from './pages/SeekerDashboard'
import SeekerExplore from './pages/SeekerExplore'
import SeekerSessions from './pages/SeekerSessions'
import SeekerSessionsTest from './pages/SeekerSessionsTest'
import SeekerProfile from './pages/SeekerProfile'
import SeekerVerification from './pages/SeekerVerification'
import SeekerContent from './pages/SeekerContent'
import SeekerRewards from './pages/SeekerRewards'
import SeekerPayments from './pages/SeekerPayments'
import SeekerCommunity from './pages/SeekerCommunity'
import SeekerSettings from './pages/SeekerSettings'
import SeekerSupport from './pages/SeekerSupport'

// Authentication Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/Landing'

function App() {
  // Always start with authentication required
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Update body class when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])

  // If not authenticated, show login/register pages
  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    )
  }

  // Render the seeker application
  return (
    <LanguageProvider>
      <Router>
        <div className="flex h-screen">
          {/* Seeker Sidebar */}
          <SeekerSidebar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setIsAuthenticated={setIsAuthenticated}
          />

          <div className={`flex-1 overflow-auto ${darkMode ? 'bg-[#1a1f2e]' : 'bg-gray-50'}`}>
            {/* Seeker Header */}
            <SeekerTopHeader
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              setIsAuthenticated={setIsAuthenticated}
            />

            <Routes>
              {/* Seeker Routes */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<SeekerDashboard darkMode={darkMode} />} />
              <Route path="/explore" element={<SeekerExplore darkMode={darkMode} />} />
              <Route path="/sessions" element={<SeekerSessions darkMode={darkMode} />} />
              <Route path="/sessions-test" element={<SeekerSessionsTest darkMode={darkMode} />} />
              <Route path="/profile" element={<SeekerProfile darkMode={darkMode} />} />
              <Route path="/verification" element={<SeekerVerification darkMode={darkMode} />} />
              <Route path="/content" element={<SeekerContent darkMode={darkMode} />} />
              <Route path="/rewards" element={<SeekerRewards darkMode={darkMode} />} />
              <Route path="/payments" element={<SeekerPayments darkMode={darkMode} />} />
              <Route path="/community" element={<SeekerCommunity darkMode={darkMode} />} />
              <Route path="/settings" element={<SeekerSettings darkMode={darkMode} />} />
              <Route path="/support" element={<SeekerSupport darkMode={darkMode} />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App

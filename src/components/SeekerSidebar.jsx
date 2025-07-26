import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import {
  LayoutDashboard,
  Search,
  Calendar,
  User,
  Shield,
  BookOpen,
  Gift,
  CreditCard,
  Users,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react'

const SeekerSidebar = ({ darkMode, setDarkMode, setIsAuthenticated }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const mainMenuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: t('dashboard') },
    { path: '/explore', icon: Search, label: 'Explore' },
    { path: '/sessions', icon: Calendar, label: 'Bookings' },
    { path: '/profile', icon: User, label: t('profile') },
    { path: '/verification', icon: Shield, label: 'Verification' },
    { path: '/content', icon: BookOpen, label: t('content') },
    { path: '/rewards', icon: Gift, label: 'Rewards' },
    { path: '/payments', icon: CreditCard, label: t('payments') },
    { path: '/community', icon: Users, label: t('community') },
    { path: '/settings', icon: Settings, label: t('settings') },
    { path: '/support', icon: HelpCircle, label: 'Support' },
  ]

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      if (setIsAuthenticated) {
        setIsAuthenticated(false)
      }
      localStorage.removeItem('userToken')
      localStorage.removeItem('userData')
      navigate('/login')
    }
  }



  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-56'} h-full border-r flex flex-col transition-all duration-500 ${
      darkMode
        ? 'bg-[#00001a] border-white/10'
        : 'bg-gray-50 border-gray-200'
    }`}>
      {/* Header */}
      <div className={`p-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} transition-all duration-500`}>
        {!isCollapsed && (
          <h1 className={`text-xl font-bold transition-all duration-500 ${
            darkMode ? 'text-white' : 'text-[#00001a]'
          }`}>SynapMentor</h1>
        )}
        <button
          className={`p-2 transition-all duration-300 hover:scale-110 ${
            darkMode
              ? 'text-white hover:text-gray-300'
              : 'text-[#00001a] hover:text-[#00001a]/80'
          }`}
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        >
          {/* Custom Hamburger Menu Icon */}
          <div className="w-5 h-5 flex flex-col justify-center space-y-1">
            <div className={`w-full h-0.5 rounded-full transition-all duration-300 ${
              darkMode ? 'bg-white' : 'bg-black'
            }`}></div>
            <div className={`w-full h-0.5 rounded-full transition-all duration-300 ${
              darkMode ? 'bg-white' : 'bg-black'
            }`}></div>
            <div className={`w-full h-0.5 rounded-full transition-all duration-300 ${
              darkMode ? 'bg-white' : 'bg-black'
            }`}></div>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 ${isCollapsed ? 'px-2' : 'px-4'} py-3`}>
        {/* Main Menu Items */}
        <ul className="space-y-1">
          {mainMenuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <li key={`${item.path}-${index}`}>
                <Link
                  to={item.path}
                  className={`group flex items-center ${isCollapsed ? 'justify-center px-3' : 'space-x-3 px-4'} py-3 rounded-lg transition-all duration-500 text-sm font-medium cursor-pointer backdrop-blur-xl ${
                    isActive
                      ? darkMode
                        ? 'bg-white/3 border border-white/10 hover:bg-white/8 hover:border-white/20 text-white font-semibold dynamic-glow-hover'
                        : 'bg-white/60 backdrop-blur-xl border border-gray-200/50 text-[#00001a] font-semibold shadow-lg shadow-gray-500/20'
                      : darkMode
                        ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                        : 'text-[#00001a] hover:bg-gray-100 hover:text-[#00001a]'
                  }`}
                  title={isCollapsed ? item.label : ''}
                  style={isActive ? (darkMode ? {
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.1), 0 4px 15px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: 'pulse-glow-dark 4s ease-in-out infinite'
                  } : {
                    boxShadow: '0 0 8px rgba(21, 58, 168, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: 'pulse-glow-light 4s ease-in-out infinite'
                  }) : {}}
                  onMouseEnter={(e) => {
                    if (isActive) {
                      e.currentTarget.style.animation = 'none';
                      if (darkMode) {
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.2), 0 0 40px rgba(59, 130, 246, 0.1), 0 6px 20px rgba(0, 0, 0, 0.15)';
                      } else {
                        e.currentTarget.style.boxShadow = '0 0 16px rgba(21, 58, 168, 0.3), 0 0 24px rgba(21, 58, 168, 0.15), 0 6px 18px rgba(0, 0, 0, 0.12)';
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isActive) {
                      if (darkMode) {
                        e.currentTarget.style.animation = 'pulse-glow-dark 4s ease-in-out infinite';
                        e.currentTarget.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.1), 0 4px 15px rgba(0, 0, 0, 0.1)';
                      } else {
                        e.currentTarget.style.animation = 'pulse-glow-light 4s ease-in-out infinite';
                        e.currentTarget.style.boxShadow = '0 0 8px rgba(21, 58, 168, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08)';
                      }
                    }
                  }}
                >
                  <Icon size={20} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Spacer */}
        <div className="mt-6"></div>

      </nav>

      {/* Footer */}
      <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t transition-all duration-500 ${
        darkMode ? 'border-white/10' : 'border-gray-200'
      }`}>
        <button
          onClick={handleLogout}
          className={`group flex items-center ${isCollapsed ? 'justify-center px-3' : 'space-x-3 px-4'} py-3 rounded-lg backdrop-blur-md border transition-all duration-300 w-full text-sm font-medium ${
            darkMode
              ? 'text-gray-300 hover:bg-white/10 hover:text-white border-white/10 hover:border-white/20'
              : 'text-[#00001a] hover:bg-white/20 hover:text-[#00001a] border-white/20 hover:border-white/30'
          }`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default SeekerSidebar

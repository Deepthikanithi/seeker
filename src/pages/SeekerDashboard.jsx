import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import {
  Star,
  BarChart3,
  Flame,
  Trophy,
  TrendingUp,
  Calendar,
  Search,
  Clock,
  DollarSign,
  BookOpen,
  MessageSquare,
  Users,
  Play,
  Bell,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Filter,
  TrendingDown,
  Video,
  X,
  Zap,
  Plus
} from 'lucide-react'

const SeekerDashboard = ({ darkMode }) => {
  const navigate = useNavigate()
  const { t } = useLanguage()

  // Error boundary for debugging
  useEffect(() => {
    const handleError = (error) => {
      console.error('Dashboard Error:', error)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleError)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleError)
    }
  }, [])

  // State Management
  const [selectedTimeframe, setSelectedTimeframe] = useState('Today')
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [notifications, setNotifications] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(null)
  const [analyticsData, setAnalyticsData] = useState({
    totalProblems: 47,
    totalBookings: 23,
    totalMoneySpent: 1250.00,
    totalMinutes: 1380, // 23 hours
    streak: 12,
    level: 'Gold',
    levelProgress: 75,
    streakDays: [
      { date: '2024-01-15', completed: true },
      { date: '2024-01-16', completed: true },
      { date: '2024-01-17', completed: true },
      { date: '2024-01-18', completed: true },
      { date: '2024-01-19', completed: true },
      { date: '2024-01-20', completed: true },
      { date: '2024-01-21', completed: true }
    ]
  })

  // Analytics data by timeframe with growth indicators
  const analyticsHistory = {
    'Today': {
      totalProblems: 3,
      totalBookings: 1,
      totalMoneySpent: 45.00,
      totalMinutes: 60,
      streak: 12,
      growth: {
        problems: +15,
        bookings: +25,
        spending: +12,
        minutes: +8
      }
    },
    'Week': {
      totalProblems: 12,
      totalBookings: 5,
      totalMoneySpent: 225.00,
      totalMinutes: 300,
      streak: 12,
      growth: {
        problems: +22,
        bookings: +18,
        spending: +35,
        minutes: +28
      }
    },
    'Month': {
      totalProblems: 47,
      totalBookings: 23,
      totalMoneySpent: 1250.00,
      totalMinutes: 1380,
      streak: 12,
      growth: {
        problems: +45,
        bookings: +38,
        spending: +42,
        minutes: +55
      }
    },
    'Year': {
      totalProblems: 156,
      totalBookings: 89,
      totalMoneySpent: 4500.00,
      totalMinutes: 5340,
      streak: 12,
      growth: {
        problems: +67,
        bookings: +52,
        spending: +78,
        minutes: +85
      }
    }
  }

  // Update analytics data when timeframe changes
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      const newData = analyticsHistory[selectedTimeframe]
      setAnalyticsData(prev => ({
        ...prev,
        ...newData
      }))
      setIsLoading(false)
      setLastUpdated(new Date())
    }, 500)
  }, [selectedTimeframe])

  // Utility functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const formatGrowth = (value) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value}%`
  }

  const getGrowthColor = (value) => {
    if (value > 0) {
      return darkMode ? 'text-green-400' : 'text-[#00001a]'
    } else if (value < 0) {
      return darkMode ? 'text-red-400' : 'text-[#00001a]'
    }
    return darkMode ? 'text-white/70' : 'text-gray-600'
  }

  const getGrowthIcon = (value) => {
    if (value > 0) return TrendingUp
    if (value < 0) return TrendingDown
    return null
  }

  // Calendar helper functions
  const getCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  // Enhanced trending solvers data with more details
  const [trendingSolvers, setTrendingSolvers] = useState([
    {
      id: 1,
      name: 'Alex Chen',
      topic: 'React & Node.js',
      rating: 4.9,
      sessions: 156,
      price: 45,
      availability: 'Available now',
      responseTime: '< 5 min',
      specialties: ['React', 'Node.js', 'TypeScript'],
      trending: 'up',
      trendPercentage: 15,
      isOnline: true,
      nextAvailable: null
    },
    {
      id: 2,
      name: 'Sarah Davis',
      topic: 'Python & AI',
      rating: 4.8,
      sessions: 203,
      price: 50,
      availability: 'Available in 2 hours',
      responseTime: '< 10 min',
      specialties: ['Python', 'Machine Learning', 'TensorFlow'],
      trending: 'up',
      trendPercentage: 8,
      isOnline: false,
      nextAvailable: '2:00 PM'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      topic: 'AWS & Cloud Architecture',
      rating: 4.9,
      sessions: 201,
      price: 60,
      availability: 'Available now',
      responseTime: '< 3 min',
      specialties: ['AWS', 'Serverless', 'DevOps'],
      trending: 'up',
      trendPercentage: 22,
      isOnline: true,
      nextAvailable: null
    },
    {
      id: 4,
      name: 'Emily Wong',
      topic: 'UI/UX & Design Systems',
      rating: 4.7,
      sessions: 98,
      price: 55,
      availability: 'Tomorrow',
      responseTime: '< 15 min',
      specialties: ['Figma', 'UI Design', 'Design Systems'],
      trending: 'up',
      trendPercentage: 12,
      isOnline: false,
      nextAvailable: 'Tomorrow, 10:00 AM'
    },
    {
      id: 5,
      name: 'David Rodriguez',
      topic: 'Mobile Development',
      rating: 4.8,
      sessions: 142,
      price: 52,
      availability: 'Available now',
      responseTime: '< 8 min',
      specialties: ['React Native', 'Flutter', 'iOS'],
      trending: 'up',
      trendPercentage: 18,
      isOnline: true,
      nextAvailable: null
    },
    {
      id: 6,
      name: 'Lisa Thompson',
      topic: 'Data Science & Analytics',
      rating: 4.9,
      sessions: 187,
      price: 65,
      availability: 'Available in 1 hour',
      responseTime: '< 12 min',
      specialties: ['Python', 'R', 'SQL', 'Tableau'],
      trending: 'up',
      trendPercentage: 25,
      isOnline: false,
      nextAvailable: '3:30 PM'
    },
    {
      id: 7,
      name: 'James Park',
      topic: 'Blockchain & Web3',
      rating: 4.6,
      sessions: 76,
      price: 70,
      availability: 'Tomorrow',
      responseTime: '< 20 min',
      specialties: ['Solidity', 'Ethereum', 'Smart Contracts'],
      trending: 'up',
      trendPercentage: 30,
      isOnline: false,
      nextAvailable: 'Tomorrow, 9:00 AM'
    },
    {
      id: 8,
      name: 'Rachel Kim',
      topic: 'Cybersecurity & Penetration Testing',
      rating: 4.7,
      sessions: 134,
      price: 58,
      availability: 'Available now',
      responseTime: '< 6 min',
      specialties: ['Ethical Hacking', 'Network Security', 'CISSP'],
      trending: 'up',
      trendPercentage: 14,
      isOnline: true,
      nextAvailable: null
    }
  ])

  // Enhanced upcoming bookings with more details
  const [upcomingBookings, setUpcomingBookings] = useState([
    {
      id: 'UB001',
      solver: 'Alex Chen',
      solverId: 'solver_001',
      solverRating: 4.9,
      topic: 'React Performance Optimization',
      time: '2:00 PM - 3:00 PM',
      date: 'Today',
      status: 'confirmed',
      duration: 60,
      price: 45.00,
      meetingLink: 'https://meet.synapmentor.com/session/UB001',
      canJoin: false,
      joinAvailableAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      reminderSent: true,
      hasPreparationMaterial: true,
      hasRecording: true
    },
    {
      id: 'UB002',
      solver: 'Emma Wilson',
      solverId: 'solver_002',
      solverRating: 4.6,
      topic: 'MongoDB Query Optimization',
      time: '4:00 PM - 5:00 PM',
      date: 'Tomorrow',
      status: 'confirmed',
      duration: 60,
      price: 40.00,
      meetingLink: 'https://meet.synapmentor.com/session/UB002',
      canJoin: false,
      joinAvailableAt: new Date(Date.now() + 26 * 60 * 60 * 1000), // 26 hours from now
      scheduledTime: new Date(Date.now() + 26 * 60 * 60 * 1000), // 26 hours from now
      reminderSent: false,
      hasPreparationMaterial: false,
      hasRecording: false
    },
    {
      id: 'UB003',
      solver: 'Michael Johnson',
      solverId: 'solver_003',
      solverRating: 4.9,
      topic: 'AWS Lambda & Serverless',
      time: '10:00 AM - 11:30 AM',
      date: 'Dec 24',
      status: 'confirmed',
      duration: 90,
      price: 75.00,
      meetingLink: 'https://meet.synapmentor.com/session/UB003',
      canJoin: false,
      joinAvailableAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      scheduledTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      reminderSent: true,
      hasPreparationMaterial: true,
      hasRecording: true
    },
    {
      id: 'UB004',
      solver: 'Emily Wong',
      solverId: 'solver_004',
      solverRating: 4.7,
      topic: 'Design System Architecture',
      time: '2:30 PM - 4:00 PM',
      date: 'Dec 26',
      status: 'pending',
      duration: 90,
      price: 65.00,
      meetingLink: 'https://meet.synapmentor.com/session/UB004',
      canJoin: false,
      joinAvailableAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      scheduledTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      reminderSent: false,
      hasPreparationMaterial: true,
      hasRecording: false
    }
  ])

  // Enhanced anonymous pool responses with real-time updates
  const [anonymousPoolResponses, setAnonymousPoolResponses] = useState([
    {
      id: 'APR001',
      question: 'How to implement JWT authentication in Node.js?',
      responses: 5,
      status: 'answered',
      timeAgo: '2 hours ago',
      tags: ['Node.js', 'JWT', 'Authentication'],
      difficulty: 'Intermediate',
      bestAnswer: true,
      upvotes: 12,
      views: 45,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      hasNewResponses: false
    },
    {
      id: 'APR002',
      question: 'Best practices for React state management?',
      responses: 3,
      status: 'active',
      timeAgo: '1 day ago',
      tags: ['React', 'State Management', 'Redux'],
      difficulty: 'Advanced',
      bestAnswer: false,
      upvotes: 8,
      views: 23,
      lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000),
      hasNewResponses: true
    },
    {
      id: 'APR003',
      question: 'How to optimize database queries for large datasets?',
      responses: 7,
      status: 'answered',
      timeAgo: '3 days ago',
      tags: ['Database', 'Performance', 'SQL'],
      difficulty: 'Expert',
      bestAnswer: true,
      upvotes: 15,
      views: 67,
      lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      hasNewResponses: false
    }
  ])

  // Interactive Functions
  const handleTimeframeChange = useCallback((timeframe) => {
    setIsLoading(true)
    setSelectedTimeframe(timeframe)

    // Simulate API call
    setTimeout(() => {
      setAnalyticsData(prev => ({
        ...prev,
        ...analyticsHistory[timeframe]
      }))
      setIsLoading(false)
      setLastUpdated(new Date())
    }, 500)
  }, [analyticsHistory])

  const handleRefreshData = useCallback(() => {
    setIsLoading(true)

    // Simulate data refresh
    setTimeout(() => {
      setLastUpdated(new Date())
      setIsLoading(false)

      // Add a notification for successful refresh
      setNotifications(prev => [...prev, {
        id: Date.now(),
        message: 'Dashboard data refreshed successfully',
        type: 'success'
      }])
    }, 1000)
  }, [])

  const handleExplore = () => {
    navigate('/explore')
  }

  const handleViewBookings = () => {
    navigate('/sessions')
  }

  const handleBookSolver = (solverId) => {
    console.log(`Booking solver: ${solverId}`)
    navigate(`/explore?solver=${solverId}`)
  }

  const handleJoinSession = (bookingId) => {
    const booking = upcomingBookings.find(b => b.id === bookingId)
    if (!booking) return

    if (booking.canJoin) {
      window.open(booking.meetingLink, '_blank')
    } else {
      try {
        const joinTime = booking.joinAvailableAt instanceof Date
          ? booking.joinAvailableAt
          : new Date(booking.joinAvailableAt)
        const timeUntilJoin = Math.ceil((joinTime - new Date()) / (1000 * 60))
        alert(`Session will be available to join in ${timeUntilJoin} minutes`)
      } catch (error) {
        console.warn('Error calculating join time:', error)
        alert('Session will be available soon')
      }
    }
  }

  const handleViewResponse = (responseId) => {
    console.log(`Viewing response: ${responseId}`)
    navigate('/sessions?tab=anonymous')
  }

  const handleRescheduleBooking = (bookingId) => {
    console.log(`Rescheduling booking: ${bookingId}`)
    navigate(`/sessions?reschedule=${bookingId}`)
  }

  // Effects
  useEffect(() => {
    // Simulate real-time updates for session availability
    const interval = setInterval(() => {
      const now = new Date()
      setUpcomingBookings(prev => prev.map(booking => {
        try {
          // Ensure joinAvailableAt is a Date object
          const joinTime = booking.joinAvailableAt instanceof Date
            ? booking.joinAvailableAt
            : new Date(booking.joinAvailableAt)

          return {
            ...booking,
            canJoin: now >= new Date(joinTime.getTime() - 5 * 60 * 1000) // 5 minutes before
          }
        } catch (error) {
          console.warn('Error updating booking availability:', error)
          return booking // Return unchanged booking if there's an error
        }
      }))
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Auto-dismiss notifications after 5 seconds
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(1))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notifications])

  // Dashboard render - fixed all JSX errors
  return (
    <div className={`min-h-screen ${
      darkMode ? 'bg-[#00001a]' : 'bg-gray-50'
    }`}>

      {/* Enhanced Notifications System */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border shadow-xl relative overflow-hidden ${
                notification.type === 'success'
                  ? (darkMode
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-green-50 border-green-200')
                  : notification.type === 'warning'
                  ? (darkMode
                    ? 'bg-yellow-500/10 border-yellow-500/30'
                    : 'bg-yellow-50 border-yellow-200')
                  : notification.type === 'error'
                  ? (darkMode
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-red-50 border-red-200')
                  : (darkMode
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-blue-50 border-blue-200')
              }`}
            >
              {/* Notification Icon */}
              <div className="flex items-start gap-3">
                <div className={`p-1 rounded-lg ${
                  notification.type === 'success'
                    ? (darkMode ? 'bg-green-500/20' : 'bg-green-100')
                    : notification.type === 'warning'
                    ? (darkMode ? 'bg-yellow-500/20' : 'bg-yellow-100')
                    : notification.type === 'error'
                    ? (darkMode ? 'bg-red-500/20' : 'bg-red-100')
                    : (darkMode ? 'bg-blue-500/20' : 'bg-blue-100')
                }`}>
                  {notification.type === 'success' && (
                    <CheckCircle className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  )}
                  {notification.type === 'warning' && (
                    <AlertCircle className={`w-4 h-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  )}
                  {notification.type === 'error' && (
                    <AlertCircle className={`w-4 h-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                  )}
                  {notification.type === 'info' && (
                    <Bell className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm mb-1 ${
                    notification.type === 'success'
                      ? (darkMode ? 'text-green-400' : 'text-green-800')
                      : notification.type === 'warning'
                      ? (darkMode ? 'text-yellow-400' : 'text-yellow-800')
                      : notification.type === 'error'
                      ? (darkMode ? 'text-red-400' : 'text-red-800')
                      : (darkMode ? 'text-blue-400' : 'text-blue-800')
                  }`}>
                    {notification.title}
                  </div>
                  <div className={`text-sm ${
                    notification.type === 'success'
                      ? (darkMode ? 'text-green-300/80' : 'text-green-700')
                      : notification.type === 'warning'
                      ? (darkMode ? 'text-yellow-300/80' : 'text-yellow-700')
                      : notification.type === 'error'
                      ? (darkMode ? 'text-red-300/80' : 'text-red-700')
                      : (darkMode ? 'text-blue-300/80' : 'text-blue-700')
                  }`}>
                    {notification.message}
                  </div>
                  <div className={`text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                    {notification.time}
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                  className={`p-1 rounded-lg ${
                    darkMode ? 'bg-white/10' : 'bg-gray-100'
                  }`}
                >
                  <X className={`w-3 h-3 ${darkMode ? 'text-white/50' : 'text-gray-500'}`} />
                </button>
              </div>

              {/* Progress Bar for Auto-dismiss */}
              <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${
                notification.type === 'success'
                  ? 'from-green-400 to-green-600'
                  : notification.type === 'warning'
                  ? 'from-yellow-400 to-yellow-600'
                  : notification.type === 'error'
                  ? 'from-red-400 to-red-600'
                  : 'from-blue-400 to-blue-600'
              }`} style={{ width: '100%' }} />
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="p-4 md:p-6 pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              {t('welcomeBack')}, Jane
            </h1>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-3">
              {/* Enhanced Streak Display */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                darkMode
                  ? 'bg-[#00001a] border-white/20'
                  : 'bg-white border-gray-200'
              }`}>
                <div className="relative">
                  <Flame className={`w-5 h-5 ${
                    darkMode ? 'text-white/70' : 'text-[#00001a]'
                  }`} />

                </div>
                <div>
                  <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {analyticsData.streak} Day Streak
                  </div>
                  <div className={`text-xs flex items-center gap-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Keep it up! <Zap className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Enhanced Level Display */}
              <div className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${
                darkMode
                  ? 'bg-[#00001a] border-white/20'
                  : 'bg-white border-gray-200'
              }`}>
                <div className="relative">
                  <Trophy className={`w-5 h-5 ${
                    darkMode ? 'text-white' : 'text-[#00001a]'
                  }`} />
                </div>
                <div>
                  <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {analyticsData.level} Level
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-16 h-1.5 rounded-full overflow-hidden ${
                      darkMode ? 'bg-white/20' : 'bg-gray-200'
                    }`}>
                      <div
                        className={`h-full rounded-full ${
                          darkMode ? 'bg-white' : 'bg-[#00001a]'
                        }`}
                        style={{ width: `${analyticsData.levelProgress}%` }}
                      />
                    </div>
                    <span className={`text-xs ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      {analyticsData.levelProgress}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Streak Calendar Mini View */}
              <div className={`flex items-center gap-1 px-3 py-2 rounded-lg border ${
                darkMode
                  ? 'bg-[#00001a] border-white/20'
                  : 'bg-white/60 border-white/40'
              }`}>
                <div className="flex gap-1">
                  {analyticsData.streakDays.slice(-7).map((day, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        day.completed
                          ? (darkMode ? 'bg-white/70' : 'bg-[#00001a]')
                          : (darkMode ? 'bg-white/20' : 'bg-gray-300')
                      }`}
                      title={`${day.date} - ${day.completed ? 'Completed' : 'Missed'}`}
                    />
                  ))}
                </div>
                <span className={`text-xs ml-2 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                  7 days
                </span>
              </div>

              {/* Last Updated */}
              <div className="flex items-center gap-2 text-xs">
                <Clock className={`w-3 h-3 ${darkMode ? 'text-white/50' : 'text-gray-500'}`} />
                <span className={`${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                  Updated {lastUpdated.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <button
              onClick={handleRefreshData}
              disabled={isLoading}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                darkMode
                  ? 'text-white/70 border border-white/20 disabled:opacity-50'
                  : 'bg-gray-100 text-gray-600 border border-gray-300 disabled:opacity-50'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleExplore}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-semibold ${
                darkMode
                  ? 'bg-[#00001a] text-white border border-white/20'
                  : 'bg-white text-[#00001a] border border-gray-300'
              }`}
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Explore Solvers</span>
            </button>

            <button
              onClick={handleViewBookings}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-semibold ${
                darkMode
                  ? 'bg-[#00001a] text-white border border-white/20'
                  : 'bg-[#00001a] text-white border border-[#00001a]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              My Bookings
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">

        {/* Analytics Section with Time Filter */}
        <div className={`p-4 md:p-6 border relative overflow-hidden ${
          darkMode
            ? 'bg-[#00001a] rounded-lg border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300'
            : 'rounded-lg bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              <BarChart3 className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
              Analytics
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {['Today', 'Week', 'Month', 'Year'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => handleTimeframeChange(timeframe)}
                  disabled={isLoading}
                  className={`px-3 py-1 rounded-lg text-sm font-medium disabled:opacity-50 ${
                    selectedTimeframe === timeframe
                      ? (darkMode ? 'bg-blue-500/20 text-blue-400 border border-gray-800 transition-all duration-300' : 'bg-[#00001a] text-white border border-[#00001a] shadow-[0_1px_3px_rgba(0,0,26,0.12)]')
                      : (darkMode ? 'text-white/70 border border-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300' : 'text-[#00001a] bg-white border border-[#00001a] shadow-[0_1px_3px_rgba(0,0,26,0.12)] hover:shadow-[0_-1px_3px_rgba(0,0,26,0.12)]')
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Analytics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {/* Total Problems Card */}
            <div className={`p-3 md:p-5 rounded-lg border relative overflow-hidden ${
              darkMode
                ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300'
                : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            } ${isLoading ? 'opacity-50' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-white/10' : 'bg-gray-50'}`}>
                  <BookOpen className={`w-4 h-4 ${darkMode ? 'text-white/70' : 'text-[#00001a]'}`} />
                </div>

              </div>
              <div className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Total Problems
              </div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {isLoading ? (
                  <div className="bg-gray-300 h-8 w-12 rounded"></div>
                ) : (
                  analyticsData.totalProblems
                )}
              </div>
            </div>

            {/* Total Bookings Card */}
            <div className={`p-3 md:p-5 rounded-lg border relative overflow-hidden ${
              darkMode
                ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300'
                : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            } ${isLoading ? 'opacity-50' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-green-500/20' : 'bg-gray-100'}`}>
                  <Calendar className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`} />
                </div>

              </div>
              <div className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Total Bookings
              </div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {isLoading ? (
                  <div className="bg-gray-300 h-8 w-12 rounded"></div>
                ) : (
                  analyticsData.totalBookings
                )}
              </div>
            </div>

            {/* Money Spent Card */}
            <div className={`p-3 md:p-5 rounded-lg border relative overflow-hidden ${
              darkMode
                ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300'
                : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            } ${isLoading ? 'opacity-50' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-gray-100'}`}>
                  <DollarSign className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                </div>

              </div>
              <div className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Money Spent
              </div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {isLoading ? (
                  <div className="bg-gray-300 h-8 w-16 rounded"></div>
                ) : (
                  formatCurrency(analyticsData.totalMoneySpent)
                )}
              </div>
            </div>

            {/* Total Minutes Card */}
            <div className={`p-3 md:p-5 rounded-lg border relative overflow-hidden ${
              darkMode
                ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300'
                : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            } ${isLoading ? 'opacity-50' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                  <Clock className={`w-4 h-4 ${darkMode ? 'text-white/70' : 'text-[#00001a]'}`} />
                </div>

              </div>
              <div className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Total Minutes
              </div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {isLoading ? (
                  <div className="bg-gray-300 h-8 w-16 rounded"></div>
                ) : (
                  formatTime(analyticsData.totalMinutes)
                )}
              </div>
            </div>

            {/* Level Card */}
            <div className={`p-3 md:p-5 rounded-lg border relative overflow-hidden ${
              darkMode
                ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300'
                : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            } ${isLoading ? 'opacity-50' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                  <Trophy className={`w-4 h-4 ${darkMode ? 'text-white/70' : 'text-[#00001a]'}`} />
                </div>
                <div className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                  {analyticsData.levelProgress}%
                </div>
              </div>
              <div className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Current Level
              </div>
              <div className={`text-2xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {isLoading ? (
                  <div className="bg-gray-300 h-8 w-16 rounded"></div>
                ) : (
                  <>
                    {analyticsData.level}
                    <div className={`w-8 h-1 rounded-full ${darkMode ? 'bg-white/20' : 'bg-gray-200'} overflow-hidden`}>
                      <div
                        className={`h-full ${darkMode ? 'bg-white/70' : 'bg-[#00001a]'}`}
                        style={{ width: `${analyticsData.levelProgress}%` }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>



        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Trending Solvers */}
          <div className={`p-4 md:p-6 lg:p-8 border relative overflow-hidden ${
            darkMode
              ? 'bg-[#00001a] rounded-lg border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300'
              : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-green-500/20' : 'bg-gray-100'}`}>
                    <TrendingUp className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`} />
                  </div>
                  Trending Solvers
                </h3>
                <button
                  onClick={() => navigate('/explore')}
                  className={`text-sm font-medium ${
                    darkMode ? 'text-blue-400' : 'text-[#00001a]'
                  }`}
                >
                  View All →
                </button>
              </div>
              <div className="space-y-4">
                {trendingSolvers.map((solver, index) => (
                  <div
                    key={solver.id}
                    className={`p-5 rounded-lg border cursor-pointer relative overflow-hidden ${
                      darkMode
                        ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300'
                        : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
                    }`}

                    onClick={() => navigate(`/explore?solver=${solver.id}`)}
                  >



                    <div className="flex items-start gap-4 relative z-10">
                      {/* Avatar */}
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                          darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-100 text-[#00001a]'
                        }`}>
                          {solver.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border ${
                          solver.isOnline ? (darkMode ? 'bg-green-500' : 'bg-[#00001a]') : 'bg-gray-400'
                        } ${darkMode ? 'border-[#00001a]' : 'border-white'}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {solver.name}
                          </h4>
                          <div className={`p-0.5 rounded-full ${darkMode ? 'bg-blue-500/20' : 'bg-gray-100'}`}>
                            <CheckCircle className={`w-3 h-3 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                          </div>
                        </div>

                        <p className={`text-sm mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                          {solver.topic}
                        </p>

                        {/* Specialties */}
                        <div className="flex flex-wrap gap-1 mb-3 relative z-10">
                          {solver.specialties.slice(0, 3).map((specialty, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-0.5 rounded-md border text-xs relative z-10 ${
                                darkMode ? 'bg-white/10 text-white/70 border-gray-400' : 'bg-gray-100 text-[#00001a] border-gray-400'
                              }`}
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <Star className={`w-3 h-3 ${darkMode ? 'text-white/70 fill-white/70' : 'text-[#00001a] fill-[#00001a]'}`} />
                            <span className={`font-medium ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                              {solver.rating}
                            </span>
                          </div>
                          <div className={`${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            ${solver.hourlyRate}/hr
                          </div>
                          <div className={`${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            {solver.responseTime}
                          </div>
                        </div>

                        {/* Availability */}
                        {solver.nextAvailable && (
                          <div className={`text-xs mt-2 ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                            Next available: {solver.nextAvailable}
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="flex flex-col gap-2 relative z-20">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/explore?book=${solver.id}`)
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium relative z-20 ${
                            solver.isOnline
                              ? (darkMode
                                ? 'bg-transparent text-green-400 border border-green-400/30'
                                : 'bg-[#00001a] text-white border border-[#00001a]')
                              : (darkMode
                                ? 'bg-transparent text-blue-400 border border-blue-400/30'
                                : 'bg-gray-100 text-[#00001a] border border-gray-300')
                          }`}
                        >
                          {solver.isOnline ? 'Book Now' : 'Schedule'}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate('/sessions')
                          }}
                          className={`px-4 py-1 rounded-lg border text-xs font-medium relative z-20 ${
                            darkMode
                              ? 'bg-white/10 text-white border-white/20'
                              : 'bg-white text-[#00001a] border-[#00001a]/20'
                          }`}
                        >
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>


            </div>
          </div>

          {/* Enhanced Upcoming Bookings with Calendar */}
          <div className={`p-4 md:p-6 lg:p-8 border relative overflow-hidden ${
            darkMode
              ? 'bg-[#00001a] rounded-lg border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300'
              : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}>


            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-gray-100'}`}>
                    <Calendar className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                  </div>
                  Upcoming Sessions
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/sessions')}
                    className={`text-sm font-medium ${
                      darkMode ? 'text-blue-400' : 'text-[#00001a]'
                    }`}
                  >
                    View All →
                  </button>
                </div>
              </div>

              {/* Mini Calendar View */}
              <div className={`mb-6 p-4 rounded-lg border ${
                darkMode
                  ? 'bg-[#00001a] border-white/20 hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 shadow-xl'
                  : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className={`font-medium ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className={`p-1 rounded-lg transition-all duration-300 ${
                        darkMode ? 'text-white/70 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => navigateMonth(1)}
                      className={`p-1 rounded-lg transition-all duration-300 ${
                        darkMode ? 'text-white/70 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Day Headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className={`text-center text-xs font-medium p-2 ${
                      darkMode ? 'text-white/60' : 'text-gray-500'
                    }`}>
                      {day}
                    </div>
                  ))}

                  {/* Calendar Days */}
                  {getCalendarDays().map((day, index) => {
                    const today = new Date()
                    const isToday = day &&
                      currentDate.getFullYear() === today.getFullYear() &&
                      currentDate.getMonth() === today.getMonth() &&
                      day === today.getDate()

                    const isSelected = selectedDay === day

                    // Check if this day has bookings
                    const dayDate = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null
                    const hasBooking = dayDate && upcomingBookings.some(booking => {
                      try {
                        const scheduledTime = booking.scheduledTime instanceof Date
                          ? booking.scheduledTime
                          : new Date(booking.scheduledTime)
                        return scheduledTime.toDateString() === dayDate.toDateString()
                      } catch (error) {
                        console.warn('Error checking booking date:', error)
                        return false
                      }
                    })

                    return (
                      <div
                        key={index}
                        onClick={() => day && setSelectedDay(day)}
                        className={`aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer relative ${
                          !day
                            ? ''
                            : isToday
                            ? (darkMode ? 'bg-white/30 text-white font-bold' : 'bg-[#00001a] text-white font-bold')
                            : hasBooking
                            ? (darkMode ? 'bg-white/20 text-white/70' : 'bg-gray-100 text-[#00001a]')
                            : isSelected
                            ? (darkMode ? 'bg-white/20 text-white' : 'bg-gray-200 text-[#00001a]')
                            : (darkMode ? 'text-white/60' : 'text-gray-600')
                        }`}
                      >
                        {day}
                        {hasBooking && (
                          <div className={`absolute w-1 h-1 rounded-full bottom-1 ${
                            darkMode ? 'bg-white/70' : 'bg-[#00001a]'
                          }`} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* Enhanced Booking Cards */}
              <div className="space-y-4">
                {upcomingBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />
                    <h4 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      No upcoming sessions
                    </h4>
                    <p className={`${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                      Book a session with an expert solver to get started
                    </p>
                    <button
                      onClick={() => navigate('/explore')}
                      className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-transparent text-blue-400 border border-blue-400/30 hover:bg-blue-400/10'
                          : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-gray-800'
                      }`}
                    >
                      Find Solvers
                    </button>
                  </div>
                ) : (
                  upcomingBookings.map((booking, index) => (
                    <div
                      key={booking.id}
                      className={`p-5 rounded-lg border cursor-pointer relative overflow-hidden ${
                        darkMode
                          ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300'
                          : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
                      }`}

                    >




                      <div className="flex flex-col lg:flex-row gap-4 relative z-10">
                        {/* Main Content */}
                        <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                          {/* Session Icon - Matching Trending Solvers Style */}
                          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0 relative transition-all duration-300 ${
                            darkMode ? 'bg-[#00001a] border border-gray-800' : 'bg-gray-100'
                          }`}>
                            <Video className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${
                              darkMode
                                ? 'text-blue-400'
                                : 'text-gray-600'
                            }`} />

                          </div>

                          <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h4 className={`font-semibold truncate ${
                              darkMode
                                ? 'text-white'
                                : 'text-[#00001a]'
                            }`}>
                              {booking.topic}
                            </h4>
                            <span className={`px-2 py-0.5 rounded-lg text-xs font-medium relative z-10 flex-shrink-0 border ${
                              booking.status === 'confirmed'
                                ? (darkMode
                                  ? 'bg-white/10 text-white/70 border-white/20'
                                  : 'bg-gray-100 text-[#00001a] border-gray-200')
                                : (darkMode
                                  ? 'bg-white/10 text-white/70 border-white/20'
                                  : 'bg-gray-100 text-[#00001a] border-gray-200')
                            }`}>
                              {booking.status.toUpperCase()}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className={`text-sm ${
                              darkMode
                                ? 'text-white/70'
                                : 'text-gray-600'
                            }`}>
                              with {booking.solver}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className={`w-3 h-3 ${
                                darkMode
                                  ? 'text-white/70 fill-white/70'
                                  : 'text-[#00001a] fill-[#00001a]'
                              }`} />
                              <span className={`text-xs ${
                                darkMode
                                  ? 'text-white/60'
                                  : 'text-gray-500'
                              }`}>
                                {booking.solverRating}
                              </span>
                            </div>
                          </div>

                          {/* Enhanced Session Details */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className={`w-4 h-4 flex-shrink-0 ${
                                darkMode
                                  ? 'text-white/50'
                                  : 'text-gray-400'
                              }`} />
                              <span className={`truncate ${
                                darkMode
                                  ? 'text-white/70'
                                  : 'text-gray-600'
                              }`}>
                                {booking.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className={`w-4 h-4 flex-shrink-0 ${
                                darkMode
                                  ? 'text-white/50'
                                  : 'text-gray-400'
                              }`} />
                              <span className={`truncate ${
                                darkMode
                                  ? 'text-white/70'
                                  : 'text-gray-600'
                              }`}>
                                {booking.date}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className={`w-4 h-4 flex-shrink-0 ${
                                darkMode
                                  ? 'text-white/50'
                                  : 'text-gray-400'
                              }`} />
                              <span className={`truncate ${
                                darkMode
                                  ? 'text-white/70'
                                  : 'text-gray-600'
                              }`}>
                                {booking.duration} min
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className={`w-4 h-4 flex-shrink-0 ${
                                darkMode
                                  ? 'text-white/50'
                                  : 'text-gray-400'
                              }`} />
                              <span className={`truncate font-medium ${
                                darkMode
                                  ? 'text-white/70'
                                  : 'text-gray-600'
                              }`}>
                                ${booking.price.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Enhanced Features */}
                          <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs relative z-10">
                            {booking.hasPreparationMaterial && (
                              <button
                                onClick={() => navigate('/sessions')}
                                className={`flex items-center gap-1 px-2 py-1 rounded-lg border relative z-10 ${
                                  darkMode
                                    ? 'bg-white/10 text-white/70 border-white/20'
                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                }`}
                              >
                                <BookOpen className={`w-3 h-3 transition-all duration-300 ${
                                  darkMode
                                    ? 'text-white/70'
                                    : 'text-gray-600'
                                }`} />
                                Materials
                              </button>
                            )}
                            {booking.reminderSent && (
                              <button
                                onClick={() => navigate('/sessions')}
                                className={`flex items-center gap-1 px-2 py-1 rounded-lg border relative z-10 ${
                                  darkMode
                                    ? 'bg-white/10 text-white/70 border-white/20'
                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                }`}
                              >
                                <Bell className={`w-3 h-3 transition-all duration-300 ${
                                  darkMode
                                    ? 'text-white/70'
                                    : 'text-gray-600'
                                }`} />
                                Reminded
                              </button>
                            )}
                            {booking.hasRecording && (
                              <button
                                onClick={() => navigate('/sessions')}
                                className={`flex items-center gap-1 px-2 py-1 rounded-lg border relative z-10 ${
                                  darkMode
                                    ? 'bg-white/10 text-white/70 border-white/20'
                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                }`}
                              >
                                <Video className={`w-3 h-3 transition-all duration-300 ${
                                  darkMode
                                    ? 'text-white/70'
                                    : 'text-gray-600'
                                }`} />
                                Recording
                              </button>
                            )}
                          </div>
                          </div>
                        </div>

                        {/* Enhanced Action Buttons */}
                        <div className="flex flex-col gap-2 lg:w-32 flex-shrink-0">
                          <button
                            onClick={() => handleJoinSession(booking.id)}
                            disabled={!booking.canJoin}
                            className={`w-full px-3 py-2 rounded-lg border text-sm font-medium ${
                              booking.canJoin
                                ? (darkMode
                                  ? 'bg-[#00001a] text-white border-white/20'
                                  : 'bg-[#00001a] text-white border-[#00001a]')
                                : (darkMode
                                  ? 'bg-white/10 text-white/50 border-white/20 cursor-not-allowed opacity-60'
                                  : 'bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed opacity-60')
                            }`}
                          >
                            <span className="relative z-10">{booking.canJoin ? 'Join Now' : 'Join Soon'}</span>
                          </button>

                          <div className="flex gap-1">
                            <button
                              onClick={() => handleRescheduleBooking(booking.id)}
                              className={`flex-1 px-2 py-1 rounded-lg border text-xs font-medium ${
                                darkMode
                                  ? 'bg-white/10 text-white/70 border-white/20'
                                  : 'bg-gray-100 text-gray-600 border-gray-200'
                              }`}
                            >
                              Reschedule
                            </button>
                            <button
                              onClick={() => navigate('/sessions')}
                              className={`flex-1 px-2 py-1 rounded-lg border text-xs font-medium ${
                                darkMode
                                  ? 'bg-white/10 text-white/70 border-white/20'
                                  : 'bg-gray-100 text-gray-600 border-gray-200'
                              }`}
                            >
                              Chat
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Quick Calendar Actions */}
              {upcomingBookings.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex justify-center">
                    <button
                      onClick={() => navigate('/explore')}
                      className={`py-2 px-6 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                        darkMode
                          ? 'bg-[#00001a] border-gray-800 text-white/70 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                          : 'bg-[#00001a] text-white border-[#00001a]'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      Book More
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Anonymous Pool Responses */}
        <div className={`group p-8 border relative overflow-hidden ${
          darkMode
            ? 'bg-[#00001a] rounded-lg border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300'
            : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
        }`}>


          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold flex items-center gap-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                <div className={`p-2.5 rounded-xl border ${
                  darkMode ? 'bg-[#00001a] border-white/20' : 'bg-gray-100 border-gray-200'
                }`}>
                  <MessageSquare className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-[#00001a]'}`} />
                </div>
                <div>
                  <div>Anonymous Pool Activity</div>
                  <div className={`text-xs font-normal ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                    Community Q&A responses
                  </div>
                </div>
              </h3>

              <div className="flex items-center gap-3">
                {/* New Responses Badge */}
                {anonymousPoolResponses.filter(r => r.hasNewResponses).length > 0 && (
                  <div className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                    darkMode
                      ? 'bg-[#00001a] text-white border-white/20'
                      : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                  }`}>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-white' : 'bg-[#00001a]'}`}></div>
                      {anonymousPoolResponses.filter(r => r.hasNewResponses).length} New
                    </div>
                  </div>
                )}

                {/* View All Button */}
                <button
                  onClick={() => navigate('/sessions?tab=anonymous')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300 ${
                    darkMode
                      ? 'bg-blue-500/20 text-blue-400 border-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                      : 'bg-[#00001a] text-white border-[#00001a]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    View All
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            {/* Enhanced Response Cards */}
            <div className="space-y-4">
              {anonymousPoolResponses.length === 0 ? (
                <div className={`text-center py-12 rounded-xl border ${
                  darkMode ? 'border-white/10 bg-[#00001a]' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-[#00001a] border border-white/20' : 'bg-[#00001a]/10'
                  }`}>
                    <MessageSquare className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                  </div>
                  <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    No active questions yet
                  </h4>
                  <p className={`text-sm mb-6 max-w-sm mx-auto ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                    Be the first to ask a question in the anonymous pool and get expert help from the community
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <button
                      onClick={() => navigate('/sessions?tab=anonymous&action=ask')}
                      className={`px-6 py-3 rounded-lg text-sm font-medium border transition-all duration-300 ${
                        darkMode
                          ? 'bg-green-500/20 text-green-400 border-gray-800 hover:shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                          : 'bg-[#00001a] text-white border-[#00001a]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Ask Question
                      </div>
                    </button>
                    <button
                      onClick={() => navigate('/sessions?tab=anonymous')}
                      className={`px-6 py-3 rounded-lg text-sm font-medium border transition-all duration-300 ${
                        darkMode
                          ? 'bg-cyan-500/20 text-cyan-400 border-gray-800 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                          : 'bg-[#00001a] text-white border-[#00001a]'
                      }`}
                    >
                      Browse Pool
                    </button>
                  </div>
                </div>
              ) : (
                anonymousPoolResponses.map((response, index) => (
                  <div
                    key={response.id}
                    className={`group/response p-5 rounded-lg border cursor-pointer relative overflow-hidden ${
                      darkMode
                        ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300'
                        : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
                    }`}

                    onClick={() => handleViewResponse(response.id)}
                  >


                    <div className="flex items-start gap-4 relative z-10">
                      {/* Question Icon */}
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                      }`}>
                        {response.status === 'answered' ? (
                          <CheckCircle className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                        ) : (
                          <MessageSquare className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className={`font-semibold text-sm leading-tight ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {response.question}
                          </h4>
                          {response.bestAnswer && (
                            <div className={`ml-2 px-2 py-0.5 rounded-lg border text-xs font-medium ${
                              darkMode ? 'bg-white/10 text-white border-white/20' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                            }`}>
                              Best Answer
                            </div>
                          )}
                        </div>

                        {/* Tags and Difficulty */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {response.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-0.5 rounded-lg border text-xs ${
                                darkMode ? 'bg-white/10 text-white border-white/20' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                          <span className={`px-2 py-0.5 rounded-lg border text-xs font-medium ${
                            darkMode ? 'bg-white/10 text-white border-white/20' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                          }`}>
                            {response.difficulty}
                          </span>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs">
                          <span className={`${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            {response.timeAgo}
                          </span>
                          <div className="flex items-center gap-1">
                            <MessageSquare className={`w-3 h-3 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                            <span className={`font-medium ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                              {response.responses}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className={`w-3 h-3 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                            <span className={`font-medium ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                              {response.upvotes}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className={`w-3 h-3 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                            <span className={`font-medium ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                              {response.views}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status and Actions */}
                      <div className="flex flex-col items-end gap-3 min-w-[120px]">
                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          <div className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${
                            response.status === 'answered'
                              ? (darkMode
                                ? 'bg-[#00001a] text-white border-white/20'
                                : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20')
                              : (darkMode
                                ? 'bg-[#00001a] text-white border-white/20'
                                : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20')
                          }`}>
                            {response.status === 'answered' ? (
                              <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Solved
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Active
                              </div>
                            )}
                          </div>
                        </div>

                        {/* New Responses Notification */}
                        {response.hasNewResponses && (
                          <div className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 border ${
                            darkMode
                              ? 'bg-[#00001a] text-white border-white/20'
                              : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                          }`}>
                            <Bell className="w-3 h-3" />
                            New responses!
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 w-full min-w-[120px]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewResponse(response.id)
                            }}
                            className={`px-4 py-2 rounded-lg text-xs font-medium border text-center ${
                              darkMode
                                ? 'bg-[#00001a] text-white border-white/20'
                                : 'bg-[#00001a] text-white border-[#00001a]'
                            }`}
                          >
                            View Details
                          </button>

                          {response.status === 'answered' && response.bestAnswer && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewResponse(response.id)
                              }}
                              className={`px-4 py-2 rounded-lg text-xs font-medium border text-center ${
                                darkMode
                                  ? 'bg-[#00001a] text-white border-[#00001a]'
                                  : 'bg-[#00001a] text-white border-[#00001a]'
                              }`}
                            >
                              Best Answer
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>


          </div>
        </div>

      </div>
    </div>
  )
}

export default SeekerDashboard

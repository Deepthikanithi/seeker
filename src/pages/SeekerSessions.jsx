import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import {
  MessageSquare,
  Calendar,
  Video,
  Users,
  User,
  Clock,
  Star,
  CheckCircle,
  Plus,
  Search,
  DollarSign,
  FileText,
  X,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Monitor,
  Hand,
  MoreHorizontal,
  Send,
  Play,
  ThumbsUp,
  PenTool,
  StickyNote,
  Smile,
  Share2,
  FolderOpen
} from 'lucide-react'

const SeekerSessions = ({ darkMode }) => {
  const navigate = useNavigate()
  const { t } = useLanguage()

  // Main state management
  const [activeTab, setActiveTab] = useState('upcoming')
  const [searchQuery, setSearchQuery] = useState('')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingType, setBookingType] = useState('') // 'anonymous' or 'group'
  const [showSolverBrowser, setShowSolverBrowser] = useState(false)
  const [bookingTopic, setBookingTopic] = useState('')
  const [selectedSolver, setSelectedSolver] = useState(null)
  const [numberOfParticipants, setNumberOfParticipants] = useState(2)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [showReactionsModal, setShowReactionsModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [showResponsesModal, setShowResponsesModal] = useState(false)
  const [showAskQuestionModal, setShowAskQuestionModal] = useState(false)
  const [showRecordingModal, setShowRecordingModal] = useState(false)
  const [selectedSession, setSelectedSession] = useState(null)
  const [selectedQuery, setSelectedQuery] = useState(null)
  const [selectedRecording, setSelectedRecording] = useState(null)
  const [verifiedSessions, setVerifiedSessions] = useState(new Set()) // Track verified sessions
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [verificationStep, setVerificationStep] = useState('camera') // 'camera', 'processing', 'success', 'failed'
  const [pendingAction, setPendingAction] = useState(null) // Store the action to perform after verification

  // File management
  const [uploadedFiles, setUploadedFiles] = useState([])

  // Chat and communication
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isInSession, setIsInSession] = useState(false)
  const [sessionTimer, setSessionTimer] = useState(0)

  // Audio/Video controls
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [handRaised, setHandRaised] = useState(false)
  const [sessionReminders, setSessionReminders] = useState(true)
  const [selectedPlatform, setSelectedPlatform] = useState('platform')

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Sessions', icon: Calendar, count: 3 },
    { id: 'booking', label: 'Book Session', icon: Plus, count: 0 },
    { id: 'history', label: 'Booking History', icon: Clock, count: 12 },
    { id: 'anonymous', label: 'Query Pool', icon: Users, count: 5 },
    { id: 'files', label: 'Files & References', icon: FileText, count: 8 },
    { id: 'chat', label: 'Chat History', icon: MessageSquare, count: 3 },
    { id: 'live', label: 'Live Session', icon: Video, count: 0 },
  ]

  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: 'UB001',
      solver: { name: 'Alex Chen', rating: 4.9, isOnline: true, id: 'solver1' },
      topic: 'React Performance Optimization',
      description: 'Deep dive into React performance optimization techniques.',
      scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      duration: 60,
      price: 45,
      status: 'confirmed',
      type: 'individual',
      canJoin: true,
      tags: ['React', 'Performance', 'Frontend']
    },
    {
      id: 'UB002',
      solver: { name: 'Sarah Davis', rating: 4.8, isOnline: false, id: 'solver2' },
      topic: 'Node.js Backend Development',
      description: 'Building scalable backend services with Node.js and Express.',
      scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      duration: 90,
      price: 60,
      status: 'confirmed',
      type: 'individual',
      canJoin: true,
      tags: ['Node.js', 'Backend', 'API']
    },
    {
      id: 'UB003',
      solver: { name: 'Mike Johnson', rating: 4.7, isOnline: true, id: 'solver3' },
      topic: 'Database Design Patterns',
      description: 'Learn advanced database design patterns and optimization techniques.',
      scheduledTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      duration: 75,
      price: 55,
      status: 'confirmed',
      type: 'group',
      canJoin: true,
      tags: ['Database', 'SQL', 'Design']
    }
  ]

  const sessionHistory = [
    {
      id: 'SH001',
      solver: { name: 'Mike Johnson', rating: 4.7 },
      topic: 'JavaScript Fundamentals',
      completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      duration: 60,
      price: 40,
      status: 'completed',
      rating: 5,
      review: 'Excellent session! Very clear explanations.',
      hasRecording: true
    },
    {
      id: 'SH002',
      solver: { name: 'Emma Wilson', rating: 4.8 },
      topic: 'CSS Grid and Flexbox',
      completedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      duration: 45,
      price: 35,
      status: 'completed',
      rating: 4,
      review: 'Good session, learned a lot about modern CSS.',
      hasRecording: false
    },
    {
      id: 'SH003',
      solver: { name: 'David Brown', rating: 4.6 },
      topic: 'Python Data Analysis',
      completedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      duration: 90,
      price: 65,
      status: 'completed',
      rating: 5,
      review: 'Amazing deep dive into pandas and numpy!',
      hasRecording: true
    }
  ]

  const queryPool = [
    {
      id: 'QP001',
      title: 'How to optimize React component re-renders?',
      description: 'I have a complex React app with performance issues. Components are re-rendering unnecessarily and causing lag.',
      category: 'Frontend Development',
      status: 'answered',
      responses: 8,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      tags: ['React', 'Performance', 'Optimization']
    },
    {
      id: 'QP002',
      title: 'Best practices for Node.js error handling?',
      description: 'What are the recommended patterns for handling errors in Node.js applications, especially for async operations?',
      category: 'Backend Development',
      status: 'open',
      responses: 3,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      tags: ['Node.js', 'Error Handling', 'Async']
    },
    {
      id: 'QP003',
      title: 'Database indexing strategies for large datasets?',
      description: 'Working with millions of records and queries are getting slow. Need advice on indexing strategies.',
      category: 'Database',
      status: 'answered',
      responses: 12,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      tags: ['Database', 'Performance', 'Indexing']
    }
  ]

  const mockFiles = [
    {
      id: 'F001',
      name: 'React_Performance_Guide.pdf',
      size: '2.4 MB',
      type: 'pdf',
      uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      sharedBy: 'You'
    },
    {
      id: 'F002',
      name: 'Node.js_Best_Practices.docx',
      size: '1.8 MB',
      type: 'doc',
      uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      sharedBy: 'Alex Chen'
    },
    {
      id: 'F003',
      name: 'Database_Schema_Design.zip',
      size: '5.2 MB',
      type: 'zip',
      uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      sharedBy: 'You'
    },
    {
      id: 'F004',
      name: 'CSS_Grid_Examples.html',
      size: '0.8 MB',
      type: 'html',
      uploadedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      sharedBy: 'Emma Wilson'
    }
  ]

  // Mock solvers data for browsing
  const availableSolvers = [
    {
      id: 'solver1',
      name: 'Alex Chen',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 45,
      isOnline: true,
      specialties: ['React', 'Performance', 'Frontend', 'JavaScript', 'TypeScript'],
      experience: '5+ years',
      bio: 'Senior Frontend Developer specializing in React performance optimization and modern JavaScript frameworks.',
      completedSessions: 89,
      responseTime: '< 2 hours'
    },
    {
      id: 'solver2',
      name: 'Sarah Davis',
      rating: 4.8,
      reviews: 94,
      hourlyRate: 60,
      isOnline: false,
      specialties: ['Node.js', 'Backend', 'API', 'Express', 'MongoDB'],
      experience: '7+ years',
      bio: 'Full-stack developer with expertise in Node.js backend development and API design.',
      completedSessions: 76,
      responseTime: '< 4 hours'
    },
    {
      id: 'solver3',
      name: 'Mike Johnson',
      rating: 4.7,
      reviews: 156,
      hourlyRate: 55,
      isOnline: true,
      specialties: ['Database', 'SQL', 'Design', 'PostgreSQL', 'MySQL'],
      experience: '8+ years',
      bio: 'Database architect with extensive experience in database design and optimization.',
      completedSessions: 112,
      responseTime: '< 1 hour'
    },
    {
      id: 'solver4',
      name: 'Emma Wilson',
      rating: 4.8,
      reviews: 83,
      hourlyRate: 40,
      isOnline: true,
      specialties: ['CSS', 'HTML', 'Frontend', 'UI/UX', 'Responsive Design'],
      experience: '4+ years',
      bio: 'Frontend specialist focused on modern CSS techniques and responsive design.',
      completedSessions: 67,
      responseTime: '< 3 hours'
    },
    {
      id: 'solver5',
      name: 'David Brown',
      rating: 4.6,
      reviews: 71,
      hourlyRate: 65,
      isOnline: false,
      specialties: ['Python', 'Data Analysis', 'Machine Learning', 'Django'],
      experience: '6+ years',
      bio: 'Python developer with expertise in data analysis and machine learning applications.',
      completedSessions: 54,
      responseTime: '< 6 hours'
    },
    {
      id: 'solver6',
      name: 'Lisa Zhang',
      rating: 4.9,
      reviews: 102,
      hourlyRate: 50,
      isOnline: true,
      specialties: ['Vue.js', 'JavaScript', 'Frontend', 'Nuxt.js', 'Vuex'],
      experience: '5+ years',
      bio: 'Vue.js expert with deep knowledge of the Vue ecosystem and modern frontend development.',
      completedSessions: 88,
      responseTime: '< 2 hours'
    }
  ]

  // Function to filter solvers based on topic
  const getRelevantSolvers = (topic) => {
    if (!topic) return availableSolvers

    const topicLower = topic.toLowerCase()
    return availableSolvers.filter(solver =>
      solver.specialties.some(specialty =>
        specialty.toLowerCase().includes(topicLower) ||
        topicLower.includes(specialty.toLowerCase())
      )
    ).sort((a, b) => {
      // Sort by online status first, then by rating
      if (a.isOnline && !b.isOnline) return -1
      if (!a.isOnline && b.isOnline) return 1
      return b.rating - a.rating
    })
  }

  // Handler functions
  const handleBookNewSession = () => {
    navigate('/seeker/explore')
  }

  const handleRescheduleSession = (sessionId) => {
    console.log('Rescheduling session:', sessionId)
    // Open calendar integration for rescheduling
  }

  const handleCancelSession = (sessionId) => {
    if (window.confirm('Are you sure you want to cancel this session?')) {
      console.log('Cancelling session:', sessionId)
      // Handle session cancellation
    }
  }

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      type: file.type.split('/')[1] || 'file',
      uploadedAt: new Date(),
      sharedBy: 'You'
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
  }

  const handleScheduleSession = (sessionData) => {
    console.log('Scheduling session:', sessionData)
    // Integration with Google/Microsoft Calendar would go here
  }

  const handleJoinSession = (sessionId, platform = 'platform') => {
    // Check if this specific session has been verified
    if (!verifiedSessions.has(sessionId)) {
      setSelectedSession(upcomingSessions.find(s => s.id === sessionId))
      setPendingAction({ type: 'join', sessionId, platform })
      setShowVerificationModal(true)
      setVerificationStep('camera')
      return
    }
    
    // Use the platform-aware meeting handler
    handleJoinMeeting(platform, sessionId)
  }

  const handleStartChat = (solverId, solverName = 'Solver') => {
    // For chat, we use solver ID as the verification key
    const chatKey = `chat_${solverId}`
    if (!verifiedSessions.has(chatKey)) {
      setSelectedSession({ solver: { id: solverId, name: solverName } })
      setPendingAction({ type: 'chat', solverId, solverName })
      setShowVerificationModal(true)
      setVerificationStep('camera')
      return
    }

    // Load existing chat messages for this solver
    const existingMessages = [
      {
        id: 1,
        text: `Hi! I'm ${solverName}. How can I help you today?`,
        sender: solverName,
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        type: 'text'
      },
      {
        id: 2,
        text: 'Hello! I have some questions about our upcoming session.',
        sender: 'You',
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        type: 'text'
      },
      {
        id: 3,
        text: 'Of course! Feel free to ask anything. I\'m here to help.',
        sender: solverName,
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        type: 'text'
      }
    ]

    setChatMessages(existingMessages)
    setSelectedSession({ solver: { id: solverId, name: solverName } })
    setShowChatModal(true)
  }

  // Enhanced face verification with actual camera integration
  const startFaceVerification = async () => {
    try {
      setVerificationStep('processing')

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      })

      // Create video element for preview (in real implementation)
      const video = document.createElement('video')
      video.srcObject = stream
      video.play()

      // Simulate face detection and verification process
      setTimeout(() => {
        // Stop camera stream
        stream.getTracks().forEach(track => track.stop())

        // Simulate successful verification
        setVerificationStep('success')

        setTimeout(() => {
          // Execute pending action after successful verification
          if (pendingAction?.type === 'join') {
            setVerifiedSessions(prev => new Set([...prev, pendingAction.sessionId]))
            setShowVerificationModal(false)
            handleJoinMeeting(pendingAction.platform, pendingAction.sessionId)
          } else if (pendingAction?.type === 'chat') {
            const chatKey = `chat_${pendingAction.solverId}`
            setVerifiedSessions(prev => new Set([...prev, chatKey]))
            setShowVerificationModal(false)
            handleStartChat(pendingAction.solverId, pendingAction.solverName)
          }
          setPendingAction(null)
          setVerificationStep('camera')
        }, 2000)
      }, 3000)

    } catch (error) {
      console.error('Camera access denied:', error)
      setVerificationStep('failed')
      setTimeout(() => {
        setVerificationStep('camera')
      }, 3000)
    }
  }

  const handleJoinMeeting = (platform, sessionId) => {
    // Sessions are conducted only on our platform as per user preferences
    console.log('Joining session on our platform:', sessionId)
    setIsInSession(true)
    setActiveTab('live')
    setSessionTimer(0)

    // Start session timer
    const timer = setInterval(() => {
      setSessionTimer(prev => prev + 1)
    }, 1000)

    // Store timer reference for cleanup
    window.sessionTimer = timer

    // Show success notification
    console.log(`Successfully joined session ${sessionId} on SynapMentor platform`)
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: 'You',
        timestamp: new Date(),
        type: 'text'
      }
      setChatMessages(prev => [...prev, message])
      setNewMessage('')
    }
  }

  const handleReaction = (reaction) => {
    console.log('Sending reaction:', reaction)
    // Handle reaction in live session
  }

  const toggleMute = () => setIsMuted(!isMuted)
  const toggleVideo = () => setIsVideoOn(!isVideoOn)
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing)
  const toggleHandRaise = () => setHandRaised(!handRaised)

  const extendSession = () => {
    console.log('Extending session time')
    // Mock data for session extension
    const extensionOptions = [
      { duration: 15, cost: 12 },
      { duration: 30, cost: 22 },
      { duration: 45, cost: 32 }
    ]

    const selectedExtension = extensionOptions[0] // Default to 15 minutes
    const confirmExtension = window.confirm(
      `Extend session by ${selectedExtension.duration} minutes for $${selectedExtension.cost}?\n\n` +
      `Current session time: ${Math.floor(sessionTimer / 60)}:${(sessionTimer % 60).toString().padStart(2, '0')}\n` +
      `Extended time will be: ${Math.floor((sessionTimer + selectedExtension.duration * 60) / 60)}:${((sessionTimer + selectedExtension.duration * 60) % 60).toString().padStart(2, '0')}`
    )

    if (confirmExtension) {
      alert(`Session extended by ${selectedExtension.duration} minutes!\nAdditional cost: $${selectedExtension.cost}\nPayment will be processed automatically.`)
    }
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Seeker Sessions
            </h1>
            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
              Manage your learning sessions, chat with solvers, and track your progress
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? (darkMode ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-[#00001a]/20 text-[#00001a] border border-[#00001a]/30')
                    : (darkMode ? 'bg-white/5 text-white/70 border border-white/20 hover:bg-white/10' : 'bg-[#00001a]/10 text-[#00001a]/70 border border-[#00001a]/20 hover:bg-[#00001a]/20')
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? (darkMode ? 'bg-blue-400/20 text-blue-300' : 'bg-[#00001a]/30 text-[#00001a]')
                      : (darkMode ? 'bg-white/20 text-white/80' : 'bg-[#00001a]/20 text-[#00001a]/80')
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className={`group p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
          darkMode
            ? 'rounded-lg border-white/20 hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]'
            : 'rounded-lg bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_25px_rgba(0,0,26,0.15)]'
        }`}>
          {/* Background Gradient */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            darkMode
              ? 'bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/5'
              : 'bg-gradient-to-br from-[#00001a]/5 via-transparent to-[#00001a]/5'
          }`} />

          <div className="relative z-10">
          
          {/* Upcoming Sessions Tab */}
          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Upcoming Sessions ({upcomingSessions.length})
              </h3>

              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className={`group p-6 rounded-lg border transition-all duration-500 cursor-pointer ${
                    darkMode
                      ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                      : 'bg-white/40 border-white/30 hover:bg-white/60 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                          }`}>
                            <User className={`w-6 h-6 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} />
                          </div>
                          <div>
                            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {session.topic}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                                with {session.solver.name}
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className={`w-3 h-3 ${darkMode ? 'text-yellow-400 fill-current' : 'text-[#00001a]/70 fill-[#00001a]/70'}`} />
                                <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                                  {session.solver.rating}
                                </span>
                              </div>
                              {session.solver.isOnline && (
                                <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-green-400' : 'bg-[#00001a]'}`}></div>
                              )}
                            </div>
                          </div>
                        </div>

                        <p className={`text-sm mb-4 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                          {session.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className={`w-4 h-4 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} />
                            <span className={darkMode ? 'text-white/70' : 'text-[#00001a]/70'}>
                              {session.scheduledTime.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className={`w-4 h-4 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} />
                            <span className={darkMode ? 'text-white/70' : 'text-[#00001a]/70'}>
                              {session.duration} min
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className={`w-4 h-4 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} />
                            <span className={darkMode ? 'text-white/70' : 'text-[#00001a]/70'}>
                              ${session.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <button
                          onClick={() => handleJoinSession(session.id)}
                          disabled={!session.canJoin}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                            session.canJoin
                              ? (darkMode
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                                  : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90')
                              : (darkMode
                                  ? 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'
                                  : 'bg-[#00001a]/5 text-[#00001a]/30 border border-[#00001a]/10 cursor-not-allowed')
                          }`}
                        >
                          <Video className="w-4 h-4" />
                          Join Session
                        </button>

                        <button
                          onClick={() => handleStartChat(session.solver.id, session.solver.name)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                            darkMode
                              ? 'bg-white/5 text-white border border-white/20 hover:bg-white/10'
                              : 'bg-white text-[#00001a] border border-[#00001a]/20 hover:bg-[#00001a]/10'
                          }`}
                        >
                          <MessageSquare className="w-4 h-4" />
                          Chat
                        </button>
                      </div>
                    </div>


                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Book Session Tab */}
          {activeTab === 'booking' && (
            <div className="space-y-6">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Book New Session
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Anonymous Booking */}
                <div className={`p-6 rounded-lg border transition-all duration-500 ${
                  darkMode
                    ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20'
                    : 'bg-white/40 border-white/30 hover:bg-white/60'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'}`}>
                      <Users className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Anonymous Pool
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        Quick help from available solvers
                      </p>
                    </div>
                  </div>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    Get instant help from any available solver without choosing a specific person.
                  </p>
                  <button
                    onClick={() => {
                      setBookingType('anonymous')
                      setShowBookingModal(true)
                    }}
                    className={`w-full py-2 rounded-lg font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                        : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90'
                    }`}
                  >
                    Book Anonymous Session
                  </button>
                </div>

                {/* Group Booking */}
                <div className={`p-6 rounded-lg border transition-all duration-500 ${
                  darkMode
                    ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20'
                    : 'bg-white/40 border-white/30 hover:bg-white/60'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'}`}>
                      <Users className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Group Session
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        Learn with others, split the cost
                      </p>
                    </div>
                  </div>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    Join or create group sessions with other learners.
                  </p>
                  <button
                    onClick={() => {
                      setBookingType('group')
                      setShowBookingModal(true)
                    }}
                    className={`w-full py-2 rounded-lg font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                        : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90'
                    }`}
                  >
                    Book Group Session
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate('/seeker/explore')}
                  className={`p-4 rounded-lg border transition-all duration-300 flex items-center gap-3 ${
                    darkMode
                      ? 'border-white/20 text-white hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                      : 'bg-white border-[#00001a]/20 hover:bg-[#00001a]/5 text-[#00001a] hover:border-[#00001a]/30'
                  }`}
                >
                  <Search className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Browse Solvers</div>
                    <div className={`text-xs ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                      Find the perfect expert
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('anonymous')}
                  className={`p-4 rounded-lg border transition-all duration-300 flex items-center gap-3 ${
                    darkMode
                      ? 'border-white/20 text-white hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                      : 'bg-white border-[#00001a]/20 hover:bg-[#00001a]/5 text-[#00001a] hover:border-[#00001a]/30'
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Query Pool</div>
                    <div className={`text-xs ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                      Ask questions publicly
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('history')}
                  className={`p-4 rounded-lg border transition-all duration-300 flex items-center gap-3 ${
                    darkMode
                      ? 'border-white/20 text-white hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                      : 'bg-white border-[#00001a]/20 hover:bg-[#00001a]/5 text-[#00001a] hover:border-[#00001a]/30'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">View History</div>
                    <div className={`text-xs ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                      Past sessions & reviews
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Booking History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Booking History ({sessionHistory.length})
                </h3>
                <div className="flex gap-2">
                  <select className={`px-3 py-1 rounded-lg border text-sm transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/5 border-white/20 text-white [&>option]:bg-[#00001a] [&>option]:text-white'
                      : 'bg-white border-[#00001a]/20 text-[#00001a] [&>option]:bg-white [&>option]:text-[#00001a]'
                  }`}>
                    <option value="all">All Sessions</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no-show">No Show</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {sessionHistory.map((session) => (
                  <div key={session.id} className={`group p-6 rounded-lg border transition-all duration-500 cursor-pointer ${
                    darkMode
                      ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                      : 'bg-white/40 border-white/30 hover:bg-white/60 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                          }`}>
                            <CheckCircle className={`w-6 h-6 ${
                              session.status === 'completed'
                                ? (darkMode ? 'text-green-400' : 'text-[#00001a]')
                                : (darkMode ? 'text-white/50' : 'text-[#00001a]/50')
                            }`} />
                          </div>
                          <div>
                            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {session.topic}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                                with {session.solver.name}
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className={`w-3 h-3 ${darkMode ? 'text-yellow-500 fill-yellow-500' : 'text-[#00001a]/70 fill-[#00001a]/70'}`} />
                                <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                                  {session.solver.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className={`w-4 h-4 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} />
                            <span className={darkMode ? 'text-white/70' : 'text-[#00001a]/70'}>
                              {session.completedAt.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className={`w-4 h-4 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} />
                            <span className={darkMode ? 'text-white/70' : 'text-[#00001a]/70'}>
                              {session.duration} min
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className={`w-4 h-4 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} />
                            <span className={darkMode ? 'text-white/70' : 'text-[#00001a]/70'}>
                              ${session.price}
                            </span>
                          </div>
                        </div>

                        {session.rating && (
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                              Your rating:
                            </span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < session.rating
                                      ? (darkMode ? 'text-yellow-500 fill-yellow-500' : 'text-[#00001a]/70 fill-[#00001a]/70')
                                      : (darkMode ? 'text-white/20' : 'text-[#00001a]/20')
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {session.review && (
                          <p className={`text-sm italic ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                            "{session.review}"
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 ml-6">
                        <span className={`px-3 py-1 rounded text-xs font-medium text-center ${
                          session.status === 'completed'
                            ? (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-[#00001a]/10 text-[#00001a]')
                            : (darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-[#00001a]/10 text-[#00001a]')
                        }`}>
                          {session.status.toUpperCase()}
                        </span>

                        {session.hasRecording && (
                          <button
                            onClick={() => {
                              setSelectedRecording(session)
                              setShowRecordingModal(true)
                            }}
                            className={`px-3 py-1 rounded text-xs font-medium transition-all duration-300 ${
                              darkMode
                                ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                                : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
                            }`}
                          >
                            <Video className="w-3 h-3 inline mr-1" />
                            View Recording
                          </button>
                        )}

                        <button
                          onClick={() => navigate('/seeker/explore?rebook=' + session.solver.name)}
                          className={`px-3 py-1 rounded text-xs font-medium transition-all duration-300 ${
                            darkMode
                              ? 'bg-white/10 text-white/70 hover:bg-white/20'
                              : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                          }`}
                        >
                          Book Again
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Query Pool Tab */}
          {activeTab === 'anonymous' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Query Pool ({queryPool.length})
                </h3>
                <button
                  onClick={() => setShowAskQuestionModal(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    darkMode
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                      : 'bg-[#00001a]/20 text-[#00001a] border border-[#00001a]/30 hover:bg-[#00001a]/30'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Ask Question
                </button>
              </div>

              <div className="space-y-4">
                {queryPool.map((query) => (
                  <div key={query.id} className={`group p-6 rounded-lg border transition-all duration-500 cursor-pointer ${
                    darkMode
                      ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                      : 'bg-white/40 border-white/30 hover:bg-white/60 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                          }`}>
                            <MessageSquare className={`w-5 h-5 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {query.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-2 py-1 rounded ${
                                darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-[#00001a]/20 text-[#00001a]'
                              }`}>
                                {query.category}
                              </span>
                              <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                                {query.createdAt.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className={`text-sm mb-4 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                          {query.description}
                        </p>

                        <div className="flex items-center gap-2 mb-3">
                          {query.tags.map((tag, index) => (
                            <span key={index} className={`px-2 py-1 rounded text-xs ${
                              darkMode ? 'bg-white/10 text-white/70' : 'bg-[#00001a]/10 text-[#00001a]/70'
                            }`}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <MessageSquare className={`w-4 h-4 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} />
                            <span className={darkMode ? 'text-white/70' : 'text-[#00001a]/70'}>
                              {query.responses} responses
                            </span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            query.status === 'answered'
                              ? (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-[#00001a]/10 text-[#00001a]')
                              : (darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-[#00001a]/10 text-[#00001a]')
                          }`}>
                            {query.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-6">
                        <button
                          onClick={() => {
                            setSelectedQuery(query)
                            setShowResponsesModal(true)
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            darkMode
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                              : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90'
                          }`}
                        >
                          View Responses ({query.responses})
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Files & References Tab */}
          {activeTab === 'files' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Files & References ({mockFiles.length})
                </h3>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockFiles.map((file) => (
                  <div key={file.id} className={`group p-4 rounded-lg border transition-all duration-500 cursor-pointer ${
                    darkMode
                      ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                      : 'bg-white/40 border-white/30 hover:bg-white/60 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        file.type === 'pdf'
                          ? (darkMode ? 'bg-red-500/20' : 'bg-[#00001a]/10')
                          : file.type === 'doc'
                          ? (darkMode ? 'bg-blue-500/20' : 'bg-[#00001a]/10')
                          : (darkMode ? 'bg-green-500/20' : 'bg-[#00001a]/10')
                      }`}>
                        <FileText className={`w-5 h-5 ${
                          file.type === 'pdf'
                            ? (darkMode ? 'text-red-400' : 'text-[#00001a]')
                            : file.type === 'doc'
                            ? (darkMode ? 'text-blue-400' : 'text-[#00001a]')
                            : (darkMode ? 'text-green-400' : 'text-[#00001a]')
                        }`} />
                      </div>
                      <button className={`p-1 rounded hover:bg-white/10 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className={`font-medium mb-1 text-sm ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {file.name}
                    </h4>
                    <p className={`text-xs mb-3 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                      {file.size} • {file.uploadedAt.toLocaleDateString()}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          console.log('Viewing file:', file.name)
                          alert(`Opening ${file.name} for viewing...`)
                        }}
                        className={`w-full px-3 py-1 rounded text-xs font-medium transition-all duration-300 ${
                          darkMode
                            ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                            : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                        }`}
                      >
                        View File
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live Session Tab */}
          {activeTab === 'live' && (
            <div className="space-y-6">
              {isInSession ? (
                <div className="space-y-6">
                  {/* Session Header */}
                  <div className={`p-6 rounded-lg border ${
                    darkMode
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-[#00001a]/5 border-[#00001a]/20'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`}>
                          Live Session Active
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-[#00001a]/70'}`}>
                          React Performance Optimization with Alex Chen
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className={`text-lg font-mono ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`}>
                          {Math.floor(sessionTimer / 60)}:{(sessionTimer % 60).toString().padStart(2, '0')}
                        </div>
                        <button
                          onClick={extendSession}
                          className={`px-3 py-1 rounded text-sm transition-all duration-300 ${
                            darkMode
                              ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                              : 'bg-[#00001a]/10 text-[#00001a] hover:bg-[#00001a]/20'
                          }`}
                        >
                          Extend +15min
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Video Area */}
                  <div className={`aspect-video rounded-lg border-2 border-dashed flex items-center justify-center ${
                    darkMode ? 'border-white/20 bg-white/5' : 'border-gray-300 bg-gray-50'
                  }`}>
                    <div className="text-center">
                      <Video className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />
                      <p className={`text-lg font-medium ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                        Video Conference Area
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-white/30' : 'text-gray-400'}`}>
                        Video feed will appear here
                      </p>
                    </div>
                  </div>

                  {/* Session Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={toggleMute}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        isMuted
                          ? (darkMode ? 'bg-red-500/20 text-red-400' : 'bg-[#00001a]/10 text-[#00001a]')
                          : (darkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600')
                      }`}
                    >
                      {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>

                    <button
                      onClick={toggleVideo}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        !isVideoOn
                          ? (darkMode ? 'bg-red-500/20 text-red-400' : 'bg-[#00001a]/10 text-[#00001a]')
                          : (darkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600')
                      }`}
                    >
                      {isVideoOn ? <Video className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                    </button>

                    <button
                      onClick={toggleScreenShare}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        isScreenSharing
                          ? (darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600')
                          : (darkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600')
                      }`}
                    >
                      <Monitor className="w-5 h-5" />
                    </button>

                    <button
                      onClick={toggleHandRaise}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        handRaised
                          ? (darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600')
                          : (darkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600')
                      }`}
                    >
                      <Hand className="w-5 h-5" />
                    </button>

                    {/* Participants Button */}
                    <button
                      className={`p-3 rounded-full transition-all duration-300 ${
                        darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title="View Participants"
                    >
                      <Users className="w-5 h-5" />
                    </button>

                    {/* Whiteboard Button */}
                    <button
                      className={`p-3 rounded-full transition-all duration-300 ${
                        darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Open Whiteboard"
                    >
                      <PenTool className="w-5 h-5" />
                    </button>

                    {/* Chat Button */}
                    <button
                      className={`p-3 rounded-full transition-all duration-300 ${
                        darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Open Chat"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>

                    {/* Notes Button */}
                    <button
                      className={`p-3 rounded-full transition-all duration-300 ${
                        darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Take Notes"
                    >
                      <StickyNote className="w-5 h-5" />
                    </button>

                    {/* Reactions Button */}
                    <button
                      onClick={() => setShowReactionsModal(true)}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Send Reaction"
                    >
                      <Smile className="w-5 h-5" />
                    </button>

                    {/* Access Shared Content Button */}
                    <button
                      className={`p-3 rounded-full transition-all duration-300 ${
                        darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Access Shared Content"
                    >
                      <FolderOpen className="w-5 h-5" />
                    </button>
                  </div>

                  {/* End Session */}
                  <div className="text-center">
                    <button
                      onClick={() => setIsInSession(false)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                          : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90'
                      }`}
                    >
                      End Session
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-white/10' : 'bg-gray-100'
                  }`}>
                    <Video className={`w-8 h-8 ${darkMode ? 'text-white/50' : 'text-gray-500'}`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    No Active Session
                  </h3>
                  <p className={`text-sm mb-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Join an upcoming session to start your live learning experience
                  </p>
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                        : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90'
                    }`}
                  >
                    View Upcoming Sessions
                  </button>
                  <div className="mt-4">
                    <button
                      onClick={() => setIsInSession(true)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                          : 'bg-[#00001a]/10 text-[#00001a] border border-[#00001a]/20 hover:bg-[#00001a]/20'
                      }`}
                    >
                      Start Demo Session
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chat History Tab */}
          {activeTab === 'chat' && (
            <div className="space-y-6">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Chat History
              </h3>

              <div className="space-y-4">
                {[
                  { id: 1, solver: 'Alex Chen', lastMessage: 'Thanks for the great session!', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), unread: 0 },
                  { id: 2, solver: 'Sarah Davis', lastMessage: 'I have some follow-up questions about Node.js...', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), unread: 2 },
                  { id: 3, solver: 'Mike Johnson', lastMessage: 'The database optimization worked perfectly!', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), unread: 0 }
                ].map((chat) => (
                  <div key={chat.id} className={`group p-4 rounded-lg border transition-all duration-500 cursor-pointer ${
                    darkMode
                      ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                      : 'bg-white/40 border-white/30 hover:bg-white/60 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]'
                  }`}
                  onClick={() => {
                    // Load chat history for this solver
                    const chatHistory = [
                      {
                        id: 1,
                        text: `Hi! This is our previous conversation.`,
                        sender: chat.solver,
                        timestamp: new Date(chat.timestamp.getTime() - 60 * 60 * 1000),
                        type: 'text'
                      },
                      {
                        id: 2,
                        text: chat.lastMessage,
                        sender: chat.solver,
                        timestamp: chat.timestamp,
                        type: 'text'
                      }
                    ]
                    setChatMessages(chatHistory)
                    setSelectedSession({ solver: { name: chat.solver, id: chat.id } })
                    setShowChatModal(true)
                  }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                        }`}>
                          <User className={`w-5 h-5 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {chat.solver}
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                            {chat.lastMessage}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                          {chat.timestamp.toLocaleDateString()}
                        </span>
                        {chat.unread > 0 && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-[#00001a]/20 text-[#00001a]'
                          }`}>
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chat Modal */}
        {showChatModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-lg w-full h-96 rounded-lg border flex flex-col ${
              darkMode ? 'bg-[#00001a] border-white/20' : 'bg-white border-[#00001a]/20'
            }`}>
              <div className="p-4 border-b border-white/20 flex items-center justify-between">
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Chat with {selectedSession?.solver?.name || 'Solver'}
                </h3>
                <button
                  onClick={() => setShowChatModal(false)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    darkMode ? 'hover:bg-white/10' : 'hover:bg-[#00001a]/10'
                  }`}
                >
                  <X className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`} />
                </button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                {chatMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-white/30' : 'text-[#00001a]/30'}`} />
                    <p className={`${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                      No messages yet. Start the conversation!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {chatMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-3 py-2 rounded-lg ${
                          message.sender === 'You'
                            ? (darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-[#00001a]/20 text-[#00001a]')
                            : (darkMode ? 'bg-white/10 text-white' : 'bg-[#00001a]/10 text-[#00001a]')
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-white/20">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className={`flex-1 px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                        : 'bg-white border-[#00001a]/20 text-[#00001a] placeholder-[#00001a]/50'
                    }`}
                  />
                  <button
                    onClick={sendMessage}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                      darkMode
                        ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                        : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Face Verification Modal */}
        {showVerificationModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-md w-full rounded-lg ${
              darkMode ? 'bg-[#00001a]' : 'bg-white'
            }`}>
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-white/10' : 'bg-gray-100'
                  }`}>
                    <Camera className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Face Verification Required
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Please allow camera access to verify your identity before joining the session
                  </p>
                </div>

                {verificationStep === 'camera' && (
                  <div className="space-y-6">
                    <div className={`p-8 rounded-lg border-2 border-dashed ${
                      darkMode ? 'border-white/20' : 'border-gray-300'
                    }`}>
                      <div className="text-center">
                        <Camera className={`w-16 h-16 mx-auto mb-3 ${darkMode ? 'text-white/40' : 'text-gray-400'}`} />
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Camera preview will appear here
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowVerificationModal(false)}
                        className={`flex-1 py-3 rounded-lg border font-medium transition-all duration-300 ${
                          darkMode
                            ? 'border-white/20 text-white hover:bg-white/10'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={startFaceVerification}
                        className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                          darkMode
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                            : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                        }`}
                      >
                        Start Verification
                      </button>
                    </div>
                  </div>
                )}

                {verificationStep === 'processing' && (
                  <div className="text-center py-12">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full border-4 border-t-transparent animate-spin ${
                      darkMode ? 'border-blue-400' : 'border-[#00001a]'
                    }`}></div>
                    <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Verifying your identity...
                    </p>
                  </div>
                )}

                {verificationStep === 'success' && (
                  <div className="text-center py-12">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-green-500/20' : 'bg-green-100'
                    }`}>
                      <CheckCircle className={`w-8 h-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Verification Successful!
                    </p>
                    <p className={`text-sm mt-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      Redirecting to your session...
                    </p>
                  </div>
                )}

                {verificationStep === 'failed' && (
                  <div className="text-center py-12">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-red-500/20' : 'bg-red-100'
                    }`}>
                      <X className={`w-8 h-8 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                    </div>
                    <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Verification Failed
                    </p>
                    <p className={`text-sm mt-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      Camera access denied or verification failed. Please try again.
                    </p>
                    <button
                      onClick={() => setVerificationStep('camera')}
                      className={`mt-4 px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                          : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                      }`}
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
            <div className={`max-w-md w-full my-8 rounded-lg shadow-xl ${
              darkMode ? 'bg-[#00001a]' : 'bg-white'
            }`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Book {bookingType === 'anonymous' ? 'Anonymous' : 'Group'} Session
                  </h3>
                  <button
                    onClick={() => {
                      setShowBookingModal(false)
                      setBookingTopic('')
                      setSelectedSolver(null)
                      setNumberOfParticipants(2)
                    }}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      darkMode ? 'hover:bg-white/10' : 'hover:bg-[#00001a]/10'
                    }`}
                  >
                    <X className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Topic/Subject
                    </label>
                    <input
                      type="text"
                      value={bookingTopic}
                      onChange={(e) => setBookingTopic(e.target.value)}
                      placeholder="e.g., React Performance, Node.js APIs"
                      className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                          : 'bg-white border-[#00001a]/20 text-[#00001a] placeholder-[#00001a]/50'
                      }`}
                    />
                  </div>

                  {/* Solver Selection */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Solver Selection
                    </label>
                    <div className="space-y-2">
                      {selectedSolver ? (
                        <div className={`p-3 rounded-lg border flex items-center justify-between ${
                          darkMode
                            ? 'bg-blue-500/10 border-blue-500/30'
                            : 'bg-blue-50 border-blue-200'
                        }`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                            }`}>
                              <User className={`w-5 h-5 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} />
                            </div>
                            <div>
                              <div className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>
                                {selectedSolver.name}
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className={darkMode ? 'text-blue-300' : 'text-blue-600'}>
                                  {selectedSolver.rating} • ${selectedSolver.hourlyRate}/hr
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedSolver(null)}
                            className={`text-xs px-2 py-1 rounded transition-all duration-300 ${
                              darkMode
                                ? 'text-white/70 hover:bg-white/10'
                                : 'text-[#00001a]/70 hover:bg-[#00001a]/10'
                            }`}
                          >
                            Change
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedSolver({ name: 'Any Available Solver', hourlyRate: 'varies' })
                            }}
                            className={`flex-1 py-2 px-3 rounded-lg border text-sm transition-all duration-300 ${
                              darkMode
                                ? 'border-white/20 text-white hover:bg-white/10'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            Any Available Solver
                          </button>
                          <button
                            onClick={() => {
                              if (!bookingTopic.trim()) {
                                alert('Please enter a topic first to browse relevant solvers')
                                return
                              }
                              setShowSolverBrowser(true)
                            }}
                            className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all duration-300 ${
                              darkMode
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                                : 'bg-[#00001a]/20 text-[#00001a] border border-[#00001a]/30 hover:bg-[#00001a]/30'
                            }`}
                          >
                            Browse Solvers
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Duration
                    </label>
                    <select className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white [&>option]:bg-[#00001a] [&>option]:text-white'
                        : 'bg-white border-[#00001a]/20 text-[#00001a] [&>option]:bg-white [&>option]:text-[#00001a]'
                    }`}>
                      <option value="30">30 minutes - $25</option>
                      <option value="60">60 minutes - $45</option>
                      <option value="90">90 minutes - $65</option>
                    </select>
                  </div>

                  {/* Number of Participants - Only for Group Sessions */}
                  {bookingType === 'group' && (
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Number of Participants
                      </label>
                      <select
                        value={numberOfParticipants}
                        onChange={(e) => setNumberOfParticipants(parseInt(e.target.value))}
                        className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/5 border-white/20 text-white [&>option]:bg-[#00001a] [&>option]:text-white'
                            : 'bg-white border-[#00001a]/20 text-[#00001a] [&>option]:bg-white [&>option]:text-[#00001a]'
                        }`}
                      >
                        <option value="2">2 participants</option>
                        <option value="3">3 participants</option>
                        <option value="4">4 participants</option>
                        <option value="5">5 participants</option>
                        <option value="6">6 participants</option>
                        <option value="7">7 participants</option>
                        <option value="8">8 participants</option>
                      </select>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                        Cost will be split among all participants
                      </p>
                    </div>
                  )}

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Description (Optional)
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Describe what you need help with..."
                      className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                          : 'bg-white border-[#00001a]/20 text-[#00001a] placeholder-[#00001a]/50'
                      }`}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        setShowBookingModal(false)
                        setBookingTopic('')
                        setSelectedSolver(null)
                        setNumberOfParticipants(2)
                      }}
                      className={`flex-1 py-3 rounded-lg border font-medium transition-all duration-300 ${
                        darkMode
                          ? 'border-white/20 text-white hover:bg-white/10'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const sessionType = bookingType === 'anonymous' ? 'Anonymous' : 'Group'
                        const solverInfo = selectedSolver
                          ? (selectedSolver.name === 'Any Available Solver' ? 'any available solver' : selectedSolver.name)
                          : 'any available solver'

                        const participantsInfo = bookingType === 'group' ? `\nParticipants: ${numberOfParticipants}` : ''

                        setShowBookingModal(false)
                        setBookingTopic('')
                        setSelectedSolver(null)
                        setNumberOfParticipants(2)
                        alert(`${sessionType} session booking submitted!\nTopic: ${bookingTopic}\nSolver: ${solverInfo}${participantsInfo}`)
                      }}
                      className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                          : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                      }`}
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ask Question Modal */}
        {showAskQuestionModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-lg w-full rounded-lg ${
              darkMode ? 'bg-[#00001a]' : 'bg-white'
            }`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Ask a Question
                  </h3>
                  <button
                    onClick={() => setShowAskQuestionModal(false)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      darkMode ? 'hover:bg-white/10' : 'hover:bg-[#00001a]/10'
                    }`}
                  >
                    <X className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Question Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., How to optimize React component re-renders?"
                      className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                          : 'bg-white border-[#00001a]/20 text-[#00001a] placeholder-[#00001a]/50'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Category
                    </label>
                    <select className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white [&>option]:bg-[#00001a] [&>option]:text-white'
                        : 'bg-white border-[#00001a]/20 text-[#00001a] [&>option]:bg-white [&>option]:text-[#00001a]'
                    }`}>
                      <option value="">Select Category</option>
                      <option value="frontend">Frontend Development</option>
                      <option value="backend">Backend Development</option>
                      <option value="database">Database</option>
                      <option value="devops">DevOps</option>
                      <option value="mobile">Mobile Development</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Description
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Provide detailed information about your question..."
                      className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                          : 'bg-white border-[#00001a]/20 text-[#00001a] placeholder-[#00001a]/50'
                      }`}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setShowAskQuestionModal(false)}
                      className={`flex-1 py-3 rounded-lg border font-medium transition-all duration-300 ${
                        darkMode
                          ? 'border-white/20 text-white hover:bg-white/10'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowAskQuestionModal(false)
                        alert('Question posted to Query Pool!')
                      }}
                      className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                          : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                      }`}
                    >
                      Post Question
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Responses Modal */}
        {showResponsesModal && selectedQuery && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-2xl w-full max-h-[80vh] rounded-lg ${
              darkMode ? 'bg-[#00001a]' : 'bg-white'
            }`}>
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {selectedQuery.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      {selectedQuery.responses} responses • {selectedQuery.category}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowResponsesModal(false)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      darkMode ? 'hover:bg-white/10' : 'hover:bg-[#00001a]/10'
                    }`}
                  >
                    <X className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`} />
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {/* Mock responses */}
                  {[
                    {
                      id: 1,
                      author: 'Alex Chen',
                      rating: 4.9,
                      response: 'You can use React.memo() to prevent unnecessary re-renders. Also consider using useMemo and useCallback hooks for expensive calculations.',
                      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                      helpful: 12
                    },
                    {
                      id: 2,
                      author: 'Sarah Davis',
                      rating: 4.8,
                      response: 'Check your component structure. Sometimes lifting state up or using context can help reduce re-renders.',
                      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
                      helpful: 8
                    },
                    {
                      id: 3,
                      author: 'Mike Johnson',
                      rating: 4.7,
                      response: 'Use React DevTools Profiler to identify which components are re-rendering unnecessarily. This will help you target your optimizations.',
                      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
                      helpful: 15
                    }
                  ].map((response) => (
                    <div key={response.id} className={`p-4 rounded-lg border ${
                      darkMode
                        ? 'bg-white/5 border-white/10'
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                          }`}>
                            <User className={`w-4 h-4 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} />
                          </div>
                          <div>
                            <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {response.author}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className={`w-3 h-3 fill-current ${darkMode ? 'text-yellow-400' : 'text-[#00001a]'}`} />
                              <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                                {response.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                          {response.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <p className={`text-sm mb-3 ${darkMode ? 'text-white/80' : 'text-[#00001a]/80'}`}>
                        {response.response}
                      </p>
                      <div className="flex items-center gap-2">
                        <button className={`text-xs px-2 py-1 rounded transition-all duration-300 ${
                          darkMode
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            : 'bg-[#00001a]/10 text-[#00001a] hover:bg-[#00001a]/20'
                        }`}>
                          <ThumbsUp className="w-3 h-3 inline mr-1" />
                          Helpful ({response.helpful})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recording Modal */}
        {showRecordingModal && selectedRecording && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-4xl w-full max-h-[90vh] rounded-lg ${
              darkMode ? 'bg-[#00001a]' : 'bg-white'
            }`}>
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Session Recording
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      {selectedRecording.topic} • {selectedRecording.duration} min
                    </p>
                  </div>
                  <button
                    onClick={() => setShowRecordingModal(false)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      darkMode ? 'hover:bg-white/10' : 'hover:bg-[#00001a]/10'
                    }`}
                  >
                    <X className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Video Player Area */}
                <div className={`aspect-video rounded-lg border-2 border-dashed flex items-center justify-center mb-6 ${
                  darkMode ? 'border-white/20 bg-white/5' : 'border-gray-300 bg-gray-50'
                }`}>
                  <div className="text-center">
                    <Video className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />
                    <p className={`text-lg font-medium ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                      Session Recording Player
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-white/30' : 'text-gray-400'}`}>
                      Video player would be integrated here
                    </p>
                  </div>
                </div>

                {/* Recording Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      darkMode
                        ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                        : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
                    }`}>
                      <Play className="w-4 h-4 mr-2" />
                      Play/Pause
                    </button>
                    <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      0:00 / {selectedRecording.duration}:00
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* Solver Browser Modal */}
        {showSolverBrowser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-4xl w-full max-h-[90vh] rounded-lg ${
              darkMode ? 'bg-[#00001a]' : 'bg-white'
            }`}>
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Browse Solvers
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Topic: "{bookingTopic}" • {getRelevantSolvers(bookingTopic).length} solvers available
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSolverBrowser(false)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      darkMode ? 'hover:bg-white/10' : 'hover:bg-[#00001a]/10'
                    }`}
                  >
                    <X className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`} />
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getRelevantSolvers(bookingTopic).map((solver) => (
                    <div key={solver.id} className={`group p-4 rounded-lg border transition-all duration-500 cursor-pointer ${
                      darkMode
                        ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                        : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]'
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                          }`}>
                            <User className={`w-6 h-6 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                                {solver.name}
                              </h4>
                              {solver.isOnline && (
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                                  {solver.rating} ({solver.reviews} reviews)
                                </span>
                              </div>
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                solver.isOnline
                                  ? (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800')
                                  : (darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800')
                              }`}>
                                {solver.isOnline ? 'Online' : `Responds in ${solver.responseTime}`}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            ${solver.hourlyRate}/hr
                          </div>
                          <div className={`text-xs ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                            {solver.completedSessions} sessions
                          </div>
                        </div>
                      </div>

                      <p className={`text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        {solver.bio}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {solver.specialties.slice(0, 4).map((specialty, index) => (
                          <span key={index} className={`px-2 py-1 rounded text-xs ${
                            darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {specialty}
                          </span>
                        ))}
                        {solver.specialties.length > 4 && (
                          <span className={`px-2 py-1 rounded text-xs ${
                            darkMode ? 'bg-white/10 text-white/60' : 'bg-gray-100 text-gray-600'
                          }`}>
                            +{solver.specialties.length - 4} more
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedSolver(solver)
                            setShowSolverBrowser(false)
                          }}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                            darkMode
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                              : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                          }`}
                        >
                          Select Solver
                        </button>
                        <button
                          onClick={() => {
                            // Preview solver profile
                            alert(`Viewing ${solver.name}'s full profile...`)
                          }}
                          className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                            darkMode
                              ? 'bg-white/10 text-white/70 hover:bg-white/20'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {getRelevantSolvers(bookingTopic).length === 0 && (
                  <div className="text-center py-8">
                    <User className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />
                    <p className={`text-lg font-medium ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                      No solvers found for "{bookingTopic}"
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-white/30' : 'text-gray-400'}`}>
                      Try a different topic or browse all available solvers
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reactions Modal */}
        {showReactionsModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-sm w-full rounded-lg ${
              darkMode ? 'bg-[#00001a]' : 'bg-white'
            }`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Send Reaction
                  </h3>
                  <button
                    onClick={() => setShowReactionsModal(false)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      darkMode ? 'hover:bg-white/10' : 'hover:bg-[#00001a]/10'
                    }`}
                  >
                    <X className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`} />
                  </button>
                </div>

                {/* Reactions Grid */}
                <div className="grid grid-cols-5 gap-3">
                  {[
                    { emoji: '💖', name: 'Love' },
                    { emoji: '👍', name: 'Like' },
                    { emoji: '🎉', name: 'Celebrate' },
                    { emoji: '👋', name: 'Wave' },
                    { emoji: '😂', name: 'Laugh' },
                    { emoji: '😮', name: 'Wow' },
                    { emoji: '😢', name: 'Sad' },
                    { emoji: '😞', name: 'Disappointed' },
                    { emoji: '👎', name: 'Dislike' },
                    { emoji: '🟡', name: 'Neutral' }
                  ].map((reaction, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleReaction(reaction.name)
                        setShowReactionsModal(false)
                        // Show a brief confirmation
                        alert(`${reaction.emoji} ${reaction.name} reaction sent!`)
                      }}
                      className={`aspect-square rounded-lg border-2 flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 ${
                        darkMode
                          ? 'border-white/20 hover:border-blue-400/50 hover:bg-blue-500/10'
                          : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                      title={reaction.name}
                    >
                      {reaction.emoji}
                    </button>
                  ))}
                </div>

                <p className={`text-xs text-center mt-4 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                  Click on any reaction to send it to all participants
                </p>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default SeekerSessions

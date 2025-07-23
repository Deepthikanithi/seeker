import React, { useState, useRef } from 'react'
import {
  Calendar,
  Users,
  User,
  Flame,
  Eye,
  EyeOff,
  Lock,
  MessageCircle,
  Clock,
  CheckCircle,
  Zap,
  Code,
  Palette,
  Wand2,
  Cloud,
  Target,
  Shield,
  FolderOpen,
  FileText,
  Download,
  Share2,
  Search,
  Filter,
  Image,
  Video,
  Archive,
  Star,
  BookOpen,
  Link
} from 'lucide-react'

const Community = ({ darkMode }) => {
  // State management
  const [solverAnonymity, setSolverAnonymity] = useState(false)
  const [interestedDiscussions, setInterestedDiscussions] = useState(new Set())
  const [notifyDiscussions, setNotifyDiscussions] = useState(new Set())
  const [joinedEvents, setJoinedEvents] = useState(new Set())
  const [notifications, setNotifications] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sharedContentFilter, setSharedContentFilter] = useState('all')
  const [sharedContentSearch, setSharedContentSearch] = useState('')
  const [showSharedContentModal, setShowSharedContentModal] = useState(false)
  const [selectedSharedContent, setSelectedSharedContent] = useState(null)

  // Notification system
  const showNotificationMessage = (message, type = 'success') => {
    const notification = {
      id: Date.now(),
      message,
      type
    }
    setNotifications(prev => [...prev, notification])
    setShowNotification(true)

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id))
      if (notifications.length <= 1) {
        setShowNotification(false)
      }
    }, 3000)
  }

  // Sample data with pseudo names for anonymity
  const activeMembers = [
    { id: 1, pseudoName: 'CodeNinja47', avatar: 'Code', status: 'online', expertise: 'React Specialist', contributions: 156, anonymityLevel: 'high' },
    { id: 2, pseudoName: 'PixelMaster', avatar: 'Palette', status: 'online', expertise: 'UI/UX Expert', contributions: 142, anonymityLevel: 'medium' },
    { id: 3, pseudoName: 'DataWizard', avatar: 'Wand2', status: 'away', expertise: 'ML Engineer', contributions: 98, anonymityLevel: 'high' },
    { id: 4, pseudoName: 'CloudSurfer', avatar: 'Cloud', status: 'online', expertise: 'DevOps Pro', contributions: 87, anonymityLevel: 'low' },
    { id: 5, pseudoName: 'ByteHunter', avatar: 'Target', status: 'offline', expertise: 'Frontend Dev', contributions: 76, anonymityLevel: 'medium' },
    { id: 6, pseudoName: 'AlgoMaster', avatar: 'Zap', status: 'online', expertise: 'Backend Dev', contributions: 134, anonymityLevel: 'high' },
    { id: 7, pseudoName: 'CyberSage', avatar: 'Shield', status: 'away', expertise: 'Security Expert', contributions: 89, anonymityLevel: 'high' }
  ]

  const discussions = [
    {
      id: 1,
      topic: 'Best practices for React performance optimization',
      author: 'CodeNinja47',
      comments: 23,
      minutesAgo: 5,
      category: 'React',
      isHot: true,
      anonymousPost: false
    },
    {
      id: 2,
      topic: 'How to implement dark mode in Next.js applications',
      author: 'PixelMaster',
      comments: 18,
      minutesAgo: 12,
      category: 'Next.js',
      isHot: false,
      anonymousPost: false
    },
    {
      id: 3,
      topic: 'Machine Learning model deployment strategies',
      author: 'Anonymous_Solver_#7834',
      comments: 31,
      minutesAgo: 25,
      category: 'ML',
      isHot: true,
      anonymousPost: true
    },
    {
      id: 4,
      topic: 'CSS Grid vs Flexbox: When to use what?',
      author: 'CloudSurfer',
      comments: 15,
      minutesAgo: 45,
      category: 'CSS',
      isHot: false,
      anonymousPost: false
    },
    {
      id: 5,
      topic: 'Docker containerization best practices',
      author: 'Anonymous_Solver_#2156',
      comments: 27,
      minutesAgo: 67,
      category: 'DevOps',
      isHot: true,
      anonymousPost: true
    },
    {
      id: 6,
      topic: 'Secure API authentication methods',
      author: 'CyberSage',
      comments: 19,
      minutesAgo: 89,
      category: 'Security',
      isHot: false,
      anonymousPost: false
    }
  ]

  const topContributors = [
    { id: 1, pseudoName: 'CodeNinja47', avatar: 'Code', points: 2456, badge: 'Expert', specialty: 'React', rank: 1 },
    { id: 2, pseudoName: 'PixelMaster', avatar: 'Palette', points: 2234, badge: 'Expert', specialty: 'Design', rank: 2 },
    { id: 3, pseudoName: 'DataWizard', avatar: 'Wand2', points: 1987, badge: 'Advanced', specialty: 'Data Science', rank: 3 },
    { id: 4, pseudoName: 'AlgoMaster', avatar: 'Zap', points: 1756, badge: 'Advanced', specialty: 'Algorithms', rank: 4 },
    { id: 5, pseudoName: 'CloudSurfer', avatar: 'Cloud', points: 1543, badge: 'Intermediate', specialty: 'DevOps', rank: 5 }
  ]

  const upcomingEvents = [
    {
      id: 1,
      name: 'React 19 Features Deep Dive',
      date: '2025-07-20',
      time: '14:00',
      attendees: 156,
      type: 'Workshop',
      host: 'CodeNinja47',
      anonymousHost: false
    },
    {
      id: 2,
      name: 'AI in Web Development Panel',
      date: '2025-07-22',
      time: '16:30',
      attendees: 234,
      type: 'Panel',
      host: 'Anonymous_Host_#4521',
      anonymousHost: true
    },
    {
      id: 3,
      name: 'Design System Implementation',
      date: '2025-07-25',
      time: '13:00',
      attendees: 89,
      type: 'Tutorial',
      host: 'PixelMaster',
      anonymousHost: false
    },
    {
      id: 4,
      name: 'DevOps Best Practices Q&A',
      date: '2025-07-28',
      time: '15:00',
      attendees: 67,
      type: 'Q&A',
      host: 'CloudSurfer',
      anonymousHost: false
    },
    {
      id: 5,
      name: 'Full Stack Security Workshop',
      date: '2025-07-30',
      time: '10:00',
      attendees: 142,
      type: 'Workshop',
      host: 'CyberSage',
      anonymousHost: false
    }
  ]

  // Shared Content Data
  const sharedContent = [
    {
      id: 1,
      title: 'React Performance Optimization Guide',
      type: 'document',
      sharedBy: 'CodeNinja47',
      sharedDate: '2024-01-15',
      size: '2.4 MB',
      downloads: 156,
      category: 'React',
      description: 'Comprehensive guide covering React performance best practices, memoization, and optimization techniques.',
      fileType: 'pdf',
      isPublic: true,
      tags: ['react', 'performance', 'optimization']
    },
    {
      id: 2,
      title: 'Machine Learning Dataset Collection',
      type: 'folder',
      sharedBy: 'DataWizard',
      sharedDate: '2024-01-12',
      size: '45.2 MB',
      downloads: 89,
      category: 'ML',
      description: 'Curated collection of datasets for machine learning projects including CSV files and documentation.',
      fileType: 'folder',
      isPublic: true,
      tags: ['ml', 'datasets', 'data-science'],
      fileCount: 12
    },
    {
      id: 3,
      title: 'CSS Animation Examples',
      type: 'code',
      sharedBy: 'PixelMaster',
      sharedDate: '2024-01-10',
      size: '1.8 MB',
      downloads: 234,
      category: 'CSS',
      description: 'Collection of CSS animation examples with source code and live demos.',
      fileType: 'zip',
      isPublic: true,
      tags: ['css', 'animations', 'frontend']
    },
    {
      id: 4,
      title: 'DevOps Deployment Scripts',
      type: 'code',
      sharedBy: 'CloudSurfer',
      sharedDate: '2024-01-08',
      size: '3.1 MB',
      downloads: 67,
      category: 'DevOps',
      description: 'Automated deployment scripts for various cloud platforms including Docker and Kubernetes configs.',
      fileType: 'zip',
      isPublic: true,
      tags: ['devops', 'deployment', 'docker', 'kubernetes']
    },
    {
      id: 5,
      title: 'Security Best Practices Checklist',
      type: 'document',
      sharedBy: 'CyberSage',
      sharedDate: '2024-01-05',
      size: '1.2 MB',
      downloads: 198,
      category: 'Security',
      description: 'Comprehensive security checklist for web applications and API development.',
      fileType: 'pdf',
      isPublic: true,
      tags: ['security', 'web-security', 'api']
    },
    {
      id: 6,
      title: 'Algorithm Visualization Videos',
      type: 'video',
      sharedBy: 'AlgoMaster',
      sharedDate: '2024-01-03',
      size: '128.5 MB',
      downloads: 145,
      category: 'Algorithms',
      description: 'Video series explaining common algorithms with visual demonstrations and code examples.',
      fileType: 'mp4',
      isPublic: true,
      tags: ['algorithms', 'visualization', 'education']
    },
    {
      id: 7,
      title: 'Frontend Component Library',
      type: 'code',
      sharedBy: 'ByteHunter',
      sharedDate: '2024-01-01',
      size: '8.7 MB',
      downloads: 312,
      category: 'Frontend',
      description: 'Reusable React component library with TypeScript support and Storybook documentation.',
      fileType: 'zip',
      isPublic: true,
      tags: ['react', 'components', 'typescript', 'storybook']
    },
    {
      id: 8,
      title: 'Database Design Templates',
      type: 'document',
      sharedBy: 'Anonymous_Expert_#2341',
      sharedDate: '2023-12-28',
      size: '4.3 MB',
      downloads: 78,
      category: 'Database',
      description: 'Database schema templates for common application patterns with normalization examples.',
      fileType: 'pdf',
      isPublic: true,
      tags: ['database', 'schema', 'design-patterns'],
      isAnonymous: true
    }
  ]

  // Event handlers
  const handleInterested = async (discussionId) => {
    const isInterested = interestedDiscussions.has(discussionId)
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      if (isInterested) {
        setInterestedDiscussions(prev => {
          const newSet = new Set(prev)
          newSet.delete(discussionId)
          return newSet
        })
        showNotificationMessage('Removed from interested discussions! 👎', 'info')
      } else {
        setInterestedDiscussions(prev => new Set([...prev, discussionId]))
        showNotificationMessage('Added to interested discussions! 👍', 'success')

        // Add to user's dashboard feed
        const discussion = discussions.find(d => d.id === discussionId)
        if (discussion) {
          showNotificationMessage(`"${discussion.title}" added to your feed! 📰`, 'info')
        }
      }
    } catch (error) {
      showNotificationMessage('Failed to update interest. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotifyMe = async (discussionId) => {
    const isNotifying = notifyDiscussions.has(discussionId)
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      if (isNotifying) {
        setNotifyDiscussions(prev => {
          const newSet = new Set(prev)
          newSet.delete(discussionId)
          return newSet
        })
        showNotificationMessage('Notifications disabled for this discussion! 🔕', 'info')
      } else {
        setNotifyDiscussions(prev => new Set([...prev, discussionId]))
        showNotificationMessage('You will be notified of new comments! 🔔', 'success')

        // Set up notification preferences
        const discussion = discussions.find(d => d.id === discussionId)
        if (discussion) {
          showNotificationMessage(`Email notifications enabled for "${discussion.title}"! 📧`, 'info')
        }
      }
    } catch (error) {
      showNotificationMessage('Failed to update notifications. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleShareCommunity = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Create shareable link
      const shareUrl = `${window.location.origin}/community/share`

      // Try to use Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: 'Join our Problem Solver Community',
          text: 'Connect with expert problem solvers and share knowledge!',
          url: shareUrl
        })
        showNotificationMessage('Content shared successfully! 🚀', 'success')
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl)
        showNotificationMessage('Share link copied to clipboard! 📋', 'success')
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        showNotificationMessage('Failed to share content. Please try again.', 'error')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinEvent = async (eventId) => {
    const isJoined = joinedEvents.has(eventId)
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      if (isJoined) {
        setJoinedEvents(prev => {
          const newSet = new Set(prev)
          newSet.delete(eventId)
          return newSet
        })
        showNotificationMessage('Successfully left the event! 👋', 'info')
      } else {
        setJoinedEvents(prev => new Set([...prev, eventId]))
        showNotificationMessage('Successfully registered for the event! 📅', 'success')

        // Send calendar invite (simulate)
        const event = upcomingEvents.find(e => e.id === eventId)
        if (event) {
          showNotificationMessage(`Calendar invite sent for "${event.title}"! 📧`, 'info')
        }
      }
    } catch (error) {
      showNotificationMessage('Failed to update event registration. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Additional interactive functions
  const handleMemberClick = async (memberId) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      const member = activeMembers.find(m => m.id === memberId)
      if (member) {
        showNotificationMessage(`Viewing ${member.pseudoName}'s profile! 👤`, 'info')
        // In a real app, this would navigate to the member's profile
      }
    } catch (error) {
      showNotificationMessage('Failed to load member profile.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnectMember = async (memberId) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      const member = activeMembers.find(m => m.id === memberId)
      if (member) {
        const displayName = solverAnonymity && member.anonymityLevel === 'high'
          ? `Anonymous_${member.id.toString().padStart(4, '0')}`
          : member.pseudoName
        showNotificationMessage(`Connection request sent to ${displayName}! 🤝`, 'success')
        showNotificationMessage('They will be notified of your request! 📧', 'info')
      }
    } catch (error) {
      showNotificationMessage('Failed to send connection request.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFollowContributor = async (contributorId) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      const contributor = topContributors.find(c => c.id === contributorId)
      if (contributor) {
        showNotificationMessage(`Now following ${contributor.pseudoName}! 👥`, 'success')
        showNotificationMessage('You will receive updates on their contributions! 🔔', 'info')
      }
    } catch (error) {
      showNotificationMessage('Failed to follow contributor.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewAllSolvers = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 700))
      showNotificationMessage('Loading complete solver directory... 📋', 'info')
      // In a real app, this would navigate to a full solvers page
    } catch (error) {
      showNotificationMessage('Failed to load solver directory.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewFullLeaderboard = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      showNotificationMessage('Loading full leaderboard... 🏆', 'info')
      // In a real app, this would navigate to a full leaderboard page
    } catch (error) {
      showNotificationMessage('Failed to load leaderboard.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewAllEvents = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      showNotificationMessage('Loading all upcoming events... 📅', 'info')
      // In a real app, this would navigate to a full events page
    } catch (error) {
      showNotificationMessage('Failed to load events.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscussionClick = async (discussionId) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 700))
      const discussion = discussions.find(d => d.id === discussionId)
      if (discussion) {
        showNotificationMessage(`Opening "${discussion.title}" discussion! 💬`, 'info')
        // In a real app, this would navigate to the full discussion
      }
    } catch (error) {
      showNotificationMessage('Failed to load discussion.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleContributorClick = async (contributorId) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const contributor = topContributors.find(c => c.id === contributorId)
      if (contributor) {
        showNotificationMessage(`Viewing ${contributor.pseudoName}'s contributions! 🏆`, 'info')
        // In a real app, this would show detailed contributor stats
      }
    } catch (error) {
      showNotificationMessage('Failed to load contributor details.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const formatTimeAgo = (minutes) => {
    if (minutes < 60) {
      return `${minutes} minutes ago`
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60)
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else {
      const days = Math.floor(minutes / 1440)
      return `${days} day${days > 1 ? 's' : ''} ago`
    }
  }

  const getBadgeColor = (badge) => {
    return darkMode ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/30'
  }

  // Shared Content Handlers
  const handleDownloadContent = async (contentId) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const content = sharedContent.find(c => c.id === contentId)
      if (content) {
        showNotificationMessage(`Downloading "${content.title}"... 📥`, 'success')
        // In a real app, this would trigger the actual download
      }
    } catch (error) {
      showNotificationMessage('Failed to download content.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewContent = (contentId) => {
    const content = sharedContent.find(c => c.id === contentId)
    if (content) {
      setSelectedSharedContent(content)
      setShowSharedContentModal(true)
    }
  }

  const handleShareSharedContent = async (contentId) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const content = sharedContent.find(c => c.id === contentId)
      if (content) {
        const shareUrl = `${window.location.origin}/community/shared/${contentId}`

        if (navigator.share) {
          await navigator.share({
            title: content.title,
            text: content.description,
            url: shareUrl
          })
          showNotificationMessage('Content shared successfully! 🚀', 'success')
        } else {
          await navigator.clipboard.writeText(shareUrl)
          showNotificationMessage('Share link copied to clipboard! 📋', 'success')
        }
      }
    } catch (error) {
      showNotificationMessage('Failed to share content.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const getFilteredSharedContent = () => {
    return sharedContent.filter(content => {
      const matchesFilter = sharedContentFilter === 'all' || content.type === sharedContentFilter
      const matchesSearch = content.title.toLowerCase().includes(sharedContentSearch.toLowerCase()) ||
                           content.description.toLowerCase().includes(sharedContentSearch.toLowerCase()) ||
                           content.tags.some(tag => tag.toLowerCase().includes(sharedContentSearch.toLowerCase()))
      return matchesFilter && matchesSearch
    })
  }

  const getContentIcon = (type) => {
    switch (type) {
      case 'document': return FileText
      case 'folder': return FolderOpen
      case 'code': return Code
      case 'video': return Video
      case 'image': return Image
      default: return FileText
    }
  }

  const getContentTypeColor = (type) => {
    // Use blue for dark mode, neutral colors for light mode
    return darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-[#00001a]/10 text-[#00001a]'
  }

  const getEventTypeColor = (type) => {
    return darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
  }

  const getAvatarIcon = (iconName) => {
    const icons = {
      Code,
      Palette,
      Wand2,
      Cloud,
      Target,
      Zap,
      Shield,
      EyeOff,
      User
    }
    return icons[iconName] || User
  }

  return (
    <div className={`min-h-screen transition-all duration-500 relative ${
      darkMode ? 'bg-[#00001a]' : 'bg-white'
    }`}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className={`p-6 rounded-2xl backdrop-blur-xl border ${
            darkMode
              ? 'bg-white/10 border-white/20'
              : 'bg-white/90 border-[#00001a]/20'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${darkMode ? 'border-white' : 'border-[#00001a]'}`}></div>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Processing...
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Notification System */}
      {showNotification && notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border transition-all duration-300 ${
                notification.type === 'success'
                  ? darkMode
                    ? 'bg-white/20 text-white border-white/30'
                    : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/30'
                  : notification.type === 'error'
                  ? darkMode
                    ? 'bg-white/20 text-white border-white/30'
                    : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/30'
                  : darkMode
                    ? 'bg-white/20 text-white border-white/30'
                    : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/30'
              }`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Anonymous Community
            </h1>
            <p className={`mt-2 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
              Connect with fellow solvers through pseudo identities
            </p>
            <p className={`mt-1 text-sm ${darkMode ? 'text-white/40' : 'text-[#00001a]/50'}`}>
              All interactions use chosen pseudo names to maintain solver anonymity
            </p>
          </div>

          {/* Solver Anonymity Toggle */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className={`text-sm font-medium block ${darkMode ? 'text-white/70' : 'text-gray-700'}`}>
                  Enhanced Anonymity
                </span>
                <span className={`text-xs block ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                  {solverAnonymity ? 'Maximum privacy mode' : 'Standard pseudo mode'}
                </span>
              </div>
              <button
                onClick={() => setSolverAnonymity(!solverAnonymity)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  solverAnonymity
                    ? darkMode ? 'bg-white' : 'bg-[#00001a]'
                    : darkMode ? 'bg-white/30' : 'bg-[#00001a]/30'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    solverAnonymity ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {solverAnonymity && (
              <div className={`text-xs px-2 py-1 rounded-lg ${
                darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
              }`}>
                Maximum Privacy Active
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Active Solvers */}
            <div className={`p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
              darkMode
                ? 'bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_25px_rgba(0,0,26,0.2)]'
            }`}
            style={darkMode ? {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {}}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Active Solvers
                </h2>
                <span className={`text-xs px-2 py-1 rounded-lg ${
                  darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
                }`}>
                  Pseudo Identities
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeMembers.map((member) => {
                  const displayName = solverAnonymity && member.anonymityLevel === 'high'
                    ? `Anonymous_${member.id.toString().padStart(4, '0')}`
                    : member.pseudoName

                  const displayAvatar = solverAnonymity && member.anonymityLevel === 'high'
                    ? 'EyeOff'
                    : member.avatar

                  return (
                    <div
                      key={member.id}
                      onClick={() => handleMemberClick(member.id)}
                      className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                        darkMode
                          ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                          : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,26,0.15)]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                          }`}>
                            {React.createElement(getAvatarIcon(displayAvatar), {
                              className: `w-5 h-5 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`
                            })}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${
                            member.status === 'online'
                              ? darkMode ? 'bg-white' : 'bg-[#00001a]'
                              : member.status === 'away'
                              ? darkMode ? 'bg-white/60' : 'bg-[#00001a]/60'
                              : darkMode ? 'bg-white/30' : 'bg-[#00001a]/30'
                          } ${darkMode ? 'border-slate-800' : 'border-white'}`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-2">
                            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {displayName}
                            </h3>
                          </div>
                          <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                            {solverAnonymity && member.anonymityLevel === 'high' ? 'Anonymous Solver' : member.expertise}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>
                            {member.contributions} contributions
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleConnectMember(member.id)
                            }}
                            disabled={isLoading}
                            className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                              isLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : darkMode
                                  ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                                  : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                            }`}
                          >
                            Connect
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={handleViewAllSolvers}
                  disabled={isLoading}
                  className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isLoading
                      ? 'opacity-50 cursor-not-allowed'
                      : darkMode
                        ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20'
                        : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 border border-[#00001a]'
                  }`}
                >
                  View All Solvers
                </button>
              </div>
            </div>

            {/* Recent Discussions */}
            <div className={`p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
              darkMode
                ? 'bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_25px_rgba(0,0,26,0.2)]'
            }`}
            style={darkMode ? {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {}}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Recent Discussions
                </h2>
                <span className={`text-xs px-2 py-1 rounded-lg ${
                  darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
                }`}>
                  Anonymous Forum
                </span>
              </div>
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      darkMode
                        ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,26,0.15)]'
                    }`}
                    onClick={() => handleDiscussionClick(discussion.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {discussion.topic}
                          </h3>
                          {discussion.isHot && (
                            <span className={`px-2 py-1 text-xs font-medium rounded-lg flex items-center gap-1 ${
                              darkMode ? 'bg-white/10 text-white/70' : 'bg-[#00001a]/10 text-[#00001a]/70'
                            }`}>
                              <Flame className="w-3 h-3" />
                              Hot
                            </span>
                          )}
                          {discussion.anonymousPost && (
                            <span className={`px-2 py-1 text-xs font-medium rounded-lg flex items-center gap-1 ${
                              darkMode ? 'bg-white/10 text-white/70' : 'bg-[#00001a]/10 text-[#00001a]/70'
                            }`}>
                              <EyeOff className="w-3 h-3" />
                              Anonymous
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <span className={`${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                              by
                            </span>
                            <span className={`font-medium ${
                              discussion.anonymousPost
                                ? darkMode ? 'text-gray-300' : 'text-gray-700'
                                : darkMode ? 'text-white/80' : 'text-gray-800'
                            }`}>
                              {discussion.author}
                            </span>
                            {discussion.anonymousPost && (
                              <Lock className={`w-3 h-3 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} />
                            )}
                          </div>
                          <span className={`${darkMode ? 'text-white/40' : 'text-gray-500'}`}>
                            {discussion.comments} comments
                          </span>
                          <span className={`${darkMode ? 'text-white/40' : 'text-gray-500'}`}>
                            {formatTimeAgo(discussion.minutesAgo)}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                        darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
                      }`}>
                        {discussion.category}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleInterested(discussion.id)}
                        disabled={isLoading}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-300 ${
                          isLoading
                            ? 'opacity-50 cursor-not-allowed'
                            : interestedDiscussions.has(discussion.id)
                              ? darkMode
                                ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30'
                                : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                              : darkMode
                                ? 'border-white/20 text-white/70 hover:border-blue-400/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                                : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                        }`}
                      >
                        {interestedDiscussions.has(discussion.id) ? 'Interested ✓' : 'Interested'}
                      </button>
                      <button
                        onClick={() => handleNotifyMe(discussion.id)}
                        disabled={isLoading}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-300 ${
                          isLoading
                            ? 'opacity-50 cursor-not-allowed'
                            : notifyDiscussions.has(discussion.id)
                              ? darkMode
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30'
                                : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                              : darkMode
                                ? 'border-white/20 text-white/70 hover:border-blue-400/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                                : 'bg-white text-[#00001a] border-[#00001a]/60 hover:bg-gray-50 hover:border-[#00001a] shadow-sm'
                        }`}
                      >
                        {notifyDiscussions.has(discussion.id) ? 'Notifying 🔔' : 'Notify Me'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>




          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <div className={`p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
              darkMode
                ? 'bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_25px_rgba(0,0,26,0.2)]'
            }`}
            style={darkMode ? {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {}}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Top Contributors
                </h2>
                <span className={`text-xs px-2 py-1 rounded-lg ${
                  darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
                }`}>
                  Leaderboard
                </span>
              </div>
              <div className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <div
                    key={contributor.id}
                    onClick={() => handleContributorClick(contributor.id)}
                    className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                      darkMode
                        ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,26,0.15)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${
                          darkMode ? 'text-white/60' : 'text-[#00001a]/60'
                        }`}>
                          #{index + 1}
                        </span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                        }`}>
                          {React.createElement(getAvatarIcon(contributor.avatar), {
                            className: `w-4 h-4 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`
                          })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {contributor.pseudoName}
                            </h3>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-lg border ${getBadgeColor(contributor.badge)}`}>
                              {contributor.badge}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleFollowContributor(contributor.id)
                            }}
                            disabled={isLoading}
                            className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
                              isLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : darkMode
                                  ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                                  : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                            }`}
                          >
                            Follow
                          </button>
                        </div>
                        <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                          {contributor.specialty}
                        </p>
                        <p className={`text-xs font-medium ${darkMode ? 'text-white/80' : 'text-gray-800'}`}>
                          {contributor.points.toLocaleString()} points
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={handleViewFullLeaderboard}
                  disabled={isLoading}
                  className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isLoading
                      ? 'opacity-50 cursor-not-allowed'
                      : darkMode
                        ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20'
                        : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 border border-[#00001a]'
                  }`}
                >
                  View Full Leaderboard
                </button>
              </div>
            </div>

            {/* Share Content Button */}
            <button
              onClick={handleShareCommunity}
              disabled={isLoading}
              className={`w-full p-4 rounded-lg border transition-all duration-300 ${
                isLoading
                  ? darkMode
                    ? 'bg-white/30 border-white/20 text-white/50 cursor-not-allowed'
                    : 'bg-[#00001a]/30 border-[#00001a]/20 text-[#00001a]/50 cursor-not-allowed'
                  : darkMode
                    ? 'bg-white border-white/50 hover:border-white/80 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] text-[#00001a]'
                    : 'bg-[#00001a] border-[#00001a]/50 hover:border-[#00001a]/80 hover:shadow-[0_0_25px_rgba(0,0,26,0.3)] text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                )}
                <span className="font-semibold">
                  {isLoading ? 'Sharing...' : 'Share Content'}
                </span>
              </div>
            </button>

            {/* Upcoming Events */}
            <div className={`p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
              darkMode
                ? 'bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_25px_rgba(0,0,26,0.2)]'
            }`}
            style={darkMode ? {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {}}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Upcoming Events
                </h2>
                <span className={`text-xs px-2 py-1 rounded-lg ${
                  darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
                }`}>
                  Anonymous Events
                </span>
              </div>
              <div className="space-y-5">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-5 rounded-lg border transition-all duration-300 cursor-pointer ${
                      darkMode
                        ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,26,0.15)]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {event.name}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getEventTypeColor(event.type)}`}>
                            {event.type}
                          </span>
                          {event.anonymousHost && (
                            <span className={`px-2 py-1 text-xs font-medium rounded-lg flex items-center gap-1 ${
                              darkMode ? 'bg-white/10 text-white/70' : 'bg-[#00001a]/10 text-[#00001a]/70'
                            }`}>
                              <EyeOff className="w-3 h-3" />
                              Anonymous
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className={`w-4 h-4 ${darkMode ? 'text-white/60' : 'text-gray-600'}`} />
                              <span className={`${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                {new Date(event.date).toLocaleDateString()} at {event.time}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Users className={`w-4 h-4 ${darkMode ? 'text-white/60' : 'text-gray-600'}`} />
                              <span className={`${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                {event.attendees} attendees
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className={`w-4 h-4 ${darkMode ? 'text-white/60' : 'text-gray-600'}`} />
                              <span className={`${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                Hosted by {event.host}
                              </span>
                              {event.anonymousHost && (
                                <Lock className={`w-3 h-3 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => handleJoinEvent(event.id)}
                          disabled={isLoading}
                          className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-300 flex items-center gap-2 ${
                            isLoading
                              ? 'opacity-50 cursor-not-allowed'
                              : joinedEvents.has(event.id)
                                ? darkMode
                                  ? 'bg-white/10 text-white/70 border-white/20'
                                  : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                                : darkMode
                                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:border-blue-400/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                                  : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90 shadow-sm'
                          }`}
                        >
                          {joinedEvents.has(event.id) && <CheckCircle className="w-4 h-4" />}
                          {joinedEvents.has(event.id) ? 'Joined' : 'Join Event'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={handleViewAllEvents}
                  disabled={isLoading}
                  className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isLoading
                      ? 'opacity-50 cursor-not-allowed'
                      : darkMode
                        ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20'
                        : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 border border-[#00001a]'
                  }`}
                >
                  View All Events
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Full-Width Access Shared Content Section */}
        <div className={`mt-8 p-8 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
          darkMode
            ? 'bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
            : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_25px_rgba(0,0,26,0.2)]'
        }`}
        style={darkMode ? {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        } : {}}>
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Access Shared Content
            </h2>
            <span className={`text-lg px-4 py-2 rounded-lg font-medium ${
              darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
            }`}>
              {sharedContent.length} Files Available
            </span>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-white/50' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search shared content..."
                value={sharedContentSearch}
                onChange={(e) => setSharedContentSearch(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-blue-400/50 focus:bg-white/10'
                    : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500 focus:border-[#00001a]/50 focus:bg-gray-50'
                }`}
              />
            </div>
            <select
              value={sharedContentFilter}
              onChange={(e) => setSharedContentFilter(e.target.value)}
              className={`px-4 py-3 rounded-lg border transition-all duration-300 ${
                darkMode
                  ? 'bg-[#1a1a2e] border-white/20 text-white focus:border-blue-400/50'
                  : 'bg-white border-gray-300 text-[#00001a] focus:border-[#00001a]/50'
              }`}
              style={darkMode ? {
                backgroundColor: '#1a1a2e',
                color: 'white'
              } : {}}
            >
              <option value="all" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : {}}>All Types</option>
              <option value="document" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : {}}>Documents</option>
              <option value="folder" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : {}}>Folders</option>
              <option value="code" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : {}}>Code</option>
              <option value="video" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : {}}>Videos</option>
              <option value="image" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : {}}>Images</option>
            </select>
          </div>

          {/* Content Grid - Organized Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {getFilteredSharedContent().slice(0, 20).map((content) => {
              const ContentIcon = getContentIcon(content.type)
              return (
                <div
                  key={content.id}
                  className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col h-full ${
                    darkMode
                      ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-white border-[#00001a]/10 hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,26,0.15)]'
                  }`}
                  onClick={() => handleViewContent(content.id)}
                >
                  <div className="flex flex-col h-full">
                    {/* Header with icon and type */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${getContentTypeColor(content.type)}`}>
                        <ContentIcon className="w-5 h-5" />
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                        darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
                      }`}>
                        {content.category}
                      </span>
                    </div>

                    {/* Content info */}
                    <div className="flex-1 mb-3">
                      <h4 className={`font-semibold text-sm mb-2 line-clamp-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {content.title}
                      </h4>
                      <p className={`text-xs mb-2 ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                        By {content.isAnonymous ? 'Anonymous' : content.sharedBy}
                      </p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className={`${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          {content.size}
                        </span>
                        <span className={`${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          {content.downloads} downloads
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {content.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 text-xs rounded-lg ${
                            darkMode ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDownloadContent(content.id)
                        }}
                        className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          darkMode
                            ? 'hover:bg-white/10 text-white/70 hover:text-white'
                            : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                        }`}
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleShareSharedContent(content.id)
                        }}
                        className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          darkMode
                            ? 'hover:bg-white/10 text-white/70 hover:text-white'
                            : 'bg-[#00001a]/10 text-[#00001a] hover:bg-[#00001a]/20 border border-[#00001a]/20'
                        }`}
                      >
                        <Share2 className="w-3 h-3" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* View All Button */}
          {getFilteredSharedContent().length > 20 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowSharedContentModal(true)}
                className={`px-8 py-4 rounded-lg font-medium transition-all duration-300 text-lg ${
                  darkMode
                    ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30'
                    : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 border border-[#00001a]'
                }`}
              >
                View All Shared Content ({getFilteredSharedContent().length})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Shared Content Modal */}
      {showSharedContentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-4xl w-full max-h-[90vh] rounded-lg border overflow-hidden ${
            darkMode ? 'bg-[#00001a] border-white/20' : 'bg-white border-gray-200'
          }`}>
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {selectedSharedContent ? selectedSharedContent.title : 'Shared Content Library'}
                  </h3>
                  <p className={`mt-1 ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                    {selectedSharedContent ? 'Content Details' : 'Browse all shared files and folders from the community'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowSharedContentModal(false)
                    setSelectedSharedContent(null)
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-[#00001a] hover:bg-gray-100'
                  }`}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {selectedSharedContent ? (
                /* Content Details View */
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-lg ${getContentTypeColor(selectedSharedContent.type)}`}>
                      {React.createElement(getContentIcon(selectedSharedContent.type), { className: 'w-8 h-8' })}
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {selectedSharedContent.title}
                      </h4>
                      <p className={`mb-4 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        {selectedSharedContent.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className={`text-sm font-medium ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                            Shared By
                          </span>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {selectedSharedContent.isAnonymous ? 'Anonymous Solver' : selectedSharedContent.sharedBy}
                          </p>
                        </div>
                        <div>
                          <span className={`text-sm font-medium ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                            Size
                          </span>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {selectedSharedContent.size}
                          </p>
                        </div>
                        <div>
                          <span className={`text-sm font-medium ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                            Downloads
                          </span>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {selectedSharedContent.downloads}
                          </p>
                        </div>
                        <div>
                          <span className={`text-sm font-medium ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                            Category
                          </span>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {selectedSharedContent.category}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedSharedContent.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 text-xs rounded-lg ${
                              darkMode ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleDownloadContent(selectedSharedContent.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            darkMode
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                              : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90'
                          }`}
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button
                          onClick={() => handleShareSharedContent(selectedSharedContent.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium border transition-all duration-300 ${
                            darkMode
                              ? 'border-white/20 text-white hover:bg-white/10'
                              : 'border-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/5'
                          }`}
                        >
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Content Library View */
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                        darkMode ? 'text-white/50' : 'text-gray-400'
                      }`} />
                      <input
                        type="text"
                        placeholder="Search all shared content..."
                        value={sharedContentSearch}
                        onChange={(e) => setSharedContentSearch(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                            : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500'
                        }`}
                      />
                    </div>
                    <select
                      value={sharedContentFilter}
                      onChange={(e) => setSharedContentFilter(e.target.value)}
                      className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'bg-[#00001a] border-white/20 text-white'
                          : 'bg-white border-gray-300 text-[#00001a]'
                      }`}
                    >
                      <option value="all">All Types</option>
                      <option value="document">Documents</option>
                      <option value="folder">Folders</option>
                      <option value="code">Code</option>
                      <option value="video">Videos</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getFilteredSharedContent().map((content) => {
                      const ContentIcon = getContentIcon(content.type)
                      return (
                        <div
                          key={content.id}
                          className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                            darkMode
                              ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                              : 'bg-white border-[#00001a]/10 hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,26,0.15)]'
                          }`}
                          onClick={() => setSelectedSharedContent(content)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-3 rounded-lg ${getContentTypeColor(content.type)}`}>
                              <ContentIcon className="w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                                {content.title}
                              </h4>
                              <p className={`text-sm mb-2 line-clamp-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                {content.description}
                              </p>
                              <div className="flex items-center gap-2 text-xs">
                                <span className={`${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                                  By {content.isAnonymous ? 'Anonymous' : content.sharedBy}
                                </span>
                                <span className={`${darkMode ? 'text-white/50' : 'text-gray-400'}`}>•</span>
                                <span className={`${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                                  {content.size}
                                </span>
                                <span className={`${darkMode ? 'text-white/50' : 'text-gray-400'}`}>•</span>
                                <span className={`${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                                  {content.downloads} downloads
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDownloadContent(content.id)
                                }}
                                className={`p-2 rounded-lg transition-colors ${
                                  darkMode
                                    ? 'text-white/70 hover:text-white hover:bg-white/10'
                                    : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                                }`}
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleShareSharedContent(content.id)
                                }}
                                className={`p-2 rounded-lg transition-colors border ${
                                  darkMode
                                    ? 'text-white/70 hover:text-white hover:bg-white/10 border-white/20'
                                    : 'text-[#00001a] hover:bg-[#00001a]/10 border-[#00001a]/20'
                                }`}
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {getFilteredSharedContent().length === 0 && (
                    <div className="text-center py-12">
                      <FolderOpen className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-white/30' : 'text-gray-300'}`} />
                      <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        No content found
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Community

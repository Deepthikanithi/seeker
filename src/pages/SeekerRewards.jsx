import { useState } from 'react'
import { 
  Gift, Shield, Users, Flame, Percent, CheckCircle, Clock, 
  Coins, Wallet, Receipt, Phone, FileText, Camera, User, AtSign,
  Calendar, Target, Crown, Flag, BarChart3, Star, Trophy
} from 'lucide-react'

const SeekerRewards = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showFaceVerificationModal, setShowFaceVerificationModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showReferralModal, setShowReferralModal] = useState(false)
  const [faceVerificationStep, setFaceVerificationStep] = useState('start')
  const [profileProgress, setProfileProgress] = useState(75)
  
  // User stats
  const userStats = {
    totalPoints: 2850,
    availablePoints: 1650,
    redeemedPoints: 1200,
    totalBookings: 23,
    totalMinutes: 1847,
    referralsCount: 5,
    currentStreak: 7,
    longestStreak: 23,
    verificationLevel: 'Standard'
  }

  // Verification handlers
  const handleFaceVerification = async () => {
    setShowFaceVerificationModal(true)
    setFaceVerificationStep('start')
  }

  const startFaceVerification = async () => {
    try {
      setFaceVerificationStep('processing')
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
      })

      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop())
        setFaceVerificationStep('success')
        setTimeout(() => {
          setShowFaceVerificationModal(false)
          setFaceVerificationStep('start')
        }, 2000)
      }, 3000)

    } catch (error) {
      console.error('Camera access denied:', error)
      alert('Camera access is required for face verification. Please allow camera access and try again.')
      setFaceVerificationStep('start')
    }
  }

  const handleProfileCompletion = () => {
    setShowProfileModal(true)
  }

  const completeProfile = () => {
    setProfileProgress(100)
    setTimeout(() => setShowProfileModal(false), 1500)
  }

  // Verification steps
  const verificationSteps = [
    { id: 'email', name: 'Email Verification', icon: AtSign, points: 50, status: 'completed' },
    { id: 'mobile', name: 'Mobile Verification', icon: Phone, points: 75, status: 'completed' },
    { id: 'id', name: 'ID Verification', icon: FileText, points: 200, status: 'completed' },
    { id: 'face', name: 'Face Verification', icon: Camera, points: 300, status: 'available' },
    { id: 'profile', name: 'Profile Completion', icon: User, points: 150, status: 'in_progress' }
  ]

  const renderOverview = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Quick Actions */}
      <div className={`p-4 sm:p-6 rounded-lg border transition-all duration-300 ${
        darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
      }`}>
        <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className={`p-3 sm:p-4 rounded-lg border min-w-0 transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <Shield className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
            <h4 className={`text-sm sm:text-base font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'} break-words`}>
              Complete Verification
            </h4>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'} break-words`}>
              Earn up to 775 points
            </p>
          </div>

          <div className={`p-3 sm:p-4 rounded-lg border min-w-0 transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <Users className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
            <h4 className={`text-sm sm:text-base font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'} break-words`}>
              Invite Friends
            </h4>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'} break-words`}>
              500 points per referral
            </p>
          </div>

          <div className={`p-3 sm:p-4 rounded-lg border min-w-0 transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <Flag className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
            <h4 className={`text-sm sm:text-base font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'} break-words`}>
              Report Issues
            </h4>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'} break-words`}>
              100 points per report
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`p-4 sm:p-6 rounded-lg border transition-all duration-300 ${
        darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
      }`}>
        <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
          Recent Activity
        </h3>
        <div className="space-y-3">
          {[
            { action: 'Completed session with John D.', points: 25, time: '2 hours ago', icon: CheckCircle },
            { action: 'Verified mobile number', points: 75, time: '1 day ago', icon: Phone },
            { action: 'Referred new user: Sarah M.', points: 500, time: '3 days ago', icon: Users },
            { action: '7-day streak milestone', points: 100, time: '1 week ago', icon: Flame }
          ].map((activity, index) => (
            <div key={index} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
              darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
            }`}>
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <activity.icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                <div className="min-w-0 flex-1">
                  <p className={`text-sm sm:text-base font-medium break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {activity.action}
                  </p>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                    {activity.time}
                  </p>
                </div>
              </div>
              <div className="text-right sm:text-right flex-shrink-0">
                <p className={`text-sm sm:text-base font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  +{activity.points}
                </p>
                <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                  points
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderVerification = () => (
    <div className={`p-4 sm:p-6 rounded-lg border transition-all duration-300 ${
      darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div className="min-w-0 flex-1">
          <h3 className={`text-lg sm:text-xl font-bold break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            Account Verification
          </h3>
          <p className={`text-sm sm:text-base break-words ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
            Complete verification steps to earn points and unlock features
          </p>
        </div>
        <div className={`px-3 sm:px-4 py-2 rounded-lg border flex-shrink-0 transition-all duration-300 ${darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-gray-300 hover:border-gray-400 hover:shadow-[0_0_10px_rgba(0,0,26,0.15)]'}`}>
          <p className={`text-xs sm:text-sm font-medium whitespace-nowrap ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            3/5 Complete
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {verificationSteps.map((step) => (
          <div
            key={step.id}
            className={`p-4 rounded-lg border transition-all duration-300 ${
              step.status === 'completed'
                ? darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
                : step.status === 'in_progress'
                  ? darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
                  : step.status === 'available'
                    ? darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
                    : darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,26,0.15)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg border ${
                  step.status === 'completed'
                    ? darkMode ? 'bg-[#00001a] border-gray-800' : 'border-gray-200'
                    : darkMode ? 'bg-[#00001a] border-gray-800' : 'border-gray-100'
                }`}>
                  <step.icon className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {step.name}
                    </h4>
                    {step.status === 'completed' && (
                      <CheckCircle className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                    )}
                    {step.status === 'in_progress' && (
                      <Clock className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-gray-600'}`} />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <Coins className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {step.points}
                  </span>
                </div>
                {step.status === 'available' && (
                  <button 
                    onClick={() => {
                      if (step.id === 'face') {
                        handleFaceVerification()
                      } else {
                        alert(`Starting ${step.name}...`)
                      }
                    }}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500 hover:bg-blue-500/30'
                        : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 shadow-[0_2px_4px_rgba(0,0,26,0.15)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.15)]'
                    }`}
                  >
                    Start
                  </button>
                )}
                {step.status === 'in_progress' && (
                  <button 
                    onClick={() => {
                      if (step.id === 'profile') {
                        handleProfileCompletion()
                      } else {
                        alert(`Continuing ${step.name}...`)
                      }
                    }}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500 hover:bg-yellow-500/30'
                        : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                    }`}
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#00001a]' : 'bg-white'}`}>
      <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
        
        {/* Header */}
        <div className={`p-4 sm:p-5 lg:p-6 rounded-lg border transition-all duration-300 ${
          darkMode
            ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
            : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className={`p-2 sm:p-3 rounded-lg border flex-shrink-0 transition-all duration-300 ${darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-gray-100 border-gray-200'}`}>
                <Gift className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'} break-words`}>
                  Rewards Program
                </h2>
                <p className={`text-sm sm:text-base ${darkMode ? 'text-white/70' : 'text-gray-600'} break-words`}>
                  Earn points, unlock discounts, and get rewarded for your learning journey
                </p>
              </div>
            </div>

            <div className={`px-3 sm:px-4 py-2 rounded-lg border flex-shrink-0 transition-all duration-300 ${
              darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
            }`}>
              <div className="flex items-center gap-2">
                <Shield className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                <div>
                  <p className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'} whitespace-nowrap`}>
                    {userStats.verificationLevel} Verified
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'} whitespace-nowrap`}>
                    60% Complete
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Points Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Coins, value: userStats.totalPoints, label: 'Total Points Earned' },
              { icon: Wallet, value: userStats.availablePoints, label: 'Available Points' },
              { icon: Receipt, value: userStats.redeemedPoints, label: 'Points Redeemed' },
              { icon: Flame, value: userStats.currentStreak, label: 'Day Streak' }
            ].map((item, index) => (
              <div key={index} className={`p-3 sm:p-4 rounded-lg border min-w-0 transition-all duration-300 ${
                darkMode
                  ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                  : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
              }`}>
                <div className="flex items-center gap-2 sm:gap-3 mb-2 min-w-0">
                  <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                  <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'} truncate`}>
                    {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                  </h3>
                </div>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'} break-words`}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className={`p-1 rounded-lg border transition-all duration-300 ${
          darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
        }`}>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'verification', name: 'Verification', icon: Shield },
              { id: 'referrals', name: 'Referrals', icon: Users },
              { id: 'streaks', name: 'Streaks', icon: Flame },
              { id: 'discounts', name: 'Discounts', icon: Percent }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-2 rounded-lg text-sm sm:text-base font-medium whitespace-nowrap border transition-all duration-300 ${
                  activeTab === tab.id
                    ? darkMode
                      ? 'bg-blue-600/20 text-white border-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                      : 'bg-[#00001a] text-white border-[#00001a] shadow-[0_2px_4px_rgba(0,0,26,0.15)]'
                    : darkMode
                      ? 'text-white/70 border-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                      : 'text-gray-600 border-gray-200 hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                }`}
              >
                <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.name.slice(0, 4)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'verification' && renderVerification()}
        {activeTab === 'referrals' && (
          <div className={`p-4 sm:p-6 rounded-lg border transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <div className="min-w-0 flex-1">
                <h3 className={`text-lg sm:text-xl font-bold break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Referral Program
                </h3>
                <p className={`text-sm sm:text-base break-words ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Invite friends and earn 500 points for each successful referral
                </p>
              </div>
              <button
                onClick={() => setShowReferralModal(true)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 flex-shrink-0 whitespace-nowrap ${
                  darkMode
                    ? 'bg-[#00001a] text-green-400 border border-green-500 hover:shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                    : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 shadow-[0_2px_4px_rgba(0,0,26,0.15)]'
                }`}>
                Invite Friends
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
              }`}>
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Users className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                  <h3 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {userStats.referralsCount}
                  </h3>
                </div>
                <p className={`text-xs sm:text-sm break-words ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Successful Referrals
                </p>
              </div>

              <div className={`p-4 rounded-lg border transition-all duration-300 ${
                darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <Coins className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    2,500
                  </h3>
                </div>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Points Earned
                </p>
              </div>

              <div className={`p-4 rounded-lg border transition-all duration-300 ${
                darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <Target className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    3
                  </h3>
                </div>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Pending Invites
                </p>
              </div>
            </div>

            <div>
              <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Recent Referrals
              </h4>
              <div className="space-y-3">
                {[
                  { name: 'Sarah M.', status: 'completed', points: 500, date: '3 days ago' },
                  { name: 'John D.', status: 'completed', points: 500, date: '1 week ago' },
                  { name: 'Emma K.', status: 'completed', points: 500, date: '2 weeks ago' },
                  { name: 'Mike R.', status: 'pending', points: 0, date: '5 days ago' },
                  { name: 'Lisa T.', status: 'pending', points: 0, date: '1 week ago' }
                ].map((referral, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                    darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <User className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {referral.name}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          {referral.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        referral.status === 'completed'
                          ? darkMode ? 'text-white' : 'text-[#00001a]'
                          : darkMode ? 'text-white/60' : 'text-gray-500'
                      }`}>
                        {referral.status === 'completed' ? `+${referral.points}` : 'Pending'}
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        {referral.status === 'completed' ? 'points' : 'signup'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'streaks' && (
          <div className={`p-4 sm:p-6 rounded-lg border transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <div className="text-center mb-4 sm:mb-6">
              <Flame className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
              <h3 className={`text-2xl sm:text-3xl font-bold mb-2 break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {userStats.currentStreak} Days
              </h3>
              <p className={`text-base sm:text-lg break-words ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Current Learning Streak
              </p>
              <p className={`text-sm mt-2 break-words ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                Keep learning to maintain your streak!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className={`p-3 sm:p-4 rounded-lg border text-center transition-all duration-300 ${
                darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
              }`}>
                <Trophy className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                <h4 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {userStats.longestStreak}
                </h4>
                <p className={`text-xs sm:text-sm break-words ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Longest Streak
                </p>
              </div>

              <div className={`p-4 rounded-lg border text-center transition-all duration-300 ${
                darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
              }`}>
                <Calendar className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                <h4 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  12
                </h4>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  This Month
                </p>
              </div>

              <div className={`p-4 rounded-lg border text-center transition-all duration-300 ${
                darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
              }`}>
                <Star className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                <h4 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  850
                </h4>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Streak Points
                </p>
              </div>
            </div>

            {/* Streak Rewards */}
            <div className="mb-6">
              <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Streak Rewards
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { days: 7, reward: '50 Points', icon: Flame, achieved: true },
                  { days: 30, reward: '200 Points', icon: Calendar, achieved: false },
                  { days: 90, reward: '500 Points + 10% Discount', icon: Trophy, achieved: false },
                  { days: 365, reward: '2000 Points + Premium Badge', icon: Crown, achieved: false }
                ].map((milestone, index) => (
                  <div key={index} className={`p-4 rounded-lg border text-center transition-all duration-300 ${
                    milestone.achieved
                      ? darkMode ? 'bg-green-500/20 border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'border-green-300 bg-green-50 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                      : darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
                  }`}>
                    <milestone.icon className={`w-6 h-6 mx-auto mb-2 ${
                      milestone.achieved
                        ? darkMode ? 'text-green-400' : 'text-green-600'
                        : darkMode ? 'text-white/70' : 'text-gray-500'
                    }`} />
                    <h5 className={`font-semibold mb-1 ${
                      milestone.achieved
                        ? darkMode ? 'text-green-400' : 'text-green-600'
                        : darkMode ? 'text-white' : 'text-[#00001a]'
                    }`}>
                      {milestone.days} Days
                    </h5>
                    <p className={`text-xs ${
                      milestone.achieved
                        ? darkMode ? 'text-green-400/80' : 'text-green-600/80'
                        : darkMode ? 'text-white/60' : 'text-gray-500'
                    }`}>
                      {milestone.reward}
                    </p>
                    {milestone.achieved && (
                      <div className={`mt-2 text-xs font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                        ✓ Achieved
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'discounts' && (
          <div className={`p-4 sm:p-6 rounded-lg border transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <div className="min-w-0 flex-1">
                <h3 className={`text-lg sm:text-xl font-bold break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Smart Discounts
                </h3>
                <p className={`text-sm sm:text-base break-words ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Unlock discounts based on your activity and loyalty
                </p>
              </div>
              <div className={`px-3 sm:px-4 py-2 rounded-lg border flex-shrink-0 transition-all duration-300 ${darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'}`}>
                <p className={`text-xs sm:text-sm font-medium whitespace-nowrap ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  4 Active Discounts
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {[
                { title: 'Loyalty Discount', discount: '15%', description: `For 20+ bookings (${userStats.totalBookings}/20)`, icon: Crown },
                { title: 'Time Bonus', discount: '10%', description: `For 1500+ minutes (${userStats.totalMinutes}/1500)`, icon: Clock },
                { title: 'Streak Reward', discount: '5%', description: `For 7+ day streak (${userStats.currentStreak}/7)`, icon: Flame },
                { title: 'Referral Bonus', discount: '20%', description: `For 5+ referrals (${userStats.referralsCount}/5)`, icon: Users }
              ].map((discount, index) => (
                <div key={index} className={`p-4 rounded-lg border transition-all duration-300 ${
                  darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${
                        darkMode ? 'bg-[#00001a] border-gray-800' : 'bg-gray-100 border-gray-200'
                      }`}>
                        <discount.icon className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {discount.title}
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          {discount.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {discount.discount}
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        OFF
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`p-4 rounded-lg border text-center transition-all duration-300 ${
              darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}>
              <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Total Savings This Year
              </h4>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                $247.50
              </p>
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                From {userStats.totalBookings} discounted sessions
              </p>
            </div>
          </div>
        )}

        {/* Face Verification Modal */}
        {showFaceVerificationModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-md w-full rounded-lg border transition-all duration-300 ${
              darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200'
            }`}>
              <div className="p-6">
                <div className="text-center">
                  {faceVerificationStep === 'start' && (
                    <>
                      <Camera className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Face Verification
                      </h3>
                      <p className={`mb-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Position your face in the camera frame for biometric verification.
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowFaceVerificationModal(false)}
                          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            darkMode
                              ? 'bg-white/10 text-white hover:bg-white/20'
                              : 'bg-gray-100 text-[#00001a] hover:bg-gray-200'
                          }`}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={startFaceVerification}
                          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            darkMode
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500 hover:bg-blue-500/30'
                              : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                          }`}
                        >
                          Start Camera
                        </button>
                      </div>
                    </>
                  )}

                  {faceVerificationStep === 'processing' && (
                    <>
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full border-4 border-t-transparent ${
                        darkMode ? 'border-gray-800 border-t-white' : 'border-gray-300 border-t-[#00001a]'
                      }`}></div>
                      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Verifying...
                      </h3>
                      <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Please look directly at the camera and remain still.
                      </p>
                    </>
                  )}

                  {faceVerificationStep === 'success' && (
                    <>
                      <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Verification Complete!
                      </h3>
                      <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Your face verification was successful. You earned 300 points!
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Completion Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-md w-full rounded-lg border transition-all duration-300 ${
              darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200'
            }`}>
              <div className="p-6">
                <div className="text-center">
                  <User className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Complete Your Profile
                  </h3>
                  <p className={`mb-4 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Add more details to your profile to earn 150 points.
                  </p>

                  {/* Progress Bar */}
                  <div className={`w-full bg-gray-200 rounded-full h-2 mb-4 ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${darkMode ? 'bg-white' : 'bg-[#00001a]'}`}
                      style={{ width: `${profileProgress}%` }}
                    ></div>
                  </div>
                  <p className={`text-sm mb-6 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                    {profileProgress}% Complete
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowProfileModal(false)}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/10 text-white hover:bg-white/20'
                          : 'bg-gray-100 text-[#00001a] hover:bg-gray-200'
                      }`}
                    >
                      Later
                    </button>
                    <button
                      onClick={completeProfile}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-green-500/20 text-green-400 border border-green-500 hover:bg-green-500/30'
                          : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                      }`}
                    >
                      Complete Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Referral Link Modal */}
        {showReferralModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-md w-full rounded-lg border transition-all duration-300 ${
              darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200'
            }`}>
              <div className="p-6">
                <div className="text-center mb-6">
                  <Users className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Invite Friends to SynapMentor
                  </h3>
                  <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Share your referral link and earn 500 points for each successful signup!
                  </p>
                </div>

                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Your Referral Link
                  </label>
                  <div className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
                    darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <input
                      type="text"
                      value="https://synapmentor.com/ref/user123"
                      readOnly
                      className={`flex-1 bg-transparent text-sm ${
                        darkMode ? 'text-white' : 'text-[#00001a]'
                      } focus:outline-none`}
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('https://synapmentor.com/ref/user123')
                        alert('Referral link copied to clipboard!')
                      }}
                      className={`px-3 py-1 rounded text-xs font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/20 text-white hover:bg-white/30'
                          : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                      }`}
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Share via:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        const text = "Join me on SynapMentor - the best platform for learning and mentorship! Use my referral link: https://synapmentor.com/ref/user123"
                        const url = `https://wa.me/?text=${encodeURIComponent(text)}`
                        window.open(url, '_blank')
                      }}
                      className={`p-3 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'border-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          WhatsApp
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        const text = "Join me on SynapMentor! https://synapmentor.com/ref/user123"
                        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
                        window.open(url, '_blank')
                      }}
                      className={`p-3 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'border-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Twitter
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowReferralModal(false)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : 'bg-gray-100 text-[#00001a] hover:bg-gray-200'
                    }`}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('https://synapmentor.com/ref/user123')
                      alert('Referral link copied! Share it with your friends to earn 500 points per signup.')
                      setShowReferralModal(false)
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500 hover:bg-cyan-500/30'
                        : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                    }`}
                  >
                    Copy & Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SeekerRewards

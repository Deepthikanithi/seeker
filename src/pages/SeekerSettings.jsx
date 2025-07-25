import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import {
  Settings,
  Globe,
  Bell,
  Shield,
  FileText,
  Smartphone,
  Mail,
  Calendar,
  MessageSquare,
  MessageCircle,
  Eye,
  EyeOff,
  Lock,
  CreditCard,
  AlertTriangle,
  Users,
  DollarSign,
  X,
  Check,
  Info,
  HelpCircle,
  ExternalLink
} from 'lucide-react'

const SeekerSettings = ({ darkMode }) => {
  const { t, language, setLanguage } = useLanguage()
  const [activeSection, setActiveSection] = useState('language')
  const [showModal, setShowModal] = useState(null)
  const [mfaEnabled, setMfaEnabled] = useState(false)
  const [mfaStep, setMfaStep] = useState(1)
  const [mfaCode, setMfaCode] = useState('')
  const [mfaMethod, setMfaMethod] = useState('sms')
  const [backupCodes, setBackupCodes] = useState(false)

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    calendarReminders: true,
    pushNotifications: false,
    messageNotifications: true,
    weeklyDigest: true,
    anonymousPoolResponse: true
  })

  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    allowDirectMessages: true,
    shareAnalytics: false,
    anonymousMode: true
  })

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ar', name: 'العربية' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' }
  ]

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handlePrivacyChange = (key) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleMfaSetup = () => {
    if (mfaStep === 1) {
      setMfaStep(2)
    } else if (mfaStep === 2 && mfaCode.length === 6) {
      setMfaEnabled(true)
      setShowModal(null)
      setMfaStep(1)
      setMfaCode('')
    }
  }

  const openModal = (modalType) => {
    setShowModal(modalType)
  }

  const closeModal = () => {
    setShowModal(null)
    setMfaStep(1)
    setMfaCode('')
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-gray-50'
    }`}>
      <div className="p-6">

        {/* Header */}
        <div className={`p-6 rounded-lg mb-8 transition-all duration-300 ${
          darkMode
            ? 'border border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:border-blue-400/30'
            : 'bg-white border border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <Settings className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Settings
            </h1>
          </div>
          <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
            Customize your experience and manage your preferences.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'language', name: 'Language', icon: Globe },
            { id: 'notifications', name: 'Notifications', icon: Bell },
            { id: 'privacy', name: 'Privacy', icon: Shield },
            { id: 'policies', name: 'Policies', icon: FileText },
            { id: 'mfa', name: 'Security (MFA)', icon: Lock }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeSection === tab.id
                  ? darkMode
                    ? 'bg-[#00001a] text-white border border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                    : 'bg-[#00001a] text-white shadow-[0_2px_4px_rgba(0,0,26,0.15)]'
                  : darkMode
                    ? 'bg-[#00001a] text-white/70 border border-white/20 hover:text-white hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                    : 'bg-white text-gray-600 border border-gray-200 hover:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
              }`}
            >
              {React.createElement(tab.icon, { className: 'w-4 h-4' })}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content based on active section */}
        <div className="space-y-8">
          {activeSection === 'language' && (
            <div className={`p-6 rounded-lg transition-all duration-300 ${
              darkMode
                ? 'border border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:border-blue-400/30'
                : 'bg-white border border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <Globe className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Platform Language Settings
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`p-3 rounded-lg border text-left transition-all duration-300 ${
                      language === lang.code
                        ? (darkMode ? 'bg-[#00001a] text-blue-400 border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]' : 'bg-[#00001a] text-white border-[#00001a] shadow-[0_2px_4px_rgba(0,0,26,0.15)]')
                        : (darkMode ? 'bg-[#00001a] border-white/20 text-white hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]' : 'bg-white border-gray-200 text-[#00001a] shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]')
                    }`}
                  >
                    <div className="font-medium">{lang.name}</div>
                    <div className={`text-xs ${
                      language === lang.code
                        ? (darkMode ? 'text-blue-300' : 'text-white/80')
                        : (darkMode ? 'text-white/60' : 'text-gray-500')
                    }`}>
                      {lang.code.toUpperCase()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className={`p-6 rounded-lg transition-all duration-300 ${
              darkMode
                ? 'border border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:border-blue-400/30'
                : 'bg-white border border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <Bell className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Notification Settings
                </h3>
              </div>

              <div className="space-y-6">
                {/* Email Alerts */}
                <div className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#00001a] border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]'
                    : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                }`}>
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <Mail className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-medium text-sm sm:text-base ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Email Alerts
                        </h4>
                        <p className={`text-xs sm:text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Receive important updates via email
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('emailAlerts')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                        notifications.emailAlerts
                          ? (darkMode ? 'bg-blue-500' : 'bg-[#00001a]')
                          : (darkMode ? 'bg-white/20' : 'bg-gray-300')
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Calendar Reminders */}
                <div className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#00001a] border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]'
                    : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                }`}>
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <Calendar className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Calendar Reminders
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Calendar integration with note reminders
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('calendarReminders')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                        notifications.calendarReminders
                          ? (darkMode ? 'bg-blue-500' : 'bg-[#00001a]')
                          : (darkMode ? 'bg-white/20' : 'bg-gray-300')
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.calendarReminders ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Push Notifications */}
                <div className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#00001a] border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]'
                    : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                }`}>
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <Bell className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Push Notifications (Browser)
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Real-time browser notifications
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('pushNotifications')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                        notifications.pushNotifications
                          ? (darkMode ? 'bg-blue-500' : 'bg-[#00001a]')
                          : (darkMode ? 'bg-white/20' : 'bg-gray-300')
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Message Notifications */}
                <div className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#00001a] border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]'
                    : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                }`}>
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <MessageSquare className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Message Notifications
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Chat and message alerts
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('messageNotifications')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                        notifications.messageNotifications
                          ? (darkMode ? 'bg-blue-500' : 'bg-[#00001a]')
                          : (darkMode ? 'bg-white/20' : 'bg-gray-300')
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.messageNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Weekly Digest */}
                <div className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#00001a] border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]'
                    : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                }`}>
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <Mail className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Weekly Digest
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Weekly summary of your activity
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('weeklyDigest')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                        notifications.weeklyDigest
                          ? (darkMode ? 'bg-blue-500' : 'bg-[#00001a]')
                          : (darkMode ? 'bg-white/20' : 'bg-gray-300')
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Anonymous Pool Response */}
                <div className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#00001a] border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]'
                    : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                }`}>
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <Bell className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Anonymous Pool Response
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Notifications when your questions are answered
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('anonymousPoolResponse')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                        notifications.anonymousPoolResponse
                          ? (darkMode ? 'bg-blue-500' : 'bg-[#00001a]')
                          : (darkMode ? 'bg-white/20' : 'bg-gray-300')
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.anonymousPoolResponse ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className={`p-6 rounded-lg transition-all duration-300 ${
              darkMode
                ? 'border border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:border-blue-400/30'
                : 'bg-white border border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <Shield className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Privacy Settings
                </h3>
              </div>

              <div className="space-y-6">
                {/* Privacy Toggles */}
                {[
                  {
                    key: 'showOnlineStatus',
                    label: 'Show Online Status',
                    desc: 'Let others see when you\'re online',
                    icon: Eye
                  },
                  {
                    key: 'allowDirectMessages',
                    label: 'Allow Direct Messages',
                    desc: 'Allow other users to message you directly',
                    icon: MessageSquare
                  },
                  {
                    key: 'shareAnalytics',
                    label: 'Share Analytics Data',
                    desc: 'Help improve the platform by sharing usage data',
                    icon: Info
                  },
                  {
                    key: 'anonymousMode',
                    label: 'Anonymous Mode',
                    desc: 'Keep your identity completely anonymous',
                    icon: EyeOff
                  }
                ].map((item) => (
                  <div key={item.key} className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]'
                      : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                  }`}>
                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        {React.createElement(item.icon, {
                          className: `w-5 h-5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`
                        })}
                        <div className="min-w-0 flex-1">
                          <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {item.label}
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePrivacyChange(item.key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                          privacySettings[item.key]
                            ? (darkMode ? 'bg-blue-500' : 'bg-[#00001a]')
                            : (darkMode ? 'bg-white/20' : 'bg-gray-300')
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            privacySettings[item.key] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Privacy Disclaimer Button */}
                <button
                  onClick={() => openModal('privacy')}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] text-[#00001a]'
                  }`}>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">Privacy Disclaimer</span>
                  </div>
                  <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                    View Details
                  </span>
                </button>
              </div>
            </div>
          )}

          {activeSection === 'policies' && (
            <div className={`p-6 rounded-lg transition-all duration-300 ${
              darkMode
                ? 'border border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:border-blue-400/30'
                : 'bg-white border border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <FileText className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Policies
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Subscription Policy',
                    desc: 'Terms and conditions for subscriptions',
                    icon: CreditCard,
                    modal: 'subscription'
                  },
                  {
                    title: 'Report Policy',
                    desc: 'Guidelines for reporting issues',
                    icon: AlertTriangle,
                    modal: 'report'
                  },
                  {
                    title: 'Referral Policy',
                    desc: 'Terms for referral program',
                    icon: Users,
                    modal: 'referral'
                  },
                  {
                    title: 'Payment Policy',
                    desc: 'Payment terms and refund policy',
                    icon: DollarSign,
                    modal: 'payment'
                  }
                ].map((policy) => (
                  <button
                    key={policy.modal}
                    onClick={() => openModal(policy.modal)}
                    className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                      darkMode
                        ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                        : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)] text-[#00001a]'
                    }`}>
                    <div className="flex items-start gap-3">
                      {React.createElement(policy.icon, {
                        className: `w-5 h-5 mt-0.5 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`
                      })}
                      <div>
                        <h4 className="font-medium mb-2">{policy.title}</h4>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          {policy.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'mfa' && (
            <div className={`p-6 rounded-lg transition-all duration-300 ${
              darkMode
                ? 'border border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:border-blue-400/30'
                : 'bg-white border border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <Lock className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Multi-Factor Authentication (MFA)
                </h3>
              </div>

              {/* MFA Enabled Toggle */}
              <div className={`p-4 rounded-lg border transition-all duration-300 ${
                darkMode
                  ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Check className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                    <div>
                      <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        MFA Enabled
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        Your account is protected with multi-factor authentication
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMfaEnabled(!mfaEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      mfaEnabled
                        ? (darkMode ? 'bg-blue-500' : 'bg-[#00001a]')
                        : (darkMode ? 'bg-white/20' : 'bg-gray-300')
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        mfaEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Authentication Method */}
              {mfaEnabled && (
                <div className="space-y-4">
                  <div>
                    <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Authentication Method
                    </h4>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                      Choose how you want to receive authentication codes
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* SMS Text Message */}
                    <div className={`p-4 rounded-lg border transition-all duration-300 ${
                      mfaMethod === 'sms'
                        ? darkMode
                          ? 'border-blue-400/50 bg-blue-500/10'
                          : 'border-[#00001a] bg-[#00001a]/5'
                        : darkMode
                          ? 'border-white/10 hover:border-white/20'
                          : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          id="sms"
                          name="mfaMethod"
                          checked={mfaMethod === 'sms'}
                          onChange={() => setMfaMethod('sms')}
                          className="w-4 h-4"
                        />
                        <Smartphone className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-gray-600'}`} />
                        <div>
                          <label htmlFor="sms" className={`font-medium cursor-pointer ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            SMS Text Message
                          </label>
                          <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            Receive codes via text message
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className={`p-4 rounded-lg border transition-all duration-300 ${
                      mfaMethod === 'email'
                        ? darkMode
                          ? 'border-blue-400/50 bg-blue-500/10'
                          : 'border-[#00001a] bg-[#00001a]/5'
                        : darkMode
                          ? 'border-white/10 hover:border-white/20'
                          : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          id="email"
                          name="mfaMethod"
                          checked={mfaMethod === 'email'}
                          onChange={() => setMfaMethod('email')}
                          className="w-4 h-4"
                        />
                        <Mail className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-gray-600'}`} />
                        <div>
                          <label htmlFor="email" className={`font-medium cursor-pointer ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Email
                          </label>
                          <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            Receive codes via email
                          </p>
                        </div>
                      </div>
                    </div>


                  </div>

                  {/* Backup Codes */}
                  <div className={`p-4 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Backup Codes
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Generate backup codes for account recovery
                        </p>
                      </div>
                      <button
                        onClick={() => setBackupCodes(!backupCodes)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          backupCodes
                            ? (darkMode ? 'bg-blue-500' : 'bg-[#00001a]')
                            : (darkMode ? 'bg-white/20' : 'bg-gray-300')
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            backupCodes ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}



        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                darkMode ? 'bg-black/50' : 'bg-black/30'
              }`}
              onClick={closeModal}
            />

            {/* Modal Content */}
            <div className={`
              relative w-full max-w-lg backdrop-blur-xl border rounded-lg shadow-xl
              transform transition-all duration-300 scale-100 opacity-100
              ${darkMode
                ? 'bg-[#00001a]/90 border-white/20'
                : 'bg-white/90 border-gray-200'
              }
            `}>
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {showModal === 'privacy' && 'Privacy Disclaimer'}
                  {showModal === 'subscription' && 'Subscription Policy'}
                  {showModal === 'report' && 'Report Policy'}
                  {showModal === 'referral' && 'Referral Policy'}
                  {showModal === 'payment' && 'Payment Policy'}
                  {showModal === 'mfa' && 'Setup Multi-Factor Authentication'}
                  {showModal === 'chat' && 'Help Desk Chat'}
                  {showModal === 'payment-support' && 'Payment Support'}
                  {showModal === 'faq' && 'Frequently Asked Questions'}
                  {showModal === 'chat-support' && 'Chat Support'}
                  {showModal === 'delete-chat' && 'Delete Chat History'}
                  {showModal === 'refund' && 'Refund Information'}
                  {showModal === 'policies-support' && 'Policies & Terms'}
                </h3>
                <button
                  onClick={closeModal}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    darkMode
                      ? 'hover:bg-white/10 text-white/70'
                      : 'hover:bg-gray-100 text-gray-500'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {showModal === 'privacy' && (
                  <div className="space-y-4">
                    <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      Your privacy is important to us. This platform ensures:
                    </p>
                    <ul className={`space-y-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      <li>• Complete anonymity in all interactions</li>
                      <li>• No personal data sharing with third parties</li>
                      <li>• Encrypted communication channels</li>
                      <li>• Optional data analytics participation</li>
                      <li>• Right to delete your data at any time</li>
                    </ul>
                  </div>
                )}

                {showModal === 'chat' && (
                  <div className="space-y-4">
                    <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      Start a live chat with our support team for immediate assistance.
                    </p>
                    <div className={`p-4 rounded-lg border ${
                      darkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        Chat feature will be available soon. For immediate support, please email us at support@synapmentor.com
                      </p>
                    </div>
                  </div>
                )}

                {showModal === 'payment-support' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Payment Issues */}
                      <div className={`p-6 rounded-lg border transition-all duration-300 ${
                        darkMode ? 'border-white/10 bg-white/5 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                      }`}>
                        <div className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center ${
                          darkMode ? 'bg-white/10' : 'bg-gray-100'
                        }`}>
                          <CreditCard className={`w-6 h-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`} />
                        </div>
                        <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Payment Issues
                        </h4>
                        <p className={`text-sm mb-4 ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                          Having trouble with payments, refunds, or billing?
                        </p>
                        <ul className={`text-sm space-y-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          <li>• Failed payment troubleshooting</li>
                          <li>• Refund status inquiries</li>
                          <li>• Billing discrepancies</li>
                          <li>• Payment method issues</li>
                        </ul>
                      </div>

                      {/* Refund Policies */}
                      <div className={`p-6 rounded-lg border transition-all duration-300 ${
                        darkMode ? 'border-white/10 bg-white/5 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                      }`}>
                        <div className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center ${
                          darkMode ? 'bg-white/10' : 'bg-gray-100'
                        }`}>
                          <FileText className={`w-6 h-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`} />
                        </div>
                        <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Refund Policies
                        </h4>
                        <p className={`text-sm mb-4 ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                          Understanding our refund and cancellation policies.
                        </p>
                        <ul className={`text-sm space-y-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          <li>• 24-hour cancellation policy</li>
                          <li>• Refund processing times</li>
                          <li>• Partial refund conditions</li>
                          <li>• Dispute resolution</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {showModal === 'faq' && (
                  <div className="space-y-4">
                    {/* FAQ Tabs */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <button className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/20 text-white'
                          : 'bg-[#00001a] text-white'
                      }`}>
                        F.A.Q
                      </button>
                      <button className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/10 text-white/70 hover:bg-white/20'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}>
                        Help Desk Chat
                      </button>
                      <button className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/10 text-white/70 hover:bg-white/20'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}>
                        Payment Queries
                      </button>
                      <button className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/10 text-white/70 hover:bg-white/20'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}>
                        Policies
                      </button>
                    </div>

                    <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Frequently Asked Questions
                    </h2>

                    {/* Search Bar */}
                    <div className="relative mb-6">
                      <input
                        type="text"
                        placeholder="Search FAQs..."
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-blue-400/50'
                            : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-400 focus:border-gray-400 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                        }`}
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <svg className={`w-4 h-4 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* FAQ Categories and Questions */}
                    <div className="space-y-4">
                      {/* General Category */}
                      <div className={`p-4 rounded-lg border transition-all duration-300 ${
                        darkMode ? 'border-white/10 bg-white/5 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                      }`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            darkMode ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'
                          }`}>
                            General
                          </span>
                        </div>
                        <details className={`${darkMode ? 'text-white/70' : 'text-gray-700'}`}>
                          <summary className="cursor-pointer font-medium mb-2">How do I book a session with a solver?</summary>
                          <p className="text-sm leading-relaxed">Navigate to the Sessions page and select an available time slot that matches your preferred solver and expertise area.</p>
                        </details>
                      </div>

                      {/* Payments Category */}
                      <div className={`p-4 rounded-lg border transition-all duration-300 ${
                        darkMode ? 'border-white/10 bg-white/5 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                      }`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            darkMode ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'
                          }`}>
                            Payments
                          </span>
                        </div>
                        <details className={`${darkMode ? 'text-white/70' : 'text-gray-700'}`}>
                          <summary className="cursor-pointer font-medium mb-2">What payment methods are accepted?</summary>
                          <p className="text-sm leading-relaxed">We accept all major credit cards, PayPal, and bank transfers for your convenience.</p>
                        </details>
                      </div>

                      {/* Sessions Category */}
                      <div className={`p-4 rounded-lg border transition-all duration-300 ${
                        darkMode ? 'border-white/10 bg-white/5 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                      }`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            darkMode ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'
                          }`}>
                            Sessions
                          </span>
                        </div>
                        <details className={`${darkMode ? 'text-white/70' : 'text-gray-700'}`}>
                          <summary className="cursor-pointer font-medium mb-2">Can I reschedule or cancel a booked session?</summary>
                          <p className="text-sm leading-relaxed">Yes, you can reschedule or cancel sessions up to 24 hours before the scheduled time through your dashboard.</p>
                        </details>
                      </div>

                      {/* Technical Category */}
                      <div className={`p-4 rounded-lg border transition-all duration-300 ${
                        darkMode ? 'border-white/10 bg-white/5 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                      }`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            darkMode ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'
                          }`}>
                            Technical
                          </span>
                        </div>
                        <details className={`${darkMode ? 'text-white/70' : 'text-gray-700'}`}>
                          <summary className="cursor-pointer font-medium mb-2">What do I need for video sessions?</summary>
                          <p className="text-sm leading-relaxed">You'll need a stable internet connection, a device with camera and microphone, and a quiet environment.</p>
                        </details>
                      </div>

                      {/* Account Category */}
                      <div className={`p-4 rounded-lg border transition-all duration-300 ${
                        darkMode ? 'border-white/10 bg-white/5 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                      }`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            darkMode ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'
                          }`}>
                            Account
                          </span>
                        </div>
                        <details className={`${darkMode ? 'text-white/70' : 'text-gray-700'}`}>
                          <summary className="cursor-pointer font-medium mb-2">How do I verify my account?</summary>
                          <p className="text-sm leading-relaxed">Account verification is done through email confirmation and optional phone verification for enhanced security.</p>
                        </details>
                      </div>
                    </div>
                  </div>
                )}

                {showModal === 'chat-support' && (
                  <div className="space-y-6">
                    <div>
                      <div className={`w-20 h-20 mb-4 rounded-full flex items-center justify-center ${
                        darkMode ? 'bg-white/10' : 'bg-gray-100'
                      }`}>
                        <MessageSquare className={`w-10 h-10 ${darkMode ? 'text-white/70' : 'text-gray-600'}`} />
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Live Chat Support
                      </h3>
                      <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Connect with our support team for real-time assistance.
                      </p>
                    </div>

                    <button className={`w-full px-6 py-3 rounded-lg font-medium ${
                      darkMode
                        ? 'bg-white/20 text-white'
                        : 'bg-[#00001a] text-white'
                    }`}>
                      Start Chat
                    </button>

                    <div className={`p-4 rounded-lg border ${
                      darkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Chat Features
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MessageCircle className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-gray-600'}`} />
                          <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            Real-time messaging
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HelpCircle className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-gray-600'}`} />
                          <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            Dedicated support agent
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-gray-600'}`} />
                          <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            Chat history saved
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/10">
                        <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Quick Actions
                        </h4>
                        <div className="space-y-2">
                          <button className={`w-full p-3 rounded-lg border text-left ${
                            darkMode ? 'border-white/10 bg-white/5 text-white/70' : 'border-gray-200 bg-gray-50 text-gray-600'
                          }`}>
                            I need help with my payments
                          </button>
                          <button className={`w-full p-3 rounded-lg border text-left ${
                            darkMode ? 'border-white/10 bg-white/5 text-white/70' : 'border-gray-200 bg-gray-50 text-gray-600'
                          }`}>
                            Technical support needed
                          </button>
                          <button className={`w-full p-3 rounded-lg border text-left ${
                            darkMode ? 'border-white/10 bg-white/5 text-white/70' : 'border-gray-200 bg-gray-50 text-gray-600'
                          }`}>
                            Account access issue
                          </button>
                          <button className={`w-full p-3 rounded-lg border text-left ${
                            darkMode ? 'border-white/10 bg-white/5 text-white/70' : 'border-gray-200 bg-gray-50 text-gray-600'
                          }`}>
                            Feature request
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {showModal === 'delete-chat' && (
                  <div className="space-y-4">
                    <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      Delete your chat history and conversations.
                    </p>
                    <div className={`p-4 rounded-lg border ${
                      darkMode ? 'border-red-500/20 bg-red-500/10' : 'border-red-200 bg-red-50'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className={`w-4 h-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                        <h4 className={`font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                          Warning
                        </h4>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                        This action cannot be undone. All your chat history will be permanently deleted.
                      </p>
                    </div>
                    <button
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      Delete All Chat History
                    </button>
                  </div>
                )}

                {showModal === 'refund' && (
                  <div className="space-y-4">
                    <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      Information about refunds and our refund policy.
                    </p>
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg border ${
                        darkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'
                      }`}>
                        <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Refund Policy
                        </h4>
                        <ul className={`text-sm space-y-1 ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                          <li>• Full refund within 24 hours of session cancellation</li>
                          <li>• 50% refund for cancellations 24-48 hours before</li>
                          <li>• No refund for cancellations less than 24 hours</li>
                          <li>• Technical issues: Full refund guaranteed</li>
                        </ul>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        For refund requests, contact support@synapmentor.com with your booking details.
                      </p>
                    </div>
                  </div>
                )}

                {showModal === 'policies-support' && (
                  <div className="space-y-4">
                    <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      Access our terms of service, privacy policy, and other important policies.
                    </p>
                    <div className="space-y-2">
                      <button className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                        darkMode
                          ? 'border-white/10 hover:border-white/20 hover:bg-white/5'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Terms of Service
                          </span>
                          <ExternalLink className={`w-4 h-4 ${darkMode ? 'text-white/60' : 'text-gray-400'}`} />
                        </div>
                      </button>
                      <button className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                        darkMode
                          ? 'border-white/10 hover:border-white/20 hover:bg-white/5'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Privacy Policy
                          </span>
                          <ExternalLink className={`w-4 h-4 ${darkMode ? 'text-white/60' : 'text-gray-400'}`} />
                        </div>
                      </button>
                      <button className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                        darkMode
                          ? 'border-white/10 hover:border-white/20 hover:bg-white/5'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Refund Policy
                          </span>
                          <ExternalLink className={`w-4 h-4 ${darkMode ? 'text-white/60' : 'text-gray-400'}`} />
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {showModal === 'mfa' && (
                  <div className="space-y-4">
                    {mfaStep === 1 && (
                      <div>
                        <p className={`mb-4 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                          Scan the QR code below with your authenticator app:
                        </p>
                        <div className={`w-32 h-32 mx-auto rounded-lg border-2 border-dashed flex items-center justify-center ${
                          darkMode ? 'border-white/20' : 'border-gray-300'
                        }`}>
                          <span className={`text-sm ${darkMode ? 'text-white/50' : 'text-gray-400'}`}>
                            QR Code
                          </span>
                        </div>
                      </div>
                    )}

                    {mfaStep === 2 && (
                      <div>
                        <p className={`mb-4 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                          Enter the 6-digit code from your authenticator app:
                        </p>
                        <input
                          type="text"
                          value={mfaCode}
                          onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          placeholder="000000"
                          className={`w-full p-3 rounded-lg border text-center text-lg font-mono tracking-widest ${
                            darkMode
                              ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                              : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                )}

                {['subscription', 'report', 'referral', 'payment'].includes(showModal) && (
                  <div className="space-y-4">
                    <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      {showModal === 'subscription' && 'Our subscription terms ensure transparent billing and easy cancellation options.'}
                      {showModal === 'report' && 'Report any issues or inappropriate content through our secure reporting system.'}
                      {showModal === 'referral' && 'Earn rewards by referring friends to our platform with our fair referral program.'}
                      {showModal === 'payment' && 'Secure payment processing with full refund protection and transparent pricing.'}
                    </p>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        For detailed terms and conditions, please visit our legal documentation.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 p-6 border-t border-white/10">
                {showModal === 'mfa' && (
                  <>
                    <button
                      onClick={closeModal}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/10 text-white/70 hover:bg-white/20'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleMfaSetup}
                      disabled={mfaStep === 2 && mfaCode.length !== 6}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        mfaStep === 2 && mfaCode.length !== 6
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      } ${
                        darkMode
                          ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                          : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                      }`}
                    >
                      {mfaStep === 1 ? 'Next' : 'Verify & Enable'}
                    </button>
                  </>
                )}
                {showModal !== 'mfa' && (
                  <button
                    onClick={closeModal}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                        : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                    }`}
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SeekerSettings

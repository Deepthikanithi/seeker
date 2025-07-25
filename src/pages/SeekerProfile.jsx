import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import {
  User,
  Mail,
  Camera,
  Shield,
  Key,
  Trash2,
  Edit,
  Save,
  X,
  AlertTriangle
} from 'lucide-react'

const SeekerProfile = ({ darkMode }) => {
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [profileCompletion] = useState(75)

  // Pseudo name generation
  const pseudoNamePrefixes = ['Code', 'Pixel', 'Data', 'Cloud', 'Cyber', 'Tech', 'Digital', 'Quantum', 'Neural', 'Logic']
  const pseudoNameSuffixes = ['Ninja', 'Master', 'Wizard', 'Surfer', 'Sage', 'Hunter', 'Walker', 'Rider', 'Seeker', 'Explorer']

  const generateRandomPseudoName = () => {
    const prefix = pseudoNamePrefixes[Math.floor(Math.random() * pseudoNamePrefixes.length)]
    const suffix = pseudoNameSuffixes[Math.floor(Math.random() * pseudoNameSuffixes.length)]
    const number = Math.floor(Math.random() * 99) + 1
    return `${prefix}${suffix}${number}`
  }



  // Modal states
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPseudoNameModal, setShowPseudoNameModal] = useState(false)

  // Pseudo name state
  const [pseudoName, setPseudoName] = useState('')
  const [isPseudoNameSet, setIsPseudoNameSet] = useState(false)


  // Change email/mobile states
  const [changeEmailStep, setChangeEmailStep] = useState('method') // 'method', 'verify', 'complete'
  const [verificationMethod, setVerificationMethod] = useState('') // 'otp', 'magic-link'
  const [newEmail, setNewEmail] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [otpCountdown, setOtpCountdown] = useState(0)

  // Change password states
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Profile picture states
  const [showProfilePicModal, setShowProfilePicModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Editable profile data states
  const [editableData, setEditableData] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    city: 'San Francisco',
    gender: 'Female',
    dateOfBirth: '1990-05-15',
    bio: 'Passionate about technology and continuous learning. Always looking for new challenges and opportunities to grow.'
  })

  // Track if there are unsaved changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Handle profile picture upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
        return
      }

      setSelectedImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)

      setShowProfilePicModal(true)
    }
  }

  // Handle input changes for editable fields
  const handleInputChange = (field, value) => {
    setEditableData(prev => ({
      ...prev,
      [field]: value
    }))
    setHasUnsavedChanges(true)
  }

  // Handle save changes
  const handleSaveChanges = () => {
    // Here you would typically send the data to your backend
    console.log('Saving profile changes:', editableData)

    // Simulate API call
    setTimeout(() => {
      setHasUnsavedChanges(false)
      setIsEditing(false)
      // You could show a success message here
      alert('Profile updated successfully!')
    }, 500)
  }

  // Handle cancel editing
  const handleCancelEdit = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        // Reset to original data (you'd typically fetch from server)
        setEditableData({
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com',
          phone: '+1 (555) 123-4567',
          country: 'United States',
          city: 'San Francisco',
          gender: 'Female',
          dateOfBirth: '1990-05-15',
          bio: 'Passionate about technology and continuous learning. Always looking for new challenges and opportunities to grow.'
        })
        setHasUnsavedChanges(false)
        setIsEditing(false)
      }
    } else {
      setIsEditing(false)
    }
  }

  // Format countdown time for OTP
  const formatCountdown = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  // Countdown effect for OTP timers
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (otpCountdown > 0) {
        setOtpCountdown(prev => prev - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [otpCountdown])



  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-gray-50'
    }`}>
      <div className="p-6 space-y-6">
        
        {/* Profile Header */}
        <div className={`group p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
            : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Profile
            </h2>
            <div className="flex items-center gap-3">
              {isEditing && hasUnsavedChanges && (
                <button
                  onClick={handleSaveChanges}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] text-white border border-white/20 hover:bg-[#00001a]/90 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                      : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90 hover:shadow-[0_0_15px_rgba(0,0,26,0.2)]'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              )}
              <button
                onClick={isEditing ? handleCancelEdit : () => setIsEditing(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isEditing
                    ? (darkMode ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]')
                    : (darkMode ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-[#00001a]/10 text-[#00001a] border border-[#00001a]/20 hover:bg-[#00001a]/20 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]')
                }`}
              >
                {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Profile Completion Meter */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Profile Completion
              </span>
              <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {profileCompletion}%
              </span>
            </div>
            <div className="relative">
              {/* Background track */}
              <div className={`w-full h-3 rounded-lg ${darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'}`} />

              {/* Filled track */}
              <div
                className={`absolute top-0 left-0 h-3 rounded-lg transition-all duration-700 ${
                  darkMode ? 'bg-white/60' : 'bg-[#00001a]'
                }`}
                style={{ width: `${profileCompletion}%` }}
              />

              {/* Completion indicator */}
              <div
                className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-700 ${
                  darkMode
                    ? 'bg-white border-white shadow-lg'
                    : 'bg-[#00001a] border-[#00001a] shadow-lg'
                }`}
                style={{ left: `calc(${profileCompletion}% - 8px)` }}
              />
            </div>

            {/* Completion status */}
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                {profileCompletion < 50 ? 'Getting Started' : profileCompletion < 80 ? 'Almost There' : 'Profile Complete'}
              </span>
              <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                {profileCompletion < 100 ? `${100 - profileCompletion}% remaining` : 'Complete!'}
              </span>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center overflow-hidden ${
                darkMode ? 'bg-white/10' : 'bg-gray-100 border border-gray-200'
              }`}>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className={`w-12 h-12 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="profile-pic-upload"
              />
              <label
                htmlFor="profile-pic-upload"
                className={`absolute -bottom-1 -right-1 p-2 rounded-full border-2 transition-all duration-300 cursor-pointer shadow-lg ${
                  darkMode
                    ? 'bg-[#00001a] border-white/20 text-white hover:bg-[#00001a]/90 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'bg-white border-gray-200 text-[#00001a] hover:bg-gray-50 hover:shadow-[0_-2px_4px_rgba(0,0,26,0.15)]'
                }`}
              >
                <Camera className="w-4 h-4" />
              </label>
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {editableData.firstName} {editableData.lastName}
              </h3>
              <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Premium Seeker
              </p>
              <button
                onClick={() => setShowProfilePicModal(true)}
                className={`text-sm mt-1 transition-all duration-300 ${
                  darkMode ? 'text-white/60 hover:text-white hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'text-gray-500 hover:text-[#00001a] hover:drop-shadow-[0_0_8px_rgba(0,0,26,0.3)]'
                }`}
              >
                Change Profile Picture
              </button>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Personal Information */}
          <div className={`group p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
              : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Personal Information
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editableData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white disabled:opacity-50 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:border-blue-400/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-white border-gray-200 text-[#00001a] disabled:bg-gray-50 hover:border-gray-300 hover:shadow-[0_2px_4px_rgba(0,0,26,0.1)] focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editableData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white disabled:opacity-50 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:border-blue-400/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-white border-gray-200 text-[#00001a] disabled:bg-gray-50 hover:border-gray-300 hover:shadow-[0_2px_4px_rgba(0,0,26,0.1)] focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Email
                </label>
                <input
                  type="email"
                  value={editableData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/5 border-white/20 text-white disabled:opacity-50 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:border-blue-400/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-white border-gray-200 text-[#00001a] disabled:bg-gray-50 hover:border-gray-300 hover:shadow-[0_2px_4px_rgba(0,0,26,0.1)] focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editableData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/5 border-white/20 text-white disabled:opacity-50 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:border-blue-400/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-white border-gray-200 text-[#00001a] disabled:bg-gray-50 hover:border-gray-300 hover:shadow-[0_2px_4px_rgba(0,0,26,0.1)] focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Country
                  </label>
                  <input
                    type="text"
                    value={editableData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white disabled:opacity-50 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:border-blue-400/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-white border-gray-200 text-[#00001a] disabled:bg-gray-50 hover:border-gray-300 hover:shadow-[0_2px_4px_rgba(0,0,26,0.1)] focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    City
                  </label>
                  <input
                    type="text"
                    value={editableData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white disabled:opacity-50 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:border-blue-400/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-white border-gray-200 text-[#00001a] disabled:bg-gray-50 hover:border-gray-300 hover:shadow-[0_2px_4px_rgba(0,0,26,0.1)] focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Gender
                  </label>
                  <select
                    value={editableData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white disabled:opacity-50 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:border-blue-400/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-white border-gray-200 text-[#00001a] disabled:bg-gray-50 hover:border-gray-300 hover:shadow-[0_2px_4px_rgba(0,0,26,0.1)] focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={editableData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white disabled:opacity-50 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:border-blue-400/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-white border-gray-200 text-[#00001a] disabled:bg-gray-50 hover:border-gray-300 hover:shadow-[0_2px_4px_rgba(0,0,26,0.1)] focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Bio
                </label>
                <textarea
                  value={editableData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/5 border-white/20 text-white disabled:opacity-50 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:border-blue-400/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-white border-gray-200 text-[#00001a] disabled:bg-gray-50 hover:border-gray-300 hover:shadow-[0_2px_4px_rgba(0,0,26,0.1)] focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                  }`}
                />
              </div>
            </div>
          </div>


          {/* Right Column */}
          <div className="space-y-6">

            {/* Anonymous Identity */}
            <div className={`group p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
              darkMode
                ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}>
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Anonymous Identity
              </h3>

              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'
                }`}>
                  <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Set a pseudo name for anonymous community interactions. This helps maintain your privacy while participating in discussions.
                  </p>
                  {isPseudoNameSet && (
                    <div className={`mt-3 p-3 rounded-lg ${
                      darkMode ? 'bg-red-500/10 border border-red-500/30' : 'bg-red-50 border border-red-200'
                    }`}>
                      <p className={`text-sm font-medium ${darkMode ? 'text-red-400' : 'text-red-800'}`}>
                        ⚠️ Important: Once set, your pseudo name cannot be changed. Choose carefully!
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      Your Pseudo Name
                    </label>
                    <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {pseudoName || 'Not set'}
                    </span>
                    {pseudoName && (
                      <div className={`text-xs mt-1 px-2 py-1 rounded-lg inline-block ${
                        darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
                      }`}>
                        Anonymous Identity Active
                      </div>
                    )}
                  </div>
                  {!isPseudoNameSet && (
                    <button
                      onClick={() => setShowPseudoNameModal(true)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                          : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 border border-[#00001a]'
                      }`}
                    >
                      {pseudoName ? 'Change Name' : 'Set Pseudo Name'}
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Security Settings */}
            <div className={`group p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
              darkMode
                ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
            }`}>
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Security Settings
              </h3>
              
              <div className="space-y-4">
                <button
                  onClick={() => setShowChangeEmailModal(true)}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                    darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white' : 'bg-[#00001a]/5 border-[#00001a]/20 hover:bg-[#00001a]/10 text-[#00001a] hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                  <span>Change Email</span>
                </button>

                <button
                  onClick={() => setShowChangePasswordModal(true)}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                    darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white' : 'bg-[#00001a]/5 border-[#00001a]/20 hover:bg-[#00001a]/10 text-[#00001a] hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}
                >
                  <Key className="w-5 h-5" />
                  <span>Change Password</span>
                </button>
              </div>
            </div>



            {/* Danger Zone */}
            <div className={`group p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
              darkMode
                ? 'rounded-lg bg-red-500/10 border-red-500/30 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]'
                : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-red-400' : 'text-[#00001a]'}`}>
                Danger Zone
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowDeactivateModal(true)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                      : 'bg-[#00001a]/5 border-[#00001a]/20 hover:bg-[#00001a]/10 text-[#00001a] hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <div className="text-left">
                    <div>Deactivate Account</div>
                    <div className="text-xs opacity-70">Temporarily disable your account</div>
                  </div>
                </button>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                      : 'bg-[#00001a]/5 border-[#00001a]/20 hover:bg-[#00001a]/10 text-[#00001a] hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}
                >
                  <Trash2 className="w-5 h-5" />
                  <div className="text-left">
                    <div>Delete Account</div>
                    <div className="text-xs opacity-70">Permanently remove your account</div>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                darkMode
                  ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
              }`}
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                darkMode ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-green-100 text-green-800 border border-green-300 hover:bg-green-200 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
              }`}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}

        {/* Change Email Modal */}
        {showChangeEmailModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-md w-full rounded-lg ${
              darkMode ? 'bg-[#00001a] border border-white/20' : 'bg-white border border-gray-200'
            }`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Change Email Address
                  </h3>
                  <button
                    onClick={() => {
                      setShowChangeEmailModal(false)
                      setChangeEmailStep('method')
                      setNewEmail('')
                      setOtpCode('')
                    }}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      darkMode ? 'hover:bg-white/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'hover:bg-gray-100 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                    }`}
                  >
                    <X className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-gray-500'}`} />
                  </button>
                </div>

                {changeEmailStep === 'method' && (
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        New Email Address
                      </label>
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Enter new email address"
                        className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                            : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Verification Method
                      </label>
                      <div className="space-y-2">
                        <button
                          onClick={() => setVerificationMethod('otp')}
                          className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                            verificationMethod === 'otp'
                              ? (darkMode ? 'bg-white/10 border-white/30 text-white' : 'bg-[#00001a]/10 border-[#00001a]/30 text-[#00001a]')
                              : (darkMode ? 'bg-white/5 border-white/10 text-white/70 hover:bg-white/8 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]')
                          }`}
                        >
                          <div className="font-medium">SMS/Email OTP</div>
                          <div className="text-sm opacity-70">Receive a verification code</div>
                        </button>
                        <button
                          onClick={() => setVerificationMethod('magic-link')}
                          className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                            verificationMethod === 'magic-link'
                              ? (darkMode ? 'bg-white/10 border-white/30 text-white' : 'bg-[#00001a]/10 border-[#00001a]/30 text-[#00001a]')
                              : (darkMode ? 'bg-white/5 border-white/10 text-white/70 hover:bg-white/8 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]')
                          }`}
                        >
                          <div className="font-medium">Magic Link</div>
                          <div className="text-sm opacity-70">Click a link sent to your email</div>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (newEmail && verificationMethod) {
                          setChangeEmailStep('verify')
                          if (verificationMethod === 'otp') {
                            setOtpCountdown(300) // 5 minutes
                          }
                        }
                      }}
                      disabled={!newEmail || !verificationMethod}
                      className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                        !newEmail || !verificationMethod
                          ? (darkMode ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                          : (darkMode ? 'bg-white/20 text-white hover:bg-white/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]')
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                )}

                {changeEmailStep === 'verify' && verificationMethod === 'otp' && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        We've sent a verification code to
                      </div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {newEmail}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Verification Code
                      </label>
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        className={`w-full px-3 py-2 rounded-lg border text-center text-lg tracking-widest transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                            : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-400'
                        }`}
                      />
                    </div>

                    {otpCountdown > 0 && (
                      <div className={`text-center text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        Code expires in {formatCountdown(otpCountdown)}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => setChangeEmailStep('method')}
                        className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                          darkMode ? 'bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                        }`}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => {
                          if (otpCode.length === 6) {
                            setChangeEmailStep('complete')
                          }
                        }}
                        disabled={otpCode.length !== 6}
                        className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                          otpCode.length !== 6
                            ? (darkMode ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (darkMode ? 'bg-white/20 text-white hover:bg-white/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]')
                        }`}
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                )}

                {changeEmailStep === 'verify' && verificationMethod === 'magic-link' && (
                  <div className="space-y-4 text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-white/10' : 'bg-gray-100'
                    }`}>
                      <Mail className={`w-8 h-8 ${darkMode ? 'text-white/70' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <div className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Check Your Email
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        We've sent a magic link to <strong>{newEmail}</strong>
                      </div>
                      <div className={`text-sm mt-2 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        Click the link in your email to verify your new address
                      </div>
                    </div>
                    <button
                      onClick={() => setChangeEmailStep('method')}
                      className={`py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                        darkMode ? 'bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                      }`}
                    >
                      Back
                    </button>
                  </div>
                )}

                {changeEmailStep === 'complete' && (
                  <div className="space-y-4 text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-white/20' : 'bg-[#00001a]/10'
                    }`}>
                      <Mail className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                    </div>
                    <div>
                      <div className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Email Changed Successfully
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Your email address has been updated to <strong>{newEmail}</strong>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowChangeEmailModal(false)
                        setChangeEmailStep('method')
                        setNewEmail('')
                        setOtpCode('')
                      }}
                      className={`py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                        darkMode ? 'bg-white/20 text-white hover:bg-white/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                      }`}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}



        {/* Change Password Modal - Simple Card */}
        {showChangePasswordModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-md w-full rounded-lg shadow-2xl ${
              darkMode ? 'bg-[#00001a] border border-white/20' : 'bg-white border border-gray-200'
            }`}>
              {/* Card Header */}
              <div className={`p-6 border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Change Password
                  </h3>
                  <button
                    onClick={() => {
                      setShowChangePasswordModal(false)
                      setCurrentPassword('')
                      setNewPassword('')
                      setConfirmPassword('')
                    }}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      darkMode ? 'hover:bg-white/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'hover:bg-gray-100 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                    }`}
                  >
                    <X className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-gray-500'}`} />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/10 text-white placeholder-white/50 focus:border-white/30'
                        : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-400 focus:border-[#00001a]/50'
                    }`}
                    placeholder="Enter your current password"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/10 text-white placeholder-white/50 focus:border-white/30'
                        : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-400 focus:border-[#00001a]/50'
                    }`}
                    placeholder="Enter your new password"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/10 text-white placeholder-white/50 focus:border-white/30'
                        : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-400 focus:border-[#00001a]/50'
                    }`}
                    placeholder="Confirm your new password"
                  />
                </div>

                {newPassword && confirmPassword && newPassword !== confirmPassword && (
                  <div className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                    Passwords do not match
                  </div>
                )}

                <button
                  onClick={() => {
                    if (currentPassword && newPassword && confirmPassword && newPassword === confirmPassword) {
                      // Simulate password change success
                      alert('Password changed successfully!')
                      setShowChangePasswordModal(false)
                      setCurrentPassword('')
                      setNewPassword('')
                      setConfirmPassword('')
                    }
                  }}
                  disabled={!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                    (!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword)
                      ? (darkMode ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                      : (darkMode ? 'bg-white/20 text-white hover:bg-white/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]')
                  }`}
                >
                  Change Password
                </button>
              </div>
              </div>
            </div>
          </div>
        )}

        {/* Deactivate Account Modal */}
        {showDeactivateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-md w-full rounded-lg ${
              darkMode ? 'bg-[#00001a] border border-red-500/30' : 'bg-white border border-gray-200'
            }`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-red-400' : 'text-[#00001a]'}`}>
                    Deactivate Account
                  </h3>
                  <button
                    onClick={() => setShowDeactivateModal(false)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      darkMode ? 'hover:bg-white/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'hover:bg-gray-100 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                    }`}
                  >
                    <X className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-gray-500'}`} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-red-500/10 border-red-500/30' : 'bg-[#00001a]/5 border-[#00001a]/20'
                  }`}>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`w-5 h-5 mt-0.5 ${darkMode ? 'text-red-400' : 'text-[#00001a]'}`} />
                      <div>
                        <div className={`text-sm font-medium ${darkMode ? 'text-red-400' : 'text-[#00001a]'}`}>
                          Account Deactivation
                        </div>
                        <div className={`text-xs mt-1 ${darkMode ? 'text-red-400/80' : 'text-[#00001a]/70'}`}>
                          Your account will be temporarily disabled. You can reactivate it anytime by logging in.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      What happens when you deactivate:
                    </div>
                    <ul className={`text-sm space-y-1 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                      <li>• Your profile will be hidden from other users</li>
                      <li>• Active sessions will be cancelled</li>
                      <li>• You won't receive notifications</li>
                      <li>• Your data will be preserved</li>
                    </ul>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      Type "DEACTIVATE" to confirm
                    </label>
                    <input
                      type="text"
                      placeholder="DEACTIVATE"
                      className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                          : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-400'
                      }`}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setShowDeactivateModal(false)}
                      className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                        darkMode ? 'bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                      }`}
                    >
                      Cancel
                    </button>
                    <button className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                      darkMode ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                    }`}>
                      Deactivate Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-md w-full rounded-lg ${
              darkMode ? 'bg-[#00001a] border border-red-500/30' : 'bg-white border border-gray-200'
            }`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-red-400' : 'text-[#00001a]'}`}>
                    Delete Account
                  </h3>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      darkMode ? 'hover:bg-white/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'hover:bg-gray-100 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                    }`}
                  >
                    <X className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-gray-500'}`} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-red-500/10 border-red-500/30' : 'bg-[#00001a]/5 border-[#00001a]/20'
                  }`}>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`w-5 h-5 mt-0.5 ${darkMode ? 'text-red-400' : 'text-[#00001a]'}`} />
                      <div>
                        <div className={`text-sm font-medium ${darkMode ? 'text-red-400' : 'text-[#00001a]'}`}>
                          Permanent Account Deletion
                        </div>
                        <div className={`text-xs mt-1 ${darkMode ? 'text-red-400/80' : 'text-[#00001a]/70'}`}>
                          This action cannot be undone. All your data will be permanently removed.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      What will be permanently deleted:
                    </div>
                    <ul className={`text-sm space-y-1 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                      <li>• Your profile and personal information</li>
                      <li>• All session history and messages</li>
                      <li>• Payment history and subscriptions</li>
                      <li>• Files and documents uploaded</li>
                      <li>• All account preferences and settings</li>
                    </ul>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      Type "DELETE MY ACCOUNT" to confirm
                    </label>
                    <input
                      type="text"
                      placeholder="DELETE MY ACCOUNT"
                      className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                          : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      Enter your password to confirm
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                          : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-400'
                      }`}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                        darkMode ? 'bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                      }`}
                    >
                      Cancel
                    </button>
                    <button className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                      darkMode ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                    }`}>
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Picture Modal */}
        {showProfilePicModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-md w-full rounded-lg ${
              darkMode ? 'bg-[#00001a] border border-white/20' : 'bg-white border border-gray-200'
            }`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Update Profile Picture
                  </h3>
                  <button
                    onClick={() => {
                      setShowProfilePicModal(false)
                      setSelectedImage(null)
                      setImagePreview(null)
                    }}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      darkMode ? 'hover:bg-white/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'hover:bg-gray-100 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                    }`}
                  >
                    <X className={`w-5 h-5 ${darkMode ? 'text-white/70' : 'text-gray-500'}`} />
                  </button>
                </div>

                <div className="space-y-4">
                  {imagePreview ? (
                    <div className="text-center">
                      <div className={`w-32 h-32 mx-auto rounded-full overflow-hidden ${
                        darkMode ? 'bg-white/10' : 'bg-gray-100'
                      }`}>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className={`text-sm mt-3 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Preview of your new profile picture
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center border-2 border-dashed ${
                        darkMode ? 'bg-white/5 border-white/20' : 'bg-gray-50 border-gray-300'
                      }`}>
                        <Camera className={`w-8 h-8 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                      </div>
                      <p className={`text-sm mt-3 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        No image selected
                      </p>
                    </div>
                  )}

                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="modal-pic-upload"
                    />
                    <label
                      htmlFor="modal-pic-upload"
                      className={`w-full py-3 rounded-lg border-2 border-dashed text-center cursor-pointer transition-all duration-300 block ${
                        darkMode
                          ? 'border-white/20 text-white/70 hover:border-white/30 hover:bg-white/5'
                          : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <Camera className={`w-5 h-5 mx-auto mb-2 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">
                        {imagePreview ? 'Choose Different Image' : 'Choose Image'}
                      </span>
                      <div className={`text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-gray-400'}`}>
                        PNG, JPG up to 5MB
                      </div>
                    </label>
                  </div>

                  {imagePreview && (
                    <div className={`p-3 rounded-lg border ${
                      darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Image Guidelines:
                      </div>
                      <ul className={`text-xs mt-1 space-y-1 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        <li>• Use a clear, recent photo of yourself</li>
                        <li>• Square images work best (1:1 ratio)</li>
                        <li>• Avoid group photos or logos</li>
                        <li>• Keep it professional and appropriate</li>
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        setShowProfilePicModal(false)
                        setSelectedImage(null)
                        setImagePreview(null)
                      }}
                      className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                        darkMode ? 'bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={!imagePreview}
                      onClick={() => {
                        if (imagePreview) {
                          // Here you would typically upload the image to your server
                          console.log('Saving profile picture:', selectedImage)
                          setShowProfilePicModal(false)
                          // The imagePreview will remain set to show the new picture
                        }
                      }}
                      className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                        !imagePreview
                          ? (darkMode ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                          : (darkMode ? 'bg-white/20 text-white hover:bg-white/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]')
                      }`}
                    >
                      Save Picture
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pseudo Name Modal */}
        {showPseudoNameModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-md w-full rounded-lg border ${
              darkMode ? 'bg-[#00001a] border-white/20' : 'bg-white border-gray-200'
            }`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Set Your Pseudo Name
                  </h3>
                  <button
                    onClick={() => {
                      setShowPseudoNameModal(false)
                      setPseudoName(pseudoName) // Reset to current value
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-[#00001a] hover:bg-gray-100'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className={`p-4 rounded-lg mb-6 ${
                  darkMode ? 'bg-red-500/10 border border-red-500/30' : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-red-400' : 'text-red-800'}`}>
                    ⚠️ Important: Once you confirm your pseudo name, it cannot be changed. Choose carefully!
                  </p>
                </div>

                <div className={`p-4 rounded-lg mb-6 ${
                  darkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'
                }`}>
                  <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Choose a pseudo name to maintain your anonymity in the community. This name will be visible to other members instead of your real name.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Custom Pseudo Name
                    </label>
                    <input
                      type="text"
                      value={pseudoName}
                      onChange={(e) => setPseudoName(e.target.value)}
                      placeholder="Enter your preferred pseudo name"
                      maxLength={20}
                      className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                          : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500'
                      }`}
                    />
                    <p className={`text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                      {pseudoName.length}/20 characters
                    </p>
                  </div>

                  <div className="text-center">
                    <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      Or generate a random name
                    </span>
                  </div>

                  <button
                    onClick={() => setPseudoName(generateRandomPseudoName())}
                    className={`w-full px-4 py-2 rounded-lg font-medium border transition-all duration-300 ${
                      darkMode
                        ? 'border-white/20 text-white hover:bg-white/10'
                        : 'border-gray-300 text-[#00001a] hover:bg-gray-50'
                    }`}
                  >
                    🎲 Generate Random Name
                  </button>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        setShowPseudoNameModal(false)
                        setPseudoName('') // Reset if cancelled
                      }}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/10 text-white hover:bg-white/20'
                          : 'bg-gray-100 text-[#00001a] hover:bg-gray-200'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (pseudoName.trim()) {
                          setShowPseudoNameModal(false)
                          setIsPseudoNameSet(true)
                          alert(`Pseudo name set to "${pseudoName}"! This cannot be changed.`)
                        } else {
                          alert('Please enter a pseudo name')
                        }
                      }}
                      disabled={!pseudoName.trim()}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        !pseudoName.trim()
                          ? (darkMode ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                          : (darkMode ? 'bg-[#00001a] text-white hover:bg-gray-800' : 'bg-[#00001a] text-white hover:bg-gray-800')
                      }`}
                    >
                      Confirm & Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default SeekerProfile

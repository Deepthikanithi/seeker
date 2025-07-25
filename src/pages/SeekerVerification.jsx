import React, { useState } from 'react'
import {
  Shield,
  CheckCircle,
  Mail,
  Phone,
  Upload,
  Camera,
  Lock,
  Star,
  ArrowRight,
  AlertCircle,
  FileText,
  Smartphone
} from 'lucide-react'

const SeekerVerification = ({ darkMode }) => {
  const [currentVerificationLevel, setCurrentVerificationLevel] = useState('none') // 'none', 'light', 'standard', 'full'
  const [activeStep, setActiveStep] = useState(1)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    emailCode: '',
    phoneCode: '',
    idFile: null,
    faceVerified: false
  })
  const [isUploading, setIsUploading] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState('')

  // Mock verification status
  const verificationStatus = {
    light: currentVerificationLevel === 'light' || currentVerificationLevel === 'standard' || currentVerificationLevel === 'full',
    standard: currentVerificationLevel === 'standard' || currentVerificationLevel === 'full',
    full: currentVerificationLevel === 'full'
  }

  const verificationLevels = [
    {
      id: 'light',
      title: 'Light Verification',
      subtitle: 'Email and phone verification only',
      icon: Mail,
      features: [
        'Basic account access',
        'Limited transaction amounts',
        'Quick setup process',
        'Email & SMS verification'
      ],
      unlocked: true,
      completed: verificationStatus.light,
      color: 'blue'
    },
    {
      id: 'standard',
      title: 'Standard Verification',
      subtitle: 'Upload government-issued ID',
      icon: FileText,
      features: [
        'Higher transaction limits',
        'Access to premium features',
        'Enhanced security',
        'Government ID verification'
      ],
      unlocked: verificationStatus.light,
      completed: verificationStatus.standard,
      color: 'green'
    },
    {
      id: 'full',
      title: 'Full Verification',
      subtitle: 'ID plus dynamic facial authentication',
      icon: Camera,
      features: [
        'Unlimited transactions',
        'All platform features',
        'Maximum security level',
        'Biometric verification'
      ],
      unlocked: verificationStatus.standard,
      completed: verificationStatus.full,
      color: 'purple'
    }
  ]

  const getStepsForLevel = (level) => {
    const baseSteps = [
      { id: 1, title: 'Welcome', subtitle: 'Basic information', completed: false },
      { id: 2, title: '', subtitle: '', completed: false },
      { id: 3, title: '', subtitle: '', completed: false },
      { id: 4, title: 'Complete', subtitle: 'Verification complete', completed: false }
    ]

    switch (level) {
      case 'light':
        baseSteps[1] = { id: 2, title: 'Email Verify', subtitle: 'Email verification', completed: false }
        baseSteps[2] = { id: 3, title: 'Phone Verify', subtitle: 'Phone verification', completed: false }
        break
      case 'standard':
        baseSteps[1] = { id: 2, title: 'ID Upload', subtitle: 'Document verification', completed: false }
        baseSteps[2] = { id: 3, title: 'Review', subtitle: 'Document review', completed: false }
        break
      case 'full':
        baseSteps[1] = { id: 2, title: 'ID Upload', subtitle: 'Document verification', completed: false }
        baseSteps[2] = { id: 3, title: 'Face Verify', subtitle: 'Biometric verification', completed: false }
        break
      default:
        return []
    }

    return baseSteps
  }

  const steps = selectedLevel ? getStepsForLevel(selectedLevel) : []

  const getCurrentStatusText = () => {
    if (currentVerificationLevel === 'full') return 'Full Verification'
    if (currentVerificationLevel === 'standard') return 'Standard Verification'
    if (currentVerificationLevel === 'light') return 'Light Verification'
    return 'Not Verified'
  }

  const handleStartVerification = (level) => {
    setSelectedLevel(level)
    setActiveStep(1)
  }

  const handleNextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleCompleteVerification = () => {
    setCurrentVerificationLevel(selectedLevel)
    setSelectedLevel(null)
    setActiveStep(1)
    // Reset form data
    setFormData({
      email: '',
      phone: '',
      emailCode: '',
      phoneCode: '',
      idFile: null,
      faceVerified: false
    })
    setUploadedFileName('')
    setIsCameraActive(false)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setIsUploading(true)
      setFormData({...formData, idFile: file})
      setUploadedFileName(file.name)

      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false)
      }, 2000)
    }
  }

  const handleStartCamera = async () => {
    try {
      setIsCameraActive(true)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      })

      // Simulate face verification process
      setTimeout(() => {
        setFormData({...formData, faceVerified: true})
        stream.getTracks().forEach(track => track.stop())
        setIsCameraActive(false)
      }, 5000)

    } catch (error) {
      console.error('Camera access denied:', error)
      alert('Camera access is required for face verification. Please allow camera access and try again.')
      setIsCameraActive(false)
    }
  }

  const canProceedToNextStep = () => {
    switch (selectedLevel) {
      case 'light':
        if (activeStep === 1) return formData.email && formData.phone
        if (activeStep === 2) return formData.emailCode
        if (activeStep === 3) return formData.phoneCode
        return true
      case 'standard':
        if (activeStep === 1) return true
        if (activeStep === 2) return formData.idFile
        if (activeStep === 3) return true // Review step
        return true
      case 'full':
        if (activeStep === 1) return true
        if (activeStep === 2) return formData.idFile
        if (activeStep === 3) return formData.faceVerified
        return true
      default:
        return true
    }
  }

  const renderVerificationForm = () => {
    if (!selectedLevel) return null

    switch (activeStep) {
      case 1:
        return (
          <div className={`group p-6 border transition-all duration-300 relative overflow-hidden mt-6 ${
            darkMode
              ? 'rounded-lg bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
              : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Welcome to {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} Verification
            </h3>
            <p className={`mb-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              We'll guide you through the verification process step by step. This helps us keep your account secure and unlock additional features.
            </p>

            {selectedLevel === 'light' && (
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400/50 focus:bg-white/15'
                        : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400/50 focus:bg-white/15'
                        : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setSelectedLevel(null)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-gray-200 text-[#00001a] hover:bg-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleNextStep}
                disabled={!canProceedToNextStep()}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  darkMode
                    ? 'bg-[#00001a] border border-blue-500 text-blue-400 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                    : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 shadow-[0_2px_4px_rgba(0,0,26,0.15)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.15)]'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className={`group p-6 border transition-all duration-300 relative overflow-hidden mt-6 ${
            darkMode
              ? 'rounded-lg bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
              : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              {selectedLevel === 'light' ? 'Email Verification' : 'ID Upload'}
            </h3>

            {selectedLevel === 'light' ? (
              <div>
                <p className={`mb-4 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  We've sent a verification code to {formData.email}. Please enter the code below.
                </p>
                <input
                  type="text"
                  value={formData.emailCode}
                  onChange={(e) => setFormData({...formData, emailCode: e.target.value})}
                  placeholder="Enter 6-digit verification code"
                  maxLength="6"
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400/50 focus:bg-white/15'
                      : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                  }`}
                />
                <p className={`text-xs mt-2 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                  Didn't receive the code? <button className={`${darkMode ? 'text-blue-400' : 'text-[#00001a]'} underline`}>Resend</button>
                </p>
              </div>
            ) : (
              <div>
                <p className={`mb-4 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Please upload a clear photo of your government-issued ID (passport, driver's license, or national ID).
                </p>

                {!uploadedFileName ? (
                  <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                    darkMode
                      ? 'border-gray-800 hover:border-blue-500 bg-[#00001a] hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50 hover:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                  }`}
                  onClick={() => document.getElementById('file-upload').click()}
                  >
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    {isUploading ? (
                      <div className="flex flex-col items-center">
                        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mb-4 ${
                          darkMode ? 'border-blue-400' : 'border-[#00001a]'
                        }`}></div>
                        <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                          Uploading...
                        </p>
                      </div>
                    ) : (
                      <>
                        <Upload className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                        <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'} mb-2`}>
                          Click to upload or drag and drop your ID
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          Supports: JPG, PNG, PDF (Max 10MB)
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className={`border rounded-lg p-4 ${
                    darkMode ? 'border-green-500 bg-[#00001a]' : 'border-gray-300 bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <CheckCircle className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`} />
                      <div className="flex-1">
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          File uploaded successfully
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          {uploadedFileName}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setFormData({...formData, idFile: null})
                          setUploadedFileName('')
                        }}
                        className={`text-sm ${darkMode ? 'text-blue-400' : 'text-[#00001a]'} underline`}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevStep}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-gray-200 text-[#00001a] hover:bg-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                disabled={!canProceedToNextStep()}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  darkMode
                    ? 'bg-[#00001a] border border-blue-500 text-blue-400 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                    : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className={`group p-4 sm:p-6 border transition-all duration-300 relative overflow-hidden mt-6 ${
            darkMode
              ? 'rounded-lg bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
              : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              {selectedLevel === 'light' ? 'Phone Verification' : selectedLevel === 'standard' ? 'Document Review' : 'Face Verification'}
            </h3>

            {selectedLevel === 'light' ? (
              <div>
                <p className={`mb-4 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  We've sent a verification code to {formData.phone}. Please enter the code below.
                </p>
                <input
                  type="text"
                  value={formData.phoneCode}
                  onChange={(e) => setFormData({...formData, phoneCode: e.target.value})}
                  placeholder="Enter 6-digit SMS code"
                  maxLength="6"
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400/50 focus:bg-white/15'
                      : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500 focus:border-[#00001a] focus:ring-1 focus:ring-[#00001a]'
                  }`}
                />
                <p className={`text-xs mt-2 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                  Didn't receive the code? <button className={`${darkMode ? 'text-blue-400' : 'text-[#00001a]'} underline`}>Resend</button>
                </p>
              </div>
            ) : selectedLevel === 'standard' ? (
              <div className="text-center">
                <FileText className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                <p className={`mb-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Our team is reviewing your submitted documents. This process typically takes 1-2 business days.
                </p>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#00001a] border border-yellow-500' : 'bg-yellow-50 border border-yellow-200'}`}>
                  <p className={`text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>
                    You will receive an email notification once the review is complete.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                {!isCameraActive && !formData.faceVerified ? (
                  <>
                    <Camera className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                    <p className={`mb-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      Position your face in the camera frame and follow the instructions for biometric verification.
                    </p>
                    <button
                      onClick={handleStartCamera}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-[#00001a] border border-blue-500 text-blue-400 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                          : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 shadow-[0_2px_4px_rgba(0,0,26,0.15)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.15)]'
                      }`}
                    >
                      Start Face Verification
                    </button>
                  </>
                ) : isCameraActive ? (
                  <div>
                    <div className={`w-64 h-48 mx-auto mb-4 rounded-lg border-2 border-dashed flex items-center justify-center ${
                      darkMode ? 'border-blue-500 bg-[#00001a]' : 'border-[#00001a] bg-gray-100'
                    }`}>
                      <div className="text-center">
                        <Camera className={`w-12 h-12 mx-auto mb-2 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                        <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                          Camera Active
                        </p>
                        <div className={`mt-2 animate-pulse w-4 h-4 rounded-full mx-auto ${
                          darkMode ? 'bg-red-400' : 'bg-red-500'
                        }`}></div>
                      </div>
                    </div>
                    <p className={`mb-4 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      Look directly at the camera and follow the on-screen instructions...
                    </p>
                    <div className={`flex items-center justify-center gap-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      <span className="text-sm">Verifying...</span>
                    </div>
                  </div>
                ) : (
                  <div className={`p-6 rounded-lg ${
                    darkMode ? 'bg-[#00001a] border border-green-500' : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`} />
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Face Verification Complete!
                    </p>
                    <p className={`text-sm mt-2 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                      Your biometric verification was successful.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevStep}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-gray-200 text-[#00001a] hover:bg-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                disabled={!canProceedToNextStep()}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  darkMode
                    ? 'bg-[#00001a] border border-blue-500 text-blue-400 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                    : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className={`group p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden mt-6 ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
              : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <div className="text-center">
              <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Verification Complete!
              </h3>
              <p className={`mb-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Your {selectedLevel} verification has been completed successfully. You now have access to additional features and higher security.
              </p>
              <button
                onClick={handleCompleteVerification}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#00001a] border border-blue-500 text-blue-400 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                    : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 shadow-[0_2px_4px_rgba(0,0,26,0.15)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.15)]'
                }`}
              >
                Complete Verification
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-gray-50'
    }`}>
      <div className="p-4 sm:p-6 space-y-10 sm:space-y-16 max-w-full overflow-x-hidden">
        <div className="w-full">

        {/* Header */}
        <div className={`group p-4 sm:p-6 lg:p-8 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
            : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${
              darkMode ? 'bg-blue-500/20' : 'bg-gray-100 border border-gray-200'
            }`}>
              <Shield className={`w-6 h-6 sm:w-8 sm:h-8 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Identity Verification
              </h1>
              <p className={`text-sm sm:text-base mt-1 break-words ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Choose your verification level based on your needs
              </p>
            </div>
          </div>

          {/* Current Status */}
          <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg max-w-full transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
          }`}>
            <CheckCircle className={`w-4 h-4 flex-shrink-0 ${
              currentVerificationLevel !== 'none'
                ? (darkMode ? 'text-green-400' : 'text-[#00001a]')
                : (darkMode ? 'text-white/50' : 'text-gray-400')
            }`} />
            <span className={`text-xs sm:text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Current Status: {getCurrentStatusText()}
            </span>
          </div>

          {/* Progress Steps - Integrated */}
          {selectedLevel && (
            <div className={`mt-8 p-6 rounded-lg transition-all duration-300 ${
              darkMode ? 'bg-[#00001a] border border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}>
              <div className="relative flex items-center justify-between">
                {/* Progress Line Background - Between circles only */}
                <div className={`absolute top-6 h-0.5 ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-300'
                }`}
                style={{
                  left: 'calc(1.5rem + 24px)',
                  right: 'calc(1.5rem + 24px)'
                }} />

                {/* Progress Line Fill - Between circles only */}
                <div
                  className={`absolute top-6 h-0.5 transition-all duration-500 ${
                    darkMode ? 'bg-blue-400' : 'bg-[#00001a]'
                  }`}
                  style={{
                    left: 'calc(1.5rem + 24px)',
                    width: `calc(${((activeStep - 1) / (steps.length - 1)) * 100}% - 48px)`
                  }}
                />

                {steps.map((step, index) => (
                  <div key={step.id} className="relative flex flex-col items-center z-10 min-w-0">
                    <div className={`w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base transition-all duration-300 ${
                      step.id <= activeStep
                        ? (darkMode ? 'bg-blue-500 text-white border-2 border-blue-400' : 'bg-[#00001a] text-white border-2 border-[#00001a] shadow-[0_2px_4px_rgba(0,0,26,0.15)]')
                        : (darkMode ? 'bg-gray-700 text-white border-2 border-gray-600' : 'bg-white text-gray-400 border-2 border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)]')
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div className="text-center mt-2 sm:mt-3 max-w-[80px] sm:max-w-none">
                      <div className={`text-xs sm:text-sm font-medium break-words leading-tight ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {step.title}
                      </div>
                      <div className={`text-xs break-words leading-tight ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        {step.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Verification Levels */}
        <div className="mt-8">
          <div className="mb-6"></div>
          <h2 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            Choose your verification level to get started
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 auto-rows-fr">
            {verificationLevels.map((level) => {
              const IconComponent = level.icon
              const isUnlocked = level.unlocked
              const isCompleted = level.completed

              return (
                <div
                  key={level.id}
                  className={`group p-3 sm:p-4 md:p-6 border transition-all duration-300 relative overflow-hidden cursor-pointer min-h-[280px] sm:min-h-[320px] md:min-h-[400px] flex flex-col w-full ${
                    !isUnlocked
                      ? (darkMode ? 'rounded-lg bg-[#00001a] border-gray-800 opacity-50' : 'rounded-lg bg-gray-50 border-gray-200 opacity-50')
                      : isCompleted
                      ? (darkMode ? 'rounded-lg bg-[#00001a] border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]')
                      : (darkMode ? 'rounded-lg bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]')
                  }`}
                  onClick={() => isUnlocked && !isCompleted && handleStartVerification(level.id)}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 border ${
                        isCompleted
                          ? (darkMode ? 'bg-[#00001a] border-green-500' : 'bg-gray-100 border-gray-200')
                          : (darkMode ? 'bg-[#00001a] border-blue-500' : 'bg-gray-100 border-gray-200')
                      }`}>
                        <IconComponent className={`w-5 sm:w-6 h-5 sm:h-6 ${
                          isCompleted
                            ? (darkMode ? 'text-green-400' : 'text-[#00001a]')
                            : (darkMode ? 'text-blue-400' : 'text-[#00001a]')
                        }`} />
                      </div>
                      {isCompleted && (
                        <CheckCircle className={`w-5 sm:w-6 h-5 sm:h-6 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`} />
                      )}
                    </div>

                    <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-2 break-words leading-tight ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {level.title}
                    </h3>
                    <p className={`text-xs sm:text-sm mb-3 sm:mb-4 break-words leading-relaxed ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      {level.subtitle}
                    </p>

                    <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 mb-3 sm:mb-4 md:mb-6 flex-grow">
                      {level.features.map((feature, index) => (
                        <li key={index} className={`flex items-start gap-2 sm:gap-3 text-xs sm:text-sm leading-relaxed break-words ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full mt-1 sm:mt-1.5 md:mt-2 flex-shrink-0 ${
                            isCompleted
                              ? (darkMode ? 'bg-green-400' : 'bg-[#00001a]')
                              : (darkMode ? 'bg-blue-400' : 'bg-[#00001a]')
                          }`} />
                          <span className="min-w-0 flex-1">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {isUnlocked && !isCompleted && (
                      <button
                        onClick={() => handleStartVerification(level.id)}
                        className={`w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 md:py-3 rounded-lg text-xs sm:text-sm md:text-base font-medium transition-all duration-300 ${
                          darkMode
                            ? 'bg-[#00001a] border border-blue-500 text-blue-400 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                            : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 shadow-[0_2px_4px_rgba(0,0,26,0.15)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.15)]'
                        }`}
                      >
                        <span className="truncate">Start Verification</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      </button>
                    )}

                    {isCompleted && (
                      <div className={`w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 md:py-3 rounded-lg text-xs sm:text-sm md:text-base font-medium ${
                        darkMode ? 'bg-[#00001a] border border-green-500 text-green-400' : 'bg-gray-100 text-[#00001a] border border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                      }`}>
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Verification Form */}
        {renderVerificationForm()}

        {/* Benefits Section */}
        <div className={`group p-4 sm:p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden mt-8 ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
            : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
        }`}>
          <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            Why Verify Your Identity?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <Shield className={`w-4 sm:w-5 h-4 sm:h-5 mt-1 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
              <div className="min-w-0 flex-1">
                <h4 className={`font-medium text-sm sm:text-base break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>Enhanced Security</h4>
                <p className={`text-xs sm:text-sm leading-relaxed break-words ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                  Protect your account with multiple layers of verification
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <Star className={`w-4 sm:w-5 h-4 sm:h-5 mt-1 flex-shrink-0 ${darkMode ? 'text-white/70' : 'text-[#00001a]'}`} />
              <div className="min-w-0 flex-1">
                <h4 className={`font-medium text-sm sm:text-base break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>Premium Features</h4>
                <p className={`text-xs sm:text-sm leading-relaxed break-words ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                  Unlock advanced features and higher transaction limits
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className={`w-4 sm:w-5 h-4 sm:h-5 mt-1 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`} />
              <div className="min-w-0 flex-1">
                <h4 className={`font-medium text-sm sm:text-base break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>Trust & Safety</h4>
                <p className={`text-xs sm:text-sm leading-relaxed break-words ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                  Build trust with other users and ensure platform safety
                </p>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>
    </div>
  )
}

export default SeekerVerification

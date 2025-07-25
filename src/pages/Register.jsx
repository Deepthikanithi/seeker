import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import GlassButton, { TagButton } from '../components/GlassButton'

const Register = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptCodeOfConduct: false,
    phoneNumber: '',
    organization: '',
    position: '',
    expertise: [],
    experience: ''
  })

  const [passwordStrength, setPasswordStrength] = useState('')
  const [showRecaptcha, setShowRecaptcha] = useState(false)

  const checkPasswordStrength = (password) => {
    if (password.length < 8) return 'Weak'
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)) {
      return 'Strong'
    }
    return 'Medium'
  }

  const handlePasswordChange = (password) => {
    setFormData({ ...formData, password })
    setPasswordStrength(checkPasswordStrength(password))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match')
        return
      }

      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.password || !formData.organization) {
        alert('Please fill in all required fields')
        return
      }

      // Show reCAPTCHA (simulated)
      setShowRecaptcha(true)
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simulate registration process
      await new Promise(resolve => setTimeout(resolve, 2000))

      setShowRecaptcha(false)
      // Authenticate seeker
      alert('Registration successful! Welcome to SynapMentor as a Seeker. Verification email sent.')
      setIsAuthenticated(true)
      navigate('/dashboard')
    } catch (error) {
      alert('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSSORegister = async (provider) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(`Register with ${provider}`)
      setIsAuthenticated(true)
      navigate('/dashboard')
    } catch (error) {
      alert(`Failed to register with ${provider}. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  // Organizational-level expertise areas
  const expertiseAreas = [
    'Enterprise Architecture', 'Cloud Strategy', 'Digital Transformation', 'DevOps & CI/CD',
    'Microservices Architecture', 'API Design & Management', 'Security Architecture', 'Data Architecture',
    'Technology Leadership', 'Agile Transformation', 'Platform Engineering', 'Site Reliability Engineering',
    'Machine Learning & AI', 'Blockchain & Web3', 'IoT & Edge Computing', 'Cybersecurity Strategy'
  ]

  const toggleExpertise = (area) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.includes(area)
        ? prev.expertise.filter(e => e !== area)
        : [...prev.expertise, area]
    }))
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-white'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
          darkMode ? 'bg-white/5' : 'bg-[#00001a]/5'
        }`}></div>
        <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
          darkMode ? 'bg-white/3' : 'bg-[#00001a]/3'
        }`}></div>
      </div>

      <div className={`relative backdrop-blur-2xl rounded-3xl shadow-2xl border p-8 w-full max-w-2xl transition-all duration-500 ${
        darkMode
          ? 'bg-[#00001a]/40 border-white/20 shadow-black/30'
          : 'bg-white/40 border-[#00001a]/20 shadow-[#00001a]/20'
      }`}>
        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl transition-all duration-300 ${
              darkMode
                ? 'bg-white/20 text-white hover:bg-white/30'
                : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
            }`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className={`text-2xl font-bold mb-6 transition-colors duration-500 ${
            darkMode ? 'text-white' : 'text-[#00001a]'
          }`}>SynapMentor</h1>
          <h2 className={`text-2xl font-bold mb-2 transition-colors duration-500 ${
            darkMode ? 'text-white' : 'text-[#00001a]'
          }`}>Join as Enterprise Expert</h2>
          <p className={`transition-colors duration-500 ${
            darkMode ? 'text-white/70' : 'text-[#00001a]/70'
          }`}>Share your expertise with organizations worldwide</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Two-column layout for basic info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-2xl backdrop-blur-2xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                  darkMode
                    ? 'bg-[#00001a]/20 border-white/30 text-white placeholder-white/50 focus:border-white/50 focus:ring-white/50'
                    : 'bg-white/20 border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:ring-[#00001a]/50'
                }`}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-2xl backdrop-blur-2xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                  darkMode
                    ? 'bg-[#00001a]/20 border-white/30 text-white placeholder-white/50 focus:border-white/50 focus:ring-white/50'
                    : 'bg-white/20 border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:ring-[#00001a]/50'
                }`}
                placeholder="your.email@company.com"
                required
              />
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className={`w-full px-4 py-3 pr-12 rounded-2xl backdrop-blur-2xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                    darkMode
                      ? 'bg-[#00001a]/20 border-white/30 text-white placeholder-white/50 focus:border-white/50 focus:ring-white/50'
                      : 'bg-white/20 border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:ring-[#00001a]/50'
                  }`}
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300 ${
                    darkMode ? 'text-white/70 hover:text-white' : 'text-[#00001a]/70 hover:text-[#00001a]'
                  }`}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className={`h-2 w-full rounded-full ${
                      darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'
                    }`}>
                      <div className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength === 'Weak' ? 'w-1/3 bg-red-500' :
                        passwordStrength === 'Medium' ? 'w-2/3 bg-yellow-500' : 'w-full bg-green-500'
                      }`}></div>
                    </div>
                    <span className={`text-xs font-medium ${
                      passwordStrength === 'Weak' ? 'text-red-400' :
                      passwordStrength === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {passwordStrength}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 transition-colors duration-500 ${
                    darkMode ? 'text-white/60' : 'text-[#00001a]/60'
                  }`}>
                    Password checked against data breaches
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full px-4 py-3 pr-12 rounded-2xl backdrop-blur-2xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                    darkMode
                      ? 'bg-[#00001a]/20 border-white/30 text-white placeholder-white/50 focus:border-white/50 focus:ring-white/50'
                      : 'bg-white/20 border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:ring-[#00001a]/50'
                  }`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300 ${
                    darkMode ? 'text-white/70 hover:text-white' : 'text-[#00001a]/70 hover:text-[#00001a]'
                  }`}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Password Requirements */}
          <div className={`text-xs transition-colors duration-500 ${
            darkMode ? 'text-white/60' : 'text-[#00001a]/60'
          }`}>
            Password must be at least 8 characters with uppercase, lowercase, number, and special character.
          </div>

          {/* Organizational Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Organization */}
            <div>
              <label htmlFor="organization" className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>
                Organization *
              </label>
              <input
                type="text"
                id="organization"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className={`w-full px-4 py-3 rounded-2xl backdrop-blur-2xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                  darkMode
                    ? 'bg-[#00001a]/20 border-white/30 text-white placeholder-white/50 focus:border-white/50 focus:ring-white/50'
                    : 'bg-white/20 border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:ring-[#00001a]/50'
                }`}
                placeholder="Your company/organization"
                required
              />
            </div>

            {/* Position */}
            <div>
              <label htmlFor="position" className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>
                Position/Title
              </label>
              <input
                type="text"
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className={`w-full px-4 py-3 rounded-2xl backdrop-blur-2xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                  darkMode
                    ? 'bg-[#00001a]/20 border-white/30 text-white placeholder-white/50 focus:border-white/50 focus:ring-white/50'
                    : 'bg-white/20 border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:ring-[#00001a]/50'
                }`}
                placeholder="CTO, Principal Engineer, etc."
              />
            </div>
          </div>

          {/* Experience and Rate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Years of Experience */}
            <div>
              <label htmlFor="experience" className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>
                Years of Experience
              </label>
              <select
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className={`w-full px-4 py-3 rounded-2xl backdrop-blur-2xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                  darkMode
                    ? 'bg-[#00001a]/20 border-white/30 text-white focus:border-white/50 focus:ring-white/50'
                    : 'bg-white/20 border-[#00001a]/30 text-[#00001a] focus:border-[#00001a]/50 focus:ring-[#00001a]/50'
                }`}
              >
                <option value="">Select experience level</option>
                <option value="5-10">5-10 years</option>
                <option value="10-15">10-15 years</option>
                <option value="15-20">15-20 years</option>
                <option value="20+">20+ years</option>
              </select>
            </div>

            {/* Hourly Rate */}
            <div>
              <label htmlFor="hourlyRate" className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>
                Hourly Rate (USD)
              </label>
              <input
                type="number"
                id="hourlyRate"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                className={`w-full px-4 py-3 rounded-2xl backdrop-blur-2xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                  darkMode
                    ? 'bg-[#00001a]/20 border-white/30 text-white placeholder-white/50 focus:border-white/50 focus:ring-white/50'
                    : 'bg-white/20 border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:ring-[#00001a]/50'
                }`}
                placeholder="200"
                min="50"
                max="1000"
              />
            </div>
          </div>

          {/* Areas of Expertise */}
          <div>
            <label className={`block text-sm font-medium mb-4 transition-colors duration-500 ${
              darkMode ? 'text-white' : 'text-[#00001a]'
            }`}>
              Areas of Expertise (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {expertiseAreas.map((area) => (
                <TagButton
                  key={area}
                  active={formData.expertise.includes(area)}
                  darkMode={darkMode}
                  onClick={() => toggleExpertise(area)}
                  className="text-xs"
                >
                  {area}
                </TagButton>
              ))}
            </div>
            <p className={`text-xs mt-2 transition-colors duration-500 ${
              darkMode ? 'text-white/60' : 'text-[#00001a]/60'
            }`}>
              Selected: {formData.expertise.length} areas
            </p>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className={`mt-1 rounded transition-all duration-300 ${
                  darkMode
                    ? 'text-white focus:ring-white border-white/30 bg-[#00001a]/20'
                    : 'text-[#00001a] focus:ring-[#00001a] border-[#00001a]/30 bg-white/20'
                }`}
                required
              />
              <label htmlFor="acceptTerms" className={`text-sm transition-colors duration-500 ${
                darkMode ? 'text-white/80' : 'text-[#00001a]/80'
              }`}>
                I agree to the{' '}
                <Link to="/terms" className={`underline transition-colors duration-300 ${
                  darkMode ? 'text-white hover:text-white/80' : 'text-[#00001a] hover:text-[#00001a]/80'
                }`}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className={`underline transition-colors duration-300 ${
                  darkMode ? 'text-white hover:text-white/80' : 'text-[#00001a] hover:text-[#00001a]/80'
                }`}>
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="acceptCodeOfConduct"
                checked={formData.acceptCodeOfConduct}
                onChange={(e) => setFormData({ ...formData, acceptCodeOfConduct: e.target.checked })}
                className={`mt-1 rounded transition-all duration-300 ${
                  darkMode
                    ? 'text-white focus:ring-white border-white/30 bg-[#00001a]/20'
                    : 'text-[#00001a] focus:ring-[#00001a] border-[#00001a]/30 bg-white/20'
                }`}
                required
              />
              <label htmlFor="acceptCodeOfConduct" className={`text-sm transition-colors duration-500 ${
                darkMode ? 'text-white/80' : 'text-[#00001a]/80'
              }`}>
                I agree to follow the{' '}
                <Link to="/code-of-conduct" className={`underline transition-colors duration-300 ${
                  darkMode ? 'text-white hover:text-white/80' : 'text-[#00001a] hover:text-[#00001a]/80'
                }`}>
                  Enterprise Code of Conduct
                </Link>
              </label>
            </div>
          </div>
          {/* Submit Button */}
          <GlassButton
            variant="primary"
            size="lg"
            darkMode={darkMode}
            onClick={handleSubmit}
            disabled={isLoading || !formData.acceptTerms || !formData.acceptCodeOfConduct}
            className="w-full"
          >
            {isLoading ? 'Creating Account...' : 'Register as Enterprise Expert'}
          </GlassButton>
          {/* Hidden reCAPTCHA simulation */}
          {showRecaptcha && (
            <div className={`mt-4 p-4 rounded-2xl text-center backdrop-blur-2xl border ${
              darkMode ? 'bg-[#00001a]/20 border-white/20' : 'bg-white/20 border-[#00001a]/20'
            }`}>
              <div className={`animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-2 ${
                darkMode ? 'border-white' : 'border-[#00001a]'
              }`}></div>
              <p className={`text-sm transition-colors duration-500 ${
                darkMode ? 'text-white/70' : 'text-[#00001a]/70'
              }`}>Verifying you're human...</p>
            </div>
          )}
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t transition-colors duration-500 ${
                darkMode ? 'border-white/30' : 'border-[#00001a]/30'
              }`} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 transition-colors duration-500 ${
                darkMode
                  ? 'bg-[#00001a] text-white/70'
                  : 'bg-white text-[#00001a]/70'
              }`}>Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <GlassButton
              variant="secondary"
              size="md"
              darkMode={darkMode}
              onClick={() => handleSSORegister('google')}
              disabled={isLoading}
              className="w-full justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </GlassButton>

            <GlassButton
              variant="secondary"
              size="md"
              darkMode={darkMode}
              onClick={() => handleSSORegister('github')}
              disabled={isLoading}
              className="w-full justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </GlassButton>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className={`transition-colors duration-500 ${
            darkMode ? 'text-white/70' : 'text-[#00001a]/70'
          }`}>
            Already have an account?{' '}
            <Link
              to="/login"
              className={`font-medium transition-colors duration-300 hover:underline ${
                darkMode ? 'text-white hover:text-white/80' : 'text-[#00001a] hover:text-[#00001a]/80'
              }`}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

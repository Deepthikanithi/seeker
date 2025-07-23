import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Phone, Key, Zap } from 'lucide-react'
import GlassButton, { TabButton } from '../components/GlassButton'

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [loginMethod, setLoginMethod] = useState('email') // 'email', 'mobile', 'otp', 'magic'
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [showTroubleSigning, setShowTroubleSigning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOTP = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setOtpSent(true)
      alert('OTP sent successfully! Check your email/mobile.')
    } catch (error) {
      alert('Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMagicLink = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Magic link sent to your email! Check your inbox.')
    } catch (error) {
      alert('Failed to send magic link. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (loginMethod === 'otp' && !otpSent) {
        await handleSendOTP()
        return
      }

      if (loginMethod === 'magic') {
        await handleSendMagicLink()
        return
      }

      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Validate inputs
      if (loginMethod === 'email' && (!email || !password)) {
        alert('Please enter both email and password.')
        return
      }

      if (loginMethod === 'mobile' && (!mobile || !password)) {
        alert('Please enter both mobile and password.')
        return
      }

      if (loginMethod === 'otp' && !otp) {
        alert('Please enter the OTP.')
        return
      }

      setIsAuthenticated(true)
      navigate('/dashboard')
    } catch (error) {
      alert('Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSSOLogin = async (provider) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(`Login with ${provider}`)
      setIsAuthenticated(true)
      navigate('/dashboard')
    } catch (error) {
      alert(`Failed to login with ${provider}. Please try again.`)
    } finally {
      setIsLoading(false)
    }
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

      <div className={`relative backdrop-blur-2xl rounded-3xl shadow-2xl border p-8 w-full max-w-md transition-all duration-500 ${
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
          }`}>Log in</h2>
          <p className={`transition-colors duration-500 ${
            darkMode ? 'text-white/70' : 'text-[#00001a]/70'
          }`}>Enter your credentials to access your account</p>
        </div>

        {/* Login Method Selector */}
        <div className="mb-6">
          <div className={`flex space-x-2 p-1 rounded-2xl backdrop-blur-2xl border transition-all duration-500 ${
            darkMode
              ? 'bg-[#00001a]/20 border-white/20'
              : 'bg-white/20 border-[#00001a]/20'
          }`}>
            <TabButton
              active={loginMethod === 'email'}
              darkMode={darkMode}
              onClick={() => setLoginMethod('email')}
              className="flex-1 text-center"
            >
              <Mail className="w-4 h-4 mr-1" />
              Email
            </TabButton>
            <TabButton
              active={loginMethod === 'mobile'}
              darkMode={darkMode}
              onClick={() => setLoginMethod('mobile')}
              className="flex-1 text-center"
            >
              <Phone className="w-4 h-4 mr-1" />
              Mobile
            </TabButton>
            <TabButton
              active={loginMethod === 'otp'}
              darkMode={darkMode}
              onClick={() => setLoginMethod('otp')}
              className="flex-1 text-center"
            >
              <Key className="w-4 h-4 mr-1" />
              OTP
            </TabButton>
            <TabButton
              active={loginMethod === 'magic'}
              darkMode={darkMode}
              onClick={() => setLoginMethod('magic')}
              className="flex-1 text-center"
            >
              <Zap className="w-4 h-4 mr-1" />
              Magic
            </TabButton>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email/Mobile Input */}
          {(loginMethod === 'email' || loginMethod === 'otp' || loginMethod === 'magic') && (
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl backdrop-blur-2xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                  darkMode
                    ? 'bg-[#00001a]/20 border-white/30 text-white placeholder-white/50 focus:border-white/50 focus:ring-white/50'
                    : 'bg-white/20 border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:ring-[#00001a]/50'
                }`}
                placeholder="your.email@example.com"
                required
              />
            </div>
          )}

          {loginMethod === 'mobile' && (
            <div>
              <label htmlFor="mobile" className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl backdrop-blur-2xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                  darkMode
                    ? 'bg-[#00001a]/20 border-white/30 text-white placeholder-white/50 focus:border-white/50 focus:ring-white/50'
                    : 'bg-white/20 border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:ring-[#00001a]/50'
                }`}
                placeholder="Enter your mobile number"
                required
              />
            </div>
          )}

          {/* OTP Input */}
          {loginMethod === 'otp' && otpSent && (
            <div>
              <label htmlFor="otp" className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl backdrop-blur-2xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                  darkMode
                    ? 'bg-[#00001a]/20 border-white/30 text-white placeholder-white/50 focus:border-white/50 focus:ring-white/50'
                    : 'bg-white/20 border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:ring-[#00001a]/50'
                }`}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                required
              />
            </div>
          )}

          {/* Password Input (for email/mobile login) */}
          {(loginMethod === 'email' || loginMethod === 'mobile') && (
            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 pr-12 rounded-2xl backdrop-blur-2xl border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                    darkMode
                      ? 'bg-[#00001a]/20 border-white/30 text-white placeholder-white/50 focus:border-white/50 focus:ring-white/50'
                      : 'bg-white/20 border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:ring-[#00001a]/50'
                  }`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300 ${
                    darkMode ? 'text-white/70 hover:text-white' : 'text-[#00001a]/70 hover:text-[#00001a]'
                  }`}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Remember Me */}
          {(loginMethod === 'email' || loginMethod === 'mobile') && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={`h-4 w-4 rounded transition-all duration-300 ${
                    darkMode
                      ? 'text-white focus:ring-white border-white/30 bg-[#00001a]/20'
                      : 'text-[#00001a] focus:ring-[#00001a] border-[#00001a]/30 bg-white/20'
                  }`}
                />
                <label htmlFor="remember-me" className={`ml-2 block text-sm transition-colors duration-500 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`}>
                  Remember me (30 days)
                </label>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <GlassButton
            variant="primary"
            size="lg"
            darkMode={darkMode}
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Processing...' :
             loginMethod === 'otp' && !otpSent ? 'Send OTP' :
             loginMethod === 'magic' ? 'Send Magic Link' :
             'Sign In'}
          </GlassButton>

          {/* Trouble Signing In */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowTroubleSigning(!showTroubleSigning)}
              className={`text-sm transition-colors duration-300 hover:underline ${
                darkMode ? 'text-white/70 hover:text-white' : 'text-[#00001a]/70 hover:text-[#00001a]'
              }`}
            >
              Trouble signing in?
            </button>
          </div>

          {showTroubleSigning && (
            <div className={`mt-4 p-4 rounded-2xl backdrop-blur-2xl border space-y-3 ${
              darkMode
                ? 'bg-[#00001a]/20 border-white/20'
                : 'bg-white/20 border-[#00001a]/20'
            }`}>
              <Link to="/forgot-password" className={`block text-sm transition-colors duration-300 hover:underline ${
                darkMode ? 'text-white/80 hover:text-white' : 'text-[#00001a]/80 hover:text-[#00001a]'
              }`}>
                Forgot Password (OTP/Magic Link)
              </Link>
              <Link to="/forgot-account" className={`block text-sm transition-colors duration-300 hover:underline ${
                darkMode ? 'text-white/80 hover:text-white' : 'text-[#00001a]/80 hover:text-[#00001a]'
              }`}>
                Forgot Account (Backup Code)
              </Link>
              <p className={`text-xs transition-colors duration-500 ${
                darkMode ? 'text-white/50' : 'text-[#00001a]/50'
              }`}>
                Rate limited? Please wait before trying again.
              </p>
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
              onClick={() => handleSSOLogin('google')}
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
              onClick={() => handleSSOLogin('github')}
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
            Don't have an account?{' '}
            <Link
              to="/register"
              className={`font-medium transition-colors duration-300 hover:underline ${
                darkMode ? 'text-white hover:text-white/80' : 'text-[#00001a] hover:text-[#00001a]/80'
              }`}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

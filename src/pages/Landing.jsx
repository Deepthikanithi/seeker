import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GlassButton, { TagButton } from '../components/GlassButton'

const Landing = () => {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeContentCategory, setActiveContentCategory] = useState('All')
  const [darkMode, setDarkMode] = useState(false)

  const handleGetStarted = () => {
    navigate('/register')
  }

  const handleLearnMore = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleJoinAsMentor = () => {
    navigate('/register?role=mentor')
  }

  const handleFindMentor = () => {
    navigate('/register?role=seeker')
  }

  const handlePricingSelect = (plan) => {
    navigate(`/register?plan=${plan}`)
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`backdrop-blur-2xl border-b shadow-2xl transition-all duration-500 ${
        darkMode
          ? 'bg-[#00001a]/40 border-white/10 shadow-black/20'
          : 'bg-white/40 border-[#00001a]/10 shadow-[#00001a]/10'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className={`text-2xl font-bold transition-colors duration-500 ${
              darkMode ? 'text-white' : 'text-[#00001a]'
            }`}>SynapMentor</h1>
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className={`transition-colors duration-500 hover:underline ${
                  darkMode ? 'text-white/70 hover:text-white' : 'text-[#00001a]/70 hover:text-[#00001a]'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                className={`transition-colors duration-500 hover:underline ${
                  darkMode ? 'text-white/70 hover:text-white' : 'text-[#00001a]/70 hover:text-[#00001a]'
                }`}
              >
                Success Stories
              </button>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className={`transition-colors duration-500 hover:underline ${
                  darkMode ? 'text-white/70 hover:text-white' : 'text-[#00001a]/70 hover:text-[#00001a]'
                }`}
              >
                Enterprise
              </button>
              <button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className={`transition-colors duration-500 hover:underline ${
                  darkMode ? 'text-white/70 hover:text-white' : 'text-[#00001a]/70 hover:text-[#00001a]'
                }`}
              >
                Pricing
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <GlassButton
                variant="ghost"
                size="sm"
                darkMode={darkMode}
                onClick={handleLogin}
              >
                Log in
              </GlassButton>
              <GlassButton
                variant="primary"
                size="sm"
                darkMode={darkMode}
                onClick={handleGetStarted}
              >
                Get Started
              </GlassButton>
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
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

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className={`text-5xl font-bold mb-6 leading-tight transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>
                Transform Your Organization with Expert Technical Mentorship
              </h1>
              <p className={`text-xl mb-8 leading-relaxed transition-colors duration-500 ${
                darkMode ? 'text-white/70' : 'text-[#00001a]/70'
              }`}>
                Connect your teams with senior technical leaders, enterprise architects, and industry experts to solve complex challenges, accelerate digital transformation, and build organizational capabilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <GlassButton
                  variant="primary"
                  size="lg"
                  darkMode={darkMode}
                  onClick={handleGetStarted}
                  className="text-center"
                >
                  Start Enterprise Trial →
                </GlassButton>
                <GlassButton
                  variant="secondary"
                  size="lg"
                  darkMode={darkMode}
                  onClick={handleJoinAsMentor}
                  className="text-center"
                >
                  Join as Expert Mentor
                </GlassButton>
              </div>
              <div className="mt-12">
                <p className={`text-sm transition-colors duration-500 ${
                  darkMode ? 'text-white/50' : 'text-[#00001a]/50'
                }`}>
                  <span className={`font-semibold transition-colors duration-500 ${
                    darkMode ? 'text-white' : 'text-[#00001a]'
                  }`}>2000+</span> enterprise experts ready to help your organization
                </p>
              </div>
            </div>

          {/* Right Content - Enterprise Session Preview */}
          <div className={`group relative backdrop-blur-2xl rounded-3xl shadow-2xl border transition-all duration-500 hover:-translate-y-1 ${
            darkMode
              ? 'bg-[#00001a]/30 border-white/20 shadow-black/30 hover:shadow-black/40'
              : 'bg-white/40 border-[#00001a]/20 shadow-[#00001a]/20 hover:shadow-[#00001a]/30'
          }`}>
            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              darkMode ? 'bg-white/5' : 'bg-[#00001a]/5'
            }`}></div>

            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                  }`}>
                    EA
                  </div>
                  <div>
                    <h3 className={`font-semibold transition-colors duration-500 ${
                      darkMode ? 'text-white' : 'text-[#00001a]'
                    }`}>Enterprise Architecture Session</h3>
                    <p className={`text-sm transition-colors duration-500 ${
                      darkMode ? 'text-white/70' : 'text-[#00001a]/70'
                    }`}>Cloud Migration Strategy</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  darkMode
                    ? 'bg-white/20 text-white'
                    : 'bg-[#00001a]/20 text-[#00001a]'
                }`}>
                  Live
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className={`text-sm mb-2 transition-colors duration-500 ${
                    darkMode ? 'text-white/80' : 'text-[#00001a]/80'
                  }`}>
                    <span className="font-medium">Challenge:</span> We need to migrate our legacy monolith to microservices on AWS while maintaining 99.9% uptime.
                  </p>
                </div>

                <div>
                  <p className={`text-sm mb-2 transition-colors duration-500 ${
                    darkMode ? 'text-white/80' : 'text-[#00001a]/80'
                  }`}>
                    <span className="font-medium">Architect:</span> Let's start with a strangler fig pattern. We'll identify bounded contexts and create a migration roadmap...
                  </p>
                </div>

                <div className={`p-3 rounded-2xl backdrop-blur-xl border ${
                  darkMode
                    ? 'bg-[#00001a]/20 border-white/10'
                    : 'bg-white/20 border-[#00001a]/10'
                }`}>
                  <p className={`text-sm font-mono transition-colors duration-500 ${
                    darkMode ? 'text-white/70' : 'text-[#00001a]/70'
                  }`}>
                    CTO: Perfect. Can you help us design the API gateway strategy?
                  </p>
                </div>
              </div>

              <div className={`flex items-center justify-between mt-6 pt-4 border-t ${
                darkMode ? 'border-white/10' : 'border-[#00001a]/10'
              }`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    darkMode ? 'bg-white/70' : 'bg-[#00001a]/70'
                  }`}></div>
                  <span className={`text-sm transition-colors duration-500 ${
                    darkMode ? 'text-white/70' : 'text-[#00001a]/70'
                  }`}>Enterprise session in progress</span>
                </div>
                <span className={`text-sm font-medium transition-colors duration-500 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`}>1:45:30</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className={`py-20 transition-all duration-500 ${
        darkMode ? 'bg-[#00001a]' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 transition-colors duration-500 ${
              darkMode ? 'text-white' : 'text-[#00001a]'
            }`}>
              Enterprise-Grade Technical Mentorship Platform
            </h2>
            <p className={`text-xl transition-colors duration-500 ${
              darkMode ? 'text-white/70' : 'text-[#00001a]/70'
            }`}>
              Everything your organization needs to accelerate digital transformation and technical excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Enterprise Architecture Consulting */}
            <div className={`group text-center p-8 rounded-3xl backdrop-blur-2xl border shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
              darkMode
                ? 'bg-[#00001a]/20 border-white/20 shadow-black/30 hover:shadow-black/40'
                : 'bg-white/30 border-[#00001a]/20 shadow-[#00001a]/20 hover:shadow-[#00001a]/30'
            }`}>
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                darkMode ? 'bg-white/20 group-hover:bg-white/30' : 'bg-[#00001a]/20 group-hover:bg-[#00001a]/30'
              }`}>
                <svg className={`w-8 h-8 transition-colors duration-500 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-3 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>Enterprise Architecture Consulting</h3>
              <p className={`transition-colors duration-500 ${
                darkMode ? 'text-white/70' : 'text-[#00001a]/70'
              }`}>
                Connect with senior architects and CTOs to design scalable systems, plan digital transformations, and solve complex technical challenges.
              </p>
            </div>

            {/* Technical Leadership Development */}
            <div className={`group text-center p-8 rounded-3xl backdrop-blur-2xl border shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
              darkMode
                ? 'bg-[#00001a]/20 border-white/20 shadow-black/30 hover:shadow-black/40'
                : 'bg-white/30 border-[#00001a]/20 shadow-[#00001a]/20 hover:shadow-[#00001a]/30'
            }`}>
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                darkMode ? 'bg-white/20 group-hover:bg-white/30' : 'bg-[#00001a]/20 group-hover:bg-[#00001a]/30'
              }`}>
                <svg className={`w-8 h-8 transition-colors duration-500 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-3 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>Technical Leadership Development</h3>
              <p className={`transition-colors duration-500 ${
                darkMode ? 'text-white/70' : 'text-[#00001a]/70'
              }`}>
                Develop your technical leaders through mentorship with VPs of Engineering, Principal Engineers, and technology executives.
              </p>
            </div>

            {/* Strategic Technology Planning */}
            <div className={`group text-center p-8 rounded-3xl backdrop-blur-2xl border shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
              darkMode
                ? 'bg-[#00001a]/20 border-white/20 shadow-black/30 hover:shadow-black/40'
                : 'bg-white/30 border-[#00001a]/20 shadow-[#00001a]/20 hover:shadow-[#00001a]/30'
            }`}>
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                darkMode ? 'bg-white/20 group-hover:bg-white/30' : 'bg-[#00001a]/20 group-hover:bg-[#00001a]/30'
              }`}>
                <svg className={`w-8 h-8 transition-colors duration-500 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-3 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>Strategic Technology Planning</h3>
              <p className={`transition-colors duration-500 ${
                darkMode ? 'text-white/70' : 'text-[#00001a]/70'
              }`}>
                Get guidance on technology roadmaps, vendor selection, and strategic technical decisions from industry experts.
              </p>
            </div>

            {/* Global Expert Network */}
            <div className={`group text-center p-8 rounded-3xl backdrop-blur-2xl border shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
              darkMode
                ? 'bg-[#00001a]/20 border-white/20 shadow-black/30 hover:shadow-black/40'
                : 'bg-white/30 border-[#00001a]/20 shadow-[#00001a]/20 hover:shadow-[#00001a]/30'
            }`}>
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                darkMode ? 'bg-white/20 group-hover:bg-white/30' : 'bg-[#00001a]/20 group-hover:bg-[#00001a]/30'
              }`}>
                <svg className={`w-8 h-8 transition-colors duration-500 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-3 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>Global Expert Network</h3>
              <p className={`transition-colors duration-500 ${
                darkMode ? 'text-white/70' : 'text-[#00001a]/70'
              }`}>
                Access a curated network of C-level executives, principal engineers, and technology leaders from Fortune 500 companies worldwide.
              </p>
            </div>

            {/* Enterprise Knowledge Base */}
            <div className={`group text-center p-8 rounded-3xl backdrop-blur-2xl border shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
              darkMode
                ? 'bg-[#00001a]/20 border-white/20 shadow-black/30 hover:shadow-black/40'
                : 'bg-white/30 border-[#00001a]/20 shadow-[#00001a]/20 hover:shadow-[#00001a]/30'
            }`}>
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                darkMode ? 'bg-white/20 group-hover:bg-white/30' : 'bg-[#00001a]/20 group-hover:bg-[#00001a]/30'
              }`}>
                <svg className={`w-8 h-8 transition-colors duration-500 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-3 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>Enterprise Knowledge Base</h3>
              <p className={`transition-colors duration-500 ${
                darkMode ? 'text-white/70' : 'text-[#00001a]/70'
              }`}>
                Access comprehensive enterprise architecture patterns, best practices, and case studies from successful digital transformations.
              </p>
            </div>

            {/* Enterprise Security & Compliance */}
            <div className={`group text-center p-8 rounded-3xl backdrop-blur-2xl border shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
              darkMode
                ? 'bg-[#00001a]/20 border-white/20 shadow-black/30 hover:shadow-black/40'
                : 'bg-white/30 border-[#00001a]/20 shadow-[#00001a]/20 hover:shadow-[#00001a]/30'
            }`}>
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                darkMode ? 'bg-white/20 group-hover:bg-white/30' : 'bg-[#00001a]/20 group-hover:bg-[#00001a]/30'
              }`}>
                <svg className={`w-8 h-8 transition-colors duration-500 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-3 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-[#00001a]'
              }`}>Enterprise Security & Compliance</h3>
              <p className={`transition-colors duration-500 ${
                darkMode ? 'text-white/70' : 'text-[#00001a]/70'
              }`}>
                SOC 2 Type II certified platform with enterprise-grade security, data encryption, and compliance with GDPR, HIPAA, and industry standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Reels Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
              </svg>
              <span className="text-sm text-gray-600">Better than YouTube</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Tech Reels & Video Content
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Short, engaging videos from verified experts that get straight to the point
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Web Dev', 'Mobile', 'Data Science', 'DevOps', 'AI/ML', 'Blockchain', 'Cloud', 'Security'].map((category) => (
              <TagButton
                key={category}
                active={activeCategory === category}
                darkMode={darkMode}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </TagButton>
            ))}
          </div>

          {/* Video Cards */}
          <div className="flex gap-6 overflow-x-auto pb-4">
            {/* Video Card 1 */}
            <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-blue-900 to-blue-700">
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">Web Dev</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium ml-1">NEW</span>
                </div>
                <div className="absolute bottom-3 right-3 text-white text-sm font-medium">0:56</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Card 2 */}
            <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-green-600 to-green-400">
                <div className="absolute top-3 left-3">
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">DevOps</span>
                  <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium ml-1">TRENDING</span>
                </div>
                <div className="absolute bottom-3 right-3 text-white text-sm font-medium">3:22</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Card 3 */}
            <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-purple-600 to-pink-500">
                <div className="absolute top-3 left-3">
                  <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">Web Dev</span>
                </div>
                <div className="absolute bottom-3 right-3 text-white text-sm font-medium">1:45</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Card 4 */}
            <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-yellow-600 to-orange-500">
                <div className="absolute top-3 left-3">
                  <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-medium">Python</span>
                  <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium ml-1">TRENDING</span>
                </div>
                <div className="absolute bottom-3 right-3 text-white text-sm font-medium">6:47</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Card 5 */}
            <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-red-700 to-red-500">
                <div className="absolute top-3 left-3">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">Git</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium ml-1">NEW</span>
                </div>
                <div className="absolute bottom-3 right-3 text-white text-sm font-medium">1:22</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We're Different Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How We're Different From YouTube
            </h2>
            <p className="text-xl text-gray-600">
              SynapMentor provides a focused learning experience tailored for developers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Verified Experts Only */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Verified Experts Only</h3>
              <p className="text-gray-600">
                All content creators are verified tech professionals with proven expertise
              </p>
            </div>

            {/* Focused Technical Content */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-500 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Focused Technical Content</h3>
              <p className="text-gray-600">
                No distractions or irrelevant content - just pure technical knowledge
              </p>
            </div>

            {/* Fair Creator Compensation */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-purple-500 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fair Creator Compensation</h3>
              <p className="text-gray-600">
                Content creators earn directly from their expertise at fair rates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How SynapMentor Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How SynapMentor Works
            </h2>
            <p className="text-xl text-gray-600">
              Get unstuck in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Describe Your Problem</h3>
              <p className="text-gray-600">
                Explain your technical challenge, upload code snippets, or share your screen to show the issue.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Connect with an Expert</h3>
              <p className="text-gray-600">
                Get matched with the perfect mentor based on your technology stack and specific needs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Solve It Together</h3>
              <p className="text-gray-600">
                Collaborate in real-time to debug, optimize, and implement the best solution.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-[#00001a]/90 text-white px-8 py-3 rounded-lg font-medium backdrop-blur-md border border-[#00001a] hover:bg-[#00001a] hover:shadow-lg transition-all duration-200">
              Start Solving Problems →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of developers who have accelerated their progress with SynapMentor
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "SynapMentor helped me solve a complex React performance issue that had been slowing down our application for weeks. My mentor identified the problem in minutes!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  S
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah J.</div>
                  <div className="text-sm text-gray-600">Frontend Developer</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "As a self-taught developer, I often hit roadblocks. Having access to experienced mentors has accelerated my learning by months, if not years."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  M
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Michael T.</div>
                  <div className="text-sm text-gray-600">Junior Developer</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "Our team uses SynapMentor whenever we're stuck on a difficult problem. It's like having a senior developer on call 24/7."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  E
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Elena R.</div>
                  <div className="text-sm text-gray-600">Tech Lead</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Base Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Our Knowledge Base
            </h2>
            <p className="text-xl text-gray-600">
              Discover expert-created content across various technology domains
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Frontend', 'Backend', 'DevOps', 'Mobile', 'AI & ML'].map((category) => (
              <TagButton
                key={category}
                active={activeContentCategory === category}
                darkMode={darkMode}
                onClick={() => setActiveContentCategory(category)}
              >
                {category}
              </TagButton>
            ))}
          </div>

          {/* Featured Content */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Featured Content</h3>
              <button className="text-[#00001a] font-medium hover:underline">
                View all →
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Article 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-400 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">Frontend</span>
                    <span className="text-gray-500 text-sm">8 min read</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    Mastering React Performance Optimization
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold mr-2">
                        S
                      </div>
                      <span className="text-gray-600 text-sm">Sarah Johnson</span>
                    </div>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">Article</span>
                  </div>
                </div>
              </div>

              {/* Article 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
                <div className="h-48 bg-gradient-to-br from-green-500 to-emerald-400 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">Backend</span>
                    <span className="text-gray-500 text-sm">12 min read</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    Building Scalable Microservices with Node.js
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold mr-2">
                        M
                      </div>
                      <span className="text-gray-600 text-sm">Michael Chen</span>
                    </div>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">Tutorial</span>
                  </div>
                </div>
              </div>

              {/* Article 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-indigo-400 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">DevOps</span>
                    <span className="text-gray-500 text-sm">10 min read</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    CI/CD Pipeline Best Practices
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold mr-2">
                        A
                      </div>
                      <span className="text-gray-600 text-sm">Alex Rodriguez</span>
                    </div>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">Guide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Popular Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* JavaScript */}
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 hover:border-yellow-300 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
                    <span className="text-yellow-900 font-bold text-sm">JS</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">JavaScript</h4>
                <p className="text-sm text-gray-600">128 resources</p>
              </div>

              {/* Python */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center">
                    <span className="text-blue-900 font-bold text-sm">PY</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Python</h4>
                <p className="text-sm text-gray-600">95 resources</p>
              </div>

              {/* Cloud Computing */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-gray-400 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                    </svg>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Cloud Computing</h4>
                <p className="text-sm text-gray-600">64 resources</p>
              </div>

              {/* Data Science */}
              <div className="bg-green-50 p-6 rounded-lg border border-green-200 hover:border-green-300 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-green-400 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.25l1.5-1.5V6.75l-1.5-1.5H2.5L1 6.75v10.5l1.5 1.5h19z"/>
                    </svg>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Data Science</h4>
                <p className="text-sm text-gray-600">76 resources</p>
              </div>

              {/* Mobile Development */}
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 hover:border-purple-300 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-purple-400 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H7V6h10v10z"/>
                    </svg>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Mobile Development</h4>
                <p className="text-sm text-gray-600">65 resources</p>
              </div>

              {/* Web Development */}
              <div className="bg-red-50 p-6 rounded-lg border border-red-200 hover:border-red-300 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-red-400 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Web Development</h4>
                <p className="text-sm text-gray-600">112 resources</p>
              </div>

              {/* DevOps */}
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 hover:border-orange-300 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-orange-400 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">DevOps</h4>
                <p className="text-sm text-gray-600">58 resources</p>
              </div>

              {/* Blockchain */}
              <div className="bg-teal-50 p-6 rounded-lg border border-teal-200 hover:border-teal-300 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-teal-400 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Blockchain</h4>
                <p className="text-sm text-gray-600">42 resources</p>
              </div>
            </div>
          </div>

          {/* Latest Tutorials */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Latest Tutorials</h3>
              <button className="text-[#00001a] font-medium hover:underline">
                View all →
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Tutorial 1 */}
              <div className="bg-white p-6 rounded-lg border">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Building a Real-time Chat Application with Socket.io
                </h4>
                <p className="text-gray-600 mb-4">
                  Learn how to create a scalable real-time chat application using Node.js, Express, and Socket.io with user authentication.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Node.js</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Socket.io</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">Real-time</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-2">
                      D
                    </div>
                    <span className="text-gray-600 text-sm">David Wilson</span>
                  </div>
                  <span className="text-gray-500 text-sm">May 15, 2023</span>
                </div>
              </div>

              {/* Tutorial 2 */}
              <div className="bg-white p-6 rounded-lg border">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Advanced CSS Animation Techniques
                </h4>
                <p className="text-gray-600 mb-4">
                  Discover powerful CSS animation techniques to create engaging user interfaces without relying on JavaScript libraries.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">CSS</span>
                  <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-sm">Animation</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Frontend</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-semibold mr-2">
                      E
                    </div>
                    <span className="text-gray-600 text-sm">Emma Thompson</span>
                  </div>
                  <span className="text-gray-500 text-sm">June 2, 2023</span>
                </div>
              </div>

              {/* Tutorial 3 */}
              <div className="bg-white p-6 rounded-lg border">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Implementing JWT Authentication in React Applications
                </h4>
                <p className="text-gray-600 mb-4">
                  A comprehensive guide to implementing secure JWT authentication in React applications with best practices.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">React</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">JWT</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Authentication</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-2">
                      J
                    </div>
                    <span className="text-gray-600 text-sm">John Martinez</span>
                  </div>
                  <span className="text-gray-500 text-sm">April 28, 2023</span>
                </div>
              </div>

              {/* Tutorial 4 */}
              <div className="bg-white p-6 rounded-lg border">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Docker for Development Environments
                </h4>
                <p className="text-gray-600 mb-4">
                  Set up consistent development environments using Docker containers and Docker Compose for your team.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Docker</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">DevOps</span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">Containers</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-2">
                      L
                    </div>
                    <span className="text-gray-600 text-sm">Lisa Chen</span>
                  </div>
                  <span className="text-gray-500 text-sm">March 20, 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Pay only for the time you need, with rates that work for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Quick Help */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Help</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">₹5</span>
                <span className="text-gray-600 ml-2">per minute</span>
              </div>
              <p className="text-gray-600 mb-6">
                Perfect for quick debugging sessions and simple questions
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Access to all mentors
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Text and voice chat
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Code snippet sharing
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No minimum session length
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Pay as you go
                </li>
              </ul>
              <button className="w-full bg-[#00001a]/90 text-white py-3 rounded-lg font-medium backdrop-blur-md border border-[#00001a] hover:bg-[#00001a] hover:shadow-lg transition-all duration-200">
                Get Started
              </button>
            </div>

            {/* Standard Session - Most Popular */}
            <div className="bg-white border-2 border-[#00001a] rounded-lg p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#00001a] text-white px-4 py-2 rounded-full text-sm font-medium">
                  MOST POPULAR
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Standard Session</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">₹10</span>
                <span className="text-gray-600 ml-2">per minute</span>
              </div>
              <p className="text-gray-600 mb-6">
                Ideal for most technical problems and learning sessions
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Access to all mentors
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Video, text and voice chat
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Screen sharing
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Code collaboration
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Session recording
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  24/7 availability
                </li>
              </ul>
              <button className="w-full bg-[#00001a]/90 text-white py-3 rounded-lg font-medium backdrop-blur-md border border-[#00001a] hover:bg-[#00001a] hover:shadow-lg transition-all duration-200">
                Get Started
              </button>
            </div>

            {/* Expert Guidance */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Guidance</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">₹20</span>
                <span className="text-gray-600 ml-2">per minute</span>
              </div>
              <p className="text-gray-600 mb-6">
                For complex problems and career guidance from senior experts
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Access to senior mentors only
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Priority matching
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Extended session tools
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Follow-up support
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Written summary
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Project consultation
                </li>
              </ul>
              <button className="w-full bg-[#00001a]/90 text-white py-3 rounded-lg font-medium backdrop-blur-md border border-[#00001a] hover:bg-[#00001a] hover:shadow-lg transition-all duration-200">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-[#00001a] to-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to solve your technical challenges?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who are accelerating their progress with SynapMentor
          </p>
          <button className="bg-white/90 text-[#00001a] px-8 py-4 rounded-lg font-semibold text-lg backdrop-blur-md border border-white hover:bg-white hover:shadow-lg transition-all duration-200">
            Get Started Today →
          </button>
        </div>
      </section>
      </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">SynapMentor</h3>
              <p className="text-gray-600 mb-6">
                Connecting developers with expert mentors to solve technical challenges and accelerate learning.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">PRODUCT</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">For Teams</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Enterprise</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">COMPANY</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">LEGAL</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2025 SynapMentor. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm mt-4 md:mt-0">
              Made with ❤️ in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing

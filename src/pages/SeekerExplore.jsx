import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Users,
  Gift,
  Share2,
  Headphones,
  Grid3X3,
  List,
  SlidersHorizontal,
  TrendingUp,
  Award,
  Zap,
  Shield,
  Bookmark,
  Heart,
  Eye,
  ChevronDown,
  User,
  ExternalLink,
  X
} from 'lucide-react'

const SeekerExplore = ({ darkMode }) => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [sortBy, setSortBy] = useState('Most Relevant')
  const [showGiftModal, setShowGiftModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [selectedSolver, setSelectedSolver] = useState(null)

  // Filter states
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All')
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [selectedPricing, setSelectedPricing] = useState('All')
  const [selectedRating, setSelectedRating] = useState('All')
  const [selectedTier, setSelectedTier] = useState('All')
  const [selectedSpeciality, setSelectedSpeciality] = useState('All')
  const [selectedAvailability, setSelectedAvailability] = useState('All')
  const [selectedLanguage, setSelectedLanguage] = useState('All')

  // Additional states for new functionality
  const [likedSolvers, setLikedSolvers] = useState(new Set())
  const [selectedGiftAmount, setSelectedGiftAmount] = useState(null)
  const [customGiftAmount, setCustomGiftAmount] = useState('')
  const [showPodcastSection, setShowPodcastSection] = useState(false)


  // Mock data for solvers
  const [solvers] = useState([
    {
      id: 1,
      name: 'Alex Chen',
      title: 'Senior Full-Stack Developer',
      company: 'Freelance Developer',
      rating: 4.9,
      reviews: 234,
      sessions: 234,
      responseTime: '5 min',
      hourlyRate: 45,
      location: 'USA',
      isOnline: true,
      availableNow: true,
      skills: ['React', 'Vue.js', 'TypeScript', 'Node.js'],
      verified: true,
      avatar: null
    },
    {
      id: 2,
      name: 'Sarah Davis',
      title: 'AI/ML Research Scientist',
      company: 'AI & Machine Learning',
      rating: 4.8,
      reviews: 189,
      sessions: 189,
      responseTime: '10 min',
      hourlyRate: 65,
      location: 'Canada',
      isOnline: false,
      availableNow: false,
      availableIn: '3 hours',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning'],
      verified: true,
      avatar: null
    },
    {
      id: 3,
      name: 'Mike Johnson',
      title: 'DevOps Engineer',
      company: 'DevOps',
      rating: 4.7,
      reviews: 145,
      sessions: 145,
      responseTime: '15 min',
      hourlyRate: 55,
      location: 'UK',
      isOnline: true,
      availableNow: true,
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      verified: true,
      avatar: null
    }
  ])



  const sortOptions = [
    'Most Relevant', 'Highest Rated', 'Price: Low to High',
    'Price: High to Low', 'Most Reviews', 'Newest First'
  ]

  // Filter options
  const categoryOptions = [
    'All', 'Frontend Development', 'Backend Development', 'AI & Machine Learning',
    'DevOps', 'Mobile Development', 'Data Science', 'Cybersecurity',
    'Game Development', 'UI/UX Design', 'Database Management', 'Cloud Computing'
  ]
  const countryOptions = ['All', 'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'India', 'Japan', 'Brazil', 'Other']
  const pricingOptions = ['All', '$0-30', '$31-50', '$51-75', '$76-100', '$100+']
  const ratingOptions = ['All', '4.5+', '4.0+', '3.5+', '3.0+']
  const tierOptions = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert']
  const specialityOptions = ['All', 'Web Development', 'Mobile Apps', 'Machine Learning', 'Data Analysis', 'System Design', 'API Development', 'Database Design', 'DevOps', 'Security']
  const availabilityOptions = ['All', 'Available Now', 'Available Today', 'Available This Week', 'Available This Month']
  const languageOptions = ['All', 'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Portuguese', 'Russian', 'Arabic', 'Hindi']

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }



  const handleSortSelect = (option) => {
    setSortBy(option)
    setShowSortDropdown(false)
  }

  const handleBookNow = (solverId) => {
    navigate(`/sessions?book=${solverId}`)
  }

  const handleViewProfile = (solverId) => {
    navigate(`/profile/${solverId}`)
  }

  const handleGiftSession = (solver = null) => {
    setSelectedSolver(solver)
    setSelectedGiftAmount(null)
    setCustomGiftAmount('')
    setShowGiftModal(true)
  }

  const handleGiftAmountSelect = (amount) => {
    setSelectedGiftAmount(amount)
    setCustomGiftAmount('')
  }

  const handleCustomAmountChange = (e) => {
    const value = e.target.value
    if (value === '' || /^\d+$/.test(value)) {
      setCustomGiftAmount(value)
      setSelectedGiftAmount('custom')
    }
  }

  const processGift = () => {
    const amount = selectedGiftAmount === 'custom' ? customGiftAmount : selectedGiftAmount
    if (!amount || (selectedGiftAmount === 'custom' && !customGiftAmount)) {
      alert('Please select or enter a gift amount')
      return
    }

    // Simulate gift processing
    const recipientName = selectedSolver ? selectedSolver.name : 'a solver'
    alert(`Successfully gifted $${amount} to ${recipientName}! They will be notified via email.`)
    setShowGiftModal(false)
    setSelectedGiftAmount(null)
    setCustomGiftAmount('')
    setSelectedSolver(null)
  }

  const handleSharePlatform = () => {
    setShowShareModal(true)
  }



  const handleExplorePodcasts = () => {
    navigate('/sessions?tab=podcast')
  }

  const handleLikeSolver = (solverId) => {
    setLikedSolvers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(solverId)) {
        newSet.delete(solverId)
      } else {
        newSet.add(solverId)
      }
      return newSet
    })
  }



  const handleExternalLink = (solverId) => {
    window.open(`/solver/${solverId}`, '_blank')
  }

  const resetFilters = () => {
    setSelectedCategoryFilter('All')
    setSelectedCountry('All')
    setSelectedPricing('All')
    setSelectedRating('All')
    setSelectedTier('All')
    setSelectedSpeciality('All')
    setSelectedAvailability('All')
    setSelectedLanguage('All')
    setSearchQuery('')
    setSortBy('Most Relevant')
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowSortDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={`min-h-screen overflow-x-hidden ${
      darkMode ? 'bg-[#00001a]' : 'bg-white'
    }`}>
      <div className="w-full max-w-none px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="min-w-0 flex-1">
            <h1 className={`text-lg sm:text-xl md:text-2xl font-bold truncate ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Discover Expert Solvers
            </h1>
            <p className={`text-xs sm:text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
              3 solvers available • 2 online now
            </p>
          </div>

        </div>

        {/* Search Bar */}
        <div className="mb-4 sm:mb-6">
          <div className="relative">
            <Search className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 ${
              darkMode ? 'text-gray-400' : 'text-[#00001a]/40'
            }`} size={18} />
            <input
              type="text"
              placeholder="Search by name, skills, topics, or expertise..."
              value={searchQuery}
              onChange={handleSearch}
              className={`w-full pl-10 sm:pl-12 pr-4 md:pr-32 py-2.5 sm:py-3 rounded-lg border text-sm focus:outline-none ${
                darkMode
                  ? 'bg-[#00001a] border-gray-800 text-white placeholder-white/60 focus:border-gray-700'
                  : 'bg-white border-[#00001a]/20 text-[#00001a] placeholder-[#00001a]/40 focus:border-[#00001a]/40 focus:shadow-lg'
              }`}
              style={darkMode ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              } : {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                } else {
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
                }
              }}
              onBlur={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }
              }}
            />
            <div className="hidden md:flex absolute right-3 top-1/2 transform -translate-y-1/2 items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded border text-sm font-medium ${
                    darkMode
                      ? 'bg-[#00001a] border-gray-800 text-white'
                      : 'border-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/5 hover:shadow-lg'
                  } ${showFilters ? (darkMode ? 'bg-[#00001a] border-gray-700' : 'bg-[#00001a]/5') : ''}`}
                  style={darkMode ? {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  } : {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (darkMode) {
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                    } else {
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (darkMode) {
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                    } else {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                >
                  <Filter size={14} />
                  Filters
                  <ChevronDown size={14} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div className="relative dropdown-container">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded border text-sm font-medium ${
                    darkMode
                      ? 'bg-[#00001a] border-gray-800 text-white'
                      : 'border-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/5 hover:shadow-lg'
                  } ${showSortDropdown ? (darkMode ? 'bg-[#00001a] border-gray-700' : 'bg-[#00001a]/5') : ''}`}
                  style={darkMode ? {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  } : {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (darkMode) {
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                    } else {
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (darkMode) {
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                    } else {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                >
                  {sortBy}
                  <ChevronDown size={14} className={`transform transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Sort Dropdown */}
                {showSortDropdown && (
                  <div
                    className={`absolute right-0 top-full mt-2 w-48 rounded-lg border z-50 ${
                      darkMode
                        ? 'bg-[#00001a] border-gray-800'
                        : 'bg-white border-[#00001a]/20'
                    }`}
                    style={darkMode ? {
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    } : {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleSortSelect(option)}
                        className={`w-full text-left px-4 py-2 text-sm first:rounded-t-lg last:rounded-b-lg ${
                          sortBy === option
                            ? (darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a] text-white')
                            : (darkMode
                                ? 'text-white hover:bg-white/10'
                                : 'text-[#00001a] hover:bg-[#00001a]/5')
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Filter Buttons */}
          <div className="flex md:hidden items-center gap-2 mt-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium flex-1 justify-center ${
                darkMode
                  ? 'bg-[#00001a] border-gray-800 text-white'
                  : 'border-[#00001a]/20 text-[#00001a]'
              } ${showFilters ? (darkMode ? 'bg-[#00001a] border-gray-700' : 'bg-[#00001a]/5') : ''}`}
            >
              <Filter size={16} />
              Filters
              <ChevronDown size={16} className={`transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium flex-1 justify-center ${
                darkMode
                  ? 'bg-[#00001a] border-gray-800 text-white'
                  : 'border-[#00001a]/20 text-[#00001a]'
              } ${showSortDropdown ? (darkMode ? 'bg-[#00001a] border-gray-700' : 'bg-[#00001a]/5') : ''}`}
            >
              <span className="truncate">{sortBy}</span>
              <ChevronDown size={16} className={`transform transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              darkMode
                ? 'bg-white/3 border-white/20'
                : 'bg-white border-[#00001a]/20'
            }`}
            style={darkMode ? {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Advanced Filters
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className={`p-1 rounded transition-all duration-200 ${
                  darkMode
                    ? 'text-gray-400 hover:text-white hover:bg-white/10'
                    : 'text-[#00001a]/60 hover:text-[#00001a] hover:bg-[#00001a]/5'
                }`}
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`}>
                  Category
                </label>
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className={`w-full px-3 py-2 rounded border text-sm transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-white/20 text-white focus:border-white/40 focus:bg-[#00001a]/90'
                      : 'bg-white border-[#00001a]/20 text-[#00001a] focus:border-[#00001a]/40'
                  } focus:outline-none`}
                  style={darkMode ? { colorScheme: 'dark' } : {}}
                >
                  {categoryOptions.map(option => (
                    <option
                      key={option}
                      value={option}
                      className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`}>
                  Country
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className={`w-full px-3 py-2 rounded border text-sm transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-white/20 text-white focus:border-white/40 focus:bg-[#00001a]/90'
                      : 'bg-white border-[#00001a]/20 text-[#00001a] focus:border-[#00001a]/40'
                  } focus:outline-none`}
                  style={darkMode ? { colorScheme: 'dark' } : {}}
                >
                  {countryOptions.map(option => (
                    <option
                      key={option}
                      value={option}
                      className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pricing Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`}>
                  Pricing (per hour)
                </label>
                <select
                  value={selectedPricing}
                  onChange={(e) => setSelectedPricing(e.target.value)}
                  className={`w-full px-3 py-2 rounded border text-sm transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-white/20 text-white focus:border-white/40 focus:bg-[#00001a]/90'
                      : 'bg-white border-[#00001a]/20 text-[#00001a] focus:border-[#00001a]/40'
                  } focus:outline-none`}
                  style={darkMode ? { colorScheme: 'dark' } : {}}
                >
                  {pricingOptions.map(option => (
                    <option
                      key={option}
                      value={option}
                      className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`}>
                  Rating
                </label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className={`w-full px-3 py-2 rounded border text-sm transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-white/20 text-white focus:border-white/40 focus:bg-[#00001a]/90'
                      : 'bg-white border-[#00001a]/20 text-[#00001a] focus:border-[#00001a]/40'
                  } focus:outline-none`}
                  style={darkMode ? { colorScheme: 'dark' } : {}}
                >
                  {ratingOptions.map(option => (
                    <option
                      key={option}
                      value={option}
                      className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tier Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`}>
                  Tier
                </label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className={`w-full px-3 py-2 rounded border text-sm transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-white/20 text-white focus:border-white/40 focus:bg-[#00001a]/90'
                      : 'bg-white border-[#00001a]/20 text-[#00001a] focus:border-[#00001a]/40'
                  } focus:outline-none`}
                  style={darkMode ? { colorScheme: 'dark' } : {}}
                >
                  {tierOptions.map(option => (
                    <option
                      key={option}
                      value={option}
                      className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Speciality Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`}>
                  Speciality
                </label>
                <select
                  value={selectedSpeciality}
                  onChange={(e) => setSelectedSpeciality(e.target.value)}
                  className={`w-full px-3 py-2 rounded border text-sm transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-white/20 text-white focus:border-white/40 focus:bg-[#00001a]/90'
                      : 'bg-white border-[#00001a]/20 text-[#00001a] focus:border-[#00001a]/40'
                  } focus:outline-none`}
                  style={darkMode ? { colorScheme: 'dark' } : {}}
                >
                  {specialityOptions.map(option => (
                    <option
                      key={option}
                      value={option}
                      className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`}>
                  Availability
                </label>
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className={`w-full px-3 py-2 rounded border text-sm transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-white/20 text-white focus:border-white/40 focus:bg-[#00001a]/90'
                      : 'bg-white border-[#00001a]/20 text-[#00001a] focus:border-[#00001a]/40'
                  } focus:outline-none`}
                  style={darkMode ? { colorScheme: 'dark' } : {}}
                >
                  {availabilityOptions.map(option => (
                    <option
                      key={option}
                      value={option}
                      className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`}>
                  Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className={`w-full px-3 py-2 rounded border text-sm transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-white/20 text-white focus:border-white/40 focus:bg-[#00001a]/90'
                      : 'bg-white border-[#00001a]/20 text-[#00001a] focus:border-[#00001a]/40'
                  } focus:outline-none`}
                  style={darkMode ? { colorScheme: 'dark' } : {}}
                >
                  {languageOptions.map(option => (
                    <option
                      key={option}
                      value={option}
                      className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                onClick={resetFilters}
                className={`px-4 py-2 rounded border text-sm transition-all duration-300 ${
                  darkMode
                    ? 'border-white/20 text-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/10'
                    : 'border-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/5 hover:shadow-lg'
                }`}
              >
                Reset Filters
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className={`px-4 py-2 rounded text-sm font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/20 text-white hover:bg-white/30 hover:shadow-lg hover:shadow-white/10'
                    : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 hover:shadow-lg'
                }`}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}



        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 auto-rows-fr">
          <button
            onClick={() => handleGiftSession()}
            className={`p-4 rounded-lg text-left min-w-0 w-full h-full flex flex-col justify-center ${
              darkMode
                ? 'bg-white/3 border border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:border-blue-400/30 transition-all duration-300'
                : 'bg-white border border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`p-2 rounded-lg flex-shrink-0 ${
                darkMode ? 'bg-pink-500/20' : 'bg-[#00001a]/10'
              }`}>
                <Gift className={`${darkMode ? 'text-pink-400' : 'text-[#00001a]'}`} size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className={`font-semibold text-base truncate ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Gift / Donate
                </h3>
                <p className={`text-sm line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                  Support solvers you appreciate
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={handleSharePlatform}
            className={`p-4 rounded-lg text-left min-w-0 w-full h-full flex flex-col justify-center ${
              darkMode
                ? 'bg-white/3 border border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:border-blue-400/30 transition-all duration-300'
                : 'bg-white border border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`p-2 rounded-lg flex-shrink-0 ${
                darkMode ? 'bg-blue-500/20' : 'bg-[#00001a]/10'
              }`}>
                <Share2 className={`${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className={`font-semibold text-base truncate ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Share Platform
                </h3>
                <p className={`text-sm line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                  Invite friends to join
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={handleExplorePodcasts}
            className={`p-4 rounded-lg text-left min-w-0 w-full h-full flex flex-col justify-center ${
              darkMode
                ? 'bg-white/3 border border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:border-blue-400/30 transition-all duration-300'
                : 'bg-white border border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`p-2 rounded-lg flex-shrink-0 ${
                darkMode ? 'bg-purple-500/20' : 'bg-[#00001a]/10'
              }`}>
                <Headphones className={`${darkMode ? 'text-purple-400' : 'text-[#00001a]'}`} size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className={`font-semibold text-base truncate ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Browse Podcasts
                </h3>
                <p className={`text-sm line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                  Discover solver library
                </p>
              </div>

            </div>
          </button>
        </div>

        {/* Discover Solvers Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Discover Solvers
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
              Showing 1-3 of 3 results
            </p>
          </div>
        </div>

        {/* Solver Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {solvers.map((solver) => (
            <div
              key={solver.id}
              className={`p-6 rounded-lg cursor-pointer min-w-0 w-full h-full flex flex-col ${
                darkMode
                  ? 'bg-white/3 border border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:border-blue-400/30 transition-all duration-300'
                  : 'bg-white border border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
              }`}
            >
              {/* Header with Avatar and Status */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                    darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-[#00001a]/10 text-[#00001a]'
                  }`}>
                    <User size={20} className="md:hidden" />
                    <User size={24} className="hidden md:block" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {solver.name}
                      </h3>
                      {solver.verified && (
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          darkMode ? 'bg-blue-500/20' : 'bg-[#00001a]/10'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            darkMode ? 'bg-blue-400' : 'bg-[#00001a]'
                          }`} />
                        </div>
                      )}
                    </div>
                    <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                      {solver.title}
                    </p>
                    <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                      {solver.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleGiftSession(solver)}
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-yellow-500/20' : 'bg-[#00001a]/10'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      darkMode ? 'bg-yellow-400' : 'bg-[#00001a]'
                    }`} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLikeSolver(solver.id)
                    }}
                    className={`transition-all duration-200 ${
                      likedSolvers.has(solver.id)
                        ? (darkMode ? 'text-red-400' : 'text-red-500')
                        : (darkMode ? 'text-gray-400 hover:text-red-400' : 'text-[#00001a]/40 hover:text-red-500')
                    }`}
                    title={likedSolvers.has(solver.id) ? 'Unlike' : 'Like'}
                  >
                    <Heart size={16} className={likedSolvers.has(solver.id) ? 'fill-current' : ''} />
                  </button>
                </div>
              </div>

              {/* Rating and Stats */}
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className={`w-4 h-4 ${darkMode ? 'text-blue-400 fill-blue-400' : 'text-[#00001a] fill-[#00001a]'}`} />
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {solver.rating}
                  </span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                    ({solver.reviews})
                  </span>
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                  {solver.sessions} sessions
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                  {solver.responseTime}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {solver.skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        darkMode
                          ? 'bg-white/10 text-white'
                          : 'bg-[#00001a]/10 text-[#00001a]'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                  {solver.skills.length > 4 && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      darkMode ? 'bg-white/10 text-gray-400' : 'bg-[#00001a]/10 text-[#00001a]/60'
                    }`}>
                      +{solver.skills.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Location and Rate */}
              <div className="flex items-center justify-between mb-4">
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                  📍 {solver.location}
                </div>
                <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  ${solver.hourlyRate}/hr
                </div>
              </div>

              {/* Availability Status */}
              <div className="mb-4">
                {solver.availableNow ? (
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-green-500' : 'bg-[#00001a]'}`}></div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`}>
                      Available now
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-500' : 'bg-[#00001a]/40'}`}></div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                      Available in {solver.availableIn}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleBookNow(solver.id)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                    solver.availableNow
                      ? (darkMode
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-[#00001a] text-white')
                      : (darkMode
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-[#00001a] text-white')
                  }`}
                >
                  {solver.availableNow ? 'Book Now' : 'Book'}
                </button>
                <button
                  onClick={() => handleViewProfile(solver.id)}
                  className={`px-4 py-2 rounded-lg border ${
                    darkMode
                      ? 'border-white/20 text-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 transition-all duration-300'
                      : 'border-gray-200 text-[#00001a] shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                  }`}
                >
                  View
                </button>
                <button
                  onClick={() => handleExternalLink(solver.id)}
                  className={`px-3 py-2 rounded-lg border ${
                    darkMode
                      ? 'border-white/20 text-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 transition-all duration-300'
                      : 'border-gray-200 text-[#00001a] shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                  }`}
                >
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Podcast Section */}
        {showPodcastSection && (
          <div id="podcast-section" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Browse Podcasts
              </h2>
              <button
                onClick={() => setShowPodcastSection(false)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-[#00001a]/10 text-[#00001a]'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  id: 1,
                  title: "Tech Career Insights",
                  host: "Sarah Johnson",
                  description: "Weekly discussions about career growth in tech",
                  duration: "45 min",
                  episodes: 127,
                  category: "Career"
                },
                {
                  id: 2,
                  title: "Code & Coffee",
                  host: "Mike Chen",
                  description: "Deep dives into programming concepts and best practices",
                  duration: "30 min",
                  episodes: 89,
                  category: "Programming"
                },
                {
                  id: 3,
                  title: "Startup Stories",
                  host: "Alex Rivera",
                  description: "Interviews with successful entrepreneurs and founders",
                  duration: "60 min",
                  episodes: 156,
                  category: "Business"
                },
                {
                  id: 4,
                  title: "Design Thinking",
                  host: "Emma Davis",
                  description: "Exploring UX/UI design principles and trends",
                  duration: "40 min",
                  episodes: 73,
                  category: "Design"
                },
                {
                  id: 5,
                  title: "Data Science Daily",
                  host: "Dr. James Wilson",
                  description: "Latest trends and techniques in data science",
                  duration: "25 min",
                  episodes: 201,
                  category: "Data Science"
                },
                {
                  id: 6,
                  title: "AI Frontiers",
                  host: "Lisa Park",
                  description: "Cutting-edge developments in artificial intelligence",
                  duration: "50 min",
                  episodes: 94,
                  category: "AI/ML"
                }
              ].map((podcast) => (
                <div
                  key={podcast.id}
                  className={`p-6 rounded-lg border ${
                    darkMode
                      ? 'bg-[#00001a] border-white/20'
                      : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      darkMode ? 'bg-purple-500/20' : 'bg-[#00001a]/10'
                    }`}>
                      <Headphones className={`${darkMode ? 'text-purple-400' : 'text-[#00001a]'}`} size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {podcast.title}
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                        by {podcast.host}
                      </p>
                    </div>
                  </div>

                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-[#00001a]/80'}`}>
                    {podcast.description}
                  </p>

                  <div className="flex items-center justify-between text-xs mb-4">
                    <span className={`px-2 py-1 rounded ${
                      darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-[#00001a]/10 text-[#00001a]'
                    }`}>
                      {podcast.category}
                    </span>
                    <div className={`${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                      {podcast.episodes} episodes • {podcast.duration}
                    </div>
                  </div>

                  <button className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                  }`}>
                    Listen Now
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                Showing 6 of 24 podcasts
              </p>
            </div>
          </div>
        )}

        {/* Gift/Donate Modal */}
        {showGiftModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div
              className={`max-w-md w-full rounded-lg border p-6 ${
                darkMode
                  ? 'bg-[#00001a] border-white/20'
                  : 'bg-white border-[#00001a]/20'
              }`}
              style={darkMode ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              } : {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {selectedSolver ? `Gift to ${selectedSolver.name}` : 'Gift a Session'}
                </h3>
                <button
                  onClick={() => setShowGiftModal(false)}
                  className={`p-1 rounded transition-all duration-200 ${
                    darkMode
                      ? 'text-gray-400 hover:text-white hover:bg-white/10'
                      : 'text-[#00001a]/60 hover:text-[#00001a] hover:bg-[#00001a]/5'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>

              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                {selectedSolver
                  ? 'Show your appreciation by gifting credits to this solver.'
                  : 'Gift learning credits to friends or support solvers you appreciate.'
                }
              </p>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleGiftAmountSelect(25)}
                  className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                    selectedGiftAmount === 25
                      ? (darkMode
                          ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                          : 'bg-[#00001a]/10 border-[#00001a] text-[#00001a]')
                      : (darkMode
                          ? 'bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
                          : 'border-[#00001a]/20 hover:bg-[#00001a]/5 hover:shadow-lg')
                  }`}
                >
                  <div className={`font-medium ${
                    selectedGiftAmount === 25
                      ? (darkMode ? 'text-blue-400' : 'text-[#00001a]')
                      : (darkMode ? 'text-white' : 'text-[#00001a]')
                  }`}>
                    $25 Gift Credit
                  </div>
                  <div className={`text-sm ${
                    selectedGiftAmount === 25
                      ? (darkMode ? 'text-blue-400/70' : 'text-[#00001a]/70')
                      : (darkMode ? 'text-gray-400' : 'text-[#00001a]/60')
                  }`}>
                    Perfect for a quick consultation
                  </div>
                </button>

                <button
                  onClick={() => handleGiftAmountSelect(50)}
                  className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                    selectedGiftAmount === 50
                      ? (darkMode
                          ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                          : 'bg-[#00001a]/10 border-[#00001a] text-[#00001a]')
                      : (darkMode
                          ? 'border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10'
                          : 'border-[#00001a]/20 hover:bg-[#00001a]/5 hover:shadow-lg')
                  }`}
                >
                  <div className={`font-medium ${
                    selectedGiftAmount === 50
                      ? (darkMode ? 'text-blue-400' : 'text-[#00001a]')
                      : (darkMode ? 'text-white' : 'text-[#00001a]')
                  }`}>
                    $50 Gift Credit
                  </div>
                  <div className={`text-sm ${
                    selectedGiftAmount === 50
                      ? (darkMode ? 'text-blue-400/70' : 'text-[#00001a]/70')
                      : (darkMode ? 'text-gray-400' : 'text-[#00001a]/60')
                  }`}>
                    Great for a full session
                  </div>
                </button>

                <div className={`w-full p-3 rounded-lg border ${
                  selectedGiftAmount === 'custom'
                    ? (darkMode
                        ? 'bg-blue-500/20 border-blue-500/50'
                        : 'bg-[#00001a]/10 border-[#00001a]')
                    : (darkMode
                        ? 'border-white/20'
                        : 'border-[#00001a]/20')
                }`}>
                  <div className={`font-medium mb-2 ${
                    selectedGiftAmount === 'custom'
                      ? (darkMode ? 'text-blue-400' : 'text-[#00001a]')
                      : (darkMode ? 'text-white' : 'text-[#00001a]')
                  }`}>
                    Custom Amount
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg ${
                      selectedGiftAmount === 'custom'
                        ? (darkMode ? 'text-blue-400' : 'text-[#00001a]')
                        : (darkMode ? 'text-white' : 'text-[#00001a]')
                    }`}>$</span>
                    <input
                      type="text"
                      value={customGiftAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="Enter amount"
                      className={`flex-1 px-3 py-2 rounded border text-sm transition-all duration-300 ${
                        darkMode
                          ? 'bg-[#00001a] border-white/20 text-white placeholder-white/50 focus:border-blue-400/50'
                          : 'bg-white border-[#00001a]/20 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50'
                      } focus:outline-none`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowGiftModal(false)}
                  className={`flex-1 py-2 px-4 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'border-white/20 text-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/10'
                      : 'border-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/5 hover:shadow-lg'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={processGift}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/20 text-white hover:bg-white/30 hover:shadow-lg hover:shadow-white/10'
                      : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 hover:shadow-lg'
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Share Platform Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div
              className={`max-w-md w-full rounded-lg border p-6 ${
                darkMode
                  ? 'bg-[#00001a] border-white/20'
                  : 'bg-white border-[#00001a]/20'
              }`}
              style={darkMode ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              } : {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Share Platform
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className={`p-1 rounded transition-all duration-200 ${
                    darkMode
                      ? 'text-gray-400 hover:text-white hover:bg-white/10'
                      : 'text-[#00001a]/60 hover:text-[#00001a] hover:bg-[#00001a]/5'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>

              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                Invite friends to join our platform and discover amazing solvers.
              </p>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.origin)}
                  className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                    darkMode
                      ? 'border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10'
                      : 'border-[#00001a]/20 hover:bg-[#00001a]/5 hover:shadow-lg'
                  }`}
                >
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Copy Link
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                    Share via link
                  </div>
                </button>

                <button
                  onClick={() => window.open(`mailto:?subject=Check out this amazing platform&body=I found this great platform for connecting with expert solvers: ${window.location.origin}`)}
                  className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                    darkMode
                      ? 'border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10'
                      : 'border-[#00001a]/20 hover:bg-[#00001a]/5 hover:shadow-lg'
                  }`}
                >
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Share via Email
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-[#00001a]/60'}`}>
                    Send invitation email
                  </div>
                </button>
              </div>

              <button
                onClick={() => setShowShareModal(false)}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/20 text-white hover:bg-white/30 hover:shadow-lg hover:shadow-white/10'
                    : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 hover:shadow-lg'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        )}


      </div>
    </div>
  )
}

export default SeekerExplore

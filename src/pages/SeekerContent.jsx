import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import {
  BookOpen, Play, Video, FileText, Link, Bookmark, Filter, Search, User, Heart,
  MessageCircle, Share2, ChevronRight, Star, Clock, Eye, ThumbsUp, ThumbsDown,
  Flag, UserPlus, UserCheck, FolderPlus, Folder, Settings, Grid, List,
  Calendar, Award, Shield, Crown, Zap, Gift, ShoppingBag,
  ExternalLink, Copy, MoreHorizontal, X, Plus, ChevronDown, ChevronUp,
  Layers, Tag, TrendingUp, Users, Bell, BellOff, Volume2, VolumeX,
  CreditCard, Wallet, DollarSign
} from 'lucide-react'

const SeekerContent = ({ darkMode }) => {
  const navigate = useNavigate()
  const { t } = useLanguage()

  // Main state management
  const [activeTab, setActiveTab] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSubCategory, setSelectedSubCategory] = useState('All')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showContentModal, setShowContentModal] = useState(false)
  const [selectedContent, setSelectedContent] = useState(null)
  const [showSolverProfile, setShowSolverProfile] = useState(false)
  const [selectedSolver, setSelectedSolver] = useState(null)
  const [showFolderModal, setShowFolderModal] = useState(false)
  const [showSaveFolderModal, setShowSaveFolderModal] = useState(false)
  const [contentToSave, setContentToSave] = useState(null)
  const [showFolderMenu, setShowFolderMenu] = useState(null)
  const [showRenameModal, setShowRenameModal] = useState(false)
  const [folderToRename, setFolderToRename] = useState(null)
  const [newFolderName, setNewFolderName] = useState('')
  const [showReportModal, setShowReportModal] = useState(false)
  const [showCommentsModal, setShowCommentsModal] = useState(false)
  const [selectedContentForComments, setSelectedContentForComments] = useState(null)
  const [comments, setComments] = useState({})
  const [newComment, setNewComment] = useState('')
  const [showShareModal, setShowShareModal] = useState(false)
  const [selectedContentForShare, setSelectedContentForShare] = useState(null)
  const [showMoreOptionsMenu, setShowMoreOptionsMenu] = useState(null) // stores content id for which menu is open
  const [showMerchandiseModal, setShowMerchandiseModal] = useState(false)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentItem, setSelectedPaymentItem] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    walletType: 'paypal',
    email: '',
    phone: ''
  })
  const [selectedMerchandise, setSelectedMerchandise] = useState(null)

  const [merchandiseForm, setMerchandiseForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Course',
    imageUrl: '',
    tags: ''
  })

  // Content interaction states
  const [likedContent, setLikedContent] = useState(new Set())
  const [savedContent, setSavedContent] = useState(new Set())
  const [followedChannels, setFollowedChannels] = useState(new Set())
  const [customFolders, setCustomFolders] = useState([
    { id: 'folder1', name: 'React Tutorials', count: 12 },
    { id: 'folder2', name: 'Node.js Resources', count: 8 },
    { id: 'folder3', name: 'AI/ML Papers', count: 15 }
  ])
  const [selectedFolderType, setSelectedFolderType] = useState('Saved Content')

  const tabs = [
    { id: 'all', label: 'All Content', icon: BookOpen, count: 156 },
    { id: 'reels', label: 'Reels', icon: Play, count: 45 },
    { id: 'videos', label: 'Videos', icon: Video, count: 32 },
    { id: 'live', label: 'Live', icon: Users, count: 3 },
    { id: 'resources', label: 'Resources', icon: FileText, count: 28 },
    { id: 'snippets', label: 'Snippets', icon: Layers, count: 67 },
    { id: 'blogs', label: 'Blogs/Links', icon: Link, count: 89 },
    { id: 'saved', label: 'Saved', icon: Bookmark, count: 23 },
    { id: 'following', label: 'Following', icon: UserCheck, count: 12 },
    { id: 'folders', label: 'Folders', icon: Folder, count: customFolders.length }
  ]

  // Enhanced categories with subcategories
  const categories = {
    'All': ['All'],
    'Programming': [
      'All', 'Frontend', 'Backend', 'Mobile', 'DevOps', 'Data Science', 'AI/ML',
      'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
      'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
      'iOS Development', 'Android Development', 'Flutter', 'React Native',
      'Machine Learning', 'Deep Learning', 'Neural Networks', 'Computer Vision',
      'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'CI/CD'
    ],
    'Design': [
      'All', 'UI/UX', 'Graphic Design', 'Web Design', 'Product Design', 'Branding',
      'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'InDesign',
      'Logo Design', 'Typography', 'Color Theory', 'Design Systems',
      'Wireframing', 'Prototyping', 'User Research', 'Usability Testing',
      'Motion Graphics', 'Animation', '3D Design', 'Print Design'
    ],
    'Business': [
      'All', 'Marketing', 'Sales', 'Finance', 'Management', 'Entrepreneurship',
      'Digital Marketing', 'Social Media', 'SEO', 'Content Marketing', 'Email Marketing',
      'Lead Generation', 'Sales Funnel', 'CRM', 'Customer Service',
      'Project Management', 'Team Leadership', 'Strategic Planning',
      'Accounting', 'Investment', 'Cryptocurrency', 'Stock Market',
      'Startup', 'Business Plan', 'Funding', 'Venture Capital'
    ],
    'Technology': [
      'All', 'Cloud Computing', 'Cybersecurity', 'Blockchain', 'IoT', 'AR/VR',
      'Artificial Intelligence', 'Quantum Computing', 'Edge Computing',
      'Network Security', 'Ethical Hacking', 'Penetration Testing',
      'Smart Contracts', 'DeFi', 'NFTs', 'Web3',
      'Smart Home', 'Wearables', 'Sensors', 'Automation',
      'Virtual Reality', 'Augmented Reality', 'Mixed Reality', 'Metaverse'
    ],
    'Education': [
      'All', 'Tutorials', 'Courses', 'Workshops', 'Certifications', 'Study Materials',
      'Online Learning', 'E-learning', 'MOOCs', 'Bootcamps',
      'Programming Tutorials', 'Design Courses', 'Business Training',
      'Language Learning', 'Mathematics', 'Science', 'History',
      'Professional Development', 'Skill Building', 'Career Guidance',
      'Exam Preparation', 'Academic Writing', 'Research Methods'
    ],
    'Creative': [
      'All', 'Photography', 'Video Editing', 'Music', 'Writing', 'Art',
      'Portrait Photography', 'Landscape Photography', 'Street Photography',
      'Adobe Premiere', 'Final Cut Pro', 'DaVinci Resolve', 'After Effects',
      'Music Production', 'Audio Engineering', 'Songwriting', 'Music Theory',
      'Creative Writing', 'Copywriting', 'Technical Writing', 'Blogging',
      'Digital Art', 'Traditional Art', 'Painting', 'Drawing', 'Sculpture'
    ],
    'Lifestyle': [
      'All', 'Health', 'Fitness', 'Travel', 'Food', 'Personal Development',
      'Nutrition', 'Mental Health', 'Wellness', 'Meditation', 'Yoga',
      'Weight Training', 'Cardio', 'Home Workouts', 'Sports',
      'Travel Planning', 'Budget Travel', 'Solo Travel', 'Adventure Travel',
      'Cooking', 'Baking', 'Healthy Recipes', 'International Cuisine',
      'Self Improvement', 'Productivity', 'Time Management', 'Goal Setting',
      'Relationships', 'Communication', 'Leadership', 'Confidence Building'
    ]
  }

  // Comprehensive mock data for all content types and categories
  const mockContent = [
    // Frontend - React Content
    {
      id: 1,
      type: 'reel',
      title: 'React Hooks in 60 seconds',
      creator: {
        name: 'Alex Chen',
        id: 'solver1',
        avatar: null,
        verified: true,
        rating: 4.9,
        followers: '12.5K',
        badges: ['Expert', 'Top Contributor']
      },
      duration: '0:58',
      views: '12.5K',
      likes: 245,
      comments: 23,
      shares: 12,
      category: 'Frontend',
      subCategory: 'React',
      tags: ['React', 'Hooks', 'useState', 'useEffect'],
      thumbnail: null,
      transcript: 'In this quick tutorial, we\'ll cover the most important React hooks...',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: true,
      downloadable: false
    },
    // Frontend - Vue Content
    {
      id: 2,
      type: 'video',
      title: 'Vue 3 Composition API Complete Guide',
      creator: {
        name: 'Marie Dubois',
        id: 'solver2',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '8.9K',
        badges: ['Vue Expert', 'Frontend Specialist']
      },
      duration: '32:15',
      views: '6.8K',
      likes: 189,
      comments: 45,
      shares: 28,
      category: 'Frontend',
      subCategory: 'Vue',
      tags: ['Vue', 'Composition API', 'Vue 3', 'JavaScript'],
      thumbnail: null,
      transcript: 'Welcome to this comprehensive Vue 3 Composition API tutorial...',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: true,
      hasTranscript: true,
      downloadable: true
    },
    // Frontend - Angular Content
    {
      id: 3,
      type: 'snippet',
      title: 'Angular Reactive Forms Validation',
      creator: {
        name: 'James Wilson',
        id: 'solver3',
        avatar: null,
        verified: true,
        rating: 4.7,
        followers: '5.2K',
        badges: ['Angular Expert']
      },
      duration: null,
      views: '3.4K',
      likes: 78,
      comments: 12,
      shares: 23,
      category: 'Frontend',
      subCategory: 'Angular',
      tags: ['Angular', 'Reactive Forms', 'Validation', 'TypeScript'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: true,
      codeLanguage: 'typescript'
    },
    // Frontend - JavaScript Content
    {
      id: 4,
      type: 'reel',
      title: 'JavaScript ES2024 Features',
      creator: {
        name: 'Sofia Rodriguez',
        id: 'solver4',
        avatar: null,
        verified: true,
        rating: 4.9,
        followers: '15.3K',
        badges: ['JavaScript Expert', 'ES6+ Specialist']
      },
      duration: '0:45',
      views: '18.2K',
      likes: 456,
      comments: 67,
      shares: 89,
      category: 'Frontend',
      subCategory: 'JavaScript',
      tags: ['JavaScript', 'ES2024', 'Modern JS', 'Features'],
      thumbnail: null,
      transcript: 'Let\'s explore the latest JavaScript ES2024 features...',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: true,
      downloadable: false
    },
    // Frontend - TypeScript Content
    {
      id: 5,
      type: 'resource',
      title: 'TypeScript Advanced Types Cheat Sheet',
      creator: {
        name: 'David Kim',
        id: 'solver5',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '9.1K',
        badges: ['TypeScript Expert', 'Resource Creator']
      },
      duration: null,
      views: '7.6K',
      likes: 234,
      comments: 34,
      shares: 67,
      category: 'Frontend',
      subCategory: 'TypeScript',
      tags: ['TypeScript', 'Advanced Types', 'Cheat Sheet', 'Reference'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: true,
      fileSize: '1.8 MB',
      fileType: 'PDF'
    },
    // Frontend - CSS Content
    {
      id: 6,
      type: 'video',
      title: 'CSS Grid vs Flexbox: When to Use What',
      creator: {
        name: 'Emma Thompson',
        id: 'solver6',
        avatar: null,
        verified: true,
        rating: 4.7,
        followers: '11.4K',
        badges: ['CSS Expert', 'UI/UX Designer']
      },
      duration: '28:42',
      views: '9.3K',
      likes: 298,
      comments: 56,
      shares: 45,
      category: 'Frontend',
      subCategory: 'CSS',
      tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
      thumbnail: null,
      transcript: 'Today we\'ll dive deep into CSS Grid and Flexbox...',
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: true,
      hasTranscript: true,
      downloadable: true
    },
    // Frontend - HTML Content
    {
      id: 7,
      type: 'blog',
      title: 'Semantic HTML5: Best Practices for 2024',
      creator: {
        name: 'Michael Brown',
        id: 'solver7',
        avatar: null,
        verified: true,
        rating: 4.6,
        followers: '6.8K',
        badges: ['HTML Expert', 'Accessibility Advocate']
      },
      duration: '6 min read',
      views: '4.2K',
      likes: 123,
      comments: 28,
      shares: 34,
      category: 'Frontend',
      subCategory: 'HTML',
      tags: ['HTML5', 'Semantic HTML', 'Accessibility', 'Best Practices'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: false,
      externalLink: 'https://blog.example.com/semantic-html5-2024'
    },

    // Backend - Node.js Content
    {
      id: 8,
      type: 'video',
      title: 'Complete Node.js Tutorial',
      creator: {
        name: 'Sarah Davis',
        id: 'solver8',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '8.2K',
        badges: ['Backend Expert', 'Node.js Specialist']
      },
      duration: '45:30',
      views: '8.2K',
      likes: 189,
      comments: 45,
      shares: 28,
      category: 'Backend',
      subCategory: 'Node.js',
      tags: ['Node.js', 'Express', 'MongoDB', 'API'],
      thumbnail: null,
      transcript: 'Welcome to this comprehensive Node.js tutorial...',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: true,
      hasTranscript: true,
      downloadable: true
    },
    // Backend - Python Content
    {
      id: 9,
      type: 'reel',
      title: 'Python FastAPI in 60 seconds',
      creator: {
        name: 'Dr. Priya Sharma',
        id: 'solver9',
        avatar: null,
        verified: true,
        rating: 4.9,
        followers: '13.7K',
        badges: ['Python Expert', 'API Specialist']
      },
      duration: '0:59',
      views: '15.6K',
      likes: 387,
      comments: 52,
      shares: 78,
      category: 'Backend',
      subCategory: 'Python',
      tags: ['Python', 'FastAPI', 'REST API', 'Backend'],
      thumbnail: null,
      transcript: 'FastAPI is the fastest way to build APIs with Python...',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: true,
      downloadable: false
    },
    // Backend - Java Content
    {
      id: 10,
      type: 'video',
      title: 'Spring Boot Microservices Architecture',
      creator: {
        name: 'Robert Johnson',
        id: 'solver10',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '10.3K',
        badges: ['Java Expert', 'Spring Specialist', 'Enterprise Architect']
      },
      duration: '52:18',
      views: '7.9K',
      likes: 234,
      comments: 67,
      shares: 45,
      category: 'Backend',
      subCategory: 'Java',
      tags: ['Java', 'Spring Boot', 'Microservices', 'Architecture'],
      thumbnail: null,
      transcript: 'In this comprehensive guide, we\'ll build microservices with Spring Boot...',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: true,
      hasTranscript: true,
      downloadable: true
    },
    // Backend - C# Content
    {
      id: 11,
      type: 'snippet',
      title: '.NET Core Web API with Entity Framework',
      creator: {
        name: 'Jennifer Martinez',
        id: 'solver11',
        avatar: null,
        verified: true,
        rating: 4.7,
        followers: '8.5K',
        badges: ['.NET Expert', 'Microsoft MVP']
      },
      duration: null,
      views: '5.4K',
      likes: 156,
      comments: 23,
      shares: 34,
      category: 'Backend',
      subCategory: 'C#',
      tags: ['C#', '.NET Core', 'Web API', 'Entity Framework'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: true,
      codeLanguage: 'csharp'
    },
    // Backend - Go Content
    {
      id: 12,
      type: 'resource',
      title: 'Go Concurrency Patterns Guide',
      creator: {
        name: 'Kevin Zhang',
        id: 'solver12',
        avatar: null,
        verified: true,
        rating: 4.9,
        followers: '6.2K',
        badges: ['Go Expert', 'Concurrency Specialist']
      },
      duration: null,
      views: '4.1K',
      likes: 98,
      comments: 15,
      shares: 27,
      category: 'Backend',
      subCategory: 'Go',
      tags: ['Go', 'Golang', 'Concurrency', 'Goroutines'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: true,
      fileSize: '3.2 MB',
      fileType: 'PDF'
    },
    // Backend - PHP Content
    {
      id: 13,
      type: 'blog',
      title: 'Laravel 10: What\'s New and Improved',
      creator: {
        name: 'Ahmed Hassan',
        id: 'solver13',
        avatar: null,
        verified: true,
        rating: 4.6,
        followers: '7.8K',
        badges: ['PHP Expert', 'Laravel Specialist']
      },
      duration: '8 min read',
      views: '6.3K',
      likes: 178,
      comments: 42,
      shares: 56,
      category: 'Backend',
      subCategory: 'PHP',
      tags: ['PHP', 'Laravel', 'Laravel 10', 'Framework'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: false,
      externalLink: 'https://blog.example.com/laravel-10-features'
    },
    // Backend - Ruby Content
    {
      id: 14,
      type: 'live',
      title: 'Live: Ruby on Rails API Development',
      creator: {
        name: 'Lisa Park',
        id: 'solver14',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '9.4K',
        badges: ['Ruby Expert', 'Rails Specialist', 'Live Coding']
      },
      duration: 'Live',
      views: '156',
      likes: 34,
      comments: 67,
      shares: 12,
      category: 'Backend',
      subCategory: 'Ruby',
      tags: ['Ruby', 'Rails', 'API', 'Live Coding'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(),
      isLive: true,
      isPremium: false,
      hasTranscript: false,
      downloadable: false
    },

    // AI/ML - Machine Learning Content
    {
      id: 15,
      type: 'video',
      title: 'Machine Learning Fundamentals Explained',
      creator: {
        name: 'Dr. Anna Kowalski',
        id: 'solver15',
        avatar: null,
        verified: true,
        rating: 4.9,
        followers: '18.2K',
        badges: ['AI/ML Expert', 'PhD Data Science', 'Research Scientist']
      },
      duration: '38:45',
      views: '12.4K',
      likes: 567,
      comments: 89,
      shares: 123,
      category: 'AI/ML',
      subCategory: 'Machine Learning',
      tags: ['Machine Learning', 'ML Fundamentals', 'Algorithms', 'Data Science'],
      thumbnail: null,
      transcript: 'Welcome to this comprehensive introduction to machine learning...',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: true,
      hasTranscript: true,
      downloadable: true
    },
    // AI/ML - Deep Learning Content
    {
      id: 16,
      type: 'reel',
      title: 'Neural Networks in 60 seconds',
      creator: {
        name: 'Marcus Chen',
        id: 'solver16',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '14.7K',
        badges: ['Deep Learning Expert', 'TensorFlow Specialist']
      },
      duration: '0:58',
      views: '22.1K',
      likes: 678,
      comments: 94,
      shares: 156,
      category: 'AI/ML',
      subCategory: 'Deep Learning',
      tags: ['Deep Learning', 'Neural Networks', 'AI', 'TensorFlow'],
      thumbnail: null,
      transcript: 'Neural networks are the backbone of modern AI...',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: true,
      downloadable: false
    },
    // AI/ML - NLP Content
    {
      id: 17,
      type: 'snippet',
      title: 'Text Classification with Transformers',
      creator: {
        name: 'Dr. Raj Patel',
        id: 'solver17',
        avatar: null,
        verified: true,
        rating: 4.9,
        followers: '11.3K',
        badges: ['NLP Expert', 'Transformer Specialist', 'Research Lead']
      },
      duration: null,
      views: '8.7K',
      likes: 234,
      comments: 45,
      shares: 67,
      category: 'AI/ML',
      subCategory: 'NLP',
      tags: ['NLP', 'Transformers', 'Text Classification', 'BERT'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: true,
      hasTranscript: false,
      downloadable: true,
      codeLanguage: 'python'
    },
    // AI/ML - Computer Vision Content
    {
      id: 18,
      type: 'resource',
      title: 'Computer Vision Algorithms Handbook',
      creator: {
        name: 'Dr. Elena Volkov',
        id: 'solver18',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '9.8K',
        badges: ['Computer Vision Expert', 'OpenCV Specialist']
      },
      duration: null,
      views: '6.2K',
      likes: 189,
      comments: 28,
      shares: 45,
      category: 'AI/ML',
      subCategory: 'Computer Vision',
      tags: ['Computer Vision', 'OpenCV', 'Image Processing', 'Algorithms'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: true,
      fileSize: '5.4 MB',
      fileType: 'PDF'
    },
    // AI/ML - Data Science Content
    {
      id: 19,
      type: 'blog',
      title: 'Data Science Pipeline Best Practices',
      creator: {
        name: 'Sarah Kim',
        id: 'solver19',
        avatar: null,
        verified: true,
        rating: 4.7,
        followers: '12.6K',
        badges: ['Data Science Expert', 'Pipeline Architect']
      },
      duration: '12 min read',
      views: '9.4K',
      likes: 298,
      comments: 56,
      shares: 78,
      category: 'AI/ML',
      subCategory: 'Data Science',
      tags: ['Data Science', 'Pipeline', 'Best Practices', 'MLOps'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: false,
      externalLink: 'https://blog.example.com/data-science-pipeline'
    },

    // DevOps - Docker Content
    {
      id: 20,
      type: 'video',
      title: 'Docker Containerization Complete Guide',
      creator: {
        name: 'Thomas Mueller',
        id: 'solver20',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '13.5K',
        badges: ['DevOps Expert', 'Docker Specialist', 'Container Architect']
      },
      duration: '41:22',
      views: '10.7K',
      likes: 345,
      comments: 67,
      shares: 89,
      category: 'DevOps',
      subCategory: 'Docker',
      tags: ['Docker', 'Containerization', 'DevOps', 'Deployment'],
      thumbnail: null,
      transcript: 'In this comprehensive Docker tutorial, we\'ll cover everything...',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: true,
      hasTranscript: true,
      downloadable: true
    },
    // DevOps - Kubernetes Content
    {
      id: 21,
      type: 'reel',
      title: 'Kubernetes Pods Explained',
      creator: {
        name: 'Maria Santos',
        id: 'solver21',
        avatar: null,
        verified: true,
        rating: 4.9,
        followers: '16.2K',
        badges: ['Kubernetes Expert', 'Cloud Native Specialist']
      },
      duration: '0:55',
      views: '19.3K',
      likes: 567,
      comments: 78,
      shares: 123,
      category: 'DevOps',
      subCategory: 'Kubernetes',
      tags: ['Kubernetes', 'Pods', 'Container Orchestration', 'K8s'],
      thumbnail: null,
      transcript: 'Kubernetes pods are the smallest deployable units...',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: true,
      downloadable: false
    },
    // DevOps - AWS Content
    {
      id: 22,
      type: 'snippet',
      title: 'AWS Lambda Function with API Gateway',
      creator: {
        name: 'John Anderson',
        id: 'solver22',
        avatar: null,
        verified: true,
        rating: 4.7,
        followers: '11.8K',
        badges: ['AWS Expert', 'Cloud Architect', 'Serverless Specialist']
      },
      duration: null,
      views: '7.4K',
      likes: 198,
      comments: 34,
      shares: 56,
      category: 'DevOps',
      subCategory: 'AWS',
      tags: ['AWS', 'Lambda', 'API Gateway', 'Serverless'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: true,
      codeLanguage: 'javascript'
    },
    // DevOps - Azure Content
    {
      id: 23,
      type: 'resource',
      title: 'Azure DevOps Pipeline Templates',
      creator: {
        name: 'Rachel Green',
        id: 'solver23',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '9.7K',
        badges: ['Azure Expert', 'DevOps Pipeline Specialist']
      },
      duration: null,
      views: '5.9K',
      likes: 167,
      comments: 23,
      shares: 45,
      category: 'DevOps',
      subCategory: 'Azure',
      tags: ['Azure', 'DevOps', 'CI/CD', 'Pipeline Templates'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: true,
      fileSize: '2.1 MB',
      fileType: 'ZIP'
    },
    // DevOps - CI/CD Content
    {
      id: 24,
      type: 'blog',
      title: 'CI/CD Best Practices for Modern Teams',
      creator: {
        name: 'Carlos Rodriguez',
        id: 'solver24',
        avatar: null,
        verified: true,
        rating: 4.6,
        followers: '8.3K',
        badges: ['CI/CD Expert', 'DevOps Consultant']
      },
      duration: '10 min read',
      views: '6.8K',
      likes: 234,
      comments: 45,
      shares: 67,
      category: 'DevOps',
      subCategory: 'CI/CD',
      tags: ['CI/CD', 'DevOps', 'Best Practices', 'Automation'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: false,
      externalLink: 'https://blog.example.com/cicd-best-practices'
    },
    // DevOps - Monitoring Content
    {
      id: 25,
      type: 'live',
      title: 'Live: Setting up Prometheus Monitoring',
      creator: {
        name: 'Alex Petrov',
        id: 'solver25',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '12.1K',
        badges: ['Monitoring Expert', 'Prometheus Specialist', 'Live Coding']
      },
      duration: 'Live',
      views: '89',
      likes: 23,
      comments: 45,
      shares: 8,
      category: 'DevOps',
      subCategory: 'Monitoring',
      tags: ['Monitoring', 'Prometheus', 'Grafana', 'Live Setup'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(),
      isLive: true,
      isPremium: false,
      hasTranscript: false,
      downloadable: false
    },

    // Mobile - React Native Content
    {
      id: 26,
      type: 'video',
      title: 'React Native Navigation Complete Guide',
      creator: {
        name: 'Jessica Liu',
        id: 'solver26',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '14.3K',
        badges: ['React Native Expert', 'Mobile Developer']
      },
      duration: '35:17',
      views: '11.2K',
      likes: 398,
      comments: 67,
      shares: 89,
      category: 'Mobile',
      subCategory: 'React Native',
      tags: ['React Native', 'Navigation', 'Mobile App', 'Cross Platform'],
      thumbnail: null,
      transcript: 'In this comprehensive React Native navigation tutorial...',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: true,
      hasTranscript: true,
      downloadable: true
    },
    // Mobile - Flutter Content
    {
      id: 27,
      type: 'reel',
      title: 'Flutter Widgets in 60 seconds',
      creator: {
        name: 'Arjun Mehta',
        id: 'solver27',
        avatar: null,
        verified: true,
        rating: 4.9,
        followers: '17.6K',
        badges: ['Flutter Expert', 'Dart Specialist', 'Google Developer Expert']
      },
      duration: '0:59',
      views: '25.4K',
      likes: 789,
      comments: 123,
      shares: 167,
      category: 'Mobile',
      subCategory: 'Flutter',
      tags: ['Flutter', 'Widgets', 'Dart', 'Mobile UI'],
      thumbnail: null,
      transcript: 'Flutter widgets are the building blocks of your UI...',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: true,
      downloadable: false
    },
    // Mobile - iOS Content
    {
      id: 28,
      type: 'snippet',
      title: 'SwiftUI Custom Components',
      creator: {
        name: 'Ryan O\'Connor',
        id: 'solver28',
        avatar: null,
        verified: true,
        rating: 4.7,
        followers: '10.8K',
        badges: ['iOS Expert', 'SwiftUI Specialist', 'Apple Developer']
      },
      duration: null,
      views: '6.7K',
      likes: 234,
      comments: 34,
      shares: 56,
      category: 'Mobile',
      subCategory: 'iOS',
      tags: ['iOS', 'SwiftUI', 'Custom Components', 'Swift'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: true,
      codeLanguage: 'swift'
    },
    // Mobile - Android Content
    {
      id: 29,
      type: 'resource',
      title: 'Android Jetpack Compose Cheat Sheet',
      creator: {
        name: 'Priya Gupta',
        id: 'solver29',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '12.4K',
        badges: ['Android Expert', 'Jetpack Compose Specialist']
      },
      duration: null,
      views: '8.9K',
      likes: 267,
      comments: 45,
      shares: 78,
      category: 'Mobile',
      subCategory: 'Android',
      tags: ['Android', 'Jetpack Compose', 'Kotlin', 'UI Framework'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: true,
      fileSize: '1.9 MB',
      fileType: 'PDF'
    },
    // Mobile - Xamarin Content
    {
      id: 30,
      type: 'blog',
      title: 'Xamarin vs React Native: 2024 Comparison',
      creator: {
        name: 'Mark Thompson',
        id: 'solver30',
        avatar: null,
        verified: true,
        rating: 4.6,
        followers: '8.7K',
        badges: ['Xamarin Expert', 'Cross-Platform Specialist']
      },
      duration: '9 min read',
      views: '5.3K',
      likes: 156,
      comments: 28,
      shares: 45,
      category: 'Mobile',
      subCategory: 'Xamarin',
      tags: ['Xamarin', 'React Native', 'Cross Platform', 'Comparison'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: false,
      externalLink: 'https://blog.example.com/xamarin-vs-react-native'
    },

    // Database - SQL Content
    {
      id: 31,
      type: 'video',
      title: 'Advanced SQL Queries and Optimization',
      creator: {
        name: 'Dr. Robert Chen',
        id: 'solver31',
        avatar: null,
        verified: true,
        rating: 4.9,
        followers: '15.8K',
        badges: ['Database Expert', 'SQL Specialist', 'Performance Tuning']
      },
      duration: '47:33',
      views: '13.6K',
      likes: 456,
      comments: 78,
      shares: 123,
      category: 'Database',
      subCategory: 'SQL',
      tags: ['SQL', 'Database Optimization', 'Query Performance', 'Advanced SQL'],
      thumbnail: null,
      transcript: 'In this advanced SQL tutorial, we\'ll explore complex queries...',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: true,
      hasTranscript: true,
      downloadable: true
    },
    // Database - NoSQL Content
    {
      id: 32,
      type: 'reel',
      title: 'MongoDB vs PostgreSQL in 60 seconds',
      creator: {
        name: 'Nina Petersen',
        id: 'solver32',
        avatar: null,
        verified: true,
        rating: 4.7,
        followers: '11.9K',
        badges: ['NoSQL Expert', 'MongoDB Specialist']
      },
      duration: '0:58',
      views: '18.7K',
      likes: 534,
      comments: 89,
      shares: 145,
      category: 'Database',
      subCategory: 'NoSQL',
      tags: ['NoSQL', 'MongoDB', 'PostgreSQL', 'Database Comparison'],
      thumbnail: null,
      transcript: 'Choosing between MongoDB and PostgreSQL depends on...',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: true,
      downloadable: false
    },
    // Database - MongoDB Content
    {
      id: 33,
      type: 'snippet',
      title: 'MongoDB Aggregation Pipeline Examples',
      creator: {
        name: 'Hassan Ali',
        id: 'solver33',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '9.4K',
        badges: ['MongoDB Expert', 'Database Architect']
      },
      duration: null,
      views: '7.2K',
      likes: 198,
      comments: 34,
      shares: 56,
      category: 'Database',
      subCategory: 'MongoDB',
      tags: ['MongoDB', 'Aggregation Pipeline', 'NoSQL', 'Database Queries'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: true,
      codeLanguage: 'javascript'
    },
    // Database - PostgreSQL Content
    {
      id: 34,
      type: 'resource',
      title: 'PostgreSQL Performance Tuning Guide',
      creator: {
        name: 'Elena Kozlov',
        id: 'solver34',
        avatar: null,
        verified: true,
        rating: 4.9,
        followers: '13.2K',
        badges: ['PostgreSQL Expert', 'Database Performance Specialist']
      },
      duration: null,
      views: '9.8K',
      likes: 287,
      comments: 45,
      shares: 78,
      category: 'Database',
      subCategory: 'PostgreSQL',
      tags: ['PostgreSQL', 'Performance Tuning', 'Database Optimization', 'SQL'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: true,
      fileSize: '4.2 MB',
      fileType: 'PDF'
    },
    // Database - Redis Content
    {
      id: 35,
      type: 'blog',
      title: 'Redis Caching Strategies for High Performance',
      creator: {
        name: 'Yuki Tanaka',
        id: 'solver35',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '10.6K',
        badges: ['Redis Expert', 'Caching Specialist', 'Performance Engineer']
      },
      duration: '11 min read',
      views: '8.4K',
      likes: 245,
      comments: 56,
      shares: 89,
      category: 'Database',
      subCategory: 'Redis',
      tags: ['Redis', 'Caching', 'Performance', 'In-Memory Database'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: false,
      externalLink: 'https://blog.example.com/redis-caching-strategies'
    },

    // Security - Web Security Content
    {
      id: 36,
      type: 'video',
      title: 'Web Application Security Fundamentals',
      creator: {
        name: 'Dr. Sarah Mitchell',
        id: 'solver36',
        avatar: null,
        verified: true,
        rating: 4.9,
        followers: '16.7K',
        badges: ['Security Expert', 'CISSP', 'Ethical Hacker', 'Security Researcher']
      },
      duration: '52:18',
      views: '14.3K',
      likes: 567,
      comments: 89,
      shares: 134,
      category: 'Security',
      subCategory: 'Web Security',
      tags: ['Web Security', 'Application Security', 'OWASP', 'Cybersecurity'],
      thumbnail: null,
      transcript: 'Web application security is crucial in today\'s digital landscape...',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: true,
      hasTranscript: true,
      downloadable: true
    },
    // Security - Cryptography Content
    {
      id: 37,
      type: 'reel',
      title: 'Encryption Algorithms Explained',
      creator: {
        name: 'Marcus Weber',
        id: 'solver37',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '12.3K',
        badges: ['Cryptography Expert', 'Security Consultant']
      },
      duration: '0:57',
      views: '16.8K',
      likes: 445,
      comments: 67,
      shares: 98,
      category: 'Security',
      subCategory: 'Cryptography',
      tags: ['Cryptography', 'Encryption', 'Security Algorithms', 'Data Protection'],
      thumbnail: null,
      transcript: 'Encryption algorithms protect our data by transforming...',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: true,
      downloadable: false
    },
    // Security - Penetration Testing Content
    {
      id: 38,
      type: 'snippet',
      title: 'Ethical Hacking Scripts Collection',
      creator: {
        name: 'Alex Rodriguez',
        id: 'solver38',
        avatar: null,
        verified: true,
        rating: 4.7,
        followers: '8.9K',
        badges: ['Penetration Tester', 'Ethical Hacker', 'CEH']
      },
      duration: null,
      views: '6.5K',
      likes: 178,
      comments: 23,
      shares: 45,
      category: 'Security',
      subCategory: 'Penetration Testing',
      tags: ['Penetration Testing', 'Ethical Hacking', 'Security Scripts', 'Cybersecurity'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: true,
      hasTranscript: false,
      downloadable: true,
      codeLanguage: 'python'
    },
    // Security - OWASP Content
    {
      id: 39,
      type: 'resource',
      title: 'OWASP Top 10 Security Risks 2024',
      creator: {
        name: 'Jennifer Park',
        id: 'solver39',
        avatar: null,
        verified: true,
        rating: 4.9,
        followers: '14.5K',
        badges: ['OWASP Expert', 'Security Architect', 'Application Security']
      },
      duration: null,
      views: '11.7K',
      likes: 398,
      comments: 67,
      shares: 123,
      category: 'Security',
      subCategory: 'OWASP',
      tags: ['OWASP', 'Security Risks', 'Web Security', 'Application Security'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isLive: false,
      isPremium: false,
      hasTranscript: false,
      downloadable: true,
      fileSize: '3.7 MB',
      fileType: 'PDF'
    },
    // Security - Live Content
    {
      id: 40,
      type: 'live',
      title: 'Live: Ethical Hacking Workshop',
      creator: {
        name: 'Dr. Kevin Zhang',
        id: 'solver40',
        avatar: null,
        verified: true,
        rating: 4.8,
        followers: '18.9K',
        badges: ['Security Expert', 'Live Workshop Leader', 'Cybersecurity Trainer']
      },
      duration: 'Live',
      views: '267',
      likes: 45,
      comments: 123,
      shares: 23,
      category: 'Security',
      subCategory: 'Penetration Testing',
      tags: ['Ethical Hacking', 'Live Workshop', 'Cybersecurity', 'Hands-on Training'],
      thumbnail: null,
      transcript: null,
      createdAt: new Date(),
      isLive: true,
      isPremium: true,
      hasTranscript: false,
      downloadable: false
    }
  ]

  // Enhanced Merchandise data for buying
  const merchandiseItems = [
    {
      id: 1,
      title: 'SynapSolver Pro T-Shirt',
      price: 29.99,
      category: 'Apparel',
      description: 'Premium cotton t-shirt with the SynapSolver logo. Perfect for coding sessions and tech meetups.',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      inStock: true,
      rating: 4.8,
      reviews: 124,
      tags: ['clothing', 'cotton', 'logo', 'comfortable']
    },
    {
      id: 2,
      title: 'Mechanical Keyboard - RGB',
      price: 149.99,
      category: 'Hardware',
      description: 'Professional mechanical keyboard with RGB backlighting and Cherry MX switches. Perfect for developers.',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
      inStock: true,
      rating: 4.9,
      reviews: 89,
      tags: ['keyboard', 'mechanical', 'rgb', 'gaming', 'productivity']
    },
    {
      id: 3,
      title: 'Code & Coffee Mug',
      price: 19.99,
      category: 'Accessories',
      description: 'Ceramic mug with funny programming quotes. Holds 350ml of your favorite beverage.',
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop',
      inStock: true,
      rating: 4.6,
      reviews: 203,
      tags: ['mug', 'coffee', 'ceramic', 'programming', 'quotes']
    },
    {
      id: 4,
      title: 'Wireless Mouse - Ergonomic',
      price: 79.99,
      category: 'Hardware',
      description: 'Ergonomic wireless mouse with precision tracking. Designed for long coding sessions.',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
      inStock: true,
      rating: 4.7,
      reviews: 156,
      tags: ['mouse', 'wireless', 'ergonomic', 'precision']
    },
    {
      id: 5,
      title: 'Developer Hoodie',
      price: 59.99,
      category: 'Apparel',
      description: 'Comfortable hoodie with "Debug Mode: ON" print. Made from premium cotton blend.',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
      inStock: true,
      rating: 4.8,
      reviews: 91,
      tags: ['hoodie', 'cotton', 'debug', 'comfortable', 'programming']
    },
    {
      id: 6,
      title: 'USB-C Hub - 7-in-1',
      price: 89.99,
      category: 'Hardware',
      description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and more. Essential for modern laptops.',
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop',
      inStock: true,
      rating: 4.5,
      reviews: 67,
      tags: ['usb-c', 'hub', 'hdmi', 'adapter', 'connectivity']
    },
    {
      id: 7,
      title: 'Laptop Stand - Adjustable',
      price: 49.99,
      category: 'Accessories',
      description: 'Adjustable aluminum laptop stand for better ergonomics and cooling. Fits laptops up to 17 inches.',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
      inStock: true,
      rating: 4.7,
      reviews: 134,
      tags: ['laptop', 'stand', 'aluminum', 'ergonomic', 'cooling']
    },
    {
      id: 8,
      title: 'Blue Light Glasses',
      price: 39.99,
      category: 'Accessories',
      description: 'Anti-blue light glasses to reduce eye strain during long coding sessions. Stylish and effective.',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop',
      inStock: true,
      rating: 4.4,
      reviews: 78,
      tags: ['glasses', 'blue-light', 'eye-strain', 'health', 'protection']
    },
    {
      id: 9,
      title: 'Coding Sticker Pack',
      price: 12.99,
      category: 'Accessories',
      description: 'Pack of 50 programming and tech-themed stickers. Perfect for laptops, water bottles, and more.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      inStock: true,
      rating: 4.9,
      reviews: 245,
      tags: ['stickers', 'programming', 'laptop', 'decoration', 'tech']
    },
    {
      id: 10,
      title: 'Portable Monitor - 15.6"',
      price: 199.99,
      category: 'Hardware',
      description: 'Portable 15.6" monitor with USB-C connectivity. Perfect for dual-screen setups on the go.',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
      inStock: false,
      rating: 4.6,
      reviews: 52,
      tags: ['monitor', 'portable', 'usb-c', 'dual-screen', 'productivity']
    },
    {
      id: 11,
      title: 'Wireless Charging Pad',
      price: 34.99,
      category: 'Hardware',
      description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design for your desk.',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
      inStock: true,
      rating: 4.5,
      reviews: 98,
      tags: ['wireless', 'charging', 'qi', 'fast-charge', 'desk']
    },
    {
      id: 12,
      title: 'Tech Backpack - 15.6"',
      price: 79.99,
      category: 'Accessories',
      description: 'Professional tech backpack with laptop compartment, cable organizer, and USB charging port.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      inStock: true,
      rating: 4.7,
      reviews: 167,
      tags: ['backpack', 'laptop', 'organizer', 'usb', 'professional']
    }
  ]

  // Utility functions
  const formatViews = (views) => {
    if (typeof views === 'string') return views
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
    return views.toString()
  }

  const formatDuration = (duration) => {
    if (!duration || duration === 'Live') return duration
    return duration
  }

  const getTimeAgo = (date) => {
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`

    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths}mo ago`
  }

  // Content interaction handlers
  const handleLikeContent = (contentId) => {
    setLikedContent(prev => {
      const newSet = new Set(prev)
      if (newSet.has(contentId)) {
        newSet.delete(contentId)
      } else {
        newSet.add(contentId)
      }
      return newSet
    })
  }

  const handleSaveContent = (contentId) => {
    // Find the content to save
    const content = mockContent.find(c => c.id === contentId)
    if (content) {
      setContentToSave(content)
      setShowSaveFolderModal(true)
    }
  }

  const handleSaveToFolder = (folderId) => {
    if (contentToSave) {
      // Add to saved content
      setSavedContent(prev => new Set([...prev, contentToSave.id]))

      // Add to specific folder if selected
      if (folderId && folderId !== 'default') {
        setCustomFolders(prev => prev.map(folder =>
          folder.id === folderId
            ? { ...folder, count: folder.count + 1 }
            : folder
        ))
      }

      // Close modal and reset
      setShowSaveFolderModal(false)
      setContentToSave(null)

      // Show success message
      alert(`Content saved successfully!`)
    }
  }

  const handleRenameFolder = (folder) => {
    setFolderToRename(folder)
    setNewFolderName(folder.name)
    setShowRenameModal(true)
    setShowFolderMenu(null)
  }

  const handleConfirmRename = () => {
    if (folderToRename && newFolderName.trim()) {
      setCustomFolders(prev => prev.map(folder =>
        folder.id === folderToRename.id
          ? { ...folder, name: newFolderName.trim() }
          : folder
      ))
      setShowRenameModal(false)
      setFolderToRename(null)
      setNewFolderName('')
    }
  }

  const handleFollowChannel = (solverId) => {
    setFollowedChannels(prev => {
      const newSet = new Set(prev)
      if (newSet.has(solverId)) {
        newSet.delete(solverId)
      } else {
        newSet.add(solverId)
      }
      return newSet
    })
  }

  const handleBookSolver = (solverId) => {
    navigate(`/sessions?book=${solverId}`)
  }

  // Handle transcript viewing
  const handleViewTranscript = (content) => {
    if (content.hasTranscript && content.transcript) {
      setSelectedContent(content)
      setShowContentModal(true)
    } else {
      alert('Transcript not available for this content')
    }
  }

  // Close folder menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFolderMenu && !event.target.closest('.folder-menu-container')) {
        setShowFolderMenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showFolderMenu])

  // Handle keyboard shortcuts (Escape key)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (showPaymentModal) {
          setShowPaymentModal(false)
          setSelectedPaymentItem(null)
        }
        if (showRenameModal) {
          setShowRenameModal(false)
          setFolderToRename(null)
          setNewFolderName('')
        }
        if (showSaveFolderModal) {
          setShowSaveFolderModal(false)
          setContentToSave(null)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showPaymentModal, showRenameModal, showSaveFolderModal])

  // Handle tag click for filtering
  const handleTagClick = (tag) => {
    setSearchQuery(tag)
    // Find the category that contains this tag
    for (const [category, subcategories] of Object.entries(categories)) {
      if (subcategories.includes(tag) || category.toLowerCase().includes(tag.toLowerCase())) {
        setSelectedCategory(category)
        if (subcategories.includes(tag)) {
          setSelectedSubCategory(tag)
        }
        break
      }
    }
  }

  // Handle external link
  const handleExternalLink = (content) => {
    if (content.externalLink) {
      window.open(content.externalLink, '_blank', 'noopener,noreferrer')
    } else {
      alert('External link not available')
    }
  }

  // Handle like/react functionality
  const handleReactToContent = (contentId) => {
    setLikedContent(prev => {
      const newSet = new Set(prev)
      if (newSet.has(contentId)) {
        newSet.delete(contentId)
      } else {
        newSet.add(contentId)
      }
      return newSet
    })
  }

  const handleViewSolverProfile = (solver) => {
    setSelectedSolver(solver)
    setShowSolverProfile(true)
  }

  const handleContentClick = (content) => {
    setSelectedContent(content)
    setShowContentModal(true)
  }

  const handleReportContent = (content) => {
    setSelectedContent(content)
    setShowReportModal(true)
  }

  // Handle comments functionality
  const handleShowComments = (content) => {
    setSelectedContentForComments(content)
    setShowCommentsModal(true)
    // Initialize comments for this content if not exists
    if (!comments[content.id]) {
      setComments(prev => ({
        ...prev,
        [content.id]: [
          {
            id: 1,
            user: 'John Doe',
            avatar: null,
            text: 'Great content! Very helpful.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            likes: 3
          },
          {
            id: 2,
            user: 'Jane Smith',
            avatar: null,
            text: 'Thanks for sharing this. Learned a lot!',
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
            likes: 1
          }
        ]
      }))
    }
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedContentForComments) return

    const comment = {
      id: Date.now(),
      user: 'You',
      avatar: null,
      text: newComment.trim(),
      timestamp: new Date(),
      likes: 0
    }

    setComments(prev => ({
      ...prev,
      [selectedContentForComments.id]: [
        ...(prev[selectedContentForComments.id] || []),
        comment
      ]
    }))

    setNewComment('')
  }

  // Handle share functionality
  const handleShowShare = (content) => {
    setSelectedContentForShare(content)
    setShowShareModal(true)
  }

  const handleShareContent = (platform) => {
    if (!selectedContentForShare) return

    const shareUrl = `${window.location.origin}/content/${selectedContentForShare.id}`
    const shareText = `Check out this amazing content: ${selectedContentForShare.title}`

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(shareUrl).then(() => {
          alert('Link copied to clipboard!')
        }).catch(() => {
          alert('Failed to copy link')
        })
        break
      default:
        break
    }

    setShowShareModal(false)
  }

  // Handle more options menu
  const handleToggleMoreOptions = (contentId) => {
    setShowMoreOptionsMenu(prev => prev === contentId ? null : contentId)
  }

  // Close more options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowMoreOptionsMenu(null)
    }

    if (showMoreOptionsMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showMoreOptionsMenu])

  const handleMoreOptionAction = (action, content) => {
    switch (action) {
      case 'save':
        handleSaveContent(content.id)
        break
      case 'report':
        handleReportContent(content)
        break
      case 'share':
        handleShowShare(content)
        break
      case 'hide':
        // Implement hide functionality
        alert(`Content "${content.title}" hidden from your feed`)
        break
      case 'notInterested':
        // Implement not interested functionality
        alert(`We'll show you less content like "${content.title}"`)
        break
      default:
        break
    }
    setShowMoreOptionsMenu(null)
  }

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: `folder${Date.now()}`,
        name: newFolderName.trim(),
        type: selectedFolderType,
        count: 0
      }
      setCustomFolders(prev => [...prev, newFolder])
      setNewFolderName('')
      setSelectedFolderType('Saved Content')
      setShowFolderModal(false)
    }
  }

  // Merchandise handlers
  const handleAddToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      setCart(prev => prev.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart(prev => [...prev, { ...item, quantity: 1 }])
    }
    // Show success notification (you can implement a notification system)
    console.log(`"${item.title}" added to cart!`)
  }

  const handleRemoveFromCart = (itemId) => {
    const item = cart.find(cartItem => cartItem.id === itemId)
    setCart(prev => prev.filter(cartItem => cartItem.id !== itemId))
    if (item) {
      console.log(`"${item.title}" removed from cart`)
    }
  }

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId)
      return
    }
    setCart(prev => prev.map(cartItem =>
      cartItem.id === itemId
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    ))
  }

  const handleBuyNow = (item) => {
    console.log('Buy Now clicked for:', item.title) // Debug log
    setSelectedPaymentItem(item)
    setShowPaymentModal(true)
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    alert(`Proceeding to checkout for $${total.toFixed(2)}...`)
    // In a real app, this would redirect to a payment processor
    setCart([])
    setShowCart(false)
  }

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  // Payment processing functions
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)
    setPaymentForm({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      walletType: 'paypal',
      email: '',
      phone: ''
    })
  }

  const handlePaymentFormChange = (field, value) => {
    setPaymentForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const processPayment = () => {
    if (!selectedPaymentItem) return

    // Basic validation
    if (paymentMethod === 'card') {
      if (!paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv || !paymentForm.cardholderName) {
        alert('Please fill in all card details')
        return
      }
    } else if (paymentMethod === 'wallet') {
      if (!paymentForm.email) {
        alert('Please enter your email address')
        return
      }
    }

    // Simulate payment processing
    setTimeout(() => {
      alert(`Payment successful! You have purchased "${selectedPaymentItem.title}" for $${selectedPaymentItem.price}. A confirmation email will be sent shortly.`)
      setShowPaymentModal(false)
      setSelectedPaymentItem(null)
      setPaymentMethod('card')
      setPaymentForm({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        walletType: 'paypal',
        email: '',
        phone: ''
      })
    }, 1500)
  }

  // Filter content based on active tab and filters
  const filteredContent = mockContent.filter(content => {
    // Tab filtering
    if (activeTab !== 'all' && content.type !== activeTab) return false
    if (activeTab === 'saved' && !savedContent.has(content.id)) return false
    if (activeTab === 'following' && !followedChannels.has(content.creator.id)) return false

    // Category filtering
    if (selectedCategory !== 'All' && content.category !== selectedCategory) return false
    if (selectedSubCategory !== 'All' && content.subCategory !== selectedSubCategory) return false

    // Search filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        content.title.toLowerCase().includes(query) ||
        content.creator.name.toLowerCase().includes(query) ||
        content.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return true
  })

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-gray-50'
    }`}>
      <div className="p-4 sm:p-6 space-y-8 sm:space-y-12 max-w-full overflow-x-hidden">
        <div className="w-full">

        {/* Enhanced Header */}
        <div className={`p-4 sm:p-6 border relative overflow-hidden transition-all duration-300 ${
          darkMode
            ? 'rounded-lg bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
            : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div className="min-w-0 flex-1">
              <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Content Library
              </h2>
              <p className={`text-sm sm:text-base break-words ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Discover, learn, and save content from expert solvers
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Cart Button - Only show when there are items */}
              {cart.length > 0 && (
                <button
                  onClick={() => setShowCart(true)}
                  className={`relative px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium flex items-center gap-1 sm:gap-2 ${
                    darkMode
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : 'bg-[#00001a] text-white border border-[#00001a]'
                  }`}
                >
                  <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className={`absolute -top-2 -right-2 text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center ${
                    darkMode ? 'bg-red-500 text-white' : 'bg-white text-[#00001a] border border-[#00001a]'
                  }`}>
                    {getCartItemCount()}
                  </span>
                  <span className="hidden sm:inline">Cart</span>
                </button>
              )}

              {/* Merchandise Button */}
              <button
                onClick={() => setShowMerchandiseModal(true)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium flex items-center gap-1 sm:gap-2 ${
                  darkMode
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'bg-white text-[#00001a] border border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                }`}
              >
                <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Merchandise</span>
                <span className="sm:hidden">Shop</span>
              </button>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-white/50' : 'text-gray-400'
              }`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search content, topics, or creators..."
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#00001a] border-gray-800 text-white placeholder-white/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] focus:border-blue-500'
                    : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                }`}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                showFilters
                  ? (darkMode ? 'bg-[#00001a] text-blue-400 border border-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-[#00001a] text-white border border-[#00001a] shadow-[0_2px_4px_rgba(0,0,26,0.15)]')
                  : (darkMode ? 'bg-[#00001a] text-white border border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white text-[#00001a] border border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]')
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowFolderModal(true)}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                darkMode
                  ? 'bg-[#00001a] text-white border border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                  : 'bg-white text-[#00001a] border border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
              }`}
            >
              <FolderPlus className="w-4 h-4" />
              New Folder
            </button>
          </div>

          {/* Advanced Filters Panel - Moved to top for better dropdown positioning */}
          {showFilters && (
            <div className={`mb-6 p-4 rounded-lg border transition-all duration-300 ${
              darkMode ? 'bg-[#00001a] border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value)
                      setSelectedSubCategory('All')
                    }}
                    style={{
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-[#00001a] border-blue-500 text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] focus:border-blue-500'
                        : 'bg-white border-gray-200 text-[#00001a] focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                    }`}
                  >
                    {Object.keys(categories).map(category => (
                      <option key={category} value={category} className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Sub-Category Filter */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Sub-Category {categories[selectedCategory] && `(${categories[selectedCategory].length} options)`}
                  </label>
                  <select
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    style={{
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-[#00001a] border-blue-500 text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] focus:border-blue-500'
                        : 'bg-white border-gray-200 text-[#00001a] focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                    }`}
                  >
                    {(categories[selectedCategory] || ['All']).map(subCategory => (
                      <option key={subCategory} value={subCategory} className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}>{subCategory}</option>
                    ))}
                  </select>
                </div>

                {/* Content Type Filter */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Content Type
                  </label>
                  <select
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value)}
                    style={{
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-[#00001a] border-blue-500 text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] focus:border-blue-500'
                        : 'bg-white border-gray-200 text-[#00001a] focus:border-gray-300 focus:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                    }`}
                  >
                    {tabs.map(tab => (
                      <option key={tab.id} value={tab.id} className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}>{tab.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Tab Navigation - Moved below filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? (darkMode ? 'bg-[#00001a] text-blue-400 border border-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-[#00001a] text-white border border-[#00001a] shadow-[0_2px_4px_rgba(0,0,26,0.15)]')
                      : (darkMode ? 'bg-[#00001a] text-white/70 border border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white text-gray-600 border border-gray-200 hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]')
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id
                        ? (darkMode ? 'bg-[#00001a] border border-blue-500 text-blue-300' : 'bg-white/20 text-white/80')
                        : (darkMode ? 'bg-[#00001a] border border-gray-800 text-white/50' : 'bg-gray-100 text-gray-500 border border-gray-200')
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Enhanced Content Grid */}
        <div className="mt-8"></div>
        <div
          className={`p-4 sm:p-6 border relative overflow-hidden transition-all duration-300 ${
            darkMode
              ? 'rounded-lg bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
              : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}
          style={{ minHeight: '600px' }} // Ensure enough space for dropdowns to open downward
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h3 className={`text-base sm:text-lg font-semibold break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              {activeTab === 'all' && 'All Content'}
              {activeTab === 'reels' && 'Reels'}
              {activeTab === 'videos' && 'Videos'}
              {activeTab === 'live' && 'Live Sessions'}
              {activeTab === 'resources' && 'Resources'}
              {activeTab === 'snippets' && 'Code Snippets'}
              {activeTab === 'blogs' && 'Blogs & Links'}
              {activeTab === 'saved' && 'Saved Content'}
              {activeTab === 'following' && 'Following'}
              {activeTab === 'folders' && 'Custom Folders'}
              <span className={`ml-2 text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                ({filteredContent.length} items)
              </span>
            </h3>

            {/* Content Actions */}
            <div className="flex items-center gap-2">
              {activeTab === 'folders' && (
                <button
                  onClick={() => setShowFolderModal(true)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                    darkMode
                      ? 'bg-[#00001a] text-blue-400 border border-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                      : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90 shadow-[0_2px_4px_rgba(0,0,26,0.15)]'
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  New Folder
                </button>
              )}
            </div>
          </div>

          {/* Special handling for folders tab */}
          {activeTab === 'folders' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customFolders.map((folder) => (
                <div key={folder.id} className={`group p-6 rounded-lg border transition-all duration-300 cursor-pointer ${
                  darkMode
                    ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                    : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <Folder className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                    <div className="relative folder-menu-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowFolderMenu(showFolderMenu === folder.id ? null : folder.id)
                        }}
                        className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                          darkMode ? 'text-white/50 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {/* Folder Menu */}
                      {showFolderMenu === folder.id && (
                        <div className={`absolute right-0 top-8 w-48 rounded-lg border shadow-lg z-10 ${
                          darkMode ? 'bg-[#00001a] border-white/20' : 'bg-white border-gray-200'
                        }`}>
                          <div className="p-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRenameFolder(folder)
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                                darkMode ? 'text-white hover:bg-white/10' : 'text-[#00001a] hover:bg-gray-100'
                              }`}
                            >
                              Rename Folder
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                if (confirm(`Are you sure you want to delete "${folder.name}"?`)) {
                                  setCustomFolders(prev => prev.filter(f => f.id !== folder.id))
                                }
                                setShowFolderMenu(null)
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                                darkMode ? 'text-red-400 hover:bg-red-500/20' : 'text-[#00001a] hover:bg-gray-100'
                              }`}
                            >
                              Delete Folder
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {folder.name}
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                    {folder.count} items
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6' : 'space-y-3 sm:space-y-4'}`}>
              {filteredContent.map((content) => (
                <div key={content.id} className={`group rounded-lg border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full min-h-[350px] sm:min-h-[400px] ${
                  darkMode
                    ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                    : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
                }`} onClick={() => handleContentClick(content)}>

                  {/* Thumbnail/Preview */}
                  <div className={`aspect-video relative flex items-center justify-center ${
                    darkMode ? 'bg-[#00001a] border-b border-gray-800' : 'bg-gray-100 border-b border-gray-200'
                  }`}>
                    {content.type === 'reel' && <Play className={`w-12 h-12 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />}
                    {content.type === 'video' && <Video className={`w-12 h-12 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />}
                    {content.type === 'live' && (
                      <div className="relative">
                        <Users className={`w-12 h-12 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />
                        <div className="absolute -top-2 -right-2 px-2 py-1 rounded text-xs font-bold bg-red-500 text-white">
                          LIVE
                        </div>
                      </div>
                    )}
                    {content.type === 'resource' && <FileText className={`w-12 h-12 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />}
                    {content.type === 'snippet' && <Layers className={`w-12 h-12 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />}
                    {content.type === 'blog' && <Link className={`w-12 h-12 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />}

                    {/* Duration overlay */}
                    {content.duration && content.duration !== 'Live' && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-medium bg-black/70 text-white">
                        {content.duration}
                      </div>
                    )}

                    {/* Premium badge */}
                    {content.isPremium && (
                      <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 ${
                        darkMode ? 'bg-[#00001a] border border-yellow-500 text-yellow-400' : 'bg-[#00001a]/10 text-[#00001a]'
                      }`}>
                        <Crown className="w-3 h-3" />
                        PRO
                      </div>
                    )}
                  </div>

                  {/* Content Info */}
                  <div className="p-4 sm:p-6 flex flex-col flex-1 justify-between">
                    {/* Main Content */}
                    <div className="flex-1">
                      {/* Title */}
                      <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {content.title}
                      </h3>

                      {/* Description */}
                      <p className={`text-sm mb-4 line-clamp-3 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        {content.description || 'Deep dive into modern programming concepts and best practices.'}
                      </p>

                      {/* Category and Type */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`text-sm font-medium ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                          {content.category} • {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {content.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                              darkMode ? 'bg-[#00001a] border border-gray-800 text-white/70' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm mb-4 gap-2">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className={`flex items-center gap-1 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            <Eye className="w-4 h-4" />
                            {formatViews(content.views)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleLikeContent(content.id)
                            }}
                            className={`flex items-center gap-1 transition-colors duration-200 ${
                              likedContent.has(content.id)
                                ? (darkMode ? 'text-white hover:text-white/80' : 'text-[#00001a] hover:text-[#00001a]/80')
                                : (darkMode ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-[#00001a]')
                            }`}
                          >
                            <Heart
                              className={`w-4 h-4 ${likedContent.has(content.id) ? 'fill-current' : ''}`}
                            />
                            {content.likes + (likedContent.has(content.id) ? 1 : 0)}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShowComments(content)
                            }}
                            className={`flex items-center gap-1 transition-colors duration-200 ${
                              darkMode ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-[#00001a]'
                            }`}
                          >
                            <MessageCircle className="w-4 h-4" />
                            {content.comments}
                          </button>
                        </div>
                        <span className={`${darkMode ? 'text-white/60' : 'text-gray-500'} text-xs sm:text-sm`}>
                          {getTimeAgo(content.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons - Always at bottom */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLikeContent(content.id)
                        }}
                        className={`flex-1 min-w-[70px] px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                          likedContent.has(content.id)
                            ? (darkMode ? 'bg-[#00001a] text-white border-gray-800' : 'bg-gray-100 text-[#00001a] border-gray-300')
                            : (darkMode ? 'border-gray-800 text-white hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-gray-300 text-gray-700 hover:bg-gray-50')
                        }`}
                      >
                        Like
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleShowShare(content)
                        }}
                        className={`flex-1 min-w-[70px] px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          darkMode
                            ? 'bg-[#00001a] text-white'
                            : 'bg-[#00001a] text-white'
                        }`}
                      >
                        Share
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSaveContent(content.id)
                        }}
                        className={`flex-1 min-w-[70px] px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                          savedContent.has(content.id)
                            ? (darkMode ? 'bg-[#00001a] text-white border-gray-800' : 'bg-gray-100 text-[#00001a] border-gray-300')
                            : (darkMode ? 'border-gray-800 text-white hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-gray-300 text-gray-700 hover:bg-gray-50')
                        }`}
                      >
                        {savedContent.has(content.id) ? 'Saved' : 'Save'}
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Content Features Overview */}
        <div className={`group p-4 sm:p-6 border transition-all duration-300 relative overflow-hidden ${
          darkMode
            ? 'rounded-lg bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
            : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
        }`}>
          <h3 className={`text-base sm:text-lg font-semibold mb-4 sm:mb-6 break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            Content Platform Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm">
            <div>
              <h4 className={`font-medium mb-2 sm:mb-3 flex items-center gap-2 break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                <Search className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="min-w-0">Content Discovery</span>
              </h4>
              <ul className={`space-y-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                <li className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-[#00001a]'}`} />
                  Categorized Content with Sub-Topics
                </li>
                <li className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-[#00001a]'}`} />
                  Advanced Content Filters
                </li>
                <li className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-[#00001a]'}`} />
                  Channel Follow & Following System
                </li>
                <li className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-[#00001a]'}`} />
                  Custom Folder Organization
                </li>
              </ul>
            </div>
            <div>
              <h4 className={`font-medium mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                <Users className="w-4 h-4" />
                Interaction Features
              </h4>
              <ul className={`space-y-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                <li className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-green-400' : 'bg-[#00001a]'}`} />
                  Solver Profiles with Book & Save
                </li>
                <li className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-green-400' : 'bg-[#00001a]'}`} />
                  Comments, Badges & Reactions
                </li>
                <li className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-green-400' : 'bg-[#00001a]'}`} />
                  Content Reporting System
                </li>
                <li className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-green-400' : 'bg-[#00001a]'}`} />
                  Subscription-based Access
                </li>
              </ul>
            </div>
            <div>
              <h4 className={`font-medium mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                <Gift className="w-4 h-4" />
                Premium Features
              </h4>
              <ul className={`space-y-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                <li className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-yellow-400' : 'bg-[#00001a]'}`} />
                  Transcripts & References
                </li>
                <li className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-yellow-400' : 'bg-[#00001a]'}`} />
                  Downloadable Resources
                </li>
                <li className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-yellow-400' : 'bg-[#00001a]'}`} />
                  Exclusive Merchandise
                </li>
                <li className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-yellow-400' : 'bg-[#00001a]'}`} />
                  Live Session Access
                </li>
              </ul>
            </div>
          </div>
        </div>

        </div>
      </div>

      {/* Content Detail Modal */}
      {showContentModal && selectedContent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
            darkMode ? 'bg-[#00001a]' : 'bg-white'
          }`}>
            <div className={`p-6 border-b ${darkMode ? 'border-white/20' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {selectedContent.title}
                </h3>
                <button
                  onClick={() => setShowContentModal(false)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Content preview area */}
              <div className={`aspect-video rounded-lg mb-6 flex items-center justify-center ${
                darkMode ? 'bg-white/5' : 'bg-gray-100 border border-gray-200'
              }`}>
                {selectedContent.type === 'reel' && <Play className={`w-16 h-16 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />}
                {selectedContent.type === 'video' && <Video className={`w-16 h-16 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />}
                {selectedContent.type === 'live' && <Users className={`w-16 h-16 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />}
                {selectedContent.type === 'resource' && <FileText className={`w-16 h-16 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />}
                {selectedContent.type === 'snippet' && <Layers className={`w-16 h-16 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />}
                {selectedContent.type === 'blog' && <Link className={`w-16 h-16 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />}
              </div>

              {/* Content details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-100 text-[#00001a] border border-gray-200'
                    }`}>
                      {selectedContent.creator.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {selectedContent.creator.name}
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        {selectedContent.creator.followers} followers
                      </p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <button
                        onClick={() => handleBookSolver(selectedContent.creator.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          darkMode
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                            : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90 shadow-[0_2px_4px_rgba(0,0,26,0.15)]'
                        }`}
                      >
                        Book Session
                      </button>
                      <button
                        onClick={() => handleSaveContent(selectedContent.id)}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          savedContent.has(selectedContent.id)
                            ? (darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-200 text-[#00001a]')
                            : (darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${savedContent.has(selectedContent.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {selectedContent.transcript && (
                    <div className={`p-4 rounded-lg mb-4 ${
                      darkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'
                    }`}>
                      <h5 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Transcript
                      </h5>
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        {selectedContent.transcript}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <div className={`p-4 rounded-lg ${
                    darkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <h5 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Content Details
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={darkMode ? 'text-white/60' : 'text-gray-500'}>Views:</span>
                        <span className={darkMode ? 'text-white' : 'text-[#00001a]'}>{formatViews(selectedContent.views)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={darkMode ? 'text-white/60' : 'text-gray-500'}>Likes:</span>
                        <span className={darkMode ? 'text-white' : 'text-[#00001a]'}>{selectedContent.likes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={darkMode ? 'text-white/60' : 'text-gray-500'}>Duration:</span>
                        <span className={darkMode ? 'text-white' : 'text-[#00001a]'}>{selectedContent.duration || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={darkMode ? 'text-white/60' : 'text-gray-500'}>Category:</span>
                        <span className={darkMode ? 'text-white' : 'text-[#00001a]'}>{selectedContent.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={darkMode ? 'text-white/60' : 'text-gray-500'}>Created:</span>
                        <span className={darkMode ? 'text-white' : 'text-[#00001a]'}>{getTimeAgo(selectedContent.createdAt)}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-4">
                      <h6 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>Tags</h6>
                      <div className="flex flex-wrap gap-1">
                        {selectedContent.tags.map((tag, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              handleTagClick(tag)
                              setShowContentModal(false)
                            }}
                            className={`px-2 py-1 rounded text-xs transition-all duration-300 hover:scale-105 ${
                              darkMode
                                ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-[#00001a]/10 hover:text-[#00001a]'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Solver Profile Modal */}
      {showSolverProfile && selectedSolver && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg ${
            darkMode ? 'bg-[#00001a]' : 'bg-white'
          }`}>
            <div className={`p-6 border-b ${darkMode ? 'border-white/20' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Solver Profile
                </h3>
                <button
                  onClick={() => setShowSolverProfile(false)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
                  darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-200 text-[#00001a]'
                }`}>
                  {selectedSolver.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {selectedSolver.name}
                    </h4>
                    {selectedSolver.verified && (
                      <Shield className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`flex items-center gap-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      <Star className="w-4 h-4 fill-current" />
                      {selectedSolver.rating}
                    </span>
                    <span className={darkMode ? 'text-white/70' : 'text-gray-600'}>
                      {selectedSolver.followers} followers
                    </span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              {selectedSolver.badges && selectedSolver.badges.length > 0 && (
                <div className="mb-6">
                  <h5 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Badges & Achievements
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedSolver.badges.map((badge, index) => (
                      <span key={index} className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        darkMode ? 'bg-white/10 text-white/80 border border-white/20' : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}>
                        <Award className="w-4 h-4 inline mr-1" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleBookSolver(selectedSolver.id)
                    setShowSolverProfile(false)
                  }}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                      : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90'
                  }`}
                >
                  Book Session
                </button>
                <button
                  onClick={() => {
                    handleFollowChannel(selectedSolver.id)
                  }}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    followedChannels.has(selectedSolver.id)
                      ? (darkMode ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-200 text-[#00001a] border border-gray-300')
                      : (darkMode ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200')
                  }`}
                >
                  {followedChannels.has(selectedSolver.id) ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Folder Management Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-lg ${
            darkMode ? 'bg-[#00001a]' : 'bg-white'
          }`}>
            <div className={`p-6 border-b ${darkMode ? 'border-white/20' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Create New Folder
                </h3>
                <button
                  onClick={() => {
                    setShowFolderModal(false)
                    setNewFolderName('')
                    setSelectedFolderType('Saved Content')
                  }}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Folder Name
                </label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter folder name..."
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/50'
                      : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500'
                  }`}
                />
              </div>

              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Folder Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Saved Solvers', 'Saved Reels', 'Saved Content', 'Saved Blogs'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedFolderType(type)}
                      className={`p-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedFolderType === type
                          ? (darkMode
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : 'bg-[#00001a] text-white border border-[#00001a]')
                          : (darkMode
                              ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                              : 'bg-gray-100 text-[#00001a] border border-gray-300 hover:bg-gray-200')
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowFolderModal(false)
                    setNewFolderName('')
                    setSelectedFolderType('Saved Content')
                  }}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                      : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateFolder}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                      : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90'
                  }`}
                >
                  Create Folder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Content Modal */}
      {showReportModal && selectedContent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-lg ${
            darkMode ? 'bg-[#00001a]' : 'bg-white'
          }`}>
            <div className={`p-6 border-b ${darkMode ? 'border-white/20' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Report Content
                </h3>
                <button
                  onClick={() => setShowReportModal(false)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Why are you reporting this content?
                </h4>
                <p className={`text-sm mb-4 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  "{selectedContent.title}" by {selectedContent.creator.name}
                </p>
              </div>

              <div className="space-y-2 mb-6">
                {[
                  'Duplicate Content (Impersonation)',
                  'Inappropriate Content',
                  'Copyright Violation',
                  'Spam or Misleading',
                  'Other'
                ].map((reason) => (
                  <label key={reason} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="reportReason"
                      className={`w-4 h-4 ${
                        darkMode ? 'text-blue-400' : 'text-[#00001a]'
                      }`}
                    />
                    <span className={`text-sm ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {reason}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Additional Details (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide more details about the issue..."
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/50'
                      : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500'
                  }`}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowReportModal(false)}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                      : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle report submission
                    setShowReportModal(false)
                  }}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                      : 'bg-red-600 text-white border border-red-600 hover:bg-red-700'
                  }`}
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tech Merchandise Store Modal */}
      {showMerchandiseModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-lg border ${
            darkMode ? 'bg-[#00001a] border-white/20' : 'bg-white border-gray-200'
          }`}>
            <div className={`p-6 border-b ${darkMode ? 'border-white/10' : 'border-[#00001a]/10'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Tech Merchandise Store
                  </h3>
                  <p className={`mt-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    Premium tech gear and accessories for developers
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowMerchandiseModal(false)
                    setMerchandiseForm({
                      title: '',
                      description: '',
                      price: '',
                      category: 'Course',
                      imageUrl: '',
                      tags: ''
                    })
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-[#00001a]/70 hover:text-[#00001a] hover:bg-[#00001a]/10'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mode Toggle */}
              <div className="flex mt-4">
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] text-blue-400 border-2 border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                      : 'bg-[#00001a] text-white border-2 border-[#00001a]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 inline mr-2" />
                  Buy Merchandise
                </button>

              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {(
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {merchandiseItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'border-white/10 hover:border-white/20 bg-white/5'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    {/* Product Image */}
                    <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x400/6366f1/white?text=' + encodeURIComponent(item.title.split(' ')[0])
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      <div>
                        <h4 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {item.title}
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                          {item.description}
                        </p>
                      </div>

                      {/* Rating and Reviews */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(item.rating)
                                  ? darkMode ? 'text-white/70 fill-white/70' : 'text-[#00001a] fill-current'
                                  : darkMode ? 'text-gray-300' : 'text-[#00001a]/30'
                              }`}
                            />
                          ))}
                        </div>
                        <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                          {item.rating} ({item.reviews} reviews)
                        </span>
                      </div>

                      {/* Price and Stock */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            ${item.price}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.inStock
                              ? darkMode
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-[#00001a]/10 text-[#00001a]'
                              : darkMode
                                ? 'bg-red-500/20 text-red-300'
                                : 'bg-[#00001a]/20 text-[#00001a]/70'
                          }`}>
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.inStock}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                            darkMode
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30'
                              : 'bg-white text-[#00001a] border border-[#00001a]/30 hover:bg-[#00001a]/5'
                          }`}
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleBuyNow(item)}
                          disabled={!item.inStock}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                            darkMode
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30'
                              : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90'
                          }`}
                        >
                          Buy Now
                        </button>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded-full text-xs ${
                              darkMode
                                ? 'bg-white/10 text-white/60'
                                : 'bg-[#00001a]/10 text-[#00001a]/60'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full max-h-[90vh] rounded-lg border overflow-hidden ${
            darkMode ? 'bg-[#00001a] border-white/20' : 'bg-white border-[#00001a]/20'
          }`}>
            <div className={`p-6 border-b ${darkMode ? 'border-white/10' : 'border-[#00001a]/10'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Shopping Cart ({getCartItemCount()} items)
                  </h3>
                  <p className={`mt-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    Review your items before checkout
                  </p>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-[#00001a]/70 hover:text-[#00001a] hover:bg-[#00001a]/10'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className={`mb-4 ${darkMode ? 'text-white/30' : 'text-[#00001a]/30'}`}>
                    <ShoppingBag className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Your cart is empty
                  </h3>
                  <p className={`${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    Add some awesome tech gear to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg border ${
                        darkMode ? 'border-white/10 bg-white/5' : 'border-[#00001a]/10 bg-[#00001a]/5'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64x64/6366f1/white?text=' + encodeURIComponent(item.title.split(' ')[0])
                          }}
                        />
                        <div className="flex-1">
                          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {item.title}
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                            ${item.price} each
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              darkMode
                                ? 'bg-white/10 text-white hover:bg-white/20'
                                : 'bg-[#00001a]/10 text-[#00001a] hover:bg-[#00001a]/20'
                            }`}
                          >
                            -
                          </button>
                          <span className={`w-8 text-center ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              darkMode
                                ? 'bg-white/10 text-white hover:bg-white/20'
                                : 'bg-[#00001a]/10 text-[#00001a] hover:bg-[#00001a]/20'
                            }`}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className={`text-sm ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-[#00001a]/70 hover:text-[#00001a]'}`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className={`p-6 border-t ${darkMode ? 'border-white/10' : 'border-[#00001a]/10'}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Total: ${getCartTotal().toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCart([])}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30'
                          : 'bg-white text-[#00001a] border border-[#00001a]/30 hover:bg-[#00001a]/5'
                      }`}
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={handleCheckout}
                      className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        darkMode
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30'
                          : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90'
                      }`}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedPaymentItem && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPaymentModal(false)
              setSelectedPaymentItem(null)
            }
          }}
        >
          <div className={`max-w-md w-full max-h-[90vh] rounded-lg border transition-all duration-300 overflow-hidden flex flex-col ${
            darkMode ? 'bg-[#00001a] border-white/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            {/* Fixed Header */}
            <div className={`flex-shrink-0 p-6 border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Complete Purchase
                </h3>
                <button
                  onClick={() => {
                    setShowPaymentModal(false)
                    setSelectedPaymentItem(null)
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {/* Order Summary */}
              <div className={`p-4 rounded-lg mb-6 transition-all duration-300 ${
                darkMode ? 'bg-[#00001a] border border-white/10 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'bg-gray-50 border border-gray-200'
              }`}>
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Order Summary
                </h4>
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPaymentItem.image}
                    alt={selectedPaymentItem.title}
                    className="w-12 h-12 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/48x48/6366f1/white?text=' + encodeURIComponent(selectedPaymentItem.title.split(' ')[0])
                    }}
                  />
                  <div className="flex-1">
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {selectedPaymentItem.title}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                      Quantity: 1
                    </p>
                  </div>
                  <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    ${selectedPaymentItem.price}
                  </p>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Payment Method
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Card', icon: CreditCard },
                    { id: 'wallet', label: 'Wallet', icon: Wallet },
                    { id: 'paypal', label: 'PayPal', icon: DollarSign }
                  ].map((method) => {
                    const IconComponent = method.icon
                    return (
                      <button
                        key={method.id}
                        onClick={() => handlePaymentMethodChange(method.id)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all duration-300 ${
                          paymentMethod === method.id
                            ? (darkMode
                              ? 'border-blue-400 bg-[#00001a] text-blue-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                              : 'border-[#00001a] bg-[#00001a]/5 text-[#00001a]')
                            : (darkMode
                              ? 'border-white/20 bg-[#00001a] text-white/70 hover:border-blue-400/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]')
                        }`}
                      >
                        <IconComponent className="w-5 h-5 mx-auto mb-1" />
                        {method.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                {paymentMethod === 'card' && (
                  <>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={paymentForm.cardholderName}
                        onChange={(e) => handlePaymentFormChange('cardholderName', e.target.value)}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                          darkMode
                            ? 'bg-[#00001a] border-white/20 text-white placeholder-white/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                            : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={paymentForm.cardNumber}
                        onChange={(e) => handlePaymentFormChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                          darkMode
                            ? 'bg-[#00001a] border-white/20 text-white placeholder-white/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                            : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                        }`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={paymentForm.expiryDate}
                          onChange={(e) => handlePaymentFormChange('expiryDate', e.target.value)}
                          placeholder="MM/YY"
                          className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                            darkMode
                              ? 'bg-[#00001a] border-white/20 text-white placeholder-white/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                              : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          CVV
                        </label>
                        <input
                          type="text"
                          value={paymentForm.cvv}
                          onChange={(e) => handlePaymentFormChange('cvv', e.target.value)}
                          placeholder="123"
                          className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                            darkMode
                              ? 'bg-[#00001a] border-white/20 text-white placeholder-white/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                              : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                          }`}
                        />
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod === 'wallet' && (
                  <>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Wallet Type
                      </label>
                      <select
                        value={paymentForm.walletType}
                        onChange={(e) => handlePaymentFormChange('walletType', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                          darkMode
                            ? 'bg-[#00001a] border-white/20 text-white hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                            : 'bg-white border-gray-200 text-[#00001a] shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                        }`}
                      >
                        <option value="paypal">PayPal</option>
                        <option value="apple">Apple Pay</option>
                        <option value="google">Google Pay</option>
                        <option value="crypto">Crypto Wallet</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={paymentForm.email}
                        onChange={(e) => handlePaymentFormChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                          darkMode
                            ? 'bg-[#00001a] border-white/20 text-white placeholder-white/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                            : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                        }`}
                      />
                    </div>
                  </>
                )}

                {paymentMethod === 'paypal' && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      PayPal Email
                    </label>
                    <input
                      type="email"
                      value={paymentForm.email}
                      onChange={(e) => handlePaymentFormChange('email', e.target.value)}
                      placeholder="your@paypal.com"
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'bg-[#00001a] border-white/20 text-white placeholder-white/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                          : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
            </div>

            {/* Fixed Footer */}
            <div className={`flex-shrink-0 p-6 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowPaymentModal(false)
                    setSelectedPaymentItem(null)
                  }}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] text-white border border-white/20 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={processPayment}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30'
                      : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                  }`}
                >
                  Pay ${selectedPaymentItem.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showCommentsModal && selectedContentForComments && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl max-h-[80vh] rounded-lg overflow-hidden ${
            darkMode ? 'bg-[#00001a] border border-white/10' : 'bg-white border border-gray-200'
          }`}>
            <div className={`p-4 border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Comments
                </h3>
                <button
                  onClick={() => setShowCommentsModal(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              {comments[selectedContentForComments.id]?.map((comment) => (
                <div key={comment.id} className={`mb-4 p-3 rounded-lg ${
                  darkMode ? 'bg-white/5' : 'bg-gray-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-[#00001a] text-white'
                    }`}>
                      {comment.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {comment.user}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          {comment.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                        {comment.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`p-4 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white placeholder-white/50'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 disabled:opacity-50'
                      : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90 disabled:opacity-50'
                  }`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedContentForShare && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-xs rounded-lg overflow-hidden ${
            darkMode ? 'bg-[#00001a] border border-white/10' : 'bg-white border border-gray-200'
          }`}>
            <div className={`p-4 border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-base font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Share
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className={`p-1 rounded transition-colors ${
                    darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-3">
              <div className="space-y-1">
                <button
                  onClick={() => handleShareContent('copy')}
                  className={`w-full p-2 rounded-lg transition-all duration-300 flex items-center gap-3 text-sm ${
                    darkMode
                      ? 'hover:bg-white/5 text-white'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Copy className="w-4 h-4" />
                  Copy Link
                </button>
                <button
                  onClick={() => handleShareContent('twitter')}
                  className={`w-full p-2 rounded-lg transition-all duration-300 flex items-center gap-3 text-sm ${
                    darkMode
                      ? 'hover:bg-white/5 text-white'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="w-4 h-4 bg-blue-400 rounded-sm"></div>
                  Twitter
                </button>
                <button
                  onClick={() => handleShareContent('linkedin')}
                  className={`w-full p-2 rounded-lg transition-all duration-300 flex items-center gap-3 text-sm ${
                    darkMode
                      ? 'hover:bg-white/5 text-white'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="w-4 h-4 bg-blue-700 rounded-sm"></div>
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save to Folder Modal */}
      {showSaveFolderModal && contentToSave && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-lg border transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border-white/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <div className={`p-6 border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Save Content
                </h3>
                <button
                  onClick={() => {
                    setShowSaveFolderModal(false)
                    setContentToSave(null)
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-[#00001a] hover:bg-gray-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {contentToSave.title}
                </h4>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Choose where to save this content:
                </p>
              </div>

              <div className="space-y-3">
                {/* Default Saved folder */}
                <button
                  onClick={() => handleSaveToFolder('default')}
                  className={`w-full p-4 rounded-lg border text-left transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-white/20 text-white hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                      : 'bg-white border-gray-200 text-[#00001a] hover:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Bookmark className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Saved Content</div>
                      <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        Default saved items
                      </div>
                    </div>
                  </div>
                </button>

                {/* Custom folders */}
                {customFolders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => handleSaveToFolder(folder.id)}
                    className={`w-full p-4 rounded-lg border text-left transition-all duration-300 ${
                      darkMode
                        ? 'bg-[#00001a] border-white/20 text-white hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                        : 'bg-white border-gray-200 text-[#00001a] hover:shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Folder className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{folder.name}</div>
                        <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          {folder.count} items
                        </div>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Create new folder option */}
                <button
                  onClick={() => {
                    setShowSaveFolderModal(false)
                    setShowFolderModal(true)
                  }}
                  className={`w-full p-4 rounded-lg border-2 border-dashed text-left transition-all duration-300 ${
                    darkMode
                      ? 'border-white/30 text-white/70 hover:border-blue-400/50 hover:text-white hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                      : 'border-gray-300 text-gray-600 hover:border-[#00001a] hover:text-[#00001a]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Plus className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Create New Folder</div>
                      <div className={`text-sm ${darkMode ? 'text-white/50' : 'text-gray-400'}`}>
                        Organize your saved content
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rename Folder Modal */}
      {showRenameModal && folderToRename && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-lg border transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border-white/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <div className={`p-6 border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Rename Folder
                </h3>
                <button
                  onClick={() => {
                    setShowRenameModal(false)
                    setFolderToRename(null)
                    setNewFolderName('')
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-[#00001a] hover:bg-gray-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Folder Name
                </label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-white/20 text-white placeholder-white/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                      : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                  }`}
                  placeholder="Enter folder name"
                  onKeyDown={(e) => e.key === 'Enter' && handleConfirmRename()}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRenameModal(false)
                    setFolderToRename(null)
                    setNewFolderName('')
                  }}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] text-white border border-white/20 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                      : 'bg-white text-[#00001a] border border-gray-200 hover:bg-gray-50 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRename}
                  disabled={!newFolderName.trim()}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    !newFolderName.trim()
                      ? (darkMode ? 'bg-[#00001a] text-white/50 cursor-not-allowed border border-white/20' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                      : (darkMode ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-[#00001a] text-white hover:bg-gray-800 shadow-[0_2px_4px_rgba(0,0,26,0.15)]')
                  }`}
                >
                  Rename
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SeekerContent

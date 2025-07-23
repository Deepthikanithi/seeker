import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { HelpCircle, Mail, MessageCircle, CreditCard, FileText, Search, ChevronDown, ChevronRight, Send, X } from 'lucide-react'

const SeekerSupport = ({ darkMode }) => {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('faq')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Chat')

  // Chat functionality
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Welcome to SynapMentor Support! I'm here to help you with any questions about your account, sessions, payments, or technical issues. What can I assist you with today?",
      sender: 'support',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)
  const chatInputRef = useRef(null)

  const tabs = [
    { id: 'faq', label: 'F.A.Q', icon: HelpCircle },
    { id: 'chat', label: 'Help Desk Chat', icon: MessageCircle },
    { id: 'payment', label: 'Payment Queries', icon: CreditCard }
  ]

  const faqs = [
    {
      id: 1,
      category: 'Chat',
      question: 'How do I start a chat with support?',
      answer: 'To start a chat with support, click on the Help Desk Chat tab above or use the chat widget in the bottom right corner of your screen. Our support team is available 24/7 to assist you.'
    },
    {
      id: 2,
      category: 'Chat',
      question: 'Can I attach files in chat?',
      answer: 'Yes, you can attach files in chat by clicking the attachment icon in the chat interface. We support most common file formats including images, documents, and PDFs up to 10MB in size.'
    },
    {
      id: 3,
      category: 'Chat',
      question: 'How long does it take to get a response?',
      answer: 'Our average response time is under 2 minutes during business hours and within 15 minutes outside business hours. For complex issues, our team may need additional time to provide a comprehensive solution.'
    },
    {
      id: 4,
      category: 'Chat',
      question: 'Can I chat with the same agent for follow-up questions?',
      answer: 'Yes, when possible, we try to connect you with the same agent for follow-up questions to maintain continuity. Your chat history is always available to any agent assisting you.'
    },
    {
      id: 5,
      category: 'Delete Chat',
      question: 'How can I delete my chat history?',
      answer: 'You can delete your chat history by going to your chat settings and selecting "Delete Chat History". This will permanently remove all messages from your account.'
    },
    {
      id: 6,
      category: 'Payment',
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and digital wallets. All payments are processed securely through encrypted channels.'
    },
    {
      id: 7,
      category: 'Refund',
      question: 'How do I request a refund?',
      answer: 'To request a refund, contact our support team within 30 days of your purchase. We offer a full money-back guarantee if you\'re not satisfied with our service.'
    },
    {
      id: 8,
      category: 'Policies',
      question: 'What are the community guidelines?',
      answer: 'Our community guidelines ensure a safe, respectful environment for learning. This includes professional communication, no harassment, maintaining educational focus, and respecting intellectual property rights.'
    },
    {
      id: 9,
      category: 'Policies',
      question: 'What is your privacy policy?',
      answer: 'We are committed to protecting your privacy. We collect only necessary information, never sell your data to third parties, use encryption for data protection, and give you control over your personal information.'
    },
    {
      id: 10,
      category: 'Policies',
      question: 'What are the terms of service?',
      answer: 'Our terms of service outline the rules for using SynapMentor, including user responsibilities, prohibited activities, intellectual property rights, and dispute resolution procedures. Please review them in your account settings.'
    },
    {
      id: 11,
      category: 'Policies',
      question: 'How do you handle data security?',
      answer: 'We implement industry-standard security measures including SSL encryption, secure data centers, regular security audits, two-factor authentication, and compliance with data protection regulations like GDPR.'
    }
  ]

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = faq.category === selectedCategory
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  // Chat functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])



  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prev => [...prev, userMessage])
      setNewMessage('')

      // Simulate support response
      setTimeout(() => {
        const supportResponses = [
          "Thank you for reaching out! I'm here to help you with any questions or concerns you might have. Could you please provide more details about your specific issue?",
          "I understand your concern and I'm happy to assist you. Let me look into this right away and provide you with the best solution.",
          "That's a great question! Based on your inquiry, here are a few things that might help. Would you like me to explain any of these in more detail?",
          "I appreciate you contacting our support team. Let me check our resources and get back to you with accurate information within the next few minutes.",
          "Thanks for providing those details. I can definitely help you resolve this issue. Let me walk you through the steps or connect you with the right specialist.",
          "I see what you're asking about. This is actually a common question, and I have some helpful information that should address your concerns completely.",
          "Perfect! I'm glad you reached out about this. Let me provide you with a comprehensive solution that should resolve everything for you.",
          "Thank you for your patience. I've reviewed your message and I have some specific steps we can take to help you with this situation."
        ]

        const supportMessage = {
          id: messages.length + 2,
          text: supportResponses[Math.floor(Math.random() * supportResponses.length)],
          sender: 'support',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        setMessages(prev => [...prev, supportMessage])
      }, 1500 + Math.random() * 2500) // Random delay between 1.5-4 seconds
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-gray-50'
    }`}>
      <div className="p-6 space-y-6">
        
        {/* Header */}
        <div className={`p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20'
            : 'rounded-lg bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Support Center
            </h2>
          </div>
          <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
            Get help with your account, payments, sessions, and more.
          </p>
          
          {/* Contact Info */}
          <div className={`mt-4 p-4 rounded-lg border ${
            darkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-gray-100 border-gray-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Mail className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-gray-600'}`} />
              <span className={`font-medium ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`}>
                Direct Email Support
              </span>
            </div>
            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              For urgent issues, contact us directly at{' '}
              <a href="mailto:support@synapmentor.com" className={`font-medium ${darkMode ? 'text-blue-400' : 'text-[#00001a]'} hover:underline`}>
                support@synapmentor.com
              </a>
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
            : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
        }`}>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? (darkMode ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-[#00001a] text-white border border-[#00001a]')
                      : (darkMode ? 'bg-white/5 text-white/70 border border-white/20 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200')
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className={`p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20'
            : 'rounded-lg bg-white border-gray-200'
        }`}>
          
          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                <div>
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Frequently Asked Questions
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                    Find quick answers to common questions
                  </p>
                </div>
              </div>

              {/* FAQ Category Tabs */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {['Chat', 'Delete Chat', 'Payment', 'Refund', 'Policies'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? darkMode
                            ? 'bg-white text-[#00001a]'
                            : 'bg-[#00001a] text-white'
                          : darkMode
                            ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  darkMode ? 'text-white/50' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                      : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500'
                  }`}
                />
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className={`border rounded-lg transition-all duration-300 ${
                    darkMode ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}>
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className={`w-full p-4 text-left flex items-center justify-between transition-all duration-300 ${
                        darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {faq.category}
                          </span>
                        </div>
                        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {faq.question}
                        </h4>
                      </div>
                      {expandedFaq === faq.id ? (
                        <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                      ) : (
                        <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                      )}
                    </button>
                    
                    {expandedFaq === faq.id && (
                      <div className={`p-4 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                        <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* FAQ Information */}
              <div className={`mt-8 p-4 rounded-lg ${
                darkMode ? 'bg-white/5 border border-white/20' : 'bg-gray-50 border border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle size={16} className={darkMode ? 'text-white' : 'text-[#00001a]'} />
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    FAQ Information
                  </span>
                </div>
                <ul className={`text-sm space-y-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  <li>• Browse different categories using the tabs above</li>
                  <li>• Click on any question to expand the answer</li>
                  <li>• For additional help, use the Help Desk Chat or Email Support</li>
                  <li>• FAQ is updated regularly with new questions and answers</li>
                </ul>
              </div>
            </div>
          )}

          {/* Help Desk Chat Tab */}
          {activeTab === 'chat' && (
            <div className="h-full">
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <MessageCircle className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Help Desk Chat
                  </h3>
                </div>
                <button className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? 'text-white/70 hover:text-red-400 hover:bg-red-500/10'
                    : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                }`}>
                  <X size={18} />
                </button>
              </div>

              <p className={`text-sm mb-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Live chat with our support team
              </p>

              {/* Main Chat Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">

                {/* Left Column - Chat Area */}
                <div className="lg:col-span-2 flex flex-col">

                  {/* Support Agent Info */}
                  <div className={`p-4 rounded-lg border mb-4 ${
                    darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            darkMode ? 'bg-blue-500/20' : 'bg-gray-100'
                          }`}>
                            <MessageCircle className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-gray-600'}`} />
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            darkMode ? 'bg-green-500' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <div>
                          <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Support Agent
                          </h4>
                          <p className={`text-sm flex items-center gap-1 ${darkMode ? 'text-green-400' : 'text-gray-600'}`}>
                            <span className={`w-2 h-2 rounded-full ${darkMode ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                            Online • Typically responds in 5 minutes
                          </p>
                        </div>
                      </div>
                      <button className={`p-2 rounded-lg transition-all duration-300 ${
                        darkMode
                          ? 'text-white/70 hover:text-white hover:bg-white/10'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}>
                        <Search size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className={`flex-1 p-4 rounded-lg border overflow-y-auto custom-scrollbar ${
                    darkMode ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200'
                  }`}>
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={message.id}
                          className={`flex animate-slide-in ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {message.sender === 'support' && (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1 ${
                              darkMode ? 'bg-blue-500/20' : 'bg-gray-100'
                            }`}>
                              <MessageCircle className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-gray-600'}`} />
                            </div>
                          )}

                          <div className={`max-w-md group ${message.sender === 'user' ? 'ml-12' : 'mr-12'}`}>
                            <div className={`px-4 py-3 rounded-2xl shadow-sm transition-all duration-300 ${
                              message.sender === 'user'
                                ? (darkMode
                                  ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-100 border border-blue-500/30'
                                  : 'bg-[#00001a] text-white')
                                : (darkMode
                                  ? 'bg-white/10 text-white border border-white/20'
                                  : 'bg-gray-100 text-gray-800 border border-gray-200')
                            } ${message.sender === 'user' ? 'rounded-br-md' : 'rounded-bl-md'}`}>
                              <p className="text-sm leading-relaxed">{message.text}</p>
                            </div>
                            <div className={`flex items-center gap-1 mt-1 px-2 ${
                              message.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}>
                              <p className={`text-xs ${
                                darkMode ? 'text-white/40' : 'text-gray-400'
                              }`}>
                                {message.timestamp}
                              </p>
                            </div>
                          </div>

                          {message.sender === 'user' && (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ml-3 mt-1 ${
                              darkMode ? 'bg-white/10' : 'bg-gray-100'
                            }`}>
                              <div className={`w-5 h-5 rounded-full ${
                                darkMode ? 'bg-blue-400' : 'bg-gray-600'
                              }`}></div>
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className={`p-4 mt-4 rounded-lg border ${
                    darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex gap-3 items-end">
                      <div className="flex-1 relative">
                        <input
                          ref={chatInputRef}
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message..."
                          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                            darkMode
                              ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400/50 focus:ring-blue-400/20'
                              : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                          }`}
                        />
                      </div>
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                          newMessage.trim()
                            ? (darkMode
                              ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 hover:from-blue-500/30 hover:to-blue-600/30 shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                              : 'bg-gradient-to-r from-[#00001a] to-gray-800 text-white hover:from-gray-800 hover:to-[#00001a] shadow-lg hover:shadow-xl')
                            : (darkMode ? 'bg-white/5 text-white/30 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed')
                        }`}
                      >
                        <Send size={18} />
                      </button>
                    </div>

                    <div className={`mt-2 text-xs ${darkMode ? 'text-white/40' : 'text-gray-400'} flex items-center gap-1`}>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span>Support team is online</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Chat Features & Quick Actions */}
                <div className="space-y-6">

                  {/* Chat Features */}
                  <div className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200'
                  }`}>
                    <h4 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Chat Features
                    </h4>
                    <div className="space-y-3">
                      {[
                        { icon: MessageCircle, text: 'Real-time messaging' },
                        { icon: HelpCircle, text: 'Dedicated support agent' },
                        { icon: FileText, text: 'Chat history saved' }
                      ].map((feature, index) => {
                        const Icon = feature.icon
                        return (
                          <div key={index} className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-gray-600'}`} />
                            <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                              {feature.text}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200'
                  }`}>
                    <h4 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Quick Actions
                    </h4>
                    <div className="space-y-2">
                      {[
                        'I need help with my payments',
                        'Technical support needed',
                        'Account access issue',
                        'Feature request'
                      ].map((action, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setNewMessage(action)
                            setTimeout(() => sendMessage(), 100)
                          }}
                          className={`w-full p-3 text-left rounded-lg border text-sm transition-all duration-300 ${
                            darkMode
                              ? 'border-white/20 hover:border-blue-400/50 hover:bg-white/5 text-white/70 hover:text-white'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 hover:text-gray-800'
                          }`}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Queries Tab */}
          {activeTab === 'payment' && (
            <div>
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Payment Support
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-lg border transition-all duration-300 ${
                  darkMode ? 'bg-white/3 border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}>
                  <CreditCard className={`w-8 h-8 mb-4 ${darkMode ? 'text-green-400' : 'text-gray-600'}`} />
                  <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Payment Issues
                  </h4>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Having trouble with payments, refunds, or billing?
                  </p>
                  <ul className={`text-sm space-y-1 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                    <li>• Failed payment troubleshooting</li>
                    <li>• Refund status inquiries</li>
                    <li>• Billing discrepancies</li>
                    <li>• Payment method issues</li>
                  </ul>
                </div>

                <div className={`p-6 rounded-lg border transition-all duration-300 ${
                  darkMode ? 'bg-white/3 border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}>
                  <FileText className={`w-8 h-8 mb-4 ${darkMode ? 'text-blue-400' : 'text-gray-600'}`} />
                  <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Refund Policies
                  </h4>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    Understanding our refund and cancellation policies.
                  </p>
                  <ul className={`text-sm space-y-1 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                    <li>• 24-hour cancellation policy</li>
                    <li>• Refund processing times</li>
                    <li>• Partial refund conditions</li>
                    <li>• Dispute resolution</li>
                  </ul>
                </div>
              </div>
            </div>
          )}


        </div>

      </div>


    </div>
  )
}

export default SeekerSupport

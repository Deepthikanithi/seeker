import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import {
  CreditCard, Wallet, DollarSign, Download, RefreshCw, Users, Gift, Plus, Trash2,
  ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, AlertCircle,
  Calendar, Receipt, Tag, Percent, Crown, Star, Shield, Edit3, Copy,
  Filter, Search, ChevronDown, ChevronRight, Settings, Bell, Lock,
  Smartphone, Globe, Mail, Phone, FileText, Eye, EyeOff, RotateCcw,
  TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Zap, Video
} from 'lucide-react'

const SeekerPayments = ({ darkMode }) => {
  const { t } = useLanguage()
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false)
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false)
  const [showRefundModal, setShowRefundModal] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [showGroupSplitModal, setShowGroupSplitModal] = useState(false)
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [addMoneyAmount, setAddMoneyAmount] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const [groupSplitAmount, setGroupSplitAmount] = useState('')
  const [groupSplitPeople, setGroupSplitPeople] = useState(2)
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([])
  const [showReferralModal, setShowReferralModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [couponCode, setCouponCode] = useState('')

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
  ]
  
  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      isDefault: true,
      nickname: 'Personal Card',
      billingAddress: 'New York, NY',
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiry: '08/26',
      isDefault: false,
      nickname: 'Business Card',
      billingAddress: 'Los Angeles, CA',
      addedDate: '2024-02-10'
    },
    {
      id: 3,
      type: 'paypal',
      email: 'jane@example.com',
      isDefault: false,
      nickname: 'PayPal Account',
      addedDate: '2024-01-20'
    },
    {
      id: 4,
      type: 'wallet',
      balance: 125.50,
      isDefault: false,
      nickname: 'Wallet Balance',
      addedDate: '2024-01-01'
    },
    {
      id: 5,
      type: 'points',
      balance: 2450,
      isDefault: false,
      nickname: 'Reward Points',
      addedDate: '2024-01-01',
      conversionRate: 0.01 // 1 point = $0.01
    }
  ]

  const groupMembers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', avatar: null },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: null },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', avatar: null },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', avatar: null },
    { id: 5, name: 'Alex Brown', email: 'alex@example.com', avatar: null },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', avatar: null }
  ]

  const transactions = [
    {
      id: 'TXN001',
      type: 'session',
      description: 'React Session with Alex Chen',
      amount: -45.00,
      date: '2024-01-15',
      time: '14:30',
      status: 'completed',
      paymentMethod: 'Visa •••• 4242',
      category: 'Learning',
      refundable: false,
      sessionId: 'SES001'
    },
    {
      id: 'TXN002',
      type: 'wallet',
      description: 'Wallet Top-up',
      amount: 100.00,
      date: '2024-01-14',
      time: '09:15',
      status: 'completed',
      paymentMethod: 'Mastercard •••• 5555',
      category: 'Top-up',
      refundable: false
    },
    {
      id: 'TXN003',
      type: 'refund',
      description: 'Cancelled Session Refund',
      amount: 30.00,
      date: '2024-01-12',
      time: '16:45',
      status: 'completed',
      paymentMethod: 'Refund to Visa •••• 4242',
      category: 'Refund',
      refundable: false,
      originalTransaction: 'TXN005'
    },
    {
      id: 'TXN004',
      type: 'session',
      description: 'Python Session with Sarah Davis',
      amount: -60.00,
      date: '2024-01-10',
      time: '11:20',
      status: 'completed',
      paymentMethod: 'Wallet Balance',
      category: 'Learning',
      refundable: true,
      sessionId: 'SES002'
    },
    {
      id: 'TXN005',
      type: 'subscription',
      description: 'Premium Monthly Subscription',
      amount: -29.99,
      date: '2024-01-08',
      time: '00:01',
      status: 'completed',
      paymentMethod: 'Visa •••• 4242',
      category: 'Subscription',
      refundable: false,
      recurring: true
    },
    {
      id: 'TXN006',
      type: 'group',
      description: 'Group Session Split - JavaScript Bootcamp',
      amount: -25.00,
      date: '2024-01-05',
      time: '19:30',
      status: 'completed',
      paymentMethod: 'PayPal',
      category: 'Group Learning',
      refundable: true,
      groupId: 'GRP001',
      splitWith: ['John D.', 'Emma K.', 'Mike R.']
    },
    {
      id: 'TXN007',
      type: 'coupon',
      description: 'Discount Applied - WELCOME20',
      amount: 10.00,
      date: '2024-01-03',
      time: '13:15',
      status: 'completed',
      paymentMethod: 'Coupon Credit',
      category: 'Discount',
      refundable: false,
      couponCode: 'WELCOME20'
    },
    {
      id: 'TXN008',
      type: 'referral',
      description: 'Referral Bonus - Friend Signup',
      amount: 15.00,
      date: '2024-01-01',
      time: '10:00',
      status: 'completed',
      paymentMethod: 'Wallet Credit',
      category: 'Bonus',
      refundable: false,
      referredUser: 'Alex M.'
    }
  ]

  const subscriptions = [
    {
      id: 'SUB001',
      name: 'Premium Monthly',
      price: 29.99,
      interval: 'monthly',
      status: 'active',
      nextBilling: '2024-02-08',
      features: ['Unlimited Sessions', 'Priority Support', 'Advanced Analytics', 'Group Sessions'],
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: 'SUB002',
      name: 'Pro Annual',
      price: 299.99,
      interval: 'yearly',
      status: 'cancelled',
      nextBilling: null,
      cancelledDate: '2024-01-01',
      features: ['Everything in Premium', 'Personal Mentor', 'Custom Learning Path', '1-on-1 Sessions'],
      paymentMethod: 'Mastercard •••• 5555'
    }
  ]

  const refunds = [
    {
      id: 'REF001',
      transactionId: 'TXN005',
      amount: 30.00,
      reason: 'Session cancelled by solver',
      status: 'completed',
      requestDate: '2024-01-12',
      processedDate: '2024-01-13',
      refundMethod: 'Original payment method',
      processingTime: '1 business day'
    },
    {
      id: 'REF002',
      transactionId: 'TXN006',
      amount: 25.00,
      reason: 'Technical issues during session',
      status: 'pending',
      requestDate: '2024-01-14',
      processedDate: null,
      refundMethod: 'Wallet credit',
      processingTime: '3-5 business days'
    }
  ]

  const coupons = [
    {
      id: 'WELCOME20',
      name: 'Welcome Discount',
      discount: 20,
      type: 'percentage',
      status: 'used',
      usedDate: '2024-01-03',
      minAmount: 25.00
    },
    {
      id: 'SAVE50',
      name: 'Save $50',
      discount: 50,
      type: 'fixed',
      status: 'available',
      expiryDate: '2024-03-01',
      minAmount: 100.00
    },
    {
      id: 'FRIEND15',
      name: 'Friend Referral',
      discount: 15,
      type: 'percentage',
      status: 'expired',
      expiryDate: '2024-01-01',
      minAmount: 30.00
    }
  ]

  const bulkDiscounts = [
    { minutes: 60, discount: 5, price: 285 },
    { minutes: 120, discount: 10, price: 540 },
    { minutes: 300, discount: 15, price: 1275 },
    { minutes: 600, discount: 20, price: 2400 }
  ]

  const getCurrentCurrency = () => currencies.find(c => c.code === selectedCurrency) || currencies[0]

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-gray-50'
    }`}>
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-full overflow-x-hidden">
        <div className="w-full">
        
        {/* Header */}
        <div className={`p-4 sm:p-6 border ${
          darkMode
            ? 'rounded-lg bg-[#00001a] border-gray-800'
            : 'rounded-lg bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className={`p-2 sm:p-3 rounded-lg border flex-shrink-0 transition-all duration-300 ${
                darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-gray-100 border-gray-200'
              }`}>
                <Wallet className={`w-6 h-6 sm:w-8 sm:h-8 ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Payments & Wallet
                </h2>
                <p className={`text-sm sm:text-base break-words ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Manage your payments, subscriptions, and wallet balance
                </p>
              </div>
            </div>

            {/* Currency Selection */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg border whitespace-nowrap transition-all duration-300 ${
                  darkMode ? 'bg-[#00001a] border-gray-800 text-white hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 text-[#00001a] shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                }`}
              >
                <Globe className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                <span className="text-sm sm:text-base font-medium">
                  {getCurrentCurrency().symbol} {selectedCurrency}
                </span>
                <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''} ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
              </button>

              {showCurrencyDropdown && (
                <div className={`absolute top-full left-0 mt-2 w-full rounded-lg border shadow-lg z-50 transition-all duration-300 ${
                  darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_4px_8px_rgba(0,0,26,0.15)]'
                }`}>
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        setSelectedCurrency(currency.code)
                        setShowCurrencyDropdown(false)
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-opacity-10 transition-colors ${
                        selectedCurrency === currency.code
                          ? (darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-100 text-[#00001a]')
                          : (darkMode ? 'text-white hover:bg-white/10' : 'text-[#00001a] hover:bg-gray-50')
                      } ${currency === currencies[0] ? 'rounded-t-lg' : ''} ${currency === currencies[currencies.length - 1] ? 'rounded-b-lg' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{currency.symbol} {currency.code}</span>
                        <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          {currency.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className={`p-1 rounded-lg border transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
          }`}>
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'methods', name: 'Payment Methods', icon: CreditCard },
                { id: 'transactions', name: 'Transactions', icon: Receipt },
                { id: 'subscriptions', name: 'Subscriptions', icon: Calendar },
                { id: 'refunds', name: 'Refunds', icon: RotateCcw }
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
                  <tab.icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

        {/* Tab Content */}
        <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Wallet Balance & Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  icon: Wallet,
                  value: getCurrentCurrency().symbol + (selectedCurrency === 'USD' ? '125.50' : '102.30'),
                  label: 'Wallet Balance',
                  trend: '+12.5%'
                },
                {
                  icon: TrendingDown,
                  value: getCurrentCurrency().symbol + (selectedCurrency === 'USD' ? '245.00' : '200.15'),
                  label: 'This Month Spent',
                  trend: '-8.2%'
                },
                {
                  icon: Activity,
                  value: getCurrentCurrency().symbol + (selectedCurrency === 'USD' ? '1,250.00' : '1,020.50'),
                  label: 'Total Spent',
                  trend: '+24.1%'
                },
                {
                  icon: Star,
                  value: getCurrentCurrency().symbol + (selectedCurrency === 'USD' ? '85.00' : '69.50'),
                  label: 'Savings This Year',
                  trend: '+45.3%'
                }
              ].map((item, index) => (
                <div key={index} className={`group p-3 sm:p-4 rounded-lg border min-w-0 transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                    : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
                }`}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 min-w-0">
                    <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                    <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {item.value}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-xs sm:text-sm break-words min-w-0 flex-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      {item.label}
                    </p>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      item.trend.startsWith('+')
                        ? (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-gray-100 text-[#00001a]')
                        : (darkMode ? 'bg-red-500/20 text-red-400' : 'bg-gray-100 text-[#00001a]')
                    }`}>
                      {item.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className={`p-4 sm:p-6 rounded-lg border transition-all duration-300 ${
              darkMode
                ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}>
              <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { icon: Plus, label: 'Add Money', action: () => setShowAddMoneyModal(true), color: 'primary' },
                  { icon: Users, label: 'Group Split', action: () => setShowGroupSplitModal(true), color: 'green' },
                  { icon: Gift, label: 'Referral Bonus', action: () => setShowReferralModal(true), color: 'purple' },
                  { icon: Download, label: 'Export Data', action: () => {
                    const data = {
                      walletBalance: getCurrentCurrency().symbol + '125.50',
                      monthlySpent: getCurrentCurrency().symbol + '245.00',
                      totalSpent: getCurrentCurrency().symbol + '1,250.00',
                      yearlysavings: getCurrentCurrency().symbol + '85.00'
                    }
                    const jsonData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2))
                    const link = document.createElement("a")
                    link.setAttribute("href", jsonData)
                    link.setAttribute("download", "payment_data.json")
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    alert("Payment data exported successfully!")
                  }, color: 'gray' }
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`p-4 rounded-lg border flex items-center gap-3 transition-all duration-300 ${
                      darkMode
                        ? 'bg-[#00001a] border-gray-800 text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                        : action.color === 'primary'
                          ? 'border-[#00001a] bg-[#00001a] text-white shadow-[0_2px_4px_rgba(0,0,26,0.15)]'
                          : 'bg-white border-gray-200 text-[#00001a] shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                    }`}
                  >
                    <action.icon className={`w-5 h-5 ${
                      darkMode
                        ? 'text-white'
                        : action.color === 'primary'
                          ? 'text-white'
                          : 'text-[#00001a]'
                    }`} />
                    <span className="font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Transactions Preview */}
            <div className={`p-4 sm:p-6 rounded-lg border transition-all duration-300 ${
              darkMode
                ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
                <h3 className={`text-lg sm:text-xl font-bold break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Recent Transactions
                </h3>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-[#00001a] hover:text-gray-700'
                  }`}
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {transactions.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                      : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        {transaction.type === 'session' && <Video className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'wallet' && <Wallet className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'refund' && <RotateCcw className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'subscription' && <Calendar className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'group' && <Users className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'coupon' && <Tag className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'referral' && <Gift className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm sm:text-base font-medium break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {transaction.description}
                          </p>
                          <p className={`text-xs sm:text-sm break-words ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            {transaction.date} • {transaction.paymentMethod}
                          </p>
                        </div>
                      </div>
                      <div className="text-right sm:text-right flex-shrink-0">
                        <p className={`text-sm sm:text-base font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {transaction.amount > 0 ? '+' : ''}{getCurrentCurrency().symbol}{Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <p className={`text-xs sm:text-sm capitalize ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === 'methods' && (
          <div className={`p-6 rounded-lg border transition-all duration-300 ${
            darkMode
              ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
              : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Payment Methods
              </h3>
              <button
                onClick={() => setShowAddPaymentModal(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#00001a] text-blue-400 border border-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                    : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-gray-800 shadow-[0_2px_4px_rgba(0,0,26,0.15)]'
                }`}
              >
                <Plus className="w-4 h-4" />
                Add Method
              </button>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className={`p-4 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                    : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg border transition-all duration-300 ${
                        darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-gray-100 border-gray-200'
                      }`}>
                        {method.type === 'card' && <CreditCard className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {method.type === 'paypal' && <Mail className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {method.type === 'wallet' && <Wallet className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {method.type === 'points' && <Star className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <p className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {method.nickname}
                          </p>
                          {method.isDefault && (
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              darkMode ? 'bg-green-500/20 text-green-400' : 'bg-gray-100 text-[#00001a]'
                            }`}>
                              Default
                            </span>
                          )}
                        </div>
                        {method.type === 'card' ? (
                          <>
                            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                              {method.brand} •••• {method.last4} • Expires {method.expiry}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                              {method.billingAddress} • Added {method.addedDate}
                            </p>
                          </>
                        ) : method.type === 'paypal' ? (
                          <>
                            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                              {method.email}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                              Added {method.addedDate}
                            </p>
                          </>
                        ) : method.type === 'points' ? (
                          <>
                            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                              {method.balance} points (≈ {getCurrentCurrency().symbol}{(method.balance * method.conversionRate).toFixed(2)})
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                              1 point = {getCurrentCurrency().symbol}{method.conversionRate} • Created {method.addedDate}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                              Balance: {getCurrentCurrency().symbol}{method.balance}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                              Created {method.addedDate}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Editing ${method.nickname}...`)}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          darkMode
                            ? 'text-white/70 hover:text-white hover:bg-white/10'
                            : 'text-gray-600 hover:text-[#00001a] hover:bg-gray-100'
                        }`}>
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (method.isDefault) {
                            alert('Cannot delete default payment method. Please set another method as default first.')
                          } else if (confirm(`Are you sure you want to delete ${method.nickname}?`)) {
                            alert(`${method.nickname} has been deleted.`)
                          }
                        }}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          darkMode
                            ? 'text-red-400 hover:bg-red-500/20'
                            : 'text-[#00001a] hover:bg-gray-100'
                        }`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bulk Minutes Discounts */}
            <div className="mt-8">
              <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Bulk Minutes Packages
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {bulkDiscounts.map((pkg, index) => (
                  <div key={index} className={`p-4 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                      : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
                  }`}>
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${
                        darkMode ? 'bg-blue-500/20' : 'bg-gray-100'
                      }`}>
                        <Clock className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
                      </div>
                      <h5 className={`font-bold text-lg mb-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {pkg.minutes} Minutes
                      </h5>
                      <p className={`text-sm mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Save {pkg.discount}%
                      </p>
                      <p className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {getCurrentCurrency().symbol}{pkg.price}
                      </p>
                      <button
                        onClick={() => {
                          if (confirm(`Purchase ${pkg.minutes} minutes for ${getCurrentCurrency().symbol}${pkg.price}?`)) {
                            alert(`Successfully purchased ${pkg.minutes} minutes package! You saved ${pkg.discount}%.`)
                          }
                        }}
                        className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          darkMode
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                            : index === 1
                              ? 'bg-[#00001a] text-white border border-[#00001a] hover:bg-gray-800 shadow-[0_2px_4px_rgba(0,0,26,0.15)]'
                              : 'bg-white text-[#00001a] border border-gray-200 hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)] shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                        }`}>
                        Purchase
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className={`p-4 sm:p-6 rounded-lg border transition-all duration-300 ${
            darkMode
              ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
              : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h3 className={`text-lg sm:text-xl font-bold break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Transaction History
              </h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 ${
                    darkMode ? 'text-white/50' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full sm:w-auto pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-[#00001a] border-gray-800 text-white placeholder-white/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                        : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500'
                    }`}
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className={`px-2 sm:px-3 py-2 text-sm sm:text-base rounded-lg border transition-all duration-300 flex-shrink-0 ${
                    darkMode
                      ? 'bg-[#00001a] border-gray-800 text-white hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                      : 'bg-white border-gray-300 text-[#00001a]'
                  }`}
                  style={darkMode ? {
                    backgroundColor: '#00001a',
                    color: 'white'
                  } : {}}
                >
                  <option value="all" style={darkMode ? { backgroundColor: '#00001a', color: 'white' } : {}}>All Types</option>
                  <option value="session" style={darkMode ? { backgroundColor: '#00001a', color: 'white' } : {}}>Sessions</option>
                  <option value="wallet" style={darkMode ? { backgroundColor: '#00001a', color: 'white' } : {}}>Wallet</option>
                  <option value="refund" style={darkMode ? { backgroundColor: '#00001a', color: 'white' } : {}}>Refunds</option>
                  <option value="subscription" style={darkMode ? { backgroundColor: '#00001a', color: 'white' } : {}}>Subscriptions</option>
                  <option value="group" style={darkMode ? { backgroundColor: '#00001a', color: 'white' } : {}}>Group</option>
                  <option value="coupon" style={darkMode ? { backgroundColor: '#00001a', color: 'white' } : {}}>Coupons</option>
                  <option value="referral" style={darkMode ? { backgroundColor: '#00001a', color: 'white' } : {}}>Referrals</option>
                </select>
                <button
                  onClick={() => {
                    const csvData = transactions.map(t => ({
                      ID: t.id,
                      Date: t.date,
                      Description: t.description,
                      Amount: t.amount,
                      Status: t.status,
                      PaymentMethod: t.paymentMethod,
                      Category: t.category
                    }))
                    const csvContent = "data:text/csv;charset=utf-8," +
                      Object.keys(csvData[0]).join(",") + "\n" +
                      csvData.map(row => Object.values(row).join(",")).join("\n")
                    const encodedUri = encodeURI(csvContent)
                    const link = document.createElement("a")
                    link.setAttribute("href", encodedUri)
                    link.setAttribute("download", "transactions.csv")
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    alert("Transaction data exported successfully!")
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] text-white border border-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                      : 'bg-[#00001a] text-white border border-[#00001a] shadow-[0_2px_4px_rgba(0,0,26,0.15)]'
                  }`}>
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {transactions
                .filter(t => filterType === 'all' || t.type === filterType)
                .filter(t => searchQuery === '' || t.description.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((transaction) => (
                <div key={transaction.id} className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'border-white/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                    : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                      <div className={`p-1.5 sm:p-2 rounded-lg border flex-shrink-0 ${
                        darkMode ? 'border-white/20' : 'bg-gray-100 border-gray-200'
                      }`}>
                        {transaction.type === 'session' && <Video className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'wallet' && <Wallet className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'refund' && <RotateCcw className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'subscription' && <Calendar className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'group' && <Users className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'coupon' && <Tag className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'referral' && <Gift className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                          <p className={`text-sm sm:text-base font-semibold break-words min-w-0 flex-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {transaction.description}
                          </p>
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize flex-shrink-0 ${
                            transaction.status === 'completed'
                              ? (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-gray-100 text-[#00001a]')
                              : transaction.status === 'pending'
                                ? (darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-100 text-[#00001a]')
                                : (darkMode ? 'bg-red-500/20 text-red-400' : 'bg-gray-100 text-[#00001a]')
                          }`}>
                            {transaction.status}
                          </span>
                        </div>
                        <p className={`text-xs sm:text-sm break-words ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                          {transaction.date} at {transaction.time} • {transaction.paymentMethod}
                        </p>
                        <p className={`text-xs break-words ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          ID: {transaction.id} • Category: {transaction.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right sm:text-right flex-shrink-0">
                      <p className={`text-lg sm:text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {transaction.amount > 0 ? '+' : ''}{getCurrentCurrency().symbol}{Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2">
                        {transaction.refundable && (
                          <button
                            onClick={() => setShowRefundModal(true)}
                            className={`text-xs px-2 py-1 rounded transition-colors whitespace-nowrap ${
                              darkMode ? 'text-yellow-400 hover:bg-yellow-500/20' : 'text-[#00001a] hover:bg-gray-100'
                            }`}
                          >
                            Request Refund
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedTransaction(transaction)
                            alert(`Transaction Details:\n\nID: ${transaction.id}\nDescription: ${transaction.description}\nAmount: ${getCurrentCurrency().symbol}${Math.abs(transaction.amount).toFixed(2)}\nDate: ${transaction.date} at ${transaction.time}\nStatus: ${transaction.status}\nPayment Method: ${transaction.paymentMethod}\nCategory: ${transaction.category}`)
                          }}
                          className={`p-1 rounded transition-colors ${
                            darkMode ? 'text-white/50 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                          }`}>
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            {/* Active Subscriptions */}
            <div className={`p-6 rounded-lg border transition-all duration-300 ${
              darkMode
                ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Subscriptions
                </h3>
              </div>

              <div className="space-y-4">
                {subscriptions.map((sub) => (
                  <div key={sub.id} className={`p-4 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]'
                      : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg border ${
                          darkMode ? 'border-white/20' : 'bg-gray-100 border-gray-200'
                        }`}>
                          <Crown className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {sub.name}
                            </h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                              sub.status === 'active'
                                ? (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-gray-100 text-[#00001a]')
                                : (darkMode ? 'bg-red-500/20 text-red-400' : 'bg-gray-100 text-[#00001a]')
                            }`}>
                              {sub.status}
                            </span>
                          </div>
                          <p className={`text-sm mb-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            {getCurrentCurrency().symbol}{sub.price} / {sub.interval}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            {sub.status === 'active'
                              ? `Next billing: ${sub.nextBilling}`
                              : `Cancelled: ${sub.cancelledDate}`
                            } • {sub.paymentMethod}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {sub.features.slice(0, 3).map((feature, idx) => (
                              <span key={idx} className={`px-2 py-1 rounded text-xs ${
                                darkMode ? 'bg-[#00001a] text-white/70 border border-white/20' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {feature}
                              </span>
                            ))}
                            {sub.features.length > 3 && (
                              <span className={`px-2 py-1 rounded text-xs ${
                                darkMode ? 'bg-[#00001a] text-white/70 border border-white/20' : 'bg-gray-100 text-gray-600'
                              }`}>
                                +{sub.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (sub.status === 'active') {
                              alert(`Managing subscription: ${sub.name}`)
                            } else {
                              alert(`Reactivating subscription: ${sub.name}`)
                            }
                          }}
                          className={`px-3 py-1 rounded text-sm font-medium border transition-all duration-300 ${
                            darkMode
                              ? 'text-blue-400 border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-500/50'
                              : 'text-[#00001a] border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                          }`}>
                          {sub.status === 'active' ? 'Manage' : 'Reactivate'}
                        </button>
                        {sub.status === 'active' && (
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to cancel ${sub.name}?`)) {
                                alert(`Subscription ${sub.name} has been cancelled.`)
                              }
                            }}
                            className={`px-3 py-1 rounded text-sm font-medium border transition-all duration-300 ${
                              darkMode
                                ? 'text-red-400 border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50'
                                : 'text-[#00001a] border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                            }`}>
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Plans */}
            <div className={`p-6 rounded-lg border transition-all duration-300 ${
              darkMode
                ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}>
              <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Available Plans
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Basic', price: 9.99, interval: 'monthly', features: ['5 Sessions/month', 'Basic Support', 'Mobile App'] },
                  { name: 'Premium', price: 29.99, interval: 'monthly', features: ['Unlimited Sessions', 'Priority Support', 'Advanced Analytics', 'Group Sessions'], popular: true },
                  { name: 'Pro Annual', price: 299.99, interval: 'yearly', features: ['Everything in Premium', 'Personal Mentor', 'Custom Learning Path', '1-on-1 Sessions'], savings: 'Save 17%' }
                ].map((plan, index) => (
                  <div key={index} className={`relative p-6 rounded-lg border transition-all duration-300 ${
                    plan.popular
                      ? (darkMode ? 'border-blue-400/50 bg-[#00001a] hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]' : 'bg-white border-gray-200 shadow-[0_4px_8px_rgba(0,0,26,0.2)] hover:shadow-[0_-4px_8px_rgba(0,0,26,0.2)]')
                      : (darkMode ? 'bg-[#00001a] border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]')
                  }`}>
                    {plan.popular && (
                      <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium ${
                        darkMode ? 'bg-blue-500 text-white' : 'bg-[#00001a] text-white'
                      }`}>
                        Most Popular
                      </div>
                    )}
                    {plan.savings && (
                      <div className={`absolute -top-3 right-4 px-2 py-1 rounded-full text-xs font-medium ${
                        darkMode ? 'bg-green-500/20 text-green-400' : 'bg-gray-100 text-[#00001a]'
                      }`}>
                        {plan.savings}
                      </div>
                    )}
                    <div className="text-center">
                      <h4 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {plan.name}
                      </h4>
                      <p className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {getCurrentCurrency().symbol}{plan.price}
                      </p>
                      <p className={`text-sm mb-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        per {plan.interval}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className={`flex items-center gap-2 text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            <CheckCircle className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => {
                          if (confirm(`Subscribe to ${plan.name} for ${getCurrentCurrency().symbol}${plan.price}/${plan.interval}?`)) {
                            alert(`Successfully subscribed to ${plan.name}! Welcome to your new plan.`)
                          }
                        }}
                        className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          plan.popular
                            ? (darkMode ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-[#00001a] text-white hover:bg-gray-800 shadow-[0_2px_4px_rgba(0,0,26,0.15)]')
                            : (darkMode ? 'bg-[#00001a] text-white border border-white/20 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-white text-[#00001a] border border-gray-200 hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)] shadow-[0_2px_4px_rgba(0,0,26,0.1)]')
                        }`}>
                        Subscribe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Refunds Tab */}
        {activeTab === 'refunds' && (
          <div className="space-y-6">
            {/* Refund Requests */}
            <div className={`p-6 rounded-lg border transition-all duration-300 ${
              darkMode
                ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}>
              <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Refund History
              </h3>

              <div className="space-y-4">
                {refunds.map((refund) => (
                  <div key={refund.id} className={`p-4 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'border-white/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                      : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg border ${
                          darkMode ? 'border-white/20' : 'bg-gray-100 border-gray-200'
                        }`}>
                          <RotateCcw className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              Refund Request #{refund.id}
                            </p>
                            <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                              refund.status === 'completed'
                                ? (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-gray-100 text-[#00001a]')
                                : refund.status === 'pending'
                                  ? (darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-100 text-[#00001a]')
                                  : (darkMode ? 'bg-red-500/20 text-red-400' : 'bg-gray-100 text-[#00001a]')
                            }`}>
                              {refund.status}
                            </span>
                          </div>
                          <p className={`text-sm mb-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            Amount: {getCurrentCurrency().symbol}{refund.amount} • Transaction: {refund.transactionId}
                          </p>
                          <p className={`text-sm mb-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            Reason: {refund.reason}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            Requested: {refund.requestDate} • Method: {refund.refundMethod}
                            {refund.processedDate && ` • Processed: ${refund.processedDate}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          +{getCurrentCurrency().symbol}{refund.amount}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          {refund.processingTime}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Refund Policy */}
            <div className={`p-6 rounded-lg border transition-all duration-300 ${
              darkMode
                ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                : 'border-gray-200'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Refund Policy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white/90' : 'text-gray-800'}`}>
                    Eligible for Refund:
                  </h4>
                  <ul className={`space-y-2 text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    <li className="flex items-start gap-2">
                      <CheckCircle className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`} />
                      Sessions cancelled by solver within 24 hours
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`} />
                      Technical issues preventing session completion
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`} />
                      Unused wallet balance (processing fee may apply)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`} />
                      Subscription cancellation within 7 days
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white/90' : 'text-gray-800'}`}>
                    Processing Times:
                  </h4>
                  <ul className={`space-y-2 text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    <li className="flex items-center justify-between">
                      <span>Credit/Debit Cards</span>
                      <span className="font-medium">3-5 business days</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>PayPal</span>
                      <span className="font-medium">1-2 business days</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Wallet Credit</span>
                      <span className="font-medium">Instant</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Bank Transfer</span>
                      <span className="font-medium">5-7 business days</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Coupons & Promotions Section */}
            <div className={`p-6 rounded-lg border transition-all duration-300 ${
              darkMode
                ? 'bg-[#00001a] border-white/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)] hover:shadow-[0_-3px_6px_rgba(0,0,26,0.15)]'
            }`}>
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            Coupons & Promotions
          </h3>

          {/* Add Coupon */}
          <div className={`p-3 sm:p-4 rounded-lg border mb-4 sm:mb-6 ${
            darkMode ? 'border-white/10' : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
          }`}>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className={`flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#00001a] border-gray-800 text-white placeholder-white/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                    : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 shadow-[0_2px_4px_rgba(0,0,26,0.1)]'
                }`}
              />
              <button
                onClick={() => {
                  if (!couponCode.trim()) {
                    alert('Please enter a coupon code.')
                    return
                  }
                  const foundCoupon = coupons.find(c => c.id.toLowerCase() === couponCode.toLowerCase())
                  if (foundCoupon) {
                    if (foundCoupon.status === 'available') {
                      alert(`Coupon "${foundCoupon.name}" applied successfully! You saved ${foundCoupon.type === 'percentage' ? foundCoupon.discount + '%' : getCurrentCurrency().symbol + foundCoupon.discount}.`)
                      setCouponCode('')
                    } else if (foundCoupon.status === 'used') {
                      alert('This coupon has already been used.')
                    } else {
                      alert('This coupon has expired.')
                    }
                  } else {
                    alert('Invalid coupon code. Please check and try again.')
                  }
                }}
                className={`px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  darkMode
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                    : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-gray-800 shadow-[0_2px_4px_rgba(0,0,26,0.15)]'
                }`}>
                Apply
              </button>
            </div>
          </div>

          {/* Available Coupons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {coupons.map((coupon) => (
              <div key={coupon.id} className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 min-w-0 ${
                coupon.status === 'available'
                  ? (darkMode ? 'border-green-500/30 bg-green-500/10 hover:border-green-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]')
                  : coupon.status === 'used'
                    ? (darkMode ? 'border-blue-500/30 bg-blue-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)]')
                    : (darkMode ? 'border-red-500/30 bg-red-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)]')
              }`}>
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg mb-2 sm:mb-3 ${
                    coupon.status === 'available'
                      ? (darkMode ? 'bg-green-500/20' : 'bg-gray-100')
                      : coupon.status === 'used'
                        ? (darkMode ? 'bg-blue-500/20' : 'bg-gray-100')
                        : (darkMode ? 'bg-red-500/20' : 'bg-gray-100')
                  }`}>
                    <Tag className={`w-5 h-5 sm:w-6 sm:h-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                  </div>
                  <h4 className={`text-sm sm:text-base font-bold mb-1 break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {coupon.name}
                  </h4>
                  <p className={`text-base sm:text-lg font-bold mb-2 break-words ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {coupon.type === 'percentage' ? `${coupon.discount}% OFF` : `${getCurrentCurrency().symbol}${coupon.discount} OFF`}
                  </p>
                  <p className={`text-xs mb-2 sm:mb-3 break-words ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                    Code: {coupon.id}
                  </p>
                  <p className={`text-xs break-words ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                    Min. {getCurrentCurrency().symbol}{coupon.minAmount}
                    {coupon.status === 'used' && ` • Used: ${coupon.usedDate}`}
                    {coupon.status === 'expired' && ` • Expired: ${coupon.expiryDate}`}
                    {coupon.status === 'available' && coupon.expiryDate && ` • Expires: ${coupon.expiryDate}`}
                  </p>
                  {coupon.status === 'available' && (
                    <button
                      onClick={() => {
                        if (confirm(`Use coupon "${coupon.name}" for ${coupon.type === 'percentage' ? coupon.discount + '% OFF' : getCurrentCurrency().symbol + coupon.discount + ' OFF'}?`)) {
                          alert(`Coupon "${coupon.name}" applied successfully! You saved ${coupon.type === 'percentage' ? coupon.discount + '%' : getCurrentCurrency().symbol + coupon.discount}.`)
                        }
                      }}
                      className={`mt-2 sm:mt-3 w-full px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors ${
                        darkMode ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 'bg-[#00001a] text-white hover:bg-gray-800 shadow-[0_2px_4px_rgba(0,0,26,0.15)]'
                      }`}>
                      Use Coupon
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
            </div>
          </div>
        )}

      </div>

      {/* Add Payment Method Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-lg border transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Add Payment Method
                </h3>
                <button
                  onClick={() => setShowAddPaymentModal(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-[#00001a] hover:bg-gray-100'
                  }`}
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                    { type: 'paypal', label: 'PayPal', icon: Mail },
                    { type: 'wallet', label: 'Digital Wallet', icon: Wallet },
                    { type: 'points', label: 'Reward Points', icon: Star }
                  ].map((method) => (
                    <button
                      key={method.type}
                      onClick={() => {
                        alert(`Adding ${method.label}...`)
                        setShowAddPaymentModal(false)
                      }}
                      className={`p-4 rounded-lg border transition-all duration-300 text-center ${
                        darkMode
                          ? 'border-white/20 hover:border-blue-400/50 hover:bg-blue-500/10'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <method.icon className={`w-6 h-6 mx-auto mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                      <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {method.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Money Modal */}
      {showAddMoneyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-lg border transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Add Money to Wallet
                </h3>
                <button
                  onClick={() => {
                    setShowAddMoneyModal(false)
                    setAddMoneyAmount('')
                    setSelectedPaymentMethod(null)
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-[#00001a] hover:bg-gray-100'
                  }`}
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Amount
                  </label>
                  <input
                    type="number"
                    value={addMoneyAmount}
                    onChange={(e) => setAddMoneyAmount(e.target.value)}
                    placeholder="Enter amount"
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-[#00001a] border-gray-800 text-white placeholder-white/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                        : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setAddMoneyAmount(amount.toString())}
                      className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                        addMoneyAmount === amount.toString()
                          ? (darkMode ? 'border-white bg-[#00001a] text-white hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'border-[#00001a] bg-[#00001a]/10 text-[#00001a]')
                          : (darkMode ? 'border-white/20 bg-[#00001a] text-white hover:shadow-[0_0_5px_rgba(59,130,246,0.2)]' : 'border-gray-200 text-[#00001a] hover:bg-gray-50')
                      }`}
                    >
                      {getCurrentCurrency().symbol}{amount}
                    </button>
                  ))}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    {paymentMethods.filter(method => method.type !== 'wallet' && method.type !== 'points').map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPaymentMethod(method)}
                        className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                          selectedPaymentMethod?.id === method.id
                            ? (darkMode ? 'border-white bg-[#00001a] hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'border-[#00001a] bg-[#00001a]/10')
                            : (darkMode ? 'border-white/20 bg-[#00001a] hover:shadow-[0_0_5px_rgba(59,130,246,0.2)]' : 'border-gray-200 hover:bg-gray-50')
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            darkMode ? 'bg-[#00001a] border border-white/20' : 'bg-gray-100'
                          }`}>
                            {method.type === 'card' && <CreditCard className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                            {method.type === 'paypal' && <Mail className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                          </div>
                          <div>
                            <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {method.nickname}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                              {method.type === 'card' ? `${method.brand} •••• ${method.last4}` : method.email}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!addMoneyAmount || !selectedPaymentMethod) {
                      alert('Please enter an amount and select a payment method')
                      return
                    }
                    alert(`Successfully added ${getCurrentCurrency().symbol}${addMoneyAmount} to wallet using ${selectedPaymentMethod.nickname}!`)
                    setAddMoneyAmount('')
                    setSelectedPaymentMethod(null)
                    setShowAddMoneyModal(false)
                  }}
                  disabled={!addMoneyAmount || !selectedPaymentMethod}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    !addMoneyAmount || !selectedPaymentMethod
                      ? (darkMode ? 'bg-[#00001a] text-white/50 cursor-not-allowed border border-white/20' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                      : (darkMode ? 'bg-[#00001a] text-white hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-[#00001a] text-white hover:bg-gray-800')
                  }`}
                >
                  Add Money
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Group Split Modal */}
      {showGroupSplitModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-lg border transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Group Payment Split
                </h3>
                <button
                  onClick={() => {
                    setShowGroupSplitModal(false)
                    setGroupSplitAmount('')
                    setSelectedGroupMembers([])
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-[#00001a] hover:bg-gray-100'
                  }`}
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Total Amount
                  </label>
                  <input
                    type="number"
                    value={groupSplitAmount}
                    onChange={(e) => setGroupSplitAmount(e.target.value)}
                    placeholder="Enter total amount"
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-[#00001a] border-gray-800 text-white placeholder-white/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                        : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Select Group Members
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {groupMembers.map((member) => (
                      <button
                        key={member.id}
                        onClick={() => {
                          setSelectedGroupMembers(prev =>
                            prev.includes(member.id)
                              ? prev.filter(id => id !== member.id)
                              : [...prev, member.id]
                          )
                        }}
                        className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                          selectedGroupMembers.includes(member.id)
                            ? (darkMode ? 'border-white bg-white/10' : 'border-[#00001a] bg-[#00001a]/10')
                            : (darkMode ? 'border-white/20 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50')
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                            darkMode ? 'bg-white/20 text-white' : 'bg-gray-200 text-[#00001a]'
                          }`}>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {member.name}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                              {member.email}
                            </p>
                          </div>
                          {selectedGroupMembers.includes(member.id) && (
                            <div className="ml-auto">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                darkMode ? 'bg-white text-[#00001a]' : 'bg-[#00001a] text-white'
                              }`}>
                                ✓
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  {selectedGroupMembers.length > 0 && (
                    <p className={`text-sm mt-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      {selectedGroupMembers.length} member{selectedGroupMembers.length !== 1 ? 's' : ''} selected
                      {groupSplitAmount && ` • ${getCurrentCurrency().symbol}${(parseFloat(groupSplitAmount) / (selectedGroupMembers.length + 1)).toFixed(2)} per person`}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (!groupSplitAmount || selectedGroupMembers.length === 0) {
                      alert('Please enter an amount and select at least one group member')
                      return
                    }
                    const perPersonAmount = (parseFloat(groupSplitAmount) / (selectedGroupMembers.length + 1)).toFixed(2)
                    const selectedNames = selectedGroupMembers.map(id => groupMembers.find(m => m.id === id)?.name).join(', ')
                    alert(`Group split created! ${getCurrentCurrency().symbol}${perPersonAmount} per person. Invitations sent to: ${selectedNames}`)
                    setGroupSplitAmount('')
                    setSelectedGroupMembers([])
                    setShowGroupSplitModal(false)
                  }}
                  disabled={!groupSplitAmount || selectedGroupMembers.length === 0}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    !groupSplitAmount || selectedGroupMembers.length === 0
                      ? (darkMode ? 'bg-[#00001a] text-white/50 cursor-not-allowed border border-white/20' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                      : (darkMode ? 'bg-[#00001a] text-white hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-[#00001a] text-white hover:bg-gray-800')
                  }`}
                >
                  Create Split Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-lg border transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Request Refund
                </h3>
                <button
                  onClick={() => setShowRefundModal(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-[#00001a] hover:bg-gray-100'
                  }`}
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Reason for Refund
                  </label>
                  <select className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-white/20 text-white'
                      : 'bg-white border-gray-300 text-[#00001a]'
                  }`}>
                    <option>Session cancelled by solver</option>
                    <option>Technical issues</option>
                    <option>Unsatisfactory service</option>
                    <option>Billing error</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Additional Details
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Please provide additional details..."
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-[#00001a] border-gray-800 text-white placeholder-white/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                        : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500'
                    }`}
                  />
                </div>

                <button
                  onClick={() => {
                    alert('Refund request submitted successfully! We will process it within 3-5 business days.')
                    setShowRefundModal(false)
                  }}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                      : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-gray-800'
                  }`}
                >
                  Submit Refund Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg border transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Choose Subscription Plan
                </h3>
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-[#00001a] hover:bg-gray-100'
                  }`}
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Basic', price: 9.99, interval: 'monthly', features: ['5 Sessions/month', 'Basic Support'] },
                  { name: 'Premium', price: 29.99, interval: 'monthly', features: ['Unlimited Sessions', 'Priority Support'], popular: true },
                  { name: 'Pro Annual', price: 299.99, interval: 'yearly', features: ['Everything in Premium', 'Personal Mentor'] }
                ].map((plan, index) => (
                  <div key={index} className={`p-4 rounded-lg border transition-all duration-300 ${
                    plan.popular
                      ? (darkMode ? 'border-blue-400/50 bg-blue-500/10' : 'bg-white border-gray-200 shadow-[0_3px_6px_rgba(0,0,26,0.15)]')
                      : (darkMode ? 'border-white/10' : 'bg-white border-gray-200 shadow-[0_2px_4px_rgba(0,0,26,0.1)] hover:shadow-[0_-2px_4px_rgba(0,0,26,0.1)]')
                  }`}>
                    <div className="text-center">
                      <h4 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {plan.name}
                      </h4>
                      <p className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {getCurrentCurrency().symbol}{plan.price}
                      </p>
                      <ul className="space-y-1 mb-4">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => {
                          alert(`Subscribed to ${plan.name} successfully!`)
                          setShowSubscriptionModal(false)
                        }}
                        className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          plan.popular
                            ? (darkMode ? 'bg-blue-500 text-white' : 'bg-[#00001a] text-white')
                            : (darkMode ? 'bg-white/10 text-white border border-white/20' : 'bg-gray-100 text-[#00001a] border border-gray-300')
                        }`}
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Referral Modal */}
      {showReferralModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-lg border transition-all duration-300 ${
            darkMode ? 'bg-[#00001a] border-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-gray-200'
          }`}>
            <div className="p-6">
              <div className="text-center mb-6">
                <Gift className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Referral Bonus Program
                </h3>
                <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Invite friends and earn rewards for each successful referral!
                </p>
              </div>

              <div className={`p-4 rounded-lg mb-6 ${
                darkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'
              }`}>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Your Referral Benefits:
                </h4>
                <ul className={`space-y-1 text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  <li>• Earn $10 for each friend who signs up</li>
                  <li>• Your friend gets $5 welcome bonus</li>
                  <li>• Bonus 5% on all transactions for 30 days</li>
                  <li>• Unlock premium features faster</li>
                </ul>
              </div>

              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Your Referral Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="https://seekeralone.com/ref/user123"
                    readOnly
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white'
                        : 'bg-gray-50 border-gray-300 text-[#00001a]'
                    }`}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('https://seekeralone.com/ref/user123')
                      alert('Referral link copied to clipboard!')
                    }}
                    className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'border-white/20 text-white hover:bg-white/10'
                        : 'border-gray-300 text-[#00001a] hover:bg-gray-50'
                    }`}
                  >
                    Copy
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
                    // Share functionality
                    if (navigator.share) {
                      navigator.share({
                        title: 'Join SeekerAlone',
                        text: 'Join me on SeekerAlone and get $5 welcome bonus!',
                        url: 'https://seekeralone.com/ref/user123'
                      })
                    } else {
                      navigator.clipboard.writeText('Join me on SeekerAlone and get $5 welcome bonus! https://seekeralone.com/ref/user123')
                      alert('Referral message copied to clipboard!')
                    }
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] text-white hover:bg-gray-800'
                      : 'bg-[#00001a] text-white hover:bg-gray-800'
                  }`}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default SeekerPayments

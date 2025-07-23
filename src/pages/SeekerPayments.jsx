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
      <div className="p-6 space-y-6">
        
        {/* Header */}
        <div className={`p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
            : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg border transition-all duration-300 ${
                darkMode ? 'border-white/10 hover:border-blue-400/40 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
              }`}>
                <Wallet className={`w-8 h-8 ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`} />
              </div>
              <div>
                <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Payments & Wallet
                </h2>
                <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Manage your payments, subscriptions, and wallet balance
                </p>
              </div>
            </div>

            {/* Currency Selection */}
            <div className="relative">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                  darkMode ? 'border-white/20 hover:border-blue-400/40 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] text-white' : 'border-gray-300 hover:border-gray-400 hover:shadow-md text-[#00001a]'
                }`}
              >
                <Globe className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                <span className="font-medium">
                  {getCurrentCurrency().symbol} {selectedCurrency}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''} ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
              </button>

              {showCurrencyDropdown && (
                <div className={`absolute top-full left-0 mt-2 w-full rounded-lg border shadow-lg z-50 ${
                  darkMode ? 'bg-[#00001a] border-white/20' : 'bg-white border-gray-200'
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
          <div className={`p-1 rounded-lg border ${
            darkMode ? 'border-white/10' : 'border-gray-200'
          }`}>
            <div className="flex space-x-1">
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? darkMode
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'bg-[#00001a] text-white shadow-lg'
                      : darkMode
                        ? 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]'
                        : 'text-gray-600 hover:text-[#00001a] hover:bg-gray-100 hover:shadow-lg'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Wallet Balance & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <div key={index} className={`group p-4 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'border-white/10 hover:border-blue-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {item.value}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
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
            <div className={`p-6 rounded-lg border transition-all duration-300 ${
              darkMode
                ? 'border-white/10 hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { icon: Plus, label: 'Add Money', action: () => setShowAddMoneyModal(true), color: 'primary' },
                  { icon: Users, label: 'Group Split', action: () => setShowGroupSplitModal(true), color: 'green' },
                  { icon: Gift, label: 'Referral Bonus', action: () => alert('Referral bonus feature coming soon! Invite friends to earn rewards.'), color: 'purple' },
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
                    className={`p-4 rounded-lg border transition-all duration-300 flex items-center gap-3 ${
                      darkMode
                        ? 'border-white/10 hover:border-blue-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] text-white'
                        : action.color === 'primary'
                          ? 'border-[#00001a] bg-[#00001a] text-white hover:bg-gray-800 hover:shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-lg text-[#00001a]'
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
            <div className={`p-6 rounded-lg border transition-all duration-300 ${
              darkMode
                ? 'border-white/10 hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Recent Transactions
                </h3>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`text-sm font-medium transition-colors ${
                    darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-[#00001a] hover:text-gray-700'
                  }`}
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {transactions.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className={`p-3 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'border-white/10 hover:border-blue-400/60 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {transaction.type === 'session' && <Video className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'wallet' && <Wallet className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'refund' && <RotateCcw className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'subscription' && <Calendar className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'group' && <Users className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'coupon' && <Tag className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'referral' && <Gift className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {transaction.description}
                          </p>
                          <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            {transaction.date} • {transaction.paymentMethod}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {transaction.amount > 0 ? '+' : ''}{getCurrentCurrency().symbol}{Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <p className={`text-sm capitalize ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
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
              ? 'border-white/10 hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
              : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Payment Methods
              </h3>
              <button
                onClick={() => setShowAddPaymentModal(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                    : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-gray-800 hover:shadow-lg'
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
                    ? 'border-white/10 hover:border-blue-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg border transition-all duration-300 ${
                        darkMode ? 'border-white/20 hover:border-blue-400/40 hover:shadow-[0_0_8px_rgba(59,130,246,0.3)]' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
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
                      ? 'border-white/10 hover:border-blue-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
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
                              ? 'bg-[#00001a] text-white border border-[#00001a] hover:bg-gray-800'
                              : 'bg-gray-100 text-[#00001a] border border-gray-300 hover:bg-gray-200'
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
          <div className={`p-6 rounded-lg border transition-all duration-300 ${
            darkMode
              ? 'border-white/10 hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
              : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Transaction History
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    darkMode ? 'text-white/50' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                        : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500'
                    }`}
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-white/20 text-white'
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
                      ? 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-gray-800 hover:shadow-lg'
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
                <div key={transaction.id} className={`p-4 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'border-white/10 hover:border-blue-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg border transition-all duration-300 ${
                        darkMode ? 'border-white/20 hover:border-blue-400/40 hover:shadow-[0_0_8px_rgba(59,130,246,0.3)]' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}>
                        {transaction.type === 'session' && <Video className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'wallet' && <Wallet className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'refund' && <RotateCcw className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'subscription' && <Calendar className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'group' && <Users className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'coupon' && <Tag className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                        {transaction.type === 'referral' && <Gift className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <p className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {transaction.description}
                          </p>
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                            transaction.status === 'completed'
                              ? (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-gray-100 text-[#00001a]')
                              : transaction.status === 'pending'
                                ? (darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-100 text-[#00001a]')
                                : (darkMode ? 'bg-red-500/20 text-red-400' : 'bg-gray-100 text-[#00001a]')
                          }`}>
                            {transaction.status}
                          </span>
                        </div>
                        <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                          {transaction.date} at {transaction.time} • {transaction.paymentMethod}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          ID: {transaction.id} • Category: {transaction.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {transaction.amount > 0 ? '+' : ''}{getCurrentCurrency().symbol}{Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2">
                        {transaction.refundable && (
                          <button
                            onClick={() => setShowRefundModal(true)}
                            className={`text-xs px-2 py-1 rounded transition-colors ${
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
                ? 'border-white/10 hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Subscriptions
                </h3>
                <button
                  onClick={() => setShowSubscriptionModal(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                      : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-gray-800 hover:shadow-lg'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  New Subscription
                </button>
              </div>

              <div className="space-y-4">
                {subscriptions.map((sub) => (
                  <div key={sub.id} className={`p-4 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'border-white/10 hover:border-blue-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg border transition-all duration-300 ${
                          darkMode ? 'border-white/20 hover:border-blue-400/40 hover:shadow-[0_0_8px_rgba(59,130,246,0.3)]' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
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
                                darkMode ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {feature}
                              </span>
                            ))}
                            {sub.features.length > 3 && (
                              <span className={`px-2 py-1 rounded text-xs ${
                                darkMode ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'
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
                ? 'border-white/10 hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
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
                      ? (darkMode ? 'border-blue-400/50 bg-blue-500/10' : 'border-gray-300 bg-gray-50')
                      : (darkMode ? 'border-white/10 hover:border-blue-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]' : 'border-gray-200 hover:border-gray-300 hover:shadow-lg')
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
                            ? (darkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-[#00001a] text-white hover:bg-gray-800')
                            : (darkMode ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' : 'bg-gray-100 text-[#00001a] border border-gray-300 hover:bg-gray-200')
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
                ? 'border-white/10 hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
            }`}>
              <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Refund History
              </h3>

              <div className="space-y-4">
                {refunds.map((refund) => (
                  <div key={refund.id} className={`p-4 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'border-white/10 hover:border-blue-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg border transition-all duration-300 ${
                          darkMode ? 'border-white/20 hover:border-blue-400/40 hover:shadow-[0_0_8px_rgba(59,130,246,0.3)]' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
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
                ? 'border-white/10 hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
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
          </div>
        )}

        {/* Coupons & Promotions Section - Only show in Overview */}
        {activeTab === 'overview' && (
          <div className={`p-6 rounded-lg border transition-all duration-300 ${
            darkMode
              ? 'border-white/10 hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
              : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
          }`}>
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            Coupons & Promotions
          </h3>

          {/* Add Coupon */}
          <div className={`p-4 rounded-lg border mb-6 ${
            darkMode ? 'border-white/10' : 'border-gray-200'
          }`}>
            <div className="flex gap-3">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className={`flex-1 px-4 py-2 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                    : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500'
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
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                    : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-gray-800'
                }`}>
                Apply
              </button>
            </div>
          </div>

          {/* Available Coupons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <div key={coupon.id} className={`p-4 rounded-lg border transition-all duration-300 ${
                coupon.status === 'available'
                  ? (darkMode ? 'border-green-500/30 bg-green-500/10 hover:border-green-400/50' : 'border-gray-300 bg-gray-50 hover:border-gray-400')
                  : coupon.status === 'used'
                    ? (darkMode ? 'border-blue-500/30 bg-blue-500/10' : 'border-gray-300 bg-gray-50')
                    : (darkMode ? 'border-red-500/30 bg-red-500/10' : 'border-gray-300 bg-gray-50')
              }`}>
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${
                    coupon.status === 'available'
                      ? (darkMode ? 'bg-green-500/20' : 'bg-gray-100')
                      : coupon.status === 'used'
                        ? (darkMode ? 'bg-blue-500/20' : 'bg-gray-100')
                        : (darkMode ? 'bg-red-500/20' : 'bg-gray-100')
                  }`}>
                    <Tag className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} />
                  </div>
                  <h4 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {coupon.name}
                  </h4>
                  <p className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {coupon.type === 'percentage' ? `${coupon.discount}% OFF` : `${getCurrentCurrency().symbol}${coupon.discount} OFF`}
                  </p>
                  <p className={`text-xs mb-3 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                    Code: {coupon.id}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
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
                      className={`mt-3 w-full px-3 py-1 rounded text-sm font-medium transition-colors ${
                        darkMode ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 'bg-[#00001a] text-white hover:bg-gray-800'
                      }`}>
                      Use Coupon
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

      </div>

      {/* Add Payment Method Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-lg border ${
            darkMode ? 'bg-[#00001a] border-white/20' : 'bg-white border-gray-200'
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
          <div className={`max-w-md w-full rounded-lg border ${
            darkMode ? 'bg-[#00001a] border-white/20' : 'bg-white border-gray-200'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Add Money to Wallet
                </h3>
                <button
                  onClick={() => setShowAddMoneyModal(false)}
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
                    placeholder="Enter amount"
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                        : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'border-white/20 text-white hover:bg-white/10'
                          : 'border-gray-200 text-[#00001a] hover:bg-gray-50'
                      }`}
                    >
                      {getCurrentCurrency().symbol}{amount}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    alert('Money added to wallet successfully!')
                    setShowAddMoneyModal(false)
                  }}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                      : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-gray-800'
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
          <div className={`max-w-md w-full rounded-lg border ${
            darkMode ? 'bg-[#00001a] border-white/20' : 'bg-white border-gray-200'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Group Payment Split
                </h3>
                <button
                  onClick={() => setShowGroupSplitModal(false)}
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
                    placeholder="Enter total amount"
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                        : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Number of People
                  </label>
                  <select className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#00001a] border-white/20 text-white'
                      : 'bg-white border-gray-300 text-[#00001a]'
                  }`}>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    <option value="5">5 people</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    alert('Group split payment initiated! Invitations sent to participants.')
                    setShowGroupSplitModal(false)
                  }}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                      : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-gray-800'
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
          <div className={`max-w-md w-full rounded-lg border ${
            darkMode ? 'bg-[#00001a] border-white/20' : 'bg-white border-gray-200'
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
                        ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
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
          <div className={`max-w-2xl w-full rounded-lg border ${
            darkMode ? 'bg-[#00001a] border-white/20' : 'bg-white border-gray-200'
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
                      ? (darkMode ? 'border-blue-400/50 bg-blue-500/10' : 'border-gray-300 bg-gray-50')
                      : (darkMode ? 'border-white/10' : 'border-gray-200')
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
    </div>
  )
}

export default SeekerPayments

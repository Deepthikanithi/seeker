import React from 'react'

const SectionTabs = ({ 
  tabs = [], 
  activeTab = '', 
  onTabChange = () => {},
  darkMode = false,
  variant = 'default', // default, pills, underline
  size = 'md', // sm, md, lg
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const getTabClasses = (tab, isActive) => {
    const baseClasses = `
      inline-flex items-center gap-2 font-medium transition-all duration-300 cursor-pointer
      ${sizeClasses[size]}
    `

    switch (variant) {
      case 'pills':
        return `${baseClasses} rounded-lg ${
          isActive 
            ? darkMode
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
              : 'bg-blue-100 text-blue-800 border border-blue-300 shadow-lg'
            : darkMode
              ? 'text-white/70 hover:text-white hover:bg-white/10'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`

      case 'underline':
        return `${baseClasses} border-b-2 ${
          isActive 
            ? darkMode
              ? 'border-blue-400 text-blue-400'
              : 'border-blue-500 text-blue-600'
            : darkMode
              ? 'border-transparent text-white/70 hover:text-white hover:border-white/30'
              : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
        }`

      case 'default':
      default:
        return `${baseClasses} rounded-lg ${
          isActive 
            ? darkMode
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'bg-blue-100 text-blue-800 border border-blue-300'
            : darkMode
              ? 'text-white/70 hover:text-white hover:bg-white/10 border border-transparent'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
        }`
    }
  }

  const containerClasses = {
    default: `flex flex-wrap gap-2 p-1 rounded-lg border ${
      darkMode ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'
    }`,
    pills: 'flex flex-wrap gap-2',
    underline: `flex border-b ${darkMode ? 'border-white/20' : 'border-gray-200'}`
  }

  return (
    <div 
      className={`${containerClasses[variant]} ${className}`}
      {...props}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id || activeTab === tab.label
        const Icon = tab.icon

        return (
          <button
            key={tab.id || tab.label}
            onClick={() => onTabChange(tab.id || tab.label)}
            className={getTabClasses(tab, isActive)}
          >
            {Icon && <Icon size={16} />}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default SectionTabs

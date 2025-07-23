import React from 'react'

const GlassButton = ({
  children,
  variant = 'primary',
  size = 'md',
  active = false,
  disabled = false,
  onClick,
  className = '',
  icon,
  darkMode = false,
  ...props
}) => {
  const baseClasses = `
    relative overflow-hidden inline-flex items-center justify-center font-medium
    transition-all duration-300 backdrop-blur-2xl border shadow-2xl
    hover:-translate-y-1 hover:shadow-3xl active:translate-y-0 active:shadow-xl
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    group cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2
  `

  // Size variants
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs rounded-lg',
    sm: 'px-3 py-1.5 text-sm rounded-xl',
    md: 'px-4 py-2 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-2xl',
    xl: 'px-8 py-4 text-lg rounded-2xl'
  }

  // Variant styles using our #00001a color scheme
  const getVariantClasses = () => {
    const variants = {
      // Primary button - main actions
      primary: active
        ? darkMode
          ? 'bg-white/30 text-white border-white/40 hover:bg-white/40 shadow-black/30 hover:shadow-black/40 focus:ring-white/50'
          : 'bg-[#00001a]/30 text-[#00001a] border-[#00001a]/40 hover:bg-[#00001a]/40 shadow-[#00001a]/30 hover:shadow-[#00001a]/40 focus:ring-[#00001a]/50'
        : darkMode
          ? 'bg-white/20 text-white border-white/30 hover:bg-white/30 shadow-black/20 hover:shadow-black/30 focus:ring-white/50'
          : 'bg-[#00001a]/20 text-[#00001a] border-[#00001a]/30 hover:bg-[#00001a]/30 shadow-[#00001a]/20 hover:shadow-[#00001a]/30 focus:ring-[#00001a]/50',

      // Secondary button - less prominent actions
      secondary: active
        ? darkMode
          ? 'bg-white/15 text-white border-white/25 hover:bg-white/20 shadow-black/20 hover:shadow-black/30 focus:ring-white/50'
          : 'bg-[#00001a]/15 text-[#00001a] border-[#00001a]/25 hover:bg-[#00001a]/20 shadow-[#00001a]/15 hover:shadow-[#00001a]/25 focus:ring-[#00001a]/50'
        : darkMode
          ? 'bg-white/10 text-white/80 border-white/20 hover:bg-white/15 hover:text-white shadow-black/10 hover:shadow-black/20 focus:ring-white/50'
          : 'bg-[#00001a]/10 text-[#00001a]/80 border-[#00001a]/20 hover:bg-[#00001a]/15 hover:text-[#00001a] shadow-[#00001a]/10 hover:shadow-[#00001a]/20 focus:ring-[#00001a]/50',

      // Ghost button - minimal style
      ghost: active
        ? darkMode
          ? 'bg-white/10 text-white border-white/20 hover:bg-white/15 shadow-black/10 hover:shadow-black/20 focus:ring-white/50'
          : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20 hover:bg-[#00001a]/15 shadow-[#00001a]/10 hover:shadow-[#00001a]/20 focus:ring-[#00001a]/50'
        : darkMode
          ? 'bg-transparent text-white/70 border-white/10 hover:bg-white/10 hover:text-white shadow-black/5 hover:shadow-black/15 focus:ring-white/50'
          : 'bg-transparent text-[#00001a]/70 border-[#00001a]/10 hover:bg-[#00001a]/10 hover:text-[#00001a] shadow-[#00001a]/5 hover:shadow-[#00001a]/15 focus:ring-[#00001a]/50',

      // Success variant - for positive actions
      success: active
        ? darkMode
          ? 'bg-white/25 text-white border-white/35 hover:bg-white/35 shadow-black/25 hover:shadow-black/35 focus:ring-white/50'
          : 'bg-[#00001a]/25 text-[#00001a] border-[#00001a]/35 hover:bg-[#00001a]/35 shadow-[#00001a]/25 hover:shadow-[#00001a]/35 focus:ring-[#00001a]/50'
        : darkMode
          ? 'bg-white/15 text-white border-white/25 hover:bg-white/25 shadow-black/15 hover:shadow-black/25 focus:ring-white/50'
          : 'bg-[#00001a]/15 text-[#00001a] border-[#00001a]/25 hover:bg-[#00001a]/25 shadow-[#00001a]/15 hover:shadow-[#00001a]/25 focus:ring-[#00001a]/50',

      // Danger variant - for destructive actions
      danger: active
        ? darkMode
          ? 'bg-white/20 text-white border-white/30 hover:bg-white/30 shadow-black/20 hover:shadow-black/30 focus:ring-white/50'
          : 'bg-[#00001a]/20 text-[#00001a] border-[#00001a]/30 hover:bg-[#00001a]/30 shadow-[#00001a]/20 hover:shadow-[#00001a]/30 focus:ring-[#00001a]/50'
        : darkMode
          ? 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:text-white shadow-black/10 hover:shadow-black/20 focus:ring-white/50'
          : 'bg-[#00001a]/10 text-[#00001a]/80 border-[#00001a]/20 hover:bg-[#00001a]/20 hover:text-[#00001a] shadow-[#00001a]/10 hover:shadow-[#00001a]/20 focus:ring-[#00001a]/50'
    }

    return variants[variant] || variants.primary
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${getVariantClasses()}
        ${className}
      `}
      {...props}
    >
      {/* Glass radiance effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        darkMode ? 'bg-gradient-to-r from-white/10 via-white/5 to-transparent' : 'bg-gradient-to-r from-[#00001a]/10 via-[#00001a]/5 to-transparent'
      }`}></div>

      {/* Shimmer effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
        darkMode ? 'bg-gradient-to-br from-white/20 via-transparent to-white/10' : 'bg-gradient-to-br from-[#00001a]/20 via-transparent to-[#00001a]/10'
      }`}></div>

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center">
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </span>
    </button>
  )
}

// Tab Button Component (for navigation tabs)
const TabButton = ({ children, active = false, darkMode = false, onClick, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300
        backdrop-blur-2xl border shadow-lg hover:-translate-y-0.5 hover:shadow-xl group
        ${active
          ? darkMode
            ? 'bg-white/20 text-white border-white/30 hover:bg-white/30 shadow-black/20 hover:shadow-black/30'
            : 'bg-[#00001a]/20 text-[#00001a] border-[#00001a]/30 hover:bg-[#00001a]/30 shadow-[#00001a]/20 hover:shadow-[#00001a]/30'
          : darkMode
            ? 'bg-white/10 text-white/70 border-white/20 hover:bg-white/15 hover:text-white shadow-black/10 hover:shadow-black/20'
            : 'bg-[#00001a]/10 text-[#00001a]/70 border-[#00001a]/20 hover:bg-[#00001a]/15 hover:text-[#00001a] shadow-[#00001a]/10 hover:shadow-[#00001a]/20'
        }
        ${className}
      `}
      {...props}
    >
      {/* Glass shine effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        darkMode ? 'bg-white/5' : 'bg-[#00001a]/5'
      }`}></div>

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

// Tag Button Component (for interests, skills, etc.)
const TagButton = ({ children, active = false, darkMode = false, onClick, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300
        backdrop-blur-2xl border shadow-lg hover:-translate-y-0.5 hover:shadow-xl group
        ${active
          ? darkMode
            ? 'bg-white/25 text-white border-white/35 hover:bg-white/35 shadow-black/20 hover:shadow-black/30'
            : 'bg-[#00001a]/25 text-[#00001a] border-[#00001a]/35 hover:bg-[#00001a]/35 shadow-[#00001a]/20 hover:shadow-[#00001a]/30'
          : darkMode
            ? 'bg-white/10 text-white/70 border-white/20 hover:bg-white/15 hover:text-white shadow-black/10 hover:shadow-black/20'
            : 'bg-[#00001a]/10 text-[#00001a]/70 border-[#00001a]/20 hover:bg-[#00001a]/15 hover:text-[#00001a] shadow-[#00001a]/10 hover:shadow-[#00001a]/20'
        }
        ${className}
      `}
      {...props}
    >
      {/* Glass shine effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        darkMode ? 'bg-white/5' : 'bg-[#00001a]/5'
      }`}></div>

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

// Difficulty Badge Component
const DifficultyBadge = ({ level, darkMode = false, className = '' }) => {
  const getStyles = () => {
    switch (level?.toLowerCase()) {
      case 'beginner':
      case 'entry-level':
        return darkMode
          ? 'bg-white/15 text-white border-white/25 shadow-black/15'
          : 'bg-[#00001a]/15 text-[#00001a] border-[#00001a]/25 shadow-[#00001a]/15'
      case 'intermediate':
      case 'mid-level':
        return darkMode
          ? 'bg-white/20 text-white border-white/30 shadow-black/20'
          : 'bg-[#00001a]/20 text-[#00001a] border-[#00001a]/30 shadow-[#00001a]/20'
      case 'advanced':
      case 'senior-level':
        return darkMode
          ? 'bg-white/25 text-white border-white/35 shadow-black/25'
          : 'bg-[#00001a]/25 text-[#00001a] border-[#00001a]/35 shadow-[#00001a]/25'
      case 'expert':
      case 'executive-level':
        return darkMode
          ? 'bg-white/30 text-white border-white/40 shadow-black/30'
          : 'bg-[#00001a]/30 text-[#00001a] border-[#00001a]/40 shadow-[#00001a]/30'
      default:
        return darkMode
          ? 'bg-white/10 text-white/70 border-white/20 shadow-black/10'
          : 'bg-[#00001a]/10 text-[#00001a]/70 border-[#00001a]/20 shadow-[#00001a]/10'
    }
  }

  return (
    <span className={`
      relative overflow-hidden px-3 py-1 rounded-xl text-xs font-medium backdrop-blur-2xl border
      transition-all duration-300 hover:shadow-lg group
      ${getStyles()}
      ${className}
    `}>
      {/* Glass shine effect */}
      <span className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        darkMode ? 'bg-white/5' : 'bg-[#00001a]/5'
      }`}></span>

      {/* Content */}
      <span className="relative z-10">{level}</span>
    </span>
  )
}

export { GlassButton as default, TabButton, TagButton, DifficultyBadge }

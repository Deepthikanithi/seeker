import React from 'react'

const Button = ({ 
  children, 
  darkMode, 
  variant = 'primary', // primary, secondary, outline, ghost
  size = 'md', // sm, md, lg
  className = '', 
  disabled = false,
  loading = false,
  onClick = null,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const variantClasses = {
    primary: darkMode
      ? 'bg-white/20 text-white border border-white/30'
      : 'bg-[#00001a] text-white border border-[#00001a]',

    secondary: darkMode
      ? 'bg-white/10 text-white/70 border border-white/20'
      : 'bg-[#00001a] text-white border border-[#00001a]',

    outline: darkMode
      ? 'bg-transparent text-white border border-white/20'
      : 'bg-transparent text-[#00001a] border border-[#00001a]/40',

    ghost: darkMode
      ? 'bg-transparent text-white/70'
      : 'bg-transparent text-[#00001a]'
  }

  const baseClasses = `
    inline-flex items-center justify-center gap-2 rounded-lg font-medium 
    transition-all duration-300 focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-white/50' : 'focus:ring-[#00001a]/50'}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `

  return (
    <button 
      className={baseClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}

export default Button

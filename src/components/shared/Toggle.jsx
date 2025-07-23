import React from 'react'

const Toggle = ({
  checked = false,
  onChange = () => {},
  disabled = false,
  size = 'md', // sm, md, lg
  color = 'blue', // blue, green, red, purple
  darkMode = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-5 w-9',
    md: 'h-6 w-11',
    lg: 'h-7 w-13'
  }

  const sliderSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4', 
    lg: 'h-5 w-5'
  }

  const translateClasses = {
    sm: checked ? 'translate-x-5' : 'translate-x-1',
    md: checked ? 'translate-x-6' : 'translate-x-1',
    lg: checked ? 'translate-x-7' : 'translate-x-1'
  }

  const colorClasses = {
    blue: checked
      ? (darkMode ? 'bg-blue-500' : 'bg-[#00001a]')
      : (darkMode ? 'bg-white/20' : 'bg-gray-300'),
    green: checked
      ? (darkMode ? 'bg-green-500' : 'bg-[#00001a]')
      : (darkMode ? 'bg-white/20' : 'bg-gray-300'),
    red: checked
      ? (darkMode ? 'bg-red-500' : 'bg-[#00001a]')
      : (darkMode ? 'bg-white/20' : 'bg-gray-300'),
    purple: checked
      ? (darkMode ? 'bg-purple-500' : 'bg-[#00001a]')
      : (darkMode ? 'bg-white/20' : 'bg-gray-300')
  }

  return (
    <button
      type="button"
      className={`
        relative inline-flex items-center rounded-full transition-colors duration-300 
        focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2
        ${sizeClasses[size]}
        ${colorClasses[color]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      {...props}
    >
      <span
        className={`
          inline-block transform rounded-full bg-white transition-transform duration-300
          ${sliderSizes[size]}
          ${translateClasses[size]}
        `}
      />
    </button>
  )
}

export default Toggle

import React from 'react'

const LoadingSpinner = ({ 
  size = 'md', // xs, sm, md, lg, xl
  color = 'blue', // blue, white, gray, green, red
  className = '',
  text = '',
  darkMode = false,
  ...props 
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3 border',
    sm: 'w-4 h-4 border',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-2',
    xl: 'w-12 h-12 border-4'
  }

  const colorClasses = {
    blue: 'border-blue-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-500 border-t-transparent',
    green: 'border-green-500 border-t-transparent',
    red: 'border-red-500 border-t-transparent'
  }

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }

  return (
    <div 
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      {...props}
    >
      <div 
        className={`
          rounded-full animate-spin
          ${sizeClasses[size]}
          ${colorClasses[color]}
        `}
      />
      {text && (
        <p className={`
          font-medium
          ${textSizeClasses[size]}
          ${darkMode ? 'text-white/70' : 'text-gray-600'}
        `}>
          {text}
        </p>
      )}
    </div>
  )
}

export default LoadingSpinner

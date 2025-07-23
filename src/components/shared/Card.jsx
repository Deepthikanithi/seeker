import React from 'react'

const Card = ({ 
  children, 
  darkMode, 
  className = '', 
  hover = true, 
  onClick = null,
  style = {},
  ...props 
}) => {
  const baseClasses = `
    p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden
    ${darkMode 
      ? 'bg-white/3 border-white/20' 
      : 'bg-white border-gray-200'
    }
    ${hover ? (darkMode 
      ? 'hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
      : 'hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
    ) : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `

  const cardStyle = darkMode ? {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    ...style
  } : {
    ...style
  }

  return (
    <div 
      className={baseClasses}
      style={cardStyle}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card

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
    p-6 rounded-lg backdrop-blur-xl border shadow-xl relative overflow-hidden
    ${darkMode
      ? 'bg-white/3 border-white/20'
      : 'bg-white border-gray-200'
    }
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `

  const cardStyle = darkMode ? {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
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

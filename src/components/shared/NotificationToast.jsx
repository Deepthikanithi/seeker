import React, { useEffect, useState } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

const NotificationToast = ({ 
  notifications = [], 
  onRemove = () => {},
  darkMode = false,
  position = 'top-right', // top-right, top-left, bottom-right, bottom-left
  className = '',
  ...props 
}) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />
      case 'error':
        return <AlertCircle size={20} className="text-red-500" />
      case 'warning':
        return <AlertCircle size={20} className="text-yellow-500" />
      case 'info':
      default:
        return <Info size={20} className="text-blue-500" />
    }
  }

  const getTypeClasses = (type) => {
    const baseClasses = darkMode 
      ? 'border-white/20 text-white' 
      : 'border-gray-200 text-gray-900'

    switch (type) {
      case 'success':
        return `${baseClasses} ${darkMode ? 'bg-green-500/20' : 'bg-green-50'}`
      case 'error':
        return `${baseClasses} ${darkMode ? 'bg-red-500/20' : 'bg-red-50'}`
      case 'warning':
        return `${baseClasses} ${darkMode ? 'bg-yellow-500/20' : 'bg-yellow-50'}`
      case 'info':
      default:
        return `${baseClasses} ${darkMode ? 'bg-blue-500/20' : 'bg-blue-50'}`
    }
  }

  if (!notifications.length) return null

  return (
    <div 
      className={`fixed z-50 space-y-2 ${positionClasses[position]} ${className}`}
      {...props}
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            flex items-start gap-3 p-4 rounded-lg border backdrop-blur-xl shadow-lg
            transform transition-all duration-300 animate-slide-in-right
            max-w-sm w-full
            ${getTypeClasses(notification.type)}
          `}
          style={darkMode ? {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
          } : {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            {getIcon(notification.type)}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            {notification.title && (
              <p className={`text-sm font-medium ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {notification.title}
              </p>
            )}
            <p className={`text-sm ${
              darkMode ? 'text-white/80' : 'text-gray-700'
            } ${notification.title ? 'mt-1' : ''}`}>
              {notification.message}
            </p>
          </div>
          
          {/* Close button */}
          <button
            onClick={() => onRemove(notification.id)}
            className={`flex-shrink-0 p-1 rounded-md transition-colors duration-200 ${
              darkMode 
                ? 'text-white/70 hover:text-white hover:bg-white/10' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default NotificationToast

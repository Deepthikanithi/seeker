import React, { useEffect } from 'react'
import { X } from 'lucide-react'

const Modal = ({ 
  isOpen = false, 
  onClose = () => {}, 
  title = '', 
  children, 
  darkMode = false,
  size = 'md', // sm, md, lg, xl
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      {...props}
    >
      {/* Overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          darkMode ? 'bg-black/50' : 'bg-black/30'
        }`}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      
      {/* Modal */}
      <div 
        className={`
          relative w-full backdrop-blur-xl border rounded-lg shadow-xl 
          transform transition-all duration-300 scale-100 opacity-100
          ${sizeClasses[size]}
          ${darkMode 
            ? 'bg-[#00001a]/90 border-white/20' 
            : 'bg-white/90 border-gray-200'
          }
          ${className}
        `}
        style={darkMode ? {
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
        } : {
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className={`flex items-center justify-between p-6 border-b ${
            darkMode ? 'border-white/10' : 'border-gray-200'
          }`}>
            {title && (
              <h3 className={`text-lg font-semibold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  darkMode 
                    ? 'text-white/70 hover:text-white hover:bg-white/10' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal

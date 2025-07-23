import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCardClasses, getButtonClasses, getThemeClasses } from '../constants/styles'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  // Update body class and localStorage when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  // Theme utility functions
  const theme = {
    darkMode,
    setDarkMode,
    toggleDarkMode,
    
    // Helper functions for consistent styling
    getClasses: (lightClass, darkClass) => getThemeClasses(darkMode, lightClass, darkClass),
    
    getCardClasses: (hover = true) => getCardClasses(darkMode, hover),
    
    getButtonClasses: (variant = 'primary', size = 'md') => getButtonClasses(darkMode, variant, size),
    
    // Common class combinations
    classes: {
      // Backgrounds
      background: darkMode ? 'bg-[#00001a]' : 'bg-gray-50',
      cardBackground: darkMode ? 'bg-white/3' : 'bg-white',
      modalBackground: darkMode ? 'bg-[#00001a]/90' : 'bg-white/90',
      
      // Borders
      border: darkMode ? 'border-white/20' : 'border-gray-200',
      borderHover: darkMode ? 'hover:border-blue-400/50' : 'hover:border-gray-300',
      
      // Text colors
      textPrimary: darkMode ? 'text-white' : 'text-[#00001a]',
      textSecondary: darkMode ? 'text-white/70' : 'text-gray-600',
      textMuted: darkMode ? 'text-white/60' : 'text-gray-500',
      
      // Hover effects
      hoverCard: darkMode 
        ? 'hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
        : 'hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]',
      
      hoverButton: darkMode
        ? 'hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
        : 'hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]',
      
      // Glassmorphism
      glass: darkMode 
        ? 'backdrop-blur-xl bg-white/3 border-white/20'
        : 'backdrop-blur-xl bg-white border-gray-200',
      
      // Shadows
      shadow: 'shadow-xl',
      shadowHover: darkMode 
        ? 'hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
        : 'hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]',
      
      // Transitions
      transition: 'transition-all duration-300',
      transitionSlow: 'transition-all duration-500'
    },
    
    // Style objects for inline styles
    styles: {
      card: darkMode ? {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      } : {},
      
      modal: darkMode ? {
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
      } : {
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }
    }
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

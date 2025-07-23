// Style constants for consistent theming

// Color schemes
export const COLORS = {
  primary: {
    light: '#00001a',
    dark: '#ffffff'
  },
  background: {
    light: 'bg-gray-50',
    dark: 'bg-[#00001a]'
  },
  card: {
    light: 'bg-white',
    dark: 'bg-white/3'
  },
  border: {
    light: 'border-gray-200',
    dark: 'border-white/20'
  },
  text: {
    primary: {
      light: 'text-[#00001a]',
      dark: 'text-white'
    },
    secondary: {
      light: 'text-gray-600',
      dark: 'text-white/70'
    },
    muted: {
      light: 'text-gray-500',
      dark: 'text-white/60'
    }
  }
}

// Glassmorphism effects
export const GLASS_EFFECTS = {
  card: {
    light: 'backdrop-blur-xl bg-white border-gray-200',
    dark: 'backdrop-blur-xl bg-white/3 border-white/20'
  },
  modal: {
    light: 'backdrop-blur-xl bg-white/90 border-gray-200',
    dark: 'backdrop-blur-xl bg-[#00001a]/90 border-white/20'
  }
}

// Hover effects
export const HOVER_EFFECTS = {
  card: {
    light: 'hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]',
    dark: 'hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
  },
  button: {
    primary: {
      light: 'hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]',
      dark: 'hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
    },
    secondary: {
      light: 'hover:bg-gray-100',
      dark: 'hover:bg-white/10'
    }
  },
  tile: {
    light: 'hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]',
    dark: 'hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
  }
}

// Shadow effects
export const SHADOWS = {
  card: {
    light: 'shadow-xl',
    dark: 'shadow-xl'
  },
  modal: {
    light: 'shadow-2xl',
    dark: 'shadow-2xl'
  },
  dropdown: {
    light: 'shadow-lg',
    dark: 'shadow-lg'
  }
}

// Animation classes
export const ANIMATIONS = {
  transition: 'transition-all duration-300',
  transitionSlow: 'transition-all duration-500',
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in-right',
  pulse: 'animate-pulse'
}

// Layout constants
export const LAYOUT = {
  container: 'min-h-screen transition-all duration-500',
  section: 'p-6 space-y-6',
  grid: {
    responsive: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    cards: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    stats: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
  }
}

// Component size variants
export const SIZES = {
  button: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  },
  input: {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base'
  },
  modal: {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }
}

// Helper functions
export const getThemeClasses = (darkMode, lightClass, darkClass) => {
  return darkMode ? darkClass : lightClass
}

export const getCardClasses = (darkMode, hover = true) => {
  const base = `p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden`
  const theme = darkMode 
    ? 'bg-white/3 border-white/20' 
    : 'bg-white border-gray-200'
  const hoverEffect = hover 
    ? (darkMode 
      ? 'hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
      : 'hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]')
    : ''
  
  return `${base} ${theme} ${hoverEffect}`
}

export const getButtonClasses = (darkMode, variant = 'primary', size = 'md') => {
  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50`
  
  const sizeClass = SIZES.button[size]
  
  const variantClasses = {
    primary: darkMode 
      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
      : 'bg-blue-100 text-blue-800 border border-blue-300 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]',
    
    secondary: darkMode
      ? 'bg-white/10 text-white/70 border border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
  }
  
  return `${baseClasses} ${sizeClass} ${variantClasses[variant]}`
}

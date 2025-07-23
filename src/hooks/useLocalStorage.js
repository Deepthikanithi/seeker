import { useState, useEffect, useCallback } from 'react'

export const useLocalStorage = (key, initialValue) => {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Update localStorage when value changes
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  // Remove item from localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

// Hook for managing multiple localStorage values
export const useLocalStorageState = (initialState = {}) => {
  const [state, setState] = useState(() => {
    const savedState = {}
    
    Object.keys(initialState).forEach(key => {
      try {
        const item = window.localStorage.getItem(key)
        savedState[key] = item ? JSON.parse(item) : initialState[key]
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error)
        savedState[key] = initialState[key]
      }
    })
    
    return savedState
  })

  const updateState = useCallback((key, value) => {
    setState(prev => {
      const newValue = value instanceof Function ? value(prev[key]) : value
      const newState = { ...prev, [key]: newValue }
      
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
      
      return newState
    })
  }, [])

  const updateMultiple = useCallback((updates) => {
    setState(prev => {
      const newState = { ...prev }
      
      Object.entries(updates).forEach(([key, value]) => {
        const newValue = value instanceof Function ? value(prev[key]) : value
        newState[key] = newValue
        
        try {
          window.localStorage.setItem(key, JSON.stringify(newValue))
        } catch (error) {
          console.error(`Error setting localStorage key "${key}":`, error)
        }
      })
      
      return newState
    })
  }, [])

  const removeKey = useCallback((key) => {
    setState(prev => {
      const newState = { ...prev }
      delete newState[key]
      
      try {
        window.localStorage.removeItem(key)
      } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error)
      }
      
      return newState
    })
  }, [])

  const resetToDefaults = useCallback(() => {
    setState(initialState)
    
    Object.keys(initialState).forEach(key => {
      try {
        window.localStorage.setItem(key, JSON.stringify(initialState[key]))
      } catch (error) {
        console.error(`Error resetting localStorage key "${key}":`, error)
      }
    })
  }, [initialState])

  return {
    state,
    updateState,
    updateMultiple,
    removeKey,
    resetToDefaults
  }
}

// Hook for syncing state with localStorage automatically
export const usePersistentState = (key, initialValue) => {
  const [value, setValue] = useLocalStorage(key, initialValue)

  // Listen for changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, setValue])

  return [value, setValue]
}

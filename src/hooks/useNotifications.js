import { useState, useCallback } from 'react'
import { createNotification } from '../utils/notifications'

export const useNotifications = (maxNotifications = 5) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((message, type = 'info', title = '', duration = 5000) => {
    const notification = createNotification(message, type, title, duration)
    
    setNotifications(prev => [notification, ...prev.slice(0, maxNotifications - 1)])
    
    // Auto-remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(notification.id)
      }, duration)
    }
    
    return notification.id
  }, [maxNotifications])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const showSuccess = useCallback((message, title = '') => {
    return addNotification(message, 'success', title)
  }, [addNotification])

  const showError = useCallback((message, title = '') => {
    return addNotification(message, 'error', title)
  }, [addNotification])

  const showWarning = useCallback((message, title = '') => {
    return addNotification(message, 'warning', title)
  }, [addNotification])

  const showInfo = useCallback((message, title = '') => {
    return addNotification(message, 'info', title)
  }, [addNotification])

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}

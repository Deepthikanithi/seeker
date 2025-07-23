// Notification utility functions

export const createNotification = (message, type = 'info', title = '', duration = 5000) => {
  return {
    id: Date.now() + Math.random(),
    message,
    type, // 'success', 'error', 'warning', 'info'
    title,
    timestamp: new Date().toISOString(),
    duration
  }
}

export const showNotificationMessage = (notifications, setNotifications, message, type = 'success', title = '') => {
  const notification = createNotification(message, type, title)
  
  setNotifications(prev => [notification, ...prev.slice(0, 4)]) // Keep max 5 notifications
  
  // Auto-remove notification after duration
  setTimeout(() => {
    setNotifications(prev => prev.filter(n => n.id !== notification.id))
  }, notification.duration)
  
  return notification.id
}

export const removeNotification = (notifications, setNotifications, id) => {
  setNotifications(prev => prev.filter(n => n.id !== id))
}

export const clearAllNotifications = (setNotifications) => {
  setNotifications([])
}

// DOM-based notification system (for legacy support)
export const showDOMNotification = (message, type = 'success', darkMode = false, duration = 3000) => {
  const notification = document.createElement('div')
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-500 transform translate-x-full ${
    darkMode
      ? type === 'success' 
        ? 'bg-green-500/20 border border-green-500/30 text-green-400'
        : type === 'error'
        ? 'bg-red-500/20 border border-red-500/30 text-red-400'
        : 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
      : type === 'success'
      ? 'bg-green-100 border border-green-300 text-green-800'
      : type === 'error'
      ? 'bg-red-100 border border-red-300 text-red-800'
      : 'bg-blue-100 border border-blue-300 text-blue-800'
  }`
  
  notification.innerHTML = `
    <div class="flex items-center gap-2">
      <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
      <span>${message}</span>
    </div>
  `
  
  document.body.appendChild(notification)
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)'
  }, 100)
  
  // Remove after duration
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)'
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 500)
  }, duration)
}

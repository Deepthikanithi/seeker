// Async utility functions

export const handleAsyncAction = async (
  action, 
  setIsLoading, 
  onSuccess = null, 
  onError = null,
  loadingDelay = 0
) => {
  try {
    setIsLoading(true)
    
    // Optional loading delay for better UX
    if (loadingDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, loadingDelay))
    }
    
    const result = await action()
    
    if (onSuccess) {
      onSuccess(result)
    }
    
    return { success: true, data: result }
  } catch (error) {
    console.error('Async action failed:', error)
    
    if (onError) {
      onError(error)
    }
    
    return { success: false, error: error.message }
  } finally {
    setIsLoading(false)
  }
}

export const simulateApiCall = (data = null, delay = 1000, shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Simulated API failure'))
      } else {
        resolve(data)
      }
    }, delay)
  })
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const throttle = (func, limit) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const retry = async (fn, maxAttempts = 3, delay = 1000) => {
  let lastError
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      
      if (attempt === maxAttempts) {
        throw lastError
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt))
    }
  }
}

export const timeout = (promise, ms) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Operation timed out')), ms)
    )
  ])
}

import { useState, useCallback } from 'react'

export const useAsyncAction = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const execute = useCallback(async (
    asyncFunction,
    {
      onSuccess = null,
      onError = null,
      loadingDelay = 0,
      clearPreviousData = true
    } = {}
  ) => {
    try {
      setIsLoading(true)
      setError(null)
      
      if (clearPreviousData) {
        setData(null)
      }

      // Optional loading delay for better UX
      if (loadingDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, loadingDelay))
      }

      const result = await asyncFunction()
      setData(result)

      if (onSuccess) {
        onSuccess(result)
      }

      return { success: true, data: result }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred'
      setError(errorMessage)

      if (onError) {
        onError(err)
      }

      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setIsLoading(false)
    setError(null)
    setData(null)
  }, [])

  return {
    isLoading,
    error,
    data,
    execute,
    reset
  }
}

// Hook for multiple async actions
export const useAsyncActions = () => {
  const [loadingStates, setLoadingStates] = useState({})
  const [errors, setErrors] = useState({})
  const [dataStates, setDataStates] = useState({})

  const execute = useCallback(async (
    key,
    asyncFunction,
    {
      onSuccess = null,
      onError = null,
      loadingDelay = 0
    } = {}
  ) => {
    try {
      setLoadingStates(prev => ({ ...prev, [key]: true }))
      setErrors(prev => ({ ...prev, [key]: null }))

      if (loadingDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, loadingDelay))
      }

      const result = await asyncFunction()
      setDataStates(prev => ({ ...prev, [key]: result }))

      if (onSuccess) {
        onSuccess(result)
      }

      return { success: true, data: result }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred'
      setErrors(prev => ({ ...prev, [key]: errorMessage }))

      if (onError) {
        onError(err)
      }

      return { success: false, error: errorMessage }
    } finally {
      setLoadingStates(prev => ({ ...prev, [key]: false }))
    }
  }, [])

  const reset = useCallback((key = null) => {
    if (key) {
      setLoadingStates(prev => ({ ...prev, [key]: false }))
      setErrors(prev => ({ ...prev, [key]: null }))
      setDataStates(prev => ({ ...prev, [key]: null }))
    } else {
      setLoadingStates({})
      setErrors({})
      setDataStates({})
    }
  }, [])

  const isLoading = useCallback((key) => loadingStates[key] || false, [loadingStates])
  const getError = useCallback((key) => errors[key] || null, [errors])
  const getData = useCallback((key) => dataStates[key] || null, [dataStates])

  return {
    execute,
    reset,
    isLoading,
    getError,
    getData,
    loadingStates,
    errors,
    dataStates
  }
}

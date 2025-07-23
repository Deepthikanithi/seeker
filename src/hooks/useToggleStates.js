import { useState, useCallback } from 'react'

export const useToggleStates = (initialStates = {}) => {
  const [toggleStates, setToggleStates] = useState(initialStates)

  const toggle = useCallback((key) => {
    setToggleStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }, [])

  const setToggle = useCallback((key, value) => {
    setToggleStates(prev => ({
      ...prev,
      [key]: value
    }))
  }, [])

  const setMultipleToggles = useCallback((updates) => {
    setToggleStates(prev => ({
      ...prev,
      ...updates
    }))
  }, [])

  const enableAll = useCallback(() => {
    setToggleStates(prev => 
      Object.keys(prev).reduce((acc, key) => ({
        ...acc,
        [key]: true
      }), {})
    )
  }, [])

  const disableAll = useCallback(() => {
    setToggleStates(prev => 
      Object.keys(prev).reduce((acc, key) => ({
        ...acc,
        [key]: false
      }), {})
    )
  }, [])

  const resetToDefaults = useCallback(() => {
    setToggleStates(initialStates)
  }, [initialStates])

  const getToggleValue = useCallback((key) => {
    return toggleStates[key] || false
  }, [toggleStates])

  const getAllEnabled = useCallback(() => {
    return Object.entries(toggleStates)
      .filter(([_, value]) => value)
      .map(([key, _]) => key)
  }, [toggleStates])

  const getAllDisabled = useCallback(() => {
    return Object.entries(toggleStates)
      .filter(([_, value]) => !value)
      .map(([key, _]) => key)
  }, [toggleStates])

  return {
    toggleStates,
    toggle,
    setToggle,
    setMultipleToggles,
    enableAll,
    disableAll,
    resetToDefaults,
    getToggleValue,
    getAllEnabled,
    getAllDisabled
  }
}

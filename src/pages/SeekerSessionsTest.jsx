import React from 'react'

const SeekerSessionsTest = ({ darkMode }) => {
  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-[#00001a] text-white' : 'bg-gray-50 text-black'}`}>
      <h1 className="text-2xl font-bold mb-4">Seeker Sessions Test</h1>
      <p>This is a test component to verify routing works.</p>
      <div className="mt-4 p-4 border rounded">
        <p>Dark Mode: {darkMode ? 'ON' : 'OFF'}</p>
      </div>
    </div>
  )
}

export default SeekerSessionsTest

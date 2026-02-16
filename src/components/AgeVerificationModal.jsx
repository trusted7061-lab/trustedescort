import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function AgeVerificationModal({ onVerify }) {
  const [birthYear, setBirthYear] = useState('')
  const [error, setError] = useState('')

  const handleVerify = () => {
    if (!birthYear) {
      setError('Please select your birth year')
      return
    }

    const currentYear = new Date().getFullYear()
    const age = currentYear - parseInt(birthYear)

    if (age >= 18) {
      setError('')
      onVerify()
    } else {
      setError('You must be 18 or older to access this content')
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 60 }, (_, i) => currentYear - 18 - i)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleVerify()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="card-glass border border-gold/30 p-8 text-center">
            {/* Icon */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6 inline-block"
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gold to-orange-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </motion.div>

            <h2 className="text-3xl font-serif font-bold text-white mb-2">Age Verification</h2>
            <p className="text-gray-300 text-sm mb-6">
              You must be at least 18 years old to access this content.
            </p>

            {/* Birth Year Selection */}
            <div className="mb-6">
              <label className="block text-sm font-sans text-gray-300 mb-3">
                Select Your Birth Year
              </label>
              <select
                value={birthYear}
                onChange={(e) => {
                  setBirthYear(e.target.value)
                  setError('')
                }}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-dark-bg border border-gold/30 text-white rounded-lg font-sans focus:border-gold focus:outline-none transition-colors"
              >
                <option value="">-- Select Year --</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 p-3 bg-red-500/20 border border-red-500/50 text-red-300 text-xs rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVerify}
                className="w-full btn-gold font-sans"
              >
                I Confirm
              </motion.button>

              <p className="text-xs text-gray-500 leading-relaxed">
                By confirming, you certify that you are at least 18 years of age and agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AgeVerificationModal

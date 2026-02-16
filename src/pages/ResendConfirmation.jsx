import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { resendVerificationCode } from '../services/emailService'

function ResendConfirmation() {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      const result = await resendVerificationCode(email, 'User')
      
      if (result.success) {
        setIsSuccess(true)
        setErrors({})
      } else {
        setErrors({ submit: result.error || 'Failed to send verification email. Please try again.' })
      }
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to send verification email. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <>
      <Helmet>
        <title>Resend Confirmation | Trusted Escort</title>
        <meta name="title" content="Resend Confirmation | Trusted Escort" />
        <meta name="description" content="Resend your confirmation email from Trusted Escort." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-dark-bg pt-32 pb-20">
        <div className="max-w-md mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
          >
            <motion.div variants={itemVariants} className="bg-dark-card border border-gold/20 rounded-xl p-8 backdrop-blur-sm">
              {!isSuccess ? (
                <>
                  <div className="text-center mb-8">
                    <div className="text-5xl mb-4">📧</div>
                    <h1 className="text-4xl font-serif font-bold mb-2">
                      Resend <span className="text-gold">Confirmation</span>
                    </h1>
                    <p className="text-gray-400">
                      Enter your email to receive a new confirmation link
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (errors.email) setErrors({})
                        }}
                        placeholder="Enter your email"
                        autoComplete="off"
                        className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition ${
                          errors.email ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                        }`}
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-dark-bg font-bold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      {isLoading ? 'Sending...' : 'Resend Confirmation Email'}
                    </button>
                    {errors.submit && <p className="text-red-400 text-sm mt-2">{errors.submit}</p>}
                  </form>

                  {/* Back to Sign In */}
                  <div className="mt-6 text-center">
                    <Link to="/signin" className="text-gold hover:text-gold/80 transition inline-flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to Sign In
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-6">✅</div>
                  <h2 className="text-3xl font-serif font-bold text-gold mb-4">
                    Confirmation Sent!
                  </h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    We've sent a new confirmation email to <strong className="text-white">{email}</strong>
                  </p>
                  <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-400">
                      <strong className="text-gold">Note:</strong> Please check your inbox and spam folder. 
                      The confirmation link will expire in 24 hours.
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      <strong className="text-gold">Demo Mode:</strong> If emails aren't working, check the browser console (F12) for the verification code.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Link
                      to="/signin"
                      className="block w-full bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-dark-bg font-bold py-3 rounded-lg transition transform hover:scale-105 text-center"
                    >
                      Back to Sign In
                    </Link>
                    <button
                      onClick={() => {
                        setIsSuccess(false)
                        setEmail('')
                      }}
                      className="block w-full text-gold hover:text-gold/80 transition py-2"
                    >
                      Use Different Email
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default ResendConfirmation

import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { forgotPassword, resetPassword } from '../services/profileService'

function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: Enter identifier, 2: Enter OTP & new password, 3: Success
  const [loginMethod, setLoginMethod] = useState('email') // 'email' or 'phone'
  const [identifier, setIdentifier] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  const validateIdentifier = () => {
    const newErrors = {}

    if (loginMethod === 'email') {
      if (!identifier.trim()) {
        newErrors.identifier = 'Email is required'
      } else if (!identifier.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors.identifier = 'Please enter a valid email'
      }
    } else {
      const cleanPhone = identifier.replace(/[\s\-\+]/g, '').replace(/^91/, '')
      if (!cleanPhone) {
        newErrors.identifier = 'Phone number is required'
      } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        newErrors.identifier = 'Please enter a valid 10-digit Indian phone number'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateReset = () => {
    const newErrors = {}

    if (!otp || otp.length !== 6) {
      newErrors.otp = 'Please enter a valid 6-digit code'
    }

    if (!newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters'
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSendCode = async (e) => {
    e.preventDefault()
    if (!validateIdentifier()) return

    setIsLoading(true)
    
    try {
      const cleanIdentifier = loginMethod === 'email' 
        ? identifier.trim() 
        : identifier.replace(/[\s\-\+]/g, '').replace(/^91/, '')
      
      await forgotPassword(cleanIdentifier)
      setStep(2)
      startResendTimer()
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to send reset code' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!validateReset()) return

    setIsLoading(true)
    
    try {
      const cleanIdentifier = loginMethod === 'email' 
        ? identifier.trim() 
        : identifier.replace(/[\s\-\+]/g, '').replace(/^91/, '')
      
      await resetPassword(cleanIdentifier, otp, newPassword)
      setStep(3)
      
      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        navigate('/signin', { state: { message: 'Password reset successful! Please sign in.' } })
      }, 3000)
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to reset password' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (resendTimer > 0) return
    
    setIsLoading(true)
    try {
      const cleanIdentifier = loginMethod === 'email' 
        ? identifier.trim() 
        : identifier.replace(/[\s\-\+]/g, '').replace(/^91/, '')
      
      await forgotPassword(cleanIdentifier)
      startResendTimer()
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to resend code' })
    } finally {
      setIsLoading(false)
    }
  }

  const startResendTimer = () => {
    setResendTimer(60)
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
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
        <title>Forgot Password | Trusted Escort</title>
        <meta name="title" content="Forgot Password | Trusted Escort" />
        <meta name="description" content="Reset your Trusted Escort password. Enter your email or phone to receive password reset code." />
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
              
              {/* Step 1: Enter Email/Phone */}
              {step === 1 && (
                <>
                  <div className="text-center mb-8">
                    <div className="text-5xl mb-4">🔑</div>
                    <h1 className="text-4xl font-serif font-bold mb-2">
                      Forgot <span className="text-gold">Password?</span>
                    </h1>
                    <p className="text-gray-400">
                      Enter your email or phone and we'll send you a reset code
                    </p>
                  </div>

                  {/* Error Message */}
                  {errors.submit && (
                    <div className="mb-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400">
                      {errors.submit}
                    </div>
                  )}

                  <form onSubmit={handleSendCode} className="space-y-6">
                    {/* Method Toggle */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Reset via
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setLoginMethod('email')
                            setIdentifier('')
                            setErrors({})
                          }}
                          className={`flex-1 py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                            loginMethod === 'email'
                              ? 'bg-gold text-dark-bg'
                              : 'bg-dark-bg border border-gold/30 text-gray-300 hover:border-gold/50'
                          }`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Email
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLoginMethod('phone')
                            setIdentifier('')
                            setErrors({})
                          }}
                          className={`flex-1 py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                            loginMethod === 'phone'
                              ? 'bg-gold text-dark-bg'
                              : 'bg-dark-bg border border-gold/30 text-gray-300 hover:border-gold/50'
                          }`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          Phone
                        </button>
                      </div>
                    </div>

                    {/* Email/Phone Field */}
                    <div>
                      <label htmlFor="identifier" className="block text-sm font-medium text-gray-300 mb-2">
                        {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
                      </label>
                      {loginMethod === 'email' ? (
                        <input
                          type="email"
                          id="identifier"
                          value={identifier}
                          onChange={(e) => {
                            setIdentifier(e.target.value)
                            if (errors.identifier) setErrors({})
                          }}
                          placeholder="Enter your email"
                          autoComplete="off"
                          className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition ${
                            errors.identifier ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                          }`}
                        />
                      ) : (
                        <div className="flex">
                          <span className="inline-flex items-center px-3 bg-dark-bg border border-r-0 border-gold/30 rounded-l-lg text-gray-400">
                            +91
                          </span>
                          <input
                            type="tel"
                            id="identifier"
                            value={identifier}
                            onChange={(e) => {
                              setIdentifier(e.target.value.replace(/\D/g, '').slice(0, 10))
                              if (errors.identifier) setErrors({})
                            }}
                            placeholder="Enter 10-digit phone number"
                            maxLength={10}
                            className={`flex-1 px-4 py-3 bg-dark-bg border rounded-r-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition ${
                              errors.identifier ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                            }`}
                          />
                        </div>
                      )}
                      {errors.identifier && <p className="text-red-400 text-sm mt-2">{errors.identifier}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-dark-bg font-bold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      {isLoading ? 'Sending...' : 'Send Reset Code'}
                    </button>
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
              )}

              {/* Step 2: Enter OTP and New Password */}
              {step === 2 && (
                <>
                  <div className="text-center mb-8">
                    <div className="text-5xl mb-4">🔐</div>
                    <h1 className="text-3xl font-serif font-bold mb-2">
                      Reset <span className="text-gold">Password</span>
                    </h1>
                    <p className="text-gray-400 mb-2">
                      Enter the code sent to
                    </p>
                    <p className="text-gold font-semibold">
                      {loginMethod === 'email' ? identifier : `+91 ${identifier}`}
                    </p>
                  </div>

                  {/* Error Message */}
                  {errors.submit && (
                    <div className="mb-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400">
                      {errors.submit}
                    </div>
                  )}

                  <form onSubmit={handleResetPassword} className="space-y-6">
                    {/* OTP Field */}
                    <div>
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2 text-center">
                        Verification Code
                      </label>
                      <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
                          if (errors.otp) setErrors(prev => ({ ...prev, otp: '' }))
                        }}
                        placeholder="000000"
                        maxLength={6}
                        className={`w-full px-4 py-4 bg-dark-bg border rounded-lg text-white text-center text-2xl tracking-widest placeholder-gray-600 focus:outline-none focus:border-gold transition ${
                          errors.otp ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                        }`}
                      />
                      {errors.otp && <p className="text-red-400 text-sm mt-2 text-center">{errors.otp}</p>}
                    </div>

                    {/* New Password Field */}
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="newPassword"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value)
                            if (errors.newPassword) setErrors(prev => ({ ...prev, newPassword: '' }))
                          }}
                          placeholder="Enter new password (min. 6 characters)"
                          className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition ${
                            errors.newPassword ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gold transition"
                        >
                          {showPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                      {errors.newPassword && <p className="text-red-400 text-sm mt-2">{errors.newPassword}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value)
                          if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }))
                        }}
                        placeholder="Confirm new password"
                        className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                        }`}
                      />
                      {errors.confirmPassword && <p className="text-red-400 text-sm mt-2">{errors.confirmPassword}</p>}
                    </div>

                    {/* Reset Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-dark-bg font-bold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                  </form>

                  {/* Resend Code */}
                  <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm mb-2">Didn't receive the code?</p>
                    <button
                      onClick={handleResendCode}
                      disabled={resendTimer > 0 || isLoading}
                      className="text-gold hover:text-gold/80 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                    </button>
                  </div>

                  {/* Back Button */}
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => {
                        setStep(1)
                        setOtp('')
                        setNewPassword('')
                        setConfirmPassword('')
                        setErrors({})
                      }}
                      className="text-gold hover:text-gold/80 text-sm font-medium transition"
                    >
                      ← Change {loginMethod === 'email' ? 'email' : 'phone number'}
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-gold mb-4">
                    Password Reset Successful!
                  </h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Your password has been updated. You can now sign in with your new password.
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="animate-pulse text-gold">Redirecting to sign in...</div>
                  </div>
                  <div className="mt-8">
                    <Link
                      to="/signin"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-dark-bg font-bold rounded-lg transition transform hover:scale-105"
                    >
                      Go to Sign In
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword

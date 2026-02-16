import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { registerUser, verifyCode, resendVerificationCode, googleAuth } from '../services/profileService'
import { addTestCode } from '../services/emailService'

// Google Client ID - move to env for production
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: Form, 2: Verification, 3: Success
  const [loginMethod, setLoginMethod] = useState('email') // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    agreeToTerms: false,
  })

  const [verificationCode, setVerificationCode] = useState('')
  const [verificationIdentifier, setVerificationIdentifier] = useState('') // Store the identifier used for verification
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const [googleLoaded, setGoogleLoaded] = useState(false)

  // Handle Google Sign-Up callback
  const handleGoogleCallback = useCallback(async (response) => {
    if (!response.credential) return
    
    setIsLoading(true)
    try {
      const user = await googleAuth(response.credential)
      
      // Clear persisted registration data
      sessionStorage.removeItem('registerFormData')
      sessionStorage.removeItem('registerStep')
      
      // Skip verification - Google users are already verified
      setStep(3) // Success step
      
      // Redirect after showing success
      setTimeout(() => {
        if (user.userType === 'advertiser') {
          navigate('/advertiser-dashboard')
        } else {
          navigate('/account')
        }
      }, 2000)
    } catch (error) {
      setErrors({ submit: error.message || 'Google sign-up failed' })
    } finally {
      setIsLoading(false)
    }
  }, [navigate])

  // Load Google Identity Services script
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return

    if (window.google?.accounts?.id) {
      setGoogleLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => setGoogleLoaded(true)
    document.body.appendChild(script)
  }, [])

  // Initialize Google Sign-Up when script loads
  useEffect(() => {
    if (!googleLoaded || !GOOGLE_CLIENT_ID || step !== 1) return

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCallback,
      auto_select: false,
      cancel_on_tap_outside: true,
    })

    const buttonDiv = document.getElementById('google-signup-button')
    if (buttonDiv) {
      window.google.accounts.id.renderButton(buttonDiv, {
        theme: 'filled_black',
        size: 'large',
        width: '100%',
        text: 'signup_with',
        shape: 'rectangular',
        logo_alignment: 'center',
      })
    }
  }, [googleLoaded, handleGoogleCallback, step])

  // Load persisted data on mount
  useEffect(() => {
    const persistedData = sessionStorage.getItem('registerFormData')
    const persistedStep = sessionStorage.getItem('registerStep')
    if (persistedData) {
      setFormData(JSON.parse(persistedData))
    }
    if (persistedStep) {
      setStep(parseInt(persistedStep))
    }
  }, [])

  // Persist form data and step
  useEffect(() => {
    sessionStorage.setItem('registerFormData', JSON.stringify(formData))
    sessionStorage.setItem('registerStep', step.toString())
  }, [formData, step])

  const validateForm = () => {
    const newErrors = {}

    // Validate based on login method
    if (loginMethod === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors.email = 'Please enter a valid email'
      }
    } else {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required'
      } else {
        const cleanPhone = formData.phone.replace(/[\s\-\+]/g, '').replace(/^91/, '')
        if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
          newErrors.phone = 'Please enter a valid 10-digit Indian phone number (starting with 6-9)'
        }
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business/Display name is required'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('=== FORM SUBMIT STARTED ===')
    console.log('Current step:', step)
    console.log('Login method:', loginMethod)
    console.log('Form data:', formData)

    if (!validateForm()) {
      console.log('Form validation failed')
      return
    }

    console.log('Form validation passed')
    setIsLoading(true)

    try {
      console.log('=== REGISTERING USER ===')

      // Prepare registration data based on login method
      const registrationData = {
        password: formData.password,
        businessName: formData.businessName.trim(),
      }

      if (loginMethod === 'email') {
        registrationData.email = formData.email.trim()
      } else {
        const cleanPhone = formData.phone.replace(/[\s\-\+]/g, '').replace(/^91/, '')
        registrationData.phone = cleanPhone
      }

      // Register user (this will send verification code automatically)
      const result = await registerUser(registrationData)

      console.log('Registration result:', result)

      // Store the identifier for verification
      const identifier = result.identifier || (loginMethod === 'email' ? formData.email.trim() : formData.phone.replace(/[\s\-\+]/g, '').replace(/^91/, ''))
      setVerificationIdentifier(identifier)

      // Always proceed to verification step, regardless of sending status
      console.log('Setting step to 2 (verification)')
      setStep(2)
      setErrors({})
      startResendTimer()

      const verificationMethod = result.verificationMethod || loginMethod
      const sent = verificationMethod === 'email' ? result.emailSent : result.smsSent

      if (sent) {
        const methodText = verificationMethod === 'email' ? 'email' : 'phone'
        console.log(`✅ Verification code sent via ${methodText}!`)
        alert(`Verification code sent!\n\n📱 Please check your ${methodText === 'email' ? 'inbox and spam folder' : 'SMS messages'}.\n⏰ The code will expire in 10 minutes.`)
      } else {
        console.log('⚠️ Verification sending failed, but registration successful. Check browser console (F12) for verification code.')
        alert('Registration successful!\n\n⚠️ Code sending failed, but your account was created.\n\n🔍 Check your browser console (F12) for the verification code.\n⏰ The code will expire in 10 minutes.')
        
        // Add test code to email service for demo purposes
        if (loginMethod === 'email') {
          addTestCode(formData.email.trim())
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      console.log('Error message:', error.message)
      
      // Handle different error cases
      if (error.action === 'login') {
        setErrors({ 
          submit: 'An account with this credential already exists. Please sign in instead.',
          action: 'login'
        })
      } else if (error.action === 'resend') {
        setErrors({ 
          submit: 'An account exists but is not verified. Would you like to resend the verification code?',
          action: 'resend'
        })
      } else {
        setErrors({ submit: error.message || 'Registration failed. Please try again.' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerification = async (e) => {
    e.preventDefault()
    
    if (!verificationCode || verificationCode.length !== 6) {
      setErrors({ verification: 'Please enter a valid 6-digit code' })
      return
    }

    setIsLoading(true)
    
    try {
      console.log('=== VERIFYING CODE ===')
      const identifier = verificationIdentifier || (loginMethod === 'email' ? formData.email.trim() : formData.phone.replace(/[\s\-\+]/g, '').replace(/^91/, ''))
      console.log('Identifier:', identifier)
      console.log('Entered code:', verificationCode)

      // Verify the code using backend API
      await verifyCode(identifier, verificationCode)

      console.log('Verification successful, account created')

      // Move to success step
      setStep(3)
      setErrors({})

      // Clear persisted data
      sessionStorage.removeItem('registerFormData')
      sessionStorage.removeItem('registerStep')

      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        navigate('/signin', { state: { message: 'Registration successful! Please sign in.' } })
      }, 3000)
    } catch (error) {
      console.error('Verification error:', error)
      setErrors({ verification: error.message || 'Invalid verification code' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (resendTimer > 0) return
    
    setIsLoading(true)
    try {
      const identifier = verificationIdentifier || (loginMethod === 'email' ? formData.email.trim() : formData.phone.replace(/[\s\-\+]/g, '').replace(/^91/, ''))
      const result = await resendVerificationCode(identifier, loginMethod)
      
      if (result.message) {
        setErrors({})
        startResendTimer()
        const methodText = loginMethod === 'email' ? 'email' : 'SMS'
        alert(`Verification code resent via ${methodText}!`)
      } else {
        setErrors({ verification: result.error || 'Failed to resend code. Please try again.' })
      }
    } catch (error) {
      setErrors({ verification: error.message || 'Failed to resend code. Please try again.' })
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
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
        <title>Register | Trusted Escort</title>
        <meta name="title" content="Register | Trusted Escort" />
        <meta name="description" content="Create your Trusted Escort account. Join our community and access premium escort services." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-dark-bg pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="bg-dark-card border border-gold/20 rounded-xl p-8 backdrop-blur-sm">
              {/* Step 1: Registration Form */}
              {step === 1 && (
                <>
                  <h1 className="text-4xl font-serif font-bold mb-2">
                    Create <span className="text-gold">Account</span>
                  </h1>
                  <p className="text-gray-400 mb-8">Join our exclusive community</p>

                  {/* Error Message */}
                  {errors.submit && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400"
                    >
                      {errors.submit}
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Login Method Toggle */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Register with *
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setLoginMethod('email')}
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
                          onClick={() => setLoginMethod('phone')}
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

                    {/* Email Field - shown when email method selected */}
                    {loginMethod === 'email' && (
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          autoComplete="off"
                          className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition ${
                            errors.email ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                          }`}
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
                      </div>
                    )}

                    {/* Phone Field - shown when phone method selected */}
                    {loginMethod === 'phone' && (
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 bg-dark-bg border border-r-0 border-gold/30 rounded-l-lg text-gray-400">
                            +91
                          </span>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter 10-digit phone number"
                            maxLength={10}
                            className={`flex-1 px-4 py-3 bg-dark-bg border rounded-r-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition ${
                              errors.phone ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="text-red-400 text-sm mt-2">{errors.phone}</p>}
                        <p className="text-gray-500 text-xs mt-1">We'll send an OTP to verify your phone number</p>
                      </div>
                    )}

                    {/* Business Name Field */}
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-2">
                        Business/Display Name *
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Enter your business or display name"
                        className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition ${
                          errors.businessName ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                        }`}
                      />
                      {errors.businessName && <p className="text-red-400 text-sm mt-2">{errors.businessName}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a password (min. 6 characters)"
                          className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition ${
                            errors.password ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
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
                      {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gold transition"
                        >
                          {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-red-400 text-sm mt-2">{errors.confirmPassword}</p>}
                    </div>

                    {/* Terms Agreement */}
                    <div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="agreeToTerms"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="w-4 h-4 mt-1 bg-dark-bg border border-gold/30 rounded cursor-pointer accent-gold"
                        />
                        <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-400 cursor-pointer">
                          I agree to the{' '}
                          <Link to="/terms" className="text-gold hover:text-gold/80 transition">
                            Terms and Conditions
                          </Link>
                          {' '}and{' '}
                          <Link to="/privacy-policy" className="text-gold hover:text-gold/80 transition">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                      {errors.agreeToTerms && <p className="text-red-400 text-sm mt-2">{errors.agreeToTerms}</p>}
                    </div>

                    {/* Register Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-dark-bg font-bold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      {isLoading ? 'Sending Code...' : 'Create Account'}
                    </button>
                  </form>

                  {/* Action Buttons for Error Cases */}
                  {errors.action && (
                    <div className="mt-4 space-y-3">
                      {errors.action === 'login' && (
                        <button
                          onClick={() => navigate('/signin')}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-2 rounded-lg transition transform hover:scale-105"
                        >
                          Sign In Instead
                        </button>
                      )}
                      {errors.action === 'resend' && (
                        <button
                          onClick={async () => {
                            setIsLoading(true);
                            try {
                              const identifier = loginMethod === 'email' 
                                ? formData.email.trim() 
                                : formData.phone.replace(/[\s\-\+]/g, '').replace(/^91/, '');
                              await resendVerificationCode(identifier, loginMethod);
                              setVerificationIdentifier(identifier);
                              setStep(2);
                              setErrors({});
                              startResendTimer();
                            } catch (error) {
                              setErrors({ submit: error.message || 'Failed to resend code' });
                            } finally {
                              setIsLoading(false);
                            }
                          }}
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-2 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                        >
                          {isLoading ? 'Sending...' : 'Resend Verification Code'}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Google Sign-Up Section */}
                  <div className="mt-6">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gold/20"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-dark-card text-gray-400">Or sign up with</span>
                      </div>
                    </div>
                    
                    {/* Custom Google Button - Always visible */}
                    {GOOGLE_CLIENT_ID && googleLoaded ? (
                      <div id="google-signup-button" className="flex justify-center"></div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          if (!GOOGLE_CLIENT_ID) {
                            setErrors({ submit: 'Google Sign-Up is being configured. Please use email/phone registration for now.' })
                          }
                        }}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition transform hover:scale-105 disabled:opacity-50"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Sign up with Google
                      </button>
                    )}
                  </div>

                  {/* Links */}
                  <div className="mt-6">
                    <p className="text-center text-gray-400">
                      Already have an account?{' '}
                      <Link to="/signin" className="text-gold font-semibold hover:text-gold/80 transition">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </>
              )}

              {/* Step 2: Verification */}
              {step === 2 && (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full mb-4">
                      {loginMethod === 'email' ? (
                        <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ) : (
                        <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <h1 className="text-3xl font-serif font-bold mb-2">
                      Verify Your <span className="text-gold">{loginMethod === 'email' ? 'Email' : 'Phone'}</span>
                    </h1>
                    <p className="text-gray-400 mb-2">
                      We've sent a 6-digit verification code to
                    </p>
                    <p className="text-gold font-semibold mb-4">
                      {loginMethod === 'email' ? formData.email : `+91 ${formData.phone}`}
                    </p>
                    
                    {/* Info Message */}
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-sm text-blue-300">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div className="text-left">
                          <p className="font-semibold mb-1">
                            {loginMethod === 'email' ? 'Check your email inbox' : 'Check your SMS messages'}
                          </p>
                          <p className="text-xs text-blue-400">
                            {loginMethod === 'email' ? (
                              <>
                                • Check your spam/junk folder if you don't see it
                                <br />• Email may take up to 1 minute to arrive
                              </>
                            ) : (
                              <>
                                • SMS may take up to 1 minute to arrive
                                <br />• Ensure your phone has network signal
                              </>
                            )}
                            <br />• <strong>For demo: Open browser console (F12) to see the verification code</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {errors.verification && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400"
                    >
                      {errors.verification}
                    </motion.div>
                  )}

                  <form onSubmit={handleVerification} className="space-y-6">
                    {/* Verification Code Input */}
                    <div>
                      <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-300 mb-2 text-center">
                        Enter Verification Code
                      </label>
                      <input
                        type="text"
                        id="verificationCode"
                        value={verificationCode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                          setVerificationCode(value)
                          if (errors.verification) {
                            setErrors({})
                          }
                        }}
                        placeholder="000000"
                        maxLength={6}
                        className="w-full px-4 py-4 bg-dark-bg border border-gold/30 hover:border-gold/50 rounded-lg text-white text-center text-2xl tracking-widest placeholder-gray-600 focus:outline-none focus:border-gold transition"
                      />
                      <p className="text-gray-500 text-xs text-center mt-2">
                        Enter the 6-digit code sent to your {loginMethod === 'email' ? 'email' : 'phone'}
                      </p>
                    </div>

                    {/* Verify Button */}
                    <button
                      type="submit"
                      disabled={isLoading || verificationCode.length !== 6}
                      className="w-full bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-dark-bg font-bold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      {isLoading ? 'Verifying...' : 'Verify & Create Account'}
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

                  {/* Debug: Add Test Code */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => {
                          const result = addTestCode(formData.email.trim(), '123456')
                          alert(result.message)
                        }}
                        className="text-xs text-gray-500 hover:text-gray-400 transition"
                      >
                        [DEV] Add Test Code (123456)
                      </button>
                    </div>
                  )}

                  {/* Back Button */}
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        console.log('Back to registration clicked, current step:', step);
                        setStep(1);
                        console.log('Step set to 1');
                      }}
                      className="text-gold hover:text-gold/80 text-sm font-medium transition cursor-pointer underline"
                    >
                      ← Back to registration
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
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h1 className="text-4xl font-serif font-bold mb-4">
                    Account Created <span className="text-gold">Successfully!</span>
                  </h1>
                  <p className="text-gray-400 mb-2">
                    Welcome to Trusted Escort, <span className="text-gold font-semibold">{formData.businessName}</span>!
                  </p>
                  <p className="text-gray-500 text-sm mb-6">
                    Your account has been verified and created.
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

export default Register

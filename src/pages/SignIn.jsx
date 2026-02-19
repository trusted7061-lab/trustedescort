import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { loginUser, googleAuth } from '../services/profileService'

// Google Client ID - move to env for production
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loginMethod, setLoginMethod] = useState('email') // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [googleLoaded, setGoogleLoaded] = useState(false)

  // Handle Google Sign-In callback
  const handleGoogleCallback = useCallback(async (response) => {
    if (!response.credential) return
    
    setIsLoading(true)
    try {
      const user = await googleAuth(response.credential)
      
      // Redirect based on user type
      if (user.userType === 'advertiser') {
        navigate('/advertiser-dashboard')
      } else {
        navigate('/account')
      }
    } catch (error) {
      setErrors({ submit: error.message || 'Google sign-in failed' })
    } finally {
      setIsLoading(false)
    }
  }, [navigate])

  // Load Google Identity Services script
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      console.warn('Google Client ID not configured')
      return
    }

    // Check if script already loaded
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

    return () => {
      // Cleanup not needed for Google script
    }
  }, [])

  // Initialize Google Sign-In when script loads
  useEffect(() => {
    if (!googleLoaded || !GOOGLE_CLIENT_ID) return

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCallback,
      auto_select: false,
      cancel_on_tap_outside: true,
    })

    // Render button
    const buttonDiv = document.getElementById('google-signin-button')
    if (buttonDiv) {
      window.google.accounts.id.renderButton(buttonDiv, {
        theme: 'filled_black',
        size: 'large',
        width: '100%',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'center',
      })
    }
  }, [googleLoaded, handleGoogleCallback])

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      // Clear message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000)
    }

    // Load remembered credentials
    const rememberedIdentifier = localStorage.getItem('rememberedIdentifier')
    const rememberedMethod = localStorage.getItem('rememberedMethod')
    
    if (rememberedIdentifier) {
      const method = rememberedMethod || 'email'
      setLoginMethod(method)
      setFormData(prev => ({
        ...prev,
        [method]: rememberedIdentifier,
        rememberMe: true
      }))
    }
  }, [location])

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
          newErrors.phone = 'Please enter a valid 10-digit Indian phone number'
        }
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
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
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Get the identifier based on login method
      const identifier = loginMethod === 'email' 
        ? formData.email.trim() 
        : formData.phone.replace(/[\s\-\+]/g, '').replace(/^91/, '')
      
      const user = await loginUser(identifier, formData.password)

      // Handle verification required
      if (user.requiresVerification) {
        navigate('/register', { 
          state: { 
            needsVerification: true,
            identifier: user.identifier,
            method: user.verificationMethod 
          } 
        })
        return
      }

      // Handle "Remember me" functionality
      if (formData.rememberMe) {
        localStorage.setItem('rememberedIdentifier', identifier)
        localStorage.setItem('rememberedMethod', loginMethod)
      } else {
        localStorage.removeItem('rememberedIdentifier')
        localStorage.removeItem('rememberedMethod')
      }

      // Redirect based on user type
      if (user.userType === 'advertiser') {
        navigate('/advertiser-dashboard')
      } else {
        navigate('/account')
      }
    } catch (error) {
      setErrors({ submit: error.message || 'Invalid credentials' })
    } finally {
      setIsLoading(false)
    }
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
        <title>Sign In | Trusted Escort</title>
        <meta name="title" content="Sign In | Trusted Escort" />
        <meta name="description" content="Sign in to your Trusted Escort account. Access your bookings, messages, and exclusive features." />
        <meta name="keywords" content="escort login, trusted escort sign in, account login, escort member area" />
        <link rel="canonical" href="https://www.trustedescort.in/signin" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-dark-bg pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            className="grid md:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Sign In Form Section */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <div className="bg-dark-card border border-gold/20 rounded-xl p-8 backdrop-blur-sm">
                <h1 className="text-4xl font-serif font-bold mb-2">
                  Sign <span className="text-gold">In</span>
                </h1>
                <p className="text-gray-400 mb-8">
                  Access your exclusive account
                </p>

                {/* Success Message */}
                {successMessage && (
                  <div className="mb-4 p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-400">
                    {successMessage}
                  </div>
                )}

                {/* Error Message */}
                {errors.submit && (
                  <div className="mb-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400">
                    {errors.submit}
                  </div>
                )}

                {/* Verification Message removed */}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Login Method Toggle */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Sign in with
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
                          Email
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
                          Phone Number
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
                      </div>
                    )}

                    {/* Password Field */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                          Password
                        </label>
                        <Link
                          to="/forgot-password"
                          className="text-sm text-gold hover:text-gold/80 transition"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
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

                    {/* Remember Me */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 bg-dark-bg border border-gold/30 rounded cursor-pointer accent-gold"
                      />
                      <label htmlFor="rememberMe" className="ml-3 text-sm text-gray-400 cursor-pointer">
                        Remember me
                      </label>
                    </div>

                    {/* Sign In Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-dark-bg font-bold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </form>

                {/* Google Sign-In Section */}
                <div className="mt-6">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gold/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-dark-card text-gray-400">Or continue with</span>
                    </div>
                  </div>
                  
                  {/* Custom Google Button - Always visible */}
                  {GOOGLE_CLIENT_ID && googleLoaded ? (
                    <div id="google-signin-button" className="flex justify-center"></div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (!GOOGLE_CLIENT_ID) {
                          setErrors({ submit: 'Google Sign-In is being configured. Please use email/phone login for now.' })
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
                      Continue with Google
                    </button>
                  )}
                </div>

                {/* Links */}
                <div className="mt-6 space-y-3">
                    {/* Removed resend confirmation link */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gold/20"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-dark-card text-gray-400">Or</span>
                      </div>
                    </div>
                    <p className="text-center text-gray-400">
                      Don't have an account yet?{' '}
                      <button
                        onClick={() => {
                          console.log('Register now button clicked')
                          navigate('/register')
                        }}
                        className="text-gold font-semibold hover:text-gold/80 transition"
                      >
                        Register now - it's free!
                      </button>
                    </p>
                  </div>
              </div>
            </motion.div>

            {/* Right Side Info Sections */}
            <motion.div variants={itemVariants} className="md:col-span-1 space-y-6">
              {/* User Section */}
              <div className="bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 rounded-xl p-8 backdrop-blur-sm hover:border-gold/40 transition">
                <div className="text-4xl mb-4">👤</div>
                <h3 className="text-2xl font-serif font-bold text-gold mb-3">User</h3>
                <p className="text-gray-300 leading-relaxed">
                  Keep updated on activity in your area! Access exclusive companion profiles, manage your bookings, and receive personalized recommendations based on your preferences.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <span className="text-gold mr-2">✓</span> Browse verified escorts
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold mr-2">✓</span> Secure booking system
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold mr-2">✓</span> Real-time availability
                  </li>
                </ul>
              </div>

              {/* Advertiser Section */}
              <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-8 backdrop-blur-sm hover:border-blue-500/40 transition">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-2xl font-serif font-bold text-blue-400 mb-3">Advertiser</h3>
                <p className="text-gray-300 leading-relaxed">
                  Get listed for free today! Expand your reach and connect with clients in your area. Manage your profile, pricing, and availability with our easy-to-use dashboard.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">✓</span> Free profile creation
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">✓</span> Advanced booking tools
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">✓</span> Analytics & insights
                  </li>
                </ul>
                <Link
                  to="/advertiser-signup"
                  className="inline-block mt-6 px-6 py-3 bg-blue-500 border border-blue-500 rounded-lg text-white hover:bg-blue-600 transition font-semibold text-sm"
                >
                  Get listed for free today!
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default SignIn

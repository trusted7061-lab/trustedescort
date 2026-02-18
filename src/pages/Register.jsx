import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { googleAuth } from '../services/profileService'

// Google Client ID
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    name: '',
  })
  const [loginMethod, setLoginMethod] = useState('email')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoaded, setGoogleLoaded] = useState(false)

  // Handle Google Sign-Up callback
  const handleGoogleCallback = useCallback(async (response) => {
    if (!response.credential) return
    
    setIsLoading(true)
    try {
      const user = await googleAuth(response.credential)
      navigate('/advertiser-dashboard')
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
    if (!googleLoaded || !GOOGLE_CLIENT_ID) return

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCallback,
      auto_select: false,
    })

    const buttonDiv = document.getElementById('google-signup-button')
    if (buttonDiv) {
      window.google.accounts.id.renderButton(buttonDiv, {
        theme: 'filled_black',
        size: 'large',
        width: '100%',
        text: 'signup_with',
        shape: 'rectangular',
      })
    }
  }, [googleLoaded, handleGoogleCallback])

  const validateForm = () => {
    const newErrors = {}

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
          newErrors.phone = 'Please enter a valid 10-digit phone number'
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
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      // Simple localStorage registration - no verification needed
      const users = JSON.parse(localStorage.getItem('localUsers') || '[]')
      const identifier = loginMethod === 'email' ? formData.email.trim().toLowerCase() : formData.phone.replace(/[\s\-\+]/g, '').replace(/^91/, '')
      
      // Check if user already exists
      const existingUser = users.find(u => 
        (loginMethod === 'email' && u.email?.toLowerCase() === identifier) ||
        (loginMethod === 'phone' && u.phone === identifier)
      )
      
      if (existingUser) {
        setErrors({ submit: 'An account with this ' + loginMethod + ' already exists. Please sign in.' })
        setIsLoading(false)
        return
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: loginMethod === 'email' ? identifier : '',
        phone: loginMethod === 'phone' ? identifier : '',
        password: formData.password,
        businessName: formData.name.trim() || (loginMethod === 'email' ? identifier.split('@')[0] : 'User'),
        isVerified: true,
        createdAt: new Date().toISOString()
      }

      users.push(newUser)
      localStorage.setItem('localUsers', JSON.stringify(users))

      // Auto-login
      localStorage.setItem('currentUser', JSON.stringify(newUser))
      localStorage.setItem('authToken', 'local-token-' + newUser.id)

      // Notify auth change
      window.dispatchEvent(new CustomEvent('authChanged', {
        detail: { user: newUser, isAuthenticated: true }
      }))

      // Redirect to dashboard
      navigate('/advertiser-dashboard')
    } catch (error) {
      setErrors({ submit: error.message || 'Registration failed' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Sign Up | Trusted Escort</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-dark-bg pt-32 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-4"
        >
          <div className="bg-dark-card border border-gold/20 rounded-xl p-8">
            <h1 className="text-3xl font-serif font-bold text-center mb-2">
              Create <span className="text-gold">Account</span>
            </h1>
            <p className="text-gray-400 text-center mb-8">
              Quick & easy sign up
            </p>

            {/* Google Sign Up */}
            {GOOGLE_CLIENT_ID && (
              <>
                <div id="google-signup-button" className="mb-4"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-gold/20"></div>
                  <span className="text-gray-500 text-sm">or</span>
                  <div className="flex-1 h-px bg-gold/20"></div>
                </div>
              </>
            )}

            {/* Login Method Toggle */}
            <div className="flex rounded-lg border border-gold/30 p-1 mb-6">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                  loginMethod === 'email'
                    ? 'bg-gold text-dark-bg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                📧 Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                  loginMethod === 'phone'
                    ? 'bg-gold text-dark-bg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                📱 Phone
              </button>
            </div>

            {errors.submit && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name (Optional) */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Name (Optional)</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name or business name"
                  className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition"
                />
              </div>

              {/* Email or Phone */}
              {loginMethod === 'email' ? (
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
              ) : (
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Phone Number</label>
                  <div className="flex">
                    <span className="px-4 py-3 bg-dark-hover border border-r-0 border-gold/30 rounded-l-lg text-gray-400">+91</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="flex-1 px-4 py-3 bg-dark-bg border border-gold/30 rounded-r-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition"
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 6 characters"
                    className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gold"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-gold to-gold/80 text-dark-bg rounded-lg hover:from-gold/90 hover:to-gold/70 transition font-semibold disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{' '}
              <Link to="/signin" className="text-gold hover:underline">
                Sign In
              </Link>
            </p>

            <p className="text-center text-gray-500 text-xs mt-4">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-gold hover:underline">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy-policy" className="text-gold hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Register

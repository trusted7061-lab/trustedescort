import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { getUserProfile, resendVerificationCode, isAuthenticated } from '../services/profileService'

function Account() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const [resending, setResending] = useState(false)
  const [profileImage, setProfileImage] = useState('')

  useEffect(() => {
    loadUserProfile()
  }, [navigate])

  const loadUserProfile = async () => {
    try {
      setLoading(true)
      
      if (!isAuthenticated()) {
        // Show mock data for demo
        setUser({
          email: 'demo@example.com',
          businessName: 'Demo Business',
          phone: '+1 (555) 123-4567',
          isVerified: true,
          createdAt: new Date().toISOString(),
          userType: 'advertiser'
        })
        // Set random profile image for demo
        const randomNum = Math.floor(Math.random() * 50) + 1
        setProfileImage(`/images/profiles/Delhi/profile-${randomNum}.jpg`)
        setLoading(false)
        return
      }
      
      const userData = await getUserProfile()
      setUser(userData)
      
      // Set profile image from user's photos or fallback to random
      if (userData.photos && userData.photos.length > 0) {
        setProfileImage(userData.photos[0])
      } else {
        const randomNum = Math.floor(Math.random() * 50) + 1
        setProfileImage(`/images/profiles/Delhi/profile-${randomNum}.jpg`)
      }
    } catch (error) {
      console.error('Failed to load profile:', error)
      // Fallback to mock data even if authenticated but API fails
      setUser({
        email: 'demo@example.com',
        businessName: 'Demo Business',
        phone: '+1 (555) 123-4567',
        isVerified: true,
        createdAt: new Date().toISOString(),
        userType: 'advertiser'
      })
      // Set random profile image for fallback
      const randomNum = Math.floor(Math.random() * 50) + 1
      setProfileImage(`/images/profiles/Delhi/profile-${randomNum}.jpg`)
    } finally {
      setLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (resendTimer > 0 || resending) return

    try {
      setResending(true)
      const result = await resendVerificationCode(user.email)
      if (result.message) {
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
        alert('Verification code sent!\n\n📧 Please check your inbox and spam folder.\n⏰ The confirmation link will expire in 24 hours.\n\nDemo Mode: If emails aren\'t working, check the browser console (F12) for the verification code.')
      } else {
        alert('Failed to send verification code. Please try again.')
      }
    } catch (error) {
      alert('Failed to send verification code. Please try again.')
    } finally {
      setResending(false)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg pt-32 pb-20 flex items-center justify-center">
        <div className="text-gold text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-bg pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">{error}</div>
          <button
            onClick={loadUserProfile}
            className="bg-gold text-black px-6 py-2 rounded-lg hover:bg-gold/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>My Account | Trusted Escort</title>
        <meta name="title" content="My Account | Trusted Escort" />
        <meta name="description" content="View your account details and manage your profile settings." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-dark-bg pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="bg-dark-card border border-gold/20 rounded-xl p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold/50">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/images/logo.png"
                      }}
                    />
                  </div>
                  <div>
                    <h1 className="text-4xl font-serif font-bold">
                      My <span className="text-gold">Account</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Manage your account settings</p>
                  </div>
                </div>
                <Link
                  to="/"
                  className="text-gold hover:text-gold/80 transition-colors"
                >
                  ← Back to Home
                </Link>
              </div>

              {/* Account Information */}
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gold mb-4">Account Details</h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Business Name
                    </label>
                    <div className="bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-gray-300">
                      {user.businessName}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-gray-300">
                      {user.email}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone
                    </label>
                    <div className="bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-gray-300">
                      {user.phone}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Account Created
                    </label>
                    <div className="bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-gray-300">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gold mb-4">Account Status</h2>

                  {/* Email Verification Status */}
                  <div className="bg-dark-bg border border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300">Email Verification</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.isVerified
                          ? 'bg-green-900/30 text-green-400 border border-green-500/50'
                          : 'bg-red-900/30 text-red-400 border border-red-500/50'
                      }`}>
                        {user.isVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>

                    {!user.isVerified && (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-400">
                          Your email is not verified. Please check your email for the verification code or request a new one.
                        </p>
                        <button
                          onClick={handleResendVerification}
                          disabled={resendTimer > 0 || resending}
                          className="w-full bg-gold text-black px-4 py-2 rounded-lg hover:bg-gold/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {resending ? 'Sending...' : resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Verification Code'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Account Type */}
                  <div className="bg-dark-bg border border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Account Type</span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-900/30 text-blue-400 border border-blue-500/50">
                        Advertiser
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <Link
                      to="/profile"
                      className="block w-full bg-dark-bg border border-gold/50 text-gold px-4 py-3 rounded-lg hover:bg-gold/10 transition-colors text-center"
                    >
                      Edit Profile
                    </Link>
                    <Link
                      to="/advertiser-dashboard"
                      className="block w-full bg-dark-bg border border-gold/50 text-gold px-4 py-3 rounded-lg hover:bg-gold/10 transition-colors text-center"
                    >
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem('authToken')
                        localStorage.removeItem('currentUser')
                        window.dispatchEvent(new CustomEvent('authChanged', {
                          detail: { user: null, isAuthenticated: false }
                        }))
                        navigate('/')
                      }}
                      className="w-full bg-red-900/30 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg hover:bg-red-900/50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Account
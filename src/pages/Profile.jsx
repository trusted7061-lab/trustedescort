import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { getUserProfile, updateUserProfile, isAuthenticated } from '../services/profileService'

function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [imagePreview, setImagePreview] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    location: '',
    description: '',
    services: '',
    rates: '',
    photos: []
  })

  useEffect(() => {
    loadUserProfile()
  }, [navigate])

  const loadUserProfile = async () => {
    try {
      setLoading(true)

      if (!isAuthenticated()) {
        // Show mock data for demo
        const mockData = {
          businessName: 'Demo Business',
          email: 'demo@example.com',
          phone: '+1 (555) 123-4567',
          whatsappNumber: '+1 (555) 987-6543',
          location: 'Delhi',
          description: 'Professional companion service with years of experience.',
          services: 'Dinner dates, Travel companion, Event attendance',
          rates: 'Starting from $200/hour'
        }
        setFormData(mockData)
        setUser(mockData)
        setImagePreview('')
        return
      }

      const userData = await getUserProfile()
      setUser(userData)
      setFormData({
        businessName: userData.businessName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        whatsappNumber: userData.whatsappNumber || '',
        location: userData.location || '',
        description: userData.description || '',
        services: userData.services || '',
        rates: userData.rates || '',
        photos: userData.photos || []
      })
      setImagePreview(userData.photos?.[0] || '')
    } catch (error) {
      console.error('Failed to load profile:', error)
      setError('Failed to load profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB')
      return
    }

    try {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      setImagePreview(base64)
      setFormData(prev => ({
        ...prev,
        photos: [base64]
      }))
      setError('')
    } catch (error) {
      setError('Failed to process image')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      if (!isAuthenticated()) {
        // For demo, just show success message
        setSuccess('Profile updated successfully! (Demo mode)')
        setTimeout(() => setSuccess(''), 3000)
        setSaving(false)
        return
      }

      await updateUserProfile(formData)
      setSuccess('Profile updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      console.error('Failed to update profile:', error)
      setError('Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
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

  return (
    <>
      <Helmet>
        <title>Edit Profile | Trusted Escort</title>
        <meta name="title" content="Edit Profile | Trusted Escort" />
        <meta name="description" content="Update your profile information and contact details." />
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
                <h1 className="text-4xl font-serif font-bold">
                  Edit <span className="text-gold">Profile</span>
                </h1>
                <Link
                  to="/account"
                  className="text-gold hover:text-gold/80 transition-colors"
                >
                  ← Back to Account
                </Link>
              </div>

              {error && (
                <motion.div
                  variants={itemVariants}
                  className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg"
                >
                  <p className="text-red-400">{error}</p>
                </motion.div>
              )}

              {success && (
                <motion.div
                  variants={itemVariants}
                  className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg"
                >
                  <p className="text-green-400">{success}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Profile Image */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gold">Profile Image</h2>
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/50">
                      <img
                        src={imagePreview || "/images/logo.png"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <label htmlFor="image-upload" className="cursor-pointer bg-gold text-black px-4 py-2 rounded-lg hover:bg-gold/80 transition-colors">
                        Upload Image
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <p className="text-sm text-gray-400 mt-2">Max 5MB. JPG, PNG, GIF allowed.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Basic Information */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gold mb-4">Basic Information</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="w-full bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, State/Country"
                      className="w-full bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </motion.div>

                {/* Business Details */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gold mb-4">Business Details</h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell clients about your services and experience..."
                      className="w-full bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-gold transition-colors resize-vertical"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Services Offered
                    </label>
                    <textarea
                      name="services"
                      value={formData.services}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="List the services you provide..."
                      className="w-full bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-gold transition-colors resize-vertical"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Rates & Pricing
                    </label>
                    <input
                      type="text"
                      name="rates"
                      value={formData.rates}
                      onChange={handleInputChange}
                      placeholder="e.g., Starting from $200/hour"
                      className="w-full bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants} className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
                  <Link
                    to="/account"
                    className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-gold text-black rounded-lg hover:bg-gold/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Profile
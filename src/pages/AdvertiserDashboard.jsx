import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { getCurrentUser, getCurrentUserProfile, createProfile, logoutUser, deleteUserAccount, imageToBase64 } from '../services/profileService'

function AdvertiserDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [existingProfile, setExistingProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [imagePreview, setImagePreview] = useState([null, null, null])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    description: '',
    height: '',
    ethnicity: 'Indian',
    eyes: '',
    hair: '',
    languages: [],
    services: [],
    hourlyRate: '',
    halfDayRate: '',
    fullDayRate: '',
    overnightRate: '',
    availability: 'Available',
    image: '', // Main profile image
    gallery: ['', '', ''] // Three gallery images
  })

  const locations = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Goa',
    'Chennai', 'Kolkata', 'Chandigarh', 'Jaipur', 'Indore', 'Ahmedabad',
    'Surat', 'Lucknow', 'Nagpur', 'Visakhapatnam', 'Bhopal', 'Patna',
    'Vadodara', 'Agra', 'Nashik', 'Kochi', 'Coimbatore'
  ]

  const availableServices = [
    'Dinner & Wine', 'Travel Companion', 'Events', 'Nightlife',
    'Corporate Events', 'Shopping', 'Entertainment', 'Intimate',
    'Private Dates', 'Cultural Events'
  ]

  const availableLanguages = [
    'English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Kannada',
    'Malayalam', 'Bengali', 'Gujarati', 'Punjabi'
  ]

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      navigate('/signin')
      return
    }
    
    setUser(currentUser)
    
    // Load existing profile if any
    const profile = getCurrentUserProfile()
    if (profile) {
      setExistingProfile(profile)
      setFormData({
        name: profile.name || '',
        age: profile.age || '',
        location: profile.location || '',
        description: profile.description || '',
        height: profile.height || '',
        ethnicity: profile.ethnicity || 'Indian',
        eyes: profile.eyes || '',
        hair: profile.hair || '',
        languages: profile.languages || [],
        services: profile.services || [],
        hourlyRate: profile.rates?.hourly?.replace('₹', '') || '',
        halfDayRate: profile.rates?.halfDay?.replace('₹', '') || '',
        fullDayRate: profile.rates?.fullDay?.replace('₹', '') || '',
        overnightRate: profile.rates?.overnight?.replace('₹', '') || '',
        availability: profile.availability || 'Available',
        image: profile.image || '',
        gallery: profile.gallery || ['', '', '']
      })
      
      // Set image previews
      if (profile.gallery) {
        setImagePreview(profile.gallery)
      }
    }
  }, [navigate])

  const handleLogout = () => {
    logoutUser()
    navigate('/signin')
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      alert('Please type DELETE to confirm')
      return
    }

    try {
      deleteUserAccount()
      alert('Your account has been successfully deleted')
      navigate('/')
    } catch (error) {
      alert(error.message || 'Failed to delete account')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleArrayToggle = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }))
  }

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0]
    if (!file) return
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({
        ...prev,
        [`image${index}`]: 'Please upload a valid image file'
      }))
      return
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [`image${index}`]: 'Image size should be less than 5MB'
      }))
      return
    }
    
    try {
      const base64 = await imageToBase64(file)
      
      // Update preview
      const newPreviews = [...imagePreview]
      newPreviews[index] = base64
      setImagePreview(newPreviews)
      
      // Update form data
      const newGallery = [...formData.gallery]
      newGallery[index] = base64
      setFormData(prev => ({
        ...prev,
        gallery: newGallery,
        image: index === 0 ? base64 : prev.image // First image is also the main profile image
      }))
      
      // Clear error
      setErrors(prev => ({
        ...prev,
        [`image${index}`]: ''
      }))
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        [`image${index}`]: 'Failed to process image'
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.age || formData.age < 18 || formData.age > 60) newErrors.age = 'Age must be between 18 and 60'
    if (!formData.location) newErrors.location = 'Location is required'
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.height) newErrors.height = 'Height is required'
    if (formData.languages.length === 0) newErrors.languages = 'Select at least one language'
    if (formData.services.length === 0) newErrors.services = 'Select at least one service'
    if (!formData.hourlyRate || isNaN(formData.hourlyRate)) newErrors.hourlyRate = 'Valid hourly rate is required'
    
    // Validate images
    if (!formData.gallery[0]) newErrors.image0 = 'At least one image is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    setIsLoading(true)
    setSuccessMessage('')
    
    try {
      const profileData = {
        name: formData.name,
        age: parseInt(formData.age),
        location: formData.location,
        description: formData.description,
        height: formData.height,
        ethnicity: formData.ethnicity,
        eyes: formData.eyes,
        hair: formData.hair,
        languages: formData.languages,
        services: formData.services,
        rates: {
          hourly: `₹${formData.hourlyRate}`,
          halfDay: formData.halfDayRate ? `₹${formData.halfDayRate}` : `₹${parseInt(formData.hourlyRate) * 4}`,
          fullDay: formData.fullDayRate ? `₹${formData.fullDayRate}` : `₹${parseInt(formData.hourlyRate) * 8}`,
          overnight: formData.overnightRate ? `₹${formData.overnightRate}` : `₹${parseInt(formData.hourlyRate) * 10}`
        },
        availability: formData.availability,
        image: formData.gallery[0], // First image is the main profile image
        gallery: formData.gallery.filter(img => img) // Remove empty gallery slots
      }
      
      await createProfile(profileData)
      
      setSuccessMessage(existingProfile ? 'Profile updated successfully!' : 'Profile created successfully!')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
      // Refresh profile data
      const updatedProfile = getCurrentUserProfile()
      setExistingProfile(updatedProfile)
      
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <>
      <Helmet>
        <title>Advertiser Dashboard | Trusted Escort</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-dark-bg pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-serif font-bold mb-2">
                  Welcome, <span className="text-gold">{user.businessName}</span>
                </h1>
                <p className="text-gray-400">
                  {existingProfile ? 'Manage your escort profile' : 'Create your escort profile'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 border border-gold/30 text-gold rounded-lg hover:bg-gold/10 transition"
              >
                Logout
              </button>
            </div>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-400"
              >
                {successMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-dark-card border border-gold/20 rounded-xl p-8 md:p-12 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-serif font-bold mb-8">
              {existingProfile ? 'Edit Profile' : 'Create Profile'}
            </h2>

            {/* Error Message */}
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400">
                {errors.submit}
              </div>
            )}

            {/* Image Upload Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gold">Profile Images</h3>
              <p className="text-gray-400 text-sm mb-4">Upload up to 3 images (first image will be your main profile picture)</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 2].map(index => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Image {index + 1} {index === 0 && <span className="text-red-400">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, index)}
                        className="hidden"
                        id={`image-upload-${index}`}
                      />
                      <label
                        htmlFor={`image-upload-${index}`}
                        className={`block w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition ${
                          errors[`image${index}`] ? 'border-red-500' : 'border-gold/30 hover:border-gold'
                        } ${imagePreview[index] ? '' : 'flex items-center justify-center'}`}
                      >
                        {imagePreview[index] ? (
                          <img
                            src={imagePreview[index]}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-400">Click to upload</p>
                          </div>
                        )}
                      </label>
                    </div>
                    {errors[`image${index}`] && (
                      <p className="text-red-400 text-sm mt-2">{errors[`image${index}`]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gold">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition ${
                      errors.name ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Age <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter age"
                    min="18"
                    max="60"
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition ${
                      errors.age ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                    }`}
                  />
                  {errors.age && <p className="text-red-400 text-sm mt-2">{errors.age}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white focus:outline-none focus:border-gold transition ${
                      errors.location ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                    }`}
                  >
                    <option value="">Select location</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  {errors.location && <p className="text-red-400 text-sm mt-2">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Height <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="e.g., 5'6&quot;"
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition ${
                      errors.height ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                    }`}
                  />
                  {errors.height && <p className="text-red-400 text-sm mt-2">{errors.height}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ethnicity</label>
                  <input
                    type="text"
                    name="ethnicity"
                    value={formData.ethnicity}
                    onChange={handleChange}
                    placeholder="e.g., Indian"
                    className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition hover:border-gold/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Eye Color</label>
                  <input
                    type="text"
                    name="eyes"
                    value={formData.eyes}
                    onChange={handleChange}
                    placeholder="e.g., Brown"
                    className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition hover:border-gold/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Hair Color</label>
                  <input
                    type="text"
                    name="hair"
                    value={formData.hair}
                    onChange={handleChange}
                    placeholder="e.g., Black"
                    className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition hover:border-gold/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Availability <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition hover:border-gold/50"
                  >
                    <option value="Available">Available</option>
                    <option value="Available Today">Available Today</option>
                    <option value="By Appointment">By Appointment</option>
                    <option value="Limited">Limited Availability</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Profile Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe yourself and your services (minimum 50 characters)"
                rows="5"
                className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition resize-none ${
                  errors.description ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                }`}
              />
              <div className="flex justify-between mt-2">
                <p className="text-gray-500 text-xs">{formData.description.length}/500 characters</p>
                {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}
              </div>
            </div>

            {/* Languages */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Languages <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableLanguages.map(lang => (
                  <motion.button
                    key={lang}
                    type="button"
                    onClick={() => handleArrayToggle('languages', lang)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      formData.languages.includes(lang)
                        ? 'bg-gold text-dark-bg'
                        : 'bg-dark-bg border border-gold/30 text-gold hover:border-gold'
                    }`}
                  >
                    {formData.languages.includes(lang) && '✓ '}
                    {lang}
                  </motion.button>
                ))}
              </div>
              {errors.languages && <p className="text-red-400 text-sm mt-2">{errors.languages}</p>}
            </div>

            {/* Services */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Services Offered <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableServices.map(service => (
                  <motion.button
                    key={service}
                    type="button"
                    onClick={() => handleArrayToggle('services', service)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      formData.services.includes(service)
                        ? 'bg-gold text-dark-bg'
                        : 'bg-dark-bg border border-gold/30 text-gold hover:border-gold'
                    }`}
                  >
                    {formData.services.includes(service) && '✓ '}
                    {service}
                  </motion.button>
                ))}
              </div>
              {errors.services && <p className="text-red-400 text-sm mt-2">{errors.services}</p>}
            </div>

            {/* Rates */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gold">Rates (in ₹)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Hourly Rate <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    placeholder="e.g., 5000"
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition ${
                      errors.hourlyRate ? 'border-red-500' : 'border-gold/30 hover:border-gold/50'
                    }`}
                  />
                  {errors.hourlyRate && <p className="text-red-400 text-sm mt-2">{errors.hourlyRate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Half Day Rate</label>
                  <input
                    type="number"
                    name="halfDayRate"
                    value={formData.halfDayRate}
                    onChange={handleChange}
                    placeholder="Leave empty for auto-calculation"
                    className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition hover:border-gold/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Day Rate</label>
                  <input
                    type="number"
                    name="fullDayRate"
                    value={formData.fullDayRate}
                    onChange={handleChange}
                    placeholder="Leave empty for auto-calculation"
                    className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition hover:border-gold/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Overnight Rate</label>
                  <input
                    type="number"
                    name="overnightRate"
                    value={formData.overnightRate}
                    onChange={handleChange}
                    placeholder="Leave empty for auto-calculation"
                    className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition hover:border-gold/50"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-gold to-gold/80 text-dark-bg rounded-lg hover:from-gold/90 hover:to-gold/70 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : existingProfile ? 'Update Profile' : 'Create Profile'}
              </button>
            </div>
          </motion.form>

          {/* Danger Zone - Delete Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 border border-red-500/30 rounded-xl p-6 bg-red-900/10"
          >
            <h3 className="text-xl font-semibold text-red-400 mb-2 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Danger Zone
            </h3>
            <p className="text-gray-400 mb-4">
              Once you delete your account, there is no going back. This will permanently delete your profile and all associated data.
            </p>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-3 bg-red-500/20 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/30 transition font-semibold"
            >
              Delete Account
            </button>
          </motion.div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-card border border-red-500/30 rounded-xl p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-3xl font-serif font-bold text-red-400 mb-2">
                  Delete Account?
                </h2>
                <p className="text-gray-400">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type <span className="text-red-400 font-bold">DELETE</span> to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="Type DELETE"
                  className="w-full px-4 py-3 bg-dark-bg border border-red-500/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false)
                    setDeleteConfirmText('')
                  }}
                  className="flex-1 px-6 py-3 border border-gold/30 text-gold rounded-lg hover:bg-gold/10 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmText !== 'DELETE'}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Delete Forever
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AdvertiserDashboard

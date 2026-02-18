import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { getCurrentUser, createRequirement, getUserRequirements, updateRequirementStatus, deleteRequirement } from '../services/profileService'
import { getAllCities } from '../services/locationsData'

function PostRequirement() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [myRequirements, setMyRequirements] = useState([])
  const [showForm, setShowForm] = useState(true)
  const [deleteModal, setDeleteModal] = useState(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    preferredAge: '',
    preferredTime: '',
    budget: '',
    duration: '1-2 hours',
    services: [],
    showContact: true
  })

  const locations = useMemo(() => getAllCities(), [])
  
  const availableServices = [
    'Dinner Companion', 'Travel Partner', 'Event Escort', 'Nightlife',
    'Corporate Event', 'Private Meeting', 'Weekend Getaway', 'Cultural Events'
  ]

  const timeSlots = [
    'Morning (6AM - 12PM)',
    'Afternoon (12PM - 6PM)',
    'Evening (6PM - 12AM)',
    'Night (12AM - 6AM)',
    'Flexible'
  ]

  const durations = [
    '1-2 hours',
    '2-4 hours',
    'Half day',
    'Full day',
    'Overnight',
    'Weekend'
  ]

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      navigate('/signin', { state: { from: '/post-requirement' } })
      return
    }
    
    setUser(currentUser)
    
    // Load user's requirements
    const reqs = getUserRequirements()
    setMyRequirements(reqs)
    
    if (reqs.length > 0) {
      setShowForm(false)
    }
    
    // Listen for updates
    const handleUpdate = () => {
      setMyRequirements(getUserRequirements())
    }
    
    window.addEventListener('requirementsUpdated', handleUpdate)
    return () => window.removeEventListener('requirementsUpdated', handleUpdate)
  }, [navigate])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
    setErrors(prev => ({ ...prev, services: '' }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.location) newErrors.location = 'Location is required'
    if (formData.services.length === 0) newErrors.services = 'Select at least one service type'
    
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
      await createRequirement(formData)
      setSuccessMessage('Your requirement has been posted successfully!')
      setShowForm(false)
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        preferredAge: '',
        preferredTime: '',
        budget: '',
        duration: '1-2 hours',
        services: [],
        showContact: true
      })
      
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = (reqId) => {
    deleteRequirement(reqId)
    setDeleteModal(null)
    setSuccessMessage('Requirement deleted successfully!')
  }

  const handleStatusChange = (reqId, status) => {
    updateRequirementStatus(reqId, status)
    setSuccessMessage(`Requirement marked as ${status}!`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  if (!user) return null

  return (
    <>
      <Helmet>
        <title>Post Your Requirement | Trusted Escort</title>
        <meta name="description" content="Post your escort requirement and let verified companions reach out to you." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-dark-bg pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-serif font-bold mb-2">
                  Post Your <span className="text-gold">Requirement</span>
                </h1>
                <p className="text-gray-400">
                  Tell us what you're looking for and let escorts reach out to you
                </p>
              </div>
              {myRequirements.length > 0 && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-2 bg-gold text-dark-bg rounded-lg hover:bg-gold-light transition font-semibold"
                >
                  + New Requirement
                </button>
              )}
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

          {/* My Requirements List */}
          {myRequirements.length > 0 && !showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-card border border-gold/20 rounded-xl p-6 mb-8"
            >
              <h2 className="text-2xl font-serif font-bold mb-6">
                My Requirements <span className="text-gold">({myRequirements.length})</span>
              </h2>
              
              <div className="space-y-4">
                {myRequirements.map((req) => (
                  <div
                    key={req.id}
                    className="bg-dark-bg border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{req.title}</h3>
                        <p className="text-sm text-gray-400">
                          📍 {req.location} • Posted {formatDate(req.createdAt)}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        req.status === 'active' ? 'bg-green-900/50 text-green-400 border border-green-500/30' :
                        req.status === 'fulfilled' ? 'bg-blue-900/50 text-blue-400 border border-blue-500/30' :
                        'bg-gray-900/50 text-gray-400 border border-gray-500/30'
                      }`}>
                        {req.status.toUpperCase()}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{req.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {req.services.slice(0, 3).map(service => (
                        <span key={service} className="px-2 py-1 bg-gold/10 text-gold text-xs rounded-full">
                          {service}
                        </span>
                      ))}
                      {req.services.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full">
                          +{req.services.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex gap-4 text-gray-500">
                        <span>👁 {req.views} views</span>
                        <span>💬 {req.responses} responses</span>
                        <span>⏳ Expires {formatDate(req.expiresAt)}</span>
                      </div>
                      <div className="flex gap-2">
                        {req.status === 'active' && (
                          <button
                            onClick={() => handleStatusChange(req.id, 'fulfilled')}
                            className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs rounded hover:bg-blue-600/30 transition"
                          >
                            Mark Fulfilled
                          </button>
                        )}
                        <button
                          onClick={() => setDeleteModal(req.id)}
                          className="px-3 py-1 bg-red-600/20 text-red-400 text-xs rounded hover:bg-red-600/30 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {deleteModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                onClick={() => setDeleteModal(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-dark-card border border-gold/20 rounded-xl p-6 max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-xl font-bold text-white mb-4">Delete Requirement?</h3>
                  <p className="text-gray-400 mb-6">
                    Are you sure you want to delete this requirement? This action cannot be undone.
                  </p>
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setDeleteModal(null)}
                      className="px-4 py-2 border border-gold/30 text-gold rounded-lg hover:bg-gold/10 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(deleteModal)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Requirement Form */}
          <AnimatePresence>
            {showForm && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="bg-dark-card border border-gold/20 rounded-xl p-8 backdrop-blur-sm"
              >
                {myRequirements.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
                  >
                    ← Back to My Requirements
                  </button>
                )}

                <h2 className="text-2xl font-serif font-bold mb-6">
                  What are you <span className="text-gold">looking for?</span>
                </h2>

                {errors.submit && (
                  <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400">
                    {errors.submit}
                  </div>
                )}

                {/* Title */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Looking for dinner companion in Mumbai"
                    className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition"
                  />
                  {errors.title && <p className="text-red-400 text-sm mt-2">{errors.title}</p>}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe what you're looking for in detail..."
                    className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition resize-none"
                  />
                  {errors.description && <p className="text-red-400 text-sm mt-2">{errors.description}</p>}
                </div>

                {/* Location */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition"
                  >
                    <option value="">Select city...</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  {errors.location && <p className="text-red-400 text-sm mt-2">{errors.location}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Preferred Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Time
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition"
                    >
                      <option value="">Any time</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Duration
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition"
                    >
                      {durations.map(dur => (
                        <option key={dur} value={dur}>{dur}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Preferred Age */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Age Range
                    </label>
                    <input
                      type="text"
                      name="preferredAge"
                      value={formData.preferredAge}
                      onChange={handleChange}
                      placeholder="e.g., 21-28"
                      className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition"
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Budget (₹)
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g., 5000-10000"
                      className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold transition"
                    />
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Service Type <span className="text-red-400">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableServices.map(service => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`px-4 py-2 rounded-full text-sm transition ${
                          formData.services.includes(service)
                            ? 'bg-gold text-dark-bg font-semibold'
                            : 'bg-dark-bg border border-gold/30 text-gray-300 hover:border-gold'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                  {errors.services && <p className="text-red-400 text-sm mt-2">{errors.services}</p>}
                </div>

                {/* Show Contact */}
                <div className="mb-8">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="showContact"
                      checked={formData.showContact}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-gold/30 bg-dark-bg text-gold focus:ring-gold"
                    />
                    <span className="text-gray-300">
                      Show my contact number to escorts who view this requirement
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-gold to-gold/80 text-dark-bg rounded-lg hover:from-gold/90 hover:to-gold/70 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Posting...' : 'Post Requirement'}
                </button>

                <p className="text-center text-gray-500 text-sm mt-4">
                  Your requirement will be visible for 7 days
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default PostRequirement

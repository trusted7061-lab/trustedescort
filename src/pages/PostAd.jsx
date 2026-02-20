import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function PostAd() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'escort-service',
    timeSlot: 'morning',
    location: '',
    city: '',
    state: '',
    contact: { phone: '', email: '', whatsapp: '' },
    pricing: { hourly: 0, halfDay: 0, fullDay: 0 },
    images: []
  })

  const [coinRequirement, setCoinRequirement] = useState(5)
  const [userCoins, setUserCoins] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // Fetch user's coin balance
    fetchUserCoins()

    // Update coin requirement when time slot changes
    const costs = { 'morning': 5, 'afternoon': 8, 'night': 10 }
    setCoinRequirement(costs[formData.timeSlot])
  }, [formData.timeSlot])

  const fetchUserCoins = async () => {
    try {
      const response = await fetch('/api/ads/wallet/balance')
      const data = await response.json()
      setUserCoins(data.coins)
    } catch (error) {
      console.error('Failed to fetch coins:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }))
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    // Validation
    if (!formData.title || !formData.description || !formData.location) {
      setMessage('Please fill in all required fields')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/ads/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        setMessage(data.message)
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: 'escort-service',
          timeSlot: 'morning',
          location: '',
          city: '',
          state: '',
          contact: { phone: '', email: '', whatsapp: '' },
          pricing: { hourly: 0, halfDay: 0, fullDay: 0 },
          images: []
        })
        // Refresh coin balance
        fetchUserCoins()
      } else {
        setIsSuccess(false)
        setMessage(data.message || 'Failed to post ad')
      }
    } catch (error) {
      setIsSuccess(false)
      setMessage(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Post Your Ad | Trusted Escort</title>
        <meta name="description" content="Post your escort ad on Trusted Escort" />
      </Helmet>

      <div className="min-h-screen bg-dark-bg pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-serif font-bold text-gold mb-4">Post Your Ad</h1>
            <p className="text-xl text-gray-300">
              Share your services with thousands of customers
            </p>
          </motion.div>

          {/* Coin Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-gold/10 to-purple-900/10 border border-gold/30 rounded-lg p-6 mb-8"
          >
            <div className="flex justify-between items-center md:flex-row flex-col gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Your Coin Balance</p>
                <p className="text-4xl font-bold text-gold">{userCoins} Coins</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm mb-2">Cost for {formData.timeSlot}:</p>
                <p className="text-3xl font-bold">
                  {coinRequirement} <span className="text-lg">coins</span>
                </p>
                {userCoins < coinRequirement && (
                  <p className="text-orange-400 text-sm mt-2">
                    ⚠ Not enough coins (need {coinRequirement - userCoins} more)
                  </p>
                )}
              </div>
              <Link to="/buy-coins">
                <button className="px-6 py-3 bg-gold text-dark-bg font-bold rounded-lg hover:bg-gold/90 transition-all">
                  Buy Coins
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`max-w-4xl mx-auto mb-8 p-4 rounded-lg ${
                isSuccess
                  ? 'bg-green-900/30 text-green-300 border border-green-500/50'
                  : 'bg-red-900/30 text-red-300 border border-red-500/50'
              }`}
            >
              {message}
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-dark-card border border-gold/20 rounded-lg p-8 space-y-6"
          >
            {/* Title */}
            <div>
              <label className="block text-white font-semibold mb-2">Ad Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                maxLength="100"
                placeholder="e.g., Premium Escort Services in Mumbai"
                className="w-full bg-dark-bg border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                required
              />
              <p className="text-xs text-gray-400 mt-1">{formData.title.length}/100</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-white font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                maxLength="2000"
                placeholder="Describe your services in detail..."
                rows="6"
                className="w-full bg-dark-bg border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors resize-none"
                required
              />
              <p className="text-xs text-gray-400 mt-1">{formData.description.length}/2000</p>
            </div>

            {/* Category & Time Slot */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-dark-bg border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  required
                >
                  <option value="escort-service">Escort Service</option>
                  <option value="companion">Companion</option>
                  <option value="events">Events</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Time Slot *</label>
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleInputChange}
                  className="w-full bg-dark-bg border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  required
                >
                  <option value="morning">Morning (6 AM - 12 PM) - 5 coins</option>
                  <option value="afternoon">Afternoon (12 PM - 6 PM) - 8 coins</option>
                  <option value="night">Night (6 PM - 6 AM) - 10 coins</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Bandra, Mumbai"
                  className="w-full bg-dark-bg border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g., Mumbai"
                  className="w-full bg-dark-bg border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="e.g., Maharashtra"
                  className="w-full bg-dark-bg border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Information</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit phone number"
                    className="w-full bg-dark-bg border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="contact.email"
                    value={formData.contact.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full bg-dark-bg border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">WhatsApp</label>
                  <input
                    type="tel"
                    name="contact.whatsapp"
                    value={formData.contact.whatsapp}
                    onChange={handleInputChange}
                    placeholder="WhatsApp number (optional)"
                    className="w-full bg-dark-bg border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h3 className="text-white font-semibold mb-4">Pricing</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Hourly Rate (₹)</label>
                  <input
                    type="number"
                    name="pricing.hourly"
                    value={formData.pricing.hourly}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full bg-dark-bg border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Half Day (₹)</label>
                  <input
                    type="number"
                    name="pricing.halfDay"
                    value={formData.pricing.halfDay}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full bg-dark-bg border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Full Day (₹)</label>
                  <input
                    type="number"
                    name="pricing.fullDay"
                    value={formData.pricing.fullDay}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full bg-dark-bg border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-white font-semibold mb-2">Upload Photos</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full bg-dark-bg border border-dashed border-gold/20 rounded-lg px-4 py-4 text-gray-400 cursor-pointer hover:border-gold transition-colors"
              />
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                userCoins >= coinRequirement
                  ? 'bg-gold text-dark-bg hover:bg-gold/90'
                  : 'bg-gray-600 text-gray-300 cursor-not-allowed'
              } ${isLoading ? 'opacity-50' : ''}`}
            >
              {isLoading ? 'Posting...' : `Post Ad${userCoins >= coinRequirement ? '' : ' (Insufficient Coins)'}`}
            </motion.button>
          </motion.form>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-dark-card border border-gold/20 rounded-lg p-6"
          >
            <h3 className="text-white font-semibold mb-4">📌 Important Information</h3>
            <ul className="space-y-2 text-gray-300">
              <li>✓ Your ad will be pending admin approval after posting</li>
              <li>✓ Approved ads appear at the top if you used coins (premium placement)</li>
              <li>✓ Ads without coins appear below premium ads but are still visible</li>
              <li>✓ If rejected, coins will be refunded automatically</li>
              <li>✓ All information you provide must be accurate and verified</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default PostAd

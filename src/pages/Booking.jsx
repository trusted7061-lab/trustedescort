import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    companion: '',
    serviceType: '',
    duration: '',
    location: '',
    meetingPlace: '',
    paymentMethod: '',
    specialRequests: '',
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [estimatedPrice, setEstimatedPrice] = useState(null)

  const escorts = [
    { id: 1, name: 'Sakshi', age: 24, location: 'Mumbai', rating: 4.9, reviews: 127, verified: true },
    { id: 2, name: 'Ishita', age: 26, location: 'Delhi', rating: 5.0, reviews: 142, verified: true },
    { id: 3, name: 'Veda', age: 25, location: 'Bangalore', rating: 4.8, reviews: 98, verified: true },
    { id: 4, name: 'Ananya', age: 23, location: 'Hyderabad', rating: 4.7, reviews: 76, verified: true },
    { id: 5, name: 'Nikita', age: 28, location: 'Pune', rating: 4.95, reviews: 156, verified: true },
    { id: 6, name: 'Omisha', age: 22, location: 'Goa', rating: 4.6, reviews: 89, verified: true },
    { id: 7, name: 'Priya', age: 24, location: 'Mumbai', rating: 4.85, reviews: 134, verified: true },
    { id: 8, name: 'Anjali', age: 26, location: 'Delhi', rating: 4.92, reviews: 145, verified: true },
    { id: 9, name: 'Neha', age: 23, location: 'Bangalore', rating: 4.78, reviews: 109, verified: true },
    { id: 10, name: 'Divya', age: 25, location: 'Hyderabad', rating: 4.88, reviews: 128, verified: true },
    { id: 11, name: 'Isha', age: 27, location: 'Pune', rating: 4.93, reviews: 167, verified: true },
    { id: 12, name: 'Kavya', age: 24, location: 'Goa', rating: 4.71, reviews: 92, verified: true },
    { id: 13, name: 'Meera', age: 25, location: 'Chennai', rating: 4.84, reviews: 118, verified: true },
    { id: 14, name: 'Tanya', age: 26, location: 'Kolkata', rating: 4.89, reviews: 135, verified: true },
    { id: 15, name: 'Simran', age: 23, location: 'Chandigarh', rating: 4.75, reviews: 103, verified: true },
    { id: 16, name: 'Riya', age: 24, location: 'Jaipur', rating: 4.87, reviews: 141, verified: true },
    { id: 17, name: 'Aisha', age: 27, location: 'Indore', rating: 4.81, reviews: 124, verified: true },
    { id: 18, name: 'Pooja', age: 25, location: 'Ahmedabad', rating: 4.79, reviews: 116, verified: true },
    { id: 19, name: 'Shreya', age: 22, location: 'Mumbai', rating: 4.73, reviews: 89, verified: true },
    { id: 20, name: 'Nisha', age: 28, location: 'Delhi', rating: 4.96, reviews: 178, verified: true },
    { id: 21, name: 'Disha', age: 23, location: 'Bangalore', rating: 4.86, reviews: 144, verified: true },
    { id: 22, name: 'Seema', age: 26, location: 'Hyderabad', rating: 4.91, reviews: 152, verified: true },
  ]

  const serviceTypes = [
    { value: 'hourly', label: 'Hourly Service', baseRate: 5000 },
    { value: 'halfDay', label: 'Half Day (4 hours)', baseRate: 18000 },
    { value: 'fullDay', label: 'Full Day (8 hours)', baseRate: 35000 },
    { value: 'overnight', label: 'Overnight (12 hours)', baseRate: 50000 },
  ]

  const durations = {
    hourly: ['1 hour', '2 hours', '3 hours'],
    halfDay: ['4 hours'],
    fullDay: ['8 hours'],
    overnight: ['12 hours'],
  }

  const locations = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Goa',
    'Chennai', 'Kolkata', 'Chandigarh', 'Jaipur', 'Indore', 'Ahmedabad',
    'Surat', 'Lucknow', 'Nagpur', 'Visakhapatnam', 'Bhopal', 'Patna',
    'Vadodara', 'Agra', 'Nashik', 'Kochi', 'Coimbatore'
  ]

  const paymentMethods = [
    { value: 'Cash', label: 'Cash Payment', qrCode: null },
    { value: 'Bank Transfer', label: 'Bank Transfer', qrCode: null },
    { value: 'UPI', label: 'UPI Payment', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=7980393546@ybl&pn=TrustedEscort&cu=INR' },
    { value: 'Paytm', label: 'Paytm', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=7980393546@ybl&pn=TrustedEscort&cu=INR' },
    { value: 'Google Pay', label: 'Google Pay', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=7980393546@ybl&pn=TrustedEscort&cu=INR' },
    { value: 'PhonePe', label: 'PhonePe', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=7980393546@ybl&pn=TrustedEscort&cu=INR' },
  ]

  const calculateEstimatedPrice = (serviceType, duration) => {
    const service = serviceTypes.find(s => s.value === serviceType)
    if (!service) return null

    if (serviceType === 'hourly') {
      const hours = parseInt(duration)
      return service.baseRate * hours
    }
    return service.baseRate
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Valid email is required'
    }
    if (!formData.phone.match(/^[0-9]{10}$/)) {
      newErrors.phone = 'Valid 10-digit phone number is required'
    }
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.time) newErrors.time = 'Time is required'
    if (!formData.companion) newErrors.companion = 'Please select an escort'
    if (!formData.serviceType) newErrors.serviceType = 'Please select service type'
    if (!formData.duration) newErrors.duration = 'Please select duration'
    if (!formData.location) newErrors.location = 'Please select location'
    if (!formData.meetingPlace.trim()) newErrors.meetingPlace = 'Meeting place is required'
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select payment method'
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms & conditions'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: newValue,
      }
      
      // Calculate price when service type or duration changes
      if (name === 'serviceType' || name === 'duration') {
        const price = calculateEstimatedPrice(
          name === 'serviceType' ? newValue : updated.serviceType,
          name === 'duration' ? newValue : updated.duration
        )
        setEstimatedPrice(price)
        
        // Reset duration if service type changes
        if (name === 'serviceType') {
          updated.duration = ''
        }
      }
      
      return updated
    })
    
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      
      // Simulate form submission delay
      setTimeout(() => {
        console.log('Form submitted:', formData)
        setShowSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          companion: '',
          serviceType: '',
          duration: '',
          location: '',
          meetingPlace: '',
          paymentMethod: '',
          specialRequests: '',
          agreeToTerms: false,
        })
        setEstimatedPrice(null)
        setIsLoading(false)

        // Auto-hide success message after 8 seconds
        setTimeout(() => setShowSuccess(false), 8000)
      }, 1500)
    } else {
      // Scroll to first error
      window.scrollTo({ top: 300, behavior: 'smooth' })
    }
  }

  const getTodayDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
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
        {/* Primary Meta Tags */}
        <title>Book an Escort | Trusted Escort</title>
        <meta name="title" content="Book an Escort | Trusted Escort" />
        <meta name="description" content="Book your exclusive escort experience today. Easy online booking for premium escort services. Available 24/7 across major Indian cities." />
        <meta name="keywords" content="book escort, escort booking, schedule escort, hire escort, premium escort booking India" />
        <link rel="canonical" href="https://www.trustedescort.com/booking" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.trustedescort.com/booking" />
        <meta property="og:title" content="Book an Escort | Trusted Escort" />
        <meta property="og:description" content="Book your exclusive escort experience today. Easy online booking for premium escort services." />
        <meta property="og:image" content="https://www.trustedescort.com/og-image.jpg" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Trusted Escort" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.trustedescort.in/booking" />
        <meta property="twitter:title" content="Book an Escort | Trusted Escort" />
        <meta property="twitter:description" content="Book your exclusive escort experience today." />
        <meta property="twitter:image" content="https://www.trustedescort.in/og-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="Trusted Escort" />
      </Helmet>

      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-dark-card to-dark-bg border-b border-gold/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Book Your <span className="text-gold">Experience</span>
            </h1>
            <p className="text-xl text-gray-400">
              Select your escort and schedule your exclusive appointment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-dark-bg">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8 p-6 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300"
              >
                <h3 className="font-semibold mb-2 text-xl">✓ Booking Request Submitted!</h3>
                <p className="text-sm">
                  Thank you for your booking request. Our team will contact you within 30 minutes to confirm your appointment via email and WhatsApp.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="card-glass p-8 md:p-12"
          >
            {/* Personal Information Section */}
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-gold mb-6 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-red-500/50 focus:border-red-500/80'
                        : 'border-gold/20 focus:border-gold/50'
                    }`}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-xs mt-2"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500/50 focus:border-red-500/80'
                        : 'border-gold/20 focus:border-gold/50'
                    }`}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-xs mt-2"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Phone Number (WhatsApp preferred) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.phone
                        ? 'border-red-500/50 focus:border-red-500/80'
                        : 'border-gold/20 focus:border-gold/50'
                    }`}
                  />
                  <AnimatePresence>
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-xs mt-2"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Booking Details Section */}
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-gold mb-6 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Booking Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Escort */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Select Escort <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="companion"
                    value={formData.companion}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.companion
                        ? 'border-red-500/50 focus:border-red-500/80'
                        : 'border-gold/20 focus:border-gold/50'
                    }`}
                  >
                    <option value="">-- Select an Escort --</option>
                    {escorts.map((comp) => (
                      <option key={comp.id} value={`${comp.name} - ${comp.age}, ${comp.location}`}>
                        {comp.verified && '✓ '}{comp.name} - {comp.age}, {comp.location} - ★{comp.rating} ({comp.reviews} reviews)
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.companion && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-xs mt-2"
                      >
                        {errors.companion}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Service Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.serviceType
                        ? 'border-red-500/50 focus:border-red-500/80'
                        : 'border-gold/20 focus:border-gold/50'
                    }`}
                  >
                    <option value="">-- Select Service Type --</option>
                    {serviceTypes.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label} - Starting from ₹{service.baseRate.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.serviceType && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-xs mt-2"
                      >
                        {errors.serviceType}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Duration <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    disabled={!formData.serviceType}
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.duration
                        ? 'border-red-500/50 focus:border-red-500/80'
                        : 'border-gold/20 focus:border-gold/50'
                    }`}
                  >
                    <option value="">-- Select Duration --</option>
                    {formData.serviceType && durations[formData.serviceType]?.map((dur) => (
                      <option key={dur} value={dur}>
                        {dur}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.duration && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-xs mt-2"
                      >
                        {errors.duration}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Preferred Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={getTodayDate()}
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.date
                        ? 'border-red-500/50 focus:border-red-500/80'
                        : 'border-gold/20 focus:border-gold/50'
                    }`}
                  />
                  <AnimatePresence>
                    {errors.date && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-xs mt-2"
                      >
                        {errors.date}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Preferred Time <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.time
                        ? 'border-red-500/50 focus:border-red-500/80'
                        : 'border-gold/20 focus:border-gold/50'
                    }`}
                  />
                  <AnimatePresence>
                    {errors.time && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-xs mt-2"
                      >
                        {errors.time}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Location & Payment Section */}
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-gold mb-6 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Location & Payment
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Location/City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    City <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.location
                        ? 'border-red-500/50 focus:border-red-500/80'
                        : 'border-gold/20 focus:border-gold/50'
                    }`}
                  >
                    <option value="">-- Select City --</option>
                    {locations.sort().map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.location && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-xs mt-2"
                      >
                        {errors.location}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Preferred Payment Method <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.paymentMethod
                        ? 'border-red-500/50 focus:border-red-500/80'
                        : 'border-gold/20 focus:border-gold/50'
                    }`}
                  >
                    <option value="">-- Select Payment Method --</option>
                    {paymentMethods.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.paymentMethod && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-xs mt-2"
                      >
                        {errors.paymentMethod}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* QR Code Display - Only show if digital payment method is selected */}
                {formData.paymentMethod && (() => {
                  const selectedMethod = paymentMethods.find(m => m.value === formData.paymentMethod)
                  return selectedMethod?.qrCode ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="md:col-span-2"
                    >
                      <div className="bg-dark-bg border border-gold/30 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gold mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                          </svg>
                          {selectedMethod.label} QR Code
                        </h3>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                          <div className="bg-white p-4 rounded-lg">
                            <img
                              src={selectedMethod.qrCode}
                              alt={`${selectedMethod.label} QR Code`}
                              className="w-48 h-48"
                            />
                          </div>
                          <div className="flex-1 text-center md:text-left">
                            <p className="text-gray-300 mb-3">
                              Scan this QR code to make payment via {selectedMethod.label}
                            </p>
                            <div className="space-y-2 text-sm text-gray-400">
                              <p>• Open your {selectedMethod.label} app</p>
                              <p>• Scan the QR code</p>
                              <p>• Enter the amount and complete payment</p>
                              <p>• Keep the payment confirmation for reference</p>
                            </div>
                            <div className="mt-4 p-3 bg-gold/10 border border-gold/30 rounded-lg">
                              <p className="text-xs text-gold">
                                ⚠️ Note: Payment details will be confirmed after booking approval
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null
                })()}

                {/* Meeting Place */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Meeting Place / Hotel Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="meetingPlace"
                    value={formData.meetingPlace}
                    onChange={handleChange}
                    placeholder="e.g., Taj Hotel, Bandra West or Your Address"
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.meetingPlace
                        ? 'border-red-500/50 focus:border-red-500/80'
                        : 'border-gold/20 focus:border-gold/50'
                    }`}
                  />
                  <AnimatePresence>
                    {errors.meetingPlace && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-xs mt-2"
                      >
                        {errors.meetingPlace}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Estimated Price Display */}
            {estimatedPrice && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 p-6 bg-gold/10 border border-gold/30 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Estimated Total</p>
                    <p className="text-3xl font-bold text-gold">₹{estimatedPrice.toLocaleString()}</p>
                  </div>
                  <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * Final price may vary based on specific requirements and additional services
                </p>
              </motion.div>
            )}

            {/* Special Requests */}
            <motion.div variants={itemVariants} className="mb-8">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Special Requests or Preferences
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Any specific requirements, preferences, or special requests..."
                rows="4"
                className="w-full px-4 py-3 bg-dark-bg border border-gold/20 rounded-lg text-white focus:border-gold/50 focus:outline-none transition-colors resize-none"
              />
            </motion.div>

            {/* Terms & Conditions */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-start gap-3 p-4 bg-dark-bg rounded-lg border border-gold/20">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-5 h-5 mt-0.5 bg-dark-bg border border-gold/30 rounded cursor-pointer accent-gold"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-400 cursor-pointer flex-1">
                  I agree to the{' '}
                  <Link to="/terms" className="text-gold hover:text-gold/80 transition">
                    Terms and Conditions
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy-policy" className="text-gold hover:text-gold/80 transition">
                    Privacy Policy
                  </Link>
                  . I understand that this is a booking request and final confirmation will be provided by the team.
                </label>
              </div>
              <AnimatePresence>
                {errors.agreeToTerms && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-xs mt-2"
                  >
                    {errors.agreeToTerms}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit Buttons */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full btn-gold py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Submit Booking Request
                  </>
                )}
              </motion.button>

              <motion.a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.947 1.347l-.355.199-3.682.993 1.012-3.678-.235-.374A9.86 9.86 0 015.031 3.284c5.432 0 9.873 4.441 9.873 9.873 0 2.65-.997 5.151-2.813 7.06l-.262.214-3.822-1.02.667 2.989.261-.042a9.908 9.908 0 004.761-1.486l.327-.206 3.957 1.06-1.274-4.648.23-.365a9.884 9.884 0 001.395-5.159c0-5.432-4.441-9.873-9.873-9.873" />
                </svg>
                Quick Book via WhatsApp
              </motion.a>
            </motion.div>

            {/* Privacy Note */}
            <motion.p
              variants={itemVariants}
              className="text-xs text-gray-500 text-center mt-6"
            >
              🔒 Your information is encrypted and secure. We maintain complete confidentiality and discretion for all bookings.
            </motion.p>
          </motion.form>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-dark-card border-t border-gold/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold text-gold mb-3">
              Boost Your Success
            </h2>
            <p className="text-gray-400">
              Maximize your visibility with our premium promotion tools and PRO features
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-lg font-serif font-bold text-gold mb-2">Turbo Boost</h3>
              <p className="text-sm text-gray-400">
                Get 5x more visibility with our Turbo promotion tool. Choose your preferred time slots.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-lg font-serif font-bold text-gold mb-2">Super Turbo</h3>
              <p className="text-sm text-gray-400">
                Increase contacts by 20x with Super Turbo. Exceptional results in just a few clicks.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="text-lg font-serif font-bold text-gold mb-2">PRO Membership</h3>
              <p className="text-sm text-gray-400">
                Double your ads, priority ranking, visit statistics, and dedicated support.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-lg font-serif font-bold text-gold mb-2">Analytics</h3>
              <p className="text-sm text-gray-400">
                Track visits, duplicate successful ads, and optimize your performance.
              </p>
            </div>
          </motion.div>

          {/* Additional PRO Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <div className="bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">📈</div>
              <h4 className="text-lg font-serif font-bold text-gold mb-2">Priority Ranking</h4>
              <p className="text-sm text-gray-400">Your ads go live faster and rank higher than regular listings.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="text-lg font-serif font-bold text-blue-400 mb-2">Coin System</h4>
              <p className="text-sm text-gray-400">Purchase boosts, duplicate ads, and get up to 30% discounts as PRO.</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">📞</div>
              <h4 className="text-lg font-serif font-bold text-green-400 mb-2">Dedicated Support</h4>
              <p className="text-sm text-gray-400">WhatsApp priority assistance from our trained support team.</p>
            </div>
          </motion.div>

          {/* PRO Membership CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/30 rounded-xl p-8">
              <h3 className="text-2xl font-serif font-bold text-gold mb-3">
                Ready to Multiply Your Success?
              </h3>
              <p className="text-gray-300 mb-6">
                Join thousands of successful escorts using our PRO features. Double your ads, get priority ranking, and access exclusive tools for just a couple of cups of coffee per month.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gold text-dark-bg px-8 py-4 rounded-lg font-bold text-lg hover:bg-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Become PRO Today
              </motion.button>
            </div>
          </motion.div>

          {/* Additional Info Boxes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid md:grid-cols-2 gap-6"
          >
            <div className="bg-dark-bg border border-gold/20 rounded-xl p-6">
              <h3 className="text-xl font-serif font-bold text-gold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What Happens Next?
              </h3>
              <ol className="text-sm text-gray-400 space-y-2">
                <li>1. Submit your booking request with all details</li>
                <li>2. Our team reviews and confirms availability</li>
                <li>3. You'll receive WhatsApp/Email confirmation within 30 min</li>
                <li>4. Meet your escort at the scheduled time & place</li>
              </ol>
            </div>

            <div className="bg-dark-bg border border-gold/20 rounded-xl p-6">
              <h3 className="text-xl font-serif font-bold text-gold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Important Information
              </h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Advance booking recommended for popular escorts</li>
                <li>• Same-day bookings subject to availability</li>
                <li>• Cancellations accepted up to 6 hours before</li>
                <li>• Payment as per your selected preference</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <p className="text-gray-400 mb-4">
              Have questions or need assistance with your booking?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-gold/30 text-gold rounded-lg hover:bg-gold/10 transition font-semibold"
                >
                  Contact Support
                </motion.button>
              </Link>
              <Link to="/faq">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-gold/30 text-gold rounded-lg hover:bg-gold/10 transition font-semibold"
                >
                  View FAQ
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Booking

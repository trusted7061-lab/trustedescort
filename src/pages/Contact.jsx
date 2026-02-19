import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Valid email is required'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Contact form submitted:', formData)
      setShowSuccess(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })

      setTimeout(() => setShowSuccess(false), 5000)
    }
  }

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      content: 'info@trustedescort.in',
      link: 'mailto:info@trustedescort.in',
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      content: '+1 (555) 123-4567',
      link: 'https://wa.me/1234567890',
    },
    {
      icon: '📍',
      title: 'Main Office',
      content: 'Mumbai, India',
      link: '#',
    },
    {
      icon: '⏰',
      title: 'Availability',
      content: '24/7 Available',
      link: '#',
    },
  ]

  const locations = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Pune',
    'Goa',
    'Chennai',
    'Kolkata',
    'Chandigarh',
    'Jaipur',
    'Indore',
    'Ahmedabad',
    'Surat',
    'Lucknow',
    'Nagpur',
    'Visakhapatnam',
    'Bhopal',
    'Patna',
    'Vadodara',
    'Agra',
    'Nashik',
    'Kochi',
    'Coimbatore',
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
        <title>Contact Us | Trusted Escort</title>
        <meta name="title" content="Contact Us | Trusted Escort" />
        <meta name="description" content="Get in touch with Trusted Escort. Available 24/7 for inquiries and bookings. Email, phone, and WhatsApp support available." />
        <meta name="keywords" content="contact escort service, book escort, escort inquiry, 24/7 escort service, trusted escort contact, escort booking India" />
        <link rel="canonical" href="https://www.trustedescort.in/contact" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.trustedescort.in/contact" />
        <meta property="og:title" content="Contact Us | Trusted Escort" />
        <meta property="og:description" content="Get in touch with Trusted Escort. Available 24/7 for inquiries and bookings." />
        <meta property="og:image" content="https://www.trustedescort.in/og-image.jpg" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Trusted Escort" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.trustedescort.in/contact" />
        <meta property="twitter:title" content="Contact Us | Trusted Escort" />
        <meta property="twitter:description" content="Get in touch with Trusted Escort. Available 24/7 for inquiries and bookings." />
        <meta property="twitter:image" content="https://www.trustedescort.in/og-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="Trusted Escort" />
        
        {/* ContactPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Trusted Escort",
            "url": "https://www.trustedescort.in/contact",
            "description": "Get in touch with Trusted Escort. Available 24/7 for inquiries and bookings.",
            "mainEntity": {
              "@type": "Organization",
              "name": "Trusted Escort",
              "email": "info@trustedescort.in",
              "telephone": "+91-9876543210",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "Customer Service",
                  "email": "info@trustedescort.in",
                  "availableLanguage": ["English", "Hindi"],
                  "hoursAvailable": "Mo-Su 00:00-23:59"
                },
                {
                  "@type": "ContactPoint",
                  "contactType": "Booking Inquiries",
                  "telephone": "+91-9876543210",
                  "availableLanguage": ["English", "Hindi"],
                  "hoursAvailable": "Mo-Su 00:00-23:59"
                }
              ]
            }
          })}
        </script>
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.trustedescort.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Contact",
                "item": "https://www.trustedescort.in/contact"
              }
            ]
          })}
        </script>
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
              Get in <span className="text-gold">Touch</span>
            </h1>
            <p className="text-xl text-gray-400">
              We're available 24/7. Reach out with any questions or special requests.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-dark-bg">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12"
          >
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="card-glass p-8">
                <h2 className="text-3xl font-serif font-bold text-gold mb-6">Send us a Message</h2>

                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm"
                    >
                      ✓ Thank you for your message. We'll get back to you soon!
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`w-full px-4 py-3 bg-dark-bg border rounded-lg font-sans focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-red-500/50'
                          : 'border-gold/20 focus:border-gold/50'
                      }`}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-xs mt-1"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 bg-dark-bg border rounded-lg font-sans focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-500/50'
                          : 'border-gold/20 focus:border-gold/50'
                      }`}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-xs mt-1"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Subject */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gold mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Message subject"
                      className={`w-full px-4 py-3 bg-dark-bg border rounded-lg font-sans focus:outline-none transition-colors ${
                        errors.subject
                          ? 'border-red-500/50'
                          : 'border-gold/20 focus:border-gold/50'
                      }`}
                    />
                    <AnimatePresence>
                      {errors.subject && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-xs mt-1"
                        >
                          {errors.subject}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gold mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows="5"
                      className={`w-full px-4 py-3 bg-dark-bg border rounded-lg font-sans focus:outline-none transition-colors resize-none ${
                        errors.message
                          ? 'border-red-500/50'
                          : 'border-gold/20 focus:border-gold/50'
                      }`}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-xs mt-1"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full btn-gold py-3"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={containerVariants} className="space-y-6">
              {/* Info Cards */}
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="card-glass p-6 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{info.icon}</div>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-gold mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gold transition-colors">
                        {info.content}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* Response Time */}
              <motion.div variants={itemVariants} className="card-glass p-6 bg-gold/5 border border-gold/30">
                <h3 className="font-serif font-bold text-gold mb-3">Response Time</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We typically respond within 30 minutes during business hours, and we're available 24/7 for urgent matters. Your privacy is always protected.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Locations */}
      <section className="py-20 bg-dark-card border-t border-gold/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Our Locations</h2>
            <p className="text-lg text-gray-400">We operate in multiple cities for your convenience.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {locations.map((location, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="card-glass p-6 text-center cursor-pointer group"
              >
                <div className="text-4xl mb-3 group-hover:text-gold transition-colors">📍</div>
                <h3 className="text-xl font-serif font-bold text-gold">
                  {location}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-bg border-t border-gold/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-serif font-bold text-white">
              Ready to <span className="text-gold">Connect</span>?
            </h2>
            <p className="text-xl text-gray-300">
              Whether you have questions or are ready to book, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:info@trustedescort.in"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gold"
              >
                Email Us
              </motion.a>
              <motion.a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Contact

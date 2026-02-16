import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'What is Trusted Escort?',
      answer: 'Trusted Escort is a premium companionship service connecting distinguished clients with sophisticated, verified escorts across major cities in India.',
    },
    {
      question: 'How do I book a companion?',
      answer: 'Browse our escorts page, select your preferred companion, and contact us via WhatsApp or our booking page. Our team will assist you with the booking process.',
    },
    {
      question: 'Are all escorts verified?',
      answer: 'Yes, all our escorts undergo thorough verification. Verified escorts are marked with a ✓ badge on their profiles.',
    },
    {
      question: 'What are the payment methods?',
      answer: 'We accept bank transfers, UPI, Paytm, Google Pay, and cash. Payment methods are discussed during booking confirmation.',
    },
    {
      question: 'How is my privacy protected?',
      answer: 'We maintain absolute discretion. All client information is confidential and encrypted. We never share personal details with third parties.',
    },
    {
      question: 'Can I cancel or reschedule?',
      answer: 'Yes, cancellations and rescheduling are possible with 24 hours advance notice. Contact our support team for assistance.',
    },
    {
      question: 'What cities do you serve?',
      answer: 'We operate in 68+ major Indian cities including Mumbai, Delhi, Bangalore, Hyderabad, Pune, Goa, Chennai, Kolkata, and many more.',
    },
    {
      question: 'What is the age requirement?',
      answer: 'You must be 18 years or older to use our services. Age verification is mandatory.',
    },
    {
      question: 'Are there minimum booking durations?',
      answer: 'Yes, typically hourly bookings have a 2-hour minimum. Specific requirements are listed on each companion\'s profile.',
    },
    {
      question: 'Is communication secure?',
      answer: 'Yes, all communications are secure. We recommend WhatsApp for booking inquiries as it offers end-to-end encryption.',
    },
    {
      question: 'What services are offered?',
      answer: 'Our escorts provide social companionship including dinner dates, corporate events, travel companionship, cultural events, and more.',
    },
    {
      question: 'How do I contact support?',
      answer: 'Our support team is available 24/7 via WhatsApp, phone, or through our contact form. We respond within minutes.',
    },
  ]

  const leftFAQs = faqs.slice(0, 6)
  const rightFAQs = faqs.slice(6, 12)

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-dark-card border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold mb-4"
          >
            Frequently Asked <span className="text-gold">Questions</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Quick answers to common questions about our services
          </p>
        </div>

        {/* Two Column FAQ Layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-4">
            {leftFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-dark-bg border border-gold/10 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-dark-hover transition-colors"
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  <motion.svg
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 text-gold flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightFAQs.map((faq, index) => (
              <motion.div
                key={index + 6}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-dark-bg border border-gold/10 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index + 6)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-dark-hover transition-colors"
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  <motion.svg
                    animate={{ rotate: openIndex === index + 6 ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 text-gold flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openIndex === index + 6 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All FAQs Link */}
        <div className="text-center">
          <Link to="/faq">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-gold to-gold/80 text-dark-bg font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all"
            >
              View All FAQs →
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FAQSection

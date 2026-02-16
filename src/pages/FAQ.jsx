import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState('All Locations')

  const locations = [
    'All Locations', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Goa', 'Chennai', 
    'Kolkata', 'Chandigarh', 'Jaipur', 'Indore', 'Ahmedabad', 'Surat', 'Lucknow', 'Nagpur',
    'Thane', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra',
    'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Varanasi', 'Srinagar',
    'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad (Prayagraj)', 'Howrah',
    'Ranchi', 'Jabalpur', 'Gwalior', 'Coimbatore', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur',
    'Kota', 'Guwahati', 'Solapur', 'Hubli-Dharwad', 'Bareilly', 'Moradabad', 'Mysuru (Mysore)',
    'Tiruchirappalli', 'Salem', 'Aligarh', 'Bhubaneswar', 'Jalandhar', 'Gorakhpur', 'Guntur',
    'Bikaner', 'Noida', 'Firozabad', 'Jamshedpur', 'Bhavnagar', 'Cuttack', 'Kochi', 'Dehradun',
    'Asansol', 'Nellore', 'Ajmer', 'Kollam', 'Mangalore'
  ]

  const getLocationFAQs = (location) => {
    if (location === 'All Locations') {
      return [
        {
          question: 'What is Trusted Escort?',
          answer: 'Trusted Escort is a premium escortship service connecting distinguished clients with sophisticated, verified escorts across major cities in India. We provide discreet, professional services for social events, business functions, travel, and personal occasions.',
        },
        {
          question: 'How do I book a companion?',
          answer: 'Browse our escorts page, select your preferred companion, and contact us via WhatsApp or our booking page. Our team will assist you with availability, rates, and special requests to ensure a seamless experience.',
        },
        {
          question: 'Are all escorts verified?',
          answer: 'Yes, all our escorts undergo a thorough verification process. Verified escorts are marked with a ✓ badge on their profiles, ensuring authenticity, professionalism, and quality of service.',
        },
        {
          question: 'What are the payment methods?',
          answer: 'We accept various payment methods including bank transfers, digital payments (UPI, Paytm, Google Pay), and cash. Payment terms and methods will be discussed during booking confirmation.',
        },
        {
          question: 'Can I cancel or reschedule a booking?',
          answer: 'Yes, cancellations and rescheduling are possible. Please notify us at least 24 hours in advance. Cancellation policies vary based on booking type and timing.',
        },
        {
          question: 'How is my privacy protected?',
          answer: 'We maintain absolute discretion. All client information is confidential and encrypted. We never share personal details with third parties. Our escorts are also bound by strict confidentiality agreements.',
        },
        {
          question: 'What services are offered?',
          answer: 'Our escorts provide social escortship services including dinner dates, corporate events, travel escortship, cultural events, shopping, entertainment, and more. Specific services are listed on each profile.',
        },
        {
          question: 'Are there minimum booking durations?',
          answer: 'Yes, minimum booking durations vary by service type. Typically, hourly bookings have a 2-hour minimum. Specific requirements are listed on each companion\'s profile.',
        },
        {
          question: 'Is communication secure?',
          answer: 'Yes, all communications through our platform are secure. We recommend using WhatsApp for booking inquiries as it offers end-to-end encryption.',
        },
        {
          question: 'What is the age requirement?',
          answer: 'You must be 18 years or older to use our services. Age verification is mandatory. All our escorts are also 18+ and verified.',
        },
        {
          question: 'How do I contact customer support?',
          answer: 'Our support team is available 24/7 via WhatsApp, phone, or through our contact form. We respond within minutes to ensure your needs are met promptly.',
        },
        {
          question: 'What cities do you serve?',
          answer: 'We currently operate in 69 major Indian cities including Mumbai, Delhi, Bangalore, Hyderabad, Pune, Goa, Chennai, Kolkata, and many more.',
        },
      ]
    }

    return [
      {
        question: `What areas of ${location} do you serve?`,
        answer: `We provide escort services throughout ${location} and surrounding areas. Our companions can meet you at hotels, restaurants, events, or your preferred location within the city.`,
      },
      {
        question: `How many escorts are available in ${location}?`,
        answer: `We have a diverse selection of verified escorts in ${location}. Browse our ${location} escorts page to see all available companions with detailed profiles, photos, and rates.`,
      },
      {
        question: `What are the rates for escorts in ${location}?`,
        answer: `Rates vary based on the companion's experience, duration, and services. ${location} escorts typically charge ₹5,000-₹25,000+ per hour. View individual profiles for specific rates and package deals.`,
      },
      {
        question: `How quickly can I book an escort in ${location}?`,
        answer: `We offer same-day bookings in ${location} based on availability. For popular times or specific companions, we recommend booking 24-48 hours in advance to ensure availability.`,
      },
      {
        question: `Are ${location} escorts available for outcall services?`,
        answer: `Yes, most ${location} escorts offer both incall and outcall services. Outcall means the companion visits your hotel or residence. Additional travel charges may apply for distant locations.`,
      },
      {
        question: `Can I book an escort for travel from ${location}?`,
        answer: `Absolutely! Many ${location} escorts are available for domestic and international travel. Discuss travel arrangements, duration, and rates with our team during booking.`,
      },
      {
        question: `What hotels in ${location} are escort-friendly?`,
        answer: `Most 4-star and 5-star hotels in ${location} are suitable for escort meetings. We can recommend discreet, professional venues. Always book under your name and inform reception of expecting a guest.`,
      },
      {
        question: `Are ${location} escorts available for dinner dates?`,
        answer: `Yes! Dinner dates are very popular in ${location}. Our companions are well-educated, well-dressed, and perfect for upscale restaurants, business dinners, or social events.`,
      },
      {
        question: `How do I verify an escort's identity in ${location}?`,
        answer: `All ${location} escorts on our platform are verified with badge indicators on profiles. We verify ID, photos, and conduct background checks to ensure safety and authenticity.`,
      },
      {
        question: `What languages do ${location} escorts speak?`,
        answer: `${location} escorts typically speak English, Hindi, and local regional languages. Many are multilingual. Check individual profiles for language preferences and communication details.`,
      },
      {
        question: `Can I request specific characteristics in ${location}?`,
        answer: `Yes! Use our advanced filters to search by age, height, ethnicity, services offered, and more. Our ${location} escorts have diverse profiles to match your preferences.`,
      },
      {
        question: `Is there 24/7 support for bookings in ${location}?`,
        answer: `Yes, our customer support team is available 24/7 for ${location} bookings via WhatsApp and phone. We handle bookings, inquiries, and assistance at any time.`,
      },
    ]
  }

  const displayedFAQs = getLocationFAQs(selectedLocation)

  const faqs = [
    {
      category: 'General Questions',
      questions: [
        {
          question: 'What is Trusted Escort?',
          answer: 'Trusted Escort is a premium escortship service connecting distinguished clients with sophisticated, verified escorts across major cities in India. We provide discreet, professional services for social events, business functions, travel, and personal occasions.',
        },
        {
          question: 'How do I book a companion?',
          answer: 'Browse our escorts page, select your preferred companion, and contact us via WhatsApp or our booking page. Our team will assist you with availability, rates, and special requests to ensure a seamless experience.',
        },
        {
          question: 'Are all escorts verified?',
          answer: 'Yes, all our escorts undergo a thorough verification process. Verified escorts are marked with a ✓ badge on their profiles, ensuring authenticity, professionalism, and quality of service.',
        },
        {
          question: 'What cities do you serve?',
          answer: 'We currently operate in 15 major Indian cities: Mumbai, Delhi, Bangalore, Hyderabad, Pune, Goa, Chennai, Kolkata, Chandigarh, Jaipur, Indore, Ahmedabad, Surat, Lucknow, and Nagpur.',
        },
      ],
    },
    {
      category: 'Booking & Payment',
      questions: [
        {
          question: 'What are the payment methods?',
          answer: 'We accept various payment methods including bank transfers, digital payments (UPI, Paytm, Google Pay), and cash. Payment terms and methods will be discussed during booking confirmation.',
        },
        {
          question: 'Can I cancel or reschedule a booking?',
          answer: 'Yes, cancellations and rescheduling are possible. Please notify us at least 24 hours in advance. Cancellation policies vary based on booking type and timing. Contact our support team for specific details.',
        },
        {
          question: 'What is included in the rates?',
          answer: 'Rates include the companion\'s time and professional service. Additional expenses such as dining, entertainment, travel, or accommodation are typically separate and discussed during booking.',
        },
        {
          question: 'Are there minimum booking durations?',
          answer: 'Yes, minimum booking durations vary by service type. Typically, hourly bookings have a 2-hour minimum. Specific requirements are listed on each companion\'s profile.',
        },
      ],
    },
    {
      category: 'Privacy & Safety',
      questions: [
        {
          question: 'How is my privacy protected?',
          answer: 'We maintain absolute discretion. All client information is confidential and encrypted. We never share personal details with third parties. Our escorts are also bound by strict confidentiality agreements.',
        },
        {
          question: 'Is communication secure?',
          answer: 'Yes, all communications through our platform are secure. We recommend using WhatsApp for booking inquiries as it offers end-to-end encryption. We never store sensitive payment information.',
        },
        {
          question: 'What safety measures are in place?',
          answer: 'Safety is paramount. All escorts are verified, and we maintain strict screening processes. We encourage meetings in public venues initially and provide 24/7 support for any concerns.',
        },
        {
          question: 'Do you keep records of bookings?',
          answer: 'We maintain minimal booking records for service quality purposes only. All data is encrypted and automatically deleted after 90 days. We never share client information with third parties.',
        },
      ],
    },
    {
      category: 'Services & Etiquette',
      questions: [
        {
          question: 'What services are offered?',
          answer: 'Our escorts provide social escortship services including dinner dates, corporate events, travel escortship, cultural events, shopping, entertainment, and more. Specific services are listed on each profile.',
        },
        {
          question: 'What is expected from clients?',
          answer: 'We expect clients to be respectful, punctual, and professional. Payment should be completed as agreed. Any special requests should be communicated in advance. Inappropriate behavior will not be tolerated.',
        },
        {
          question: 'Can I request specific escorts for events?',
          answer: 'Absolutely! Browse our profiles and select escorts based on your preferences. We\'ll check availability and confirm your booking. Advance booking is recommended for popular escorts.',
        },
        {
          question: 'What if I\'m not satisfied with the service?',
          answer: 'Client satisfaction is our priority. If you have concerns, contact us immediately. We\'ll work to resolve any issues. Feedback helps us maintain high service standards.',
        },
      ],
    },
    {
      category: 'Age & Legal',
      questions: [
        {
          question: 'What is the age requirement?',
          answer: 'You must be 18 years or older to use our services. Age verification is mandatory. All our escorts are also 18+ and verified.',
        },
        {
          question: 'Is this service legal?',
          answer: 'Yes, we provide legal escortship services. Our business operates within Indian law, offering social escort services for events, travel, and escortship.',
        },
        {
          question: 'Do you conduct background checks?',
          answer: 'Yes, all escorts undergo comprehensive background verification including identity verification, age confirmation, and professional reference checks.',
        },
      ],
    },
  ]

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
        <title>FAQ - Frequently Asked Questions | Trusted Escort</title>
        <meta name="title" content="FAQ - Frequently Asked Questions | Trusted Escort" />
        <meta name="description" content="Find answers to frequently asked questions about our premium escort services, booking process, privacy, payment, and more. Get instant answers." />
        <meta name="keywords" content="escort FAQ, escort questions, escort booking help, companion service questions, escort privacy, escort rates" />
        <link rel="canonical" href="https://www.trustedescort.com/faq" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.trustedescort.com/faq" />
        <meta property="og:title" content="FAQ - Frequently Asked Questions | Trusted Escort" />
        <meta property="og:description" content="Find answers to frequently asked questions about our premium escort services." />
        <meta property="og:image" content="https://www.trustedescort.com/og-image.jpg" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Trusted Escort" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.trustedescort.com/faq" />
        <meta property="twitter:title" content="FAQ - Frequently Asked Questions | Trusted Escort" />
        <meta property="twitter:description" content="Find answers to frequently asked questions about our premium escort services." />
        <meta property="twitter:image" content="https://www.trustedescort.com/og-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="Trusted Escort" />
        
        {/* FAQPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "name": "Frequently Asked Questions",
            "url": "https://www.trustedescort.com/faq",
            "description": "Find answers to frequently asked questions about our premium escort services, booking process, privacy, payment, and more.",
            "mainEntity": displayedFAQs.map(q => ({
              "@type": "Question",
              "name": q.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": q.answer
              }
            }))
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
                "item": "https://www.trustedescort.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "FAQ",
                "item": "https://www.trustedescort.com/faq"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-dark-card to-dark-bg border-b border-gold/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <Link to="/" className="text-gold hover:text-gold/80 text-sm mb-6 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Frequently Asked <span className="text-gold">Questions</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Find answers to common questions about our services, booking process, privacy, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-dark-bg">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Location Filter */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="card-glass p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Filter by Location
              </h3>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-dark-bg border border-gold/20 text-white rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {selectedLocation !== 'All Locations' && (
                <p className="text-gray-400 text-sm mt-3">
                  Showing FAQs specific to {selectedLocation}
                </p>
              )}
            </div>
          </motion.div>

          {/* FAQ Grid - Two Columns */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Left Column - First 6 FAQs */}
            <div className="space-y-4">
              {displayedFAQs.slice(0, 6).map((faq, index) => {
                const isOpen = openIndex === index

                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="card-glass overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gold/5 transition-colors"
                    >
                      <span className="font-semibold text-white pr-4">
                        {faq.question}
                      </span>
                      <motion.svg
                        animate={{ rotate: isOpen ? 180 : 0 }}
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
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-4 text-gray-400 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>

            {/* Right Column - Last 6 FAQs */}
            <div className="space-y-4">
              {displayedFAQs.slice(6, 12).map((faq, index) => {
                const actualIndex = index + 6
                const isOpen = openIndex === actualIndex

                return (
                  <motion.div
                    key={actualIndex}
                    variants={itemVariants}
                    className="card-glass overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(actualIndex)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gold/5 transition-colors"
                    >
                      <span className="font-semibold text-white pr-4">
                        {faq.question}
                      </span>
                      <motion.svg
                        animate={{ rotate: isOpen ? 180 : 0 }}
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
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-4 text-gray-400 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-dark-card border-t border-gold/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-serif font-bold text-white">Still Have Questions?</h2>
            <p className="text-gray-400 text-lg">
              Our support team is available 24/7 to assist you with any inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-gold"
                >
                  Contact Us
                </motion.button>
              </Link>
              <motion.a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.947 1.347l-.355.199-3.682.993 1.012-3.678-.235-.374A9.86 9.86 0 015.031 3.284c5.432 0 9.873 4.441 9.873 9.873 0 2.65-.997 5.151-2.813 7.06l-.262.214-3.822-1.02.667 2.989.261-.042a9.908 9.908 0 004.761-1.486l.327-.206 3.957 1.06-1.274-4.648.23-.365a9.884 9.884 0 001.395-5.159c0-5.432-4.441-9.873-9.873-9.873" />
                </svg>
                WhatsApp Support
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default FAQ

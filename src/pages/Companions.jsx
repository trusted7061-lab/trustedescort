import React, { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllProfiles } from '../services/profileService'
import { defaultEscorts } from '../services/defaultEscorts'
import { setAllEscorts as updateSharedEscorts } from '../services/escortData'

function Escorts() {
  const [searchParams] = useSearchParams()
  const [locationFilter, setLocationFilter] = useState('all')
  const [ageRange, setAgeRange] = useState([18, 40])
  const [allEscorts, setAllEscorts] = useState([])
  const [openFAQIndex, setOpenFAQIndex] = useState(null)
  const [lightboxImage, setLightboxImage] = useState(null)

  // Check for location query parameter and set filter
  useEffect(() => {
    const locationParam = searchParams.get('location')
    if (locationParam) {
      setLocationFilter(locationParam)
    }
  }, [searchParams])

  // Location-based FAQ function
  const getLocationFAQs = (location) => {
    if (location === 'all') {
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
  
  // Load all escorts including advertiser profiles
  useEffect(() => {
    const loadAllEscorts = () => {
      // Get advertiser profiles
      const advertiserProfiles = getAllProfiles()
      
      // Combine advertiser profiles with default escorts
      const combined = [...advertiserProfiles, ...defaultEscorts]
      setAllEscorts(combined)
      
      // Update shared service so CompanionProfile can access the data
      updateSharedEscorts(combined)
    }
    
    loadAllEscorts()
    
    // Listen for profile updates
    const handleProfileUpdate = () => {
      console.log('Profiles updated, reloading all escorts')
      loadAllEscorts()
    }
    
    window.addEventListener('profilesUpdated', handleProfileUpdate)
    window.addEventListener('focus', loadAllEscorts)
    
    return () => {
      window.removeEventListener('profilesUpdated', handleProfileUpdate)
      window.removeEventListener('focus', loadAllEscorts)
    }
  }, [])

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && lightboxImage) {
        setLightboxImage(null)
      }
    }
    
    window.addEventListener('keydown', handleEscKey)
    return () => window.removeEventListener('keydown', handleEscKey)
  }, [lightboxImage])

  const locations = ['all', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Goa', 'Chennai', 'Kolkata', 'Chandigarh', 'Jaipur', 'Indore', 'Ahmedabad', 'Surat', 'Lucknow', 'Nagpur', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad (Prayagraj)', 'Howrah', 'Ranchi', 'Jabalpur', 'Gwalior', 'Coimbatore', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Solapur', 'Hubli-Dharwad', 'Bareilly', 'Moradabad', 'Mysuru (Mysore)', 'Tiruchirappalli', 'Salem', 'Aligarh', 'Bhubaneswar', 'Jalandhar', 'Gorakhpur', 'Guntur', 'Bikaner', 'Noida', 'Firozabad', 'Jamshedpur', 'Bhavnagar', 'Cuttack', 'Kochi', 'Dehradun', 'Asansol', 'Nellore', 'Ajmer', 'Kollam', 'Mangalore']

  const filteredEscorts = useMemo(() => {
    return allEscorts.filter((escort) => {
      const locationMatch = locationFilter === 'all' || escort.location === locationFilter
      const ageMatch = escort.age >= ageRange[0] && escort.age <= ageRange[1]
      return locationMatch && ageMatch
    })
  }, [allEscorts, locationFilter, ageRange])

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
        <title>{locationFilter !== 'all' ? `${locationFilter} Escorts` : 'Escorts'} | Trusted Escort</title>
        <meta name="title" content={`${locationFilter !== 'all' ? `${locationFilter} Escorts` : 'Escorts'} | Trusted Escort`} />
        <meta name="description" content={locationFilter !== 'all' ? `Browse our exclusive verified escorts in ${locationFilter}. Premium companionship services available 24/7.` : 'Browse our selection of verified exclusive escorts across India. Premium companionship services available 24/7.'} />
        <meta name="keywords" content={locationFilter !== 'all' ? `${locationFilter} escorts, ${locationFilter} companions, premium escorts ${locationFilter}, verified escorts ${locationFilter}` : 'escorts India, premium escorts, verified companions, luxury escort service'} />
        <link rel="canonical" href={locationFilter !== 'all' ? `https://www.trustedescort.com/escorts?location=${locationFilter}` : 'https://www.trustedescort.com/escorts'} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={locationFilter !== 'all' ? `https://www.trustedescort.com/escorts?location=${locationFilter}` : 'https://www.trustedescort.com/escorts'} />
        <meta property="og:title" content={`${locationFilter !== 'all' ? `${locationFilter} Escorts` : 'Escorts'} | Trusted Escort`} />
        <meta property="og:description" content={locationFilter !== 'all' ? `Browse our exclusive escorts in ${locationFilter}` : 'Browse our selection of exclusive escorts.'} />
        <meta property="og:image" content="https://www.trustedescort.com/og-image.jpg" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Trusted Escort" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={locationFilter !== 'all' ? `https://www.trustedescort.com/escorts?location=${locationFilter}` : 'https://www.trustedescort.com/escorts'} />
        <meta property="twitter:title" content={`${locationFilter !== 'all' ? `${locationFilter} Escorts` : 'Escorts'} | Trusted Escort`} />
        <meta property="twitter:description" content={locationFilter !== 'all' ? `Browse our exclusive escorts in ${locationFilter}` : 'Browse our selection of exclusive escorts.'} />
        <meta property="twitter:image" content="https://www.trustedescort.com/og-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="Trusted Escort" />
        {locationFilter !== 'all' && (
          <>
            <meta name="geo.region" content={`IN-${locationFilter.substring(0, 2).toUpperCase()}`} />
            <meta name="geo.placename" content={locationFilter} />
          </>
        )}
        
        {/* Structured Data - Service Schema */}
        {locationFilter !== 'all' && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": `Premium Escort Services in ${locationFilter}`,
              "description": `Browse our exclusive verified escorts in ${locationFilter}. Premium companionship services available 24/7.`,
              "provider": {
                "@type": "Organization",
                "name": "Trusted Escort",
                "url": "https://www.trustedescort.com"
              },
              "areaServed": {
                "@type": "City",
                "name": locationFilter,
                "addressCountry": "IN"
              },
              "serviceType": "Escort Service",
              "availableChannel": {
                "@type": "ServiceChannel",
                "serviceUrl": `https://www.trustedescort.com/escorts?location=${locationFilter}`
              }
            })}
          </script>
        )}
        
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
                "name": "Escorts",
                "item": "https://www.trustedescort.com/escorts"
              },
              ...(locationFilter !== 'all' ? [{
                "@type": "ListItem",
                "position": 3,
                "name": locationFilter,
                "item": `https://www.trustedescort.com/escorts?location=${locationFilter}`
              }] : [])
            ]
          })}
        </script>
        
        {/* ItemList Schema for Escorts */}
        {filteredEscorts.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": filteredEscorts.slice(0, 10).map((escort, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Person",
                  "name": escort.name,
                  "description": escort.description,
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": escort.rating,
                    "reviewCount": escort.reviews
                  }
                }
              }))
            })}
          </script>
        )}
        
        {/* FAQ Schema */}
        {locationFilter !== 'all' && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": `How do I book an escort in ${locationFilter}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Booking an escort in ${locationFilter} is simple and discreet. Contact us via WhatsApp or our contact form with your preferred date, time, and any special requests. Our team will match you with available escorts in ${locationFilter} and handle all arrangements professionally.`
                  }
                },
                {
                  "@type": "Question",
                  "name": `What areas of ${locationFilter} do you cover?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `We provide comprehensive escort services across all major areas of ${locationFilter}, including premium hotels, business districts, residential areas, and airports. Our escorts can travel to your preferred location within ${locationFilter} and surrounding areas.`
                  }
                },
                {
                  "@type": "Question",
                  "name": `Are your ${locationFilter} escorts available 24/7?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, our elite escort services in ${locationFilter} are available 24 hours a day, 7 days a week. Whether you need daytime companionship, evening escorts, or overnight bookings, we can accommodate your schedule in ${locationFilter}.`
                  }
                },
                {
                  "@type": "Question",
                  "name": `What makes your ${locationFilter} escort service premium?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Our ${locationFilter} escorts are carefully selected for their sophistication, elegance, and professionalism. They understand the unique lifestyle and expectations of ${locationFilter}'s elite clientele and provide exceptional companionship for business events, social gatherings, and private occasions.`
                  }
                },
                {
                  "@type": "Question",
                  "name": `How is discretion maintained in ${locationFilter}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `We maintain the highest standards of privacy and confidentiality in ${locationFilter}. All bookings are handled discreetly, we never share client information, and our escorts are trained professionals who understand the importance of discretion in ${locationFilter}'s business and social circles.`
                  }
                }
              ]
            })}
          </script>
        )}
      </Helmet>

      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-dark-card to-dark-bg border-b border-gold/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {locationFilter !== 'all' && (
              <Link 
                to={`/location/${locationFilter.toLowerCase()}`} 
                className="text-gold hover:text-gold/80 text-sm mb-4 inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to {locationFilter}
              </Link>
            )}
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              {locationFilter !== 'all' ? (
                <>
                  Premium <span className="text-gold">{locationFilter}</span> Escorts
                </>
              ) : (
                <>
                  Exclusive <span className="text-gold">Escorts</span> Across India
                </>
              )}
            </h1>
            <p className="text-xl text-gray-400">
              {locationFilter !== 'all' 
                ? `Discover verified, sophisticated companions in ${locationFilter}. Elite escort services available 24/7 for discerning clientele.`
                : 'Browse our selection of verified elite companions across India. Premium companionship services available 24/7.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-dark-bg">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-64 flex-shrink-0"
            >
              <div className="card-glass p-6 sticky top-24">
                <h3 className="text-xl font-serif font-bold text-gold mb-6">Filters</h3>

                {/* Location Filter */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gold mb-3">
                    Location
                  </label>
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <Link
                        key={location}
                        to={location === 'all' ? '/escorts' : `/escorts?location=${location}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={location === 'all' ? 'View escorts in all locations' : `View escorts in ${location}`}
                      >
                        <motion.div
                          whileHover={{ x: 5 }}
                          className={`flex items-center cursor-pointer group p-2 rounded-lg transition-colors ${
                            locationFilter === location ? 'bg-gold/10 border border-gold/30' : 'hover:bg-dark-hover'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            locationFilter === location ? 'bg-gold' : 'bg-gray-500'
                          }`} />
                          <span className={`text-sm capitalize ${
                            locationFilter === location ? 'text-gold font-semibold' : 'text-gray-300 group-hover:text-gold'
                          } transition-colors`}>
                            {location === 'all' ? 'All Locations' : location}
                          </span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Age Range Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gold mb-3">
                    Age Range: {ageRange[0]} - {ageRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="18"
                      max="50"
                      value={ageRange[0]}
                      onChange={(e) => {
                        const newMin = Math.min(parseInt(e.target.value), ageRange[1])
                        setAgeRange([newMin, ageRange[1]])
                      }}
                      className="w-full accent-gold"
                    />
                    <input
                      type="range"
                      min="18"
                      max="50"
                      value={ageRange[1]}
                      onChange={(e) => {
                        const newMax = Math.max(parseInt(e.target.value), ageRange[0])
                        setAgeRange([ageRange[0], newMax])
                      }}
                      className="w-full accent-gold"
                    />
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Grid */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6"
              >
                <p className="text-gray-400 text-sm">
                  Showing <span className="text-gold font-semibold">{filteredEscorts.length}</span> escorts
                  {locationFilter !== 'all' && <span> in <span className="text-gold font-semibold">{locationFilter}</span></span>}
                </p>
              </motion.div>

              {filteredEscorts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredEscorts.map((escort) => (
                    <div key={escort.id}>
                      <Link 
                        to={`/escorts/${escort.name.toLowerCase().replace(/\s+/g, '-')}-${escort.id}`}
                        aria-label={`View profile of ${escort.name}, ${escort.age} year old ${escort.verified ? 'verified ' : ''}escort in ${escort.location}`}
                      >
                        <div className="card-glass overflow-hidden group cursor-pointer h-full flex flex-col hover:transform hover:-translate-y-2 transition-transform duration-300">
                          {/* Image */}
                          <div className="relative h-96 overflow-hidden bg-dark-card">
                            <img
                              src={escort.image}
                              alt={`${escort.name}, ${escort.age} - ${escort.description} - ${escort.verified ? 'Verified ' : ''}Elite escort in ${escort.location} with ${escort.rating} rating`}
                              className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop'
                              }}
                            />
                            
                            {/* Badges Overlay */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              className="absolute top-4 right-4 flex flex-col gap-2"
                            >
                              {escort.verified && (
                                <div className="bg-green-500/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-green-300 border border-green-300/30 flex items-center gap-1">
                                  ✓ Verified
                                </div>
                              )}
                              <div className="bg-gold/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-gold border border-gold/30">
                                Age {escort.age}
                              </div>
                            </motion.div>
                          </div>

                          {/* Content */}
                          <div className="p-6 flex-grow flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-2xl font-serif font-bold text-gold flex-grow">
                                {escort.name}
                              </h3>
                              <div className="text-yellow-400 text-sm font-semibold">
                                ★ {escort.rating}
                              </div>
                            </div>
                            
                            <p className="text-xs text-gray-400 mb-2">
                              {escort.reviews} reviews
                            </p>
                            
                            <p className="text-sm text-gray-300 mb-4 line-clamp-none">
                              {escort.description}
                            </p>
                            
                            {/* Location & Availability */}
                            <div className="space-y-2 mb-4 text-sm">
                              <div className="flex items-center text-gray-300">
                                <svg className="w-3 h-3 mr-2 text-gold" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                                {escort.location}
                              </div>
                              <div className="flex items-center text-green-300">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                                {escort.availability}
                              </div>
                              <div className="flex items-center text-gray-400">
                                <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.293.707l-2.828 2.829a1 1 0 101.415 1.415L9 10.414V6z" />
                                </svg>
                                Responds {escort.responseTime}
                              </div>
                            </div>

                            {/* Services */}
                            <div className="mb-4 flex flex-wrap gap-2">
                              {escort.services.map((service, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-3 py-1.5 bg-gold/10 text-gold rounded border border-gold/20"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>

                            <motion.button
                              whileHover={{ x: 5 }}
                              className="text-gold text-sm font-semibold hover:text-gold/80 transition-colors mt-auto"
                            >
                              View Profile →
                            </motion.button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No escorts match your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Location-Based FAQs Section - 6 Left, 6 Right */}
      <section className="py-16 bg-dark-card/30 border-y border-gold/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold text-gold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              {locationFilter !== 'all' 
                ? `Common questions about our escort services in ${locationFilter}`
                : 'Common questions about our escort services'
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Left Column - First 6 FAQs */}
            <div className="space-y-3">
              {getLocationFAQs(locationFilter).slice(0, 6).map((faq, index) => (
                <motion.div
                  key={`left-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gold/20 rounded-lg overflow-hidden bg-dark-card/50"
                >
                  <button
                    onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gold/5 transition-colors"
                    aria-expanded={openFAQIndex === index}
                    aria-controls={`faq-answer-${index}`}
                    type="button"
                  >
                    <span className="text-white font-semibold pr-4">{faq.question}</span>
                    <motion.svg
                      animate={{ rotate: openFAQIndex === index ? 180 : 0 }}
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
                    {openFAQIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div id={`faq-answer-${index}`} className="px-6 pb-4 pt-2 text-gray-400 leading-relaxed border-t border-gold/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Right Column - Last 6 FAQs */}
            <div className="space-y-3">
              {getLocationFAQs(locationFilter).slice(6, 12).map((faq, index) => (
                <motion.div
                  key={`right-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index + 6) * 0.05 }}
                  className="border border-gold/20 rounded-lg overflow-hidden bg-dark-card/50"
                >
                  <button
                    onClick={() => setOpenFAQIndex(openFAQIndex === (index + 6) ? null : (index + 6))}
                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gold/5 transition-colors"
                    aria-expanded={openFAQIndex === (index + 6)}
                    aria-controls={`faq-answer-${index + 6}`}
                    type="button"
                  >
                    <span className="text-white font-semibold pr-4">{faq.question}</span>
                    <motion.svg
                      animate={{ rotate: openFAQIndex === (index + 6) ? 180 : 0 }}
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
                    {openFAQIndex === (index + 6) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div id={`faq-answer-${index + 6}`} className="px-6 pb-4 pt-2 text-gray-400 leading-relaxed border-t border-gold/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-10"
          >
            <p className="text-gray-400 mb-4">Have more questions?</p>
            <Link to="/faq" aria-label="View all frequently asked questions about our escort services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gold"
                type="button"
              >
                View All FAQs
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Content Features Section */}
      {locationFilter !== 'all' && (
        <section className="py-20 bg-dark-bg border-t border-gold/10">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-serif font-bold text-gold mb-4">
                Premium Escort Services in {locationFilter}
              </h2>
              <p className="text-xl text-gray-300">
                Discover the exclusive features of our {locationFilter} escort service
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {[
                {
                  icon: '🌟',
                  title: 'Elite Selection',
                  description: `Handpicked premium escorts in ${locationFilter} verified for authenticity, elegance, and sophistication. Each companion undergoes rigorous screening to ensure the highest quality standards.`
                },
                {
                  icon: '🔒',
                  title: 'Complete Discretion',
                  description: `Absolute privacy guaranteed for all ${locationFilter} bookings. Your personal information is encrypted and never shared. All meetings are handled with utmost confidentiality and professionalism.`
                },
                {
                  icon: '⏰',
                  title: '24/7 Availability',
                  description: `Round-the-clock escort services in ${locationFilter}. Book anytime for immediate or advance appointments. Our team is always ready to assist you with urgent requirements.`
                },
                {
                  icon: '💎',
                  title: 'Luxury Experience',
                  description: `Premium companionship tailored to your preferences in ${locationFilter}. From corporate events to private dinners, enjoy sophisticated company that matches your lifestyle and expectations.`
                },
                {
                  icon: '✈️',
                  title: 'Travel Companions',
                  description: `Escorts available for domestic and international travel from ${locationFilter}. Perfect companions for business trips, vacations, or special events requiring elegant company.`
                },
                {
                  icon: '🎭',
                  title: 'Event Partners',
                  description: `Professional escorts for corporate events, galas, and social functions in ${locationFilter}. Make a lasting impression with a sophisticated companion by your side.`
                },
                {
                  icon: '💬',
                  title: 'Instant Response',
                  description: `Quick response times for all ${locationFilter} inquiries. Most escorts respond within 15-30 minutes. Our support team is available via WhatsApp for immediate assistance.`
                },
                {
                  icon: '✓',
                  title: 'Verified Profiles',
                  description: `All ${locationFilter} escorts are verified with authentic photos and accurate descriptions. Blue checkmark indicates completed verification including ID, age, and background checks.`
                },
                {
                  icon: '🏨',
                  title: 'Hotel Services',
                  description: `Seamless outcall services to all major hotels in ${locationFilter}. Discreet arrivals and departures. Familiar with premium hotels and understand their protocols perfectly.`
                },
                {
                  icon: '💳',
                  title: 'Flexible Payments',
                  description: `Multiple secure payment options in ${locationFilter} including cash, bank transfers, and digital payments (UPI, Paytm, Google Pay). Clear pricing with no hidden charges.`
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card-glass p-6"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-serif font-bold text-gold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <Link to="/contact" aria-label={`Contact us to book escorts in ${locationFilter}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-gold"
                  type="button"
                >
                  Contact Us Now
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {locationFilter !== 'all' && (
        <section className="py-20 bg-dark-card border-t border-gold/10">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-serif font-bold text-gold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-300">
                Common questions about our escort services in {locationFilter}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              {[
                {
                  question: `How do I book an escort in ${locationFilter}?`,
                  answer: `Booking an escort in ${locationFilter} is simple and discreet. Contact us via WhatsApp or our contact form with your preferred date, time, and any special requests. Our team will match you with available escorts in ${locationFilter} and handle all arrangements professionally.`
                },
                {
                  question: `What areas of ${locationFilter} do you cover?`,
                  answer: `We provide comprehensive escort services across all major areas of ${locationFilter}, including premium hotels, business districts, residential areas, and airports. Our escorts can travel to your preferred location within ${locationFilter} and surrounding areas.`
                },
                {
                  question: `Are your ${locationFilter} escorts available 24/7?`,
                  answer: `Yes, our elite escort services in ${locationFilter} are available 24 hours a day, 7 days a week. Whether you need daytime companionship, evening escorts, or overnight bookings, we can accommodate your schedule in ${locationFilter}.`
                },
                {
                  question: `What makes your ${locationFilter} escort service premium?`,
                  answer: `Our ${locationFilter} escorts are carefully selected for their sophistication, elegance, and professionalism. They understand the unique lifestyle and expectations of ${locationFilter}'s elite clientele and provide exceptional companionship for business events, social gatherings, and private occasions.`
                },
                {
                  question: `How is discretion maintained in ${locationFilter}?`,
                  answer: `We maintain the highest standards of privacy and confidentiality in ${locationFilter}. All bookings are handled discreetly, we never share client information, and our escorts are trained professionals who understand the importance of discretion in ${locationFilter}'s business and social circles.`
                },
                {
                  question: `Can I request a specific escort from your ${locationFilter} gallery?`,
                  answer: `Absolutely! Browse our ${locationFilter} escort gallery and request your preferred companion. We'll confirm their availability for your desired date and time in ${locationFilter} and arrange all the details for your meeting.`
                },
                {
                  question: `What services are included with ${locationFilter} escorts?`,
                  answer: `Our ${locationFilter} escorts provide sophisticated companionship for various occasions including business dinners, corporate events, social gatherings, travel companionship, and private meetings. Services are customized based on your specific requirements in ${locationFilter}.`
                },
                {
                  question: `How far in advance should I book in ${locationFilter}?`,
                  answer: `For best availability in ${locationFilter}, we recommend booking at least 24-48 hours in advance. However, we also accommodate last-minute bookings based on escort availability in ${locationFilter}. Contact us to check immediate availability.`
                },
                {
                  question: `What payment methods do you accept in ${locationFilter}?`,
                  answer: `We accept multiple secure payment methods in ${locationFilter} including cash, bank transfers, and digital payments. Complete payment details and terms will be provided during your booking confirmation for ${locationFilter} services.`
                },
                {
                  question: `Do you offer both outcall and incall services in ${locationFilter}?`,
                  answer: `Yes, we provide both outcall services (escort visits your location) and incall services (you visit a designated location) in ${locationFilter}. Most clients in ${locationFilter} prefer outcall services to their hotel or private residence.`
                },
                {
                  question: `Can ${locationFilter} escorts accompany me for travel or events?`,
                  answer: `Certainly! Our ${locationFilter} escorts are available for travel companionship within the city and beyond, including domestic and international trips. They can also accompany you to social events, corporate functions, and special occasions in ${locationFilter}.`
                },
                {
                  question: `What is your cancellation policy in ${locationFilter}?`,
                  answer: `We understand that plans can change. Please contact us at least 4 hours before your scheduled appointment in ${locationFilter} to cancel or reschedule. Our complete cancellation policy will be explained during your booking confirmation.`
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gold/20 rounded-lg overflow-hidden bg-dark-card/50"
                >
                  <button
                    onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gold/5 transition-colors"
                    aria-expanded={openFAQIndex === index}
                    aria-controls={`faq-answer-${index}`}
                    type="button"
                  >
                    <span className="text-white font-semibold pr-4">{faq.question}</span>
                    <motion.svg
                      animate={{ rotate: openFAQIndex === index ? 180 : 0 }}
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
                    {openFAQIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div id={`faq-answer-${index}`} className="px-6 pb-4 pt-2 text-gray-400 leading-relaxed border-t border-gold/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center mt-10"
            >
              <p className="text-gray-400 mb-4">Have more questions?</p>
              <Link to="/faq" aria-label="View all frequently asked questions about our escort services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-gold"
                  type="button"
                >
                  View All FAQs
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 bg-gold/20 hover:bg-gold/40 backdrop-blur-md p-3 rounded-full text-gold transition-colors z-[101]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              aria-label="Close image preview"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={lightboxImage}
              alt="Full size preview of escort profile image"
              className="max-w-full max-h-full object-contain cursor-default"
              onClick={(e) => e.stopPropagation()}
              loading="eager"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Escorts

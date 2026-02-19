import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

function PrivacyPolicy() {
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

  const sections = [
    {
      title: '1. Information We Collect',
      content: [
        'We collect information that you provide directly to us, including:',
        '• Contact information (name, email, phone number)',
        '• Booking preferences and service requests',
        '• Payment information (processed securely through third-party providers)',
        '• Communications with our support team',
        '• Device and usage information when you visit our website',
      ],
    },
    {
      title: '2. How We Use Your Information',
      content: [
        'We use the information we collect to:',
        '• Process and manage your bookings',
        '• Communicate with you about services and updates',
        '• Improve our services and user experience',
        '• Ensure safety and security of our platform',
        '• Comply with legal obligations',
        '• Send promotional communications (with your consent)',
      ],
    },
    {
      title: '3. Information Sharing and Disclosure',
      content: [
        'We maintain strict confidentiality and do not sell your personal information. We may share limited information only in these circumstances:',
        '• With escorts to coordinate bookings (minimal details only)',
        '• With service providers who assist our operations (under strict NDAs)',
        '• When required by law or to protect rights and safety',
        '• With your explicit consent for specific purposes',
      ],
    },
    {
      title: '4. Data Security',
      content: [
        'We implement robust security measures to protect your information:',
        '• End-to-end encryption for sensitive communications',
        '• Secure SSL/TLS protocols for all data transmission',
        '• Regular security audits and updates',
        '• Limited access to personal data on need-to-know basis',
        '• Secure payment processing through certified third parties',
        '• Automatic data deletion after 90 days',
      ],
    },
    {
      title: '5. Cookies and Tracking',
      content: [
        'We use cookies and similar technologies to:',
        '• Remember your preferences and settings',
        '• Analyze site traffic and usage patterns',
        '• Improve site functionality and performance',
        '• Provide personalized content',
        'You can control cookie settings through your browser preferences.',
      ],
    },
    {
      title: '6. Your Rights and Choices',
      content: [
        'You have the right to:',
        '• Access your personal information',
        '• Request correction of inaccurate data',
        '• Request deletion of your data',
        '• Opt-out of marketing communications',
        '• Withdraw consent for data processing',
        '• File a complaint with relevant authorities',
        'Contact us at info@trustedescort.in to exercise these rights.',
      ],
    },
    {
      title: '7. Age Restriction',
      content: [
        'Our services are strictly for individuals 18 years and older. We do not knowingly collect information from minors. If we discover we have collected information from someone under 18, we will delete it immediately.',
      ],
    },
    {
      title: '8. Third-Party Links',
      content: [
        'Our website may contain links to third-party sites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.',
      ],
    },
    {
      title: '9. Data Retention',
      content: [
        'We retain personal information only as long as necessary to provide services and comply with legal obligations. Booking records are automatically deleted after 90 days. You may request earlier deletion by contacting us.',
      ],
    },
    {
      title: '10. International Users',
      content: [
        'Our services are primarily for users in India. If you access our services from outside India, your information may be transferred to and processed in India, subject to Indian data protection laws.',
      ],
    },
    {
      title: '11. Changes to This Policy',
      content: [
        'We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes via email or website notice. Continued use of our services after changes constitutes acceptance.',
      ],
    },
    {
      title: '12. Contact Us',
      content: [
        'For questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:',
        '• Email: info@trustedescort.in',
        '• WhatsApp: +91 1234567890',
        '• Address: Mumbai, Maharashtra, India',
        'We will respond to all requests within 30 days.',
      ],
    },
  ]

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Privacy Policy | Trusted Escort</title>
        <meta name="title" content="Privacy Policy | Trusted Escort" />
        <meta name="description" content="Read our privacy policy to understand how we collect, use, and protect your personal information. Complete data protection and confidentiality guaranteed." />
        <meta name="keywords" content="escort privacy policy, data protection, confidentiality, privacy guarantee, secure escort service" />
        <link rel="canonical" href="https://www.trustedescort.in/privacy-policy" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.trustedescort.in/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | Trusted Escort" />
        <meta property="og:description" content="Read our privacy policy to understand how we protect your personal information." />
        <meta property="og:image" content="https://www.trustedescort.in/og-image.jpg" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Trusted Escort" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.trustedescort.in/privacy-policy" />
        <meta property="twitter:title" content="Privacy Policy | Trusted Escort" />
        <meta property="twitter:description" content="Read our privacy policy to understand how we protect your personal information." />
        <meta property="twitter:image" content="https://www.trustedescort.in/og-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="Trusted Escort" />
        
        {/* WebPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "url": "https://www.trustedescort.in/privacy-policy",
            "description": "Read our privacy policy to understand how we collect, use, and protect your personal information. Complete data protection and confidentiality guaranteed.",
            "publisher": {
              "@type": "Organization",
              "name": "Trusted Escort",
              "url": "https://www.trustedescort.in"
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
                "name": "Privacy Policy",
                "item": "https://www.trustedescort.in/privacy-policy"
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
              Privacy <span className="text-gold">Policy</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Your privacy is our priority. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last Updated: February 11, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Introduction */}
            <motion.div variants={itemVariants} className="card-glass p-8">
              <p className="text-gray-300 leading-relaxed mb-4">
                Welcome to Trusted Escort. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
              </p>
              <p className="text-gray-300 leading-relaxed">
                By accessing or using our services, you agree to this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </motion.div>

            {/* Policy Sections */}
            {sections.map((section, index) => (
              <motion.div key={index} variants={itemVariants} className="card-glass p-8">
                <h2 className="text-2xl font-serif font-bold text-gold mb-4">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark-card border-t border-gold/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-serif font-bold text-white">Questions About Privacy?</h2>
            <p className="text-gray-400 text-lg">
              Contact our privacy team for any concerns or inquiries.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gold"
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicy

import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

function Terms() {
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
      title: '1. Acceptance of Terms',
      content: [
        'By accessing and using Trusted Escort services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, you must not use our services.',
        'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services constitutes acceptance of modified terms.',
      ],
    },
    {
      title: '2. Eligibility',
      content: [
        'You must be at least 18 years old to use our services.',
        'By using our services, you represent and warrant that:',
        '• You are of legal age in your jurisdiction',
        '• You have the legal capacity to enter into binding contracts',
        '• You will use our services in compliance with all applicable laws',
        '• All information provided is accurate and truthful',
      ],
    },
    {
      title: '3. Services Description',
      content: [
        'Trusted Escort provides a platform connecting clients with professional escorts for social events, business functions, travel, and escortship services.',
        'Our services include:',
        '• Access to verified companion profiles',
        '• Booking and scheduling assistance',
        '• Customer support',
        '• Safe and secure communication platform',
        'We reserve the right to modify, suspend, or discontinue any aspect of our services without notice.',
      ],
    },
    {
      title: '4. User Obligations',
      content: [
        'As a user, you agree to:',
        '• Provide accurate and complete information',
        '• Maintain the confidentiality of your account',
        '• Use services only for lawful purposes',
        '• Respect escorts and staff',
        '• Honor all booking commitments and payment obligations',
        '• Not engage in any fraudulent or illegal activities',
        '• Not harass, threaten, or abuse any users or staff',
        '• Not share or distribute companion contact information',
      ],
    },
    {
      title: '5. Booking and Payment',
      content: [
        'Booking Terms:',
        '• All bookings are subject to companion availability',
        '• Rates vary by companion, service type, and duration',
        '• Minimum booking requirements may apply',
        '• Advance booking is recommended',
        'Payment Terms:',
        '• Payment methods and terms are communicated during booking',
        '• Payments must be made as agreed',
        '• Additional expenses (dining, travel, etc.) are client responsibility',
        '• Refunds are subject to our cancellation policy',
      ],
    },
    {
      title: '6. Cancellation Policy',
      content: [
        '• Cancellations must be made at least 24 hours in advance',
        '• Last-minute cancellations (less than 24 hours) may incur charges',
        '• No-shows will be charged the full booking amount',
        '• Rescheduling is possible subject to availability',
        '• Refund requests are evaluated case-by-case',
        '• We reserve the right to cancel bookings for safety or policy violations',
      ],
    },
    {
      title: '7. Prohibited Conduct',
      content: [
        'The following activities are strictly prohibited:',
        '• Illegal activities of any kind',
        '• Harassment, abuse, or threatening behavior',
        '• Requesting or offering illegal services',
        '• Attempting to circumvent our platform',
        '• Sharing companion personal information',
        '• Recording without consent',
        '• Impersonation or fraudulent activity',
        'Violation may result in immediate account termination and legal action.',
      ],
    },
    {
      title: '8. Intellectual Property',
      content: [
        'All content on our website, including text, images, logos, and design, is protected by intellectual property laws and owned by Trusted Escort or licensed partners.',
        'You may not:',
        '• Copy, reproduce, or distribute our content',
        '• Use our trademarks without permission',
        '• Download or scrape companion profiles',
        '• Create derivative works from our content',
      ],
    },
    {
      title: '9. Privacy and Confidentiality',
      content: [
        'We are committed to protecting your privacy. Our Privacy Policy governs how we collect, use, and protect your information.',
        'Both clients and escorts are bound by confidentiality:',
        '• Personal information must be kept confidential',
        '• Discretion is expected at all times',
        '• Sharing details of interactions is prohibited',
        'Violations may result in account termination and legal action.',
      ],
    },
    {
      title: '10. Disclaimer of Warranties',
      content: [
        'Our services are provided "as is" and "as available" without warranties of any kind, either express or implied.',
        'We do not guarantee:',
        '• Uninterrupted or error-free service',
        '• Specific outcomes from companion interactions',
        '• Accuracy of all information on our platform',
        '• Compatibility with all devices or browsers',
      ],
    },
    {
      title: '11. Limitation of Liability',
      content: [
        'To the fullest extent permitted by law, Trusted Escort shall not be liable for:',
        '• Indirect, incidental, or consequential damages',
        '• Lost profits or revenue',
        '• Data loss or corruption',
        '• Personal injury or property damage',
        '• Actions or omissions of escorts',
        'Our total liability shall not exceed the amount paid for the specific service in question.',
      ],
    },
    {
      title: '12. Indemnification',
      content: [
        'You agree to indemnify and hold Trusted Escort, its affiliates, employees, and partners harmless from any claims, damages, losses, liabilities, and expenses arising from:',
        '• Your use of our services',
        '• Your violation of these terms',
        '• Your violation of any rights of third parties',
        '• Your conduct during any booking',
      ],
    },
    {
      title: '13. Dispute Resolution',
      content: [
        'In the event of any dispute:',
        '• Contact our support team first for resolution',
        '• Good faith negotiations will be attempted',
        '• Disputes will be governed by Indian law',
        '• Jurisdiction will be courts of Mumbai, Maharashtra',
        '• Arbitration may be required for certain disputes',
      ],
    },
    {
      title: '14. Termination',
      content: [
        'We reserve the right to:',
        '• Suspend or terminate accounts for policy violations',
        '• Refuse service to anyone for any reason',
        '• Remove content that violates our policies',
        'Upon termination:',
        '• Your right to use services ends immediately',
        '• Outstanding payments remain due',
        '• Certain provisions survive termination (confidentiality, liability, etc.)',
      ],
    },
    {
      title: '15. Miscellaneous',
      content: [
        'Severability: If any provision is found unenforceable, other provisions remain in effect.',
        'Entire Agreement: These terms constitute the entire agreement between you and Trusted Escort.',
        'No Waiver: Failure to enforce any right does not constitute a waiver.',
        'Assignment: We may assign our rights; you may not without consent.',
        'Force Majeure: We are not liable for delays due to circumstances beyond our control.',
      ],
    },
    {
      title: '16. Contact Information',
      content: [
        'For questions about these Terms and Conditions:',
        '• Email: info@trustedescort.in',
        '• WhatsApp: +91 1234567890',
        '• Address: Mumbai, Maharashtra, India',
        'We will respond to inquiries within 48 hours.',
      ],
    },
  ]

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Terms and Conditions | Trusted Escort</title>
        <meta name="title" content="Terms and Conditions | Trusted Escort" />
        <meta name="description" content="Read our terms and conditions governing the use of Trusted Escort services. Understand your rights and obligations." />
        <meta name="keywords" content="escort terms, terms and conditions, service agreement, escort policy, usage terms" />
        <link rel="canonical" href="https://www.trustedescort.in/terms" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.trustedescort.in/terms" />
        <meta property="og:title" content="Terms and Conditions | Trusted Escort" />
        <meta property="og:description" content="Read our terms and conditions governing the use of Trusted Escort services." />
        <meta property="og:image" content="https://www.trustedescort.in/og-image.jpg" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Trusted Escort" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.trustedescort.in/terms" />
        <meta property="twitter:title" content="Terms and Conditions | Trusted Escort" />
        <meta property="twitter:description" content="Read our terms and conditions governing the use of Trusted Escort services." />
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
            "name": "Terms and Conditions",
            "url": "https://www.trustedescort.in/terms",
            "description": "Read our terms and conditions governing the use of Trusted Escort services. Understand your rights and obligations.",
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
                "name": "Terms and Conditions",
                "item": "https://www.trustedescort.in/terms"
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
              Terms & <span className="text-gold">Conditions</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Please read these terms carefully before using our services.
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
                Welcome to Trusted Escort. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Please read these terms carefully. If you do not agree with any part of these terms, you must not use our services.
              </p>
            </motion.div>

            {/* Terms Sections */}
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

            {/* Acceptance */}
            <motion.div variants={itemVariants} className="card-glass p-8 border-2 border-gold/20">
              <h3 className="text-xl font-bold text-gold mb-4">Acknowledgment</h3>
              <p className="text-gray-300 leading-relaxed">
                By using Trusted Escort services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy. You confirm that you meet all eligibility requirements and will use our services responsibly and lawfully.
              </p>
            </motion.div>
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
            <h2 className="text-3xl font-serif font-bold text-white">Questions About Terms?</h2>
            <p className="text-gray-400 text-lg">
              Contact us for clarification on any terms or conditions.
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

export default Terms

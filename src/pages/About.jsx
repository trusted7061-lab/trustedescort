import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

function About() {
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

  const values = [
    {
      title: 'Discretion',
      description: 'Your privacy is sacred. Every detail of your engagement remains absolutely confidential.',
      icon: '🔐',
    },
    {
      title: 'Excellence',
      description: 'We maintain the highest standards of professionalism and quality in every interaction.',
      icon: '⭐',
    },
    {
      title: 'Respect',
      description: 'Mutual respect and consent form the foundation of every relationship we facilitate.',
      icon: '🤝',
    },
    {
      title: 'Luxury',
      description: 'We curate premium experiences tailored to your exact desires and preferences.',
      icon: '👑',
    },
  ]

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>About Trusted Escort | Our Story & Mission</title>
        <meta name="title" content="About Trusted Escort | Our Story & Mission" />
        <meta name="description" content="Learn about Trusted Escort's commitment to discretion, excellence, and unforgettable experiences. Premium escort services with absolute confidentiality." />
        <meta name="keywords" content="about trusted escort, escort agency, premium escort service, luxury companionship, discreet escort service, elite escort agency India" />
        <link rel="canonical" href="https://www.trustedescort.in/about" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.trustedescort.in/about" />
        <meta property="og:title" content="About Trusted Escort | Our Story & Mission" />
        <meta property="og:description" content="Learn about Trusted Escort's commitment to discretion, excellence, and unforgettable experiences." />
        <meta property="og:image" content="https://www.trustedescort.in/og-image.jpg" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Trusted Escort" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.trustedescort.in/about" />
        <meta property="twitter:title" content="About Trusted Escort | Our Story & Mission" />
        <meta property="twitter:description" content="Learn about Trusted Escort's commitment to discretion, excellence, and unforgettable experiences." />
        <meta property="twitter:image" content="https://www.trustedescort.in/og-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="Trusted Escort" />
        
        {/* AboutPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Trusted Escort",
            "url": "https://www.trustedescort.in/about",
            "description": "Learn about Trusted Escort's commitment to discretion, excellence, and unforgettable experiences. Premium escort services with absolute confidentiality.",
            "mainEntity": {
              "@type": "Organization",
              "name": "Trusted Escort",
              "url": "https://www.trustedescort.com",
              "description": "Premium escort service providing sophisticated companionship across major Indian cities.",
              "foundingDate": "2020",
              "slogan": "Exclusive Companionship, Redefined"
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
                "name": "About",
                "item": "https://www.trustedescort.in/about"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Header */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-dark-card to-dark-bg border-b border-gold/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6">
              Our <span className="text-gold">Story</span>
            </h1>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
              Founded on principles of discretion, excellence, and uncompromising quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-dark-bg">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="card-glass h-96 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=800&fit=crop&crop=faces"
                  alt="Our Mission"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-4xl font-serif font-bold text-white">
                Our <span className="text-gold">Mission</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                At Trusted Escort, we believe that every discerning client deserves an experience of utmost sophistication, discretion, and personalized attention. We've built our reputation on a foundation of trust, reliability, and unwavering commitment to excellence.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Since our inception, we've been dedicated to connecting sophisticated individuals with exceptional escorts who share their appreciation for luxury, culture, and refined escortship. We understand that our clients value privacy above all else, and we've implemented rigorous protocols to ensure complete confidentiality.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Every companion in our selection has been carefully chosen for their elegance, intelligence, and ability to deliver truly memorable experiences. We take pride in our curation process and our commitment to quality over quantity.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-dark-card border-t border-gold/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              Our Core Values
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="card-glass p-8"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-gold mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Privacy & Safety Section */}
      <section className="py-20 bg-dark-bg border-t border-gold/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-6 order-2 md:order-1">
              <h2 className="text-4xl font-serif font-bold text-white">
                Your <span className="text-gold">Privacy</span> Matters
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                We employ state-of-the-art encryption and security protocols to protect your personal information. Your data is treated with the utmost confidentiality and is never shared with third parties.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-gold text-2xl">✓</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Encrypted Communications</h4>
                    <p className="text-gray-400">All conversations are secured and private.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-gold text-2xl">✓</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Discrete Billing</h4>
                    <p className="text-gray-400">Your transactions appear with complete privacy.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-gold text-2xl">✓</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Zero Data Logging</h4>
                    <p className="text-gray-400">We don't retain unnecessary information.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              variants={itemVariants}
              className="order-1 md:order-2"
            >
              <div className="card-glass h-96 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=800&fit=crop&crop=faces"
                  alt="Privacy"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-dark-card border-t border-gold/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Curated Experiences</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Every companion in our selection represents the pinnacle of elegance, sophistication, and professionalism. We believe in quality over quantity.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-6xl font-serif font-bold text-gold mb-4">50+</div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">Escorts</h3>
              <p className="text-gray-400">Carefully selected and vetted for excellence.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-6xl font-serif font-bold text-gold mb-4">10K+</div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">Happy Clients</h3>
              <p className="text-gray-400">Trusted by discerning individuals worldwide.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-6xl font-serif font-bold text-gold mb-4">15+</div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">Years</h3>
              <p className="text-gray-400">Of excellence and reliability in service.</p>
            </motion.div>
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
              Experience the <span className="text-gold">Difference</span>
            </h2>
            <p className="text-xl text-gray-300">
              Join our community of satisfied clients who have discovered the meaning of true escortship.
            </p>
            <motion.a
              href="/escorts"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block btn-gold"
            >
              View Our Escorts
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default About

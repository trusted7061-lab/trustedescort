import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

function CoinPurchase() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState('')

  const coinPlans = [
    { coins: 50, price: 500, discount: 0 },
    { coins: 100, price: 900, discount: 10 },
    { coins: 250, price: 2000, discount: 20 },
    { coins: 500, price: 3500, discount: 30 },
    { coins: 1000, price: 6000, discount: 40 }
  ]

  const timeSlotCosts = [
    { slot: 'Morning (6 AM - 12 PM)', coins: 5, color: 'text-yellow-400' },
    { slot: 'Afternoon (12 PM - 6 PM)', coins: 8, color: 'text-orange-400' },
    { slot: 'Night (6 PM - 6 AM)', coins: 10, color: 'text-purple-400' }
  ]

  const handlePlanSelect = async (plan) => {
    setSelectedPlan(plan)
    setIsProcessing(true)
    
    try {
      // Initiate payment
      const response = await fetch('/api/ads/wallet/purchase-coins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coinsAmount: plan.coins,
          paymentMethod: 'gpay'
        })
      })
      
      const data = await response.json()
      
      if (data.success && window.paymentRequest) {
        // Trigger Google Pay
        const paymentData = {
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: data.googlePayPayload.allowedPaymentMethods,
          transactionInfo: data.googlePayPayload.transactionInfo,
          merchantInfo: data.googlePayPayload.merchantInfo,
          callbackIntents: ['PAYMENT_AUTHORIZATION']
        }
        
        const paymentsClient = new google.payments.api.PaymentsClient({
          environment: 'PRODUCTION'
        })
        
        paymentsClient.loadPaymentData(paymentData)
          .then(paymentResult => handlePaymentSuccess(paymentResult, data))
          .catch(err => handlePaymentError(err))
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
      setIsProcessing(false)
    }
  }

  const handlePaymentSuccess = async (paymentResult, transactionData) => {
    try {
      const confirmResponse = await fetch('/api/ads/wallet/confirm-purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: transactionData.transactionId,
          coinsAmount: transactionData.coins,
          paymentStatus: 'success'
        })
      })
      
      const result = await confirmResponse.json()
      if (result.success) {
        setMessage(`✓ Success! ${transactionData.coins} coins added to your account`)
        setSelectedPlan(null)
        // Refresh wallet balance
        window.dispatchEvent(new Event('coinPurchased'))
      } else {
        throw new Error('Payment confirmation failed')
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePaymentError = (error) => {
    setMessage(`Payment failed: ${error.message}`)
    setIsProcessing(false)
  }

  return (
    <>
      <Helmet>
        <title>Buy Coins | Trusted Escort</title>
        <meta name="description" content="Purchase coins to boost your escort ads with premium placement" />
      </Helmet>

      <div className="min-h-screen bg-dark-bg pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-serif font-bold text-gold mb-4">Buy Coins</h1>
            <p className="text-xl text-gray-300">
              Purchase coins to get premium placement for your escort ads
            </p>
          </motion.div>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`max-w-2xl mx-auto mb-8 p-4 rounded-lg ${
                message.includes('✓') 
                  ? 'bg-green-900/30 text-green-300 border border-green-500/50' 
                  : 'bg-red-900/30 text-red-300 border border-red-500/50'
              }`}
            >
              {message}
            </motion.div>
          )}

          {/* Cost Information */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {timeSlotCosts.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-card border border-gold/20 rounded-lg p-6 text-center"
              >
                <h3 className="text-lg font-semibold text-white mb-3">{item.slot}</h3>
                <p className={`text-4xl font-bold ${item.color} mb-2`}>{item.coins}</p>
                <p className="text-gray-400 text-sm">coins required</p>
              </motion.div>
            ))}
          </div>

          {/* Coin Plans */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-gold mb-8 text-center">
              Choose Your Plan
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {coinPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  onClick={() => handlePlanSelect(plan)}
                  className={`cursor-pointer rounded-lg border-2 transition-all p-6 text-center ${
                    selectedPlan === plan
                      ? 'border-gold bg-gold/10'
                      : 'border-gold/20 bg-dark-card hover:border-gold/50'
                  }`}
                >
                  {plan.discount > 0 && (
                    <div className="bg-gold text-dark-bg text-xs font-bold rounded px-2 py-1 mb-3 inline-block">
                      Save {plan.discount}%
                    </div>
                  )}
                  <div className="text-4xl font-bold text-gold mb-2">{plan.coins}</div>
                  <p className="text-gray-300 text-sm mb-3">Coins</p>
                  <div className="text-2xl font-bold text-white mb-4">₹{plan.price}</div>
                  <button
                    onClick={() => handlePlanSelect(plan)}
                    disabled={isProcessing}
                    className={`w-full py-2 rounded font-semibold transition-all ${
                      selectedPlan === plan
                        ? 'bg-gold text-dark-bg'
                        : 'bg-dark-card border border-gold/50 text-gold hover:bg-gold/10'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isProcessing && selectedPlan === plan ? 'Processing...' : 'Select'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-dark-card border border-gold/20 rounded-lg p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-gold mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What are coins used for?</h3>
                <p className="text-gray-300">
                  Coins are used to get premium placement for your escort ads. Premium ads appear above non-premium ads and get more visibility.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Can I use different time slots?</h3>
                <p className="text-gray-300">
                  Yes! You can purchase different coin amounts for different time slots. Morning slots cost 5 coins, afternoon 8 coins, and night (6 PM - 6 AM) costs 10 coins.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What if I don't have enough coins?</h3>
                <p className="text-gray-300">
                  You can still post ads without coins! However, they will appear below premium ads from users who paid coins. Simply post your ad and it will be visible after admin approval.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Are coins refundable?</h3>
                <p className="text-gray-300">
                  If your ad is rejected by admin, your coins will be refunded automatically. Otherwise, coins are non-refundable once used for posting.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">How long does payment take?</h3>
                <p className="text-gray-300">
                  Payment processing is instant through Google Pay. Your coins are added to your account immediately after successful payment.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default CoinPurchase

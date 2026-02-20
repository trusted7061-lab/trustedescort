import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'

function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('users')
  const [data, setData] = useState({
    users: [],
    pendingAds: [],
    coinPurchases: [],
    stats: {}
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedAd, setSelectedAd] = useState(null)
  const [rejectionReason, setRejectionReason] = useState('')

  useEffect(() => {
    if (activeTab === 'users') fetchUsers()
    if (activeTab === 'pending-ads') fetchPendingAds()
    if (activeTab === 'coin-purchases') fetchCoinPurchases()
    if (activeTab === 'stats') fetchStats()
  }, [activeTab])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('https://trustedescort.onrender.com/api/ads/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const resData = await response.json()
      setData(prev => ({ ...prev, users: resData.users || [] }))
    } catch (error) {
      setMessage(`Error fetching users: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchPendingAds = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('https://trustedescort.onrender.com/api/ads/admin/pending-ads', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const resData = await response.json()
      setData(prev => ({ ...prev, pendingAds: resData.ads || [] }))
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCoinPurchases = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('https://trustedescort.onrender.com/api/ads/admin/coin-purchases', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const resData = await response.json()
      setData(prev => ({ ...prev, coinPurchases: resData.wallets || [] }))
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStats = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('https://trustedescort.onrender.com/api/ads/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const resData = await response.json()
      setData(prev => ({ ...prev, stats: resData }))
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApproveAd = async (adId) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`https://trustedescort.onrender.com/api/ads/admin/ads/${adId}/approve`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const result = await response.json()
      if (result.success) {
        setMessage('✓ Ad approved! User will get coins now.')
        fetchPendingAds()
        setSelectedAd(null)
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    }
  }

  const handleRejectAd = async (adId) => {
    if (!rejectionReason.trim()) {
      setMessage('Please provide a rejection reason')
      return
    }
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`https://trustedescort.onrender.com/api/ads/admin/ads/${adId}/reject`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rejectionReason })
      })
      const result = await response.json()
      if (result.success) {
        setMessage('✓ Ad rejected and coins refunded to user!')
        fetchPendingAds()
        setSelectedAd(null)
        setRejectionReason('')
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    }
  }

  return (
    <>
      <Helmet>
        <title>Super Admin Dashboard | Trusted Escort</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-dark-bg pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-serif font-bold text-gold mb-2">Super Admin Dashboard</h1>
            <p className="text-gray-400">Manage ads, coins, and platform operations</p>
          </motion.div>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`max-w-7xl mx-auto mb-6 p-4 rounded-lg ${
                message.includes('✓')
                  ? 'bg-green-900/30 text-green-300 border border-green-500/50'
                  : 'bg-red-900/30 text-red-300 border border-red-500/50'
              }`}
            >
              {message}
            </motion.div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap border-b border-gold/20">
            {['users', 'pending-ads', 'coin-purchases', 'stats'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                  activeTab === tab
                    ? 'border-gold text-gold'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab === 'users' && '👥 Users'}
                {tab === 'pending-ads' && '📋 Pending Ads'}
                {tab === 'coin-purchases' && '💰 Coin Purchases'}
                {tab === 'stats' && '📊 Statistics'}
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <UsersTab
                  users={data.users}
                  isLoading={isLoading}
                  onRefresh={fetchUsers}
                />
              </motion.div>
            )}

            {activeTab === 'pending-ads' && (
              <motion.div
                key="pending-ads"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <PendingAdsTab
                  ads={data.pendingAds}
                  isLoading={isLoading}
                  selectedAd={selectedAd}
                  setSelectedAd={setSelectedAd}
                  rejectionReason={rejectionReason}
                  setRejectionReason={setRejectionReason}
                  onApprove={handleApproveAd}
                  onReject={handleRejectAd}
                  onRefresh={fetchPendingAds}
                />
              </motion.div>
            )}

            {activeTab === 'coin-purchases' && (
              <motion.div
                key="coin-purchases"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <CoinPurchasesTab
                  purchases={data.coinPurchases}
                  isLoading={isLoading}
                  onRefresh={fetchCoinPurchases}
                />
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <StatsTab stats={data.stats} isLoading={isLoading} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal for Ad Details */}
      <AnimatePresence>
        {selectedAd && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-dark-card border border-gold/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gold mb-2">{selectedAd.title}</h2>
                  <p className="text-gray-400 text-sm">
                    Posted by: {selectedAd.userId?.displayName || selectedAd.userId?.email}
                  </p>
                </div>

                <div className="bg-dark-bg p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Description</h3>
                  <p className="text-gray-300">{selectedAd.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-dark-bg p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Category</p>
                    <p className="text-white font-semibold">{selectedAd.category}</p>
                  </div>
                  <div className="bg-dark-bg p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Time Slot</p>
                    <p className="text-white font-semibold capitalize">{selectedAd.timeSlot}</p>
                  </div>
                  <div className="bg-dark-bg p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-semibold">{selectedAd.location}, {selectedAd.city}</p>
                  </div>
                  <div className="bg-dark-bg p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Coins Used</p>
                    <p className={`text-lg font-semibold ${selectedAd.isPremium ? 'text-gold' : 'text-gray-400'}`}>
                      {selectedAd.coinsUsed} coins {selectedAd.isPremium && '(Premium)'}
                    </p>
                  </div>
                </div>

                <div className="bg-dark-bg p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-3">Contact Info</h3>
                  <p className="text-gray-300">📞 {selectedAd.contact?.phone}</p>
                  <p className="text-gray-300">📧 {selectedAd.contact?.email}</p>
                  {selectedAd.contact?.whatsapp && (
                    <p className="text-gray-300">💬 {selectedAd.contact.whatsapp}</p>
                  )}
                </div>

                {selectedAd.adminApprovalStatus === 'pending' && (
                  <div className="space-y-3">
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Enter rejection reason (if rejecting)"
                      className="w-full bg-dark-bg border border-gold/20 rounded-lg px-4 py-3 text-white outline-none resize-none"
                      rows="3"
                    />

                    <div className="flex gap-4">
                      <button
                        onClick={() => handleApproveAd(selectedAd._id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors"
                      >
                        ✓ Approve Ad
                      </button>
                      <button
                        onClick={() => handleRejectAd(selectedAd._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-colors"
                      >
                        ✕ Reject Ad
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setSelectedAd(null)
                    setRejectionReason('')
                  }}
                  className="w-full bg-dark-bg border border-gold/20 text-gold font-bold py-2 rounded-lg hover:border-gold transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

// Pending Ads Tab Component
function PendingAdsTab({ ads, isLoading, selectedAd, setSelectedAd, rejectionReason, setRejectionReason, onApprove, onReject, onRefresh }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Pending Ads ({ads.length})</h2>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-gold text-dark-bg font-semibold rounded-lg hover:bg-gold/90 transition-colors"
        >
          🔄 Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : ads.length === 0 ? (
        <div className="text-center py-12 text-gray-400">✓ No pending ads!</div>
      ) : (
        <div className="space-y-4">
          {ads.map(ad => (
            <motion.div
              key={ad._id}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedAd(ad)}
              className="bg-dark-card border border-gold/20 rounded-lg p-6 cursor-pointer hover:border-gold transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gold">{ad.title}</h3>
                  <p className="text-sm text-gray-400">by {ad.userId?.displayName || ad.userId?.email}</p>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-bold ${
                  ad.isPremium ? 'bg-gold/20 text-gold' : 'bg-gray-700 text-gray-300'
                }`}>
                  {ad.isPremium ? `Premium (${ad.coinsUsed} coins)` : 'Free'}
                </span>
              </div>

              <p className="text-gray-300 mb-4 line-clamp-2">{ad.description}</p>

              <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                <span>📍 {ad.city}</span>
                <span>🕐 {ad.timeSlot}</span>
                <span>📅 {new Date(ad.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-gold/10 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedAd(ad)
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

// Coin Purchases Tab Component
function CoinPurchasesTab({ purchases, isLoading, onRefresh }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Coin Purchase Requests</h2>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-gold text-dark-bg font-semibold rounded-lg hover:bg-gold/90 transition-colors"
        >
          🔄 Refresh
        </button>
      </div>

      {isLoading || purchases.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          {isLoading ? 'Loading...' : 'No pending coin purchases'}
        </div>
      ) : (
        <div className="bg-dark-card border border-gold/20 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-bg border-b border-gold/20">
              <tr>
                <th className="px-6 py-3 text-left text-gold font-semibold">User</th>
                <th className="px-6 py-3 text-left text-gold font-semibold">Coins</th>
                <th className="px-6 py-3 text-left text-gold font-semibold">Amount (₹)</th>
                <th className="px-6 py-3 text-left text-gold font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-gold font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {purchases.map(wallet => (
                <tr key={wallet._id} className="hover:bg-dark-bg/50 transition-colors">
                  <td className="px-6 py-4 text-gray-300">{wallet.userId?.displayName}</td>
                  <td className="px-6 py-4 text-gold font-bold">{wallet.coins}</td>
                  <td className="px-6 py-4 text-white">₹{wallet.coins * 10}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-yellow-900/30 text-yellow-300 text-xs rounded font-semibold">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {new Date(wallet.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// Statistics Tab Component
function StatsTab({ stats, isLoading }) {
  if (isLoading) return <div className="text-center py-12 text-gray-400">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard
          title="Pending Ads"
          value={stats.ads?.pending || 0}
          color="text-yellow-400"
          icon="📋"
        />
        <StatCard
          title="Approved Ads"
          value={stats.ads?.approved || 0}
          color="text-green-400"
          icon="✓"
        />
        <StatCard
          title="Rejected Ads"
          value={stats.ads?.rejected || 0}
          color="text-red-400"
          icon="✕"
        />
        <StatCard
          title="Circulating Coins"
          value={stats.coins?.circulatingCoins || 0}
          color="text-gold"
          icon="💰"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-dark-card border border-gold/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gold mb-4">Coin Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Coins Spent:</span>
              <span className="text-white font-bold">{stats.coins?.totalSpent || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-card border border-gold/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gold mb-4">Recent Ads</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {stats.recentAds?.slice(0, 5).map(ad => (
              <div key={ad._id} className="text-sm text-gray-300 pb-2 border-b border-gold/10">
                <p className="font-semibold text-gold">{ad.title.substring(0, 30)}...</p>
                <p className="text-xs text-gray-500">{new Date(ad.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Users Tab Component
function UsersTab({ users, isLoading, onRefresh }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gold">All Users ({users.length})</h2>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-gold/20 text-gold rounded-lg hover:bg-gold/30 transition"
        >
          🔄 Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-8">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-400 py-8">No users found</div>
      ) : (
        <div className="space-y-4">
          {users.map(user => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-card border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* User Details */}
                <div>
                  <h3 className="text-xl font-bold text-gold mb-3">{user.displayName || user.businessName || 'N/A'}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">📧 Email:</span>
                      <span className="text-white">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">📱 Phone:</span>
                      <span className="text-white">{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">🏢 Business:</span>
                      <span className="text-white">{user.businessName || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">📅 Joined:</span>
                      <span className="text-white">{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <StatCard
                    title="Total Coins"
                    value={user.coins}
                    color="text-gold"
                    icon="💰"
                  />
                  <StatCard
                    title="Total Ads"
                    value={user.adsCount.total}
                    color="text-blue-400"
                    icon="📋"
                  />
                  <StatCard
                    title="Pending Ads"
                    value={user.adsCount.pending}
                    color="text-yellow-400"
                    icon="⏳"
                  />
                  <StatCard
                    title="Approved Ads"
                    value={user.adsCount.approved}
                    color="text-green-400"
                    icon="✓"
                  />
                </div>
              </div>

              {/* Recent Ads */}
              {user.recentAds.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gold/10">
                  <h4 className="text-sm font-bold text-gold mb-3">Recent Ads</h4>
                  <div className="grid gap-2">
                    {user.recentAds.map(ad => (
                      <div
                        key={ad.id}
                        className="flex items-center justify-between p-2 bg-dark-bg rounded text-sm"
                      >
                        <span className="text-gray-300">{ad.title.substring(0, 40)}...</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          ad.status === 'approved'
                            ? 'bg-green-500/20 text-green-400'
                            : ad.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {ad.status.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

// Stat Card Component
function StatCard({ title, value, color, icon }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-dark-card border border-gold/20 rounded-lg p-6"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </motion.div>
  )
}

export default SuperAdminDashboard

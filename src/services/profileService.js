// Profile management service using backend API
import { authAPI } from './apiService'

// Helper: Check if identifier is email or phone
const isEmail = (identifier) => identifier && identifier.includes('@')
const isPhone = (identifier) => identifier && /^[6-9]\d{9}$/.test(identifier.replace(/[\s\-\+]/g, '').replace(/^91/, ''))

// User authentication functions
export const registerUser = async (userData) => {
  try {
    const response = await authAPI.register(userData)
    // Return response with verification method info
    return {
      ...response,
      emailSent: response.emailSent || false,
      smsSent: response.smsSent || false,
      verificationMethod: response.verificationMethod || (userData.email ? 'email' : 'phone'),
      identifier: response.identifier || userData.email || userData.phone
    }
  } catch (error) {
    // Fallback to localStorage for development
    console.warn('Backend registration failed, using localStorage fallback:', error.message)
    
    const users = JSON.parse(localStorage.getItem('localUsers') || '[]')
    const identifier = userData.email || userData.phone
    const existingUser = users.find(u => u.email === userData.email || u.phone === userData.phone)
    if (existingUser) {
      throw new Error('User already exists')
    }
    
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      isVerified: true,
      isEmailVerified: !!userData.email,
      isPhoneVerified: !!userData.phone,
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    localStorage.setItem('localUsers', JSON.stringify(users))
    
    // Auto-login the user
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    localStorage.setItem('authToken', 'local-token-' + newUser.id)
    
    return {
      ...newUser,
      emailSent: !!userData.email,
      smsSent: !!userData.phone,
      verificationMethod: userData.email ? 'email' : 'phone',
      identifier: identifier,
      message: 'User registered successfully (localStorage fallback)'
    }
  }
}

export const loginUser = async (identifier, password) => {
  try {
    const response = await authAPI.login(identifier, password)

    // If login requires verification, return special response
    if (response.requiresVerification) {
      return {
        requiresVerification: true,
        verificationMethod: response.verificationMethod,
        identifier: response.identifier,
        user: response.user,
        verificationSent: response.verificationSent
      }
    }

    // Store auth token
    if (response.token) {
      localStorage.setItem('authToken', response.token)
    }

    // Store user data
    const userData = response.user
    localStorage.setItem('currentUser', JSON.stringify(userData))

    // Dispatch custom event to notify login
    window.dispatchEvent(new CustomEvent('authChanged', {
      detail: { user: userData, isAuthenticated: true }
    }))

    return userData
  } catch (error) {
    // Fallback to localStorage for development
    console.warn('Backend login failed, using localStorage fallback:', error.message)
    
    const users = JSON.parse(localStorage.getItem('localUsers') || '[]')
    const user = users.find(u => u.email === identifier || u.phone === identifier)
    
    if (!user) {
      throw new Error('Invalid credentials')
    }
    
    // Store user data
    localStorage.setItem('currentUser', JSON.stringify(user))
    localStorage.setItem('authToken', 'local-token-' + user.id)
    
    // Dispatch custom event to notify login
    window.dispatchEvent(new CustomEvent('authChanged', {
      detail: { user: user, isAuthenticated: true }
    }))
    
    return user
  }
}

// Google OAuth Sign In/Up
export const googleAuth = async (credential) => {
  try {
    const response = await authAPI.googleAuth(credential)

    // Store auth tokens
    if (response.accessToken) {
      localStorage.setItem('authToken', response.accessToken)
    }
    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken)
    }

    // Store user data
    const userData = response.user
    localStorage.setItem('currentUser', JSON.stringify(userData))

    // Dispatch custom event to notify login
    window.dispatchEvent(new CustomEvent('authChanged', {
      detail: { user: userData, isAuthenticated: true }
    }))

    return userData
  } catch (error) {
    console.error('Google auth error:', error)
    throw error
  }
}

// Login with verification support
export const initiateLoginWithVerification = async (identifier, password) => {
  try {
    const response = await authAPI.login(identifier, password)

    if (response.requiresVerification) {
      return {
        id: response.user.id,
        email: response.user.email,
        phone: response.user.phone,
        businessName: response.user.businessName,
        verificationMethod: response.verificationMethod,
        identifier: response.identifier,
        requiresVerification: true
      }
    }

    // If already verified, complete login
    if (response.token) {
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('currentUser', JSON.stringify(response.user))

      window.dispatchEvent(new CustomEvent('authChanged', {
        detail: { user: response.user, isAuthenticated: true }
      }))

      return response.user
    }

    throw new Error('Unexpected login response')
  } catch (error) {
    throw new Error(error.message || 'Login failed')
  }
}

export const completeLoginWithVerification = async (identifier, code) => {
  try {
    const response = await authAPI.completeLogin(identifier, code)

    // Store auth token
    if (response.token) {
      localStorage.setItem('authToken', response.token)
    }

    // Store user data
    const userData = response.user
    localStorage.setItem('currentUser', JSON.stringify(userData))

    // Dispatch custom event to notify login
    window.dispatchEvent(new CustomEvent('authChanged', {
      detail: { user: userData, isAuthenticated: true }
    }))

    return userData
  } catch (error) {
    throw new Error(error.message || 'Verification failed')
  }
}

export const logoutUser = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('currentUser')

  // Dispatch custom event to notify logout
  window.dispatchEvent(new CustomEvent('authChanged', {
    detail: { user: null, isAuthenticated: false }
  }))
}

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser')
  return userStr ? JSON.parse(userStr) : null
}

export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken')
  const user = getCurrentUser()
  return token && user
}

// Verify code (supports email or phone)
export const verifyCode = async (identifier, code) => {
  try {
    const response = await authAPI.verify(identifier, code)
    return response
  } catch (error) {
    throw new Error(error.message || 'Verification failed')
  }
}

// Legacy: verify email code
export const verifyEmailCode = async (email, code) => {
  return verifyCode(email, code)
}

// Resend verification code (supports email or phone)
export const resendVerificationCode = async (identifier, method) => {
  try {
    const response = await authAPI.resendVerification(identifier, method)
    return response
  } catch (error) {
    throw new Error(error.message || 'Failed to resend code')
  }
}

// Forgot password (supports email or phone)
export const forgotPassword = async (identifier) => {
  try {
    const response = await authAPI.forgotPassword(identifier)
    return response
  } catch (error) {
    throw new Error(error.message || 'Failed to send reset code')
  }
}

// Reset password
export const resetPassword = async (identifier, code, newPassword) => {
  try {
    const response = await authAPI.resetPassword(identifier, code, newPassword)
    return response
  } catch (error) {
    throw new Error(error.message || 'Failed to reset password')
  }
}

// Get user profile from backend
export const getUserProfile = async () => {
  try {
    const response = await authAPI.getProfile()
    return response
  } catch (error) {
    // Fallback to localStorage for development
    console.warn('Backend profile fetch failed, using localStorage fallback:', error.message)
    
    const user = getCurrentUser()
    if (user) {
      return {
        ...user,
        isVerified: true,
        createdAt: user.createdAt || new Date().toISOString()
      }
    }
    
    throw new Error('No user data available')
  }
}

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    // Try to update via backend API
    const response = await authAPI.updateProfile(profileData)
    return response
  } catch (error) {
    // Fallback to localStorage for development
    console.warn('Backend profile update failed, using localStorage fallback:', error.message)
    
    const user = getCurrentUser()
    if (!user) {
      throw new Error('User must be logged in to update profile')
    }
    
    // Update user data in localStorage
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const userIndex = users.findIndex(u => u.id === user.id)
    
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        ...profileData,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
      localStorage.setItem('currentUser', JSON.stringify(users[userIndex]))
    }
    
    return { success: true, message: 'Profile updated successfully' }
  }
}

// Legacy profile management functions (using localStorage)
// TODO: Move these to backend API
const PROFILES_KEY = 'advertiserProfiles'
const USERS_KEY = 'localUsers'

export const createProfile = (profileData) => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('User must be logged in to create a profile')
  }

  const profiles = JSON.parse(localStorage.getItem(PROFILES_KEY) || '[]')

  // Check if user already has a profile
  const existingProfileIndex = profiles.findIndex(p => p.userId === user.id)

  const newProfile = {
    id: existingProfileIndex >= 0 ? profiles[existingProfileIndex].id : Date.now().toString(),
    userId: user.id,
    ...profileData,
    createdAt: existingProfileIndex >= 0 ? profiles[existingProfileIndex].createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    verified: true,
    rating: existingProfileIndex >= 0 ? profiles[existingProfileIndex].rating : 4.5,
    reviews: existingProfileIndex >= 0 ? profiles[existingProfileIndex].reviews : 0,
    responseTime: '< 30 min',
    availability: profileData.availability || 'Available'
  }

  if (existingProfileIndex >= 0) {
    profiles[existingProfileIndex] = newProfile
  } else {
    profiles.push(newProfile)
  }

  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles))

  // Dispatch custom event to notify profile changes
  window.dispatchEvent(new CustomEvent('profilesUpdated', { detail: newProfile }))

  return newProfile
}

export const getProfile = (userId) => {
  const profiles = JSON.parse(localStorage.getItem(PROFILES_KEY) || '[]')
  return profiles.find(p => p.userId === userId)
}

export const getCurrentUserProfile = () => {
  const user = getCurrentUser()
  if (!user) return null
  return getProfile(user.id)
}

export const getAllProfiles = () => {
  return JSON.parse(localStorage.getItem(PROFILES_KEY) || '[]')
}

export const getProfilesByLocation = (location) => {
  const profiles = getAllProfiles()
  if (location === 'all') return profiles
  return profiles.filter(p => p.location === location)
}

export const deleteProfile = (profileId) => {
  const profiles = JSON.parse(localStorage.getItem(PROFILES_KEY) || '[]')
  const updatedProfiles = profiles.filter(p => p.id !== profileId)
  localStorage.setItem(PROFILES_KEY, JSON.stringify(updatedProfiles))
  
  // Dispatch custom event to notify profile changes
  window.dispatchEvent(new CustomEvent('profilesUpdated', { detail: { deleted: profileId } }))
}

export const deleteUserAccount = () => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('No user is currently logged in')
  }
  
  // Delete user's profile
  const profiles = JSON.parse(localStorage.getItem(PROFILES_KEY) || '[]')
  const updatedProfiles = profiles.filter(p => p.userId !== user.id)
  localStorage.setItem(PROFILES_KEY, JSON.stringify(updatedProfiles))
  
  // Dispatch custom event to notify profile changes
  window.dispatchEvent(new CustomEvent('profilesUpdated', { detail: { deletedUser: user.id } }))
  
  // Delete user account
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  const updatedUsers = users.filter(u => u.id !== user.id)
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers))
  
  // Logout user
  logoutUser()
}

// Helper function to convert image file to base64
export const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Search profiles
export const searchProfiles = (filters) => {
  let profiles = getAllProfiles()
  
  if (filters.location && filters.location !== 'all') {
    profiles = profiles.filter(p => p.location === filters.location)
  }
  
  if (filters.minAge) {
    profiles = profiles.filter(p => p.age >= filters.minAge)
  }
  
  if (filters.maxAge) {
    profiles = profiles.filter(p => p.age <= filters.maxAge)
  }
  
  if (filters.services && filters.services.length > 0) {
    profiles = profiles.filter(p => 
      filters.services.some(service => p.services?.includes(service))
    )
  }
  
  return profiles
}

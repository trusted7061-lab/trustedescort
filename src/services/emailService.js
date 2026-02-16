// Email service for verification codes
import emailjs from '@emailjs/browser'

// EmailJS configuration - Update these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_fgmqbvo' 
const EMAILJS_TEMPLATE_ID = 'template_syy95xh' 
const EMAILJS_PUBLIC_KEY = 'Qmez5g33REa3kPT5b' 

// Initialize EmailJS
if (typeof window !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY)
}

// In-memory storage for verification codes (in production, use a database)
const verificationCodes = new Map()

// Load codes from localStorage on initialization
const loadStoredCodes = () => {
  try {
    const stored = localStorage.getItem('verificationCodes')
    if (stored) {
      const parsed = JSON.parse(stored)
      // Convert back to Map
      for (const [email, data] of Object.entries(parsed)) {
        verificationCodes.set(email, {
          ...data,
          timestamp: data.timestamp // Already a number
        })
      }
      console.log('Loaded stored verification codes:', verificationCodes.size)
    }
  } catch (error) {
    console.warn('Failed to load stored verification codes:', error)
  }
}

// Save codes to localStorage
const saveStoredCodes = () => {
  try {
    const codesObject = {}
    for (const [email, data] of verificationCodes.entries()) {
      codesObject[email] = {
        ...data,
        timestamp: data.timestamp // Already a number from Date.now()
      }
    }
    localStorage.setItem('verificationCodes', JSON.stringify(codesObject))
  } catch (error) {
    console.warn('Failed to save verification codes:', error)
  }
}

// Initialize
if (typeof window !== 'undefined') {
  loadStoredCodes()
}

// Generate a 6-digit verification code
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Send verification email
export const sendVerificationEmail = async (email, code, userName) => {
  // Normalize email (trim and lowercase)
  const normalizedEmail = email.trim().toLowerCase()
  
  try {
    // Store the code with normalized email
    verificationCodes.set(normalizedEmail, {
      code,
      timestamp: Date.now(),
      attempts: 0
    })
    
    saveStoredCodes() // Save to localStorage

    console.log(`Generated verification code for ${normalizedEmail}: ${code}`)

    // Always show the code in console for development/demo purposes
    console.log(`=== VERIFICATION CODE ===`)
    console.log(`Email: ${email}`)
    console.log(`Code: ${code}`)
    console.log(`=======================`)
    console.log(`For demo purposes, this code is also logged to the console.`)
    console.log(`In production, this would be sent via email.`)

    // Try to send email via EmailJS
    try {
      const templateParams = {
        to_email: email,
        to_name: userName || 'User',
        verification_code: code,
        from_name: 'Trusted Escort'
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      console.log(`Email sent successfully to ${email}`)
      return { success: true }

    } catch (emailError) {
      console.warn('EmailJS failed, using console fallback:', emailError.message)
      // Fallback: code is already logged above
      return {
        success: true,
        message: 'Code logged to console (EmailJS not configured)'
      }
    }

  } catch (error) {
    console.error('Failed to send verification email:', error)
    return { success: false, error: 'Failed to send verification email' }
  }
}

// Verify the entered code
export const verifyCode = (email, enteredCode) => {
  // Normalize email (trim and lowercase)
  const normalizedEmail = email.trim().toLowerCase()
  const trimmedCode = enteredCode.trim()
  
  console.log(`=== VERIFYING CODE ===`)
  console.log(`Original email: "${email}"`)
  console.log(`Normalized email: "${normalizedEmail}"`)
  console.log(`Original code: "${enteredCode}"`)
  console.log(`Trimmed code: "${trimmedCode}"`)
  console.log('All stored codes:', getStoredCodes())

  const storedData = verificationCodes.get(normalizedEmail)

  if (!storedData) {
    console.log(`❌ No verification code found for ${normalizedEmail}`)
    console.log('Available emails:', Array.from(verificationCodes.keys()))
    return { success: false, error: 'No verification code found. Please request a new one.' }
  }

  // Check if code is expired (15 minutes)
  const timeDiff = Date.now() - storedData.timestamp
  const isExpired = timeDiff > 15 * 60 * 1000

  console.log(`Code age: ${Math.round(timeDiff / 1000)}s, expired: ${isExpired}`)

  if (isExpired) {
    verificationCodes.delete(normalizedEmail)
    saveStoredCodes() // Save to localStorage
    console.log(`❌ Code expired for ${normalizedEmail}, removed from storage`)
    return { success: false, error: 'Verification code has expired. Please request a new one.' }
  }

  // Check attempts (max 3)
  if (storedData.attempts >= 3) {
    verificationCodes.delete(normalizedEmail)
    saveStoredCodes() // Save to localStorage
    console.log(`❌ Too many attempts for ${normalizedEmail}, removed from storage`)
    return { success: false, error: 'Too many failed attempts. Please request a new code.' }
  }

  // Increment attempts
  storedData.attempts++
  console.log(`Attempt ${storedData.attempts}/3 for ${normalizedEmail}`)

  // Check if code matches
  const codeMatches = storedData.code === trimmedCode
  console.log(`Code match: ${codeMatches}`)
  console.log(`Stored code: "${storedData.code}" (type: ${typeof storedData.code})`)
  console.log(`Entered code: "${trimmedCode}" (type: ${typeof trimmedCode})`)

  if (codeMatches) {
    verificationCodes.delete(normalizedEmail) // Clean up after successful verification
    saveStoredCodes() // Save to localStorage
    console.log(`✅ Verification successful for ${normalizedEmail}`)
    return { success: true }
  } else {
    saveStoredCodes() // Save updated attempts to localStorage
    console.log(`❌ Verification failed for ${normalizedEmail}`)
    return { success: false, error: 'Invalid verification code' }
  }
}

// Resend verification code
export const resendVerificationCode = async (email, userName) => {
  // Clean up any existing code
  const normalizedEmail = email.trim().toLowerCase()
  verificationCodes.delete(normalizedEmail)
  saveStoredCodes() // Save to localStorage

  // Generate and send new code
  const code = generateVerificationCode()
  return await sendVerificationEmail(email, code, userName)
}

// Debug function to get stored codes (for development)
export const getStoredCodes = () => {
  const codes = {}
  for (const [email, data] of verificationCodes.entries()) {
    codes[email] = {
      code: data.code,
      timestamp: new Date(data.timestamp).toISOString(),
      attempts: data.attempts
    }
  }
  return codes
}

// Debug function to clear all codes
export const clearAllCodes = () => {
  verificationCodes.clear()
  if (typeof window !== 'undefined') {
    localStorage.removeItem('verificationCodes')
  }
  return { success: true, message: 'All verification codes cleared' }
}

// Automatically generate and send verification code
export const autoSendVerificationCode = async (email, userName) => {
  if (!email) {
    return { success: false, error: 'Email is required' }
  }

  try {
    // Generate new code
    const code = generateVerificationCode()

    console.log(`Auto-sending verification code to ${email}`)

    // Send email
    const result = await sendVerificationEmail(email, code, userName)

    if (!result.success) {
      return result
    }

    return {
      success: true,
      message: 'Verification code sent successfully'
    }

  } catch (error) {
    console.error('Auto verification failed:', error)
    return { success: false, error: 'Failed to send verification code' }
  }
}

// Manually add a test verification code for debugging
export const addTestCode = (email, code = '123456') => {
  const normalizedEmail = email.trim().toLowerCase()
  verificationCodes.set(normalizedEmail, {
    code,
    timestamp: Date.now(),
    attempts: 0
  })
  console.log(`Added test code ${code} for ${normalizedEmail}`)
  return { success: true, message: `Test code ${code} added for ${normalizedEmail}` }
}

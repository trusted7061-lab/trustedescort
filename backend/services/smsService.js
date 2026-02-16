/**
 * SMS Service using MSG91
 * Documentation: https://docs.msg91.com/
 * 
 * Setup Instructions:
 * 1. Create account at https://msg91.com/
 * 2. Get your Auth Key from Dashboard → Auth Key
 * 3. Create a DLT template (required for India)
 * 4. Create an OTP template in MSG91 Dashboard
 * 5. Add credentials to .env file
 */

const axios = require('axios');

// MSG91 Configuration
const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID;
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID || 'TRUESC'; // 6 char sender ID

/**
 * Send OTP via SMS using MSG91
 * @param {string} phone - Phone number (10 digits)
 * @param {string} otp - 6 digit OTP
 * @returns {Promise<{success: boolean, message: string}>}
 */
const sendSMS = async (phone, otp) => {
  // Clean phone number - remove spaces, dashes, +91 prefix
  const cleanPhone = phone.replace(/[\s\-\+]/g, '').replace(/^91/, '');
  
  // Validate phone number
  if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    console.error('Invalid Indian phone number:', cleanPhone);
    return {
      success: false,
      message: 'Invalid phone number format'
    };
  }

  // If MSG91 is not configured, log to console (for development)
  if (!MSG91_AUTH_KEY || MSG91_AUTH_KEY === 'your-msg91-auth-key') {
    console.log('\n=== SMS SIMULATION (MSG91 not configured) ===');
    console.log(`Phone: +91${cleanPhone}`);
    console.log(`OTP: ${otp}`);
    console.log(`Message: Your Trusted Escort verification code is ${otp}. Valid for 10 minutes.`);
    console.log('=============================================\n');
    return {
      success: true,
      message: 'SMS simulated (check console)',
      simulated: true
    };
  }

  try {
    // MSG91 SendOTP API
    const response = await axios.post(
      'https://control.msg91.com/api/v5/otp',
      {
        template_id: MSG91_TEMPLATE_ID,
        mobile: `91${cleanPhone}`,
        authkey: MSG91_AUTH_KEY,
        otp: otp,
        otp_length: 6,
        otp_expiry: 10 // 10 minutes
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.type === 'success') {
      console.log(`SMS sent successfully to +91${cleanPhone}`);
      return {
        success: true,
        message: 'SMS sent successfully'
      };
    } else {
      console.error('MSG91 error:', response.data);
      return {
        success: false,
        message: response.data.message || 'Failed to send SMS'
      };
    }
  } catch (error) {
    console.error('SMS sending failed:', error.response?.data || error.message);
    
    // Fallback to simulation if API fails
    console.log('\n=== SMS FALLBACK (API Error) ===');
    console.log(`Phone: +91${cleanPhone}`);
    console.log(`OTP: ${otp}`);
    console.log('================================\n');
    
    return {
      success: false,
      message: error.response?.data?.message || 'SMS service temporarily unavailable',
      simulated: true
    };
  }
};

/**
 * Verify OTP using MSG91's verification API
 * (Alternative to storing OTP in database)
 * @param {string} phone - Phone number
 * @param {string} otp - OTP to verify
 */
const verifyOTPViaMSG91 = async (phone, otp) => {
  const cleanPhone = phone.replace(/[\s\-\+]/g, '').replace(/^91/, '');
  
  if (!MSG91_AUTH_KEY || MSG91_AUTH_KEY === 'your-msg91-auth-key') {
    // In simulation mode, we verify against database
    return null;
  }

  try {
    const response = await axios.get(
      `https://control.msg91.com/api/v5/otp/verify?mobile=91${cleanPhone}&otp=${otp}`,
      {
        headers: {
          authkey: MSG91_AUTH_KEY
        }
      }
    );

    return response.data.type === 'success';
  } catch (error) {
    console.error('MSG91 OTP verification failed:', error.response?.data || error.message);
    return null; // Fallback to database verification
  }
};

/**
 * Resend OTP using MSG91
 * @param {string} phone - Phone number
 */
const resendOTP = async (phone) => {
  const cleanPhone = phone.replace(/[\s\-\+]/g, '').replace(/^91/, '');
  
  if (!MSG91_AUTH_KEY || MSG91_AUTH_KEY === 'your-msg91-auth-key') {
    console.log(`\n=== SMS RESEND SIMULATION ===`);
    console.log(`Phone: +91${cleanPhone}`);
    console.log(`Action: Resend OTP requested`);
    console.log('==============================\n');
    return { success: true, simulated: true };
  }

  try {
    const response = await axios.get(
      `https://control.msg91.com/api/v5/otp/retry?mobile=91${cleanPhone}&retrytype=text`,
      {
        headers: {
          authkey: MSG91_AUTH_KEY
        }
      }
    );

    return { success: response.data.type === 'success' };
  } catch (error) {
    console.error('MSG91 resend failed:', error.response?.data || error.message);
    return { success: false, message: 'Failed to resend OTP' };
  }
};

module.exports = {
  sendSMS,
  verifyOTPViaMSG91,
  resendOTP
};

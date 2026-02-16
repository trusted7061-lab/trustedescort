# Email Authentication Setup Guide

## Overview
The account registration now includes a 3-step email verification process:

1. **Step 1: Registration Form** - User fills out account details (email, business name, phone, password)
2. **Step 2: Email Verification** - A 6-digit code is sent to the user's email
3. **Step 3: Success** - Account is created after successful verification

## Current Implementation

### Demo Mode (Current)
- Verification codes are generated and stored in localStorage
- Email sending is simulated (code is logged to browser console)
- Verification codes expire after 10 minutes
- Users can resend codes with a 60-second cooldown

### Features
✅ 6-digit verification code generation
✅ Code expiration (10 minutes)
✅ Resend functionality with timer
✅ Real-time validation
✅ Beautiful UI with animations
✅ Error handling

## How to Test

1. Navigate to `/register` page
2. Fill out the registration form
3. Click "Create Account"
4. Open browser console (F12) to see the verification code
5. Enter the 6-digit code in the verification screen
6. Account is created successfully!

## Enabling Real Email Sending

To send actual emails, integrate with **EmailJS** (free tier available):

### Setup Steps

1. **Create EmailJS Account**
   - Visit [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account

2. **Configure Email Service**
   - Add an email service (Gmail, Outlook, etc.)
   - Create an email template with these variables:
     - `{{to_email}}` - Recipient email
     - `{{to_name}}` - User's business name
     - `{{verification_code}}` - The 6-digit code
     - `{{from_name}}` - "Trusted Escort"

3. **Get Your Credentials**
   - Service ID
   - Template ID
   - Public Key

4. **Update Configuration**
   
   Edit `src/services/emailService.js`:
   ```javascript
   const EMAIL_SERVICE_CONFIG = {
     serviceId: 'your_service_id',      // Replace
     templateId: 'your_template_id',    // Replace
     publicKey: 'your_public_key'       // Replace
   }
   ```

5. **Install EmailJS Package**
   ```bash
   npm install @emailjs/browser
   ```

6. **Uncomment EmailJS Code**
   
   In `src/services/emailService.js`, find and uncomment the EmailJS integration section in the `sendVerificationEmail` function.

## Email Template Example

Here's a sample email template for EmailJS:

```html
Hello {{to_name}},

Welcome to Trusted Escort!

Your verification code is: {{verification_code}}

This code will expire in 10 minutes.

If you didn't request this code, please ignore this email.

Best regards,
{{from_name}}
```

## Security Notes

⚠️ **Current Implementation**:
- Verification codes are stored in localStorage (for demo)
- Passwords are not hashed (for demo)

⚠️ **Production Recommendations**:
- Move verification code storage to a secure backend
- Hash passwords using bcrypt or similar
- Use HTTPS for all communications
- Implement rate limiting for verification attempts
- Add reCAPTCHA to prevent automated attacks
- Store user data in a secure database

## Code Structure

```
src/
  services/
    emailService.js       # Email and verification code handling
    profileService.js     # User account management
  pages/
    Register.jsx          # Multi-step registration with email verification
```

## Testing Verification Codes

In demo mode, verification codes are logged to the console. Look for:
```
Sending verification code to user@example.com: 123456
```

Copy this code and paste it into the verification screen.

## Troubleshooting

### Code Not Received
- Check browser console for the generated code (demo mode)
- Verify email service configuration (production)
- Check spam folder (production)

### Code Expired
- Codes expire after 10 minutes
- Click "Resend Code" to generate a new one

### Invalid Code Error
- Ensure you're entering the exact 6-digit code
- Code is case-sensitive
- Don't include spaces

## Future Enhancements

- SMS verification as an alternative
- Backend API for secure code storage
- Email template customization
- Multi-language support
- Password strength meter
- Social login integration

## Support

For issues or questions, check the browser console for errors or verification codes.

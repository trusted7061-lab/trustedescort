# EmailJS Setup Guide - Send Real Verification Emails

## Quick Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (it's FREE - no credit card required)
3. Verify your email address

### Step 2: Add Email Service

1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook**
   - **Yahoo**
   - etc.
4. Follow the connection steps
5. Copy your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

```
Subject: Your Trusted Escort Verification Code

Hello {{to_name}},

Welcome to Trusted Escort!

Your verification code is: {{verification_code}}

This code will expire in 10 minutes.

If you didn't request this code, please ignore this email.

Best regards,
Trusted Escort Team
```

4. Important template variables (must match):
   - `{{to_name}}` - User's business name
   - `{{to_email}}` - Recipient email (auto-filled)
   - `{{verification_code}}` - The 6-digit code
   - `{{from_name}}` - Trusted Escort

5. Click **"Save"** and copy your **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"**
2. Copy your **Public Key** (e.g., `aBc123XyZ`)

### Step 5: Update Configuration

Open `src/services/emailService.js` and update these lines:

```javascript
const EMAIL_SERVICE_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',     // Paste your Service ID here
  templateId: 'YOUR_TEMPLATE_ID',   // Paste your Template ID here
  publicKey: 'YOUR_PUBLIC_KEY'      // Paste your Public Key here
}
```

### Step 6: Test It!

1. Start your dev server: `npm run dev`
2. Go to the registration page
3. Enter a real email address (your email)
4. Click "Create Account"
5. Check your email inbox (and spam folder)
6. You should receive the verification code! 🎉

## Troubleshooting

### Email Not Received?

1. **Check Spam/Junk Folder** - Sometimes verification emails go there
2. **Verify EmailJS Service** - Make sure your email service is connected in EmailJS dashboard
3. **Check Console** - Open browser DevTools (F12) → Console for errors
4. **Template Variables** - Ensure they match exactly: `{{to_name}}`, `{{verification_code}}`, etc.
5. **Free Tier Limit** - EmailJS free tier: 200 emails/month

### Still Not Working?

**Fallback Mode:** If emails fail, the code is automatically logged to the browser console, so you can still test the functionality.

### Common Errors

**"Service not found"**
- Double-check your Service ID

**"Template not found"**
- Double-check your Template ID

**"Invalid public key"**
- Double-check your Public Key

## EmailJS Free Tier

✅ 200 emails per month
✅ All features included
✅ No credit card required
✅ Perfect for testing and small projects

## Alternative: Using Your Own Backend

For production apps with high email volume, consider:
- **SendGrid** - 100 emails/day free
- **AWS SES** - Very cheap, pay-as-you-go
- **NodeMailer** - Run your own SMTP server

## Security Notes

⚠️ The credentials in the code are EmailJS-specific public keys (safe to expose)
⚠️ Never put private API keys in frontend code
✅ EmailJS is designed for frontend use and is secure

## Current Status

The app is now configured to send REAL emails via EmailJS! Just add your credentials and it will work immediately.

## Need Help?

- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/

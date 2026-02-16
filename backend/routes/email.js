const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendVerificationEmail } = require('../services/emailService');

const router = express.Router();

// Send verification email (for testing)
router.post('/send-verification', [
  body('email').isEmail().normalizeEmail(),
  body('userName').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, userName } = req.body;

    // Generate a test code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const result = await sendVerificationEmail(email, code, userName || 'User');

    if (result.success) {
      res.json({
        message: 'Verification email sent successfully',
        code: process.env.NODE_ENV === 'development' ? code : undefined // Only show code in development
      });
    } else {
      res.status(500).json({ error: result.error || 'Failed to send email' });
    }

  } catch (error) {
    console.error('Send verification error:', error);
    res.status(500).json({ error: 'Failed to send verification email' });
  }
});

// Test email service
router.get('/test', async (req, res) => {
  try {
    const testEmail = 'test@example.com';
    const testCode = '123456';
    const testName = 'Test User';

    const result = await sendVerificationEmail(testEmail, testCode, testName);

    res.json({
      message: 'Email service test completed',
      success: result.success,
      error: result.error,
      code: process.env.NODE_ENV === 'development' ? testCode : undefined
    });
  } catch (error) {
    console.error('Email test error:', error);
    res.status(500).json({ error: 'Email service test failed' });
  }
});

module.exports = router;
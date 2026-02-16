const sgMail = require('@sendgrid/mail');

// Only set API key if it exists and is valid
if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.startsWith('SG.')) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const sendEmail = async (to, subject, text) => {
  // If no valid API key, log to console instead
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_API_KEY.startsWith('SG.')) {
    console.log('=== EMAIL SIMULATION (SendGrid not configured) ===');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${text}`);
    console.log('===============================================');
    return;
  }

  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject,
    text
  };
  await sgMail.send(msg);
};

module.exports = sendEmail;
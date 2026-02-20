const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Login credentials - user can have email, phone, or both
  email: { 
    type: String, 
    unique: true, 
    sparse: true, // Allows null/undefined while maintaining uniqueness
    lowercase: true,
    trim: true
  },
  phone: { 
    type: String, 
    unique: true, 
    sparse: true, // Allows null/undefined while maintaining uniqueness
    trim: true
  },
  passwordHash: { type: String }, // Not required for Google OAuth users
  
  // Google OAuth
  googleId: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  authProvider: { 
    type: String, 
    enum: ['local', 'google'], 
    default: 'local' 
  },
  profilePicture: { type: String }, // From Google profile
  
  // Verification status
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false }, // Legacy compatibility
  
  // OTP for verification/reset
  otp: { type: String },
  otpExpires: { type: Date },
  otpType: { type: String, enum: ['email', 'phone', 'reset'], default: 'email' },
  
  // Auth tokens
  refreshToken: { type: String },
  
  // Primary login method preference
  primaryLoginMethod: { type: String, enum: ['email', 'phone'], default: 'email' },
  
  // Profile fields
  businessName: { type: String },
  displayName: { type: String },
  location: { type: String },
  services: [{ type: String }],
  description: { type: String },
  averageRate: { type: String },
  availability: { type: String, enum: ['full-time', 'part-time', 'weekends'], default: 'part-time' },
  photos: [{ type: String }],
  userType: { type: String, enum: ['user', 'advertiser'], default: 'user' },
  
  // Admin role
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  adminCreatedAt: { type: Date }
}, { timestamps: true });

// Pre-save validation: ensure at least one contact method exists (unless Google OAuth)
userSchema.pre('save', function(next) {
  if (this.authProvider === 'google') {
    // Google OAuth users just need email
    if (!this.email) {
      return next(new Error('Email is required for Google OAuth'));
    }
  } else {
    // Local users need email or phone
    if (!this.email && !this.phone) {
      return next(new Error('Either email or phone is required'));
    }
    // Local users must have password
    if (!this.passwordHash) {
      return next(new Error('Password is required for local authentication'));
    }
  }
  next();
});

// Method to check if user is fully verified
userSchema.methods.isFullyVerified = function() {
  if (this.email && !this.isEmailVerified) return false;
  if (this.phone && !this.isPhoneVerified) return false;
  return this.isEmailVerified || this.isPhoneVerified;
};

// Static method to find user by email or phone
userSchema.statics.findByEmailOrPhone = function(identifier) {
  const isEmail = identifier.includes('@');
  if (isEmail) {
    return this.findOne({ email: identifier.toLowerCase() });
  } else {
    // Clean phone number (remove +91, spaces, etc.)
    const cleanPhone = identifier.replace(/[\s\-\+]/g, '').replace(/^91/, '');
    return this.findOne({ phone: cleanPhone });
  }
};

module.exports = mongoose.model('User', userSchema);
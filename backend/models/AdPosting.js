const mongoose = require('mongoose');

const adPostingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  category: {
    type: String,
    enum: ['escort-service', 'companion', 'events', 'other'],
    required: true
  },
  timeSlot: {
    type: String,
    enum: ['morning', 'afternoon', 'night'], // morning: 6AM-12PM, afternoon: 12PM-6PM, night: 6PM-6AM
    required: true
  },
  coinsUsed: {
    type: Number,
    default: 0,
    enum: [0, 5, 8, 10]
  },
  isPremium: {
    type: Boolean,
    default: false // true if user paid coins for premium placement
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'expired', 'inactive'],
    default: 'pending'
  },
  adminApprovalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rejectionReason: String,
  
  location: String,
  city: String,
  state: String,
  
  images: [
    {
      url: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  
  contact: {
    phone: String,
    email: String,
    whatsapp: String
  },
  
  pricing: {
    hourly: Number,
    halfDay: Number,
    fullDay: Number
  },
  
  views: {
    type: Number,
    default: 0
  },
  clicks: {
    type: Number,
    default: 0
  },
  
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  
  boostedUntil: Date, // For premium visibility
  
  metadata: {
    userAgent: String,
    ipAddress: String,
    deviceType: String
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
adPostingSchema.index({ userId: 1, createdAt: -1 });
adPostingSchema.index({ status: 1, isPremium: -1, createdAt: -1 });
adPostingSchema.index({ city: 1, status: 1 });
adPostingSchema.index({ expiresAt: 1 });
adPostingSchema.index({ adminApprovalStatus: 1 });

// Compound index for search
adPostingSchema.index({ title: 'text', description: 'text', location: 'text' });

// Update updatedAt before saving
adPostingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('AdPosting', adPostingSchema);

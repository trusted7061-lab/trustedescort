const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },
  coins: {
    type: Number,
    default: 0,
    min: 0
  },
  totalCoinsEarned: {
    type: Number,
    default: 0
  },
  totalCoinsSpent: {
    type: Number,
    default: 0
  },
  transactions: [
    {
      type: {
        type: String,
        enum: ['purchase', 'spend', 'refund', 'admin-add', 'admin-deduct'],
        required: true
      },
      coins: {
        type: Number,
        required: true
      },
      description: String,
      reference: {
        type: String,
        enum: ['ad-posting', 'coin-purchase', 'manual', null],
        default: null
      },
      referenceId: mongoose.Schema.Types.ObjectId,
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'completed'
      },
      paymentMethod: {
        type: String,
        enum: ['gpay', 'manual', 'system'],
        default: 'system'
      },
      transactionId: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
walletSchema.index({ userId: 1, createdAt: -1 });

// Update updatedAt before saving
walletSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Wallet', walletSchema);

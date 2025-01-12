// backend/models/Movement.js
const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['entrada', 'salida'],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Middleware para poblar automáticamente productId y userId
movementSchema.pre('find', function(next) {
  this.populate([
    {
      path: 'productId',
      select: 'name'
    },
    {
      path: 'userId',
      select: 'username'
    }
  ]);
  next();
});

const Movement = mongoose.model('Movement', movementSchema);

module.exports = Movement;

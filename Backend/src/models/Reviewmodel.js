const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assumes User model exists
  username: String, // Storing simple name for display
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
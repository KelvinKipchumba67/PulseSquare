const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  priceRange: { type: String, enum: ['$', '$$', '$$$'], default: '$' },
  contact: { type: String, required: true },
  avgRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Business', BusinessSchema);
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true,
  },
  title: String,
  location: String,
  university: String,
  rent: Number,
  genderPreference: String,
  availableFrom: String,
  description: String,
  contactEmail: String,
  contactWhatsApp: String,
  amenities: [String],
  roomType: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Listing', listingSchema);

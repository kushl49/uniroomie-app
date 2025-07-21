const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  user: {
    type: Object, // You could later convert this to a reference
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

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
  phone: { type: String },
  university: { type: String },
  bio: { type: String },
  isLookingForAccommodation: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

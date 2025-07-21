const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users - Get all seekers
router.get('/', async (req, res) => {
  try {
    const seekers = await User.find({ isLookingForAccommodation: true });
    res.json(seekers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seekers', error });
  }
});

// POST /api/users - Create or update a user
router.post('/', async (req, res) => {
  const newUser = req.body;

  try {
    let user = await User.findOne({ email: newUser.email });

    if (user) {
      // Update existing user
      user = await User.findOneAndUpdate({ email: newUser.email }, newUser, { new: true });
    } else {
      // Create new user
      user = new User(newUser);
      await user.save();
    }

    res.status(200).json({ message: 'User saved', user });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user', error });
  }
});

module.exports = router;

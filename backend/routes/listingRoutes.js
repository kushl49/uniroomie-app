// backend/routes/listingRoutes.js
const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing'); // ✅ import your model

// GET /api/listings - get all listings from DB
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch listings', error });
  }
});

// POST /api/listings - create a new listing
router.post('/', async (req, res) => {
  try {
    const newListing = new Listing({
      ...req.body,
      createdAt: new Date(),
    });

    const savedListing = await newListing.save();
    res.status(201).json({ message: 'Listing added', listing: savedListing });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create listing', error });
  }
});

module.exports = router;

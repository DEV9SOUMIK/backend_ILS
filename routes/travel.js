const express = require('express');
const router = express.Router();
const Travel = require('../models/travel');

// Create a travel entry
router.post('/', async (req, res) => {
  try {
    const newTravel = new Travel(req.body);
    const savedTravel = await newTravel.save();
    res.status(201).json(savedTravel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all travel entries
router.get('/', async (req, res) => {
  try {
    const travelList = await Travel.find();
    res.json(travelList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific travel entry by ID
router.get('/:id', async (req, res) => {
  try {
    const travel = await Travel.findById(req.params.id);
    if (!travel) return res.status(404).json({ message: 'Travel not found' });
    res.json(travel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a travel entry by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTravel = await Travel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTravel) return res.status(404).json({ message: 'Travel not found' });
    res.json(updatedTravel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a travel entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTravel = await Travel.findByIdAndDelete(req.params.id);
    if (!deletedTravel) return res.status(404).json({ message: 'Travel not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
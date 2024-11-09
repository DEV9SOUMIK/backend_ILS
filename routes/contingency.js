const express = require('express');
const router = express.Router();
const Contingency = require('../models/Contingency');

// Create a contingency entry
router.post('/', async (req, res) => {
  try {
    const newContingency = new Contingency(req.body);
    const savedContingency = await newContingency.save();
    res.status(201).json(savedContingency);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all contingency entries
router.get('/', async (req, res) => {
  try {
    const contingencyList = await Contingency.find();
    res.json(contingencyList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific contingency entry by ID
router.get('/:id', async (req, res) => {
  try {
    const contingency = await Contingency.findById(req.params.id);
    if (!contingency) return res.status(404).json({ message: 'Contingency not found' });
    res.json(contingency);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a contingency entry by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedContingency = await Contingency.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContingency) return res.status(404).json({ message: 'Contingency not found' });
    res.json(updatedContingency);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a contingency entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedContingency = await Contingency.findByIdAndDelete(req.params.id);
    if (!deletedContingency) return res.status(404).json({ message: 'Contingency not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
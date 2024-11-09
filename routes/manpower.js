const express = require('express');
const routes = express.Router();
const Manpower = require('../models/manpower');


// Create a manpower entry
routes.post('/', async (req, res) => {
  try {
    const newManpower = new Manpower(req.body);
    const savedManpower = await newManpower.save();
    res.status(201).json(savedManpower);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all manpower entries
routes.get('/', async (req, res) => {
  try {
    const manpowerList = await Manpower.find();
    res.json(manpowerList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific manpower entry by ID
routes.get('/:id', async (req, res) => {
  try {
    const manpower = await Manpower.findById(req.params.id);
    if (!manpower) return res.status(404).json({ message: 'Manpower not found' });
    res.json(manpower);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a manpower entry by ID
routes.put('/:id', async (req, res) => {
  try {
    const updatedManpower = await Manpower.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedManpower) return res.status(404).json({ message: 'Manpower not found' });
    res.json(updatedManpower);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a manpower entry by ID
routes.delete('/:id', async (req, res) => {
  try {
    const deletedManpower = await Manpower.findByIdAndDelete(req.params.id);
    if (!deletedManpower) return res.status(404).json({ message: 'Manpower not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = routes;
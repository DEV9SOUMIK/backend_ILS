const express = require('express');
const router = express.Router();
const Consumables = require('../models/Consumables');

// Create a consumable entry
router.post('/', async (req, res) => {
  try {
    const newConsumable = new Consumables(req.body);
    const savedConsumable = await newConsumable.save();
    res.status(201).json(savedConsumable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all consumables entries
router.get('/', async (req, res) => {
  try {
    const consumablesList = await Consumables.find();
    res.json(consumablesList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific consumable entry by ID
router.get('/:id', async (req, res) => {
  try {
    const consumable = await Consumables.findById(req.params.id);
    if (!consumable) return res.status(404).json({ message: 'Consumable not found' });
    res.json(consumable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a consumable entry by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedConsumable = await Consumables.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedConsumable) return res.status(404).json({ message: 'Consumable not found' });
    res.json(updatedConsumable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a consumable entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedConsumable = await Consumables.findByIdAndDelete(req.params.id);
    if (!deletedConsumable) return res.status(404).json({ message: 'Consumable not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
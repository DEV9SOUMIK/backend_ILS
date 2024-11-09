const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');

// Create an equipment entry
router.post('/', async (req, res) => {
  try {
    const newEquipment = new Equipment(req.body);
    const savedEquipment = await newEquipment.save();
    res.status(201).json(savedEquipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all equipment entries
router.get('/', async (req, res) => {
  try {
    const equipmentList = await Equipment.find();
    res.json(equipmentList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific equipment entry by ID
router.get('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an equipment entry by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEquipment) return res.status(404).json({ message: 'Equipment not found' });
    res.json(updatedEquipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an equipment entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!deletedEquipment) return res.status(404).json({ message: 'Equipment not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
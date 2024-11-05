const express = require('express');
const router = express.Router();
const Manpower = require('../models/manpower'); // Import the Manpower model

// CREATE a new manpower
router.post('/', async (req, res) => {
  try {
    const newManpower = new Manpower(req.body);
    const savedManpower = await newManpower.save();
    res.status(201).json(savedManpower);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ all manpower
router.get('/', async (req, res) => {
  try {
    const manpower = await Manpower.find();
    res.json(manpower);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const manpower = await Manpower.find();
    manpower = manpower.find((el)=>el.id == req.params.id);
    res.json(manpower);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE an Manpower by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedManpower = await Manpower.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedManpower);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an Manpower by ID
router.delete('/:id', async (req, res) => {
  try {
    await Manpower.findByIdAndDelete(req.params.id);
    res.json({ message: 'Manpower deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

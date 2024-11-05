const express = require('express');
const router = express.Router();
const Project = require('../models/project'); // Import the project model

// CREATE a new Project
router.post('/', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ all Project
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// UPDATE an item by ID
router.put('/:id', async (req, res) => {
    try {
      const updatedProject = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // DELETE an item by ID
  router.delete('/:id', async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.params.id);
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;
  
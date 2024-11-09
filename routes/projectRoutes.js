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

router.get('/:id', async (req, res) => {
  try {
    console.log( 'id', req.params.id);
    // Query the database for a user with the given email
    const project = await Project.findOne({ _id:req.params.id });
    console.log(project, 'project');
    if (project) {
      res.json(project); // Return user data as JSON if found
    } else {
      res.status(404).json({ message: 'project not found' }); // Return 404 if no user is found
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: error.message }); // Return 500 for server errors
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
  
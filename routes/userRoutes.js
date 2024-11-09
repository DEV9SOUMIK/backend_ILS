const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the user model

// CREATE a new User
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ all User
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Route to get a user by email
router.get('/:id', async (req, res) => {
  // const email = req.params.id;
  console.log('Received request for email:', req.params.id);

  try {
    // Query the database for a user with the given email
    const user = await User.findOne({ id:_id });
    if (user) {
      res.json(user); // Return user data as JSON if found
    } else {
      res.status(404).json({ message: 'User not found' }); // Return 404 if no user is found
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: error.message }); // Return 500 for server errors
  }
});




// UPDATE an User by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an User by ID
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
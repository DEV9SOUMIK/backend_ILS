const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing
const cors = require('cors'); // CORS for handling cross-origin requests
const app = express();

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend to access this API
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Include PUT and DELETE for edit and delete APIs
    allowedHeaders: ['Content-Type'], // Specify allowed headers
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Projectin')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Connection error", err));

// Define User Schema and Model
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    Annual_Expenditure_Details: {
        type: String,
        required: true,
    },
    Project_No: {
        type: Number,
        required: true,
    }
});

const UserModel = mongoose.model("users", UserSchema);

// Register route
app.post('/register', async (req, res) => {
    const { email, password, Annual_Expenditure_Details, Project_No } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new UserModel({ 
            email, 
            password: hashedPassword,
            Annual_Expenditure_Details, 
            Project_No 
        });
        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all users route
app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Edit (Update) a user by ID
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { email, password, Annual_Expenditure_Details, Project_No } = req.body;
    
    try {
        // If a password is provided, hash it before updating
        let updateData = { email, Annual_Expenditure_Details, Project_No };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        
        const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 5012");
});


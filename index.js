const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS package


const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
  })); // Enable CORS for all routes

// Other middleware
app.use(express.json());

// Your routes
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
//app.use('/api/manpower', require('./routes/manpowerRoutes'));

app.use('/api/manpower', require('./routes/manpower'));
app.use('/api/travel', require('./routes/travel'));
app.use('/api/equipment', require('./routes/equipment'));
app.use('/api/contingency', require('./routes/contingency'));
app.use('/api/consumables', require('./routes/consumables'));



// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB:', error));
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

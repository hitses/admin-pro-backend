require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

const PORT = process.env.PORT;

// Create server
const app = express();

// CORS
app.use(cors());

// Parser
app.use(express.json());

// Database connection
dbConnection();

// Public directory
app.use(express.static('public'));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/search', require('./routes/searches'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

// Initialize server
app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`.green);
});
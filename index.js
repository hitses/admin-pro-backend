require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

const PORT = process.env.PORT;

// Create server
const app = express();

// CORS
app.use(cors());

// Database connection
dbConnection();

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Hola mundo'
  });
});

// MongoJero
// jero15nimo

// Initialize server
app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
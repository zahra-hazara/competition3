//require('dotenv').config(); // To manage environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const connectDB = require("./config/db");

// Import routes
const userRoutes = require('./routes/userRouter');
const goalRoutes = require('./routes/goalRouter');
const { authMiddleware } = require('./middleware/authMiddleware'); // Authentication middleware

// Express app
const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes); // User routes
app.use('/goals', authMiddleware, goalRoutes); // Goal routes, protected by authMiddleware

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);

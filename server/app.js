const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postsRoute = require('./routes/postRoutes');
const friendsRoute = require('./routes/friendRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Set the JSON payload limit
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // URL-encoded payload limit

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoute);
app.use('/api/friends', friendsRoute);

module.exports = app;

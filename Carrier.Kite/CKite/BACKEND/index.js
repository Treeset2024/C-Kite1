// app.js or server.js
const express = require('express');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const routes = require('./Routes/index');
const compression = require('compression');
const cors = require('cors'); // Import cors
//const questionRoutes = require('../Routes/questionsroutes');
const userRoutes = require('./Routes/expressroutes');
const YouTubeLinkRoutes = require('./Routes/YouTuberoutes');
const GroupDiscussionRoutes = require('./Routes/gdroute');
const Results=require('./Routes/resultsroutes');
const Registration=require('./Routes/registerroutes');

const app = express();

// Enable CORS for a specific origin (your frontend URL)
app.use(cors({
  origin: 'http://localhost:8081',  // Replace with the frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
  credentials: true,  // Allow credentials (cookies, etc.)
}));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
//app.use('/api/v1', questionRoutes);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ckite:ckite@ckite.6gtnt.mongodb.net/';

mongoose.plugin(mongoosePaginate);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1', routes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', YouTubeLinkRoutes);
app.use('/api/v1', GroupDiscussionRoutes);
app.use('/api/v1',Registration);
app.use('/api/v1',Results);



app.use(express.json({ limit: '500mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ extended: true, limit: '500mb' })); // Adjust the limit as needed

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
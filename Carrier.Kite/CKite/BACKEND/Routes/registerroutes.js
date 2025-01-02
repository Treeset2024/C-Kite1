const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser,
} = require('../Controller/authcontroller'); // Import controller functions

const router = express.Router();

// Routes
router.post('/register', createUser); // Register a new user
router.get('/registeruser', getUsers); // Get all users with pagination
//router.get('/users/:id', getUserById); // Get a single user by ID
router.put('/users/:id', updateUser); // Update a user by ID
router.delete('/users/:id', deleteUser); // Delete a user by ID

module.exports = router;
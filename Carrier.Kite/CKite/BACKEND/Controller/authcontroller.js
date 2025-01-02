/*const Registration = require('../model/Registration');

const registerUser = async (req, res) => {
  const { name, email, college } = req.body;

  try {
    const user = new User({ name, email, college });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
};

const loginUser = async (req, res) => {
  // Firebase handles authentication; this endpoint could verify user existence in DB
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User logged in successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error });
  }
};

module.exports = {  registerUser, loginUser };*/
const Registration = require('../model/Registration'); // Import the model

// Create a new user
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, instituteName, stream, password, enterPassword } = req.body;

    // Validate passwords
    if (password !== enterPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Create and save the user
    const newUser = await Registration.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      instituteName,
      stream,
      password,
      enterPassword,
    });

    res.status(201).json({ message: 'User registered successfully', data: newUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email or Phone Number already exists' });
    }
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Get all users with pagination
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination parameters

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 }, // Sort by creation date (newest first)
    };

    const users = await Registration.paginate({}, options);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Registration.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Validate passwords if updated
    if (updatedData.password && updatedData.enterPassword && updatedData.password !== updatedData.enterPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const updatedUser = await Registration.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await Registration.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Export all functions
module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

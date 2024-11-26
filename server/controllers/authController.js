// server/controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password, displayName, profilePicture } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }
    const user = await User.create({ username, password, displayName, profilePic: profilePicture });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed', details: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username, displayName: user.displayName, profilePicture: user.profilePic  } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

exports.getUserByDisplayName = async (req, res) => {
  const { displayName } = req.params;
  console.log("Received displayName:", displayName); // Log to confirm displayName received

  try {
    const user = await User.findOne({ displayName }); // Find user by displayName
    if (!user) {
      console.log("User not found"); // Additional log if user isn't found
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("User found, sending profile picture"); // Log if user is found
    res.status(200).json({ profilePicture: user.profilePic, id: user._id });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: 'Error fetching user data', error });
  }
};



const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Registration route
router.post('/register', async (req, res) => {
  const { username, password, email, phoneNumber, preferredName, role } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    console.log("Register", password);  // Log plain text password for registration

    user = new User({
      username,
      password,  // Storing plain text password (not recommended)
      email,
      phoneNumber,
      preferredName,
      role,
    });

    await user.save();
    res.status(201).json({ msg: 'User registered' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid User credentials' });
    }

    console.log("Login", user.password);  // Log stored plain text password

    if (user.password !== password) {
      return res.status(400).json({ msg: 'Invalid Password credentials' });
    }

    res.json({ msg: 'Login successful', role: user.role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//secret key for jwt
const secret = process.env.JWT_SECRET || 'this is my secret';


//ultilty function to generate jwt
const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_secret, { expiresIn: '1h' });
};

//registration controller
const register = async (req, res) => {
    try {
        const { username, email, password, date_of_birth, phone_number } = req.body;
        
     // Basic validation
    if (!(username && email && password && date_of_birth && phone_number)) {
          return res.status(400).json({ message: 'All fields are required' });
     }
    
    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
     if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    
    // Hash password
     const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      date_of_birth,
      phone_number
    });

//generate jwt
const token = generateToken(user._id);

res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: token
  });
 } catch (error) {
    res.status(500).json({message:error.message});
  }
};

// get user data
const getUserData = async (req, res) => {
  try {
    const { _id, username, email } = req.user;
    res.status(200).json({ _id, username, email });
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

// login controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!(email && password)) {
          return res.status(400).json({ message: 'All fields are required' });
        }
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
        //generate jwt
        const token = generateToken(user._id);
        res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: token
        });
      } catch (error) {
        res.status(500).json({message:error.message});
      }
};

module.exports = { register, login, getUserData };
const asyncHandler = require('express-async-handler')
const User = require('../modules/userModules'); // Adjust the path as needed

const bcrypt = require('bcrypt');

const register = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if a user with the same username or email already exists
  
 

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
    // Generate a salt and hash the password synchronously
    const saltRounds = 10; // Adjust this according to security requirements
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Something went wrong');
  }
});

const login = asyncHandler(async (req, res) => {
  
  });
  
const logout = asyncHandler(async (req, res) => {
   
  });
  
  module.exports = { register,login,logout };
  
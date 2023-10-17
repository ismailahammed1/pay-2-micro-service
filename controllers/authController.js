const asyncHandler = require('express-async-handler');
const User = require('../modules/userModules');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('../utils/createError');
require('dotenv').config();
// ... (rest of your code remains the same)



const register = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if a user with the same username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ error: 'User with the same username or email already exists' });
    }

    // Generate a salt and hash the password synchronously
    const saltRounds = 10; // Adjust this according to your security requirements
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      // Include other fields here
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).send('An error occurred during user registration.');
  }
});

const login = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log('User found:', user);
    if (!user) return next(createError(404, "User not found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(401, "Incorrect password"));


    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.SERECT_KEY 
    );
    

    const { password, ...info } = user._doc;
    res.cookie("accessToken", token, {
      httpOnly: true,
    }).status(200).send(info);
  } catch (error) {

    console.error("Error in login:", error);
    res.status(500).send('An error occurred during login. ' + error.message);
  }
});


  
const logout = asyncHandler(async (req, res) => {
   
  });
  
  module.exports = { register,login,logout };
  
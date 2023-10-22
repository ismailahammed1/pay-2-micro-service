const asyncHandler = require('express-async-handler');
const User = require('../modules/userModules');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('../utils/createError');
require('dotenv').config();
// ... (rest of your code remains the same)

const register = asyncHandler(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return next(createError(400, 'Username is already in use.'));
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
    console.log(newUser);
    res.status(201).send('User has been created.');
  } catch (err) {
    next(err); // Pass the error to the next middleware
  }
});

const login = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(401, "Incorrect password"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.SERECT_KEY,
      {
        expiresIn: 864000, // Set the token to expire in 1 hour
      }
    );
    const { password,...info } = user._doc;
    res.cookie("accessToken", token, {
      httpOnly: true,
    }).status(200).send(info);
  } catch (err) {
    next(err); // Pass the error to the next middleware
  }
});


  
const logout = asyncHandler(async (req, res) => {
   
  });
  
  module.exports = { register,login,logout };
  
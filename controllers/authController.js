const asyncHandler = require('express-async-handler')
const User = require('../modules/userModules'); // Adjust the path as needed

const bcrypt = require('bcrypt');

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

    res.status(500).send('Something went wrong');
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const user=await User.findOne({username:req.body.username});
    if (!user) return res.status(404).send("user not fund!")
    const isCorrect=bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return res.status(401).send("wrong password or username");
    const {password, ...info}=user._doc;
    res.status(200).send(info)
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
  });
  
const logout = asyncHandler(async (req, res) => {
   
  });
  
  module.exports = { register,login,logout };
  
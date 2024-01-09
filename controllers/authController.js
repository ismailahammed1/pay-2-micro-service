const asyncHandler = require("express-async-handler");
const User = require("../modules/userModules");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
require("dotenv").config();

const register = asyncHandler(async (req, res, next) => {
  try {
    const { username, email, password, isSeller,img } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return next(createError(400, "Username is already in use."));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isSeller,
      img,
    });

    await newUser.save();
    res.status(201).json({ message: "User has been created.", user: newUser });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(createError(400, err.message)); // Handle validation error
    }
    next(createError(500, "Internal Server Error"));
  }
});

const login = asyncHandler(async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const passwordMatch = bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return next(createError(401, 'Invalid username or password'));
    }

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" } // Adjust token expiry time based on your requirements
    );

    const { ...userInfo } = user._doc;

    res.cookie("accessToken", token, { httpOnly: true, secure: true }).status(200).send(userInfo)
  } catch (err) {
    console.error('Error during login:', err);
    next(createError(500, 'Internal Server Error'));
  }
});


const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out");
});

module.exports = { register, login, logout };

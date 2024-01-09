const express = require('express');
const asyncHandler = require('express-async-handler');
const { register,login,logout } = require('../controllers/authController');


const router = express.Router();

// Define a route that uses the createUser function

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);


module.exports = router;

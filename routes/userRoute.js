const express = require('express');
const { deleteUser, getUser } = require('../controllers/userController'); // Adjust the 
const {verifyToken} = require('../middlewares/jwt');

const router = express.Router();

// Define a route for deleting a user by ID
router.delete('/:id',verifyToken, deleteUser);
router.get('/:id', getUser);

module.exports = router;

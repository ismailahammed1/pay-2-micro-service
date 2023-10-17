const express = require('express');
const { deleteUser } = require('../controllers/userController'); // Adjust the path as needed

const router = express.Router();

// Define a route for deleting a user by ID
router.delete('/:id', deleteUser);

module.exports = router;

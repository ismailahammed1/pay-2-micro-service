const express = require('express');
const {createGig, deleteGig, getGig, getGigs}=require("../controllers/gigController")

const {verifyToken} = require('../middlewares/jwt');

const router = express.Router();

// Define a route for deleting a user by ID
router.post('/',verifyToken, createGig);
router.delete('/:id',verifyToken, deleteGig);
router.get('/single/:id', getGig);
router.get('/', getGigs);

module.exports = router;
const express = require('express');
const {verifyToken} = require('../middlewares/jwt');
const { intent, getOrder, confirm } = require('../controllers/orderController');

const router = express.Router();

// Define a route for deleting a user by ID
// router.post('/:gigId',verifyToken,createOrder );
router.post("/create-payment-intent/:id",verifyToken,intent );
router.put("/",verifyToken,confirm );

router.get('/',verifyToken,getOrder );

module.exports = router;
const express = require('express');
const {verifyToken} = require('../middlewares/jwt');
const { createReview, getReviews, deleteReview } = require('../controllers/reviewController');


const router = express.Router();

router.post("/", verifyToken, createReview )
router.get("/:gigId", getReviews )
router.delete("/:id", deleteReview)


module.exports = router;
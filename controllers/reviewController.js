const asyncHandler = require('express-async-handler')
const createError = require('../utils/createError');
const Review = require("../modules/reviewModules");
const Gig = require("../modules/gigModle");

const createReview = asyncHandler(async (req, res, next) => {
  try {
    // Check if the user is a seller
    if (req.isSeller) {
      return res.status(403).json({ error: "Sellers can't create a review!" });
    }

    const newReview = new Review({
      userId: req.userId,
      gigId: req.body.gigId, // Assuming gigId is part of the request body
      desc: req.body.desc, // Assuming desc is part of the request body
      star: req.body.star, // Assuming star is part of the request body
    });

    // Check if the user has already created a review for this gig
    const existingReview = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (existingReview) {
      return res.status(403).json({ error: "You have already created a review for this gig!" });
    }

    // Save the new review
    const savedReview = await newReview.save();
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
});

const getReviews = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.params.gigId); // Log the gigId to check if it's being retrieved correctly
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
});



const deleteReview = asyncHandler(async (req, res, next) => {
  try {
    // Your deleteReviews logic here
  } catch (err) {
    next(err);
  }
});

module.exports = { createReview, getReviews, deleteReview };

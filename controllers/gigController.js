const createError = require("../utils/createError")
const Gig=require("../modules/gigModle")
const asyncHandler = require('express-async-handler');

const createGig = asyncHandler(async (req, res, next) => {
    if (!req.isSeller) {
      return next(createError(403, "Only sellers can create gigs!"));
    }
    const newGig = new Gig({
      userId: req.userId,
      ...req.body,
    });
  
    try {
      const savedGig = await newGig.save();
      res.status(201).json(savedGig);
    } catch (err) {
      next(err);
    }
  });
  
const deleteGig=asyncHandler(async (req, res, next) =>{
    try {
        const gig=await Gig.findById(req.params.id);
        if(gig.userId!==req.userId)
        return next(createError(403, "You can Delete only gig!"))
        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).send("gig has been delete")
    } catch (err) {
        next(err)
    }
})


const getGig = asyncHandler(async (req, res, next) => {
    try {
      const gig = await Gig.findById(req.params.id);
  
      if (!gig) {
        return next(createError(404, "Gig not found!"));
      }
  
      res.status(200).send(gig);
    } catch (err) {
      next(err);
    }
  });
  
  const getGigs = asyncHandler(async (req, res, next) => {
    const q = req.query;
    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.cat && { cat: q.cat }),
        ...(q.min || q.max ? {
            price: {
                ...(q.min && { $gt: parseInt(q.min) }), // Convert to integer
                ...(q.max && { $lt: parseInt(q.max) }), // Convert to integer
            },
        } : {}),
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };

    try {
        const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
        res.status(200).send(gigs);
    } catch (err) {
        next(err);
    }
});

module.exports = { createGig,deleteGig,getGig,getGigs};
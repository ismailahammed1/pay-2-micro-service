const createError = require("../utils/createError")
const Conversations = require("../modules/conversationModel")
const asyncHandler = require('express-async-handler');

const createconversation = asyncHandler(async (req, res, next) => {
    const newConversation = new Conversations({
        id:req.isSeller?req.userId+req.body.to:req.body.to+req.userId,
        sellerId: req.isSeller ? req.userId : req.body.to,
        buyerId: req.isSeller ? req.body.to : req.userId,
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller,
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(201).json(savedConversation);
    } catch (err) {
        next(err);
    }
});


const updateConversation = asyncHandler(async (req, res, next) => {
    try {
        const updatedConversation = await Conversations.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
                },
            },
            { new: true }
        );
        if (!updatedConversation) {
            return next(createError(404, "Conversation not found!"));
        }
        res.status(200).send(updatedConversation);
    } catch (err) {
        next(err);
    }
});

const getSingleConversation = asyncHandler(async (req, res, next) => {
    try {
        const conversation = await Conversations.findOne({ id: req.params.id });
        if (!conversation) {
            return next(createError(404, "not found!"));
        }
        res.status(200).send(conversation);
    } catch (err) {
        next(err);
    }
});

const getConversations = asyncHandler(async (req, res, next) => {

        try {
          const conversations = await Conversations.find(
            req.isSeller?{sellerId:req.userId}:{buyerId:req.userId}
          ).sort({updateAt:-1});
          res.status(200).send(conversations);
        } catch (err) {
          next(err);
        }
      });
      
  

module.exports = { getConversations, createconversation, getSingleConversation, updateConversation };

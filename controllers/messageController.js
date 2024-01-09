const asyncHandler = require("express-async-handler");
const Message = require("../modules/messageModel");
const Conversation = require("../modules/conversationModel");

const createMessage = asyncHandler(async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.body.userId,
    desc: req.body.desc,
  });
  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      {
        id: req.body.conversationId,
      },
      {
        $set: {
          readByBuyer: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMassage: req.body.desc,
        },
      },
      { new: true }
    );
    res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
});

const getMessage = asyncHandler(async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    });
    res.status(200).send(messages)
  } catch (err) {
    next(err);
  }
});

module.exports={createMessage,getMessage}
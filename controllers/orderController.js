const asyncHandler = require("express-async-handler");
const createError = require("../utils/createError");
const Gig = require("../modules/gigModle");
const Order = require("../modules/orderModules");
const Stripe = require("stripe");

const intent = asyncHandler(async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);
  const gig = await Gig.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price*100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();
  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// const createOrder = asyncHandler(async (req, res, next) => {
//   try {
//     const gig = await Gig.findById(req.params.gigId); // Add 'await' here

   
//   } catch (err) {
//     next(err);
//   }
// });

const getOrder = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });
    res.header("Cache-Control", "no-cache");
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
});
const confirm = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
        {
            payment_intent: req.body.payment_intent,
        },
        {
            $set: {
                isCompleted: true,
            },
        }
    );
    res.status(200).send("order has been confirmed");
  } catch (err) {
    next(err);
  }
});

module.exports = { intent, getOrder, confirm };


const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv').config();
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const gigRoute = require('./routes/gigRoute');
const reviewRoute = require('./routes/reviewRoute');
const orderRoute = require('./routes/orderRoute');
const conversationRoute = require('./routes/conversationRoute');
const messageRoute = require('./routes/messageRoute');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');

const app = express();
mongoose.set("strictQuery",true);
// Connect to the MongoDB database using the dbConnect function
dbConnect();

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));


app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
// Use the userRouter for routes under the '/api/user' path
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/gigs', gigRoute);
app.use('/api/gig/reviews', reviewRoute);
app.use('/api/orders', orderRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  console.log("Backend server is running on port 8800");
});

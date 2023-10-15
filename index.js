const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const authRoute = require('./routes/authRoute');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// Use the userRouter for routes under the '/api/user' path
app.use('/api/auth', authRoute);

// Connect to the MongoDB database using the dbConnect function
dbConnect();

app.listen(8800, () => {
  console.log("Backend server is running on port 8800");
});

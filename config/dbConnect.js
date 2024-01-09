const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        if (mongoose.connection.readyState !== 1) {
            console.log('Database connection is not open');
        } else {
            console.log('Database Connected Successfully');
        }
    } catch (error) {
        console.log('Database error: ', error);
    }
};

module.exports = dbConnect;

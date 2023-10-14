const express=require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require('dotenv').config();
const app = express();

dbConnect();
app.listen(8800, ()=>{
    console.log("backend server is running");
})
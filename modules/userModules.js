
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 username:{
    type:String,
    require:true,
    unique:true,
 },
 email:{
    type:String,
    require:true,
    unique:true,
 },
 password:{
    type:String,
    require:true,
 },
 img:{
    type:String,
    require:false,
 },
 contury:{
    type:String,
    require:true,
 },
 phone:{
    type:String,
    require:false,
 },
 desc:{
    type:String,
    require:true,
 },
 isSeller:{
    type:Boolean,
    default:false,
 },
},
{
    timestamps:true
}
);
const User = mongoose.model('User', userSchema);

module.exports = User;
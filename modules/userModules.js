
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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


// Hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
     return next();
   }
 
   const saltRounds = 10;
   this.password = await bcrypt.hash(this.password, saltRounds);
   next();
 });
 
 // Define a method to compare a plain text password with the hashed password
 userSchema.methods.comparePassword = async function (candidatePassword) {
   return bcrypt.compare(candidatePassword, this.password);
 };
 






const User = mongoose.model('User', userSchema);

module.exports = User;
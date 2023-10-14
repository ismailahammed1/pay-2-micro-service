import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
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
 isSaller:{
    type:Boolean,
    require:true,
 },
},
{
    timestamps:true
}
);
const User = mongoose.model('User', UserSchema);
const mongoose =require ('mongoose');
const { Schema } = mongoose;

const ConversationSchema = new Schema({
 id:{
    type:String,
    require:true,
    unique:true,
 },
 sallerId:{
    type:String,
    require:true,
    unique:true,
 },
 buyerId:{
    type:String,
    require:true,
 },
 readBySaller:{
   type:Boolean,
    require:true,
 },
 readByBuyer:{
    type:Boolean,
    require:true,
 },
 lastMassage:{
    type:String,
    require:false,
 },
},
{
    timestamps:true
}
);
const Conversation = mongoose.model('Conversation', ConversationSchema);
module.exports = Conversation;
import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new Schema({
   gigId:{
      type:String,
      require:true,
   },
   img:{
      type:String,
      require:false,
   },
   title:{
      type:String,
      require:true,
   },
   price:{
      type:Number,
      require:true,
   },
   sallerId:{
      type:String,
      require:true,
   },
   buyerId:{
      type:String,
      require:true,
   },
   isCompleted:{
      type:Boolean,
      default:false,
   },
   payment_intent:{
      type:String,
      require:true,
   },
},
{
    timestamps:true
}
);
const Order = mongoose.model('Order', OrderSchema);
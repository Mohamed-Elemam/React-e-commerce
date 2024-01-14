import  { Schema, SchemaTypes, model } from "mongoose";

const reviewSchema = new Schema({
  review:String,
  productId:{
    type:SchemaTypes.ObjectId,
    ref:'product'
  },
  userId:{
    type:SchemaTypes.ObjectId,
    ref:'user'
  },
  rating:{
    type:Number,
    min:1,
    max:5
  }
},
{ timestamps: true}
);


export const reviewModel = model('review',reviewSchema)
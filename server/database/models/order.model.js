import mongoose, { Types } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "user",
    },
    cartItems: [
      {
        productId: { type: Types.ObjectId  , ref:"product"},
        quantity:Number,
        price: Number,
      },
    ],
    totalOrderPrice: Number,
    shippingAddress :{
      street:String,
      city:String,
      phone:String
    },
    paymentMethod:{
      type:String,
      enum:['card','cash'],
      default:'cash'
    },
    isPaid:{
      type:Boolean,
      default:false
    },
    paidAt:Date,
    isDelivered:{
      type:Boolean,
      default:false
    },
    deliveredAt:Date,

  },
  { timestamps: true }
);

export const orderModel = mongoose.model("order", orderSchema);

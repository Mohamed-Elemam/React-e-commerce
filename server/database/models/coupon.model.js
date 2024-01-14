import mongoose, { Schema } from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  
    discount: {
      type: String,
      required:true
    },
    expiresAt: {
      type: Date,
      required:true
    },
 
  },
  { timestamps: true}

);

export const couponModel = mongoose.model("coupon", couponSchema);
import mongoose, { Types } from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "user",
    },
    cartItems: [
      {
        productId: { type: Types.ObjectId, ref: "product" },
        quantity: { type: Number, default: 1, min: 1 },
        price: Number,
      },
    ],
    totalprice: Number,
    totalpriceAfterDiscount: Number,
    discount: { type: Number },
  },
  { timestamps: true }
);

export const cartModel = mongoose.model("cart", cartSchema);

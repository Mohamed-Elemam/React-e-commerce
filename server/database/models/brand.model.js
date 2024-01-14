import mongoose, { Schema } from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    logo: {
      type: String,
      // required:true
    },
    subCategoryId:{
      type:Schema.Types.ObjectId,
      ref:'subCategory'
    }, 
    categoryId:{
      type:Schema.Types.ObjectId,
      ref:'category'
    }, 
  },
  { timestamps: true, 
    // toObject: { virtuals: true }, toJSON: { virtuals: true }
   }

);

export const brandModel = mongoose.model("brand", brandSchema);

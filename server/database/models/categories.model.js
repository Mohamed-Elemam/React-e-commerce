import { Schema, model } from "mongoose";

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // minlength: [2, "too short name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
      // required:true
    },
    createdBy: {
      // type:SchemaTypes.ObjectId,
      // ref:'user'
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

categoriesSchema.virtual("subCategory", {
  ref: "subCategory",
  foreignField: "categoryId",
  localField: "_id",
});

export const categoriesModel = model("category", categoriesSchema);

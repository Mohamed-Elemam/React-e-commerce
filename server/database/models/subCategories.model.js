import  { Schema, SchemaTypes, model } from "mongoose";

const subCategoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim:true,
    minlength:[2,'too short name']
  },
  slug: {
    type: String,
    lowercase:true,
  },
  categoryId:{
    type:SchemaTypes.ObjectId,
    ref:'category'
  },
},
{ timestamps: true,toObject:{virtuals:true},toJSON:{virtuals:true}}
);


export const subCategoriesModel = model('subCategory',subCategoriesSchema)
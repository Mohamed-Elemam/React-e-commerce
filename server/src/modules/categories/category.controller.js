import slugify from "slugify";
import { categoriesModel } from "../../../database/models/categories.model.js";
import { getOne } from "../../hooks/getOne.js";
import { deleteOne } from "../../hooks/deleteOne.js";

//*------------
//*1--add category
//*------------
const addCategory = async (req, res, next) => {
  const { name } = req.body;

  const isExist = await categoriesModel.findOne({ name });

  isExist && res.status(400).json({ message: "category already exist" });
  const newCategory = new categoriesModel({ name, slug: slugify(name) });
  await newCategory.save();

  res.status(201).json({ message: "category add successfully", newCategory });
};

//*------------
//*2--update category
//*------------
const updateCategory = async (req, res, next) => {
  const { _id } = req.params;
  const { name } = req.body;

  const category = await categoriesModel.findByIdAndUpdate(
    _id,
    { name, slug: slugify(name) },
    { new: true }
  );
  !category && res.status(404).json({ message: "category not found" });
  category &&
    res
      .status(201)
      .json({ message: "category updated successfully", category });
};

//*------------
//*3--delete category
//*------------
const deleteCategory = deleteOne(categoriesModel, "category");

//*------------
//*4--get all category
//*------------
const getAllCategories = async (req, res, next) => {
  const categories = await categoriesModel.find().populate([
    {
      path: "subCategory",
    },
  ]);
  res.status(201).json({ categories });
};

//*------------
//*5--get specific category
//*------------
const getOneCategory = getOne(categoriesModel, "category");

export {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getOneCategory,
};

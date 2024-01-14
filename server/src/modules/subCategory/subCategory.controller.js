import slugify from "slugify";
import { subCategoriesModel } from "../../../database/models/subCategories.model.js";
import { categoriesModel } from "../../../database/models/categories.model.js";

//*------------
//*1--add subCategory
//*------------
const addSubCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  const category = await categoriesModel.findById(categoryId);

  !category && res.status(400).json({ message: "Category deoesnt exist" });

  const isExist = await subCategoriesModel.findOne({ name });

  isExist && res.status(400).json({ message: "subCategory already exist" });
  const newsubCategory = new subCategoriesModel({
    name,
    slug: slugify(name),
    categoryId,
  });
  await newsubCategory.save();

  res
    .status(201)
    .json({ message: "subCategory add successfully", newsubCategory });
};

//*------------
//*2--update subCategory
//*------------
const updateSubCategory = async (req, res, next) => {
  const { _id } = req.params;
  const { name } = req.body;

  const subCategory = await subCategoriesModel.findByIdAndUpdate(
    _id,
    { name, slug: slugify(name) },
    { new: true }
  );
  !subCategory && res.status(400).json({ message: "subCategory not found" });
  subCategory &&
    res
      .status(201)
      .json({ message: "subCategory updated successfully", subCategory });
};

//*------------
//*3--delete subCategory
//*------------
const deleteSubCategory = async (req, res, next) => {
  const { _id } = req.params;

  const subCategory = await subCategoriesModel.findByIdAndDelete(_id);
  !subCategory && res.status(400).json({ message: "subCategory not found" });
  subCategory &&
    res.status(201).json({ message: "subCategory deleted successfully" });
};

//*------------
//*4--get all subCategory
//*------------
const getAllSubCategories = async (req, res, next) => {
  const subCategories = await subCategoriesModel.find();
  res.status(201).json({ subCategories });
};

export {
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategories,
};

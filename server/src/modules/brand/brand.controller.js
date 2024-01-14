import slugify from "slugify";
import { brandModel } from "./../../../database/models/brand.model.js";
import { categoriesModel } from "../../../database/models/categories.model.js";
import { subCategoriesModel } from "../../../database/models/subCategories.model.js";

//*------------
//*1--add brand
//*------------
const addBrands = async (req, res, next) => {
  const { name } = req.body;
  const { subCategoryId, categoryId } = req.query;
  const category = await categoriesModel.findById(categoryId);
  if (!category) {
    return res.status(404).json({ message: "category not found" });
  }

  const subCategory = await subCategoriesModel.findById(subCategoryId);
  if (!subCategory) {
    return res.status(404).json({ message: "subCategory not found" });
  }

  const isExist = await brandModel.findOne({ name });

  if (isExist) {
    return res.status(400).json({ message: "brand already exist" });
  }

  const newBrand = new brandModel({
    name,
    slug: slugify(name),
    categoryId,
    subCategoryId,
  });
  await newBrand.save();

  res.status(201).json({ message: "brand add successfully", newBrand });
};

//*------------
//*2--update brand
//*------------
const updateBrands = async (req, res, next) => {
  const { _id } = req.params;
  const { name } = req.body;

  const brand = await brandModel.findByIdAndUpdate(
    _id,
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return res.status(400).json({ message: "brand not found" });
  }
  if (brand) {
    return res
      .status(201)
      .json({ message: "brand updated successfully", brand });
  }
};

//*------------
//*3--delete brand
//*------------
const deleteBrands = async (req, res, next) => {
  const { _id } = req.params;

  const brand = await brandModel.findByIdAndDelete(_id);
  if (!brand) {
    return res.status(400).json({ message: "brand not found" });
  }
  if (brand) {
    return res.status(201).json({ message: "brand deleted successfully" });
  }
};

//*------------
//*4--get all brand
//*------------
const getAllBrands = async (req, res, next) => {
  const brands = await brandModel.find();
  res.status(201).json({ brands });
};

export { addBrands, updateBrands, deleteBrands, getAllBrands };

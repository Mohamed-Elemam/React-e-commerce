import slugify from "slugify";
import { categoriesModel } from "../../../database/models/categories.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { brandModel } from "./../../../database/models/brand.model.js";
import { subCategoriesModel } from "../../../database/models/subCategories.model.js";
import cloudnairy from "../../../utils/cloudinaryConfig.js";
import { nanoid } from "nanoid";
import { ApiFeatures } from "../../../utils/ApiFeatures.js";
import mongoose from "mongoose";

//*------------
//*1--add prodduct
//*------------
const addproduct = async (req, res, next) => {
  const { categoryId, subCategoryId, brandId } = req.query;
  const {
    title,
    overview,
    highlights,
    colors,
    sizes,
    price,
    appliedDiscount,
    priceAfterDiscount,
  } = req.body;

  const customId = nanoid();

  // image upload section
  let bulkPictures = req.files;
  if (!bulkPictures) {
    return next(new Error("no picture attached", { cause: 400 }));
  }
  let uploadPromise = bulkPictures?.map(async (picture) => {
    const { public_id, secure_url } = await cloudnairy.uploader.upload(
      picture.path,
      {
        folder: `${process.env.PROJECT_FOLDER_NAME}/Categories/${categoryId}/subCategories/${subCategoryId}/Brands/${brandId}/Products/${customId}`,
        unique_filename: false,
        resource_type: "image",
      }
    );
    return { public_id, secure_url };
  });
  let uploadResponse = await Promise.all(uploadPromise);

  const category = await categoriesModel.findById(categoryId);
  //*category check
  if (!category) {
    res.status(400).json({ message: "Category doesnt exist" });
  }

  //*subcategory check
  const subCategory = await subCategoriesModel.findById(subCategoryId);
  if (!subCategory) {
    res.status(400).json({ message: "Category doesnt exist" });
  }

  //*brand check
  const brand = await brandModel.findById(brandId);
  if (!brand) {
    res.status(400).json({ message: "brand doesnt exist" });
  }
  const slug = slugify(title, "-");
  req.body.slug = slug;
  const newproduct = await productModel.create({
    title,
    overview,
    highlights,
    slug,
    colors,
    sizes,
    price,
    appliedDiscount,
    priceAfterDiscount,
    categoryId,
    subCategoryId,
    brandId,
    customId,
    images: uploadResponse,
  });
  if (!newproduct) {
    await cloudnairy.api.delete_resources(publicIds);
    return next(new Error("try again later", { cause: 400 }));
  }

  res.status(201).json({ message: "product add successfully", newproduct });
};

//*------------
//*2--update product
//*------------
const updateproduct = async (req, res, next) => {
  const { _id } = req.params;
  const {
    title,
    overview,
    highlights,
    price,
    appliedDiscount,
    colors,
    sizes,
    stock,
  } = req.body;

  const product = await productModel.findById(_id);
  !product && res.status(400).json({ message: "product not found" });

  if (appliedDiscount && price) {
    const priceAfterDiscount = price * (1 - (appliedDiscount || 0) / 100);
    product.priceAfterDiscount = priceAfterDiscount;
    product.price = price;
    product.appliedDiscount = appliedDiscount;
  } else if (price) {
    const priceAfterDiscount =
      price * (1 - (product.appliedDiscount || 0) / 100);
    product.priceAfterDiscount = priceAfterDiscount;
    product.price = price;
  } else if (appliedDiscount) {
    const priceAfterDiscount =
      product.price * (1 - (appliedDiscount || 0) / 100);
    product.priceAfterDiscount = priceAfterDiscount;
    product.appliedDiscount = appliedDiscount;
  }

  if (title) {
    product.title = title;
    product.slug = slugify(title, "-");
  }

  if (overview) product.overview = overview;
  if (highlights) product.highlights = highlights;
  if (colors) product.colors = colors;
  if (sizes) product.sizes = sizes;
  if (stock) product.stock = stock;
  await product.save();

  product &&
    res.status(201).json({ message: "product updated successfully", product });
};

//*------------
//*3--delete product
//*------------
const deleteproduct = async (req, res, next) => {
  const { _id } = req.params;

  const product = await productModel.findByIdAndDelete(_id);
  !product && res.status(404).json({ message: "product not found" });

  if (product) {
    return res.status(201).json({ message: "product deleted successfully" });
  }
};

//*------------
//*4--get all product
//*------------
const getAllProducts = async (req, res, next) => {
  let apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .paginate()
    .sort()
    .search()
    .select();

  const products = await apiFeatures.mongooseQuery;
  if (!products.length) {
    return res.status(404).json({ message: "No products  found" });
  }
  res.status(201).json({ products });
};

//*------------
//*5--get product by id
//*------------

const getProductById = async (req, res, next) => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "No product found" });
  }

  try {
    const product = await productModel.findById(_id);
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error });
  }
};
//*------------
//*get product by subcategory
//*------------
const getProductBySubCategory = async (req, res) => {
  const subCategoryId = req.params.subCategoryId;
  try {
    const subCategory = await subCategoriesModel.findOne({
      name: subCategoryId,
    });
    const products = await productModel.find({
      subCategoryId: subCategory.id,
    });
    res.json({ message: "success", products });
  } catch (error) {
    res.json({ message: "failed", error });
  }
};
//*------------
//*get product by title
//*------------
const getProductByTitle = async (req, res) => {
  const { title } = req.params;
  const trimmedTitle = title.trim();

  try {
    const product = await productModel.find({
      title: new RegExp(trimmedTitle, "i"),
    });

    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export {
  addproduct,
  updateproduct,
  deleteproduct,
  getProductById,
  getAllProducts,
  getProductBySubCategory,
  getProductByTitle,
};

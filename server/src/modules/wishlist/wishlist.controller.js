import { brandModel } from "../../../database/models/brand.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { productModel } from '../../../database/models/product.model.js';

//*------------
//*1--add to wishlist
//*------------
const addToWishlist = async (req, res, next) => {
  const { _id } = req.user;
  const { productId } = req.params;

  const product = await productModel.findById( productId );
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }
  const result = await userModel.findByIdAndUpdate(
    { _id },
    { $addToSet: { wishlist: productId } },
    {new: true}
  );

  res.status(201).json({ message: "product added successfully to withlist", result:result.wishlist });
};

//*------------
//*2-- remove from Wishlist
//*------------

const removeFromWishlist = async (req, res, next) => {
  const { _id } = req.user;
  const { productId } = req.params;

  const product = await productModel.findById( productId );
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }
  const result = await userModel.findByIdAndUpdate(
    { _id },
    { $pull: { wishlist: productId } },
    {new: true}
  );

  res.status(201).json({ message: "product removed successfully to withlist", result:result.wishlist });
    
  
};

const getAllUserwishlist = async (req, res, next) => {


  const user = await userModel.findById({_id:req.user._id})
  res.status(200).json({ wishlist:user.wishlist });
};

export { addToWishlist, removeFromWishlist, getAllUserwishlist };

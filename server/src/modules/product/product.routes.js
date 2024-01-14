import { Router } from "express";
import * as productControl from "./product.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import {
  allowedExtensions,
  multerFunction,
} from "../../services/multerCloud.js";
const productRouter = Router();

productRouter
  .route("/")
  .post(
    multerFunction(allowedExtensions.Image).array("picture"),
    errorHandling(productControl.addproduct)
  )
  .get(errorHandling(productControl.getAllProducts));

productRouter
  .route("/subcategory/:subCategoryId")
  .get(errorHandling(productControl.getProductBySubCategory));

productRouter
  .route("/title/:title")
  .get(errorHandling(productControl.getProductByTitle));

productRouter
  .route("/:_id")
  .put(errorHandling(productControl.updateproduct))
  .delete(errorHandling(productControl.deleteproduct))
  .get(errorHandling(productControl.getProductById));

export default productRouter;

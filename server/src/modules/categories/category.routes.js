import { Router } from "express";
import * as categoryControl from "./category.controller.js";
import { errorHandling } from "./../../../utils/errorHandling.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";
const categoryRouter = Router();

categoryRouter.use('/:categoryId/subcategory',subCategoryRouter)
categoryRouter.route("/")
.post(errorHandling(categoryControl.addCategory))
.get(errorHandling(categoryControl.getAllCategories))

categoryRouter.route("/:_id")
.put(errorHandling(categoryControl.updateCategory))
.delete(categoryControl.deleteCategory)
.get(categoryControl.getOneCategory)


export default categoryRouter;

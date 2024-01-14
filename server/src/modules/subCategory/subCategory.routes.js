import { Router } from "express";
import * as subCategoryControl from "./subCategory.controller.js";
import { errorHandling } from "./../../../utils/errorHandling.js";
const subCategoryRouter = Router({mergeParams:true});


//add sub category
subCategoryRouter.route("/:categoryId")
.post(errorHandling(subCategoryControl.addSubCategory))

//get all sub category
subCategoryRouter.route("/")
.get(errorHandling(subCategoryControl.getAllSubCategories))

subCategoryRouter.route("/:_id")
.put(errorHandling(subCategoryControl.updateSubCategory))
.delete(errorHandling(subCategoryControl.deleteSubCategory)) 

export default subCategoryRouter;

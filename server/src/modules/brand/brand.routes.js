import { Router } from "express";
const router = Router();
import * as brandControl from "./brand.controller.js";
import { errorHandling } from "./../../../utils/errorHandling.js";


//add brand
router.route("/")

//get all brand
router.route("/")
.post(errorHandling(brandControl.addBrands))
.get(errorHandling(brandControl.getAllBrands))

router.route("/:_id")
.put(errorHandling(brandControl.updateBrands)) //update brand
.delete(errorHandling(brandControl.deleteBrands)) //delete brand

export default router;

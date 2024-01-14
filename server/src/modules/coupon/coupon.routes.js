import { Router } from "express";
import * as couponController from "./coupon.controller.js";
import { errorHandling } from "./../../../utils/errorHandling.js";
const router = Router();



router.route("/")
.post(errorHandling(couponController.addcoupon))
.get(errorHandling(couponController.getAllcoupons))

router.route("/:_id")
.put(errorHandling(couponController.updatecoupon)) 
.delete(errorHandling(couponController.deletecoupon)) 
.get(errorHandling(couponController.getcouponById)) 

export default router;
import { Router } from "express";
const router = Router();
import * as wishlistController from "./wishlist.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import { handleAuth } from './../auth/auth.controller.js';



router.patch("/:productId",handleAuth,errorHandling(wishlistController.addToWishlist))

router.delete("/:productId",handleAuth,errorHandling(wishlistController.removeFromWishlist))


//get user withlist
router.get("/",handleAuth,errorHandling(wishlistController.getAllUserwishlist))
export default router;

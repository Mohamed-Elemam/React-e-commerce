import { Router } from "express";
const router = Router();
import * as cartController from "./cart.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import { handleAuth } from "../auth/auth.controller.js";

router
  .route("/")
  .post(handleAuth, errorHandling(cartController.addToCart))
  .patch(handleAuth, errorHandling(cartController.updateProductQuantity));

router.route("/guest").post(errorHandling(cartController.addToCartGuest));
router
  .route("/:_id")
  .get(handleAuth, errorHandling(cartController.loggedUserCart));

router
  .route("/:productId")
  .delete(handleAuth, errorHandling(cartController.removeFromCart))
  .put(handleAuth, errorHandling(cartController.decrementCart));

router.post(
  "/applyCoupon/:couponCode",
  handleAuth,
  errorHandling(cartController.applyCoupon)
);

export default router;

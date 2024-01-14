import { Router } from "express";
const router = Router();
import * as orderController from "./order.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import { handleAuth } from "../auth/auth.controller.js";
import { cartModel } from "../../../database/models/cart.model.js";

router.post(
  "/cashOrder/:id",
  handleAuth,
  errorHandling(orderController.createCashOrder)
);
router.post(
  "/checkout/:cartId",
  handleAuth,
  errorHandling(orderController.checkoutOrder)
);

router.get("/", handleAuth, errorHandling(orderController.getUserOrders));
//*************************** */
router.get("/success/:cartId", async (req, res) => {
  const { cartId } = req.params;
  await cartModel.findByIdAndUpdate(cartId, { cartItems: [], totalprice: 0 });

  res.render("purchaseComplete", {
    redirectUrl: `${process.env.LIVE_FRONTEND_CART_LINK}`,
  });
});
export default router;

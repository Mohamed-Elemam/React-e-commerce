import { config } from "dotenv";
config();
import { userModel } from "../../../database/models/user.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { orderModel } from "../../../database/models/order.model.js";
import { cartModel } from "./../../../database/models/cart.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//*------------
//*1--create cash order
//*------------
const createCashOrder = async (req, res, next) => {
  const { id } = req.params;
  const cart = await cartModel.findById(id);
  if (!cart) {
    return res.status(404).json({ message: "cart is empty" });
  }
  const totalOrderPrice = cart.totalpriceAfterDiscount
    ? cart.totalpriceAfterDiscount
    : cart.totalprice;
  const order = await orderModel({
    userId: req.user._id,
    cartItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });
  await order.save();

  let productsIncrement = cart.cartItems.map((item) => ({
    updateOne: {
      filter: { _id: item.productId },
      update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
    },
  }));
  await productModel.bulkWrite(productsIncrement);

  await cartModel.findByIdAndDelete(req.params.id);
  res.status(201).json({ message: "order placed successfully", order });
};

//*------------
//*2 checkout order
//*------------

const checkoutOrder = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await cartModel.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart does not exist" });
    }

    let totalPrice = cart.totalpriceAfterDiscount
      ? cart.totalpriceAfterDiscount
      : cart.totalprice;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "EGP",
            unit_amount: totalPrice * 100,
            product_data: {
              name: req.user.userName,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.LIVE_BACKEND_LINK}/api/v1/order/success/${cartId}`,
      cancel_url: `${process.env.LIVE_FRONTEND_CART_LINK}`,
      customer_email: req.user.email,
      client_reference_id: req.params.id,
    });

    res.json({ message: "success", url: session.url });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//*------------
//*3 getUserOrders
//*------------

const getUserOrders = async (req, res, next) => {
  const orders = await orderModel.findOne({ userId: req.user._id });
  if (!orders) {
    return res.status(404).json({ message: "no order found" });
  }

  res.status(201).json({ message: "success", orders });
};

const onlineWebhook = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      break;
    case "checkout.session.async_payment_succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      break;
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      break;
    case "checkout.session.expired":
      const checkoutSessionExpired = event.data.object;
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send();
};

export { createCashOrder, getUserOrders, checkoutOrder, onlineWebhook };

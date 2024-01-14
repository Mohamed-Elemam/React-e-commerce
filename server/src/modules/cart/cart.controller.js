import { cartModel } from "./../../../database/models/cart.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { couponModel } from "../../../database/models/coupon.model.js";

export function calcTotalPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((ele) => {
    totalPrice += ele.quantity * ele.price;
  });
  cart.totalprice = totalPrice;
}
//*------------
//*1--add to cart
//*------------

const addToCart = async (req, res, next) => {
  let userId = req.user._id;
  let isProduct = await productModel.findById(req.body.productId);
  if (!isProduct) {
    return next(new Error("Product not found", 404));
  }

  req.body.price = isProduct.price;

  let isCart = await cartModel.findOne({ userId });
  if (!isCart) {
    let cart = new cartModel({
      userId,
      cartItems: [req.body],
    });
    calcTotalPrice(cart);
    await cart.save();
    return res
      .status(201)
      .json({ message: "success", cart, addProductId: req.body.productId });
  }

  let item = isCart.cartItems.find(
    (ele) => ele?.productId == req.body.productId
  );
  if (item) {
    item.quantity += req.body.quantity || 1;
  } else {
    isCart.cartItems.push(req.body);
  }
  calcTotalPrice(isCart);

  if (isCart.discount) {
    const discountAmount = (isCart.totalprice * isCart.discount) / 100;
    isCart.totalpriceAfterDiscount = isCart.totalprice - discountAmount;
  }
  await isCart.save();
  res.status(201).json({
    message: "success",
    cart: isCart,
    addProductId: req.body.productId,
  });
};
//*------------
//*add to guest cart
//*------------

const addToCartGuest = async (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = { items: [] };
  }
  req.session.cart.items.push(req.body);
  res
    .status(201)
    .json({ message: "Item added to guest cart", cart: req.session.cart });
};

//*------------
//*2-- remove from cart
//*------------

const removeFromCart = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const result = await cartModel.findOneAndUpdate(
      { userId: req.user._id },
      {
        $pull: { cartItems: { productId } },
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    if (result.discount) {
      const discountAmount = (result.totalprice * result.discount) / 100;
      result.totalpriceAfterDiscount = result.totalprice - discountAmount;
    }
    calcTotalPrice(result);
    await result.save();

    return res.status(201).json({
      message: "Item removed from the cart",
      cart: result,
      removedProduct: productId,
    });
  } catch (error) {
    return res.status(404).json({ message: "Product not found", error });
  }
};

//*------------
//*-- decrement product
//*------------

const decrementCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await cartModel.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.cartItems.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    if (cart.cartItems[itemIndex].quantity > 1) {
      cart.cartItems[itemIndex].quantity -= 1;
    } else {
      cart.cartItems.splice(itemIndex, 1);
    }

    calcTotalPrice(cart);

    if (cart.discount) {
      const discountAmount = (cart.totalprice * cart.discount) / 100;
      cart.totalpriceAfterDiscount = cart.totalprice - discountAmount;
    }

    await cart.save();

    return res.status(200).json({
      message: "Item decremented successfully",
      cart,
      decrementedProduct: productId,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

//*------------
//*3-- update product quantity
//*------------
const updateProductQuantity = async (req, res, next) => {
  let isProduct = await productModel.findById(req.body.productId);
  if (!isProduct) {
    return next(new Error("Product not found", 404));
  }
  let isCartExist = await cartModel.findOne({ userId: req.user._id });
  if (!isCartExist) {
    return next(new Error("cart not found", 404));
  }
  let item = isCartExist.cartItems.find(
    (ele) => ele.productId == req.body.productId
  );
  if (!item) {
    return next(new Error("item is not in cart found", 404));
  }
  item.quantity = req.body.quantity;
  calcTotalPrice(isCartExist);
  if (isCartExist.discount) {
    const discountAmount =
      (isCartExist.totalprice * isCartExist.discount) / 100;
    isCartExist.totalpriceAfterDiscount =
      isCartExist.totalprice - discountAmount;
  }
  await isCartExist.save();
  res.status(201).json({ message: "success", cart: isCartExist });
};
//*------------
//*4-- logged User Cart
//*------------
const loggedUserCart = async (req, res) => {
  const { _id } = req.params;
  try {
    let cart = await cartModel
      .findOne({ userId: _id })
      .populate("cartItems.productId");
    if (!cart) {
      cart = new cartModel({ userId: _id, cartItems: [], totalprice: 0 });
      await cart.save();
      return res.status(201).json({ message: "New cart created", cart });
    }
    res.status(201).json({ message: "success", cart });
  } catch (error) {
    return res.status(400).json({ message: "cart not found", error });
  }
};

//*------------
//*5-- apply coupon
//*------------
const applyCoupon = async (req, res) => {
  const { couponCode } = req.params;
  const coupon = await couponModel.findOne({
    code: couponCode,
    expiresAt: { $gt: Date.now() },
  });
  if (!coupon) {
    return res.status(400).json({ message: "coupon not found" });
  }

  const cart = await cartModel.findOne({ userId: req.user._id });

  const discountAmount = (cart.totalprice * coupon.discount) / 100;
  cart.totalpriceAfterDiscount = cart.totalprice - discountAmount;
  // if(!cart.discount){
  cart.discount = coupon.discount;
  // }
  await cart.save();

  res.status(200).json({ message: "Coupon applied successfully", cart });
};

export {
  addToCart,
  addToCartGuest,
  removeFromCart,
  decrementCart,
  updateProductQuantity,
  loggedUserCart,
  applyCoupon,
};

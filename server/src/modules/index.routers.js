import categoryRouter from "./categories/category.routes.js";
import SubcategoryRouter from "./subCategory/subCategory.routes.js";
import brandRouter from "./brand/brand.routes.js";
import productRouter from "./product/product.routes.js";
import authRouter from "./auth/auth.routes.js";
import userRouter from "./user/user.routes.js";
import wishlistRouter from "./wishlist/wishlist.routes.js";
import reviewRouter from "./review/review.routes.js";
import couponRouter from "./coupon/coupon.routes.js";
import cartRouter from "./cart/cart.routes.js";
import orderRouter from "./order/order.routes.js";

export function allRouters(app) {
  app.use((err, req, res, next) => {
    let error = err.message;
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error });
  });
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/subCategory", SubcategoryRouter);
  app.use("/api/v1/brand", brandRouter);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/wishlist", wishlistRouter);
  app.use("/api/v1/review", reviewRouter);
  app.use("/api/v1/coupon", couponRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/order", orderRouter);

  app.get("/", (req, res) => res.send("Hello World!"));

  app.all("*", (req, res, next) => {
    next(new Error("404 Not Found URL", { cause: 404 }));
  });
}

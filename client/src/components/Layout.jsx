import Navbar from "./shared-components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./shared-components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserCart } from "../Redux/cartSlice.js";

export default function Layout() {
  const dispatch = useDispatch();
  const cartObj = useSelector((state) => state.cart);

  let ProductsQTY = cartObj?.cart?.cartItems?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar ProductsQTY={ProductsQTY} cartObj={cartObj} />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

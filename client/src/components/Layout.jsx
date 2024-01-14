import Navbar from "./shared-components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./shared-components/Footer/Footer";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

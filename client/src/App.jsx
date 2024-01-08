import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/home-components/Home";
import NotFound from "./components/utils/NotFound.jsx";
import ProductDetails from "./components/Products-related-components/ProductDetails.jsx";
import Register from "./components/auth-components/Register/Register.jsx";
import LogIn from "./components/auth-components/LogIn/LogIn.jsx";
import Cart from "./components/shared-components/Cart.jsx";
import CategoryPage from "./components/categories-related-components/CategoryPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/signup", element: <Register /> },
        { path: "/login", element: <LogIn /> },
        { path: "/cart", element: <Cart /> },
        { path: "/category/:name", element: <CategoryPage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

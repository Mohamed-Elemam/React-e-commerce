import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NotFound from "./components/utils/NotFound.jsx";
import ProductDetails from "./components/Products/ProductDetails.jsx";
import Register from "./components/Register/Register.jsx";
import LogIn from "./components/LogIn/LogIn.jsx";
import Cart from "./components/Cart.jsx";
import CategoryPage from './components/Categories/CategoryPage';

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

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NotFound from "./components/utils/NotFound.jsx";
import ProductDetails from "./components/Products/ProductDetails.jsx";
import Register from "./components/Register/Register.jsx";
import LogIn from "./components/LogIn/LogIn.jsx";
import Cart from "./components/Cart.jsx";
import CategoryPage from "./components/Categories/CategoryPage";
import { Provider } from "react-redux";
import { persistor, store } from "./components/Redux/useStore";
import { PersistGate } from 'redux-persist/integration/react';


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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        
           <RouterProvider router={router} />
         </PersistGate>
       </Provider> 
    </>
  );
}

export default App;

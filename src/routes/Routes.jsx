import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddProduct from "../pages/AddProduct";
import AdminRoute from "./AdminRoute";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import AllCustomers from "../pages/AllCustomers";
import CustomerDetails from "../pages/CustomerDetails";
import AddCustomer from "../pages/AddCustomer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <Dashboard></Dashboard>
          </AdminRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/cart/checkout",
        element: <Checkout></Checkout>,
      },
      {
        path: "/dashboard/allProducts/productDetails/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/dashboard/allProducts",
        element: (
          <AdminRoute>
            <AllProducts></AllProducts>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allProducts/addProduct",
        element: (
          <AdminRoute>
            <AddProduct></AddProduct>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allCustomers",
        element: <AllCustomers></AllCustomers>,
      },
      {
        path: "/dashboard/allCustomers/addCustomer",
        element: <AddCustomer></AddCustomer>,
      },
      {
        path: "/dashboard/allCustomers/customerDetails/:id",
        element: <CustomerDetails></CustomerDetails>,
      },
    ],
  },
]);

export default router;

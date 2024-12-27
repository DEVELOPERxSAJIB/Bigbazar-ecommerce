import Layout from "../components/Layouts/Layout";
import Dashboard from "../pages/Admin/Dashboard";
import ProductList from "../pages/Admin/ProductList";
import PrivateGuards from "./PrivateGuards";
import CreateProduct from "../pages/Admin/CreateProduct";
import OrderList from "../pages/Admin/OrderList";
import OrderDetails from "../pages/Admin/OrderDetails";
import UserList from "../pages/Admin/UserList";
import UserDetails from "../pages/Admin/UserDetails";
import ReviewsList from "../pages/Admin/ReviewsList";
import ProductDetails from "../pages/Admin/ProductDetails";
import AdminGuard from "./AdminGuard";
import Category from "../pages/Admin/Category";
import CreateCategory from "../pages/Admin/CreateCategory";
import Brand from "../pages/Admin/Brand";
import CreateBrand from "../pages/Admin/CreateBrand";
import Banner from "../pages/Admin/Banner";
import CreateBanner from "../pages/Admin/CreateBanner";
import UpdateBrand from "../pages/Admin/UpdateBrand";
import EditCategory from "../pages/Admin/EditCategory";

const adminRoutes = [
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateGuards />,
        children: [
          {
            element: <AdminGuard />,
            children: [
              {
                path: "/dashboard",
                element: <Dashboard />,
              },
              {
                path: "/admin/hero-banner",
                element: <Banner/>,
              },
              {
                path: "/admin/create-hero-banner",
                element: <CreateBanner />,
              },
              {
                path: "/admin/category",
                element: <Category />,
              },
              {
                path: "/admin/create-category",
                element: <CreateCategory />,
              },
              {
                path: "/admin/update-category/:id",
                element: <EditCategory />,
              },
              {
                path: "/admin/brand",
                element: <Brand />,
              },
              {
                path: "/admin/create-brand",
                element: <CreateBrand />,
              },
              {
                path: "/admin/update-brand/:id",
                element: <UpdateBrand />,
              },
              {
                path: "/admin/products",
                element: <ProductList />,
              },
              {
                path: "/admin/create-product",
                element: <CreateProduct />,
              },
              {
                path: "/admin/update-product/:id",
                element: <ProductDetails />,
              },
              {
                path: "/admin/orders",
                element: <OrderList />,
              },
              {
                path: "/admin/orders/:id",
                element: <OrderDetails />,
              },
              {
                path: "/admin/users",
                element: <UserList />,
              },
              {
                path: "/admin/users/:id",
                element: <UserDetails />,
              },
              {
                path: "/admin/reviews",
                element: <ReviewsList />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default adminRoutes;

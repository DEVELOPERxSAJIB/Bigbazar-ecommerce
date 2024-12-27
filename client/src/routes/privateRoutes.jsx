import Layout from "../components/Layouts/Layout";
import Logout from "../pages/Auth/Logout";
import ConfirmOrder from "../pages/ConfrimOrder/ConfirmOrder";
import ShippingInfo from "../pages/ShippingInfo/ShippingInfo";
import ChangePassword from "../pages/User/ChangePassword";
import MyOrders from "../pages/User/MyOrders";
import Profile from "../pages/User/Profile";
import UpdateProfile from "../pages/User/UpdateProfile";
import PrivateGuards from "./PrivateGuards";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "../pages/Payment/Payment";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import SingleOrder from "../pages/User/SingleOrder";
import Cart from "../pages/Cart/Cart";


const stripePromise = loadStripe(
  "pk_test_51OJK2mC0uzty5a6aCvyDcWDcXB01RJgae6EGrqNr6oMuD8DFemS56xiyQZHQHlllOhGPp70dIEvWS0RTzXwzX1KU00oDtEJ7cO"
);

const privateRoutes = [
  {
    element: (
      <Elements stripe={stripePromise}>
        <Layout />
      </Elements>
    ),
    children: [
      {
        element: <PrivateGuards />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/logout",
            element: <Logout />,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/update-profile",
            element: <UpdateProfile />,
          },
          {
            path: "/my-orders",
            element: <MyOrders />,
          },
          {
            path: "/order/:id",
            element: <SingleOrder />,
          },
          {
            path: "/shipping-info",
            element: <ShippingInfo />,
          },
          {
            path: "/order/confirm",
            element: <ConfirmOrder />,
          },
          {
            path: "/confirm/payment",
            element: <Payment />,
          },
          {
            path: "/success",
            element: <OrderSuccess />,
          },
          {
            path: "/change-password",
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
];

export default privateRoutes;

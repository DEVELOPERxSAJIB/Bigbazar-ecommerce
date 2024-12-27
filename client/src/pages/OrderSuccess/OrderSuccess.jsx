import { Link, useNavigate } from "react-router-dom";
import MetaData from "../../../utils/MetaData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLoader from "../../../utils/MainLoader";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/order/orderSlice";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { newOrder, loader, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      AlertMessage({
        type: "error",
        msg: error,
      });

      dispatch(setMessageEmpty());
    }

    if (!newOrder) {
      navigate("/cart");
      AlertMessage({
        type: "error",
        msg: "You cannot order before pay and check out",
      });

      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, navigate, newOrder]);

  return (
    <>
      {loader && <MainLoader />}
      <MetaData title={"Order Success"} />
      <div className="container container-fluid">
        <div className="row justify-content-center success-order-custom-wrapper">
          <div className="col-6 text-center">
            <img
              className="my-5 img-fluid d-block mx-auto"
              src="https://freepngimg.com/thumb/success/6-2-success-png-image.png"
              alt="Order Success"
              width={200}
              height={200}
            />
            <h2>Your Order has been placed successfully.</h2>
            <Link to="/my-orders">Go to Orders</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;

import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  orderDetailsByAdmin,
  updateOrderByAdmin,
} from "../../features/orderList/orderListApiSlice";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/orderList/orderListSlice";
import MainLoader from "../../../utils/MainLoader";
import MetaData from "../../../utils/MetaData";
import NotFound from "../NotFound/NotFound";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { orderDetails, error, message, loader } = useSelector(
    (state) => state.ordersList
  );

  const [status, setStatus] = useState("");

  // update order status
  const handleUpdateStatus = (id) => {
    dispatch(updateOrderByAdmin({ id: id, status}));
  };

  useEffect(() => {
    dispatch(orderDetailsByAdmin(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (error) {
      AlertMessage({ type: "error", msg: error });
      dispatch(setMessageEmpty());
    }
    if (message) {
      AlertMessage({ type: "success", msg: message });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message]);

  const isPaid =
    orderDetails?.paymentInfo &&
    orderDetails?.paymentInfo.status === "succeeded"
      ? true
      : false;

  return (
    <>
      <MetaData title={"Order details by admin"} />
      {loader && <MainLoader />}
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        {orderDetails ? (
          <div className="container container-fluid">
            <div className="row d-flex justify-content-around">
              <div className="col-12 col-lg-7 order-details">
                <h1 className="my-5">Order #{orderDetails._id}</h1>
                <h4 className="mb-4">Shipping Info</h4>
                <p>
                  <b>Name:</b> {orderDetails.user.name}
                </p>
                <p>
                  <b>Phone:</b> {orderDetails.shippingInfo.phone}
                </p>
                <p className="mb-4">
                  <b>Address:</b> {orderDetails?.shippingInfo?.address}
                  {", "}
                  {orderDetails?.shippingInfo?.city}
                  {"-"}
                  {orderDetails?.shippingInfo?.postalCode}
                  {" | "}
                  {orderDetails?.shippingInfo?.country}
                </p>
                <p>
                  <b>Amount:</b> ${orderDetails.totalPrice}
                </p>
                <hr />
                <h4 className="my-4">Payment</h4>
                <p className="greenColor">
                  <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                </p>
                <h4 className="my-4">Stripe ID</h4>
                <p className="greenColor">
                  <b>stripe_id : {orderDetails.paymentInfo.id}</b>
                </p>
                <h4 className="my-4">Order Status:</h4>
                <p
                  className={
                    orderDetails.orderStatus &&
                    String(orderDetails.orderStatus).includes("Delivered")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{orderDetails.orderStatus}</b>
                </p>
                <h4 className="my-4">Order Items:</h4>
                <hr />
                {orderDetails.orderItems.map((item) => (
                  <div key={item?._id} className="cart-item my-1">
                    <div className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt="Laptop"
                          height={45}
                          width={65}
                        />
                      </div>
                      <div className="col-5 col-lg-5">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  </div>
                ))}
                <hr />
              </div>
              <div className="col-12 col-lg-3 mt-5">
                <h4 className="my-4">Status</h4>
                <div className="form-group">
                  <select
                    className="form-control"
                    name="status"
                    value={status ? status : orderDetails.orderStatus}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <button
                  onClick={() => handleUpdateStatus(orderDetails._id)}
                  className="btn btn-primary btn-block"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
};

export default OrderDetails;

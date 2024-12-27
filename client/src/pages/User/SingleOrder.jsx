import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { singleOrderDetails } from "../../features/order/orderApiSlice";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/order/orderSlice";
import MetaData from "../../../utils/MetaData";
import MainLoader from "../../../utils/MainLoader";

const SingleOrder = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { orderDetails, error, loader } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(singleOrderDetails(params.id));

    if (error) {
      AlertMessage({ type: "error", msg: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, params.id]);

  const isPaid =
    orderDetails?.paymentInfo &&
    orderDetails?.paymentInfo.status === "succeeded"
      ? true
      : false;

  return (
    <>
      <MetaData title={"Order details"} />
      {loader && <MainLoader />}

      {orderDetails && (
        <div className="container container-fluid">
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order #{orderDetails?._id}</h1>
              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {orderDetails?.user?.name}
              </p>
              <p>
                <b>Phone:</b> {orderDetails?.shippingInfo?.phone}
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
                <b>Amount:</b> ${orderDetails?.totalPrice}
              </p>
              <hr />
              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColors"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
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
              <div className="cart-item my-1">
                {orderDetails?.orderItems &&
                  orderDetails?.orderItems.map((item) => (
                    <div key={item._id} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img style={{ objectFit : "cover" }} src={item?.image} alt={item.name} height={45} width={65} />
                      </div>
                      <div className="col-5 col-lg-5">
                        <Link to={`/product/${item?.product}`}>{item?.name}</Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item?.price}</p>
                      </div>
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item?.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleOrder;

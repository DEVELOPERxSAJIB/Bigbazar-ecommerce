import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AlertMessage from "../../../utils/AlertMessage";
import MetaData from "../../../utils/MetaData";
import CheckOutSteps from "../../components/CheckOutSteps/CheckOutSteps";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!shippingInfo) {
      navigate("/shipping-info");
      AlertMessage({
        type: "info",
        msg: "Please provide your shipping information first",
      });
    }
  }, [navigate, shippingInfo]);

  // Calculate the prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shippingPrice = itemsPrice >= 200 ? 0 : 25
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

  // Handle Payment in procced
  const handleProceedPayment = (e) => {
    e.preventDefault()
    const data = {
        itemsPrice : itemsPrice.toFixed(2),
        shippingPrice,
        taxPrice,
        totalPrice,
    }

    sessionStorage.setItem("orderInfo", JSON.stringify(data))
    AlertMessage({ type: "success", msg: "Well done! only few steps left"})
    navigate("/confirm/payment")
  }

  return (
    <>
      <MetaData title={"Confirm Orders"} />
      <CheckOutSteps shipping={shippingInfo} confirmOrder />
      <div className="container container-fluid">
        <div className="row d-flex confirm-order-custom-wrapper justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="mb-3">Shipping Info</h4>
            <p>
              <b>Name:</b> {user.name}
            </p>
            <p>
              <b>Phone:</b> {shippingInfo.phone}
            </p>
            <p className="mb-4">
              <b>Address:</b> {shippingInfo.address} - {shippingInfo.city}
              {","} {shippingInfo.country}
            </p>
            <hr />
            <h4 className="mt-4">Your Cart Items:</h4>
            {cartItems?.map((item, index) => (
              <>
                <hr />
                <div key={index} className="cart-item my-1">
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt="Laptop"
                        height={45}
                        width={65}
                      />
                    </div>
                    <div className="col-5 col-lg-6">
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </div>
                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        {item.quantity} x {item.price} = <b>${item.quantity * item.price}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            ))}
          </div>
          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal: <span className="order-summary-values">${itemsPrice}</span>
              </p>
              <p>
                Shipping: <span className="order-summary-values">${shippingPrice}</span>
              </p>
              <p>
               5% Tax: <span className="order-summary-values">${taxPrice}</span>
              </p>
              <hr />
              <p>
                Total: <span className="order-summary-values">${totalPrice}</span>
              </p>
              <hr />
              <button onClick={handleProceedPayment} id="checkout_btn" className="btn btn-primary btn-block">
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;

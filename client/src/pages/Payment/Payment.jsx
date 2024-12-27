import MetaData from "../../../utils/MetaData";
import CheckOutSteps from "../../components/CheckOutSteps/CheckOutSteps";
import { useDispatch, useSelector } from "react-redux";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import AlertMessage from "../../../utils/AlertMessage";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../features/order/orderApiSlice";
import { useEffect } from "react";
import { setMessageEmpty } from "../../features/order/orderSlice";
import api from "../../../utils/api";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const element = useElements();

  const { user } = useSelector((state) => state.auth);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  useEffect(() => {
    if (!orderInfo) {
      navigate("/cart");
      AlertMessage({
        type: "error",
        msg: "You cannot pay before confirm cart items",
      });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, navigate, orderInfo]);

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;

    let response;

    try {
      response = await api.post(`/payment/process-payment`, paymentData, {
        withCredentials: true,
      });

      const clientSecret = response.data.payload.client_secret;

      if (!stripe || !element) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: element.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      // The payment is processed or not
      if (result.error) {
        AlertMessage({ type: "error", msg: result.error.message });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          navigate("/success");
        } else {
          AlertMessage({
            type: "error",
            msg: "There are some issu while payment is processing",
          });
        }
      }
    } catch (error) {
      AlertMessage({ type: "error", msg: error.message });
      document.querySelector("#pay_btn").disabled = false;
    }
  };

  return (
    <>
      <MetaData title={"Payment confirmation"} />

      <CheckOutSteps shipping confirmOrder payment={Payment} />

      <div className="row wrapper payment-comp-custom-wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={handleSubmitPayment} className="shadow-lg">
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                id="card_num_field"
                className="py-2 px-2 border border-solid border-2 rounded"
              />
            </div>
            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                id="card_exp_field"
                placeholder="Enter card"
                className="py-2 px-2 border border-solid border-2 rounded"
              />
            </div>
            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                id="card_cvc_field"
                className="py-2 px-2 border border-solid border-2 rounded"
              />
            </div>
            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay - ${orderInfo.totalPrice}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;

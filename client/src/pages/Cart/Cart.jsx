import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../../utils/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { removeItem, updateQuantity } from "../../features/cart/cartSlice";
import swal from "sweetalert";
import AlertMessage from "../../../utils/AlertMessage";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // update quantity of cart items
  const handleUpdateQuantity = ({ item, newQuantity }) => {
    newQuantity = Math.max(1, Math.min(newQuantity, item?.stock));
    dispatch(updateQuantity({ id: item?.id, quantity: newQuantity }));
  };

  // remove item from cart
  const handleRemoveItem = (item) => {
    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        AlertMessage({
          type: "success",
          msg: `${item.name} removed from your cart`,
        });
        dispatch(removeItem(item));
      }
    });
  };

  const handleCheckoutfromCart = () => {
    navigate("/shipping-info");
  };

  return (
    <>
      <MetaData title={"Your Cart"} />

      <div className="container container-fluid">
        {cartItems?.length !== 0 ? (
          <>
            <h2 className="mt-5">
              Your Cart: <b>{cartItems && cartItems.length} items</b>
            </h2>
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8">
                <hr />
                {cartItems &&
                  Array.from(cartItems)?.map((item, index) => (
                    <div key={index} className="cart-item">
                      <div className="row d-flex align-items-center">
                        <div className="col-4 col-lg-3">
                          <img
                            style={{objectFit :"cover",objectPosition: "top center",}}
                            src={item.image}
                            alt="Laptop"
                            height={90}
                            width={115}
                          />
                        </div>
                        <div className="col-5 col-lg-3">
                          <Link  style={{color: "#10ac84", textDecoration: "none"}} to={`/product/${item.id}`}>{item.name}</Link>
                        </div>
                        <div className="col-4 col-lg-2 mt-lg-0">
                          <p id="card_item_price">${item.price}</p>
                        </div>
                        <div className="col-4 col-lg-3 mt-lg-0">
                          <div className="stockCounter d-flex align-items-center">
                            <span
                              onClick={() =>
                                handleUpdateQuantity({
                                  item: item,
                                  newQuantity: item.quantity - 1,
                                })
                              }
                              className="btn btn-danger minus"
                            >
                              -
                            </span>
                            <input
                              type="number"
                              className="form-control count mx-2"
                              defaultValue={item.quantity}
                              value={item.quantity}
                              readOnly
                            />
                            <span
                              onClick={() =>
                                handleUpdateQuantity({
                                  item: item,
                                  newQuantity: item.quantity + 1,
                                })
                              }
                              className="btn btn-primary plus"
                            >
                              +
                            </span>
                          </div>
                        </div>
                        <div
                          onClick={() => handleRemoveItem(item)}
                          className="col-4 col-lg-1 mt-4 mt-lg-0"
                        >
                          <i
                            id="delete_cart_item"
                            className="fa fa-trash btn btn-danger"
                          />
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
              </div>
              {cartItems && (
                <div className="col-12 col-lg-3 my-4">
                  <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>
                      Subtotal:{" "}
                      <span className="order-summary-values">
                        {" "}
                        {cartItems.length > 0 &&
                          cartItems.reduce(
                            (acc, item) => Number(acc + item.quantity),
                            0
                          )}{" "}
                        (Units)
                      </span>
                    </p>
                    <p>
                      Est. total:{" "}
                      <span className="order-summary-values">
                        $
                        {cartItems.length > 0 && cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </p>
                    <hr />
                    <button
                      onClick={handleCheckoutfromCart}
                      id="checkout_btn"
                      className="btn btn-primary btn-block"
                    >
                      Check out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div id="notfound">
            <div className="notfound">
              <div className="notfound-404">
                <h1>Items</h1>
                <h2>Your Cart is Empty</h2>
              </div>
              <Link to={"/"}>CONTINUE SHOPPING</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../../utils/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import MetaData from "../../../utils/MetaData";
import { addShippingInfo } from "../../features/cart/cartSlice";
import CheckOutSteps from "../../components/CheckOutSteps/CheckOutSteps";

const ShippingInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { shippingInfo } = useSelector((state) => state.cart);
  const countriesList = Object.values(countries);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
      AlertMessage({
        type: "info",
        msg: "Please Select any items for checkout",
      });
    }
  }, [cartItems.length, navigate]);

  const [input, setInput] = useState({
    address: shippingInfo.address || "",
    city: shippingInfo.city || "",
    phone: shippingInfo.phone || "",
    postalCode: shippingInfo.postalCode || "",
    country: shippingInfo.country || "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShippingInfo = (e) => {
    e.preventDefault();
    if (
      !input.address ||
      !input.city ||
      !input.phone ||
      !input.postalCode ||
      !input.country
    ) {
      AlertMessage({ type: "error", msg: "All feilds are required" });
    } else {
      dispatch(addShippingInfo(input));
      AlertMessage({ type: "success", msg: "Shipping Info added" });
      navigate("/order/confirm")
    }
  };

  return (
    <>
      <MetaData title={"Add Shipping Info"} />
      <CheckOutSteps shipping={ShippingInfo} />
      <div className="row wrapper custom-shipping-info-wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={handleShippingInfo} className="shadow-lg">
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={input.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                name="city"
                type="text"
                id="city_field"
                className="form-control"
                value={input.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                name="phone"
                type="phone"
                id="phone_field"
                className="form-control"
                value={input.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                name="postalCode"
                value={input.postalCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                name="country"
                id="country_field"
                className="form-control"
                value={input.country}
                onChange={handleInputChange}
              >
                <option>-Select your country-</option>
                {countriesList?.map((country) => (
                  <>
                    <option key={country?.name} value={country?.name}>
                      {country?.name}
                    </option>
                  </>
                ))}
              </select>
            </div>
            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShippingInfo;

import "../../../src/index.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../../../utils/MetaData";
import MainLoader from "../../../utils/MainLoader";
import {
  createReview,
  getSingleProduct,
} from "../../features/products/productApiSlice";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/products/productSlice";
// import ReactImageMagnify from "react-image-magnify";
import { addItem, updateQuantity } from "../../features/cart/cartSlice";
import Review from "../../components/Review/Review";
import Ratings from "../../components/Ratings/Ratings";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  const { productDetails, message, loader, error } = useSelector(
    (state) => state.product
  );

  const { user } = useSelector((state) => state.auth);

  const [productSingleThmb, setProductSingleThmb] = useState();
  const [addCustomClass, setAddCustomClass] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSetThumOnClick = (imageUrl) => {
    setProductSingleThmb(imageUrl);
    setAddCustomClass("custom-thumb-border");
  };

  const handleAddToCart = (product) => {
    const fixQuantity =
      quantity > productDetails?.stock ? productDetails?.stock : quantity;
    dispatch(addItem({ product: product, quantity: fixQuantity }));
    AlertMessage({
      type: "success",
      msg: `${productDetails?.name} added into your cart`,
    });
  };

  const handleUpdateQuantity = (newQuantity) => {
    newQuantity = Math.max(1, Math.min(newQuantity, productDetails?.stock));
    setQuantity(newQuantity);
    dispatch(
      updateQuantity({ id: productDetails?._id, quantity: newQuantity })
    );
  };

  useEffect(() => {
    if (error) {
      AlertMessage({ type: "error", msg: error });
      dispatch(setMessageEmpty());
    }

    if (message) {
      AlertMessage({ type: "success", msg: message });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, id, message]);

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  const handleReview = () => {
    const data = {
      comment,
      rating,
      id,
    };

    dispatch(createReview(data)).then(() => {
      dispatch(getSingleProduct(id));
    });
  };

  return (
    <>
      <MetaData title={productDetails?.name} />
      {loader && <MainLoader />}
      <div className="container container-fluid">
        {productDetails && (
          <div className="single-product row">
            <div className="product-left-area col-12 col-lg-5 img-fluid">
              <div className="row shadow-5">
                <div className="col-12 product-img mb-1">
                  <div className="lightbox shadow-sm">
                    <img
                      style={{ width: "100%", objectFit: "cover" }}
                      src={
                        productSingleThmb
                          ? productSingleThmb
                          : productDetails.images[0].url
                      }
                      alt=""
                    />
                  </div>
                </div>
                {productDetails?._id === id &&
                  productDetails?.images?.map((image) => {
                    return (
                      <div key={image?.public_id} className="col-3 mt-1">
                        <img
                          style={{
                            height: "80px",
                            width: "120px",
                            objectFit: "cover",
                            marginBottom: "15px",
                            cursor: "pointer",
                          }}
                          src={image?.url}
                          alt={productDetails.title}
                          className={`active w-100 ${
                            productSingleThmb === image.url
                              ? addCustomClass
                              : ""
                          }`}
                          onClick={() => handleSetThumOnClick(image.url)}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="product-right-area col-12 col-lg-5">
              <p id="product_id"> Product # {productDetails?._id}</p>
              <div className="d-flex align-items-center justify-content-between">
                <h3>{productDetails?.name}</h3>
                <div
                  style={{ height: "40px", width: "40px", objectFit: "cover" }}
                  className="img-area"
                >
                  <img
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src={productDetails?.brand?.photo?.url}
                  />
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center">
                <Ratings value={productDetails.ratings} />
                <span id="no_of_reviews">
                  ({productDetails?.numOfReviews} Reviews)
                </span>
              </div>
              <hr />
              <p id="product_price">${productDetails?.price}</p>
              <div className="d-flex">
                <div className="stockCounterContainer d-inline-flex">
                  <div className="stockCounter d-flex align-items-center">
                    <span
                      onClick={() => handleUpdateQuantity(quantity - 1)}
                      className="btn btn-danger minus"
                    >
                      -
                    </span>
                    <input
                      type="number"
                      className="form-control count mx-2"
                      value={quantity}
                      readOnly
                    />
                    <span
                      onClick={() => handleUpdateQuantity(quantity + 1)}
                      className="btn btn-primary plus"
                    >
                      +
                    </span>
                  </div>
                </div>
                {user ? (
                  <button
                    type="button"
                    id="cart_btn"
                    className="btn btn-primary d-inline ml-4"
                    onClick={() => handleAddToCart(productDetails)}
                    disabled={productDetails?.stock > 0 ? false : true}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    type="button"
                    id="cart_btn"
                    className="btn btn-primary d-inline ml-4"
                    onClick={() => navigate("/login")}
                    disabled={productDetails?.stock > 0 ? false : true}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <p className="m-0">
                  Status:{" "}
                  <span id="stock_status">
                    {productDetails?.stock > 0 ? (
                      "In Stock"
                    ) : (
                      <span style={{ color: "red" }}>Out Of Stock</span>
                    )}
                  </span>
                </p>
                <p className="m-0">
                  Category:{" "}
                  <span id="stock_status">
                    {productDetails?.category?.name}
                  </span>
                </p>
              </div>
              <hr />
              <h4 className="mt-2">Description:</h4>
              <p>{productDetails?.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{productDetails?.seller}</strong>
              </p>

              {user ? (
                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={setUserRatings}
                >
                  Submit Your Review
                </button>
              ) : (
                <div type="alert" className="mt-5 alert alert-danger">
                  Login in to submit your review
                </div>
              )}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star" />
                            </li>
                            <li className="star">
                              <i className="fa fa-star" />
                            </li>
                            <li className="star">
                              <i className="fa fa-star" />
                            </li>
                            <li className="star">
                              <i className="fa fa-star" />
                            </li>
                            <li className="star">
                              <i className="fa fa-star" />
                            </li>
                          </ul>
                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />

                          <button
                            className="btn btn-primary my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={handleReview}
                            disabled={loader ? true : false}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {productDetails?.reviews && productDetails?.reviews?.length > 0 && (
        <Review reviews={productDetails.reviews} />
      )}
    </>
  );
};

export default SingleProduct;

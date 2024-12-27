import { MDBDataTable } from "mdbreact";
import MetaData from "../../../utils/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  allReviewsByAdmin,
  deleteReviewByAdmin,
} from "../../features/reviewsList/reviewsListApiSlice";
import { useEffect, useState } from "react";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/productsList/productsListSlice";
import swal from "sweetalert";

const ReviewsList = () => {
  const dispatch = useDispatch();

  const { reviews, loader, error, message } = useSelector(
    (state) => state.reviewsList
  );

  const [productId, setProductId] = useState("");

  // delete reviews
  const handleDeleteOrder = (id) => {
    const data = {
      productId: productId,
      reviewId: id,
    };

    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      {
        willDelete && dispatch(deleteReviewByAdmin(data));
      }
    });
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Review Id",
          field: "id",
        },
        {
          label: "Rating",
          field: "rating",
        },
        {
          label: "Comments",
          field: "comment",
        },
        {
          label: "User",
          field: "name",
        },
        {
          label: "Actions",
          field: "action",
        },
      ],
      rows: [],
    };

    reviews?.map((review) =>
      data.rows.push({
        id: review?._id,
        rating: review?.rating,
        comment: review?.comment,
        name: review?.name,
        action: (
          <>
            <button
              onClick={() => handleDeleteOrder(review?._id)}
              className="btn btn-sm btn-danger"
            >
              <div className="fas fa-trash"></div>{" "}
            </button>
          </>
        ),
      })
    );

    data.rows.reverse();
    return data;
  };

  const handleFindReviews = (e) => {
    e.preventDefault();

    dispatch(allReviewsByAdmin(productId));
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
  }, [dispatch, error, message]);

  return (
    <>
      <MetaData title={"Product Reviews"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                <form onSubmit={handleFindReviews}>
                  <div className="form-group">
                    <label htmlFor="productId_field">Enter Product ID</label>
                    <input
                      type="text"
                      id="productId_field"
                      className="form-control"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>

                  <button
                    id="search_button"
                    type="submit"
                    className="btn btn-primary btn-block py-2"
                    disabled={loader ? true : false}
                  >
                    {loader ? "SEARCHING . . ." : "SEARCH"}
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-5">
              {reviews && reviews.length > 0 ? (
                <MDBDataTable
                  data={setReviews()}
                  className="px-3"
                  bordered
                  striped
                  hover
                />
              ) : (
                <p className="mt-5 text-center">No Reviews.</p>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default ReviewsList;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductsByAdmin,
} from "../../features/productsList/productsListApiSlice";
import MainLoader from "../../../utils/MainLoader";
import { MDBDataTable } from "mdbreact";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/productsList/productsListSlice";
import Sidebar from "./Sidebar";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Metadata from "../../../utils/MetaData"; // Ensure this is correctly exported


const ProductList = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loader, products, message } = useSelector(
    (state) => state.productsList
  );

  useEffect(() => {
    dispatch(getAllProductsByAdmin());
  }, [dispatch]);

  const handleDeleteProduct = (id) => {
    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProduct(id));
      }
    });
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

  useEffect(() => {
    console.log("Success");
  }, []);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "Product ID",
          field: "_id",
        },
        {
          label: "Image",
          field: "images",
        },
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Price",
          field: "price",
        },
        {
          label: "Brand",
          field: "brand",
        },
        {
          label: "Category",
          field: "category",
        },
        {
          label: "Ratings",
          field: "ratings",
        },
        {
          label: "Stock",
          field: "stock",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],

      rows: [],
    };

    {
      products &&
        products?.forEach((product) => {
          data.rows.push({
            _id: product?._id,
            images: (
              <img
                style={{ height: "40px", width: "70px", objectFit: "cover" }}
                src={
                  product?.images
                    ? product?.images[0]?.url
                    : "https://bitsofco.de/img/Qo5mfYDE5v-350.png"
                }
                alt="Logo"
              />
            ),
            name: product?.name,
            price: `$${product?.price}`,
            brand : product?.brand?.name,
            category : product?.category?.name,
            ratings: product?.ratings,
            stock: product?.stock,
            actions: (
              <>
                <button
                  onClick={() => {
                    navigate(`/admin/update-product/${product._id}`);
                  }}
                  className="btn btn-sm btn-warning mr-2"
                >
                  <div className="fas fa-edit"></div>{" "}
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="btn btn-sm btn-danger"
                >
                  <div className="fas fa-trash"></div>{" "}
                </button>
              </>
            ),
          });
        });
    }

    data.rows.reverse()
    return data;
  };

  return (
    <>
      <Metadata title={"All Products List"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">All Products</h1>
          {loader ? (
            <MainLoader />
          ) : (
            <MDBDataTable
              data={setProducts()}
              className="px-3"
              striped
              bordered
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;

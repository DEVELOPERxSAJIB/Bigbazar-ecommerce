import Sidebar from './Sidebar'
import MetaData from '../../../utils/MetaData'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/category/categorySlice";
import { timeAgo } from "../../helper/helper";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import MainLoader from "../../../utils/MainLoader";
import { deleteCategory, getAllCategory } from '../../features/category/categoryApiSlice';

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, message, error, loader } = useSelector(
    (state) => state.category
  );

  const setBrands = () => {
    const data = {
      columns: [
        {
          label: "Brand ID",
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
          label: "Created At",
          field: "createdAt",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],

      rows: [],
    };

    categories.forEach((item) => {
      data.rows.push({
        _id: item._id,
        images: (
          <img
            style={{
              height: "50px",
              width: "70px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
            src={
              item?.photo
                ? item?.photo?.url
                : "https://bitsofco.de/img/Qo5mfYDE5v-350.png"
            }
            alt="Logo"
          />
        ),
        name: item?.name,
        createdAt: timeAgo(item.createdAt),

        actions: (
          <>
            <button
              onClick={() => {
                navigate(`/admin/update-category/${item._id}`);
              }}
              className="btn btn-sm btn-warning mr-2"
            >
              <div className="fas fa-edit"></div>{" "}
            </button>
            <button
              onClick={() => handleDeleteCategory(item?._id)}
              className="btn btn-sm btn-danger"
            >
              <div className="fas fa-trash"></div>{" "}
            </button>
          </>
        ),
      });
    });

    data.rows.reverse();
    return data;
  };

  const handleDeleteCategory = (id) => {
    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(id));
      }
    });
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

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
      <div className="row">
        <MetaData title={"All Category"} />
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        {loader ? (
          <MainLoader />
        ) : (
          <div className="col-12 col-md-10">
            <div className="my-5">
              <div className="px-3 mb-3 d-flex align-items-center justify-content-between">
                <h1 className="">All Category</h1>
                <Link id="view_btn" className="btn" to={`/admin/create-category`}>
                  Add Category
                </Link>
              </div>
              <MDBDataTable
                data={setBrands()}
                className="px-3"
                striped
                bordered
                hover
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Category
import Sidebar from "./Sidebar";
import MetaData from "../../../utils/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import MainLoader from "../../../utils/MainLoader";
import { MDBDataTable } from "mdbreact";
import {
  deleteBanner,
  getAllBanner,
} from "../../features/banner/bannerApiSlice";
import { timeAgo } from "../../helper/helper";
import swal from "sweetalert";

const Banner = () => {
  const dispatch = useDispatch();

  const { banners, message, error, loader } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(getAllBanner());

    if (error) {
      AlertMessage({ type: "error", msg: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error]);

  const setBanners = () => {
    const data = {
      columns: [
        {
          label: "Banner ID",
          field: "id",
        },
        {
          label: "Banner",
          field: "images",
        },
        {
          label: "created At",
          field: "createdAt",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    banners?.forEach((banner) => {
      data.rows.push({
        id: banner?._id,
        images: (
          <img
            style={{
              height: "150px",
              width: "100%",
              objectFit: "cover",
              borderRadius: "5px",
              border: "1px solid rgba(255, 255, 255)",
            }}
            src={
              banner?.photo
                ? banner?.photo?.url
                : "https://bitsofco.de/img/Qo5mfYDE5v-350.png"
            }
            alt="Logo"
          />
        ),
        createdAt: timeAgo(banner?.createdAt),
        actions: (
          <Link
            onClick={() => handleDeleteBrand(banner?._id)}
            className="btn btn-danger"
          >
            <i className="fa fa-trash"></i>
          </Link>
        ),
      });
    });

    data.rows.reverse();
    return data;
  };

  const handleDeleteBrand = (id) => {
    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteBanner(id));
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


  return (
    <>
      <MetaData title={"Hero banners"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          {loader ? (
            <MainLoader />
          ) : (
            <div className="my-5">
              <div className="px-3 mb-3 d-flex align-items-center justify-content-between">
                <h1 className="">All Banners</h1>
                <Link
                  id="view_btn"
                  className="btn"
                  to={`/admin/create-hero-banner`}
                >
                  Add New Banner
                </Link>
              </div>
              <MDBDataTable
                data={setBanners()}
                className="px-3"
                striped
                bordered
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Banner;

import Sidebar from "./Sidebar";
import MetaData from "../../../utils/MetaData";
import { FiUploadCloud } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBanner } from "../../features/banner/bannerApiSlice";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/category/categorySlice";
import { useNavigate } from "react-router-dom";

const CreateBanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, loader, error } = useSelector((state) => state.banner)

  // product images
  const [previewImage, setPreviewImage] = useState(null);
  const [photo, setPhoto] = useState(null);

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    // upload
    setPhoto(file);

    // preview
    setPreviewImage(URL.createObjectURL(file));
  };

  // submit form
  const handleCreateBanner = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (photo) {
      formData.append("banner-image", photo);
    }

    dispatch(createBanner({ data: formData }));
  };

  // remove image
  const handleRemoveImage = () => {
    setPhoto(null);
    setPreviewImage(null);
  };

  useEffect(() => {
    if (error) {
      AlertMessage({ type: "error", msg: error });
      dispatch(setMessageEmpty());
    }

    if (message) {
      AlertMessage({ type: "success", msg: message });
      dispatch(setMessageEmpty());
      setPhoto(null);
      setPreviewImage(null);
      navigate("/admin/hero-banner")
    }
  }, [dispatch, error, message, navigate]);

  return (
    <div className="row">
      <MetaData title={"Hero banners"} />
      <div className="col-md-2">
        <Sidebar />
      </div>

      <div className="col-md-10">
        <h5 className="my-3">Create Hero Banner</h5>
        <form onSubmit={handleCreateBanner} action="">
          {previewImage ? (
            <div
              style={{ maxHeight: "300px", maxWidth: "100%" }}
              className="image-container mb-3"
            >
              <div className="img-area shadow-sm">
                {previewImage && (
                  <>
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        display: "block",
                        objectFit: "cover",
                      }}
                      className="item-img p-1 rounded border-light"
                    >
                      <img src={previewImage} alt="" />
                      <div onClick={handleRemoveImage} className="cross-btn mt-1 mr-1">
                        <span>
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="upload-section shadow-sm">
              <label className="d-block" htmlFor="cntwhic">
                <FiUploadCloud htmlFor="cntwhic" size={45} />
                <p>Upload banner image</p>
                <input id="cntwhic" onChange={handlePhoto} type="file" hidden />
              </label>
            </div>
          )}

          <div className="my-3">
            <button
              style={{
                border: "0",
                width: "100%",
                backgroundColor: "#0F172A",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              type="submit"
              className="upload-button shadow-sm"
              disabled={loader? true : false}
            >
              {loader ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBanner;

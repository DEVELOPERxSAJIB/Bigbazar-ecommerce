import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../../utils/MetaData";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/productsList/productsListSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getAllBrand, updateBrand } from "../../features/brand/brandApiSlice";

const UpdateBrand = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { brands } = useSelector((state) => state.brand);
  const { message, error, loader } = useSelector((state) => state.brand);

  const [getBrandWithId, setGetBrandWithId] = useState();

  useEffect(() => {
    dispatch(getAllBrand(id));
  }, [dispatch, id]);

  // product images
  const [previewImage, setPreviewImage] = useState(null);
  const [previewOldImage, setPreviewOldImage] = useState([]);

  const [photo, setPhoto] = useState(null);
  // get input data
  const [input, setInput] = useState({
    name: getBrandWithId?.name,
  });

  useEffect(() => {
    const brand = brands.find((brand) => brand._id === id);
    setGetBrandWithId(brand);

    setPreviewOldImage(brand?.photo?.url);
  }, [brands, id]);

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    // upload
    setPhoto(file);

    // preview
    setPreviewImage(URL.createObjectURL(file));
  };

  // change input value with name
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditBrand = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    if (photo) {
      formData.append("brand-image", photo);
    }

    dispatch(updateBrand({ data: formData, id: id }));
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
      setInput({
        name: "",
      });
      setPhoto(null);
      setPreviewImage(null);
      navigate("/admin/brand")
    }
  }, [dispatch, error, message, navigate]);

  // show previous data of product
  useEffect(() => {
    setInput({
      ...getBrandWithId,
    });
  }, [getBrandWithId]);

  return (
    <div className="row">
      <MetaData title={"Update brand"} />
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-3"></div>
      <div className="col-12 col-md">
        <h1 className="my-3">Update brand</h1>
        <div className="mb-5">
          <form onSubmit={handleEditBrand} className="shadow-sm border p-5">
            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={input.name}
                onChange={handleInputChange}
              />
            </div>

            <div style={{ height: "100%" }} className="image-container mb-3">
              <div className="img-area shadow-sm">
                {previewImage && (
                  <>
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        display: "block",
                      }}
                      className="item-img p-1 border rounded border-light"
                    >
                      <img src={previewImage} alt="" />
                      <div
                        onClick={handleRemoveImage}
                        className="cross-btn mt-1 mr-1"
                      >
                        <span>
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Image</label>
              <div className="custom-file">
                <input
                  type="file"
                  onChange={handlePhoto}
                  className="custom-file-input"
                  id="customFile"
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Images
                </label>
              </div>{" "}
            </div>

            <b>Current Images</b>
            <div style={{ height: "100%" }} className="image-container mb-3">
              <div className="img-area shadow-sm">
                {previewOldImage && (
                  <>
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        display: "block",
                      }}
                      className="item-img p-1 border rounded border-light"
                    >
                      <img src={previewOldImage} alt="" />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 text-danger text-center">
              <h6>New Images will be replace old images</h6>
            </div>

            <button
              id="view_btn"
              type="submit"
              className="btn btn-block"
              disabled={loader ? true : false}
            >
              {loader ? "UPDATING . . ." : "UPDATE"}
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
};

export default UpdateBrand;

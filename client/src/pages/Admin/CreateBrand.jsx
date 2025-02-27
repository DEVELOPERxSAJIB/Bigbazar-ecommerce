import { useEffect, useState } from "react";
import MetaData from "../../../utils/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { createBrand } from "../../features/brand/brandApiSlice";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/brand/brandSlice";

const CreateBrand = () => {

  const dispatch = useDispatch();
  const { message, error, loader } = useSelector(state => state.brand);

  // product images
  const [previewImage, setPreviewImage] = useState(null);
  const [photo, setPhoto] = useState(null);
  // get input data
  const [input, setInput] = useState({
    name: "",
  });

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

  // submit form
  const handleCreateBrand = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("badge", input.badge);
    if (photo) {
      formData.append("brand-image", photo);
    }

    dispatch(createBrand(formData));
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
    }
  }, [dispatch, error, message]);

  return (
    <div className="row">
      <MetaData title={"Create new brand"} />
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-3"></div>
      <div className="col-12 col-md">
        <h1 className="my-3">Create brand</h1>
        <div className="mb-5">
          <form
            onSubmit={handleCreateBrand}
            className="shadow-sm border p-5"
          >
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
                      className="item-img p-1 border rounded border-light bg-dark"
                    >
                      <img src={previewImage} alt="" />
                      <div onClick={handleRemoveImage} className="cross-btn">
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

            <button
              id="view_btn"
              type="submit"
              className="btn btn-block"
              disabled={loader ? true : false}
            >
              {loader ? "CREATING . . ." : "CREATE"}
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
};

export default CreateBrand;

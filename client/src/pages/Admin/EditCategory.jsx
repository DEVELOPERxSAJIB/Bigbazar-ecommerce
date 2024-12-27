import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../../utils/MetaData";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/productsList/productsListSlice";
import { useNavigate, useParams } from "react-router-dom";
import { editCategory, getAllCategory } from "../../features/category/categoryApiSlice";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, message, error, loader } = useSelector((state) => state.category);

  const [singleCategory, setSingleCategory] = useState();

  // product images
  const [previewImage, setPreviewImage] = useState(null);
  const [previewOldImage, setPreviewOldImage] = useState([]);

  const [photo, setPhoto] = useState(null);
  // get input data
  const [input, setInput] = useState({
    name: "",
  });

  useEffect(() => {
    const category = categories.find((categroy) => categroy._id === id);
    setSingleCategory(category);

    setPreviewOldImage(category?.photo?.url);
  }, [categories, id]);

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

  const handleEditCategory = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    if (photo) {
      formData.append("category-image", photo);
    }

    dispatch(editCategory({ data: formData, id: id }));
  };

  // remove image
  const handleRemoveImage = () => {
    setPhoto(null);
    setPreviewImage(null);
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch, id]);

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
      navigate("/admin/category")
    }
  }, [dispatch, error, message, navigate]);

  // show previous data of product
  useEffect(() => {
    setInput({
      ...singleCategory,
    });
  }, [singleCategory]);

  return (
    <div className="row">
      <MetaData title={"Update Category"} />
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-3"></div>
      <div className="col-12 col-md">
        <h1 className="my-3">Update Category</h1>
        <div className="mb-5">
          <form onSubmit={handleEditCategory} className="shadow-sm border p-5">
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

export default EditCategory
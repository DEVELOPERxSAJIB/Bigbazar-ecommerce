import "../../../src/index.css";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MetaData from "../../../utils/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsByAdmin,
  updateProductByAdmin,
} from "../../features/productsList/productsListApiSlice";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/productsList/productsListSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategory } from "../../features/category/categoryApiSlice";
import { getAllBrand } from "../../features/brand/brandApiSlice";

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const { brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllBrand());
  }, [dispatch]);

  const { error, loader, products, message } = useSelector(
    (state) => state.productsList
  );

  const [previewImage, setPreviewImage] = useState([]);
  const [previewOldImage, setPreviewOldImage] = useState([]);

  useEffect(() => {
    dispatch(getAllProductsByAdmin());
  }, [dispatch]);

  // filter solo product
  const [product, setProduct] = useState({});

  useEffect(() => {
    const singleProductDetails = products?.find(
      (data) => data?._id === params?.id
    );
    setProduct(singleProductDetails);

    let productImg = [];
    singleProductDetails?.images?.map((item) => productImg.push(item.url));
    setPreviewOldImage(productImg);
  }, [params, products]);

  // init data of product
  const [input, setInput] = useState({
    name: "",
    price: "",
    description: "",
    seller: "",
    category: "",
    brand : "",
    stock: "",
  });

  // getting form values
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // product images
  const [photo, setPhoto] = useState();

  const handlePhotos = (e) => {
    const files = e.target.files;

    // upload
    setPhoto([...files]);

    // preview
    if (files && files.length > 0) {
      let newImagePreview = [];
      Array.from(files).forEach((file) => {
        newImagePreview.push(URL.createObjectURL(file));
      });
      setPreviewImage(newImagePreview);
    }
  };

  // remove images
  const handleRemoveImg = (index) => {
    // upload
    const newPhotos = [...photo];
    newPhotos.splice(index, 1);
    setPhoto(newPhotos);

    // preview
    const newPreviewImg = [...previewImage];
    newPreviewImg.splice(index, 1);
    setPreviewImage(newPreviewImg);
  };

  // update product
  const handleUpdateProduct = (e) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("name", input.name);
    form_data.append("price", input.price);
    form_data.append("description", input.description);
    form_data.append("seller", input.seller);
    form_data.append("category", input.category);
    form_data.append("brand", input.brand);
    form_data.append("stock", input.stock);

    photo?.forEach((item) => {
      form_data.append("products-photo", item);
    });

    dispatch(updateProductByAdmin({ id: params.id, data: form_data }));
  };

  useEffect(() => {
    if (error) {
      AlertMessage({ type: "error", msg: error });
      dispatch(setMessageEmpty());
    }

    if (message) {
      AlertMessage({ type: "success", msg: message });
      dispatch(setMessageEmpty());
      navigate("/admin/products");
      setPhoto([]);
      setPreviewImage([]);
    }
  }, [dispatch, error, message, navigate]);

  // show previous data of product
  useEffect(() => {
    setInput({
      ...product,
      category: product?.category?._id,
      brand: product?.brand?._id,
    });
  }, [product]);

  return (
    <>
      <div className="row">
        <MetaData title={"Update Product"} />
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-md-2"></div>
        <div className="col-12 col-md-6">
          <div className="my-5">
            <form
              onSubmit={handleUpdateProduct}
              className="shadow-sm border p-4"
              encType="multipart/form-data"
            >
              <h1 className="mb-4">Update Product</h1>
              <div className="form-row">
                <div className="form-group col-md-4">
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
                <div className="form-group col-md-4">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    name="price"
                    value={input.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="category_field">Category</label>
                  <select
                    name="category"
                    value={input.category}
                    onChange={handleInputChange}
                    className="form-control"
                    id="category_field"
                    defaultValue={product?.category}
                  >
                    <option>-Select a category-</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category?._id}>
                        {category?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md">
                  <label htmlFor="brand">Brand</label>
                  <select
                    name="brand"
                    value={input.brand}
                    onChange={handleInputChange}
                    className="form-control"
                    id="brand"
                    defaultValue={product?.brand}
                  >
                    <option>-Select a brand-</option>
                    {brands.map((brand, index) => (
                      <option key={index} value={brand?._id}>
                        {brand?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    name="stock"
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={input.stock}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    name="seller"
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={input.seller}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows={5}
                  name="description"
                  value={input.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Images</label>
                <div className="custom-file">
                  <input
                    type="file"
                    onChange={handlePhotos}
                    className="custom-file-input"
                    id="customFile"
                    multiple
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>{" "}
              </div>

              {previewImage.length > 0 && (
                <>
                  <b>New Images</b>
                  <div className="image-container">
                    <div className="img-area">
                      {previewImage?.map((img, index) => (
                        <div className="item-img" key={index}>
                          <img src={img} alt="" />
                          <div
                            onClick={() => handleRemoveImg(index)}
                            className="cross-btn"
                          >
                            <span>
                              <i
                                className="fa fa-trash-o"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <b>Old Images</b>
              <div className="image-container">
                <div className="img-area">
                  {previewOldImage?.map((img) => (
                    <div className="item-img shadow-sm" key={img?.url}>
                      <img src={img} alt="" />
                    </div>
                  ))}
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
        <div className="col-md-2"></div>
      </div>
    </>
  );
};

export default ProductDetails;

import { useEffect, useState } from "react";
import MetaData from "../../../utils/MetaData";
import { getAllProducts } from "../../features/products/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import MainLoader from "../../../utils/MainLoader";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/products/productSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Ratings from "../../components/Ratings/Ratings";
import { getAllCategory } from "../../features/category/categoryApiSlice";
import { getAllBrand } from "../../features/brand/brandApiSlice";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const keyword = params.keyword;

  const { products, loader, message, error, resPerPage, productCount } =
    useSelector((state) => state.product);
  const { categories: productCategory } = useSelector(
    (state) => state.category
  );
  const { brands } = useSelector((state) => state.brand);

  const newObj = { name: "All", _id: "All" };
  const categories = [newObj, ...productCategory];

  const [addClass, setAddClass] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(0);
  const [category, setCategory] = useState("");

  const setCurrentPageNumber = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  // Sorting
  const [sort, setSort] = useState("default");

  const handleSorting = (e) => {
    e.preventDefault();

    let selectedSortValue = e.target.value;
    setSort(selectedSortValue);
  };

  // get pricing range from form
  const [priceRange, setPriceRange] = useState(0);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const handlePriceFilterSubmit = (e) => {
    e.preventDefault();

    setPriceRange({ minPrice: Number(minPrice), maxPrice: Number(maxPrice) });
  };

  // Filter with ratings
  const [ratings, setRatings] = useState(0);
  const handleRatings = (e) => {
    setRatings(e.target.value);
  };

  // Filter with brand names
  const [selectedBrands, setSelectedBrands] = useState([params?.brandId]);

  // Step 2: Handle checkbox changes (store brand names)
  const handleCheckboxChange = (brandId) => {
    setSelectedBrands((prevSelected) => {
      if (prevSelected.includes(brandId)) {
        // If the brand is already selected, remove it
        return prevSelected.filter((id) => id !== brandId);
      }
      // If the brand is not selected, add it
      return [...prevSelected, brandId];
    });
  };

  useEffect(() => {
    const brand =
      selectedBrands.length > 0
        ? selectedBrands
        : params.brandId
        ? Array.isArray(params.brandId)
          ? params.brandId
          : [params.brandId]
        : [];

    dispatch(getAllCategory());
    dispatch(getAllBrand());
    dispatch(
      getAllProducts({
        currentPage,
        pageSize,
        keyword,
        category: category ? category : params?.catId,
        priceRange,
        brand,
        sort,
        ratings,
      })
    );
  }, [
    category,
    currentPage,
    dispatch,
    keyword,
    pageSize,
    params.brandId,
    params.catId,
    priceRange,
    ratings,
    selectedBrands,
    sort,
  ]);

  useEffect(() => {
    if (message) {
      AlertMessage({ type: "success", msg: message });
      dispatch(setMessageEmpty());
    }

    if (error) {
      AlertMessage({ type: "error", msg: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message]);

  const handleAddNewClass = (index) => {
    setAddClass(index);
  };

  return (
    <>
      <MetaData title={"Search Result"} />

      <section id="products" className="container">
        <h3 id="products_heading">Search result</h3>

        <div className="row">
          <div className="col-6 col-md-3 mt-5 mb-5">
            <div className="px-1">
              <h4 className="mb-3">Pricing</h4>
              <form onSubmit={handlePriceFilterSubmit} className="price-range">
                <div className="d-flex align-items-center justify-content-around w-100">
                  <input
                    type="number"
                    name="min_price"
                    className="form-control text-center"
                    placeholder="$min"
                    style={{ width: "32%" }}
                    value={minPrice >= 0 ? minPrice : 0}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span className="delimiter">-</span>
                  <input
                    type="number"
                    name="max_price"
                    className="form-control text-center"
                    placeholder="$max"
                    style={{ width: "32%" }}
                    value={0 <= maxPrice ? maxPrice : 0}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-rounded"
                    style={{
                      width: "20%",
                      background: "#10ac84",
                      color: "#fff",
                    }}
                  >
                    Go
                  </button>
                </div>
              </form>

              <hr className="my-4" />
              <div className="mt-3">
                <h4 className="mb-3">Categories</h4>

                <ul className="pl-0">
                  {categories?.map((category, index) => (
                    <li
                      style={{
                        cursor: "pointer",
                        listStyleType: "none",
                      }}
                      key={category}
                      onClick={() => {
                        handleAddNewClass(index);
                        setCategory(
                          category?._id === "All" ? "" : category?._id
                        );
                      }}
                    >
                      <span
                        className={`${
                          addClass === index ||
                          (!addClass && category._id === params.catId)
                            ? "selected-category"
                            : ""
                        }`}
                      >
                        {category?.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {keyword ? (
                ""
              ) : (
                <>
                  {" "}
                  <hr className="my-4" />
                  <div className="mt-3">
                    <h4 className="mb-3">Brands</h4>

                    <ul className="pl-0">
                      {brands?.map((brand, index) => (
                        <li
                          style={{
                            cursor: "pointer",
                            listStyleType: "none",
                          }}
                          key={brand?._id}
                        >
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`brand-checkbox-${index}`}
                              checked={selectedBrands.includes(brand?._id)}
                              onChange={() => handleCheckboxChange(brand?._id)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`brand-checkbox-${index}`}
                            >
                              {brand?.name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              <hr className="my-4" />
              <div className="mt-3">
                <h4 className="mb-3">Ratings</h4>

                <ul className="pl-0">
                  {[5, 4, 3, 2, 0].map((item) => (
                    <>
                      <div className="d-flex gap-1 flex-col">
                        <label htmlFor="ratings">
                          <input
                            value={item}
                            onChange={handleRatings}
                            name="selectedRating"
                            id="ratings"
                            type="radio"
                          />
                          <Ratings value={item} size="small" />
                        </label>
                      </div>
                    </>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-9">
            <div className="row px-3">
              <div className="border border-1 p-3 w-100">
                <div className="d-flex justify-content-end">
                  <div className="d-flex align-items-center toolbox-item toolbox-sort select-box text-dark">
                    <strong className="d-block mr-3">Sort</strong>
                    <select
                      onChange={handleSorting}
                      name="orderby"
                      className="form-control"
                    >
                      <option value="default" selected="selected">
                        Default
                      </option>
                      <option value="date">Sort by latest</option>
                      <option value="price-low">Price: (Low to high)</option>
                      <option value="price-high">Price: (High to Low)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {loader ? (
              <MainLoader />
            ) : (
              <>
                {products ? (
                  <div className="row">
                    {products &&
                      products?.map((item) => {
                        return (
                          <div
                            key={item?._id}
                            className="col-sm-12 col-md-6 col-lg-4 my-3"
                          >
                            <div className="card p-3 rounded">
                              <img
                                style={{
                                  objectFit: "cover",
                                  objectPosition: "top center",
                                }}
                                className="card-img-top mx-auto"
                                src={item?.images[0]?.url}
                              />
                              <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                  <Link
                                    onClick={() => handleViewDetails(item._id)}
                                  >
                                    {item.name}
                                  </Link>
                                </h5>
                                <div className="ratings mt-auto">
                                  <div className="d-flex align-items-center mt-auto">
                                    <Ratings
                                      value={item?.ratings}
                                      size="small"
                                    />
                                    <span id="no_of_reviews">
                                      ({item?.numOfReviews} Reviews)
                                    </span>
                                  </div>
                                  <span id="no_of_reviews">
                                    ({item?.numOfReviews} Reviews)
                                  </span>
                                </div>
                                <p className="card-text">${item?.price}</p>
                                <Link
                                  id="view_btn"
                                  className="btn btn-block"
                                  onClick={() => handleViewDetails(item?._id)}
                                >
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="text-center mt-5 align-items-middle">
                    <h1 style={{ color: "#10AC84" }} className="display-4">
                      Oops!
                    </h1>
                    <h5 className="lead">No such product found.</h5>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {productCount >= resPerPage && (
        <div className="d-flex justify-content-center my-5">
          <Pagination
            prevPageText={"Previous"}
            nextPageText={"Next"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount
            onChange={setCurrentPageNumber}
          />
        </div>
      )}
    </>
  );
};

export default Search;

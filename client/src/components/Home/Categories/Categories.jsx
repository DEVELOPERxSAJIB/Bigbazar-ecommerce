import "./Categories.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../features/category/categoryApiSlice";

const Categories = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <div className="section mt-4">
      <div className="container">
        <h3 className="mb-3 p-0">Top Categories</h3>
        <div className="row">
          {[...categories].reverse().map((category) => (
            <>
              <div
                key={category?._id}
                className="col-lg-8r text-center col-md-8r  p-2"
              >
                <Link
                  to={`/search/category/${category?._id}`}
                  style={{ textDecoration: "none" }}
                  className="card shadow-sm border-0 h-100 rounded-3 bg-white hover-card"
                >
                  <div className="card-body">
                    <div
                      style={{
                        height: "70px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      className="img-area"
                    >
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                        src={category?.photo?.url}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#222",
                        cursor: "pointer",
                      }}
                      className="mt-3"
                    >
                      {category?.name}
                    </p>
                  </div>
                </Link>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;

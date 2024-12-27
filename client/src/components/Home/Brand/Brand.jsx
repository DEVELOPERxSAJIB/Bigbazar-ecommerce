import "../Categories/Categories.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllBrand } from "../../../features/brand/brandApiSlice";

const Brand = () => {
  const disptach = useDispatch();
  const { brands } = useSelector((state) => state.brand);

  useEffect(() => {
    disptach(getAllBrand());
  }, [disptach]);

  return (
    <div className="section my-5">
      <div className="container p-0">
        <h3 className="mb-3 p-0">Top Brands</h3>
        <div className="row">
          {[...brands]?.reverse().map((brand) => {
            return (
              <>
                <div
                  key={brand?._id}
                  className="col-lg-8r text-center col-md-8r p-2"
                >
                  <Link
                    to={`search/brand/${brand._id}`}
                    style={{ textDecoration: "none" }}
                    className="card shadow-sm border-0 rounded-3 bg-white hover-card"
                  >
                    <div className="card-body">
                      <div
                        style={{ height: "70px", width: "100%", objectFit : "cover" }}
                        className="img-area"
                      >
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit : "cover"
                          }}
                          alt="photo"
                          src={brand?.photo?.url}
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
                        {brand?.name}
                      </p>
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Brand;

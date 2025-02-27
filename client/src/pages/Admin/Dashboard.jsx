import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../../utils/MetaData";
import MainLoader from "../../../utils/MainLoader";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { getAllProductsByAdmin } from "../../features/productsList/productsListApiSlice";
import { getAllOrdersByAdmin } from "../../features/orderList/orderListApiSlice";
import { getAllUsersByAdmin } from "../../features/usersList/usersListApiSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { loader } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.usersList);
  const { products } = useSelector((state) => state.productsList);
  const { orders, totalAmount } = useSelector((state) => state.ordersList);

  // Find out of stock products
  let outOfStock = 0;
  products?.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAllProductsByAdmin());
    dispatch(getAllOrdersByAdmin());
    dispatch(getAllUsersByAdmin());
  }, [dispatch]);


  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <MetaData title={"Admin Dashboard"} />
        <div className="col-12 col-md-10">
          <h1 className="my-4">Dashboard</h1>

          {loader ? (
            <MainLoader />
          ) : (
            <>
              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total Amount
                        <br /> <b>${Number(totalAmount).toFixed(2)}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Products
                        <br /> <b>{products?.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/products"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-danger o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Orders
                        <br /> <b>{orders?.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/orders"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-info o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Users
                        <br /> <b>{users?.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/users"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-warning o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Out of Stock
                        <br /> <b>{outOfStock ? outOfStock : "Stock Full"}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

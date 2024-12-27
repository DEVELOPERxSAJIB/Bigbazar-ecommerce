import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../../utils/MetaData";
import MainLoader from "../../../utils/MainLoader";
import { useEffect } from "react";
import { myOrders } from "../../features/order/orderApiSlice";
import AlertMessage from "../../../utils/AlertMessage";
import { MDBDataTable } from "mdbreact";
import { setMessageEmpty } from "../../features/order/orderSlice";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { orders, error, loader } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      AlertMessage({ type: "error", msg: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
        },
        {
          label: "Items",
          field: "numOfItems",
        },
        {
          label: "Amount",
          field: "amount",
        },
        {
          label: "Status",
          field: "status",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    orders?.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    data.rows.reverse();
    return data;
  };
  return (
    <>
      <MetaData title={"My Orders"} />
      {loader && <MainLoader />}


      <div className="container my-5">
      <h1 className="my-5 mx-3">My Orders</h1>
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          striped
          bordered
          hover
        />
      </div>
    </>
  );
};

export default MyOrders;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrderByAdmin,
  getAllOrdersByAdmin,
} from "../../features/orderList/orderListApiSlice";
import MetaData from "../../../utils/MetaData";
import MainLoader from "../../../utils/MainLoader";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/orderList/orderListSlice";
import Sidebar from "./Sidebar";
import { MDBDataTable } from "mdbreact";
import { timeAgo } from "../../helper/helper";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loader, error, message } = useSelector(
    (state) => state.ordersList
  );

  useEffect(() => {
    dispatch(getAllOrdersByAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      AlertMessage({ type: "error", msg: error });
      dispatch(setMessageEmpty());
    }

    if (message) {
      AlertMessage({ type: "success", msg: message });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message]);

  // See full details
  const handleOrderDetails = (id) => {
    navigate(`/admin/orders/${id}`);
  };

  // Delete order
  const handleDeleteOrder = (id) => {
    console.log(id);
    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteOrderByAdmin(id));
      }
    });
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "_id",
        },
        {
          label: "No of Items",
          field: "numOfItems",
        },
        {
          label: "Amount",
          field: "amount",
        },
        {
          label: "Ordered At",
          field: "orderedAt",
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

    orders.forEach((order) => {
      data.rows.push({
        _id: order._id,
        numOfItems: order?.orderItems?.length,
        amount: `$${order.totalPrice}`,
        orderedAt: timeAgo(order.createdAt),
        status:
          order?.orderStatus &&
          String(order?.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order?.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order?.orderStatus}</p>
          ),

        actions: (
          <>
            <button
              onClick={() => handleOrderDetails(order?._id)}
              className="btn btn-sm btn-success mr-2"
            >
              <div className="fas fa-eye"></div>{" "}
            </button>
            <button
              onClick={() => handleDeleteOrder(order?._id)}
              className="btn btn-sm btn-danger"
            >
              <div className="fas fa-trash"></div>{" "}
            </button>
          </>
        ),
      });
    });

    data.rows.reverse();
    return data;
  };

  return (
    <>
      <MetaData title={"Orders store"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">All Orders</h1>
          {loader ? (
            <MainLoader />
          ) : (
            <MDBDataTable
              data={setOrders()}
              className="px-3"
              striped
              bordered
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OrderList;

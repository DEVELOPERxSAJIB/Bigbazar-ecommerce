import { createSlice } from "@reduxjs/toolkit";
import {
  deleteOrderByAdmin,
  getAllOrdersByAdmin,
  orderDetailsByAdmin,
  updateOrderByAdmin,
} from "./orderListApiSlice";

const orderListSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    orderDetails: null,
    totalAmount: 0,
    loader: false,
    message: null,
    error: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersByAdmin.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllOrdersByAdmin.fulfilled, (state, actions) => {
        state.loader = false;
        state.message = null;
        state.orders = actions.payload.payload.orders;
        state.totalAmount = actions.payload.payload.totalAmount;
      })
      .addCase(getAllOrdersByAdmin.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      })
      .addCase(orderDetailsByAdmin.pending, (state) => {
        state.loader = true;
      })
      .addCase(orderDetailsByAdmin.fulfilled, (state, actions) => {
        state.loader = false;
        state.orderDetails = actions.payload.payload.order;
      })
      .addCase(orderDetailsByAdmin.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      })
      .addCase(updateOrderByAdmin.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateOrderByAdmin.fulfilled, (state, actions) => {
        state.loader = false;
        state.message = actions.payload.message;
        state.orderDetails = actions.payload.payload.order;
      })
      .addCase(updateOrderByAdmin.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      })
      .addCase(deleteOrderByAdmin.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteOrderByAdmin.fulfilled, (state, actions) => {
        state.loader = false;
        state.message = actions.payload.message;
        state.orders = state.orders.filter(
          (data) => data._id !== actions.payload.payload.order._id
        );
      })
      .addCase(deleteOrderByAdmin.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      });
  },
});

// export reducers

// export actions
export const { setMessageEmpty } = orderListSlice.actions;

// export default
export default orderListSlice.reducer;

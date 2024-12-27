import { createSlice } from "@reduxjs/toolkit";
import { createOrder, myOrders, singleOrderDetails } from "./orderApiSlice";

const orderSlice = createSlice({
    name : "orders",
    initialState : {
        orders : [],
        newOrder : [],
        orderDetails : null,
        loader : false,
        message : null,
        error : null,
    },
    reducers : {
        setMessageEmpty : (state) => {
            state.message = null;
            state.error = null;
        }
    },

    extraReducers : (builder) => {
        builder
        .addCase(createOrder.pending, (state) => {
            state.loader = true
        }).addCase(createOrder.fulfilled, (state, action) => {
            state.loader = false
            state.newOrder = action.payload.payload.order
        }).addCase(createOrder.rejected, (state, action) => {
            state.loader = false
            state.newOrder = null
            state.error = action.error.message
        })
        .addCase(myOrders.pending, (state) => {
            state.loader = true
        }).addCase(myOrders.fulfilled, (state, action) => {
            state.loader = false
            state.orders = action.payload.payload.order
        }).addCase(myOrders.rejected, (state, action) => {
            state.loader = false
            state.orders = null
            state.error = action.error.message
        })
        .addCase(singleOrderDetails.pending, (state) => {
            state.loader = true
        }).addCase(singleOrderDetails.fulfilled, (state, action) => {
            state.loader = false
            state.orderDetails = action.payload.payload.order
        }).addCase(singleOrderDetails.rejected, (state, action) => {
            state.loader = false
            state.orderDetails = null
            state.error = action.error.message
        })
    }

})

// export reducers

// export actions
export const { setMessageEmpty } = orderSlice.actions

// export default
export default orderSlice.reducer
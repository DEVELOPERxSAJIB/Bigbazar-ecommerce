import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

// get all products
export const createOrder = createAsyncThunk(
  "order/createOreder",
  async (order) => {
    try {
      const response = await api.post(`/order/create-order`,
        order,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// get orders of login user
export const myOrders = createAsyncThunk("order/myOrders", async () => {
  try {
    const response = await api.get(`/order/my-orders`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Single orders details
export const singleOrderDetails = createAsyncThunk(
  "order/singleOrderDetails",
  async (id) => {
    try {
      const response = await api.get(`/order/get-single-order/${id}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api"

// Get all orders by Admin
export const getAllBanner = createAsyncThunk("banner/getAllBanner", async () => {
  try {
    const response = await api.get(`/banner`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Create banner
export const createBanner = createAsyncThunk("banner/createBanner", async (data) => {
  try {
    const response = await api.post(`/banner`, data.data, {
      withCredentials: true,
    });
    return response.data;

  } catch (error) {
    throw new Error(error.response.data.message);
  }
});


// Delete banner
export const deleteBanner = createAsyncThunk("banner/deleteBanner", async (id) => {
  try {
    const response = await api.delete(`/banner/${id}`, {
      withCredentials: true,
    });
    return response.data;

  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

// Get all users by admin
export const allReviewsByAdmin = createAsyncThunk(
  "users/allReviewsByAdmin",
  async (id) => {
    try {
      const response = await api.get(`/products/find-reviews-of-product/${id}`,
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

// Delete product review by admin
export const deleteReviewByAdmin = createAsyncThunk(
  "users/deleteReviewByAdmin",
  async (data) => {
    try {
      const response = await api.delete(`/products/delete-product-review`,
        {data},
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

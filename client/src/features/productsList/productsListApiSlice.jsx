import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

// Get all products by admin
export const getAllProductsByAdmin = createAsyncThunk(
  "product/getAllProductsByAdmin",
  async () => {
    try {
      const response = await api.get(`/products/admin/get-all-products`,
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

// Create product by admin
export const createProductByAdmin = createAsyncThunk(
  "product/createProductByAdmin",
  async (data) => {
    try {
      const response = await api.post(`/products/create-product`,
        data,
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

// Update product by admin
export const updateProductByAdmin = createAsyncThunk(
  "product/updateProductByAdmin",
  async (data) => {
    try {
      const response = await api.put(`/products/admin/${data.id}`,
        data.data,
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

// Delete product by admin
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    try {
      const response = await api.delete(`/products/admin/${id}`,
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

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api"


// get all category
export const getAllCategory = createAsyncThunk(
  "category/getAllCategory",
  async () => {
    try {
      const response = await api.get(`/category`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Create Category
export const createCategory = createAsyncThunk("category/createCategory", async (data) => {
  try {
    const response = await api.post(`/category`, data, {
      withCredentials: true,
    });
    return response.data;

  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Edit Category
export const editCategory = createAsyncThunk("category/editCategory", async (data) => {
  try {
    const response = await api.put(`/category/${data.id}`, data.data, {
      withCredentials: true,
    });
    return response.data;

  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Delete Category
export const deleteCategory = createAsyncThunk("category/deleteCategory", async (id) => {
  try {
    const response = await api.delete(`/category/${id}`, {
      withCredentials: true,
    });
    return response.data;

  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
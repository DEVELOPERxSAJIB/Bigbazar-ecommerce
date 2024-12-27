import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

// get all products
export const getAllProducts = createAsyncThunk(
  "product/getAllProduct",
  async ({ currentPage, pageSize, keyword, category, brand, priceRange, sort, ratings }) => {
    try {
      // let apiUrl = `${api}/products?page=${currentPage}&pageSize=${pageSize}`;
      let apiUrl = `/products?page=${currentPage}&pageSize=${pageSize}`;

      // Append the keyword to the URL if it is present
      if (keyword) {
        apiUrl += `&keyword=${keyword}`;
      }

      // Append the category to the URL if it is present
      if (category) {
        apiUrl += `&category=${category}`;
      }

      // Append the brand to the URL if it is present
      if (brand) {
        apiUrl += `&brand=${brand}`;
      }

      // Append the priceRange to the URL if it is present
      if (priceRange) {
        apiUrl += `&price=${priceRange.minPrice}-${priceRange.maxPrice}`;
      }

      // Append the priceRange to the URL if it is present
      if (ratings) {
        apiUrl += `&ratings=${ratings}-${5}`;
      }

      // Append the date to the URL if it is present
      if (sort) {
        apiUrl += `&orderby=${sort}`;
      }

      console.log(apiUrl);

      const response = await api.get(apiUrl, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// get single product
export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  async (id) => {
    try {
      const response = await api.get(`/products/${id}`,
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

// create a review
export const createReview = createAsyncThunk(
  "product/createReview",
  async (data) => {
    try {
      const response = await api.put(`/products/review-product/${data.id}`,
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

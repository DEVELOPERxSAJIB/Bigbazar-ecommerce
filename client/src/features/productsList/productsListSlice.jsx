import { createSlice } from "@reduxjs/toolkit";
import {
  createProductByAdmin,
  deleteProduct,
  getAllProductsByAdmin,
  updateProductByAdmin,
} from "./productsListApiSlice";

const productsListSlice = createSlice({
  name: "productsList",
  initialState: {
    products: [],
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
      .addCase(getAllProductsByAdmin.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllProductsByAdmin.fulfilled, (state, action) => {
        state.loader = false;
        state.products = action.payload.payload.products;
      })
      .addCase(getAllProductsByAdmin.rejected, (state, action) => {
        state.loader = false;
        state.products = null;
        state.error = action.error.message;
      })
      .addCase(createProductByAdmin.pending, (state) => {
        state.loader = true;
      })
      .addCase(createProductByAdmin.fulfilled, (state, action) => {
        state.loader = false;
        state.products = [state.products, action.payload.payload.product];
        state.message = action.payload.message;
      })
      .addCase(createProductByAdmin.rejected, (state, action) => {
        state.loader = false;
        state.products = null;
        state.error = action.error.message;
      })
      .addCase(updateProductByAdmin.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateProductByAdmin.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.products[
          state.products.findIndex(
            (item) => item.id === action.payload.payload.product._id
          )
        ] = action.payload.payload.product;
      })
      .addCase(updateProductByAdmin.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.payload.product._id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loader = false;
        state.products = null;
        state.error = action.error.message;
      });
  },
});

// export reducers

// export actions
export const { setMessageEmpty } = productsListSlice.actions;

// export default
export default productsListSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  createReview,
  getAllProducts,
  getSingleProduct,
} from "./productApiSlice";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    numberOfProducts: 0,
    productDetails: null,
    productCount: 0,
    resPerPage: 0,
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
      .addCase(getAllProducts.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loader = false;
        state.products = action.payload.payload.products;
        state.productCount = action.payload.payload.productCount;
        state.resPerPage = action.payload.payload.resPerPage;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.loader = false;
        state.products = null;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.loader = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loader = false;
        state.productDetails = action.payload.payload.product;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loader = false;
        state.productDetails = null;
        state.error = action.error.message;
      })
      .addCase(createReview.pending, (state) => {
        state.loader = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;        
        state.productDetails.reviews = action.payload.payload.reviews;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      });
  },
});

// export reducers

// export actions
export const { setMessageEmpty } = productSlice.actions;

// export default
export default productSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { createBrand, deleteBrand, getAllBrand, updateBrand } from "./brandApiSlice";

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [],
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
      .addCase(getAllBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllBrand.fulfilled, (state, actions) => {
        state.loader = false;
        state.message = null;
        state.brands = (actions.payload.payload.brands)
      })
      .addCase(getAllBrand.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      })
      .addCase(createBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(createBrand.fulfilled, (state, actions) => {
        state.loader = false;
        state.message = actions.payload.message;
        state.brands = [...state.brands, actions.payload.payload.brand];
      })
      .addCase(createBrand.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      })
      .addCase(updateBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateBrand.fulfilled, (state, actions) => {
        state.loader = false;
        state.message = actions.payload.message;
        state.brands[
          state.brands.findIndex(
            (item) => item._id === actions.payload.payload.brand._id
          )
        ] = actions.payload.payload.brand;
        state.message = actions.payload.message;
      })
      .addCase(updateBrand.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteBrand.fulfilled, (state, actions) => {
        state.loader = false;
        state.message = actions.payload.message;
        state.brands = state.brands.filter(
          (brand) => brand._id !== actions.payload.payload.brand._id
        );
        state.message = actions.payload.message;
      })
      .addCase(deleteBrand.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      })
  },
});

// export reducers

// export actions
export const { setMessageEmpty } = brandSlice.actions;

// export default
export default brandSlice.reducer;

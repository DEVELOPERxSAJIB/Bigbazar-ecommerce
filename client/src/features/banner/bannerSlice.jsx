import { createSlice } from "@reduxjs/toolkit";
import { createBanner, deleteBanner, getAllBanner } from "./bannerApiSlice";

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banners: [],
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
      .addCase(getAllBanner.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllBanner.fulfilled, (state, actions) => {
        state.loader = false;
        state.message = null;
        state.banners = actions.payload.payload.banner;
      })
      .addCase(getAllBanner.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      })
      .addCase(createBanner.pending, (state) => {
        state.loader = true;
      })
      .addCase(createBanner.fulfilled, (state, actions) => {
        state.loader = false;
        state.message = actions.payload.message;
        state.banners = [...state.banners, actions.payload.payload.banners];
      })
      .addCase(createBanner.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      })
      .addCase(deleteBanner.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteBanner.fulfilled, (state, actions) => {
        state.loader = false;
        state.message = actions.payload.message;
        state.banners = state.banners.filter(
          (banner) => banner._id !== actions.payload.payload.banner._id
        );
      })
      .addCase(deleteBanner.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      });
  },
});

// export reducers

// export actions
export const { setMessageEmpty } = bannerSlice.actions;

// export default
export default bannerSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { allReviewsByAdmin, deleteReviewByAdmin } from "./reviewsListApiSlice";

const reviewsListSlice = createSlice({
  name: "reviewsListSlice",
  initialState: {
    reviews: [],
    reviewDetails: null,
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
      .addCase(allReviewsByAdmin.pending, (state) => {
        state.loader = true;
      })
      .addCase(allReviewsByAdmin.fulfilled, (state, actions) => {
        state.loader = false;
        state.reviews = actions.payload.payload.reviews;
      })
      .addCase(allReviewsByAdmin.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      })
      .addCase(deleteReviewByAdmin.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteReviewByAdmin.fulfilled, (state, actions) => {
        state.loader = false;
        state.message = actions.payload.message;
        state.reviews = actions.payload.payload.reviews;
      })
      .addCase(deleteReviewByAdmin.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.payload.error;
      });
  },
});

// export reducers

// export actions
export const { setMessageEmpty } = reviewsListSlice.actions;

// export default
export default reviewsListSlice.reducer;

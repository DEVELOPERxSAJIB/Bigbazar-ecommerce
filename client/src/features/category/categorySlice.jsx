import { createSlice } from "@reduxjs/toolkit";
import { createCategory, deleteCategory, editCategory, getAllCategory } from "./categoryApiSlice";

const categorySlice = createSlice({
  name : 'category',
  initialState: {
    categories: [],
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
     .addCase(getAllCategory.pending, (state) => {
        state.loader = true;
      })
     .addCase(getAllCategory.fulfilled, (state, actions) => {
        state.loader = false;
        state.categories = actions.payload.payload.category;
        state.message = null;
      })
     .addCase(getAllCategory.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      })
     .addCase(createCategory.pending, (state) => {
        state.loader = true;
      })
     .addCase(createCategory.fulfilled, (state, actions) => {
        state.loader = false;
        state.categories = [...state.categories, actions.payload.payload.category];
        state.message = actions.payload.message;
      })
     .addCase(createCategory.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      })
     .addCase(editCategory.pending, (state) => {
        state.loader = true;
      })
     .addCase(editCategory.fulfilled, (state, actions) => {
        state.loader = false;
        state.categories[
          state.categories.findIndex((category) => category._id === actions.payload.payload.category._id)
        ] = actions.payload.payload.category;
        state.message = actions.payload.message;
      })
     .addCase(editCategory.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      })
     .addCase(deleteCategory.pending, (state) => {
        state.loader = true;
      })
     .addCase(deleteCategory.fulfilled, (state, actions) => {
        state.loader = false;
        state.categories = state.categories.filter(
          (category) => category._id !== actions.payload.payload.category._id
        );
        state.message = actions.payload.message;
      })
     .addCase(deleteCategory.rejected, (state, actions) => {
        state.loader = false;
        state.error = actions.error.message;
      });
  }

  
});

// export actions
export const { setMessageEmpty } = categorySlice.actions;

// export reducer
export default categorySlice.reducer;

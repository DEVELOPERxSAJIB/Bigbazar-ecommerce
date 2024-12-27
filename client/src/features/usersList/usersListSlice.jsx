import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUserByAdmin,
  getAllUsersByAdmin,
  getSingleUserByAdmin,
  updateUserByAdmin,
} from "./usersListApiSlice";

const usersListSlice = createSlice({
  name: "usersListSlice",
  initialState: {
    users: [],
    userDetails: null,
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
      .addCase(getAllUsersByAdmin.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllUsersByAdmin.fulfilled, (state, action) => {
        state.loader = false;
        state.users = action.payload.payload.users;
      })
      .addCase(getAllUsersByAdmin.rejected, (state, action) => {
        state.loader = false;
        state.users = null;
        state.error = action.error.message;
      })
      .addCase(getSingleUserByAdmin.pending, (state) => {
        state.loader = true;
      })
      .addCase(getSingleUserByAdmin.fulfilled, (state, action) => {
        state.loader = false;
        state.userDetails = action.payload.payload.user;
      })
      .addCase(getSingleUserByAdmin.rejected, (state, action) => {
        state.loader = false;
        state.userDetails = null;
        state.error = action.error.message;
      })
      .addCase(deleteUserByAdmin.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteUserByAdmin.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.users = state.users.filter(
          (user) => user._id !== action.payload.payload.user._id
        );
      })
      .addCase(deleteUserByAdmin.rejected, (state, action) => {
        state.loader = false;
        state.userDetails = null;
        state.error = action.error.message;
      })
      .addCase(updateUserByAdmin.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateUserByAdmin.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.users[
          state.users.findIndex(
            (user) => user._id === action.payload.payload.user._id
          )
        ] = action.payload.payload.user._id;
      })
      .addCase(updateUserByAdmin.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      });
  },
});

// export reducers

// export actions
export const { setMessageEmpty } = usersListSlice.actions;

// export default
export default usersListSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  logOutUser,
  loginUser,
  processRegister,
  verifyRegisteredUser,
  forgotPasswordRequest,
  loggedInUserInfo,
  resetPassword,
  updatePassword,
  updateProfile,
} from "./authApiSlice";

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    isAuthenticated: false,
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
      .addCase(loginUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loader = false;
        state.isAuthenticated = true;
        state.user = action.payload.payload.user;
        state.message = action.payload.message;
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.payload.user)
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loader = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(logOutUser.pending, (state) => {
        state.loader = true;
        state.isAuthenticated = true;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(logOutUser.rejected, (state) => {
        state.loader = false;
        state.isAuthenticated = true;
      })
      .addCase(processRegister.pending, (state) => {
        state.loader = true;
      })
      .addCase(processRegister.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(processRegister.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(verifyRegisteredUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(verifyRegisteredUser.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(verifyRegisteredUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(loggedInUserInfo.pending, (state) => {
        state.loader = true;
        state.isAuthenticated = false;
      })
      .addCase(loggedInUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.payload.user;
        state.isAuthenticated = true;
        state.loader = false;
      })
      .addCase(loggedInUserInfo.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loader = false;
      })
      .addCase(forgotPasswordRequest.pending, (state) => {
        state.loader = true;
      })
      .addCase(forgotPasswordRequest.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(forgotPasswordRequest.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loader = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loader = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.user = action.payload.payload.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      });
  },
});

// export reducers

// export actions
export const { setMessageEmpty } = authSlice.actions;

// export default
export default authSlice.reducer;

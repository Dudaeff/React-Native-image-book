import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {},
  //   extraReducers: (builder) =>
  //     builder
  //       .addCase(register.pending, handlePending)
  //       .addCase(register.fulfilled, (state, action) => {
  //         state.user = action.payload.user;
  //         state.token = action.payload.token;
  //         state.isLoggedIn = true;
  //       })
  //       .addCase(register.rejected, handleRejected)
  //       .addCase(logIn.pending, handlePending)
  //       .addCase(logIn.fulfilled, (state, action) => {
  //         state.user = action.payload.user;
  //         state.token = action.payload.token;
  //         state.isLoggedIn = true;
  //       })
  //       .addCase(logIn.rejected, handleRejected)
  //       .addCase(logOut.pending, handlePending)
  //       .addCase(logOut.fulfilled, (state) => {
  //         state.user = { name: null, email: null };
  //         state.token = null;
  //         state.isLoggedIn = false;
  //       })
  //       .addCase(logOut.rejected, handleRejected)
  //       .addCase(refreshUser.pending, handlePending)
  //       .addCase(refreshUser.fulfilled, (state, action) => {
  //         state.user = action.payload;
  //         state.isLoggedIn = true;
  //         state.isRefreshing = false;
  //       })
  //       .addCase(refreshUser.rejected, handleRejected),
});

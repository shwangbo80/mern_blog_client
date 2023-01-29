import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loaded: false,
  error: false,
  apiUrl: process.env.REACT_APP_API_URL,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loaded = false;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loaded = true;
      state.error = false;
    },
    loginFailure: (state) => {
      state.loaded = false;
      state.error = true;
    },
    loggedOut: (state) => {
      state.user = null;
      state.loaded = false;
      state.error = false;
    },
  },
});

export const {loginStart, loginSuccess, loginFailure, loggedOut} =
  authSlice.actions;

export default authSlice.reducer;

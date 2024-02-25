import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../service/axios";

const initialState = {
  loading: false,
  auth: {
    user: {},
    isAuthenticated: false,
  },
};

export const loadUser = createAsyncThunk("/get-user", async () => {
  const response = await axios.get("/users/get-user");
  return response.data.data;
});

export const mainStateSlice = createSlice({
  name: "mainState",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      const { user } = action.payload.data;
      state.auth.isAuthenticated = true;
      state.auth.user = user;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.auth.isAuthenticated = false;
      state.auth.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload;
        state.auth.isAuthenticated = true;
        state.auth.user = user;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.auth.isAuthenticated = false;
        state.auth.user = null;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  mainStateSlice.actions;

export const selectAuth = (state) => state.mainStateSlice;
export default mainStateSlice.reducer;

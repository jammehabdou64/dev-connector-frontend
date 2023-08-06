import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getApi } from "../../Api";
import setAuthToken from "../../utils/";

export const loadUser = createAsyncThunk("fetch/profile", async () => {
  try {
    if (localStorage["api-token"]) {
      setAuthToken(localStorage["api-token"]);

      const { data } = await getApi("/profile/me");
      return data.success ? data.message : {};
    }
  } catch (error) {}
});

const initialState = {
  auth: {},
  authLoading: true,
  isLoading: true,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.auth = {};
      state.isAuth = false;
      localStorage.removeItem("api-token");
    },

    updateAuth(state, { payload }) {
      state.auth = { ...payload };
    },
  },
  extraReducers: (build) => {
    build
      .addCase(loadUser.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        if (payload) {
          state.auth = payload;
          state.isLoading = false;
          if (Object.keys(payload).length > 0) {
            state.isAuth = true;
          } else {
            state.auth = false;
          }
          return;
        }
        state.isAuth = false;
        state.isLoading = false;
      })
      .addCase(loadUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.auth = {};
        localStorage.removeItem("api-token");
        state.isAuth = false;
      });
  },
});

export const { logout, updateAuth } = authSlice.actions;

export default authSlice.reducer;

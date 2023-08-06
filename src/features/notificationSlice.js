"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "../Api";

export const fetchNotification = createAsyncThunk(
  "fetch/notification",
  async () => {
    try {
      const { data } = await getApi(`/notifications`);
      return data?.success ? data : [];
    } catch (error) {}
  }
);

const initialState = {
  notifications: [],
  numsOfNotifications: 0,
  isLoading: true,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},

  extraReducers: (build) => {
    build
      .addCase(fetchNotification.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(fetchNotification.fulfilled, (state, { payload }) => {
        state.notifications = payload.message;
        state.numsOfNotifications = payload.numsOfNotifications;
        state.isLoading = false;
      })
      .addCase(fetchNotification.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const { removeProfile } = notificationSlice.actions;

export default notificationSlice.reducer;

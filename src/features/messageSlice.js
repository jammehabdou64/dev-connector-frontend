"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "../Api";

export const fetchMessage = createAsyncThunk("fetch/message", async (token) => {
  const { data } = await getApi(`/messages`);
  return data?.success ? data : [];
});

const initialState = {
  messages: [],
  numsOfMessages: 0,
  isLoading: true,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    M(state, { payload }) {
      return { ...state, message: {} };
    },
  },

  extraReducers: (build) => {
    build
      .addCase(fetchMessage.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(fetchMessage.fulfilled, (state, { payload }) => {
        state.messages = payload.message;
        state.numsOfMessages = payload.numsOfMessages;
        state.isLoading = false;
      })
      .addCase(fetchMessage.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const { removeMessage } = messageSlice.actions;

export default messageSlice.reducer;

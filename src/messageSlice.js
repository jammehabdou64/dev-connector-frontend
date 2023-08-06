"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMessage = createAsyncThunk("fetch/message", async (token) => {
  const res = await fetch(`http://localhost:8050/api/messages`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data?.success ? data : [];
});

const initialState = {
  messages: [],
  numsOfMessages: 0,
  loading: true,
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
    build.addCase(fetchMessage.fulfilled, (state, { payload }) => {
      state.messages = payload.message;
      state.numsOfMessages = payload.numsOfMessages;
      state.loading = false;
    });
  },
});

export const { removeMessage } = messageSlice.actions;

export default messageSlice.reducer;

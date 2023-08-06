import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "../Api";

export const fetchFriendRequest = createAsyncThunk(
  "fetch/friendRequest",
  async () => {
    try {
      const { data } = await getApi("/friend-request");
      return data.success ? data : [];
    } catch (error) {}
  }
);

const initialState = {
  numsOfRequest: 0,
  isLoading: true,
};

const friendRequestSlice = createSlice({
  name: "friendRequest",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchFriendRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFriendRequest.fulfilled, (state, { payload }) => {
        state.numsOfRequest = payload?.numsOfRequest;
        state.isLoading = false;
      })
      .addCase(fetchFriendRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default friendRequestSlice.reducer;

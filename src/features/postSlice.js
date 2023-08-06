import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "../Api";

export const fetchPosts = createAsyncThunk("fetch/post", async (token) => {
  const { data } = await getApi(`/posts`);
  return data?.success ? data.message : [];
});

const initialState = {
  posts: [],
  isLoading: true,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost(state, { payload }) {
      return { ...state, posts: [payload, ...state.posts] };
    },

    updatePost(state, { payload }) {
      return { ...state, posts: [...payload] };
    },
  },

  extraReducers: (build) => {
    build
      .addCase(fetchPosts.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});
export const { addPost, updatePost } = postSlice.actions;
export default postSlice.reducer;

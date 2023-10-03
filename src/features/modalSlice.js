import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  showPostFeedModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal(state) {
      return { ...state, showModal: !state.showModal };
    },
    setPostFeedModal(state) {
      return { ...state, showPostFeedModal: !state.showPostFeedModal };
    },
  },
});

export const { setModal, setPostFeedModal } = modalSlice.actions;
export default modalSlice.reducer;

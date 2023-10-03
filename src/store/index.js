import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import messageReducer from "../features/messageSlice";
import notificationReducer from "../features/notificationSlice";
import postReducer from "../features/postSlice";
import friendRequestReducer from "../features/FriendRequestSlice";
import modalReducer from "../features/modalSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    notification: notificationReducer,
    post: postReducer,
    friendRequest: friendRequestReducer,
    modal: modalReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../pages/users/UsersRedux";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
  },
});

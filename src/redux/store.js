import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../pages/users/UsersRedux";

export const store = configureStore({
  reducer: {
    users: usersReducer,

  },
});

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../api/auth.service";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await authService.login(username, password);
      return res;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "false",
    user: null,
  },
  reducers: {
    setCredential: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.err = action.payload?.message;
    },
  },
});

export const { setCredential, logout, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const token = (state) => state.auth.user?.accessToken;

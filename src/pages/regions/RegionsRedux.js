import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RegionsService from "./RegionsService";

export const searchRegions = createAsyncThunk(
  "regions/searchRegions",
  async (type, { rejectWithValue, getState }) => {
    try {
      const { searchText, page, limit, sort, order } = getState().regions.query; // Access state directly

      const res = await RegionsService.searchRegion({
        page,
        limit,
        searchText,
        sort,
        order,
        type,
      });

      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const regionsSlice = createSlice({
  name: "regions",
  initialState: {
    query: {
      searchText: "",
      page: 1,
      limit: 5,
      sort: "",
      order: "",
    },
  },
  reducers: {
    updateRegionsState: (state, action) => {
      state.query = { ...state.query, ...action.payload };
    },
  },
});

export const { updateRegionsState } = regionsSlice.actions;

export default regionsSlice.reducer;
export const regionsSearchText = (state) => state.regions.query.searchText;
export const regionsPage = (state) => state.regions.query.page;
export const regionsLimit = (state) => state.regions.query.limit;
export const regionsSort = (state) => state.regions.query.sort;
export const regionsQuery = (state) => state.regions.query;

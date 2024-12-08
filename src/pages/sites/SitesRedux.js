import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SitesService from "./SitesService";

export const searchSites = createAsyncThunk(
  "sites/searchSites",
  async (data, { rejectWithValue, getState }) => {
    try {
      const { searchText, page, limit, sort, order } = getState().sites.query; // Access state directly

      const res = await SitesService.searchSite({
        page,
        limit,
        searchText,
        sort,
        order,
        type: data,
      });

      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const sitesSlice = createSlice({
  name: "sites",
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
    updateSitesState: (state, action) => {
      console.log("action", action.payload);
      state.query = { ...state.query, ...action.payload };
    },
  },
});

export const { updateSitesState } = sitesSlice.actions;

export default sitesSlice.reducer;
export const sitesSearchText = (state) => state.sites.query.searchText;
export const sitesPage = (state) => state.sites.query.page;
export const sitesLimit = (state) => state.sites.query.limit;
export const sitesSort = (state) => state.sites.query.sort;
export const sitesQuery = (state) => state.sites.query;

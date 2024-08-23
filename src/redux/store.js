import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../pages/users/UsersRedux";
import authReducer from "./auth/authSlice";
import sitesReducer from "../pages/sites/SitesRedux"; // import the sites
import regionsReducer from "../pages/regions/RegionsRedux"; // import the regions
import indicatorsReducer from "../pages/indicators/IndicatorsRedux"; // import the indicators

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    sites: sitesReducer, // add the sites here
    regions: regionsReducer, // add the regions here
    indicators: indicatorsReducer, // add the indicators here
  },
});

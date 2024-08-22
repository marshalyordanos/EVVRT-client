/*
1) in sore.js file    
import regionsReducer from '../views/regions/RegionsRedux' // import the regions
    
    export const store = configureStore({
  reducer: {
     ......
    regions: regionsReducer, // add the regions here
    
  },
})


2) in LayoutRouting.jsx

import RegionsList from './views/regions/RegionsList'
import RegionsDetail from './views/regions/RegionsDetails'

<Route path='regions' element={<RegionsList/>}/>
<Route path='regions/:id' element={<RegionsDetail/>}/>


3) in Sidebar.jsx (optional)

    await authService.checkPermmision(regions, 'read'))&&getItem(Regions,regions,<DashboardOutlined/>),
    
    and change the icon


4) back end index.js

const regionRoute = require('./regions/regionRouter');

{
    path: '/regions',
    route: regionRoute,
  },

*/
    
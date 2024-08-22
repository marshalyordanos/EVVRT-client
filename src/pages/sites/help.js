/*
1) in sore.js file    
import sitesReducer from '../views/sites/SitesRedux' // import the sites
    
    export const store = configureStore({
  reducer: {
     ......
    sites: sitesReducer, // add the sites here
    
  },
})


2) in LayoutRouting.jsx

import SitesList from './views/sites/SitesList'
import SitesDetail from './views/sites/SitesDetails'

<Route path='sites' element={<SitesList/>}/>
<Route path='sites/:id' element={<SitesDetail/>}/>


3) in Sidebar.jsx (optional)

    await authService.checkPermmision(sites, 'read'))&&getItem(Sites,sites,<DashboardOutlined/>),
    
    and change the icon


4) back end index.js

const siteRoute = require('./sites/siteRouter');

{
    path: '/sites',
    route: siteRoute,
  },

*/
    
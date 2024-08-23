/*
1) in sore.js file    
import indicatorsReducer from '../views/indicators/IndicatorsRedux' // import the indicators
    
    export const store = configureStore({
  reducer: {
     ......
    indicators: indicatorsReducer, // add the indicators here
    
  },
})


2) in LayoutRouting.jsx

import IndicatorsList from './views/indicators/IndicatorsList'
import IndicatorsDetail from './views/indicators/IndicatorsDetails'

<Route path='indicators' element={<IndicatorsList/>}/>
<Route path='indicators/:id' element={<IndicatorsDetail/>}/>


3) in Sidebar.jsx (optional)

    await authService.checkPermmision(indicators, 'read'))&&getItem(Indicators,indicators,<DashboardOutlined/>),
    
    and change the icon


4) back end index.js

const indicatorRoute = require('./indicators/indicatorRouter');

{
    path: '/indicators',
    route: indicatorRoute,
  },

*/
    
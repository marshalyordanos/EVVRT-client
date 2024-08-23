
    import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
    import IndicatorsService from './IndicatorsService';


    export const searchIndicators = createAsyncThunk(
        "indicators/searchIndicators",
        async (data, { rejectWithValue,getState }) => {
        try {
            
            const { searchText,page,limit,sort,order } = getState().indicators.query; // Access state directly

            const res = await IndicatorsService.searchIndicator({page,limit,searchText,sort,order});
            
    
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
        }
    );

    export const indicatorsSlice = createSlice({
    name: 'indicators',
    initialState:{
        query:{
            searchText:'',
            page:1,
            limit:5,
            sort:'',
            order:''
        }
    },
    reducers: {
        updateIndicatorsState: (state,action) => {
        
        state.query = {...state.query,...action.payload}

        },
        
        
    },

    })

    export const { updateIndicatorsState } = indicatorsSlice.actions

    export default indicatorsSlice.reducer
    export const indicatorsSearchText = (state) => state.indicators.query.searchText;
    export const indicatorsPage = (state)=>state.indicators.query.page
    export const indicatorsLimit = (state)=>state.indicators.query.limit
    export const indicatorsSort = (state)=>state.indicators.query.sort
    export const indicatorsQuery = (state)=>state.indicators.query


    
    
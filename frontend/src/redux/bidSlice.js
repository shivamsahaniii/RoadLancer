import { createSlice } from "@reduxjs/toolkit";

const bidSlice = createSlice({
    name:'bid',
    initialState:{
        bidders:[],
    },
    reducers:{
        setAllBidders:(state,action) => {
            state.bidders = action.payload;
        }
    }
});
export const {setAllBidders} = bidSlice.actions;
export default bidSlice.reducer;
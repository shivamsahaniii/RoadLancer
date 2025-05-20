import { createSlice } from "@reduxjs/toolkit";

const shipmentSlice = createSlice({
    name:"shipment",
    initialState:{
        allShipment:[],
        allAdminShipments:[],
        singleShipment:null, 
        searchShipmentByText:"",
        allAppliedShipments:[],
        searchedQuery:"",
    },
    reducers:{
        // actions
        setAllShipments:(state,action) => {
            state.allShipment = action.payload;
        },
        setSingleShipment:(state,action) => {
            state.singleShipment = action.payload;
        },
        setAllAdminShipments:(state,action) => {
            state.allAdminShipments = action.payload;
        },
        setSearchShipmentByText:(state,action) => {
            state.searchShipmentByText = action.payload;
        },
        setAllAppliedShipments:(state,action) => {
            state.allAppliedShipments = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
    }
});
export const {
    setAllShipments,
    setSingleShipment,
    setAllAdminShipments,
    setSearchShipmentByText,
    setAllAppliedShipments,
    setSearchedQuery
} = shipmentSlice.actions;
export default shipmentSlice.reducer;
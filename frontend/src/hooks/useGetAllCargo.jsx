 import { setAllShipments } from '@/redux/shipmentSlice';
import { SHIPMENT_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux';
 
 const useGetAllCargo = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.shipment);
    useEffect(()=>{
        const fetchAllCargo = async () => {
            try {
                const res = await axios.get(`${SHIPMENT_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllShipments(res.data.shipments));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCargo();
    },[])
 }
 
 export default useGetAllCargo
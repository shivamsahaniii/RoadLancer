import { setAllAdminShipments } from '@/redux/shipmentSlice';
import { SHIPMENT_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, } from 'react-redux';
 
 const useGetAllAdminShipments = () => {
    const dispatch = useDispatch();
    // const {allShipments} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllAdminShipments = async () => {
            try {
                const res = await axios.get(`${SHIPMENT_API_END_POINT}/getAdminShipments`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAdminShipments(res.data.shipments));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminShipments();
    },[])
 }
 
 export default useGetAllAdminShipments
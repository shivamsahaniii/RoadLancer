import { setAllAppliedShipments } from "@/redux/shipmentSlice";
import { BID_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAllAppliedBids = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedBids = async () => {
            try {
                const res = await axios.get(`${BID_API_END_POINT}/get`, {withCredentials:true});
                console.log(res.data);
                if(res.data.success){
                    dispatch(setAllAppliedShipments(res.data.bid));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedBids();
    },[])
};
export default useGetAllAppliedBids;
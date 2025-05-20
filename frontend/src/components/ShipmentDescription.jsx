import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BID_API_END_POINT, SHIPMENT_API_END_POINT } from '@/utils/constant';
import { setSingleShipment } from '@/redux/shipmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const ShipmentDescription = () => {
    const { singleShipment } = useSelector(store => store.shipment);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleShipment?.bid?.some(bid => bid.bidder === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    
    const params = useParams();
    const shipmentId = params.id;
    
    const dispatch = useDispatch();
    
    const applyShipmentHandler = async () => {
        try {
            const res = await axios.get(`${BID_API_END_POINT}/apply/${shipmentId}`, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleShipment = { ...singleShipment, bid: [...singleShipment.bid, { bidder: user?._id }] }
                dispatch(setSingleShipment(updatedSingleShipment)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleCargo = async () => {
            try {
                const res = await axios.get(`${SHIPMENT_API_END_POINT}/get/${shipmentId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleShipment(res.data.shipment));
                    setIsApplied(res.data.shipment.bid.some(bid=>bid.bidder === user?._id)) // ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCargo();
    }, [shipmentId, dispatch, user?._id]);
    
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleShipment?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold' variant='ghost'>{singleShipment?.shipmentType}</Badge>
                        <Badge className='text-red-700 font-bold' variant='ghost'>{singleShipment?.amountRange?.minAmount} to {singleShipment?.amountRange?.maxAmount}</Badge>
                    </div>
                </div>
                <Button
                    variant='outline'
                    onClick={isApplied ? null : applyShipmentHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#24c60b] hover:bg-[#199405]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Shipment Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleShipment?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleShipment?.pickupLocation} to {singleShipment?.dropLocation}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleShipment?.description}</span></h1>
                <h1 className='font-bold my-1'>Amount: <span className='pl-4 font-normal text-gray-800'> ₹{singleShipment?.amountRange?.minAmount} to ₹{singleShipment?.amountRange?.maxAmount}</span></h1>
                <h1 className='font-bold my-1'>Total Bidder: <span className='pl-4 font-normal text-gray-800'>{singleShipment?.bid?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleShipment?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default ShipmentDescription
import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestShipmentCards = ({shipment}) => {
  const navigate = useNavigate();

  return (
    <div onClick={()=> navigate(`/description/${shipment._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
        <h1 className='font-medium text-lg'>{shipment?.shipper?.fullName}</h1>
        <p className='text-sm text-gray-500'>India</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{shipment?.title}</h1>
            <p className='text-sm text-gray-600'>{shipment?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-blue-700 font-bold' variant='ghost'>{shipment?.shipmentType}</Badge>
            <Badge className='text-red-700 font-bold' variant='ghost'>{shipment?.amountRange?.minAmount} to {shipment?.amountRange?.maxAmount}</Badge>
        </div>
    </div>
  );
};

export default LatestShipmentCards
import React from 'react'
import LatestShipmentCards from './LatestShipmentCards';
import { useSelector } from 'react-redux';
import useGetAllAppliedBids from '@/hooks/useGetAllAppliedBids';



const LatestShipments = () => {
 
  const { allShipment, allAppliedShipments } = useSelector(store => store.shipment);

  // Get shipment IDs that have an accepted bid
  const acceptedShipmentIds = new Set(
    allAppliedShipments
      .filter(bid => bid.status.toLowerCase() === 'accepted') // match "accepted"
      .map(bid => bid.shipmentId)
  );

  // Filter out shipments with accepted bids
  const visibleShipments = allShipment?.filter(shipment => !acceptedShipmentIds.has(shipment._id)).slice(0, 6);

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-[#24c60b]'>Latest and Top </span> Opened Shipments</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {
          visibleShipments.length === 0 ? <span>Shipment not found</span> : visibleShipments.map(shipment => (<LatestShipmentCards key={shipment._id} shipment={shipment} />
          ))
        }
      </div>
    </div>
  )
}

export default LatestShipments
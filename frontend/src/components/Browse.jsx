import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/shipmentSlice';
import Shipment from './Shipment';
import useGetAllCargo from '@/hooks/useGetAllCargo';

// const randomShipments = [1, 2,45];

const Browse = () => {
    useGetAllCargo();
    const {allShipment} = useSelector(store=>store.shipment);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allShipment.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allShipment.map((shipment) => {
                            return (
                                <Shipment key={shipment._id} shipment={shipment}/>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse
import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Shipment from './Shipment';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const shipmentArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Shipments = () => {
    const {allShipment, searchedQuery} = useSelector(store => store.shipment);
    const [filterShipments, setFilterShipments] = useState(allShipment);

    useEffect(()=>{
        if(searchedQuery){
            const filteredShipments = allShipment.filter((shipment)=>{
                return shipment.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                shipment.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                shipment.pickupLocation.toLowerCase().includes(searchedQuery.toLowerCase()) 
            })
            setFilterShipments(filteredShipments)
        }else{
            setFilterShipments(allShipment)
        }
    },[allShipment, searchedQuery]);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterShipments.length <= 0 ? <span>Shipment not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pd-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterShipments.map((shipment) => (
                                            <motion.div 
                                            initial={{opacity: 0, x: 100}}
                                            animate = {{opacity: 1, x: 0}}
                                            exit={{opacity: 0, x: -100}}
                                            transition={{duration:0.3}}
                                            key={shipment?._id}>
                                                <Shipment shipment={shipment}/>
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default Shipments
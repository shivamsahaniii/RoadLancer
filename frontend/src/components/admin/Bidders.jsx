import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import axios from 'axios';
import { BID_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BiddersTable from './BiddersTable';
import { setAllBidders } from '@/redux/bidSlice';

const Bidders = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {bidders} = useSelector(store=>store.bid);

    useEffect(() => {
        const fetchAllBidders = async () => {
            try {
                const res = await axios.get(`${BID_API_END_POINT}/${params.id}/bidders`, { withCredentials: true });
                dispatch(setAllBidders(res.data.shipment));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllBidders();
    }, []);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Bidders {bidders?.bid?.length}</h1>
                <BiddersTable />
            </div>
        </div>
    )
}

export default Bidders
import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import AdminShipmentTable from './AdminShipmentTable';
import useGetAllAdminShipments from '@/hooks/useGetAllAdminShipments';
import { setSearchShipmentByText } from '@/redux/shipmentSlice'

const AdminShipments = () => {
    useGetAllAdminShipments();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(setSearchShipmentByText(input));
    }, [input]);
    return (
      <div>
        <Navbar />
        <div className='max-w-6xl mx-auto my-10'>
          <div className='flex items-end justify-between my-5'>
            <Button variant='outline' onClick={() => navigate("/admin/shipments/create")}>New Shipment</Button>
          </div>
          <AdminShipmentTable />
        </div>
      </div>
    )
}

export default AdminShipments
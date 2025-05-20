import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '@/redux/store'
import { Button } from '../ui/button'

const AdminShipmentTable = () => {
    const { allAdminShipments } = useSelector(store => store.shipment);
    const navigate = useNavigate();

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted Shipments</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Shipment Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAdminShipments?.map((shipment) => (
                            <tr>
                                <TableCell>{shipment?.title}</TableCell>
                                <TableCell>₹{shipment?.amountRange?.minAmount} to ₹{shipment?.amountRange?.maxAmount}</TableCell>
                                <TableCell>{shipment?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/shipments/${shipment._id}/bidders`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span className='bg-[#FFFFFF]'>Bidders</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminShipmentTable
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedShipmentTable = () => {
    const { allAppliedShipments } = useSelector(store => store.shipment);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied Bids..</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Shipment Need For</TableHead>
                        <TableHead>Shipper</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedShipments.length <= 0 ? <span>You haven't applied any Shipment yet.</span> : allAppliedShipments.map((appliedShipment) => (
                            <TableRow key={appliedShipment._id}>
                                <TableCell>{appliedShipment.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{appliedShipment.shipment.title}</TableCell>
                                <TableCell>{appliedShipment.shipment.shipper.fullName}</TableCell>
                                <TableCell className="text-right"><Badge variant='outline'className={`${appliedShipment?.status === "rejected" ? 'bg-red-400' : appliedShipment.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedShipment.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedShipmentTable
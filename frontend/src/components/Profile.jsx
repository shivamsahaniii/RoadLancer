import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import AppliedShipmentTable from './AppliedShipmentTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import { Label } from './ui/label'
import useGetAllAppliedBids from '@/hooks/useGetAllAppliedBids'

const Profile = () => {
    useGetAllAppliedBids();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phone}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Label htmlFor="vehicleName" className="text-right">Vehicle Name :</Label>
                        <span>{user?.profile?.vehicleName}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Label htmlFor="vehicleType" className="text-right">Vehicle Type :</Label>
                        <span>{user?.profile?.vehicleType}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Label htmlFor="vehicleNumber" className="text-right">Vehicle Number :</Label>
                        <span>{user?.profile?.vehicleNumber}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Label htmlFor="licenseNumber" className="text-right">License Numbere :</Label>
                        <span>{user?.profile?.licenseNumber}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Label htmlFor="vehicleCapacity" className="text-right">Vehicle Capacity :</Label>
                        <span>{user?.profile?.vehicleCapacity}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Label htmlFor="route" className="text-right">Route :</Label>
                        <span>{user?.profile?.route}</span>
                    </div>
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Bids</h1>
                
                <AppliedShipmentTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Shipment = ({shipment}) => {
    const navigate = useNavigate();
    // const shipmentId = "dhhgchxbasghvg";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(shipment?.createdAt) === 0 ? "Today" : `${daysAgoFunction(shipment?.createdAt)} days ago`}</p>
                <Button variant='outline' className='rounded-full' size='icon'><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button>
                    <Avatar>
                        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"/>
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{shipment?.shipper?.fullName}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{shipment?.title}</h1>
                <p className='text-sm text-gray-600'>{shipment?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant='ghost'>{shipment?.shipmentType}</Badge>
                <Badge className='text-red-700 font-bold' variant='ghost'>{shipment?.amountRange?.minAmount} to {shipment?.amountRange?.maxAmount}</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${shipment?._id}`)} variant='outline'>Details</Button>
                <Button className='bg-[#24c60b]'>Save for later</Button>
            </div>
        </div>
    )
}

export default Shipment
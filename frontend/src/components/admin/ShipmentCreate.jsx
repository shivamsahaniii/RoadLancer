import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { SHIPMENT_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const companyArray = [];

const ShipmentCreate = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        shipmentType: "",
        amountRange: {
            minAmount: "",
            maxAmount: ""
        },
        pickupLocation: "",
        dropLocation: "",
        shipper: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
    
        if (name === "minAmount" || name === "maxAmount") {
            setInput((prev) => ({
                ...prev,
                amountRange: {
                    ...prev.amountRange,
                    [name]: value,
                },
            }));
        } else {
            setInput((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${SHIPMENT_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/shipments");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>shipmentType</Label>
                            <Input
                                type="text"
                                name="shipmentType"
                                value={input.shipmentType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Add Minimum Amount</Label>
                            <Input
                                type="text"
                                name="minAmount"
                                value={input.amountRange.minAmount}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Add Maximum Amount</Label>
                            <Input
                                type="text"
                                name="maxAmount"
                                value={input.amountRange.maxAmount}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Pickup Location</Label>
                            <Input
                                type="text"
                                name="pickupLocation"
                                value={input.pickupLocation}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Drop Location</Label>
                            <Input
                                type="text"
                                name="dropLocation"
                                value={input.dropLocation}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Post New Shipment</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default ShipmentCreate
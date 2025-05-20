import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'

const UpdateProfileDialog = ({open, setOpen}) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        bio: user?.profile?.bio || "",
        vehicleName: user?.profile?.vehicleName || "",
        vehicleType: user?.profile?.vehicleType || "",
        vehicleNumber: user?.profile?.vehicleNumber || "",
        licenseNumber: user?.profile?.licenseNumber || "",
        vehicleCapacity: user?.profile?.vehicleCapacity || "",
        route: user?.profile?.route || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phone", input.phone);
        formData.append("bio", input.bio);
        formData.append("vehicleName", input.vehicleName);
        formData.append("vehicleType", input.vehicleType);
        formData.append("vehicleNumber", input.vehicleNumber);
        formData.append("licenseNumber", input.licenseNumber);
        formData.append("vehicleCapacity", input.vehicleCapacity);
        formData.append("route", input.route);
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent aria-describedby={undefined} className="sm:max-w-[425px] bg-white" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={input.fullName}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className="text-right">Number</Label>
                                <Input
                                    id="number"
                                    name="number"
                                    value={input.phone}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="vehicleName" className="text-right">Vehicle Name</Label>
                                <Input
                                    id="vehicleName"
                                    name="vehicleName"
                                    value={input.vehicleName}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="vehicleType" className="text-right">Vehicle Type</Label>
                                <Input
                                    id="vehicleType"
                                    name="vehicleType"
                                    value={input.vehicleType}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="vehicleNumber" className="text-right">Vehicle Number</Label>
                                <Input
                                    id="vehicleNumber"
                                    name="vehicleNumber"
                                    value={input.vehicleNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="licenseNumber" className="text-right">License Number</Label>
                                <Input
                                    id="licenseNumber"
                                    name="licenseNumber"
                                    value={input.licenseNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="vehicleCapacity" className="text-right">Vehicle Capacity</Label>
                                <Input
                                    id="vehicleCapacity"
                                    name="vehicleCapacity"
                                    value={input.vehicleCapacity}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="route" className="text-right">Route</Label>
                                <Input
                                    id="route"
                                    name="route"
                                    value={input.route}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { Button } from './ui/Button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/shipmentSlice'

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchShipmentHandler = () => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
  }

  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Web Based Transportation Management Website</span>
        <h1 className='text-5xl font-bold'>
          Search, Apply & <br /> Get Your <span className='text-[#24c60b]'>Shipment</span>
        </h1>
        <p>The transportation industry, especially truck logistics, is crucial for the movement of goods.</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <Input
            type='text'
            placeholder='Find your Shipment'
            onChange = {(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full'
          />
          <Button onClick={searchShipmentHandler} className='rounded-r-full bg-[#24c60b]'>
            <Search className='h-5 w-5'/>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
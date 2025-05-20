import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { setSearchedQuery } from '@/redux/shipmentSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const category = [
    "Goods Driver",
    "Bus Driver",
    "Bike Rider",
    "Tanker Driver",
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const seatchShipmentHandler = (query) => {
          dispatch(setSearchedQuery(query));
          navigate("/browse");
      }
    
    return (
        <div>
            <Carousel className='w-full max-w-xl mx-auto my-20'>
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className='md:basis-1/2 lg-basis-1/3'>
                                <Button onClick={() =>seatchShipmentHandler(cat)} variant='outline' className='rounded-full bg-gray-100'>{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
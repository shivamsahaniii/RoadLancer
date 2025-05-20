import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/shipmentSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Mumbai", "Hyderabad", "Pune", "Bangalore"]
    },
    {
        filterType: "Industry",
        array: ["Goods Driver", "Bus Driver", "Bike Rider", "Tanker Driver"]
    }
]
const FilterCard = () => {

    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const ChangeHandler = (value) => {
        setSelectedValue(value)
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Shipments</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange ={ChangeHandler}>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
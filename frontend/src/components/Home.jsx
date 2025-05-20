import React, { useEffect } from 'react'
import { Navbar } from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestShipments from './LatestShipments'
import Footer from './shared/Footer'
import useGetAllCargo from '@/hooks/useGetAllCargo'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import {  useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllCargo();
  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(user?.role === 'Shipper'){
      navigate("/admin/shipments");
    }
  },[]);
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestShipments/>
        <Footer/>
    </div>
  )
}

export default Home
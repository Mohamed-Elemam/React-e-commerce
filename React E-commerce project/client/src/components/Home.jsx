// eslint-disable-next-line no-unused-vars
import React from 'react'
import Slider from './Slider.jsx';
import Hero from './Hero.jsx';
import FeaturedProducts from './Products/FeaturedProducts';
import FeaturedCategories from './Categories/FeaturedCategories.jsx';
import Compaines from './Compaines';
import DroneCamera from './Posts/DroneCamera.jsx';
// import Newsetler from './Newsetler';
import PlaystaionAd from './Posts/PlaystaionAd.jsx';
import BackTop from './utils/BackTop.jsx';

export default function Home() {
  return (
    <>
      

       <Slider/>
    <Hero/>
    <FeaturedProducts/>
    <DroneCamera/>
    <FeaturedCategories/>
  <PlaystaionAd/>
    <Compaines/>
    {/* <Newsetler/>  */}
<BackTop />
    </>
  )
}

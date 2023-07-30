// eslint-disable-next-line no-unused-vars
import React from 'react'
import Slider from './Slider.jsx';
import Hero from './Hero.jsx';
import FeaturedProducts from './Products/FeaturedProducts';
import FeaturedCategories from './Categories/FeaturedCategories.jsx';
import Compaines from './Compaines';
import DroneCamera from './Posts/DroneCamera.jsx';
import PlaystaionAd from './Posts/PlaystaionAd.jsx';
import BackTop from './utils/BackTop.jsx';
import { Helmet } from 'react-helmet';
import MayLike from './MayLike.jsx';

export default function Home() {
  return (
    <>
      <Helmet>
    <title>TechMart</title>
</Helmet>

       <Slider/>
     <Hero/>
     <FeaturedProducts/>
     <DroneCamera/>
     <FeaturedCategories/>
   <PlaystaionAd/>
<MayLike/>

    <Compaines/>
<BackTop />
    </>
  )
}

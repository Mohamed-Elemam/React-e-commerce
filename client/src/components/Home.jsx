import Slider from "./Slider.jsx";
import Hero from "./Hero.jsx";
import FeaturedProducts from "./Products/FeaturedProducts";
import FeaturedCategories from "./Categories/FeaturedCategories.jsx";
import Companies from "./Companies/Companies.jsx";
import DroneCamera from "./Posts/DroneCamera.jsx";
import PlaystationAd from "./Posts/PlaystationAd.jsx";
import BackTop from "./utils/BackTop.jsx";
import { Helmet } from "react-helmet";
import MayLike from "./MayLike.jsx";

export default function Home() {
  return (
    <>
      {/* <Online> */}
      <Helmet>
        <title>TechMart</title>
      </Helmet>

      <Slider />
      <Hero />
      <FeaturedProducts />
      <DroneCamera />
      <FeaturedCategories />
      <PlaystationAd />
      <MayLike />

      <Companies />
      <BackTop />
    </>
  );
}

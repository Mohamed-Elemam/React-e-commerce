import Slider from "./Slider.jsx";
import Hero from "./Hero.jsx";
import FeaturedProducts from "../products-related-components/FeaturedProducts.jsx";
import FeaturedCategories from "../Categories-related-components/FeaturedCategories.jsx";
import Companies from "./Companies/Companies.jsx";
import DroneCamera from "./DroneCamera.jsx";
import PlaystationAd from "./PlaystationAd.jsx";
import BackTop from "../utils/BackTop.jsx";
import { Helmet } from "react-helmet";
import MayLike from "./MayLike.jsx";

export default function Home() {
  return (
    <>
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

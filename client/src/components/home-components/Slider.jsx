import "../../index.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import slide1 from "../../../public/slider/slider1.jpg";
import slide2 from "../../../public/slider/slider2.jpg";
import slide3 from "../../../public/slider/slider3.jpg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Typography, Button, Box, Stack } from "@mui/material";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

export default function Slider() {
  const navigate = useNavigate();

  const sliderContent = [
    {
      img: slide1,
      slogan: "Be At One",
      slogan2: "With Your Music",
      product: "WH-1000XM4 Wireless Noise Cancelling ",
      link: "/product/658dc8bd88b17f67c2d1ec08",
    },
    {
      img: slide2,
      slogan: " A Place For",
      slogan2: "  All Your Devices",
      product: " Trio Wireless Charger With Magnetic Pad ",
      link: "/product/658dd4f871604e57ecf59cdd",
    },
    {
      img: slide3,
      slogan: " Flexible Dual ",
      slogan2: " Curved Display",
      product: "Qualcomm® Snapdragon WearTm 3100 ",
      link: "/product/65889805def4c7459414bc99",
    },
  ];

  return (
    <Stack>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderContent.map((ele, index) => (
          <SwiperSlide sx={{ position: "relative" }} key={index}>
            <Box
              component={"span"}
              sx={{
                ":hover": { cursor: "pointer" },
              }}
              onClick={() => {
                navigate(`${ele.link}`);
              }}
            >
              <img src={ele.img} width={"100%"} alt="slide" />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: "10%",
                textAlign: "left",
              }}
            >
              <Typography
                sx={{ typography: { md: "h4", sm: "h5", xs: "h6" } }}
                color="initial"
              >
                {ele.slogan}
                <br />
                {ele.slogan2}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ visibility: { sm: "visible", xs: "hidden" } }}
                my={1}
                color="#777"
              >
                {ele.product}
              </Typography>

              <Button
                variant="contained"
                onClick={() => {
                  navigate(`${ele.link}`);
                }}
                size="small"
                endIcon={<ArrowForwardIosIcon />}
              >
                Discover More
              </Button>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
}

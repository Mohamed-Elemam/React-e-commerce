import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import slide1 from "../../public/slider1.jpg";
import slide2 from "../../public/slider2.jpg";
import slide3 from "../../public/slider3.jpg";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Typography, Button, Box, Stack } from "@mui/material";
import "../index.css";
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
      link: "/product/6",
    },
    {
      img: slide2,
      slogan: " A Place For",
      slogan2: "  All Your Devices",
      product: " Trio Wireless Charger With Magnetic Pad ",
      link: "/product/4",
    },
    {
      img: slide3,
      slogan: " Flexible Dual ",
      slogan2: " Curved Display",
      product: "Qualcomm® Snapdragon WearTm 3100 ",
      link: "/product/9",
    },
  ];

  return (
    <Stack

    // sx={{ mt:1}}
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,

        // }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        // style={{padding:'1 px'}}
      >
        {/* ============================slide ======================= */}

        {sliderContent.map((ele, index) => (
          <SwiperSlide sx={{ position: "relative" }} key={index}>
            <Box
              component={"span"}
              sx={{
                visibility: {
                  xs: "hidden",
                  md: "visible",
                  ":hover": { cursor: "pointer" },
                },
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
              <Typography variant="h4" color="initial">
                {ele.slogan}
                <br />
                {ele.slogan2}
              </Typography>
              <Typography variant="subtitle2" my={1} color="#777">
                {ele.product}
              </Typography>

              <Button
                variant="contained"
                onClick={() => {
                  navigate(`${ele.link}`);
                }}
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

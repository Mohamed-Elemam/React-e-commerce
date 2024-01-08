/* eslint-disable no-unused-vars */
import { Button, Container, Grid, Stack, Typography, Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Toaster, toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import RecommendedForYou from "../shared-components/RecommendedForYou.jsx";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import { useDispatch } from "react-redux";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "./styles.css";
import { addProductToCart } from "../../Redux/cartSlice.js";

// // import required modules
// import { Pagination } from "swiper/modules";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [showImage, setShowImage] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  async function getProductData(id) {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_PRODUCTS_API_LINK + `product/${id}`
      );

      setProduct(data.product);
    } catch (error) {
      setApiError(error.response.data.error.message);
      console.log(error);
    }
  }
  const handleImageClick = (index) => {
    setShowImage(index);
  };

  useEffect(() => {
    getProductData(id);
  }, [id]);
  // ///////log
  if (apiError == "Not Found") {
    navigate("/404");
    return null;
  }

  if (!product) {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "50vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Container sx={{ my: 5 }}>
        <Toaster position="top-center" reverseOrder={false} />
        <Helmet>
          <title>{product?.title}</title>
        </Helmet>

        <Grid container spacing={2} my={5}>
          <Grid item md={2} xs={12} sx={{ ":hover": { cursor: "pointer" } }}>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={{ xs: "row", md: "column" }}
            >
              {product?.images?.map((ele, index) => (
                <Box
                  width={{ sm: "50%" }}
                  key={index}
                  onClick={() => handleImageClick(index)}
                  sx={{
                    opacity: index === showImage ? 1 : 0.5,
                    "&:hover": {
                      cursor: "pointer",
                      opacity: index === showImage ? 1 : 0.7,
                    },
                    transition: "all 0.5s",
                  }}
                >
                  <img
                    src={`${product?.images?.at(index - 1).secure_url}`}
                    width={"100%"}
                    alt="product image"
                  />
                </Box>
              ))}
            </Stack>
          </Grid>
          <Grid item md={4} xs={12}>
            <InnerImageZoom
              src={`${product?.images?.at(showImage)?.secure_url}`}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Stack justifyContent={"center"} height={"100%"}>
              <Typography variant="body2" color="text.secondary">
                {product?.brand}
              </Typography>
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "20px",
                  textTransform: "capitalize",
                }}
              >
                {product?.title}
              </p>
              <Typography variant="subtitle1" color="initial" my={1}>
                {product?.price} EGP
              </Typography>

              <Button
                variant="contained"
                sx={{ borderRadius: "15px", my: 2 }}
                onClick={() => {
                  console.log(product._id);
                  dispatch(addProductToCart(product._id));
                  toast.success("Item add to cart 🎉");
                }}
                endIcon={<ShoppingCartOutlinedIcon />}
              >
                Add To Cart
              </Button>
              <Typography variant="h5" my={2} color="initial">
                Description
              </Typography>
              <Typography variant="body1" color="initial">
                {product?.overview}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      {product ? <RecommendedForYou /> : ""}
    </>
  );
}

//  <Swiper
//       slidesPerView={3}
//       spaceBetween={30}
//       pagination={{
//         clickable: true,
//       }}
// navigation={true}
// direction={'vertical'}
//       modules={[Pagination,Navigation]}
//       className="mySwiper"
//     >
//       <SwiperSlide><img src={`${product?.images?.at(index - 1).secure_url}`} width={"100%"}  alt="product image" /></SwiperSlide>
//     </Swiper>

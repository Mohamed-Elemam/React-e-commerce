/* eslint-disable no-unused-vars */
import { Button, Container, Grid, Stack, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Toaster, toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import RecommendedForYou from "../RecommendedForYou.jsx";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice.js";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import InnerImageZoom from 'react-inner-image-zoom'


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
        import.meta.env.VITE_PRODUCTS_API_LINK+`/api/products/${id}?populate=*`
      );

      setProduct(data.data);
    } catch (error) {
      // console.log(error.response.data.error.message);
      setApiError(error.response.data.error.message);
    }
  }
  const handleImageClick = (index) => {
    setShowImage(index);
  };

  useEffect(() => {
    getProductData(id);
  }, [id]);
  if (apiError == "Not Found") {
    navigate("/404");
    return null;
  }
  return (
    <>
      <Container sx={{ my: 5 }}>
        <Helmet>
          <title>{product?.attributes?.productTitle}</title>
        </Helmet>
        {product ? (
          <Grid container spacing={2} my={5}>
            <Grid item md={2} xs={12} sx={{ ":hover": { cursor: "pointer" } }}>
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={{ xs: "row", md: "column" }}
              >
                {product?.attributes?.images?.data.map((ele, index) => (
                  <Box
                    width={{ sm: "50%", md: "80%" }}
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
                      src={`${ele?.attributes?.url}`}
                      width={"100%"}
                      alt="product image"
                    />
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid item md={4} xs={12}>
             
<InnerImageZoom src={`${product?.attributes?.images?.data[showImage]?.attributes.url}`} />

            </Grid>
            <Grid item md={6} xs={12}>
              <Stack justifyContent={"center"} height={"100%"}>
                <Typography variant="body2" color="text.secondary">
                  {product?.attributes?.brand}
                </Typography>
                <p style={{ fontWeight: "600", fontSize: "20px" }}>
                  {product?.attributes?.productTitle}
                </p>
                <Typography variant="subtitle1" color="initial" my={1}>
                  {product?.attributes?.price} EGP
                </Typography>

                <Button
                  variant="contained"
                  sx={{ borderRadius: "15px", my: 2 }}
                  onClick={() => {
                    dispatch(addToCart( product))
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
                  {product?.attributes?.description}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        ) : (
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
        )}
      </Container>
{product?      <RecommendedForYou />
:''}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

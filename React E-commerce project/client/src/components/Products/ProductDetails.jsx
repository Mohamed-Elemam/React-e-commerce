/* eslint-disable no-unused-vars */
import { Button, Container, Grid, Stack, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';


export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [showImage, setShowImage] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();
  async function getProductData(id) {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/products/${id}?populate=*`
      );
     
      setProduct(data.data.attributes);
    } catch (error) {
      console.log(error.response.statusText);
      setApiError(error.response.statusText);
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


            {product?    <Grid container spacing={2} my={5}>
          <Grid item md={2} xs={12} sx={{':hover':{cursor:'pointer'}}}>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={{ sm: "row", md: "column" }}
            >
              {product?.images?.data.map((ele, index) => (
                <Box
                  width={{ sm: "50%", md: "80%" }}
                  key={index}
                  onClick={() => handleImageClick(index)}
                  sx={{
                    opacity: index === showImage ? 1 : 0.5,
                    "&:hover": { cursor: "pointer" },
                    
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
          <Grid item md={4} xs={12} >
            <img
              src={`${product?.images?.data[showImage]?.attributes.url}`}
              width={"100%"}
              alt="product image"
              
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Stack justifyContent={"center"} height={"100%"}>
              <Typography variant="body2" color="text.secondary">
                {product?.brand}
              </Typography>
              <p style={{ fontWeight: "600", fontSize: "20px" }}>
                {product?.productTitle}
              </p>
              <Typography variant="subtitle1" color="initial" my={1}>
                {product?.price} EGP
              </Typography>

              <Button
                variant="contained"
                sx={{ borderRadius: "15px", my: 2 }}
                endIcon={<ShoppingCartOutlinedIcon />}
              >
                Add To Cart
              </Button>
              <Typography variant="h5" color="initial">
                Description
              </Typography>
              <Typography variant="body1" color="initial">
                {product?.description}
              </Typography>
            </Stack>
          </Grid>
        </Grid>   : <Box sx={{ display: 'flex', minHeight: '50vh', alignItems: 'center', justifyContent: 'center' }}>
  <CircularProgress />
</Box>
}
       
      </Container>
    </>
  );
}

import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Button,
  Typography,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import Products from "./Products/Products.jsx";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
// import { useState } from 'react';
export default function MayLike() {
  const [apiData, setApiData] = useState([]);

  async function getAllProducts() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_PRODUCTS_API_LINK + "/api/products?populate=*"
      );

      setApiData(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
    {apiData?.length?
      
      <Container sx={{ mt: 5 }}>
        <Stack flexDirection={"row"} alignItems={"center"} flexWrap={"wrap"}>
          <Grid container spacing={2} mt={3}>
            <Grid item md={8} xs={12}>
              <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
                You may like also
              </Typography>
            </Grid>
          </Grid>
        </Stack>

        <Grid container spacing={2} my={2}>
          <Grid
            item
            md={2}
            xs={12}
            width={"100%"}
            sx={{
              ":hover": {
                scale: "1.05",
                transition: "all 0.3s",
               
              },
            }}
          >
            <Link to={"/category/tablet"}style={{ position: "relative",}}>
           <Box variant={'div'} height={'100%'}>
               <img
                 src="public/Group_5919.webp"
                 height={"100%"}
                 alt="img"
                 width={"100%"}
                 style={{ borderRadius: "5px" }}
               />
               <Box sx={{ position: "absolute", top: "2%", left: "14%" }}>
                 <Typography variant="h6" paragraph>
                   Flex on All <br />
                   The Others
                 </Typography>
                 <Button variant="text" color="inherit">
                   Shop Now &gt;
                 </Button>
               </Box>
           </Box >
            </Link>
          </Grid>
          <Grid item md={10} xs={12}>
              <Grid container spacing={2}>
                <Products apiData={apiData.slice("", 4)} />
              </Grid>
            
          </Grid>
        </Grid>
      </Container>: (
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
    </>
  );
}

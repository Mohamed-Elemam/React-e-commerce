// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Stack, Typography, Container, Box, Grid } from "@mui/material";

import Products from "./Products.jsx";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  const [apiData, setApiData] = useState([]);

  const [alignment, setAlignment] = React.useState("Show All");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const AllProduct = "/api/products?populate=*";
  const monitor = "/api/products?populate=*&filters[category][$eq]=monitor";
  const laptop = "/api/products?populate=*&filters[category][$eq]=laptop";
  const camera = "/api/products?populate=*&filters[category][$eq]=camera";

  async function getAllProducts(link) {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_PRODUCTS_API_LINK + link
      );
      setApiData(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getAllProducts(AllProduct);
  }, [AllProduct]);
  const categories = [
    { title: "Show All", param: AllProduct },
    { title: "Monitor", param: monitor },
    { title: "Laptop", param: laptop },
    { title: "Camera", param: camera },
  ];

  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Stack flexDirection={"row"} alignItems={"center"} flexWrap={"wrap"}>
          <Grid container spacing={2} mt={3}>
            <Grid item md={8} xs={12}>
              <Typography
                sx={{ fontSize: "24px", fontWeight: 500, flexGrow: 1 }}
              >
                Featured Categories
              </Typography>
            </Grid>

            <Grid item md={4} xs={12}>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                color="primary"
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                {categories.map((ele, index) => (
                  <ToggleButton
                    key={index}
                    value={ele.title}
                    onClick={() => getAllProducts(ele.param)}
                  >
                    {ele.title}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Stack>

        <Stack direction="row" spacing={4}></Stack>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          flexWrap={"wrap"}
          gap={2}
          my={2}
        >

          {apiData?.length ? (

            <Grid component={motion.section}
            layout
            initial={{ transform: "scale(0)" }}
            animate={{ transform: "scale(1)" }}
            exit={{ transform: "scale(0)" }}
            transition={{duration:.5,type:'spring',stiffness: 90}}
            container spacing={2} 
            >
              <Products apiData={apiData.slice("", 8)} />
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
        </Stack>
      </Container>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Stack, Typography, Container, Box, Grid } from "@mui/material";
import Products from "./Products.jsx";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function FeaturedProducts() {
  const [apiData, setApiData] = useState([]);

  const [alignment, setAlignment] = React.useState("Show All");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const AllProducts = "product";
  const monitor = "product/subcategory/Monitor";
  const laptop = "product/subcategory/Laptop";
  const camera = "product/subcategory/Camera";

  async function getAllProducts(param) {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_PRODUCTS_API_LINK + param
      );
      setApiData(data.products.slice(0, 4));
    } catch (error) {
      toast.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getAllProducts(AllProducts);
  }, [AllProducts]);

  const categories = [
    { title: "Show All", param: AllProducts },
    { title: "Monitor", param: monitor },
    { title: "Laptop", param: laptop },
    { title: "Camera", param: camera },
  ];

  const animationVariants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 90,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

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
            <Grid
              component={motion.section}
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              layout
              container
              spacing={2}
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

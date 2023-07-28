// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Stack, Typography, Container, Box,Button, Grid } from "@mui/material";

import Products from "./Products.jsx";
// import { Link } from "react-router-dom";
import axios from "axios";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function FeaturedProducts() {
  const [alignment, setAlignment] = React.useState("Show All");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
    console.log(newAlignment);
  };

  const [apiData, setApiData] = useState([]);

  async function getAllProducts() {
    try {
      const { data } = await axios.get(
        "http://localhost:1337/api/products?populate=*"
      );
      console.log(data.data);
      setApiData(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getAllProducts(); 
  }, []);
  const categories = [
    { title: "Show All" },
    { title: "Monitor" },
    { title: "Laptop" },
    { title: "Camera" },
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
              {categories.map((ele, index) => (
                <Box component={"span"} key={index}>
                  <Button variant="text" color="primary">
                    {ele.title}
                  </Button>
                </Box>
              ))}
              {/* <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                {categories.map((ele, index) => (
                  <Box component={"span"} key={index}>
                    <ToggleButton value={ele.title} aria-label={ele.title}>
                      {ele.title}
                    </ToggleButton>
                  </Box>
                ))}
              </ToggleButtonGroup> */}
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
          {/* *************************************** */}
          {apiData?.length ? (
            <Grid container spacing={2}>
              <Products apiData={apiData} />
            </Grid>
          ) : (
            <Typography>Loading ...</Typography>
          )}
        </Stack>
      </Container>
    </>
  );
}

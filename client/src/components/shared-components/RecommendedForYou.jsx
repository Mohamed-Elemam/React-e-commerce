import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Products from "../products-related-components/Products.jsx";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function RecommendedForYou() {
  const [apiData, setApiData] = useState([]);

  async function getAllProducts() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_PRODUCTS_API_LINK + "products/brand/Apple"
      );

      setApiData(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Container sx={{ my: 5 }}>
        <Stack flexDirection={"row"} alignItems={"center"} flexWrap={"wrap"}>
          <Grid container spacing={2} mt={3}>
            <Grid item md={8} xs={12}>
              <Typography
                sx={{ fontSize: "24px", fontWeight: 500, flexGrow: 1 }}
              >
                Recommended For You
              </Typography>
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
              container
              spacing={2}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Products apiData={apiData.slice("", 4)} />
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

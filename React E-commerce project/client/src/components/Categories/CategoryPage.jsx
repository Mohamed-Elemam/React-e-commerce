// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Products from "./../Products/Products.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet";

export default function CategoryPage() {
  const { name } = useParams();
  const lowCaseName = name.toLowerCase();

  const [apiData, setApiData] = useState([]);

  async function getCategory(lowCaseName) {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_PRODUCTS_API_LINK+`/api/products?populate=*&filters[category][$eq]=${lowCaseName}`
      );
      console.log(data?.data);
      setApiData(data?.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getCategory(lowCaseName);
  }, [lowCaseName]);
  return (
    <Container>
      <Helmet>
    <title>{name} category</title>
</Helmet>


      {apiData?.length ? (
        <Grid container spacing={2} my={5}>
          <Products apiData={apiData} />
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
  );
}

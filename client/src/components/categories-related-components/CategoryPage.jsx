import { useEffect, useState } from "react";
import Products from "../product-related/Products.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet";

export default function CategoryPage() {
  const { name } = useParams();
  const categoryName = name;

  const [apiData, setApiData] = useState([]);

  async function getCategory(categoryName) {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_PRODUCTS_API_LINK +
          `product/subcategory/${categoryName}`
      );
      setApiData(data?.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getCategory(categoryName);
  }, [categoryName]);
  return (
    <Container>
      <Helmet>
        <title>{name} category</title>
      </Helmet>

      <Typography variant="h4" mt={3}>
        {name} category
      </Typography>
      {apiData?.length ? (
        <Grid container spacing={2} mt={2} mb={5}>
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

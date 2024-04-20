import { Button, Container, Grid, Stack, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
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
import { addProductToCart } from "../../Redux/cartSlice.js";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import IconButton from "@mui/material/IconButton";

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
      setApiError(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    getProductData(id);
  }, [id]);

  if (apiError == "No product found") {
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
        <Helmet>
          <title>{product?.title}</title>
        </Helmet>

        <Grid container spacing={2} my={5} justifyContent={"space-around"}>
          <Grid item md={4} xs={12}>
            <InnerImageZoom
              src={`${product?.images?.at(showImage)?.secure_url}`}
            />
            <Stack
              flexDirection={"row"}
              justifyContent={"center"}
              my={3}
              gap={5}
            >
              <IconButton
                sx={{ "&:hover": { cursor: "pointer" } }}
                onClick={() => {
                  setShowImage(
                    (showImage - 1 + product?.images?.length) %
                      product?.images?.length
                  );
                }}
              >
                <ArrowBackOutlinedIcon />
              </IconButton>
              {showImage + 1 + "/" + product?.images?.length}
              <IconButton
                sx={{ "&:hover": { cursor: "pointer" } }}
                onClick={() => {
                  setShowImage((showImage + 1) % product?.images?.length);
                }}
              >
                <ArrowForwardOutlinedIcon />
              </IconButton>
            </Stack>
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
                  if (!localStorage.getItem("userToken")) {
                    navigate("/login");
                  } else {
                    dispatch(addProductToCart(product._id));
                    toast.success("Item add to cart 🎉");
                  }
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

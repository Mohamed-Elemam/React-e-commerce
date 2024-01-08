import {
  Button,
  Typography,
  Container,
  Stack,
  Grid,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Helmet } from "react-helmet";
import {
  addProductToCart,
  decrementProductQty,
  getUserCart,
  removeProductFromCart,
} from "../../Redux/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";
import CheckoutBtn from "../cart-related-components/CheckoutBtn.jsx";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartObj = useSelector((state) => state.cart);

  let ProductsQTY = cartObj?.cart?.cartItems?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  return (
    <Container my={8}>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartObj?.cart?.cartItems?.length === 0 || cartObj?.cart?.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <Typography variant="h3" my={5} color="initial">
            Cart is empty
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/");
            }}
          >
            Keep browsing
          </Button>
        </div>
      ) : (
        <>
          <Typography
            sx={{ typography: { md: "h4", xs: "h6" } }}
            my={2}
            color="initial"
          >
            Shopping Cart ( {ProductsQTY})
          </Typography>

          <Container
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              fontWeight: 500,
            }}
            my={2}
          >
            {cartObj?.cart?.cartItems?.map((ele) => (
              <div key={ele.productId._id}>
                <Grid
                  container
                  textAlign={"center"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Grid
                    item
                    xs={2}
                    sx={{ width: { lg: "25%", md: "40%", xs: "100%" } }}
                  >
                    <img
                      src={ele?.productId.images?.at(0)?.secure_url}
                      style={{ width: "70%" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={7}
                    sx={{
                      fontSize: { md: "19px", sm: "15px", xs: "14px" },
                      textTransform: "capitalize",
                    }}
                  >
                    {ele?.productId.title}
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{ fontSize: { md: "19px", sm: "15px", xs: "13px" } }}
                  >
                    {ele?.price} EGP
                  </Grid>
                </Grid>

                <Grid
                  container
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Grid item xs={10}>
                    <IconButton
                      size="small"
                      color="error"
                      sx={{ mr: 1.5 }}
                      onClick={() => {
                        dispatch(decrementProductQty(ele.productId._id));
                      }}
                    >
                      <RemoveCircleOutlineIcon
                        sx={{
                          fontSize: {
                            xs: "25px",
                            md: "35px",
                          },
                        }}
                      />
                    </IconButton>

                    {ele?.quantity}

                    <IconButton
                      variant="contained"
                      color="primary"
                      sx={{ mx: 1.5 }}
                      onClick={() => {
                        dispatch(addProductToCart(ele.productId._id));
                      }}
                    >
                      <AddCircleOutlineIcon
                        sx={{
                          fontSize: {
                            xs: "25px",
                            md: "35px",
                          },
                        }}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      color="error"
                      onClick={() => {
                        dispatch(removeProductFromCart(ele.productId._id));
                      }}
                    >
                      <DeleteIcon
                        sx={{
                          fontSize: {
                            xs: "25px",
                            md: "35px",
                          },
                        }}
                      />
                    </IconButton>
                  </Grid>
                  <Divider width={"100%"} flexItem></Divider>
                </Grid>
              </div>
            ))}
          </Container>
        </>
      )}
      <Stack
        display={"flex"}
        mb={5}
        alignItems={"center"}
        flexWrap={"wrap"}
        flexDirection={"row"}
        sx={{ textAlign: { xs: "center" }, justifyContent: { xs: "center" } }}
      >
        {cartObj?.cart?.totalprice > 0 && (
          <>
            <Typography
              sx={{ typography: { md: "h5", xs: "h5" } }}
              flexGrow={1}
              my={4}
            >
              Cart total price is
              <Box component="span" mx={1}>
                {cartObj?.cart?.totalprice} EGP
              </Box>
            </Typography>
            <CheckoutBtn cartId={cartObj?.cart._id} />
          </>
        )}

        <Toaster position="top-center" reverseOrder={false} />
      </Stack>
    </Container>
  );
}

// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Button,
  Typography,
  Container,
  Stack,
  Grid,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} from "./Redux/cartSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Toaster, toast } from "react-hot-toast";

export default function Cart() {
  const dispatch = useDispatch();
  let userToken = localStorage.getItem("userToken");
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((total, ele) => {
    return total + ele.attributes.price * ele.quantity;
  }, 0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <Container my={8}>
      <Helmet>
        <title>cart</title>
      </Helmet>
      {cartItems?.length === 0 ? (
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
          <Typography variant="h3" color="initial">
            Cart
          </Typography>

          <Stack
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {cartItems?.map((ele, index) => (
              <Grid
                container
                spacing={2}
                my={5}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                key={index}
              >
                <Grid item xs={2}>
                  <img
                    src={ele?.attributes?.images?.data[0].attributes.url}
                    style={{ width: "50%", borderRadius: "5px" }}
                    alt="cartImage"
                  />
                </Grid>
                <Grid item xs={3}>
                  {ele?.attributes?.productTitle}
                </Grid>
                <Grid item xs={2}>
                  {ele?.attributes?.price * ele?.quantity} EGP
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => dispatch(decrementQuantity(ele.id))}
                  >
                    <RemoveCircleOutlineIcon fontSize="large" />
                  </IconButton>
                </Grid>
                <Grid item xs={2}>
                  {ele?.quantity}
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch(incrementQuantity(ele.id));
                    }}
                  >
                    <AddCircleOutlineIcon fontSize="large" />
                  </IconButton>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    color="error"
                    onClick={() => dispatch(removeItem(ele.id))}
                  >
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Stack>
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
        <Typography variant="h5" flexGrow={1} my={4}>
          Cart total price is{" "}
          <Box component="span" mx={2}>
            {totalAmount} EGP
          </Box>
        </Typography>

        <Tooltip
          title={
            userToken && cartItems.length !== 0
              ? ""
              : "Add product to cart then login to checkout"
          }
          placement="top"
        >
          <span>
            <Button
              variant="contained"
              disabled={!userToken || cartItems.length === 0}
              onClick={handleOpen}
            >
              Proceed to checkout
            </Button>
          </span>
        </Tooltip>

        <Modal
          onClose={handleClose}
          open={open}
          style={{ textAlign: "center" }}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: "50%" }}>
            <h2 id="checkout-modal-title">Checkout Complete</h2>

            <p id="parent-modal-description" style={{ margin: "30px 0" }}>
              Thank you for purchasing from Techmart.
              <br />
              Our team will contact you via phone soon to continue the process.
            </p>
            <Button
              variant="contained"
              onClick={() => {
                toast.success("Purchase done 🥳");
                handleClose();
                dispatch(clearCart());
              }}
            >
              Proceed to checkout
            </Button>
          </Box>
        </Modal>

        <Toaster position="top-center" reverseOrder={false} />
      </Stack>
    </Container>
  );
}

import { Button } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";

const CheckoutBtn = ({ cartId }) => {
  let userToken = localStorage.getItem("userToken");
  async function handleCheckout(cartId) {
    let { data } = await axios.post(
      import.meta.env.VITE_PRODUCTS_API_LINK + `order/checkout/${cartId}`,
      {},
      {
        headers: {
          Authorization: `${import.meta.env.VITE_TOKEN_SECRET} ${userToken}`,
        },
      }
    );
    if (data.message === "success") {
      window.location.href = data.url;
    }
  }

  return (
    <Button
      variant="contained"
      size="medium"
      onClick={() => {
        handleCheckout(cartId);
      }}
    >
      Proceed To Checkout
    </Button>
  );
};

export default CheckoutBtn;

CheckoutBtn.propTypes = {
  cartId: PropTypes.string.isRequired,
};

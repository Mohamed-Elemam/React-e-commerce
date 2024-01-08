import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Link,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../Redux/cartSlice.js";
Products.propTypes = {
  apiData: PropTypes.array,
};

export default function Products({ apiData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {apiData?.map((ele, index) => (
        <Grid key={index} item md={3} xs={6}>
          <Card
            sx={{
              border: "1px solid #999",
              boxShadow: "none",
              flexGrow: "1 !important",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              ":hover": {
                border: "1.5px #2453d3 solid",
                cursor: "pointer",
              },
            }}
          >
            <Link
              underline="none"
              color={"inherit"}
              onClick={() => {
                navigate(`/product/${ele._id}`);
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  ":hover": {
                    scale: "1.05",
                    transition: "all 0.2s",
                  },
                }}
                image={ele.images.at(0).secure_url}
                alt={ele.title}
              />

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {ele.brand}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    pb: 2,
                    fontSize: "16px",
                    fontWeight: 500,
                    ":hover": {
                      color: "#2453d3",
                      transition: "color 0.25s",
                    },
                    textTransform: "capitalize",
                  }}
                >
                  {ele.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {ele.price} EGP
                </Typography>
              </CardContent>
            </Link>
            <CardActions disableSpacing>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  dispatch(addProductToCart(ele._id));
                  toast.success("Item add to cart 🎉");
                }}
                sx={{ fontSize: { sm: "14px", xs: "11px" } }}
              >
                Add To Cart
                <ShoppingCartOutlinedIcon
                  fontSize="medium"
                  sx={{ ml: 2, display: { sm: "block", xs: "none" } }}
                />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
}

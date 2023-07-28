// import React from "react";
import {
  Typography,
  Card,
  // IconButton,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Link,
} from "@mui/material";

// import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";

export default function Products({ apiData }) {
  const navigate = useNavigate();

  return apiData?.map((ele, index) => (
    <Grid key={index} item md={3} sm={6}>
      <Link
        underline="none"
        color={"inherit"}
        onClick={() => {
          navigate(`/product/${ele.id}`);
        }}
      >
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
          <CardMedia
            component="img"
            sx={{
              ":hover": {
                scale: "1.05",
                transition: "all 0.2s",
              },
            }}
            image={ele.attributes.images.data[0].attributes.url}
            alt={ele.attributes.productTitle}
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {ele.attributes.brand}
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
              }}
            >
              {ele.attributes.productTitle}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {ele.attributes.price} EGP
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton> */}
            <br />
            <Button variant="outlined" fullWidth>
              Add To Cart
              <ShoppingCartOutlinedIcon fontSize="medium" sx={{ ml: 2 }} />
            </Button>
          </CardActions>
        </Card>
      </Link>
    </Grid>
  ));
}

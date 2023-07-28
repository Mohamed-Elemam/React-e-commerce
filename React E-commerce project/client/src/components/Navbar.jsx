// eslint-disable-next-line no-unused-vars
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Link, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {  useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useHref } from 'react-router-dom';

export const userToken = localStorage.getItem("userToken");
const user = userToken ? jwtDecode(userToken) : null;


export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "95px" }}>
      <AppBar
        sx={{
          p: 2,
          justifyContent: "center",
          color: "#000",
          background: "#fff",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          {/* <Box component={'span'}> */}

          <Link
            color="inherit"
            underline="none"
            flexGrow={1}
            onClick={() => {
              navigate("/");
            }}
            sx={{ ":hover": { cursor: "pointer" } }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, fontFamily: "Lobster " }}
              color="initial"
            >
              Techmart
            </Typography>
          </Link>
          {userToken?
          <Box
            aria-label="account"
            color="inherit"
            
          >
          
            <Typography variant="" mx={1}>
              {user?.name}
            </Typography>
            <PersonOutlineOutlinedIcon sx={{}} />
          
          </Box>
:<IconButton
aria-label="account"
color="inherit"
onClick={() => {
  navigate("/login");
}}

>

<Typography variant="h6" mx={2}>
  login
</Typography>
<PersonOutlineOutlinedIcon sx={{}} />

</IconButton>
}
          
          <IconButton aria-label="shopping-cart" color="inherit" mx={1}>
            <Badge badgeContent={6} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="favorite-products" color="inherit">
            <Badge badgeContent={9} color="error">
              <FavoriteBorderOutlinedIcon />
            </Badge>
          </IconButton>
          {localStorage.getItem("userToken") ? (
            <IconButton
              aria-label="logout"
              color="inherit"
              mx={1}
              onClick={() => {
                localStorage.removeItem("userToken");
                navigate("/");
                window.location.reload();

              }}
            >
              <LogoutOutlinedIcon />
            </IconButton>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

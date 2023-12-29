import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Button, Link, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";

import { useSelector } from "react-redux";

const userToken = localStorage.getItem("userToken");
const user = userToken ? jwtDecode(userToken) : null;

export default function Navbar() {
  const cart = useSelector((state) => state.cart);

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {userToken ? (
        <MenuItem>
          {user?.length > 6 ? (
            <>
              <p>{user?.name}</p>
              <PersonOutlineOutlinedIcon sx={{ marginLeft: "8px" }} />
            </>
          ) : (
            <>
              <Typography variant="h6" mx={2}>
                {user?.name}
              </Typography>
              <PersonOutlineOutlinedIcon />
            </>
          )}
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() => {
            navigate("/login");
          }}
        >
          <Typography variant="h6" mx={2}>
            login
          </Typography>
          <PersonOutlineOutlinedIcon />
        </MenuItem>
      )}

      <MenuItem
        onClick={() => {
          navigate("/cart");
        }}
      >
        <Typography variant="h6" mx={2}>
          Cart
        </Typography>
        <Badge badgeContent={getTotalQuantity() || 0} color="primary">
          <ShoppingCartOutlinedIcon />
        </Badge>
      </MenuItem>

      {localStorage.getItem("userToken") ? (
        <MenuItem
          onClick={() => {
            localStorage.removeItem("userToken");
            navigate("/");
            window.location.reload();
          }}
        >
          <Typography variant="h6" mx={2}>
            Logout
          </Typography>
          <LogoutOutlinedIcon />
        </MenuItem>
      ) : (
        ""
      )}
    </Menu>
  );

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

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {userToken ? (
              <Box
                aria-label="account"
                color="inherit"
                display="flex"
                alignItems="center"
              >
                <p>{user?.name}</p>
                <PersonOutlineOutlinedIcon sx={{ marginLeft: "8px" }} />
              </Box>
            ) : (
              <Button
                aria-label="account"
                color="inherit"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <Typography variant="body1" mx={1}>
                  login
                </Typography>
                <PersonOutlineOutlinedIcon />
              </Button>
            )}

            <IconButton
              aria-label="shopping-cart"
              color="inherit"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <Badge badgeContent={getTotalQuantity() || 0} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>

            {/* <IconButton aria-label="favorite-products" color="inherit">
            <Badge badgeContent={9} color="primary">
              <FavoriteBorderOutlinedIcon />
            </Badge>
          </IconButton> */}

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
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

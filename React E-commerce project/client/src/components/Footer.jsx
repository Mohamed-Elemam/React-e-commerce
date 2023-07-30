import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

const Footer = () => {
  return (
    <Box
      component="div"
      sx={{
        py: 3,
        backgroundColor: "#fff",
        borderTopLeftRadius: "50px",
        borderTopRightRadius: "50px",
        boxShadow:' 0px -3px 5px 3px rgba(189,189,189,1)'

      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexBasis: { xs: "100%", md: "25%" },
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, fontFamily: "Lobster" }}
            color="initial"
          >
            Techmart
          </Typography>
          <Box
            variant="nav"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <Box
              mx="auto"
              component="div"
              variant="caption"
              color="inherit"
              sx={{ my: 2 }}
            >
              <RoomOutlinedIcon sx={{ mr: 1 }} /> 184 Main Rd E, St Albans,
              Australia
            </Box>
            <Box
              mx="auto"
              component="div"
              variant="caption"
              color="inherit"
              sx={{ display: "flex", alignItems: "center", my: 1 }}
            >
              <EmailOutlinedIcon sx={{ mr: 1, my: 1 }} /> contact@company.com
            </Box>
            <Box
              mx="auto"
              variant="caption"
              component="div"
              color="inherit"
              sx={{ display: "flex", alignItems: "center", my: 1 }}
            >
              <LocalPhoneOutlinedIcon sx={{ mr: 1 }} /> +001 2233 456
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

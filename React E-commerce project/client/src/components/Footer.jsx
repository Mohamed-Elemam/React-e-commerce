// eslint-disable-next-line no-unused-vars
import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography, Link } from "@mui/material";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/" mr={1}>
        Techmart 
      </Link>
      {new Date().getFullYear()}
      
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box
      component="div"
      sx={{
        // py: {md:2,xs:1},
        backgroundColor: "#1976d2",
      }}
    >
      <Container >
       

<Copyright sx={{ my: 2 ,

color:'#fff'
}} />

      </Container>
    </Box>
  );
};

export default Footer;

import { Box, Button, Container, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PlaystaionAd() {
  const navigate = useNavigate()
  return (
    <>
      <Container sx={{display:{sm:'block' ,xs:'none' }}}>
        <Box sx={{position:'relative' , ";hover":{cursor:'pointer'}}} onClick={()=>{navigate('/product/8')}}>
          <img  style={{borderRadius:'20px'}} src="./playstaion.jpg" width={'100%'} alt="playstaion" />

        <Box   sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: "10%",
                textAlign: "left",
              }}>
        <Typography variant="h5" color="initial">
            PlayStation 5 Console
          </Typography>

          <Typography variant="subtitle2" my={1} color="#777">
            Experience an all-new generation Of incredible games.
          </Typography>

          <Button variant="contained" size="small" endIcon={<ArrowForwardIosIcon />}>
            Shop NOW
          </Button>
        </Box >
        </Box>
      </Container>
    </>
  );
}

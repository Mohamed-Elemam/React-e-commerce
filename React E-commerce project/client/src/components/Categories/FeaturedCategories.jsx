/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Link, Stack, Typography, Container, Grid, colors } from "@mui/material";
import { HeadphonesOutlined, LaptopMacOutlined, CameraAltOutlined, WatchOutlined, TabletMacOutlined, SportsEsportsOutlined } from '@mui/icons-material';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import TabletMacOutlinedIcon from '@mui/icons-material/TabletMacOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import { useNavigate } from "react-router-dom";



export default function FeaturedCategories() {
  const navigate = useNavigate();
  
  const categories = [
    {
      name: "Laptop",
      icon: LaptopMacOutlined,
    },
    {
      name: "camera",
      icon: CameraAltOutlined,
    },
    {
      name: "Monitor",
      icon: TvOutlinedIcon,
    },
   
    {
      name: "Headphone",
      icon: HeadphonesOutlined,
    },
    {
      name: "smartphone",
      icon: PhoneIphoneOutlinedIcon,
      
    },
    {
      name: "SmartWatch",
      icon: WatchOutlined,
    },
    {
      name: "Tablet",
      icon: TabletMacOutlinedIcon,
    },
    {
      name: "PlayStation",
      icon: SportsEsportsOutlined,
    },
  
  ];

  return (
    <Container sx={{ my: 5 }}>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
          Featured Categories
        </Typography>
        {/* <Link underline="none">View All categories &gt;</Link> */}
      </Stack>

      <Grid container spacing={2} mt={3}>
        {categories.map((category, index) => (
          <Grid item md={3} sm={6} xs={6} key={index} onClick={()=>{navigate(`/category/${category.name}`)}}>
            <Box
              p={4}
              sx={{
                position: "relative",
                border: "1px solid black",
                textAlign: "center",
                borderRadius: '5px',
                ':hover': { color: 'info.main', border: '#1976d2 1px solid', cursor: 'pointer' }
              }}
            >
              <category.icon sx={{ fontSize: 40 }} />
              <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                {category.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

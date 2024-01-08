import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Stack, Typography, Button } from "@mui/material";
import { Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const heroContent = [
    {
      img: "../../public/hero/hero1.jpg",
      slogan: "Osmo\nPocket Series",
      link: "/category/Camera",
    },
    {
      img: "../../public/hero/hero2.png",
      slogan: "Optimized\nFor The 2-in-l Laptop",
      link: "/category/Laptop",
    },
    {
      img: "../../public/hero/hero3.jpg",
      slogan: "Smart Band\nPro Version",
      link: "/category/Smartwatch",
    },
  ];
  const navigate = useNavigate();
  return (
    <Container>
      <Grid container spacing={2} my={5}>
        {heroContent.map((ele, index) => (
          <Grid
            item
            md={4}
            xs={12}
            key={index}
            onClick={() => {
              navigate(`${ele.link}`);
            }}
            sx={{ ":hover": { cursor: "pointer" } }}
          >
            <Stack sx={{ position: "relative" }}>
              <img src={`${ele.img}`} alt="hero-img" width={"100%"} />
              <Box sx={{ position: "absolute", top: "10%", left: "4%" }}>
                <Typography variant="h6" paragraph>
                  {ele.slogan}
                </Typography>
                <Button
                  variant="text"
                  color="inherit"
                  endIcon={<ArrowForwardIosIcon />}
                >
                  Shop Now
                </Button>
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

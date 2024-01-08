import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useNavigate } from "react-router-dom";

export default function DroneCamera() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          my: 5,
          ";hover": { cursor: "pointer" },
          display: { sm: "block", xs: "none" },
        }}
        onClick={() => {
          navigate("/product/658dd26f88b17f67c2d1ee1c");
        }}
      >
        <Box sx={{ position: "relative" }}>
          <img
            style={{ borderRadius: "20px" }}
            src="./drone.webp"
            width={"100%"}
            alt="drone camera"
          />

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: "10%",
              textAlign: "left",
            }}
          >
            <Typography
              sx={{ typography: { md: "h4", sm: "h5" } }}
              color="initial"
            >
              Hasselblad Camera,
              <br />
              Create to Inspire
            </Typography>

            <Typography variant="subtitle2" my={1} color="#777">
              Get a feel for what it is like to own Magic 3 Classic in advance.
            </Typography>

            <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>
              Discover More
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

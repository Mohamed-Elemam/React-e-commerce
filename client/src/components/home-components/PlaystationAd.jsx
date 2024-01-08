import { Box, Button, Container, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

export default function PlaystationAd() {
  const navigate = useNavigate();
  return (
    <>
      <Container sx={{ display: { sm: "block", xs: "none" } }}>
        <Box
          sx={{ position: "relative", ";hover": { cursor: "pointer" } }}
          onClick={() => {
            navigate(import.meta.env.VITE_PS5_PRODUCT_PAGE);
          }}
        >
          <img
            style={{ borderRadius: "20px" }}
            src="./playstation.jpg"
            width={"100%"}
            alt="Playstation"
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
            <Typography variant="h5" color="initial">
              PlayStation 5 Console
            </Typography>

            <Typography variant="subtitle2" my={1} color="#777">
              Experience an all-new generation Of incredible games.
            </Typography>

            <Button
              variant="contained"
              size="small"
              endIcon={<ArrowForwardIosIcon />}
            >
              Shop NOW
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

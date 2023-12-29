import { Typography, Container, Stack, TextField } from "@mui/material";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import { FormControl, IconButton } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

export default function Newsetler() {
  return (
    <div style={{ background: "#fffcf0" }}>
      <Container sx={{ py: 4 }}>
        <Stack
          alignItems={"center"}
          flexWrap={"wrap"}
          direction={{ lg: "row", md: "column" }}
          justifyContent={"space-between"}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 500,
              lineHeight: "24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <DraftsOutlinedIcon sx={{ fontSize: "30px", mr: 1 }} />
            Sign up to Newsletter
          </Typography>
          <Typography
            sx={{
              my: 2,
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "24px",
              textAlign: "center",
            }}
          >
            Get our emails for info on new items, sales, and more.
          </Typography>

          <form>
            <FormControl sx={{ position: "relative" }}>
              {/* <InputLabel htmlFor="my-input" sx={{color:'#000' ,textTransform:'capitalize'}}>your email address</InputLabel>
            <OutlinedInput color="secondary" type="email" id="my-input" aria-describedby="my-helper-text" required />
             */}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                backgroundColor="#fff"
                autoComplete="email"
              />
              <IconButton
                type="submit"
                sx={{
                  backgroundColor: "transparent",
                  position: "absolute",
                  bottom: "20%",
                  right: "5%",
                }}
              >
                <SendOutlinedIcon color="primary" />
              </IconButton>
            </FormControl>
          </form>
        </Stack>
      </Container>
    </div>
  );
}

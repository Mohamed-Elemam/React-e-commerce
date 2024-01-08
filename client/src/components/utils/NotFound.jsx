import { Stack } from "@mui/material";
import { Helmet } from "react-helmet";
import notfound from "/error404.svg";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        // sx={{height:'100vh'}}
      >
        <img width={"50%"} src={notfound} alt="404 page not found" />
      </Stack>
    </>
  );
}

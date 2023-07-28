import React from "react";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Zoom, useScrollTrigger } from "@mui/material";

export default function BackTop() {
  return (
    <>
      <Zoom in={useScrollTrigger()}>
        <Fab
          size="small"
          variant="extended"
          color="primary"
          sx={{ position: "fixed", bottom: "5%", right: "2%" }}
          aria-label="scroll back to top"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </>
  );
}

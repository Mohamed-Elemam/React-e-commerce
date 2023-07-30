import React from "react";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Zoom, useScrollTrigger } from "@mui/material";

const BackTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true, 
    threshold: 100, 
  });

  return (
    <Zoom in={trigger}>
      <div role="presentation" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <Fab
          size="small"
          variant="extended"
          color="primary"
          sx={{ position: "fixed", bottom: "5%", right: "2%" }}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
};

export default BackTop;

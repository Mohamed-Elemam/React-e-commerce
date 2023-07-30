// eslint-disable-next-line no-unused-vars
import React from "react";
import { Box, Grid, Container } from "@mui/material";

const companyData = [
  {
    name: "AMD",
    imageSrc: "../../public/companies/amd.png",
  },
  {
    name: "Meta",
    imageSrc: "../../public/companies/meta.png",
  },
  // {
  //   name: "samsung",
  //   imageSrc: "../../public/companies/samsung.webp",
  // },
  {
    name: "OpenAI",
    imageSrc: "../../public/companies/openai.png",
  },
  {
    name: "Zoom",
    imageSrc: "../../public/companies/zoom.png",
  },
  {
    name: "tencent",
    imageSrc: "../../public/companies/tencent.png",
  },
];

export default function Companies() {
  return (
    <Container sx={{ my: 5 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {companyData.map((company) => (
            <Grid key={company.name} md={2.4} xs={6}>
              <img src={company.imageSrc} width={'100%'} alt={company.name} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

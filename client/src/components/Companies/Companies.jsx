import { Box, Grid, Container } from "@mui/material";

const companyData = [
  {
    name: "AMD",
    imageSrc: "./companies/amd.png",
  },
  {
    name: "Meta",
    imageSrc: "./companies/meta.png",
  },
  {
    name: "OpenAI",
    imageSrc: "./companies/openai.png",
  },
  {
    name: "Zoom",
    imageSrc: "./companies/zoom.png",
  },
  {
    name: "tencent",
    imageSrc: "./companies/tencent.png",
  },
];

export default function Companies() {
  return (
    <Container sx={{ my: 5 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {companyData.map((company) => (
            <Grid key={company.name} md={2.4} xs={6}>
              <img src={company.imageSrc} width={"100%"} alt={company.name} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

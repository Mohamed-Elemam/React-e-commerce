// eslint-disable-next-line no-unused-vars
import * as React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Link,
  Typography,
  Container,
} from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { Helmet } from "react-helmet";

import { useFormik } from "formik";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Techmart
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LogIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[.!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
        "Password minimum lengh must 8 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      )
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });

  async function handleLogin(values) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        import.meta.env.VITE_REGISTERATION_API_LINK + "auth/signin",
        values
      );
      console.log(data);
      console.log(data.token);
      localStorage.setItem("userToken", data.token);
      setLoading(false);

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setLoading(false);
      setApiError(error.response.data.message);
    }
  }

  return (
    <>
      <Container>
        <Helmet>
          <title>Log IN</title>
        </Helmet>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            // noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: ".5px",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            {apiError ? (
              <Box component={"div"} sx={{ color: "error.main" }}>
                ** {apiError}
              </Box>
            ) : (
              ""
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="email"
            />
            {formik.touched.email && formik.errors.email ? (
              <Box sx={{ color: "error.main" }}>** {formik.errors.email}</Box>
            ) : (
              ""
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="current-password"
            />
            {formik.touched.password && formik.errors.password ? (
              <Box sx={{ color: "error.main" }}>
                ** {formik.errors.password}
              </Box>
            ) : (
              ""
            )}

            {loading ? (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            )}
          </Box>
          <Box>
            <Link href="/signup" variant="body2">{"don't  have an account? Sign Up"}</Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2, mb: 4 }} />
      </Container>
    </>
  );
}

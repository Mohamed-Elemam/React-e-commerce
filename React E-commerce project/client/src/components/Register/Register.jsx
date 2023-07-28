import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import * as React from "react";
import FormControl from "@mui/base/FormControl";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import {Helmet} from "react-helmet";

import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, " Name length must be between 3 to 20 characters")
      .max(20, " Name length must be between 3 to 20 characters")
      .required(" name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      // .min(8, "Min length is 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[.!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
        "Password minimum lengh must 8 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
    phone: Yup.string()
      .matches(
        /^01[0-9]{9}$/,
        "Invalid phone number format. It should start with '01' followed by 8 digits."
      )
      .required("Phone number is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:handleSignup,
  });

  async function  handleSignup  (values)  {
    try {
        setLoading(true)
      const { data } = await axios.post(
        import.meta.env.VITE_REGISTERATION_API_LINK+"auth/signup",
        values
      );
      console.log(data);
      console.log(data.token)
      localStorage.setItem('userToken',data.token)
      setLoading(false);
      // console.log(values);
      
      navigate('/');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setApiError(error.response.data.message);
    }
  }

 
  return (
    <Container>
    <Helmet>
    <title>Sign UP</title>
</Helmet>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // height: '100%',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
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
          {apiError ? <Box component={'div'} sx={{ color: "error.main" }}>** {apiError}</Box> : ""}

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="name"
            autoFocus
          />
          {formik.touched.name && formik.errors.name ? (
            <Box sx={{ color: "error.main" }}>** {formik.errors.name}</Box>
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
            <Box sx={{ color: "error.main" }}>** {formik.errors.password}</Box>
          ) : (
            ""
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            name="rePassword"
            label="Confirm Password"
            type="password"
            id="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="current-rePassword"
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <Box sx={{ color: "error.main" }}>
              ** {formik.errors.rePassword}
            </Box>
          ) : (
            ""
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone"
            type="tel"
            id="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="tel"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <Box sx={{ color: "error.main" }}>** {formik.errors.phone}</Box>
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
              Sign Up
            </LoadingButton>
          ):(<Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>)}
        </Box>
        <Box>
          <Link
            href="#"
            variant="body2"
         
          >
            <Typography >
              {"Already have an account? Log In"}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

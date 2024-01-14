import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Link,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LogIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      navigate("/");
    }
  }, [navigate]);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
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
        /^(?=.*[A-Z])(?=.*[.!@#$%^&*])(?=.*[a-z]).{8,}$/,
        "Password minimum length must be 8 characters or more and contain at least one uppercase letter, one lowercase letter, and one special character."
      )
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  async function handleLogin(values) {
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_PRODUCTS_API_LINK + "auth/login",
        values
      );

      await localStorage.setItem("userToken", data.token);
      await localStorage.setItem("userId", data.user._id);

      toast.success("Login success");
      setLoading(false);
      setDemoLoading(false);
      window.location.reload();
      navigate("/");
    } catch (error) {
      setDemoLoading(false);
      setLoading(false);
      toast.error(error.response.data.message);
      setApiError(error.response.data.message);
    }
  }
  const handleDemoLogin = () => {
    const demoUserCredentials = {
      email: import.meta.env.VITE_DEMO_LOGIN_EMAIL,
      password: import.meta.env.VITE_DEMO_LOGIN_PASSWORD,
    };
    setDemoLoading(true);
    handleLogin(demoUserCredentials);
  };
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
            {/* // */}
            {loading ? (
              <>
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
              </>
            ) : (
              <>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    setLoading(true);
                    formik.handleSubmit();
                  }}
                >
                  Login
                </Button>
              </>
            )}
            <Divider flexItem style={{ margin: "auto", width: "75%" }}>
              <h3>or </h3>
            </Divider>

            {demoLoading ? (
              <>
                <LoadingButton
                  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Demo login
                </LoadingButton>
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleDemoLogin}
                >
                  Demo login
                </Button>
              </>
            )}
          </Box>
          <Box>
            <Link href="/signup" variant="body2">
              {"don't  have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}

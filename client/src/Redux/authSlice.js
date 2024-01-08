import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

export const handleSignup = async (_, thunkApi, values) => {
  try {
    //   setLoading(true);
    const { data } = await axios.post(
      import.meta.env.VITE_PRODUCTS_API_LINK + "auth/signup",
      values
    );

    localStorage.setItem("userToken", data.token);
    return data;
    //   setLoading(false);
    //   navigate("/");
    //   toast.success("Signup success");
  } catch (error) {
    //   setLoading(false);
    //   toast.error(error.response.data.message);
    //   setApiError(error.response.data.message);
  }
};
export const handleLogin = async (_, thunkApi, values) => {
    try {
        const { data } = await axios.post(
      import.meta.env.VITE_PRODUCTS_API_LINK + "auth/login",
      values
    );

    //  toast.success("Login success");
    localStorage.setItem("userToken", data.token);
    //  setLoading(false);
    //  setDemoLoading(false);
    navigate("/");
    //  window.location.reload();
} catch (error) {
    //  setDemoLoading(false);
    //  setLoading(false);
    //  toast.error(error.response.data.message);
    //  setApiError(error.response.data.message);
}
};
export const handleLogout = async (_, thunkApi, values) => {
         localStorage.removeItem("userToken");
                  navigate("/");
                  window.location.reload();
                }
}

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null, //guest?
  },
  extraReducers: {
    //sign up
    [handleSignup.pending]: (state, action) => {},
    [handleSignup.fulfilled]: (state, action) => {},
    [handleSignup.rejected]: (state, action) => {},

    //login
    [handleLogin.pending]: (state, action) => {},
    [handleLogin.fulfilled]: (state, action) => {},
    [handleLogin.rejected]: (state, action) => {},

    //demo login
    [handleLogin.pending]: (state, action) => {},
    [handleLogin.fulfilled]: (state, action) => {},
    [handleLogin.rejected]: (state, action) => {},

    //logout
    [handleLogout.pending]: (state, action) => {},
    [handleLogout.fulfilled]: (state, action) => {
      state.user = null;
    },
    [handleLogout.rejected]: (state, action) => {},
  },
});

export default authSlice.reducer;

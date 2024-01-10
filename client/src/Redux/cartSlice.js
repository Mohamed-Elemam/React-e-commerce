import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

let userToken = localStorage.getItem("userToken");

export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    let userId = jwtDecode(userToken)._id;
    try {
      let { data } = await axios.get(
        import.meta.env.VITE_PRODUCTS_API_LINK + `cart/${userId}`,
        {
          headers: {
            Authorization: `${import.meta.env.VITE_TOKEN_SECRET} ${userToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//increment
export const addProductToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId) => {
    try {
      let { data } = await axios.post(
        import.meta.env.VITE_PRODUCTS_API_LINK + "cart",
        { productId },
        {
          headers: {
            Authorization: `${import.meta.env.VITE_TOKEN_SECRET} ${userToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

//decrement
export const decrementProductQty = createAsyncThunk(
  "cart/decrementProduct",
  async (productId) => {
    try {
      let { data } = await axios.put(
        import.meta.env.VITE_PRODUCTS_API_LINK + `cart/${productId}`,
        {},
        {
          headers: {
            Authorization: `${import.meta.env.VITE_TOKEN_SECRET} ${userToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const removeProductFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId) => {
    let userToken = localStorage.getItem("userToken");
    try {
      let { data } = await axios.delete(
        import.meta.env.VITE_PRODUCTS_API_LINK + `cart/${productId}`,
        {
          headers: {
            Authorization: `${import.meta.env.VITE_TOKEN_SECRET} ${userToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.cart;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        const addedProductId = action.payload.addProductId;
        const existingProductIndex = state.cart.cartItems.findIndex(
          (product) => product.productId._id === addedProductId
        );

        if (existingProductIndex !== -1) {
          state.cart.cartItems[existingProductIndex].quantity += 1;
        } else {
          state.cart.cartItems = action.payload.cart.cartItems;
        }
        state.cart.totalprice = action.payload.cart.totalprice;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        let removedProductId = action.payload.removedProduct;
        state.cart.cartItems = state.cart.cartItems.filter(
          (product) => product.productId._id !== removedProductId
        );
        state.cart.totalprice = action.payload.cart.totalprice;
      })
      .addCase(decrementProductQty.fulfilled, (state, action) => {
        const decrementedProductId = action.payload.decrementedProduct;
        const existingProductIndex = state.cart.cartItems.findIndex(
          (product) => product.productId._id === decrementedProductId
        );

        if (existingProductIndex !== -1) {
          state.cart.cartItems[existingProductIndex].quantity -= 1;
          state.cart.totalprice = action.payload.cart.totalprice;
          if (state.cart.cartItems[existingProductIndex].quantity === 0) {
            state.cart.cartItems = state.cart.cartItems.filter(
              (product) => product.productId._id !== decrementedProductId
            );
          }
        }
      });
  },
});

export const cartReducer = cartSlice.reducer;

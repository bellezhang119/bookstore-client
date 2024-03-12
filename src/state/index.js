import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  orders: [],
  cart: [],
  wishlist: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setOrders: (state, action) => {
      state.orders = action.payload.orders;
    },
    setCart: (state, action) => {
      state.cart = action.payload.cart;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload.wishlist;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setOrders,
  setCart,
  setWishlist,
} = authSlice.actions;
export default authSlice.reducer;

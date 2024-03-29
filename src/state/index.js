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
    addToCart: (state, action) => {
      const { productId } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.productId === productId
      );

      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity++;
      } else {
        state.cart.push({ productId, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.productId === productId
      );

      if (existingItemIndex !== -1) {
        if (state.cart[existingItemIndex].quantity !== 1) {
          state.cart[existingItemIndex].quantity--;
        } else {
          state.cart.splice(existingItemIndex, 1);
        }
      }
    },
    deleteFromCart: (state, action) => {
      const { productId } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.productId === productId
      );

      if (existingItemIndex !== -1) {
        state.cart.splice(existingItemIndex, 1);
      }
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload.wishlist;
    },
    addToWishlist: (state, action) => {
      const { productId } = action.payload;
      const existingItemIndex = state.wishlist.findIndex(
        (item) => item.productId === productId
      );

      if (existingItemIndex !== -1) {
        state.wishlist[existingItemIndex].quantity++;
      } else {
        state.wishlist.push({ productId, quantity: 1 });
      }
    },
    removeFromWishlis: (state, action) => {
      const { productId } = action.payload;
      const existingItemIndex = state.wishlist.findIndex(
        (item) => item.productId === productId
      );

      if (existingItemIndex !== -1) {
        if (state.wishlist[existingItemIndex].quantity !== 1) {
          state.wishlist[existingItemIndex].quantity--;
        } else {
          state.wishlist.splice(existingItemIndex, 1);
        }
      }
    },
    deleteFromWishlis: (state, action) => {
      const { productId } = action.payload;
      const existingItemIndex = state.wishlist.findIndex(
        (item) => item.productId === productId
      );

      if (existingItemIndex !== -1) {
        state.wishlist.splice(existingItemIndex, 1);
      }
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setOrders,
  setCart,
  addToCart,
  removeFromCart,
  deleteFromCart,
  setWishlist,
  addToWishlist,
  removeFromWishlist,
  deleteFromWishlist,
} = authSlice.actions;
export default authSlice.reducer;

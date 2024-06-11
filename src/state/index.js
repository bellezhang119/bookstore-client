import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
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
    setCartState: (state, action) => {
      state.cart = action.payload.cart;
    },
    addToCartState: (state, action) => {
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
    removeFromCartState: (state, action) => {
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
    deleteFromCartState: (state, action) => {
      const { productId } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.productId === productId
      );

      if (existingItemIndex !== -1) {
        state.cart.splice(existingItemIndex, 1);
      }
    },
    setWishlistState: (state, action) => {
      state.wishlist = action.payload.wishlist;
    },
    addToWishlistState: (state, action) => {
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
    removeFromWishlistState: (state, action) => {
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
    deleteFromWishlistState: (state, action) => {
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
  setCartState,
  addToCartState,
  removeFromCartState,
  deleteFromCartState,
  setWishlistState,
  addToWishlistState,
  removeFromWishlistState,
  deleteFromWishlistState,
} = authSlice.actions;
export default authSlice.reducer;

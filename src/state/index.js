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
    setOrder: (state, action) => {
      const updatedOrders = state.orders.map((order) => {
        if (order._id === action.payload.order_id) return action.payload.order;
        return order;
      });
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
        state.cart[existingItemIndex].quantity += 1;
      } else {
        state.cart.push({ productId, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      const index = state.cart.findIndex(
        (item) => item.productId === productId
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
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
        state.wishlist[existingItemIndex].quantity += 1;
      } else {
        state.wishlist.push({ productId, quantity: 1 });
      }
    },
    removeFromWishlist: (state, action) => {
      const { productId } = action.payload;
      const index = state.wishlist.findIndex(
        (item) => item.productId === productId
      );
      if (index !== -1) {
        state.wishlist.splice(index, 1);
      }
    },
  },
});

export const { setMode, setLogin, setLogout, setOrders, setOrder } =
  authSlice.actions;
export default authSlice.reducer;

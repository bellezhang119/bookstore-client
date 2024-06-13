import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCartState,
  addToWishlistState,
  removeFromCartState,
  removeFromWishlistState,
  deleteFromCartState,
  deleteFromWishlistState,
} from "state";

export const useCartWishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const _id = user ? user._id : null;
  const isAuth = Boolean(token);

  const addToCart = async (product) => {
    if (!isAuth) {
      navigate("/login");
    } else if (product) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users/${_id}/cart/add/${product._id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          //dispatch(addToCartState({productId: product._id}));
          console.log("Item added to cart");
          return true;
        } else {
          const err = await response.json();
          throw new Error(err.msg || "Failed add item to cart");
        }
      } catch (err) {
        console.error("Error adding item to cart:", err.message);
      }
    }
  };

  const addToWishlist = async (product) => {
    if (!isAuth) {
      navigate("/login");
    } else if (product) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users/${_id}/wishlist/add/${product._id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          //dispatch(addToWishlistState({productId: product._id}));
          console.log("Item added to wishlist");
          return true;
        } else {
          const err = await response.json();
          throw new Error(err.msg || "Failed add item to wishlist");
        }
      } catch (err) {
        console.error("Error adding item to wishlist:", err.message);
      }
    }
  };

  const removeFromCart = async (product) => {
    if (!isAuth) {
      navigate("/login");
    } else if (product) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users/${_id}/cart/remove/${product._id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          //dispatch(removeFromCartState({productId: product._id}));
          console.log("Item removed from cart");
          return true;
        } else {
          const err = await response.json();
          throw new Error(err.msg || "Failed to remove item from cart");
        }
      } catch (err) {
        console.log("Failed to remove item from cart:", err.message);
      }
    }
  };

  const removeFromWishlist = async (product) => {
    if (!isAuth) {
      navigate("/login");
    } else if (product) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users/${_id}/wishlist/remove/${product._id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          //dispatch(removeFromWishlistState({productId: product._id}));
          console.log("Item removed from wishlist");
          return true;
        } else {
          const err = await response.json();
          throw new Error(err.msg || "Failed to remove item from wishlist");
        }
      } catch (err) {
        console.log("Failed to remove item from wishlist:", err.message);
      }
    }
  };

  const deleteFromCart = async (product) => {
    if (!isAuth) {
      navigate("/login");
    } else if (product) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users/${_id}/cart/delete/${product._id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          //dispatch(deleteFromCartState({productId: product._id}));
          console.log("Item deleted from cart");
          return true;
        } else {
          const err = await response.json();
          throw new Error(err.msg || "Failed to delete item from cart");
        }
      } catch (err) {
        console.log("Failed to delete item from cart:", err.message);
      }
    }
  };

  const deleteFromWishlist = async (product) => {
    if (!isAuth) {
      navigate("/login");
    } else if (product) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users/${_id}/wishlist/delete/${product._id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          //dispatch(deleteFromWishlistState({productId: product._id}));
          console.log("Item deleted from wishlist");
          return true;
        } else {
          const err = await response.json();
          throw new Error(err.msg || "Failed to delete item from wishlist");
        }
      } catch (err) {
        console.log("Failed to delete item from wishlist:", err.message);
      }
    }
  };

  return {
    addToCart,
    addToWishlist,
    removeFromCart,
    removeFromWishlist,
    deleteFromCart,
    deleteFromWishlist,
  };
};

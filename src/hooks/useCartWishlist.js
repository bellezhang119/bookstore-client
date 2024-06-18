import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Hook for cart and wishlist operations
export const useCartWishlist = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const _id = user ? user._id : null;
  const isAuth = Boolean(token);

  // Add item to cart
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

  // Add item to wishlist
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

  // Remove item from cart
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

  // Remove item from wishlist
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

  // Delete item from cart
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

  // Delete item from wishlist
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

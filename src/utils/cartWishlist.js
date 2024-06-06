import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, addToWishlist } from "state";

export const useCartWishlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const _id = user ? user._id : null;
    const isAuth = Boolean(token);
  
    const addToCartDB = async (product) => {
      if (!isAuth) {
        navigate("/login");
      } else if (product) {
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
          dispatch(addToCart(product._id));
          console.log("Item added to cart");
        } else {
          console.error("Failed to add item to cart");
        }
      }
    };
  
    const addToWishlistDB = async (product) => {
      if (!isAuth) {
        navigate("/login");
      } else if (product) {
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
          dispatch(addToWishlist(product._id));
          console.log("Item added to wishlist");
        } else {
          console.error("Failed to add item to wishlist");
        }
      }
    };
  
    return { addToCartDB, addToWishlistDB };
  };
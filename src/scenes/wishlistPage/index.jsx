import {
  Box,
  Typography,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import ItemWidget from "scenes/widgets/itemWidget";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "scenes/navbar";

const WishlistPage = () => {
  const isMobile = useMediaQuery("(max-width: 500px)");
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(null);
  const [totalPrice, setTotalPrice] = useState("0");

  const { palette } = useTheme();

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const _id = user ? user._id : null;
  const isAuth = Boolean(token);

  useEffect(() => {
    getWishlist();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [wishlist]);

  const calculateTotalPrice = () => {
    let price = 0;
    wishlist?.forEach((item) => {
      const itemPrice = parseFloat(item.product.productPrice) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;
      price += itemPrice * itemQuantity;
    });
    setTotalPrice(parseFloat(price.toFixed(2)));
  };

  const addWishlistToCart = async () => {
    if (!isAuth) {
      navigate(`/login`);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/${_id}/cart/add/wishlist`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.msg || 'Failed to add wishlist to cart');
      }

      navigate(`/cart/${_id}`);
    } catch (error) {
      console.error("Error adding wishlist to cart:", error.message);
    }
  };

  const getWishlist = async () => {
    if (!isAuth) {
      navigate("/login");
      return; // Return early if user is not authenticated
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/${_id}/wishlist`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist data");
      }

      const wishlistData = await response.json(); // Parse response JSON

      setWishlist(wishlistData);
    } catch (error) {
      console.error("Error fetching wishlist data:", error.message);
    }
  };

  const onDelete = () => {
    getWishlist();
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          paddingTop: "80px",
          paddingBottom: "0.1rem",
        }}
      >
        {wishlist &&
          wishlist.map((item, index) => (
            <ItemWidget
              key={item.product._id}
              product={item.product}
              initialCount={item.quantity}
              context="wishlist"
              onDelete={onDelete}
            />
          ))}
        <WidgetWrapper
          sx={{
            maxWidth: "700px",
            margin: "1rem auto",
          }}
        >
          {isMobile ? (
            <Box display="flex" justifyContent="space-between">
              <Typography
                variant="h4"
                fontWeight="700"
                color="main"
                marginBottom="0.5rem"
              >
                Total: ${totalPrice}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  marginBottom: "0.3rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  fontSize: "18px",
                  "&:hover": {
                    backgroundColor: palette.background.alt,
                    color: palette.primary.main,
                  },
                }}
                onClick={addWishlistToCart}
              >
                Add To Cart
              </Button>
            </Box>
          ) : (
            <Box display="flex" justifyContent="space-between">
              <Typography
                variant="h3"
                fontWeight="600"
                color="main"
                marginBottom="0.5rem"
              >
                Total: ${totalPrice}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  marginBottom: "0.3rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  fontSize: "18px",
                  "&:hover": {
                    backgroundColor: palette.background.alt,
                    color: palette.primary.main,
                  },
                }}
                onClick={addWishlistToCart}
              >
                Add To Cart
              </Button>
            </Box>
          )}
        </WidgetWrapper>
      </Box>
    </Box>
  );
};

export default WishlistPage;

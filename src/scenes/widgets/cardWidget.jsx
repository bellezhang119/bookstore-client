import { AddShoppingCart, FavoriteBorder } from "@mui/icons-material";
import {
  Box,
  Typography,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import ProductImage from "components/ProductImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, addToWishlist } from "state";

const CardWidget = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const user = useSelector((state) => state.user);
  const _id = user ? user._id : null;
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(useSelector((state) => state.token));

  const isMobile = useMediaQuery("(max-width: 500px)");

  const addToCartDB = async () => {
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

  const addToWishlistDB = async () => {
    if (!isAuth) {
      navigate("login");
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

  return (
    <WidgetWrapper maxWidth={isMobile ? "150px" : "200px"}>
      <Box>
        <ProductImage
          image={product.picturePath}
          width={isMobile ? "100px" : "150px"}
          height={isMobile ? "180px" : "250px"}
        />
        <Typography
          variant="h4"
          color="main"
          marginBottom="0.5rem"
          sx={{
            fontSize: isMobile ? "14px" : "20px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.productName}
        </Typography>
        <Typography
          variant="h4"
          color="main"
          marginBottom="0.5rem"
          sx={{
            fontSize: isMobile ? "10px" : "14px",
            fontWeight: "600",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          ${product.productPrice}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            fontSize: isMobile ? "10px" : "14px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Publish Date:{" "}
          {product ? new Date(product.publishDate).toLocaleDateString() : ""}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            fontSize: isMobile ? "10px" : "14px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Author: {product?.authorNames.join(", ")}
        </Typography>
        <Box display="flex" justifyContent="flex-start" marginTop="0.5rem">
          <Button
            variant="outlined"
            startIcon={<AddShoppingCart />}
            onClick={addToCartDB}
            sx={{
              marginBottom: "0.3rem",
              backgroundColor: primary,
              color: palette.background.alt,
              fontSize: isMobile ? "10px" : "14px",
              "&:hover": {
                backgroundColor: palette.background.alt,
                color: primary,
              },
            }}
          >
            Cart
          </Button>
        </Box>
        <Box color="main">
          <Button
            variant="outlined"
            startIcon={<FavoriteBorder />}
            onClick={addToWishlistDB}
            sx={{
              color: primary,
              backgroundColor: palette.background.alt,
              fontSize: isMobile ? "10px" : "14px",
              "&:hover": {
                backgroundColor: primary,
                color: palette.background.alt,
              },
            }}
          >
            Wishlist
          </Button>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default CardWidget;

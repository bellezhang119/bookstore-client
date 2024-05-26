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

const ProductWidget = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const user = useSelector((state) => state.user);
  const _id = user ? user._id : null;
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(useSelector((state) => state.token));

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const cartButtonTextDesktop = "Add To Cart";
  const cartButtonTextMobile = "Cart";
  const wishlistButtonTextDesktop = "Add To Wishlist";
  const wishlistButtonTextMobile = "Wishlist";

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
    <WidgetWrapper marginBottom="0.5rem">
      <FlexBetween gap="1.5rem">
        <Box>
          <ProductImage
            image={product.picturePath}
            width="150px"
            height="230px"
          />
        </Box>
        <Box>
          <Typography variant="h3" color="main" marginBottom="1rem">
            {product?.productName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Publish Date:{" "}
            {product ? new Date(product.publishDate).toLocaleDateString() : ""}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Author: {product?.authorNames.join(", ")}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Category: {product?.categoryList.join(", ")}
          </Typography>
          <Typography variant="body1" paragraph>
            {product?.description}
          </Typography>
          <Typography variant="h4" paragraph>
            ${product?.productPrice}
          </Typography>
          <FlexBetween gap="1rem">
            <Box
              color="main"
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="outlined"
                startIcon={<AddShoppingCart />}
                onClick={addToCartDB}
                sx={{
                  backgroundColor: primary,
                  color: palette.background.alt,
                  "&:hover": {
                    backgroundColor: palette.background.alt,
                    color: primary,
                  },
                }}
              >
                {isNonMobileScreens
                  ? cartButtonTextDesktop
                  : cartButtonTextMobile}
              </Button>
              <Button
                variant="outlined"
                startIcon={<FavoriteBorder />}
                onClick={addToWishlistDB}
                sx={{
                  color: primary,
                  backgroundColor: palette.background.alt,
                  marginLeft: "10px",
                  "&:hover": {
                    backgroundColor: primary,
                    color: palette.background.alt,
                  },
                }}
              >
                {isNonMobileScreens
                  ? wishlistButtonTextDesktop
                  : wishlistButtonTextMobile}
              </Button>
            </Box>
          </FlexBetween>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default ProductWidget;

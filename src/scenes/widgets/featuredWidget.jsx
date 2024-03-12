import { AddShoppingCart, FavoriteBorder } from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
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
import { setCart, setWishlist } from "state";

const FeaturedWidget = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [picturePath, setPicturePath] = useState("");

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const user = useSelector((state) => state.user);
  const _id = user ? user._id : null;
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(useSelector((state) => state.token));

  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  useEffect(() => {
    getFeaturedProduct();
  }, []);

  const getFeaturedProduct = async () => {
    const response = await fetch(`http://localhost:3001/api/products/`, {
      method: "GET",
    });

    const products = await response.json();

    const product = products[0];
    setFeaturedProduct(product);
    setPicturePath(product.picturePath);
  };

  const addToCart = async () => {
    if (!isAuth) {
      navigate("/login");
    } else if (!featuredProduct) {
      const response = await fetch(
        `http://localhost:3001/api/users/${_id}/cart/${featuredProduct._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ action: "add" }),
        }
      );
      const newCart = [...cart, featuredProduct];
      dispatch(setCart({ cart: newCart }));
    }
  };

  const addToWishlist = async () => {
    if (!isAuth) {
      navigate("login");
    } else if (!featuredProduct) {
      const response = await fetch(
        `http:localhost:3001/api/users/${_id}/cart/${featuredProduct._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ action: "add" }),
        }
      );
      const newWishlist = [...wishlist, featuredProduct];
      dispatch(setWishlist({ wishlist: newWishlist }));
    }
  };

  return (
    <WidgetWrapper>
      <Box marginBottom="1rem">
        <Typography variant="h2" color="primary" fontWeight="500" gutterBottom>
          Featured Book Today
        </Typography>
      </Box>
      <FlexBetween gap="1.5rem">
        <Box>
          <ProductImage image={picturePath} />
        </Box>
        <Box>
          <Typography variant="h4" color="main" marginBottom="1rem">
            {featuredProduct?.productName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Publish Date: {featuredProduct?.publishDate}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Author: {featuredProduct?.author}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Category: {featuredProduct?.categoryList.join(", ")}
          </Typography>
          <Typography variant="body1" paragraph>
            {featuredProduct?.description}
          </Typography>
          <FlexBetween gap="1rem">
            <Box
              color="main"
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="outlined"
                startIcon={<AddShoppingCart />}
                onClick={addToCart}
                sx={{
                  backgroundColor: primary,
                  color: palette.background.alt,
                  "&:hover": {
                    backgroundColor: palette.background.alt,
                    color: primary,
                  },
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                startIcon={<FavoriteBorder />}
                onClick={addToWishlist}
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
                Add to Wishlist
              </Button>
            </Box>
          </FlexBetween>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default FeaturedWidget;

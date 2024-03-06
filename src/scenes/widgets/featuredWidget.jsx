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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist } from "state";

const FeaturedWidget = ({ userId, picturePath }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [fearutedProduct, setFearutedProduct] = useState(null);
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const getFeaturedProduct = async () => {
    const response = await fetch("http//localhost:3001/api/products/", {
      method: "GET",
    });

    const products = await response.json();

    const product = products[0];
    setFearutedProduct(fearutedProduct);
  };
};

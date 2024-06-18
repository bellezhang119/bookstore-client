import {
  Box,
  Typography,
  useTheme,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import ProductImage from "components/ProductImage";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import { useCartWishlist } from "hooks/useCartWishlist.js";

const ItemWidget = ({
  product,
  initialCount,
  context,
  onDelete,
  setLoading,
}) => {
  const [count, setCount] = useState(initialCount);
  const isMobile = useMediaQuery("(max-width: 500px)");
  const theme = useTheme();
  const neutral = theme.palette.neutral;

  const {
    addToCart,
    removeFromCart,
    deleteFromCart,
    addToWishlist,
    removeFromWishlist,
    deleteFromWishlist,
  } = useCartWishlist();

  // If parent component is cart, add to cart
  // Else add to wishlist
  const handleAdd = async () => {
    setLoading(true);
    const result =
      context === "cart"
        ? await addToCart(product)
        : await addToWishlist(product);
    if (result) {
      setCount(count + 1);
      setLoading(false);
    }
  };

  // If parent component is cart, remove from cart
  // Else remove from wishlist
  const handleRemove = async () => {
    setLoading(true);
    const result =
      context === "cart"
        ? await removeFromCart(product)
        : await removeFromWishlist(product);
    if (result) {
      setCount(count - 1);
      setLoading(false);
    }
  };

  // If parent component is cart, delete from cart
  // Else delete from wishlist
  const handleDelete = async () => {
    setLoading(true);
    const result =
      context === "cart"
        ? await deleteFromCart(product)
        : await deleteFromWishlist(product);
    if (result) {
      onDelete();
      setLoading(false);
    }
  };

  if (count <= 0) {
    onDelete();
  }

  return (
    <Box>
      <WidgetWrapper
        sx={{
          maxWidth: "700px",
          margin: "1rem auto",
        }}
      >
        <FlexBetween gap="1.5rem">
          {isMobile ? (
            <>
              <Box>
                <ProductImage
                  image={product.picturePath}
                  width="80px"
                  height="130px"
                />
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" color="main" marginBottom="1rem">
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/product/${product._id}`}
                  >
                    {product?.productName}
                  </Link>
                </Typography>
                <Typography variant="h6" fontWeight="400" paragraph>
                  ${product?.productPrice}
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <ProductImage
                  image={product.picturePath}
                  width="100px"
                  height="160px"
                />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h3" color="main" marginBottom="1rem">
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/product/${product._id}`}
                  >
                    {product?.productName}
                  </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Publish Date:{" "}
                  {product
                    ? new Date(product.publishDate).toLocaleDateString()
                    : ""}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Author: {product?.authorNames.join(", ")}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  Category: {product?.categoryList.join(", ")}
                </Typography>
                <Typography variant="h4" fontWeight="500" paragraph>
                  ${product?.productPrice}
                </Typography>
              </Box>
            </>
          )}

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile ? (
              <>
                <IconButton
                  sx={{
                    padding: "0rem",
                    color: neutral.dark,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: neutral.medium,
                    },
                  }}
                  onClick={handleRemove}
                >
                  <Remove sx={{ margin: "0.5rem", fontSize: "20px" }} />
                </IconButton>
                <Typography margin="0.5rem" variant="h5">
                  {count}
                </Typography>
                <IconButton
                  sx={{
                    padding: "0rem",
                    color: neutral.dark,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: neutral.medium,
                    },
                  }}
                  onClick={handleAdd}
                >
                  <Add sx={{ margin: "0.5rem", fontSize: "20px" }} />
                </IconButton>
                <IconButton
                  sx={{
                    padding: "0rem",
                    color: neutral.dark,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: neutral.medium,
                    },
                  }}
                  onClick={handleDelete}
                >
                  <Delete sx={{ margin: "0.5rem", fontSize: "20px" }} />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  sx={{
                    color: neutral.dark,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: neutral.medium,
                    },
                  }}
                  onClick={handleRemove}
                >
                  <Remove sx={{ margin: "0.5rem", fontSize: "25px" }} />
                </IconButton>
                <Typography margin="0.5rem" variant="h3">
                  {count}
                </Typography>
                <IconButton
                  sx={{
                    color: neutral.dark,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: neutral.medium,
                    },
                  }}
                  onClick={handleAdd}
                >
                  <Add sx={{ margin: "0.5rem", fontSize: "25px" }} />
                </IconButton>
                <IconButton
                  sx={{
                    color: neutral.dark,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: neutral.medium,
                    },
                  }}
                  onClick={handleDelete}
                >
                  <Delete sx={{ margin: "0.5rem", fontSize: "25px" }} />
                </IconButton>
              </>
            )}
          </Box>
        </FlexBetween>
      </WidgetWrapper>
    </Box>
  );
};

export default ItemWidget;

import { AddShoppingCart, FavoriteBorder } from "@mui/icons-material";
import {
  Box,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import ProductImage from "components/ProductImage";
import WidgetWrapper from "components/WidgetWrapper";
import { Link } from "react-router-dom";
import { useCartWishlist } from "hooks/useCartWishlist.js";

const CardWidget = ({ product, setLoading }) => {
  const { palette } = useTheme();
  const primary = palette.primary.main;

  const { addToCart, addToWishlist } = useCartWishlist();

  // Use hook to add item to cart
  const handleAddCart = async () => {
    setLoading(true);
    const result = await addToCart(product);
    if (result) {
      setLoading(false);
    }
  };

  // Use hook to add item to wishlist
  const handleAddWishlist = async () => {
    setLoading(true);
    const result = await addToWishlist(product);
    if (result) {
      setLoading(false);
    }
  };

  const isMobile = useMediaQuery("(max-width: 500px)");

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
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/product/${product._id}`}
          >
            {product?.productName}
          </Link>
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
            onClick={handleAddCart}
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
            onClick={handleAddWishlist}
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

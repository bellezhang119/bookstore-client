import {
  Box,
  Typography,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/material/icons-material";
import { useState, useEffect } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";

const ItemWidget = ({ product, count }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

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
          <Typography variant="body2" color="textSecondary" paragraph>
            Category: {product?.categoryList.join(", ")}
          </Typography>
          <Typography variant="h4" fontWeight="500" paragraph>
            ${product?.productPrice}
          </Typography>
        </Box>
        <Box>
          <IconButton>
            <Remove sx={{ fontSize: "25px" }} />
          </IconButton>
          <Typography type="h3">{count}</Typography>
          <IconButton>
            <Add sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton>
            <Delete sx={{ fontSize: "25px" }} />
          </IconButton>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default ItemWidget;

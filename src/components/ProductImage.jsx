import { Box } from "@mui/material";

const ProductImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "5%" }}
        width={size}
        height={size}
        alt="product"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default ProductImage;

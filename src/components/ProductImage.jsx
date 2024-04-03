import { Box } from "@mui/material";

const ProductImage = ({ image, width, height }) => {
  return (
    <Box width={width} height={height} marginBottom="1rem">
      <img
        style={{ objectFit: "cover" }}
        width={width}
        height={height}
        alt="product"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default ProductImage;

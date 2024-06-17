import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  Container,
  Grid,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import Navbar from "scenes/navbar";
import ProductWidget from "scenes/widgets/productWidget";
import CardWidget from "scenes/widgets/cardWidget";
import LoadingWidget from "scenes/widgets/loadingWidget";
import useWindowWidth from "hooks/useWindowWidth.js";

const HomePage = () => {
  const windowWidth = useWindowWidth();
  const isMobile = useMediaQuery("(max-width: 500px)");

  const [productList, setProductList] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [cardDisplayed, setCardDisplayed] = useState(4);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (windowWidth) {
      setCardDisplayed(Math.floor(windowWidth / 230));
    }
  }, [windowWidth]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/products/`, {
        method: "GET",
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.msg || "Failed to get products");
      }

      const products = await response.json();
      setFeaturedProduct(products[1]);
      setProductList(products.slice(0, 15));
      setLoading(false);
    } catch (err) {
      console.log("Failed to get products:", err.message);
    }
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + cardDisplayed, productList.length - cardDisplayed)
    );
  };

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - cardDisplayed, 0));
  };

  const isNextDisabled = startIndex + cardDisplayed >= productList.length;
  const isPrevDisabled = startIndex === 0;

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "80px",
        }}
      >
        <Typography
          marginTop="1rem"
          variant={isMobile ? "h3" : "h1"}
          sx={{ fontWeight: "480" }}
        >
          Featured Book Today
        </Typography>
        <Box margin="1rem" maxWidth="90%">
          {featuredProduct && (
            <ProductWidget product={featuredProduct} setLoading={setLoading} />
          )}
        </Box>

        <Typography
          marginBottom="1rem"
          variant={isMobile ? "h4" : "h2"}
          sx={{ fontWeight: "480" }}
        >
          Recommended
        </Typography>

        <Box display="flex" alignItems="center">
          <IconButton onClick={handlePrevClick} disabled={isPrevDisabled}>
            <ArrowBack />
          </IconButton>

          <Box
            marginBottom="1rem"
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            {productList
              .slice(startIndex, startIndex + cardDisplayed)
              .map((item) => (
                <Box key={item._id} marginX="3px">
                  <CardWidget
                    key={item._id}
                    product={item}
                    setLoading={setLoading}
                  />
                </Box>
              ))}
          </Box>

          <IconButton onClick={handleNextClick} disabled={isNextDisabled}>
            <ArrowForward />
          </IconButton>
        </Box>
      </Box>
      <LoadingWidget open={loading} />
    </Box>
  );
};

export default HomePage;

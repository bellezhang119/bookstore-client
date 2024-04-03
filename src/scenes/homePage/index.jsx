import { Box, IconButton, useMediaQuery, Container, Grid } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import Navbar from "scenes/navbar";
import FeaturedWidget from "scenes/widgets/featuredWidget";
import CardWidget from "scenes/widgets/cardWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [productList, setProductList] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [cardDisplayed, setCardDisplayed] = useState(4);
  const containerRef = useRef(null);

  useEffect(() => {
    getCardProducts();
  }, []);

  useEffect(() => {
    setCardDisplayed(isNonMobileScreens ? 4 : 2);
  }, [isNonMobileScreens]);

  const getCardProducts = async () => {
    const response = await fetch(`http://localhost:3001/api/products/`, {
      method: "GET",
    });

    const products = await response.json();
    setProductList(products.slice(0, 12));
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
        }}
      >
        {isNonMobileScreens ? (
          <Box margin="1rem" maxWidth="60%">
            <FeaturedWidget />
          </Box>
        ) : (
          <Box margin="1rem" maxWidth="90%">
            <FeaturedWidget />
          </Box>
        )}

        <Box display="flex" alignItems="center">
          <IconButton onClick={handlePrevClick} disabled={isPrevDisabled}>
            <ArrowBack />
          </IconButton>

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            overflowX="auto"
          >
            {productList.slice(startIndex, startIndex + cardDisplayed).map((item) => (
              <Box key={item.id} marginX="3px">
                <CardWidget product={item} />
              </Box>
            ))}
          </Box>

          <IconButton onClick={handleNextClick} disabled={isNextDisabled}>
            <ArrowForward />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;

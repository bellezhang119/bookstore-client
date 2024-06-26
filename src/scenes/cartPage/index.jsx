import {
  Box,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import ItemWidget from "scenes/widgets/itemWidget";
import LoadingWidget from "scenes/widgets/loadingWidget";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "scenes/navbar";

const CartPage = () => {
  const isMobile = useMediaQuery("(max-width: 500px)");
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState("0");
  const [loading, setLoading] = useState(false);

  const { palette } = useTheme();

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const _id = user ? user._id : null;
  const isAuth = Boolean(token);

  // Get user cart
  const getCart = useCallback(async () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/api/users/${_id}/cart`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.msg || "Failed to fetch cart data");
      }

      const cartData = await response.json();

      setCart(cartData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart data:", err.message);
      setLoading(false);
    }
  }, [isAuth, navigate, token, _id]);

  // Calculate total price of cart
  const calculateTotalPrice = useCallback(() => {
    let price = 0;
    cart?.forEach((item) => {
      const itemPrice = parseFloat(item.product.productPrice) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;
      price += itemPrice * itemQuantity;
    });
    setTotalPrice(parseFloat(price.toFixed(2)));
  }, [cart]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  useEffect(() => {
    calculateTotalPrice();
  }, [cart, calculateTotalPrice]);

  // Create new order in database with current items in cart
  const createOrder = async () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    if (!cart || cart.length === 0) {
      return;
    }
    try {
      const payload = {
        userId: _id,
        productList: cart.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
          productPrice: item.product.productPrice,
          picturePath: item.product.picturePath,
        })),
      };
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.msg || "Failed to create order");
      }
      setLoading(false);
      getCart();
    } catch (err) {
      console.error("Failed to create order", err.message);
    }
  };

  const onDelete = () => {
    getCart();
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          paddingTop: "80px",
          paddingBottom: "0.1rem",
        }}
      >
        {cart &&
          cart.map((item, index) => (
            <ItemWidget
              key={item.product._id}
              product={item.product}
              initialCount={item.quantity}
              context="cart"
              onDelete={onDelete}
              setLoading={setLoading}
            />
          ))}
        <WidgetWrapper
          sx={{
            maxWidth: "700px",
            margin: "1rem auto",
          }}
        >
          {isMobile ? (
            <Box display="flex" justifyContent="space-between">
              <Typography
                variant="h4"
                fontWeight="700"
                color="main"
                marginBottom="0.5rem"
              >
                Total: ${totalPrice}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  marginBottom: "0.3rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  fontSize: "18px",
                  "&:hover": {
                    backgroundColor: palette.background.alt,
                    color: palette.primary.main,
                  },
                }}
                onClick={createOrder}
              >
                Checkout
              </Button>
            </Box>
          ) : (
            <Box display="flex" justifyContent="space-between">
              <Typography
                variant="h3"
                fontWeight="600"
                color="main"
                marginBottom="0.5rem"
              >
                Total: ${totalPrice}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  marginBottom: "0.3rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  fontSize: "18px",
                  "&:hover": {
                    backgroundColor: palette.background.alt,
                    color: palette.primary.main,
                  },
                }}
                onClick={createOrder}
              >
                Checkout
              </Button>
            </Box>
          )}
        </WidgetWrapper>
      </Box>
      <LoadingWidget open={loading} />
    </Box>
  );
};

export default CartPage;

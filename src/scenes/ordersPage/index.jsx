import {
  Box,
  Typography,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import ItemWidget from "scenes/widgets/itemWidget";
import LoadingWidget from "scenes/widgets/loadingWidget";
import ProductImage from "components/ProductImage";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "scenes/navbar";

const OrdersPage = () => {
  const { palette } = useTheme();

  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const _id = user ? user._id : null;
  const isAuth = Boolean(token);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/${_id}/orders`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.msg || "Failed fetching user orders");
      }
      const orderData = await response.json();
      setOrders(orderData.userOrders);
    } catch (err) {
      console.error("Error fetching user orders:", err.message);
    }
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
        {orders &&
          orders.map((order, index) => (
            <WidgetWrapper
              key={order._id}
              sx={{
                maxWidth: "700px",
                margin: "1rem auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ProductImage
                image={order.productList[0].picturePath}
                width="100px"
                height="160px"
                sx={{ marginRight: "1rem" }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" margin="1rem" sx={{ fontWeight: 500 }}>
                  {order._id}
                </Typography>
                <Typography variant="h6" margin="1rem">
                  Order Date: {new Date(order.orderDate).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" margin="1rem">
                  Total Items:{" "}
                  {order.productList.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                  )}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="h5"
                  margin="1rem"
                  sx={{ fontWeight: 600, marginLeft: "auto" }}
                >
                  Total Price: ${order.transactionAmount.toFixed(2)}
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
                >
                  Track shipping
                </Button>
              </Box>
            </WidgetWrapper>
          ))}
      </Box>
    </Box>
  );
};

export default OrdersPage;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import UserPage from "./scenes/userPage";
import SearchPage from "./scenes/searchPage";
import ProductPage from "./scenes/productPage";
import CartPage from "./scenes/cartPage";
import WishlistPage from "./scenes/wishlistPage";
import OrdersPage from "./scenes/ordersPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:userId" element={<UserPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart/:userId" element={<CartPage />} />
            <Route path="/wishlist/:userId" element={<WishlistPage />} />
            <Route path="/orders/:userId" element={<OrdersPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

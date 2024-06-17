import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Person,
  ShoppingCart,
  Favorite,
  RequestPage,
  Settings,
  DarkMode,
  LightMode,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate, Link } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);
  const _id = user ? user._id : null;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutral = theme.palette.neutral;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  let firstName = "User";
  if (user) {
    firstName = `${user.firstName}`;
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const navigateToSearch = () => {
    navigate(`/search/?query=${encodeURIComponent(searchText)}`);
  };

  return (
    <FlexBetween
      padding="1rem 6%"
      backgroundColor={alt}
      sx={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <FlexBetween gap="1.75rem" width="100%">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Bookstore
        </Typography>
        <FlexBetween
          backgroundColor={neutral.light}
          borderRadius="9px"
          padding="0.1rem 1rem 0.1rem 1rem"
          marginRight="1.5rem"
          width="100%"
        >
          <InputBase
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
            onKeyUp={(event) => {
              if (event.key === "Enter") navigateToSearch();
            }}
            sx={{ flexGrow: 1, width: "100%" }}
          />
          <IconButton onClick={() => navigateToSearch()}>
            <Search />
          </IconButton>
        </FlexBetween>
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={() => dispatch(setMode())}
          >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          {isAuth ? (
            <>
              <Person sx={{ fontSize: "25px" }} />
              <IconButton
                sx={{
                  color: neutral.dark,
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: neutral.medium,
                  },
                }}
                onClick={() => navigate(`/cart/${_id}`)}
              >
                <ShoppingCart sx={{ fontSize: "25px" }} />
              </IconButton>
              <IconButton
                sx={{
                  color: neutral.dark,
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: neutral.medium,
                  },
                }}
                onClick={() => navigate(`/wishlist/${_id}`)}
              >
                <Favorite sx={{ fontSize: "25px" }} />
              </IconButton>
              <IconButton
                sx={{
                  color: neutral.dark,
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: neutral.medium,
                  },
                }}
                onClick={() => navigate(`/orders/${_id}`)}
              >
                <RequestPage sx={{ fontSize: "25px" }} />
              </IconButton>
              <Settings sx={{ fontSize: "25px" }} />
              <FormControl variant="standard" value={firstName}>
                <Select
                  value={firstName}
                  sx={{
                    backgroundColor: neutral.light,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutral.light,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={firstName}>
                    <Typography>{firstName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              sx={{ fontSize: "20px" }}
            >
              Login/Register
            </Button>
          )}
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            {isAuth ? (
              <>
                <Person sx={{ fontSize: "25px" }} />
                <IconButton
                  sx={{
                    color: neutral.dark,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: neutral.medium,
                    },
                  }}
                  onClick={() => navigate(`/cart/${_id}`)}
                >
                  <ShoppingCart sx={{ fontSize: "25px" }} />
                </IconButton>

                <IconButton
                  sx={{
                    color: neutral.dark,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: neutral.medium,
                    },
                  }}
                  onClick={() => navigate(`/wishlist/${_id}`)}
                >
                  <Favorite sx={{ fontSize: "25px" }} />
                </IconButton>
                <IconButton
                  sx={{
                    color: neutral.dark,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: neutral.medium,
                    },
                  }}
                  onClick={() => navigate(`/orders/${_id}`)}
                >
                  <RequestPage sx={{ fontSize: "25px" }} />
                </IconButton>
                <Settings sx={{ fontSize: "25px" }} />
                <FormControl variant="standard" value={firstName}>
                  <Select
                    value={firstName}
                    sx={{
                      backgroundColor: neutral.light,
                      width: "150px",
                      borderRadius: "0.25rem",
                      p: "0.25rem 1rem",
                      "& .MuiSvgIcon-root": {
                        pr: "0.25rem",
                        width: "3rem",
                      },
                      "& .MuiSelect-select:focus": {
                        backgroundColor: neutral.light,
                      },
                    }}
                    input={<InputBase />}
                  >
                    <MenuItem value={firstName}>
                      <Typography>{firstName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(setLogout())}>
                      Log Out
                    </MenuItem>
                  </Select>
                </FormControl>
              </>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                sx={{ fontSize: "15px" }}
              >
                Login/Register
              </Button>
            )}
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;

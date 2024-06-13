import { Box, useMediaQuery, Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "scenes/navbar";
import ProductWidget from "scenes/widgets/productWidget";
import FilterSortWidget from "scenes/widgets/filterSortWidget";

const SearchPage = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const query = params.get("query");
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");

  const isMobile = useMediaQuery("(max-width: 900px)");

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  useEffect(() => {
    getSearchResults();
  }, [location, filters, sort]);

  const getSearchResults = async () => {
    try {
      const queryParams = new URLSearchParams({
        search: query,
        categories: filters.categories?.join(",") || "",
        minPrice: filters.minPrice || "",
        maxPrice: filters.maxPrice || "",
        sort: sort,
      }).toString();

      const response = await fetch(
        `http://localhost:3001/api/products/?${queryParams}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        const err = await response.json();
        throw new Error(err.msg || 'Failed to get search results');
      }
    } catch (err) {
      console.error("Error fetching search results:", err.message);
    }
  };

  const categories = [
    "Drama",
    "Horror",
    "Thriller",
    "Fiction",
    "Classic",
    "Science Fiction",
    "Dystopian",
    "Satire",
    "Political Allegory",
    "Mystery",
    "Detective",
    "Romance",
    "Adventure",
    "Historical Fiction",
    "Fantasy",
    "Young Adult",
    "Non-Fiction",
  ];

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          paddingTop: "96px",
          display: "flex",
          justifyContent: "center",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <Grid container spacing={3} sx={{ maxWidth: "1000px" }}>
          {!isMobile && (
            <Grid item xs={12} md={3}>
              <Box sx={{ position: "sticky", top: "96px" }}>
                <FilterSortWidget
                  categories={categories}
                  onFilterChange={handleApplyFilters}
                  onSortChange={handleSortChange}
                />
              </Box>
            </Grid>
          )}
          <Grid item xs={12} md={isMobile ? 12 : 9}>
            <Box>
              {isMobile && (
                <Box
                  sx={{
                    position: "sticky",
                    top: "94px",
                    zIndex: 1,
                    marginBottom: "1rem",
                  }}
                >
                  <FilterSortWidget
                    categories={categories}
                    onFilterChange={handleApplyFilters}
                    onSortChange={handleSortChange}
                  />
                </Box>
              )}
              {searchResults.map((product) => (
                <Box marginBottom="1rem" key={product._id}>
                  <ProductWidget
                    margin="1rem"
                    key={product._id}
                    product={product}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SearchPage;

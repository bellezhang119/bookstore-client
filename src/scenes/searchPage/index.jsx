import { Box, IconButton, useMediaQuery, Container, Grid } from "@mui/material";
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
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");

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
        console.error("Error fetching search results");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
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
        sx={{ paddingTop: "96px", display: "flex", justifyContent: "center" }}
      >
        <Grid container spacing={3} sx={{ maxWidth: "1200px" }}>
          <Grid item xs={12} md={3}>
            <Box sx={{ position: "sticky", top: "96px" }}>
              <FilterSortWidget
                categories={categories}
                onFilterChange={handleApplyFilters}
                onSortChange={handleSortChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box>
              {searchResults.map((product) => (
                <ProductWidget key={product._id} product={product} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SearchPage;

import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  Slider,
  Typography,
  useMediaQuery,
  IconButton,
  useTheme,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";

const FilterSortWidget = ({ categories, onFilterChange, onSortChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([5, 100]);
  const [sortOption, setSortOption] = useState("");
  const [expanded, setExpanded] = useState(false);

  const { palette } = useTheme();

  const isMobile = useMediaQuery("(max-width: 900px)");

  const handleFilterChange = () => {
    onFilterChange({
      categories: selectedCategories,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOption(value);
    onSortChange(value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <WidgetWrapper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: palette.neutral.light,
        padding: "1rem",
      }}
    >
      {isMobile && !expanded ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={toggleExpanded}>
            <KeyboardArrowDown />
          </IconButton>
        </Box>
      ) : (
        <>
          <FormControl>
            <Select
              multiple
              value={selectedCategories}
              onChange={handleCategoryChange}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return "Categories";
                }
                return selected.join(", ");
              }}
            >
              <MenuItem disabled value="">
                Categories
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  <Checkbox
                    checked={selectedCategories.indexOf(category) > -1}
                  />
                  <ListItemText primary={category} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography id="price-range-slider" gutterBottom>
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </Typography>
            <Slider
              value={priceRange}
              min={5}
              max={100}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              aria-labelledby="price-range-slider"
              valueLabelFormat={(value) => `$${value}`}
            />
          </Box>

          <FormControl>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return "Sort By";
                }
                return selected;
              }}
            >
              <MenuItem value="">Sort By</MenuItem>
              <MenuItem value="priceAsc">Price: Low to High</MenuItem>
              <MenuItem value="priceDesc">Price: High to Low</MenuItem>
              <MenuItem value="dateAsc">Publish Date: Old to New</MenuItem>
              <MenuItem value="dateDesc">Publish Date: New to Old</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleFilterChange}
          >
            Apply Filters
          </Button>

          {isMobile && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <IconButton onClick={toggleExpanded}>
                <KeyboardArrowUp />
              </IconButton>
            </Box>
          )}
        </>
      )}
    </WidgetWrapper>
  );
};

export default FilterSortWidget;

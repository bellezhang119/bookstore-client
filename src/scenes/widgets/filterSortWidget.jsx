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
} from "@mui/material";
import { useState } from "react";

const FilterSortWidget = ({ categories, onFilterChange, onSortChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleFilterChange = () => {
    onFilterChange({
      categories: selectedCategories,
      minPrice: minPrice,
      maxPrice: maxPrice,
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

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <FormControl>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
          renderValue={(selected) => selected.join(", ")}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={selectedCategories.indexOf(category) > -1} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Min Price"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <TextField
        label="Max Price"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <FormControl>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortOption} onChange={handleSortChange}>
          <MenuItem value="">None</MenuItem>
          <MenuItem value="priceAsc">Price: Low to High</MenuItem>
          <MenuItem value="priceDesc">Price: High to Low</MenuItem>
          <MenuItem value="dateAsc">Publish Date: Old to New</MenuItem>
          <MenuItem value="dateDesc">Publish Date: New to Old</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleFilterChange}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default FilterSortWidget;

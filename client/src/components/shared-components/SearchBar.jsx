import { useState } from "react";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState([]);

  async function searchProductByName(value) {
    const { data } = await axios.get(
      import.meta.env.VITE_PRODUCTS_API_LINK + `product/title/${value}`
    );
    setSearchTerm(data.product);
  }

  const handleSearch = (value) => {
    searchProductByName(value);
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      sx={{ width: ["200px", "400px"] }}
      options={searchTerm.map((product) => product.title)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Product"
          InputProps={{
            ...params.InputProps,
            type: "search",
            endAdornment: (
              <>
                <SearchIcon />
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      )}
      onChange={(event, value) => {
        const selectedProduct = searchTerm.find(
          (product) => product.title === value
        );

        if (selectedProduct) {
          navigate(`/product/${selectedProduct._id}`);
        }
      }}
    />
  );
};

export default SearchBar;

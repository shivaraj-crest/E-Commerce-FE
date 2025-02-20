import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  setProducts,
  setCategories,
  setBrands,
  setSelectedCategory,
  setSelectedBrand,
  setSearchTerm,
  setCurrentPage,
} from "../../../features/product/productSlice";
import { getProducts } from "../../../api/productApi";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Typography,

  Box,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import "../../../App.css"


const ProductList = () => {
  const dispatch = useDispatch();
console.log("testing :::");
  // Get Redux state
  const {
    products,
    categories,
    brands,
    selectedCategory,
    selectedBrand,
    searchTerm,
    currentPage,
  } = useSelector((state) => state.products);

  // Function to fetch products
  const fetchProducts = useCallback(async () => {
    try {
  
      const data = await getProducts(selectedCategory, selectedBrand, searchTerm, currentPage);
      dispatch(setProducts(data));
      console.log("bye",data)
    } catch (error) {
      console.error(error);
    } 
  }, []);

  // Fetch products initially
  useEffect(() => {
    console.log("hello1");
    fetchProducts(); // ✅ Only runs once on mount
  }, []); 

  // 🔹 Handle search input change
  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e)); // ✅ Update Redux state
    fetchProducts(); // ✅dispatch Manually call API
  };

  // 🔹 Handle category selection
  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value));
    fetchProducts();
  };

  // 🔹 Handle brand selection
  const handleBrandChange = (e) => {
    dispatch(setSelectedBrand(e.target.value));
    fetchProducts();
  };

  // 🔹 Handle pagination
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    fetchProducts();
  };

  return (
    <div>
      <h1>Products</h1>

      <Box sx={{ mb: 2 }}>
        <TextField
            className='global-search-class'
            variant="outlined"
            placeholder='Search Contacts'
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            sx={{
              // "& .MuiOutlinedInput-root": {
              //   height: "45px", // Adjust the height of the container
              //   padding: "15px", // Adjust the padding of the container
              // },
              "& .MuiOutlinedInput-input": {
                // height: "50%", // Ensure the input takes the full height
                // padding: "20px", // Adjust padding if needed
                // backgroundColor: "green",
                padding: "0px",
              },
            }}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                //i can add styles using style prop also and it overrides sx
                // style: { height: "45px", padding: "10px" }
              },
            }}
          
          /> 
    


        {/* Category Filter */}
        <FormControl fullWidth className="global-dropdown-class" sx={{ marginBottom: "16px"  }}>
          <InputLabel>All Categories</InputLabel>
          <Select value={selectedCategory} onChange={handleCategoryChange}>
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Brand Filter */}
        <FormControl className="global-dropdown-class" fullWidth style={{ marginBottom: "16px" }}>
          <InputLabel>All Brands</InputLabel>
          <Select value={selectedBrand} onChange={handleBrandChange}>
            <MenuItem value="">All Brands</MenuItem>
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>


      {/* Product Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img src={product.images[0]} alt={product.name} width="50" />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.brand.name}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" style={{ marginRight: "8px" }}>
                      View
                    </Button>
                    <Button variant="contained" color="secondary" style={{ marginRight: "8px" }}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error">Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </Button>
        <Button disabled={products.length < 10} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductList;


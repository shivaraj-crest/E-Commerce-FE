import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";

import PaginationComponent from "../../../components/Pagination";

//import redux prodcut actions
import {
  allProducts, allCategories, allBrands, stSearch, stCategory, stBrand, stCurrentPage,stRowsPerPage
} from "../../../features/product/productSlice";

//api imports
import { getProducts } from "../../../api/productApi";
import { getCategories } from "../../../api/categoryApi";
import { getBrands } from "../../../api/brandApi";

//mui imports
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
//main css imports
import "../../../App.scss"


const ProductList = () => {

  const dispatch = useDispatch();

  // Get Redux state
  const {
    products,
    categories,
    brands,
    searchQuery,
    selectedCategory,
    selectedBrand,
    currentPage,
    itemsPerPage,
    totalProducts
  } = useSelector((state) => state.products);
  
  //Hooks
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debounceTimeout = useRef(null);

  //runs only once for component mount
  useEffect(()=>{
    fetchCatgories();
    fetchBrands();
  },[])

  // Fetch products initially and on state change
  useEffect(() => {
    console.log("hello1");
    console.log("currentPage",currentPage, "itemsPerPage", itemsPerPage);
    fetchProducts(selectedCategory, selectedBrand, searchQuery, currentPage, itemsPerPage); // ✅ Only runs once on mount

  }, [selectedCategory, selectedBrand, searchQuery, currentPage, itemsPerPage]); 
  
  //debouncing the search in 
  useEffect(() => {
    //if the user types withing 1 second then we need to update the debounceTimeout.current
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout everytime when the user starts typing before 1 sec end
    debounceTimeout.current = setTimeout(() => {
      console.log("hello20")
      dispatch(stSearch(localSearch)); // Dispatch the search action
      // fetchProducts(searchTerm); // Optionally call the API here
    }, 1000); // 1-second delay
  }, [localSearch, dispatch]);




  // Function to fetch products
  const fetchProducts= async(selectedCategory, selectedBrand, searchQuery, currentPage, itemsPerPage) =>{
    try {
      // console.log(selectedCategory, selectedBrand, searchQuery, currentPage);
      const productData = await getProducts(selectedCategory, selectedBrand, searchQuery, currentPage, itemsPerPage);
      dispatch(allProducts(productData)); // ✅ Updates Redux state
    } catch (error) {
      console.error(error);
    }
  };

  //function to fetch categories
  const fetchCatgories= async()=>{
    try{
      const categoryData = await getCategories();
      dispatch(allCategories(categoryData));
    }catch(error){
      console.error(error);
    }
  }
  //function to fetch brands
  const fetchBrands= async()=>{
    try{
      const brandData = await getBrands();
      dispatch(allBrands(brandData.brands));
    }catch(error){
      console.error(error);
    }
  }
   

//Event handler functions
  // 🔹 Handle search input change, set localSearch and then run useEffect to set the state search
  const handleSearchChange = (e) => {
    setLocalSearch(e)
  };

  // 🔹 Handle category selection
  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    dispatch(stCategory(e.target.value));
    // fetchProducts();
  };

  // 🔹 Handle brand selection
  const handleBrandChange = (e) => {
    console.log(e.target.value);
    dispatch(stBrand(e.target.value));
    // fetchProducts();
  };

  //change page
  const handleChangePage = (event, newPage) => {
    dispatch(stCurrentPage(newPage)); // ✅ Updates Redux with the new page
  };
  
  //change rows per page
  const handleChangeRowsPerPage = (event) => {
    dispatch(stRowsPerPage(parseInt(event.target.value, 10))); // ✅ Updates Redux with new rows per page
    dispatch(stCurrentPage(1)); // ✅ Reset to first page
  };


//ui
  return (
    <div>
      <h1>Products</h1>

      <Box sx={{ mb: 2 }}>
        <TextField
            className='global-search-class'
            variant="outlined"
            placeholder='Search Contacts'
            value={localSearch}
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
        <FormControl fullWidth className="global-dropdown-class " sx={{ marginBottom: "16px"  }}>
        {!selectedCategory ? <InputLabel  className="global-dropdownLabel">All Categories</InputLabel> : null}
          <Select 
          className="global-dropdown-input"
          value={selectedCategory} 
          onChange={handleCategoryChange}
          inputProps={{ 'aria-label': 'Without label' }}
          displayEmpty
          >
            {/* <MenuItem value="">All Category</MenuItem> */}
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Brand Filter */}
        <FormControl className="global-dropdown-class" fullWidth style={{ marginBottom: "16px" }}>
        {!selectedBrand ? <InputLabel className="global-dropdownLabel">All Brands</InputLabel> : null}
          <Select value={selectedBrand} 
          onChange={handleBrandChange}
          className="global-dropdown-input"
          inputProps={{ 'aria-label': 'Without label' }}
          displayEmpty
          >
            {/* <MenuItem value="">All Brands</MenuItem> */}
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>


      {/* Product Table */}
      <TableContainer className="global-table-container" component={Paper}  > 
        <Table className="global-table" aria-label="a dense table"  >
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
            {products?.length > 0 ? (
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
      <PaginationComponent
        count={totalProducts} // ✅ Total count of items (modify as per API)
        page={currentPage}
        rowsPerPage={itemsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ProductList;


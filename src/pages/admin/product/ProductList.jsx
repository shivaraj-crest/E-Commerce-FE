import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";

import PaginationComponent from "../../../components/Pagination";

//import redux prodcut actions
import {
  allProducts, allCategories, allBrands, stSearch, stCategory, stBrand, stCurrentPage,stRowsPerPage
} from "../../../features/product/productSlice";

//api imports
import { deleteProduct, getProducts } from "../../../api/productApi";
import { getCategories } from "../../../api/categoryApi";
import { getBrands } from "../../../api/brandApi";
import LoaderBackdrop from "../../../components/LoaderBackdrop";
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
  InputAdornment,
  Container
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
//main css imports
import "../../../App.scss"
import "../../../styles/productCss.scss";
import { useLocation, useNavigate } from "react-router-dom"; // Detect page change
import DeleteDialog from "../../../components/DeleteDialog";
import axiosInstance from "../../../api/axiosConfig";

const ProductList = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  //open and close alert dialog box for delete
  const [openDialog, setOpenDialog] = useState(false);

  //to store the selected product id and value
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const debounceTimeout = useRef(null);

  const location = useLocation(); // Get the current page route
  //runs only once for component mount
  useEffect(()=>{
    fetchCatgories();
    fetchBrands();
    // resetFilters();
    // setLocalSearch("");
  },[])

    //Reset filters only when leaving the page
  useEffect(() => {
    //this is a cleanup function which only runs when the component is unmounting or when location.pathname changes
    //it change only when the current pages route changes.
    return () => {
      console.log("Leaving page, resetting filters...");
      dispatch(stSearch(""));
      dispatch(stCategory(""));
      dispatch(stBrand(""));
    };
  }, [location.pathname]); // Runs when `pathname` changes (i.e., when leaving the page)

  // Fetch products initially and on state change
  useEffect(() => {
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

      dispatch(stSearch(localSearch)); // Dispatch the search action
      // fetchProducts(searchTerm); // Optionally call the API here
    }, 1000); // 1-second delay
  }, [localSearch, dispatch]);




  // Function to fetch products
  const fetchProducts= async(selectedCategory, selectedBrand, searchQuery, currentPage, itemsPerPage) =>{
    try {
      setLoading(true); 
      // console.log(selectedCategory, selectedBrand, searchQuery, currentPage);
      const productData = await getProducts(selectedCategory, selectedBrand, searchQuery, currentPage, itemsPerPage);
      dispatch(allProducts(productData)); // ✅ Updates Redux state
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
    // console.log(e.target.value);
    dispatch(stCategory(e.target.value));
    // fetchProducts();
  };

  // 🔹 Handle brand selection
  const handleBrandChange = (e) => {
    // console.log(e.target.value);
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

  //edit product navagate
  const handleEdit = (productId) => {
    navigate(`/admin/product/${productId}/edit`);
  };

   // Handle Delete Button Click
   const handleDeleteClick = (id) => {
    setSelectedProduct(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async(id) => {
    // Perform deletion logic here
    console.log("Deleting product with ID:", id);

    try{
      await deleteProduct(id)
      fetchProducts(selectedCategory, selectedBrand, searchQuery, currentPage, itemsPerPage);
      console.log("deleted successfully")
    }catch(error){
      console.log(error)
    }
    // deleteProduct(selectedProduct.id);
    setOpenDialog(false); // Close the dialog after deletion
  };

  const handleViewClick = async(id)=>{
    navigate(`/admin/product/${id}/view`);
  }

  if (loading) return <LoaderBackdrop  open={loading} />;
//ui
  return (
    <Container className="container-parent product-listing" sx={{ }}>
        <h1>Products</h1>
        <Box className="filter-class" sx={{ mb: 2 }}>
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

      <Container className="main-table-container" sx={{ mt: 4, p: 3, boxShadow: 2, borderRadius: 2, backgroundColor: "white" }}>
        {/* Product Table */}
        <TableContainer className="global-table-container" component={Paper}  > 
          <Table className="global-table" aria-label="a dense table"  >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>No.</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Brand</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
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
                      <div style={{ display: "flex"}}>
                        <Button onClick={()=>handleViewClick(product.id)} variant="contained" color="primary" style={{ marginRight: "8px" }}>
                          View
                        </Button>
                        <Button 
                        variant="contained" 
                        color="secondary" 
                        style={{ marginRight: "8px" }}
                        onClick={(e)=>handleEdit(product.id)}
                        >
                          Edit
                        </Button>
                        <Button onClick={(e)=>handleDeleteClick(product.id)} variant="contained" color="error">Delete</Button>
                      </div>
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

      </Container>

      {/* Delete Dialog */}
      <DeleteDialog
        open={openDialog}
        title={`Delete ${selectedProduct?.name}`} 
        content={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={()=>handleConfirmDelete(selectedProduct)}
        onCancel={() => setOpenDialog(false)}
      />    
    </Container>
  );
};

export default ProductList;


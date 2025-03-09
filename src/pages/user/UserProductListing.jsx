import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/productApi"; // API handler function
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft,faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import {
  stUserCurrentPage,
  stUserSearch,
} from "../../features/product/productSlice";

//css imports
import "../../styles/userProductCss.scss";
import "../../App.scss";
import { addToCart, getCart } from "../../api/cartApi";



//Tan-Stack api calling functions

// Product Listing Component
const ProductListing = () => {
  //for mutations necessary
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //importing all the redux states
  const {
    filterCategory,
    filterBrand,
    filterPriceRange,
    filterRatings,
    userCurrentPage,
    userItemsPerPage,
    filterSearch
  } = useSelector((state) => state.products);

  //local state
  const [localSearch, setLocalSearch] = useState(filterSearch); // ✅ Local Input State

  //for resetting debounce time every time the user types
  const debounceTimeout = useRef(null);

 
  //debouncing useEffect for search
  useEffect(() => {
    // if(localSearch!==filterSearch){
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
  
      debounceTimeout.current = setTimeout(() => {
        dispatch(stUserSearch(localSearch)); // ✅ Dispatch Redux Search after 1s delay
      }, 1000);
      
      return () => clearTimeout(debounceTimeout.current); // ✅ Cleanup timeout
    // }

  
  }, [localSearch, dispatch]);


  

  //tans stack query functions -
  const callFetchProducts = async () => {
    
    const tanProducts = await getProducts(
      filterCategory,
      filterBrand,
      filterPriceRange,
      filterRatings,
      filterSearch,
      userCurrentPage,
      userItemsPerPage,
      
    );
    return tanProducts;
  };



  //post cart items api call
  const callcreateCartItems = async (product_id,value)=>{
    const tanCartItems = await addToCart(product_id,value);
    return tanCartItems;
  }

  // get fetch Products  using TanStack Query
  const {
    data: products,
    isLoading,
    isError,
    refetch, // ✅ Allows manual refetching
    
  } = useQuery({
    queryKey: ["products", filterCategory, filterBrand, filterPriceRange, filterRatings, filterSearch, userCurrentPage], // ✅ Add dependencies
    queryFn: callFetchProducts,
  });

 
  //post cart Mutation for adding cart item
  const createCartMutation = useMutation({
    mutationFn: callcreateCartItems,
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"], { exact: true });
      
      // setCategoryName("");
    },
  });



  //mutation handler function
  const handleAddToCart = (product_id) => {
    createCartMutation.mutate(product_id,1);
  };



  //handler funcions
  const handlePageChange = (newPage) => {
   
    dispatch(stUserCurrentPage(newPage));  // Update Redux state for pagination
  };


  //loading and error return
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography textAlign="center" color="error" mt={5}>
        Failed to load products. Please try again.
      </Typography>
    );
  }

  return (
    <Container className="user-landing-main"  sx={{ mt: 5 }}>
      {/* Back Button */}
      <Box
        className="user-landing-first-div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2, // ✅ Space between elements
          width: "100%", // ✅ Full width
          mt: 2, // ✅ Margin top
        }}
      >
      {/* 🔹 Back Button */}
      {/* <Button
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:hover": { backgroundColor: "#333" },
        }}
        onClick={() => navigate(-1)}
        variant="contained"
      >
        Back
      </Button> */}

      {/* 🔹 Search Input */}
        <TextField
          className="user-product-search"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)} // ✅ Controlled Input
          placeholder="Search products..."
          variant="outlined"
          size="small"
          sx={{
            flexGrow: 1, // ✅ Responsive width
            maxWidth: "600px", // ✅ Limit max width
            backgroundColor: "white", // ✅ White background
            borderRadius: "4px",
            marginBottom:"30px"
          }}
          slotProps={{
            input:{
              endAdornment: 
                <InputAdornment position="end">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </InputAdornment>
            }
          }}
          />
      </Box>

      

      {/* Heading & Sorting */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          All Products
        </Typography>
        <Typography sx={{marginLeft:"auto", marginRight:"10px"}} variant="body1">{products?.length} Products</Typography>
        <Button sx={{marginRight:"12px"}} variant="outlined">Sort by</Button>
      </Box>

      {/* Product Grid */}
      <Box
        className="user-product-grid"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "start",
        }}
      >
        {products.products?.length>0?(
          products.products?.map((product) => (
          <Box
            key={product.id}
            sx={{
              width: { xs: "100%", sm: "48%", md: "31%", lg: "23%" }, // Responsive width
              display: "flex",
              cursor:"pointer",
            }}
            onClick={() => navigate(`/user/product/${product.id}/view`)}
          >
            <Card
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              {/* Product Image */}
              <CardMedia
                component="img"
                height="220"
                image={product.images[0]}
                alt={product.name}
                sx={{ objectFit: "cover" }}
              />

              {/* "Only X items left" Badge */}
              {product.stock < 10 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    backgroundColor: "red",
                    color: "white",
                    padding: "4px 8px",
                    fontSize: "12px",
                    borderRadius: "4px",
                  }}
                >
                  Only {product.stock} items left
                </Box>
              )}

              {/* Product Info */}
              <CardContent className="listing-card-content">
                <Typography sx={{marginBottom:"10px"}} fontWeight="bold">{product.name}</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{marginBottom:"10px"}} variant="body2" color="text.secondary">
                    {product.category?.name} {/* Show category dynamically */}
                  </Typography>
                  <Typography sx={{marginRight:"2px"}} variant="body2" color="text.secondary">
                    {product.brand?.name}
                  </Typography>

                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: "10px" }}>
                  <Typography variant="h6" fontWeight="bold" >
                    ${product.price}
                  </Typography>
                </Box>
               
                <Button 
                  onClick={(event) => {
                    event.stopPropagation(); // ✅ Stops navigation from triggering
                    handleAddToCart(product.id);
                  }} 
                  variant="contained" 
                  fullWidth sx={{ mt: 2 }}>
                  Add to cart
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))):(
          <Box className="user-product-not-found">
            <Typography variant="body1">No products found.</Typography>
          </Box>
        )}
      </Box>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
            count={products.totalPages} // Total number of pages
            page={userCurrentPage} // Current active page
            onChange={(event, value) => handlePageChange(value)} // Handle page change
            color="primary"
        />
      </Box>


    </Container>
  );
};

// Styles

export default ProductListing;

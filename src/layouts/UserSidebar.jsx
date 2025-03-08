import React, { useState } from "react";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Avatar,
  Typography,
  CssBaseline,
  Divider,
  IconButton,
  Toolbar,
  Checkbox,
  Slider,
  Button,
  Badge,
} from "@mui/material";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';

import { styled, useTheme } from '@mui/material/styles';
import {
  ExpandLess,
  ExpandMore,
  Add,
  List as ListIcon,
  Category,
  Inventory,
  People,
  ShoppingCart,
  StarBorder,
  Star
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteDialog from "../components/DeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categoryApi";
import { getBrands } from "../api/brandApi";

//calling productSlice reducers 
import {
 stClearFilters,
 stFilterCategory, 
 stFilterBrand, 
 stFilterPriceRange, 
 stFilterRatings, 
  } from "../features/product/productSlice";

  //inside src we need to import imamges and icons
import shopperLogo from "../assets/images/logo_big.png";

//importing icons from mui
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import "../styles/userSidebar.scss"
import "../App.scss"
import "../styles/productCss.scss"
import { getCart } from "../api/cartApi";

const drawerWidth = 270;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const navLinkStyles = {
  textDecoration: "none",
  color: "#fff",
  fontSize: "1rem",
  "&:hover": { color: "black" }, // Changes color on hover
};


//Tan Stack api call functions

// fetch all categories
const callFetchCategories = async () => {
  try{
    const allCategory = await getCategories(); // Replace with your API
    //store category in redux value

    return allCategory;
  }catch(error){
    throw error;
  }
};

// Fetch all brands
const callFetchBrands = async () => {
  try {
    const allBrand = await getBrands(); // Replace with your API
    console.log(allBrand.brands)
    //store category in redux value

    return allBrand.brands;
  } catch (error) {
    throw error;
  }
};


//get fetch for cart items
const callFetchCartItems = async ()=>{
  const tanCartItems = await getCart();

  return tanCartItems.cartProducts;
}




//component starting form here
const AdminSidebar = () => {

  const { 
    filterCategory,
    filterBrand,
    searchQuery,
    filterPriceRange,
    filterRatings,
    currentPage,
    itemsPerPage,
    totalProducts
   } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState({
    brands: false,
    categories: false,
    prices:true,
    ratings:true
  });

  //to show user name and email
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");


  //tan stack queries brand

    const { data: allCategories, isLoading, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: callFetchCategories,
    });

    
    const { data: allBrands, isLoading: isLoadingBrands, isError: isErrorBrands } = useQuery({
        queryKey: ["brands"],
        queryFn: callFetchBrands,
    });

  //tsq cart items
  //get fetch Cart Items using tq
  const {
    data:cartItems = [],
    isLoading:cartLoading,
    isError:cartError,
    // refetch:cartRefetch, // ✅ Allows manual refetching
  } = useQuery({
    queryKey:["cartItems"],
    queryFn:callFetchCartItems
  })
      


  //event handlers

  const handleClick = (menu) => {
    setOpen((prevState) => ({ ...prevState, [menu]: !prevState[menu] }));
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 

  //logout funciton
  const handleSignOut = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
    window.location.reload();
  }


  //handle filtering functions - 


  // Handle checkbox toggle for categories
  const handleCategoryChange = (id) => {
    dispatch(stFilterCategory(id));
  };

  // Handle checkbox toggle for brands
  const handleBrandChange = (id) => {
    console.log("hello",id)
    dispatch(stFilterBrand(id));
  };

  // Handle price range change
  const handlePriceChange = (event, newValue) => {
    
    dispatch(stFilterPriceRange(newValue));
  };

  // Handle star rating selection
  const handleRatingChange = (rating) => {
    dispatch(stFilterRatings(rating));
  };

   // Function to Reset Filters
   const handleClearFilters = () => {
      dispatch(stClearFilters())

    console.log("Filters cleared",filterCategory);
  };
  
  
  //handle navigation - 
  const handleNavigation = () => {
    navigate('/user/home');
  };

  return (
    //if you don't give height 100vh then the scrollbar look above navbar which we don't want
    <Box sx={{ display: "flex",height:"100vh" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>

          <img 
            src={shopperLogo}
            onClick={handleNavigation}
            alt="Logo"
            style={{ height: 40, marginRight: 10, cursor: 'pointer' }} // Added cursor pointer for better UX
          />
          <Typography 
            variant="h6" 
            noWrap 
            component="div"
            onClick={handleNavigation}
            sx={{ cursor: 'pointer' }} // Added cursor pointer for better UX
          >
        Shoppers
      </Typography>

         {/* Middle: Navigation Links */}
        <Box sx={{ display: "flex", gap: 3, marginLeft: "auto" }}>
          <Typography component={Link} to="/user/home" sx={navLinkStyles }>
            Home
          </Typography>
          <Typography component={Link} to="/user/products" sx={navLinkStyles}>
            Shop
          </Typography>
          <Typography component={Link} to="/about" sx={navLinkStyles}>
            About
          </Typography>
          <Typography component={Link} to="/contact" sx={navLinkStyles}>
            Contact
          </Typography>
        </Box>

        {/* Right Side: Cart Icon */}
        <IconButton
          sx={{ marginLeft: "10px" }}
          component={Link}
          to="/cart"
          color="inherit"
        >
              <Badge
                badgeContent={cartItems.length} // ✅ Number of items in cart
                color="error" // ✅ Red badge for visibility
                sx={{
                  "& .MuiBadge-badge": {
                    color: "white", // ✅ White text inside badge
                    backgroundColor: "#ff3d00", // ✅ Bright red for visibility
                    fontSize: "0.75rem", // ✅ Slightly smaller font
                  },
                }}
              >
            <ShoppingCartIcon />
          </Badge>
        </IconButton> 

        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
      className="userSidebar-drawer-main"
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: open? drawerWidth:0,
          transition: "width 0.3s ease-in-out",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f8f9fa",
            borderRight: "1px solid #ddd",
            padding: "10px"
          },
          
        }}
      >
        <DrawerHeader className="drawer-header" sx={{ minHeight : '52px'}}>
          <Typography variant="h6" sx={{ textAlign:"center" }} >Ecommerce Logo</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Product Filters
          </Typography>
        </Box>

        <List className="userSidebar-Main-List">
          {/* Brands */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick("brands")}>
              <ListItemIcon><Inventory /></ListItemIcon>
              <ListItemText primary="Brands" />
              {open.brands ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse className="userSidebar-collapse" in={open.brands} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              
            {allBrands?.map((brand) => (
            <ListItem className="userSidebar-list-item" key={brand.id} dense>
              <Checkbox
                checked={filterBrand.includes(brand.id)}
                onChange={() => handleBrandChange(brand.id)}
              />
              <ListItemText primary={brand.name} />
            </ListItem>
          ))}

            </List>
          </Collapse>

          {/* Categories */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick("categories")}>
              <ListItemIcon><Category /></ListItemIcon>
              <ListItemText primary="Categories" />
              {open.categories ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse className="userSidebar-collapse" in={open.categories} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              
            {allCategories?.map((category) => (
            <ListItem className="userSidebar-list-item" key={category.id} dense>
              <Checkbox
                checked={filterCategory.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <ListItemText primary={category.name} />
            </ListItem>
          ))}           

            </List>
          </Collapse>
        

          {/*Price*/}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick("prices")}>
              <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
              <ListItemText primary="Price" />
              {open.prices ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse className="userSidebar-collapse" in={open.prices} timeout="auto" unmountOnExit>
            <List className="userSidebar-list" component="div" disablePadding>

                <Slider
                textAlign="center"
                value={filterPriceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                />
                <Box textAlign="center">Selected Price Range: </Box>
                <Box textAlign="center">${filterPriceRange[0]} - ${filterPriceRange[1]}</Box>

            </List>
          </Collapse>

          {/* Ratings */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick("ratings")}>
              <ListItemIcon><StarIcon /></ListItemIcon>
              <ListItemText primary="Ratings" />
              {open.ratings ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse className="userSidebar-collapse" in={open.ratings} timeout="auto" unmountOnExit>
            <List className="userSidebar-list rating-list" component="div" disablePadding>
                {[1, 2, 3, 4, 5].map((rating) => (
                <Checkbox
                key={rating}
                icon={<StarBorder />}
                checkedIcon={<Star sx={{ color: "gold" }} />}
                checked={filterRatings >= rating}
                onChange={() => handleRatingChange(rating)}
                />
            ))}

            </List>
          </Collapse>

            <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              mt: 2,  // Add margin on top
              "&:hover": { backgroundColor: "gray" } // Hover effect
            }}
            fullWidth
            onClick={handleClearFilters} // Dispatch actions on click
          >
          Clear Filters
        </Button>
        </List>
        

        {/* Profile Section at the Bottom */}
        <Box className="profile-section">
            <Box sx={{  display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{marginLeft:"9px"}} alt="User" src="https://via.placeholder.com/40" />
                <Box>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>{name}</Typography>
                    <Typography variant="body2" color="textSecondary">{email}</Typography>
                </Box>
            </Box>
            
            <Box
                display="flex"
                alignItems="center"
                gap={1} // Spacing between icon and text
                p={1} // Padding inside the box
                sx={{
                    
                    cursor: "pointer",
                    borderRadius: "5px",
                    transition: "0.3s",
                    pointerEvents: "cursor",
                    "&:hover": { backgroundColor: "#f0f0f0" }, // Light hover effect
                }}
                onClick={() => setOpenDialog(true)} // Replace with actual sign-out logic
                >
                <IconButton sx={{marginLeft:"5px"}} size="small">
                    <LogoutIcon />
                </IconButton>
                <Typography variant="body1" fontWeight="bold">
                    Sign Out
                </Typography>
            </Box>
        </Box>
        

      </Drawer>

      <DeleteDialog
        open={openDialog}
        title={`Are you sure you want to sigh out?`} 
        content={`Are you sure you want to sign out?
Signing out will end your current session and require you to log in again.`}
        confirmText="Sign Out"
        cancelText="Cancel"
        onConfirm={handleSignOut}
        onCancel={() => setOpenDialog(false)}
      /> 

      {/* Main Content */}
      <Box open={open} className="main-c " component="main" sx={{ p: 3, marginTop: "40px"}}>
        {/* <DrawerHeader /> */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminSidebar;

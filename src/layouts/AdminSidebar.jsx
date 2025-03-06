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
   
} from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import {
  ExpandLess,
  ExpandMore,
  Add,
  List as ListIcon,
  Category,
  Inventory,
  People,
  ShoppingCart
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteDialog from "../components/DeleteDialog";

const drawerWidth = 240;

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


//component starting form here
const AdminSidebar = () => {

  const theme = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState({
    products: true,
    categories: true
  });

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
          <Typography variant="h6" noWrap component="div">
            E-Commerce Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
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
        <DrawerHeader className="drawer-header" sx={{ minHeight : '54px'}}>
          <Typography variant="h6" sx={{ textAlign:"center" }} >Ecommerce Logo</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Admin Panel
          </Typography>
        </Box>

        <List>
          {/* Products */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick("products")}>
              <ListItemIcon><Inventory /></ListItemIcon>
              <ListItemText primary="Products" />
              {open.products ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={open.products} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton component={Link} to="/admin/product/create" selected={location.pathname === "/admin/product/create"}>
                <ListItemIcon><Add /></ListItemIcon>
                <ListItemText primary="Create Product" />
              </ListItemButton>
              <ListItemButton component={Link} to="/admin/product" selected={location.pathname === "/admin/product"}>
                <ListItemIcon><ListIcon /></ListItemIcon>
                <ListItemText primary="Product List" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Categories */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/category/list" selected={location.pathname === "/admin/category/list"}>
              <ListItemIcon><Category /></ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </ListItem>
        

          {/*Brands*/}
          <ListItem disablePadding>
            <ListItemButton sx={{ ml :"4px"}} component={Link} to="/admin/brand/list" selected={location.pathname === "/admin/brand/list"}>
              <ListItemIcon><FontAwesomeIcon icon={faCopyright} /></ListItemIcon>
              <ListItemText primary="Brands" />
            </ListItemButton>
          </ListItem>

          {/* Users */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/users" selected={location.pathname === "/admin/users"}>
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>

          {/* Orders */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/orders" selected={location.pathname === "/admin/orders"}>
              <ListItemIcon><ShoppingCart /></ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </ListItem>
        </List>

        {/* Profile Section at the Bottom */}
        <Box sx={{ position: "absolute", bottom: 60, left: 20, display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar alt="Admin" src="https://via.placeholder.com/40" />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Admin</Typography>
            <Typography variant="body2" color="textSecondary">admin@gmail.com</Typography>
          </Box>
        </Box>
        
        <Box
          display="flex"
          alignItems="center"
          gap={1} // Spacing between icon and text
          p={1} // Padding inside the box
          sx={{
            position: "absolute",
            bottom: 10,
            left:15,

            cursor: "pointer",
            borderRadius: "5px",
            transition: "0.3s",
            pointerEvents: "cursor",
            "&:hover": { backgroundColor: "#f0f0f0" }, // Light hover effect
          }}
          onClick={() => setOpenDialog(true)} // Replace with actual sign-out logic
        >
          <IconButton size="small">
            <LogoutIcon />
          </IconButton>
          <Typography variant="body1" fontWeight="bold">
            Sign Out
          </Typography>
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
      <Box open={open} className="main-c" component="main" sx={{ p: 3 }}>
        {/* <DrawerHeader /> */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminSidebar;

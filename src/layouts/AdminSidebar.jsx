import React, { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
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
  Toolbar
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

import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';


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

  const location = useLocation();
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
 
  

  return (
    //if you don't give height 100vh then you won't get full height only the content height
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
            <ListItemButton onClick={() => handleClick("categories")}>
              <ListItemIcon><Category /></ListItemIcon>
              <ListItemText primary="Categories" />
              {open.categories ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={open.categories} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton component={Link} to="/admin/category/create" selected={location.pathname === "/admin/category/create"}>
                <ListItemIcon><Add /></ListItemIcon>
                <ListItemText primary="Create Category" />
              </ListItemButton>
              <ListItemButton component={Link} to="/admin/category/list" selected={location.pathname === "/admin/category/list"}>
                <ListItemIcon><ListIcon /></ListItemIcon>
                <ListItemText primary="Category List" />
              </ListItemButton>
            </List>
          </Collapse>

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
        <Box sx={{ position: "absolute", bottom: 20, left: 16, display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar alt="Admin" src="https://via.placeholder.com/40" />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Admin</Typography>
            <Typography variant="body2" color="textSecondary">admin@gmail.com</Typography>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box open={open} className="main-c" component="main" sx={{ p: 3 }}>
        {/* <DrawerHeader /> */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminSidebar;

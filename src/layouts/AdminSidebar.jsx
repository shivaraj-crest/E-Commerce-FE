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
  CssBaseline
} from "@mui/material";
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

const drawerWidth = 240;

const AdminSidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState({
    products: true,
    categories: true
  });

  const handleClick = (menu) => {
    setOpen((prevState) => ({ ...prevState, [menu]: !prevState[menu] }));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f8f9fa",
            borderRight: "1px solid #ddd",
            padding: "10px"
          }
        }}
      >
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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminSidebar;

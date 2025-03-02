import React, { useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../../api/categoryApi";
import "../../../App.scss";
import "../../../styles/categoryCss.scss";
import "../../../styles/productCss.scss";

// Fetch all categories
const callFetchCategories = async () => {
  try{
    const allCategory = await getCategories(); // Replace with your API
    return allCategory;
  }catch(error){
    throw error;
  }
};

const callCreateCategory = async (name) => {
  try{
    const data  = await createCategory(name); // Replace with your API
    return data;
  }catch(error){
    throw error;
  }
};

const callDeleteCategory = async (id) => {
  try{
    const data = await deleteCategory(id); // Replace with your API
    return data;
  }catch(error){
    throw error;
  }
};

const callEditCategory = async ({ id, newName }) => {
  try{  
    const data = await updateCategory({id:id, name:newName}); // Replace with your API
    return data;
  }catch(error){
    throw error;
  }
};



const CategoryPage = () => {
  const queryClient = useQueryClient();
  const [categoryName, setCategoryName] = useState("");

  // Fetch categories using TanStack Query
  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: callFetchCategories,
  });

  // Mutation for creating a category
  const createCategoryMutation = useMutation({
    mutationFn: callCreateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      setCategoryName("");
    },
  });

  // Mutation for deleting a category
  const deleteCategoryMutation = useMutation({
    mutationFn: callDeleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  // Mutation for editing a category
  const editCategoryMutation = useMutation({
    mutationFn: callEditCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  const handleCreateCategory = () => {
    if (categoryName.trim()) {
      createCategoryMutation.mutate({name:categoryName});
    }
  };

  const handleEditCategory = (id) => {
    const newName = prompt("Enter new category name:");
    if (newName && newName.trim()) {
      editCategoryMutation.mutate({ id, newName });
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategoryMutation.mutate(id);
    }
  };

  if (isLoading) return <Typography>Loading categories...</Typography>;
  if (isError) return <Typography color="error">Failed to fetch categories.</Typography>;

  return (
    <Container className="container-parent product-listing category-listing" sx={{}}>
      {/* Top Bar with Title & Search */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Category
        </Typography>
        <TextField
          className="settings-search-field"
          sx={{ backgroundColor: "white" }}
          placeholder="Search here"
          variant="outlined"
          size="small"
          onClick={() => console.log("Search clicked")}
        />
      </Box>

      <Box className="category-table-create" display="flex" gap={3}>
        {/* Category Table */}
        <TableContainer component={Paper} sx={{ flex: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>No.</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Category Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories?.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditCategory(category.id)} sx={{ mr: 1 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteCategory(category.id)} sx={{ color: "red" }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Create Category Form */}
        <Paper sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Add Feedback Category
          </Typography>
          <TextField
            fullWidth
            label="Category Name"
            variant="outlined"
            size="small"
            margin="normal"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" onClick={handleCreateCategory} disabled={createCategoryMutation.isLoading}>
              {createCategoryMutation.isLoading ? "Saving..." : "Save"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setCategoryName("")}>
              Cancel
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CategoryPage;

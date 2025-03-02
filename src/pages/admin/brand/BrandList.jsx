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
import { createBrand, deleteBrand, getBrands, updateBrand } from "../../../api/brandApi";
import "../../../App.scss";
import "../../../styles/categoryCss.scss";
import "../../../styles/productCss.scss";

// Fetch all brands
const callFetchBrands = async () => {
  try {
    const allBrands = await getBrands(); // Replace with your API
    console.log(allBrands.brands)
    return allBrands.brands;
  } catch (error) {
    throw error;
  }
};

const callCreateBrand = async (name) => {
  try {
    const data = await createBrand(name); // Replace with your API
    return data;
  } catch (error) {
    throw error;
  }
};

const callDeleteBrand = async (id) => {
  try {
    const data = await deleteBrand(id); // Replace with your API
    return data;
  } catch (error) {
    throw error;
  }
};

const callEditBrand = async ({ id, name }) => {
  try {
    const data = await updateBrand({ id:id,name:name}); // Replace with your API
    return data;
  } catch (error) {
    throw error;
  }
};



//Compoennt Start from here
const BrandPage = () => {
  const queryClient = useQueryClient();
  const [brandName, setBrandName] = useState("");
  const [editingBrand, setEditingBrand] = useState(null); 

  // Fetch brands using TanStack Query
  const { data: brands, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: callFetchBrands,
  });

  // Mutation for creating a brand
  const createBrandMutation = useMutation({
    mutationFn: callCreateBrand,
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      setBrandName("");
      
    },
  });

  // Mutation for deleting a brand
  const deleteBrandMutation = useMutation({
    mutationFn: callDeleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
    },
  });

  // Mutation for editing a brand
  const editBrandMutation = useMutation({
    mutationFn: callEditBrand,
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      setBrandName(""); // Clear input field
      setEditingBrand(null); // Reset edit mode
    },
  });

  // const handleCreateBrand = () => {
  //   if (brandName.trim()) {
  //     createBrandMutation.mutate({ name: brandName });
  //   }
  // };

    const handleEditBrand = (brand) => {
    setEditingBrand(brand); // Store the brand being edited
    setBrandName(brand.name); // Populate the input field with the brand's name
  };

  const handleDeleteBrand = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      deleteBrandMutation.mutate(id);
    }
  };

  const handleSubmit = () => {
    if (editingBrand) {
      // Update mode
      editBrandMutation.mutate({ id: editingBrand.id, name: brandName });
    } else {
      // Create mode
      createBrandMutation.mutate({ name: brandName });
    }
  };

  if (isLoading) return <Typography>Loading brands...</Typography>;
  if (isError) return <Typography color="error">Failed to fetch brands.</Typography>;

  return (
    <Container className="container-parent product-listing category-listing" sx={{}}>
      {/* Top Bar with Title & Search */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Brand
        </Typography>
        <TextField
            className="settings-search-field"
          sx={{ backgroundColor: "white", }}
          placeholder="Search here"
          variant="outlined"
          size="small"
          onClick={() => console.log("Search clicked")}
        />
      </Box>

      <Box className="category-table-create" display="flex" gap={3}>
        {/* Brand Table */}
        <TableContainer component={Paper} sx={{ flex: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>No.</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Brand Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brands?.map((brand, index) => (
                <TableRow key={brand.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditBrand(brand)} sx={{ mr: 1 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteBrand(brand.id)} sx={{ color: "red" }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Create Brand Form */}
        {/* Create / Update Brand Form */}
        <Paper sx={{ width: 300, p: 3 }}>
        <Typography variant="h6" fontWeight="bold">
            {editingBrand ? "Update Brand" : "Create Brand"}
        </Typography>
        <TextField
            fullWidth
            label="Brand Name"
            variant="outlined"
            size="small"
            margin="normal"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={createBrandMutation.isLoading || editBrandMutation.isLoading}
            >
            {editingBrand ? "Update" : "Save"}
            </Button>
            <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
                setBrandName("");
                setEditingBrand(null); // Reset edit mode
            }}
            >
            Cancel
            </Button>
        </Box>
        </Paper>

      </Box>
    </Container>
  );
};

export default BrandPage;

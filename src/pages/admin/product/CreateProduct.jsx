import React, { useEffect, useState } from "react";
import { Container, Typography, Box, TextField, MenuItem, Button, InputLabel, Select, FormHelperText, FormControl } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createProducts } from "../../../api/productApi"; // API Call file
import { useDispatch, useSelector } from "react-redux";
import "../../../App.scss";
import { getCategories } from "../../../api/categoryApi";
import { getBrands } from "../../../api/brandApi";

import {
    allProducts, allCategories, allBrands, stSearch, stCategory, stBrand, stCurrentPage,stRowsPerPage
  } from "../../../features/product/productSlice";  
import "../../../styles/productCss.scss";


const CreateProduct = () => {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);

  //redux state
  const {
    categories,
    brands,
  } = useSelector((state)=>state.products);

    useEffect(()=>{
        fetchCatgories();
        fetchBrands();
    },[])

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


  // Initial Form Values
  const initialValues = {
    name: "",
    stock: "",
    price: "",
    category: "",
    brand: "",
    rating: "",
    images: [],
    description: "",
  };

  // Form Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    stock: Yup.number().min(1, "Stock must be at least 1").required("Stock is required"),
    price: Yup.number().min(1, "Price must be at least $1").required("Price is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    rating: Yup.number().min(1).max(5, "Rating must be between 1 and 5").required("Rating is required"),
    images: Yup.mixed()
      .test("required", "Please select at least one image", (files) => files && files.length > 0)
      .test("fileSize", "Each file must be under 5MB", (files) =>
        files ? files.every((file) => file.size <= 5 * 1024 * 1024) : true
      )
      .test("fileCount", "You can upload up to 5 images", (files) => files.length <= 5),
    description: Yup.string().required("Description is required"),
  });

  // Form Submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("stock", values.stock);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("brand", values.brand);
    formData.append("rating", values.rating);
    values.images.forEach((image) => formData.append("images", image));
    formData.append("description", values.description);
    
    try {
      // Log FormData contents
    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }
      const response = await createProducts(formData);
      console.log("Product Created:", response.data);
      resetForm();
      setSelectedImages([]); // Reset images
    } catch (error) {
      console.error("Error creating product:", error);
    }
    setSubmitting(false);
  };

  return (
    <Container className="container-parent" sx={{ backgroundColor: "#8080800f"}}>
        <Container className="container-child" sx={{ mt: 4, p: 3, boxShadow: 2, borderRadius: 2, backgroundColor: "white" }}>
        <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: "700" }}>
            Create New Product
        </Typography>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values, errors, touched,handleBlur, handleChange, setFieldValue, isSubmitting,setTouched }) => (
            <Form>
                {/* Product Name */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">Product Name</Typography>
                    <TextField
                        fullWidth
                        name="name"
                        placeholder="Enter product name"
                        variant="outlined"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                    />
                </Box>

                {/* Stock & Price */}
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body1">Stock</Typography>
                        <TextField
                        fullWidth
                        name="stock"
                        placeholder="Enter stock"
                        type="number"
                        variant="outlined"
                        value={values.stock}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.stock && Boolean(errors.stock)}
                        helperText={touched.stock && errors.stock}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body1">Price ($)</Typography>
                        <TextField
                        fullWidth
                        name="price"
                        placeholder="Enter price"
                        type="number"
                        variant="outlined"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.price && Boolean(errors.price)}
                        helperText={touched.price && errors.price}
                        />
                    </Box>
                </Box>

                {/* Category & Brand */}
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    {/* Category Dropdown */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body1">Category</Typography>
                        <FormControl fullWidth className="global-dropdown-class extra-dropdown-class" error={touched.category && Boolean(errors.category)}>
                        {!values.category ? <InputLabel shrink={false} className="global-dropdownLabel">Select Category</InputLabel> : null}
                        <Select
                            placeholder="Select Category"
                            name="category"
                            className="global-dropdown-input"
                            value={values.category}
                            // defaultValue=""
                            onChange={handleChange}
                            onBlur={handleBlur}
                            inputProps={{ 'aria-label': 'Without label' }}
                            displayEmpty
                            sx={{width:"100%"}}
                        >
                            {/* <MenuItem value="">Select Category</MenuItem> */}
                            {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{touched.category && errors.category}</FormHelperText>
                        </FormControl>
                    </Box>

                    {/* Brand Dropdown */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body1">Brand</Typography>
                        <FormControl fullWidth className="global-dropdown-class extra-dropdown-class" sx={{ marginBottom: "16px" }} error={touched.brand && Boolean(errors.brand)}>
                            {!values.brand && <InputLabel className="global-dropdownLabel" shrink={false}>Select Brand</InputLabel>}
                            <Select
                                name="brand"
                                className="global-dropdown-input"
                                value={values.brand}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                inputProps={{ 'aria-label': 'Without label' }}
                                displayEmpty
                            >
                                {/* <MenuItem value="">
                                    <em>Select Brand</em>
                                </MenuItem> */}
                                {brands.map((brand) => (
                                    <MenuItem key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{touched.brand && errors.brand}</FormHelperText>
                        </FormControl>
                    </Box>
                </Box>



                {/* Rating */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">Rating</Typography>
                    <TextField
                        fullWidth
                        name="rating"
                        type="number"
                        placeholder="Enter rating (1-5)"
                        variant="outlined"
                        value={values.rating}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.rating && Boolean(errors.rating)}
                        helperText={touched.rating && errors.rating}
                    />
                </Box>

                {/* File Upload */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">Product Images (Max 5)</Typography>
                    <input
                        type="file"
                        multiple
                        
                        accept="image/*"
                        onClick={(event) => {
                            event.target.value = ""; // Reset input so onChange triggers even if same file is selected
                            event.target.focus();
                        }}
                        onChange={(event) => {
                            const files = Array.from(event.target.files);
                            setFieldValue("images", files);
                            setSelectedImages(files);
                        }}
                        onBlur={(event) => {
                            setTouched({ images: true });
                      
                            // Check if no files were selected (click without selecting)
                            if (!event.target.files.length) {
                              setFieldValue("images", []); // Ensure Yup validation runs
                            }
                          }}
                        
                    />
                    <FormHelperText   error={touched.images && Boolean(errors.images)} >{touched.images && errors.images}</FormHelperText>
                </Box>

                {/* Description */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">Description</Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        name="description"
                        placeholder="Enter product description"
                        variant="outlined"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                    />
                </Box>

                {/* Submit Button */}
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                    Create Product
                </Button>
            </Form>
            )}
        </Formik>
        </Container>
    </Container>
  );
};

export default CreateProduct;

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { getProductById, editProduct } from "../../../api/productApi";
import {
  allCategories,
  allBrands,
} from "../../../features/product/productSlice";
import { getCategories } from "../../../api/categoryApi";
import { getBrands } from "../../../api/brandApi";
import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import "../../../App.scss";
import "../../../styles/productCss.scss";
import React from "react";
import BackdropLoader from "../../../components/BackdropLoader";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get product ID from URL
  const fileInputRef = useRef(null);

  // State
  const [selectedImages, setSelectedImages] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [loading, setLoading] = useState(true); 

  const [initialValues, setInitialValues] = useState({
    name: "",
    stock: "",
    price: "",
    category: "",
    brand: "",
    rating: "",
    images: [],
    description: "",
  });

  // Redux state
  const { categories, brands } = useSelector((state) => state.products);

  // Fetch categories & brands when component mounts
  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProductDetails(); // Fetch existing product data
  }, []);

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const categoryData = await getCategories();
      dispatch(allCategories(categoryData));
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch brands
  const fetchBrands = async () => {
    try {
      const brandData = await getBrands();
      dispatch(allBrands(brandData.brands));
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch product details and prefill form
  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const productData = await getProductById(id);
      setInitialValues({
        name: productData.product?.name,
        stock: productData.product?.stock,
        price: productData.product?.price,
        category: productData.product?.category_id, // Assuming backend sends category_id
        brand: productData.product?.brand_id, // Assuming backend sends brand_id
        rating: productData.product?.rating,
        images: [], // Images won't be stored here, use state
        description: productData.product?.description,
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }finally {
      setLoading(false); 
    }
  };

  // Form validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    stock: Yup.number()
      .min(1, "Stock must be at least 1")
      .required("Stock is required"),
    price: Yup.number()
      .min(1, "Price must be at least $1")
      .required("Price is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    rating: Yup.number()
      .min(1)
      .max(5, "Rating must be between 1 and 5")
      .required("Rating is required"),
    description: Yup.string().required("Description is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("id",id);
    formData.append("name", values.name);
    formData.append("stock", values.stock);
    formData.append("price", values.price);
    formData.append("category_id", values.category);
    formData.append("brand_id", values.brand);
    formData.append("rating", values.rating);
    values.images.forEach((image) => formData.append("images", image));
    formData.append("description", values.description);

    console.log("idddddd",id)


    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      await editProduct(id, formData);
      setOpenSnackBar(true);
      navigate("/admin/product"); // Redirect to product listing after update
    } catch (error) {
      console.error("Error updating product:", error);
    }
    setSubmitting(false);
  };

  return (
    <Container
      className="container-parent"
      sx={{ backgroundColor: "#8080800f" }}
    >
      <BackdropLoader open={loading} /> 
      <Container
        className="container-child"
        sx={{
          mt: 4,
          p: 3,
          boxShadow: 2,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ fontWeight: "700" }}
        >
          Edit Product
        </Typography>

        {/* Formik Form */}
        {!loading && (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setFieldValue,
            isSubmitting,
            setTouched,
          }) => (
            <Form>
              {/* Product Name */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1">Product Name</Typography>
                <TextField
                  fullWidth
                  name="name"
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
                <Box sx={{flex:1}}>
                  <Typography variant="body1">Stock</Typography>
                  <TextField
                    fullWidth
                    name="stock"
                    type="number"
                    variant="outlined"
                    value={values.stock}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.stock && Boolean(errors.stock)}
                    helperText={touched.stock && errors.stock}
                  />
                </Box>
                <Box sx={{flex:1}}>
                  <Typography variant="body1">Price</Typography>
                  <TextField
                    fullWidth
                    name="price"
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
                <FormControl
                  fullWidth
                  error={touched.category && Boolean(errors.category)}
                >
                  {!initialValues.category ? <InputLabel>Select Category</InputLabel> : ""}
                  <Select
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {touched.category && errors.category}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  fullWidth
                  error={touched.brand && Boolean(errors.brand)}
                >
                  {!initialValues.brand ? <InputLabel>Select Brand</InputLabel> : ""}
                  <Select
                    name="brand"
                    value={values.brand}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {brands.map((brand) => (
                      <MenuItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {touched.brand && errors.brand}
                  </FormHelperText>
                </FormControl>
              </Box>

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

              {/* Description */}
              <TextField
                fullWidth
                multiline
                rows={3}
                name="description"
                variant="outlined"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />

              {/* Submit Button */}
              <Button
                sx={{mt:2}}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                Update Product
              </Button>
            </Form>
          )}
        </Formik>
        )}
      </Container>
    </Container>
  );
};

export default EditProduct;

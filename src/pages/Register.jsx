import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { register } from "../api/authApi";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    profile: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Invalid mobile number")
      .required("Mobile is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("profile", file); // Update Formik state with file
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("mobile", values.mobile);
    formData.append("password", values.password);
    formData.append("profile", values.profile); // Append file for upload

    try {
      await register(formData);
      resetForm(); // Reset form fields
      setImagePreview(null); // Clear image preview
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 3, boxShadow: 2, borderRadius: 2, backgroundColor: "#8080800f" }}>
      <Typography variant="h6" align="left" gutterBottom sx={{ fontWeight: "700" }}>
        Sign Up
      </Typography>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">Name</Typography>
              <TextField
                fullWidth
                id="name"
                name="name"
                placeholder="Enter your name"
                variant="outlined"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">Email</Typography>
              <TextField
                fullWidth
                id="email"
                name="email"
                placeholder="Enter your email"
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">Mobile</Typography>
              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                placeholder="Enter your mobile number"
                variant="outlined"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.mobile && Boolean(errors.mobile)}
                helperText={touched.mobile && errors.mobile}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">Password</Typography>
              <TextField
                fullWidth
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                variant="outlined"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>

            {/* Image Upload Field */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">Profile Image</Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageChange(event, setFieldValue)}
                style={{ display: "block", marginTop: "8px" }}
              />
              {imagePreview && <img src={imagePreview} alt="Preview" width="100" height="100" style={{ marginTop: "10px" }} />}
            </Box>

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: "100%" }}>
              Register
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>
                Login
              </Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;

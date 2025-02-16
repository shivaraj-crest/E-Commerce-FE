import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { login } from "../api/authApi";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await login(values); // Call API
      dispatch(loginSuccess(data)); // Store user in Redux
      alert("Login Successful");
      navigate("/profile"); // Redirect to Profile or Dashboard
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 3, boxShadow: 2, borderRadius: 2, backgroundColor: "#8080800f" }}>
      <Typography variant="h6" align="left" gutterBottom sx={{ fontWeight: "700" }}>
        Login
      </Typography>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form>
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

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: "100%" }} disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>
                Sign Up
              </Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;

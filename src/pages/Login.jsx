import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { login } from "../api/authApi";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";

const Login = () => {
  const [userData,setUserData] = React.useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //navigating after redux use effect is updates 
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  //handle redirect synchronously after redux state is updated
  useEffect(() => {
    if(isAuthenticated && user){
      console.log("3",userData.user?.role)
      userData.user?.role==="admin" ? navigate("/admin/product") : navigate("/");
      // navigate(user.role==="admin" ? "/admin/product" : "/");
    }
  },[isAuthenticated,user,navigate,userData.user?.role])

  console.log("loginnnnnnnnnnnn")
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
      setUserData(data);
      console.log('1');
       dispatch(loginSuccess(data)); // Store user in Redux
       console.log('2');

        // if(data.user?.role==='admin'){
        //     navigate("/admin/product"); // Redirect to Profile or Dashboard
        // }else{
        //     navigate("/");
        // }
    } catch (error) {
      console.error("Login Error:", error);
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

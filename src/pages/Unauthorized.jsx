import { Typography, Container, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  
  return (
  <Container sx={{ textAlign: "center", mt: 10 }}>
    <Typography variant="h4" gutterBottom>
      403 - Access Denied
    </Typography>
    <Typography variant="body1" gutterBottom>
      You do not have permission to access this page.
    </Typography>
    <Button  onClick={() => navigate(-1, { replace: true })} variant="contained" sx={{ mt: 2 }}>
      Go Back
    </Button>
  </Container>
  );
};
export default Unauthorized;

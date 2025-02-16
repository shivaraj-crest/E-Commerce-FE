import { Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Unauthorized = () => (
  <Container sx={{ textAlign: "center", mt: 10 }}>
    <Typography variant="h4" gutterBottom>
      403 - Access Denied
    </Typography>
    <Typography variant="body1" gutterBottom>
      You do not have permission to access this page.
    </Typography>
    <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
      Go to Home
    </Button>
  </Container>
);

export default Unauthorized;

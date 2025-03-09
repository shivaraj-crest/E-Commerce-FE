import { useQuery } from "@tanstack/react-query";
import { getAddress } from "../../../api/addressApi";
import { Box, Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";

//api function
const apiGetAddresses = () => {
   
    const allAddresses = getAddress();
    return allAddresses
};

const Address = () => {
  const { data: addresses, isLoading, isError } = useQuery({
    queryKey: ["addresses"],
    queryFn: apiGetAddresses,
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Failed to load addresses</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {addresses.map((address) => (
        <Card key={address.id} sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h6">{address.name}</Typography>
            <Typography>{address.street_address}</Typography>
            <Typography>{address.city}, {address.zip_code}</Typography>
            <Typography>{address.country}</Typography>
            <Typography>Phone: {address.mobile}</Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button variant="contained" color="primary">Edit</Button>
              <Button variant="outlined" color="error">Delete</Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Address;

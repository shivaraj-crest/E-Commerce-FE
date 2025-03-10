import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart, getCart, removeFromCart, updateCartItem } from "../../api/cartApi"; // Assuming updateCartItem API exists
import Address from "./address/Address";
import { Box, Card, CardContent, Typography, Button, CircularProgress, IconButton, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router-dom";
import "../../styles/cartCss.scss"

// Fetch Cart Items Function
const getCartItemApi = async (userId) => {
  try {
    const cartItems = await getCart(userId);
    return cartItems.cartProducts; // Already returns cartProducts array
  } catch (error) {
    throw error;
  }
};

//post cart items api call
  const callcreateCartItems = async (hello)=>{
    const tanCartItems = await addToCart(hello);
    return tanCartItems;
  }

//delete cart items api call
const callDeleteCartItems = async({product_id})=>{
  try{
    const DeleteValue = await removeFromCart(product_id)
  }catch(error){
    throw error;
  }
}

const CartCheckout = () => {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  // Fetch cart items with TanStack Query
  const { data: cartItems, isLoading, isError, refetch } = useQuery({
    queryKey: ["cartItems", userId],
    queryFn: () => getCartItemApi(userId),
  });

  // Mutation 
  //create cart item
  const createCartMutation = useMutation({
    mutationFn: callcreateCartItems, // Assuming API function exists
    onSuccess: () => {
      // queryClient.invalidateQueries(["cartItems"], { exact: true });
      refetch();
    },
  });

  //delete cart item
  const deleteCartMutation = useMutation({
    mutationFn: callDeleteCartItems, // Assuming API function exists
    onSuccess: () => {
      // queryClient.invalidateQueries(["cartItems"], { exact: true });
      refetch();
    },
  });

  //handler Function to update quantity
  const handleAddToCart = (product_id, value) => {
    createCartMutation.mutate({ product_id, value });
  };

  //delete cart items
  const handleDeleteToCart = (product_id) => {
    deleteCartMutation.mutate({ product_id});
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Failed to load cart items</Typography>;

  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <Container className="container-parent landing-container" sx={{ }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, p: 2, paddingTop:"0px !important" }}>
        {/* Address Section */}
        <Box sx={{ flex: 1, maxWidth:"40%" }}>
          <Typography variant="h5" gutterBottom>Saved Addresses</Typography>
          <Address  />
        </Box>

        {/* Cart Section */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" gutterBottom>Shopping Cart</Typography>
          {cartItems.map((item,index) => (
            <Card 
              className={`cart-item ${index === 0 ? "first-cart-item" : ""} ${index === cartItems.length - 1 ? "last-cart-item" : ""}`} 
              key={item.id} 
              sx={{ display: "flex", alignItems: "center", p: 2, mb: 2 }}>
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  width={80} 
                  height={80} 
                  style={{ borderRadius: 8, objectFit: "cover", flexShrink: "0" }} 
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{item.product.name}</Typography>

                  {/* Quantity Section */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleAddToCart(item.product.id, 0)} 
                      disabled={item.quantity <= 1} // Prevent reducing below 1
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleAddToCart(item.product.id, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>

                  <Typography>Price: ${item.product.price * item.quantity}</Typography>
                </CardContent>

                <IconButton sx={{alignSelf:"start",padding:"16px"}} onClick={()=>handleDeleteToCart(item.product.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Card>
          ))}

          <Typography sx={{ mt: 2 }} variant="h6">Total: ${totalPrice}</Typography>
          <Button  variant="contained" fullWidth sx={{ mt: 2 }}>Checkout with PayPal</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CartCheckout;

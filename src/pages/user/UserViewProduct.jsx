import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../api/axiosConfig"; // Replace with actual axios instance
import BackdropLoader from "../../components/LoaderBackdrop"; // Replace with actual loader component

import "../../App.scss"
import "../../styles/productCss.scss"

const ViewProduct = ({ addToCart }) => { // Add 'addToCart' function as prop
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(""); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`/product/${id}`);
        setProduct(data.product);
        setSelectedImage(data.product.images[0]); 
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <BackdropLoader open={loading} />;

  return (
    <Container className="container-parent view-product-container-parent" sx={{ backgroundColor: "#8080800f" }}>
      <Container className="container-child view-product" sx={{ mt: 4, p: 3, boxShadow: 2, borderRadius: 2, backgroundColor: "white" }}>
        <Box sx={{ padding: 4 }}>
          {/* Back Button */}
          <div className="view-product-header d-flex align-items-center">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="icons"
              onClick={() => navigate(-1)}
              style={{ marginRight: "5px", cursor: "pointer" }}
            />
            <Typography sx={{marginBottom:"0px", fontSize:"20px"}} variant="body1" className="al-heading" gutterBottom>
              View Product
            </Typography>
          </div>

          {product && (
            <Stack className="view-product-details" direction={{ xs: "column", md: "row" }} spacing={4} mt={2}>
              {/* Product Images Section */}
              <Box sx={{ width: "50%" }}>
                {/* Main Image */}
                <Box
                  sx={{
                    width: "100%",
                    height: 350,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={selectedImage}
                    alt={product.name}
                    style={{ width: "400px", height: "350px", objectFit: "contain" }}
                  />
                </Box>

                {/* Thumbnail Images */}
                <Stack direction="row" spacing={1} mt={2} justifyContent="center">
                  {product.images.map((img, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: 1,
                        overflow: "hidden",
                        cursor: "pointer",
                        border: selectedImage === img ? "2px solid blue" : "1px solid #ccc",
                        "&:hover": { border: "2px solid black" },
                      }}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Product Info */}
              <Box className="view-product-info" sx={{ width: "50%" }}>
                <Typography variant="h4">{product.name}</Typography>
                <Typography variant="h6" color="primary" mt={1}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body1" mt={2}>
                  <strong>About this item:</strong> {product.description}
                </Typography>

                <Typography mt={1}>
                  <strong>Brand:</strong> {product.brand.name}
                </Typography>
                <Typography>
                  <strong>Category:</strong> {product.category.name}
                </Typography>
                <Typography color={product.stock > 0 ? "green" : "red"}>
                  <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </Typography>

                {/* ✅ Add to Cart Button (Replaces Edit Product Button) */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  onClick={() => addToCart(product)} // Trigger addToCart function
                >
                  Add to Cart
                </Button>
              </Box>
            </Stack>
          )}
        </Box>
      </Container>
    </Container>
  );
};

export default ViewProduct;

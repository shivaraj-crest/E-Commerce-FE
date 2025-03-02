import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Stack, Box, Container } from "@mui/material";
import BackdropLoader from "../../../components/LoaderBackdrop"; // Import Loader
import axiosInstance from "../../../api/axiosConfig"; // Axios Instance
import "../../../App.scss"
import "../../../styles/productCss.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { alignProperty } from "@mui/material/styles/cssUtils";

const ProductDetails = () => {
  const { id } = useParams(); // Get Product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(""); // Track Main Image

  // Fetch Product Details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`/product/${id}`);
        setProduct(data.product);
        setSelectedImage(data.product.images[0]); // Set Default Main Image
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
    <Container className="container-parent view-product-container-parent" sx={{ backgroundColor: "#8080800f"}}>
        <Container className="container-child view-product" sx={{ mt: 4, p: 3, boxShadow: 2, borderRadius: 2, backgroundColor: "white" }}>
            <Box sx={{ padding: 4 }}>
            {/* <Button variant="contained" color="inherit" onClick={() => navigate(-1)}>
                Back
            </Button> */}
            
            <div className="view-product-header d-flex align-items-center">
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="icons"
                    onClick={() => navigate(-1)}
                    style={{ marginRight: "5px" }}
                />
                <Typography variant="h5" className="al-heading" sx={{ marginBottom: "0px" }} gutterBottom>
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

                    <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    onClick={() => navigate(`/admin/product/${product.id}/edit`)}
                    >
                    Edit Product Details
                    </Button>
                </Box>
                </Stack>
            )}
            </Box>
        </Container>
    </Container>
  );
};

export default ProductDetails;

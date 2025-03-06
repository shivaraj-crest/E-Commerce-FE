import { Box, Card, CardContent, Container, Typography } from '@mui/material';

import React from 'react';


//react-slick requires needs them to apply css for carousal
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import img1 from "../../assets/images/banner_women.png";
import img2 from "../../assets/images/banner-1.webp";
import img3 from "../../assets/images/banner-2.webp";
import img4 from "../../assets/images/banner-3.webp";

import "../../styles/landingPage.scss"
import "../../App.scss"

//importing icons from mui - 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShirt,
  faBolt,
  faBaby,
  faClock,
  faUmbrella,
  faShirt as faNike,
  faAd,
  faBasketShopping,
  faImage,
  faH,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from 'react-router-dom';


const categories = [
  { name: "Men", icon: faShirt },
  { name: "Women", icon: faBolt },
  { name: "Kids", icon: faBaby },
  { name: "Accessories", icon: faClock },
  { name: "Footwear", icon: faUmbrella },
];

const brands = [
  { name: "Nike", icon: faNike },
  { name: "Adidas", icon: faAd },
  { name: "Puma", icon: faBasketShopping },
  { name: "Levi's", icon: faImage },
  { name: "Zara", icon: faImage },
  { name: "H&M", icon: faH },
];


//sx styles written in variable form
// CSS Styles (Flexbox-based)
const styles = {
  flexContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    gap: "15px",
  },
  card: {
    backgroundColor: "#fff",
    textAlign: "center",
    padding: "10px",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    width: "140px",
    "&:hover": { transform: "scale(1.05)", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};




const LandingPage = () => {

  const navigate = useNavigate(); // Navigation Hook

 

  return (
    <Container className="container-parent landing-container" sx={{ }}>
      {/* <Box className="landing-box">
        Hello this is landing page
      </Box> */}

      <Box>
        <img src={img1} alt="Logo" style={{width: "100%" }} /> 
      </Box>

      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        {/* Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        {/* Carousel Inner */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img2} className="d-block w-100" alt="Slide 1" style={{ height: "500px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img src={img3} className="d-block w-100" alt="Slide 2" style={{ height: "500px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img src={img4} className="d-block w-100" alt="Slide 3" style={{ height: "500px", objectFit: "cover" }} />
          </div>
        </div>

        {/* Navigation Arrows */}
        <button className="carousel-control-prev carousal-buttons-start" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon carousal-buttons-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next carousal-buttons-end" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon carousal-buttons-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

  
      <Container className="landing-box-container" maxWidth="lg" sx={{ mt: 5, textAlign: "center" }}>
      {/* Back Button */}
        {/* <FontAwesomeIcon
          icon={faArrowLeft}
          className="icons"
          onClick={() => navigate(-1)}
          style={{ marginRight: "5px", cursor: "pointer" }}
        /> */}

        {/* Shop by Category */}
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Shop by Category
        </Typography>

        <Box sx={styles.flexContainer}>
          {categories.map((category, index) => (
            <Card className="landing-brand-card" key={index} sx={styles.card} onClick={() => navigate("/user/products")}>
              <CardContent sx={styles.cardContent}>
                <FontAwesomeIcon icon={category.icon} size="2x" />
                <Typography mt={1} fontWeight="500">{category.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Shop by Brand */}
        <Typography variant="h5" fontWeight="bold" mt={5} mb={3}>
          Shop by Brand
        </Typography>
        <Box sx={styles.flexContainer}>
          {brands.map((brand, index) => (
            <Card key={index} sx={styles.card} onClick={() => navigate("/user/products")}>
              <CardContent sx={styles.cardContent}>
                <FontAwesomeIcon icon={brand.icon} size="2x" />
                <Typography mt={1} fontWeight="500">{brand.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
      
   
  
    </Container>
  );
};

export default LandingPage;
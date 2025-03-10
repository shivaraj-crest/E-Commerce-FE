import axiosInstance from "./axiosConfig";

// ✅ Get Cart Items
export const getCart = async (id) => {
  try {
    const response = await axiosInstance.get("/cart/",{id});
    return response.data; // Return cart data
  } catch (error) {
    throw error;
  }
};

// ✅ Add Product to Cart
export const addToCart = async (body) => {
  try {
    console.log("boddddddyyyy",body)
    const response = await axiosInstance.post("/cart/add", body); // Send product_id in body
    return response.data; // Return response data
  } catch (error) {
    throw error;
  }
};

// ✅ Remove Product from Cart
export const removeFromCart = async (product_id) => {
  try {
    const response = await axiosInstance.delete(`/cart/delete`, {
      params: { product_id }, // Send product_id as a query param
    });
    return response.data; // Return response data
  } catch (error) {
    throw error;
  }
};

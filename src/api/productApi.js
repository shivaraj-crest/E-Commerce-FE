import axiosInstance from "./axiosConfig";

export const getProducts = async () => {
    try {
        const response = await axiosInstance.get("/product/");
        const data = await response.data;
        return data;
    } catch (error) {
        throw error;
    }
};
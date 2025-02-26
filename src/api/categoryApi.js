import axiosInstance from "./axiosConfig";


export const getCategories = async(data)=>{
    try {
        const response = await axiosInstance.get("/category/");
        return response.data;
    } catch (error) {
        throw error;
    }
}
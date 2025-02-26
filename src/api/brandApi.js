import axiosInstance from "./axiosConfig";


export const getBrands= async()=>{
    try {
        const response = await axiosInstance.get("/brand/");
        //to convert json to object form
        return response.data;
    } catch (error) {
        throw error;
    }
}



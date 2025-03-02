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

export const createBrand = async (data) => {
    try {
        const response = await axiosInstance.post("/brand/add",data );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateBrand = async (data) => {
    try {
        const response = await axiosInstance.put(`/brand/edit`,data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteBrand = async (id) => {
    try {
        const response = await axiosInstance.delete(`/brand/delete`, {
            params: { id }  // ✅ Pass ID correctly in params
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};



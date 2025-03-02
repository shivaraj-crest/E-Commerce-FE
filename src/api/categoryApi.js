import axiosInstance from "./axiosConfig";


export const getCategories = async(data)=>{
    try {
        const response = await axiosInstance.get("/category/");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createCategory = async(data)=>{
    try {
        const response = await axiosInstance.post("/category/create",data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateCategory = async(data)=>{
    try {
        const response = await axiosInstance.put("/category/edit",data);
        return response.data;    
    } catch (error) {
        throw error;
    }

}

export const deleteCategory = async(id)=>{
    try {
        const response = await axiosInstance.delete(`/category/delete/`,{
            params: {id}
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
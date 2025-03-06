import axiosInstance from "./axiosConfig";

export const getProducts = async (category_id, brand_id, price_range,  ratings, search, page, limit) => {
    try {
        
        console.log("helooooo Page",page)
        const response = await axiosInstance.get("/product/", {
            params: {  //Dynamically pass query parameters
                category_id: category_id?category_id.join(","):undefined,
                brand_id: brand_id?brand_id.join(",") : undefined,
                price_range: price_range? price_range.join(",") : undefined,
                search: search || undefined,
                page: page || 1, // Default to page 1
                limit: limit || 10, //Default to 10 items per page
                ratings: ratings || undefined
            }
        });
        return response.data; //Extract and return data
    } catch (error) {
        throw error;
    }
};


export const createProducts = async(formData) =>{
    try {
        const response = await axiosInstance.post("/product/create",formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }   
};

export const editProduct = async (id, formData) => {
    try {
        const response = await axiosInstance.put(`/product/edit`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getProductById = async (id) => {
    try {
        const response = await axiosInstance.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//IMPORTANT in delete send id as params and not as body as delete doesn't accept any 
//any other way
export const deleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`/product/delete`, {
            params: { id }  // ✅ Pass ID correctly in params
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

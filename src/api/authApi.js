import axiosInstance from "./axiosConfig";

//register user
export const register = async (formData)=>{
    try {
        const response = await axiosInstance.post("/auth/register",formData,{
            headers:{
                //important to add this header for file upload
                "Content-Type":"multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

//login user
export const login = async(formData)=>{
    try{
        const response = await axiosInstance.post("/auth/login",formData);
        return response.data;
    }catch(error){
        throw error;
    }
}



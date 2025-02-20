import axiosInstance from "./axiosConfig";


//REMINDER: doing reponse.data get's us parsed data from json to object form so always return 
//response.data


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

export const AdminVerify = async()=>{
    try{
        const response = await axiosInstance.get("/auth/admin");
        return response;
    }catch(error){
        throw error;
    }
}

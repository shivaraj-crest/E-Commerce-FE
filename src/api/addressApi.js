import axiosInstance from "./axiosConfig";


export const getAddress = async () => {
    try{

        const response = await axiosInstance.get("/address/");
        return response.data.Address;
    }catch(error){
        throw error;
    }
}


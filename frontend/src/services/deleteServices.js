import axios from "axios";

export const deleteServices = async (id) => {
    try {
         const res = await axios.delete(`http://localhost:8800/api/employees/${id}`)
         console.log(res);
         if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
        return {
            status: res.data.error.status,
            message: res.data.message,
        };
    } catch (err) {
        console.log(err);
        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
        
    }
}
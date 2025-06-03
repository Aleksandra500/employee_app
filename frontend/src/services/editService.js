import axios from "axios";
const token = localStorage.getItem('token');
export const editService = async(id, data) => {
    try {
        const res  = await axios.put(`http://localhost:8800/api/employees/${id}`, data, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
       
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
      
        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
    }
}
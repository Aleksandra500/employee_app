import axios from "axios";

export const getSalary = async () => {
    try {
        const res = await axios.get('http://localhost:8800/api/payment/getAll', {
            withCredentials: true
        })
       

       
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message || 'No message', 
                data: res.data.data || [] 
            };
        }
        

        return {
            status: res.data.status || 'error', 
            message: res.data.message || 'No message', 
            data: [] 
        };
    } catch (err) {
        console.error('Error fetching salary data:', err);


        return {
            status: err.response?.data?.status || 'error', 
            message: err.response?.data?.message || 'An error occurred while fetching data',  
            data: []  
        };
    }
};

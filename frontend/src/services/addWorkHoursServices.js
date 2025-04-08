import axios from 'axios';

export const addWorkHours = async (addHours) => {
    try {
        const res = await axios.post('http://localhost:8800/api/employees/hours', addHours);
        console.log(res, 'res iz servisa');
        
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
};
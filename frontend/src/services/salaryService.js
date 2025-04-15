import axios from "axios"

export const getSalary = () => {
    try {
        const res = axios.get('/api/payment/getAll')
        console.log(res, 'res iz servisa salary');
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
                data: res.data.data
            };
        }
        return {
            status: res.data.error.status,
            message: res.data.message,
            data: []
        };


    } catch (err) {
        console.log(err, 'err iz servisa salary');
        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
    }
}
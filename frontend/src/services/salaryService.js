import axios from "axios";

export const getSalary = async () => {
    try {
        const res = await axios.get('http://localhost:8800/api/payment/getAll')
       

        // Provera da li je status uspešan
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message || 'No message',  // fallback ako nema poruke
                data: res.data.data || []  // fallback ako nema podataka
            };
        }
        
        // Ako status nije uspešan, vraćamo default vrednosti
        return {
            status: res.data.status || 'error',  // fallback za status
            message: res.data.message || 'No message',  // fallback za poruku
            data: []  // fallback za podatke
        };
    } catch (err) {
        console.error('Error fetching salary data:', err);

        // Vraćamo fallback vrednosti u slučaju greške
        return {
            status: err.response?.data?.status || 'error',  // fallback za status
            message: err.response?.data?.message || 'An error occurred while fetching data',  // fallback za poruku
            data: []  // fallback za podatke
        };
    }
};

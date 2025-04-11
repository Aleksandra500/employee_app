import axios from "axios"

export const getAll = async () => {

  try {
    const res = await axios.get('http://localhost:8800/api/employees/getAll')
    console.log(res);
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
    return {
        status: err.response?.data?.err.status,
        message: err.response?.data?.message,
    };
    
  }


}
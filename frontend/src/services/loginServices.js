import axios from 'axios';

export const registerService = async(form) => {
   try {
    const res = await axios.post('http://localhost:8800/api/login/register', form)
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
    console.log(err, 'errr iz servisa');
    return {
        status: err.response?.data?.err.status,
        message: err.response?.data?.message,
    };
   }


}


export const loginService = async(form) => {
    try {
     const res = await axios.post('http://localhost:8800/api/login', form)
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
     console.log(err, 'errr iz servisa');
     return {
         status: err.response?.data?.err.status,
         message: err.response?.data?.message,
     };
    }
 
 
 }
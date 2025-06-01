import axios from 'axios';

export const registerService = async (form) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:8800/api/login/register', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      
  
      if (res.status === 200 && res.data.status === 'success') {
        return {
          status: res.data.status,
          message: res.data.message,
          token: res.data.token,      
          user: res.data.user        
        };
      }
  
      return {
        status: res.data.error?.status || 'error',
        message: res.data.message || 'Neuspeh',
      };
  
    } catch (err) {
    
      return {
        status: err.response?.data?.err?.status || 'error',
        message: err.response?.data?.message || 'Došlo je do greške',
      };
    }
  };
  


export const loginService = async(form) => {
    try {
     const res = await axios.post('http://localhost:8800/api/login', form)
    
     if (res.status === 200 && res.data.status === 'success') {
      return {
        status: res.data.status,
        message: res.data.message,
        token: res.data.token,      
        user: res.data.user        
      };
    }
    return {
      status: res.data.error?.status || 'error',
      message: res.data.message || 'Neuspeh',
    };
     
    } catch (err) {
    
     return {
      status: err.response?.data?.err?.status || 'error',
      message: err.response?.data?.message || 'Došlo je do greške',
    };
    }
 
 
 }
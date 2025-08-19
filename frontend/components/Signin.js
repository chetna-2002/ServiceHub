
import {toast} from 'react-hot-toast'
import API from '../src/services/Api'

// backend connection settings in one place:

// URL

// Headers

// Error handling

// Token management

const signin = async(formData)=>{
    try {
    const {data} = await API.post("/auth/login",formData);
    const {token,user} = data;
     localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    toast.success('Logged in successfully!');

    return { success: true, data };
  } catch (error) {
    const msg = error.response?.data?.message || error.message || 'Login failed';
    toast.error(msg);
    return { success: false, error: error.response?.data };
  }
};

export default signin;
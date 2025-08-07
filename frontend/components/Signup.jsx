import axios from 'axios'
import {toast} from "react-hot-toast"



const signup = async(formData)=>{
    try {
    const response = await axios.post("http://localhost:3001/api/v1/auth/signup", formData);
    console.log("Success:", response.data);
    toast.success("Registered successfully!");
    return {success:true};
  } catch (error) {
   console.error("Error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Registration failed");
    return {success:false};
  }
};


export default signup;
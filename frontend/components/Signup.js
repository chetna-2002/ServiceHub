import API from "../src/services/Api";
import {toast} from "react-hot-toast"



const signup = async(formData)=>{
  console.log(formData)
    try {
    const response = await API.post("/auth/signup", formData);
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
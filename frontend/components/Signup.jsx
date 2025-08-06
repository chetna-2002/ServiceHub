import axios from 'axios'



const signup = async(formData)=>{
    try {
    const response = await axios.post("http://localhost:3001/api/v1/auth/signup", formData);
    console.log("Success:", response.data);
    alert("Registered successfully!");
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    alert("Registration failed");
  }
};


export default signup;
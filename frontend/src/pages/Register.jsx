import { useState } from 'react';
import { useForm } from "react-hook-form"
import signup from '../../components/Signup';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [role, setRole] = useState("customer");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate= useNavigate();
  

 const onSubmit = async (data) => {
  data.role = role;

  if (role === "provider" && data.skills) {
    data.skills = data.skills.split(',').map(skill => skill.trim());
  }

 const result =  await signup(data);

 if(result?.success){
    navigate('/login')
 }
}

  
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      {/* Role Toggle */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          type="button"
          className={`px-4 py-2 rounded ${role === "customer" ? "bg-[#9EBC8A] text-white" : "bg-gray-200"}`}
          onClick={() => setRole("customer")}
        >
          Customer
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded ${role === "provider" ? "bg-[#9EBC8A] text-white" : "bg-gray-200"}`}
          onClick={() => setRole("provider")}
        >
          Provider
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            {...register("fullname", { required: "Full name is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
            })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium">Phone</label>
          <input
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter valid 10-digit number",
              },
            })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        {/* Extra fields for PROVIDER only */}
        {role === "provider" && (
          <>
            {/* Bio */}
            <div>
              <label className="block font-medium">Bio</label>
              <textarea
                {...register("bio", { maxLength: 300 })}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.bio && <p className="text-red-500 text-sm">Max 300 characters allowed</p>}
            </div>

            {/* Skills */}
            <div>
              <label className="block font-medium">Skills (comma separated)</label>
              <input
                {...register("skills")}
                className="w-full border px-3 py-2 rounded"
                placeholder="e.g. plumbing, electrician"
              />
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="block font-medium">Hourly Rate (₹)</label>
              <input
                type="number"
                {...register("hourlyRate")}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#9EBC8A] text-white py-2 rounded hover:bg-[#73946B]"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default Register;



































import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import signin from "../../components/Signin";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const result = await signin(data);
    if (result?.success) {
      // You can store token in localStorage here if needed:
      // localStorage.setItem("token", result.data.token);
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block font-medium">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#9EBC8A] text-white py-2 rounded hover:bg-[#73946B]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

// User types into input
//      ↓
// (register) tells useForm: track this field + apply rules
//      ↓
// User clicks Submit
//      ↓
// handleSubmit runs → checks all rules
//      ↓
// If all good → calls onSubmit(data)
// If not → puts error messages in formState.errors


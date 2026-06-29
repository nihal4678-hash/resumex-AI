import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(form);

      toast.success("Login Successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(
  err.response?.data?.message || "Login Failed"
);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg p-8 rounded-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          className="border w-full p-3 mb-4"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="border w-full p-3 mb-4"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white w-full p-3 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
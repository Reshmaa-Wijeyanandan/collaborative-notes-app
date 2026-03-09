import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      navigate("/dashboard");

    } catch (error) {
      alert("Login failed");
    }

  };

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-4"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have an account?
          <Link to="/register" className="text-blue-600 ml-1">
            Register
          </Link>
        </p>

      </form>

    </div>

  );

}

export default Login;
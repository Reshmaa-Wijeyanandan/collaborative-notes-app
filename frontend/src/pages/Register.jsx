import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Registration successful");

      navigate("/login");

    } catch (err) {

      alert("Registration failed");

    }

  };

  return (

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 shadow-lg rounded w-96"
      >

        <h2 className="text-2xl font-bold mb-4 text-center">
          Register
        </h2>

        <input
            placeholder="Name"
            className="border rounded p-2 w-full mb-4"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />

            <input
            placeholder="Email"
            className="border rounded p-2 w-full mb-4"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="Password"
            className="border rounded p-2 w-full mb-6"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white w-full py-2">
          Register
        </button>

        <p className="mt-4 text-center">
          Already have an account?
          <Link to="/login" className="text-green-600 ml-1">
            Login
          </Link>
        </p>

      </form>

    </div>

  );

}

export default Register;
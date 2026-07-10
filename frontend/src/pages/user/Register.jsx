import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {registerUser} from '../../services/authApi'
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
function Register() {


const [name, setName] = React.useState("");
const [email, setEmail] = React.useState("");
const [password, setPassword] = React.useState("");
const [confirmPassword, setConfirmPassword] = React.useState("");
const[error,setError] = React.useState("")
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return setError(
        "Password must contain uppercase, lowercase, number and special character",
      );
    }

    const data = {
      name,
      email,
      password,
      confirmPassword,
    };

    const response = await registerUser(data);

    toast.success(response.message || "Account created successfully");

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  } catch (err) {
    console.log(err.response?.data);

    setError(err.response?.data?.message || "Something went wrong");

    setTimeout(() => {
      setError("");
    }, 2000);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      {/* Your Routes */}

      <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-3">
          Create your account
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>

          {error && <p className="text-red-500 font-medium">{error}</p>}

          {/* Create Account */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
      

        {/* Social Buttons */}
       
      </div>
    </div>
  );
}

export default Register;

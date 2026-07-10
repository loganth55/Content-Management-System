import React from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../services/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../services/authApi";
function Login() {

const[email,setEmail] = React.useState("")
const[password , setPassword] = React.useState("")
const[error,setError] = React.useState("")
const[remember,setRemember] = React.useState("")
const navigate = useNavigate();

useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = {
      email,
      password,
    };

    const datas = await loginUser(data);

    localStorage.setItem("token", datas.token);
    localStorage.setItem("user", JSON.stringify(datas.user));

    toast.success("Login Successful");
console.log("Login Response:", datas);
console.log("User Role:", datas.user.role);
setTimeout(() => {
  if (datas.user.role === "admin") {
    navigate("/admin/dashboard");
  } else {
    navigate("/");
  }
}, 1000);

    setEmail("");
    setPassword("");
    setRemember("");
  console.log(datas.token);
  console.log(datas.user);
  } catch (err) {
    setError(err.response?.data?.message);

    setEmail("");
    setPassword("");

    setTimeout(() => {
      setError("");
    }, 2000);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-slate-900 mb-3">
          Sign in to your account
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Or{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            create a new account
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input value={remember} type="checkbox" />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {/* Sign In */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gray-300"></div>

          <span className="px-4 text-slate-500">Or continue with</span>

          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <GoogleLogin
            width="380"
            onSuccess={async (credentialResponse) => {
              try {
                const googleData = await googleLogin(
                  credentialResponse.credential,
                );

                localStorage.setItem("token", googleData.token);
                localStorage.setItem("user", JSON.stringify(googleData.user));

                toast.success("Google Login Successful");

                setTimeout(() => {
                  navigate("/");
                }, 1000);
              } catch (err) {
                toast.error(
                  err.response?.data?.message || "Google Login Failed",
                );
              }
            }}
            onError={() => {
              toast.error("Google Login Failed");
            }}
          />
        </div>

        {/* Bottom */}
        <p className="text-center text-slate-500 mt-8">
          Not a member?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Create your account now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/authApi";
import { toast } from "react-toastify";

function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Button Clicked");

  if (password !== confirmPassword) {
    return toast.error("Passwords do not match.");
  }

  try {
    setLoading(true);

    console.log("Calling API...");

    const data = await resetPassword(token, password);

    console.log(data);

    toast.success(data.message);

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  } catch (err) {
    toast.error(err.response?.data?.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold mb-2">Reset Password</h1>

        <p className="text-gray-500 mb-6">Enter your new password below.</p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-4"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-6"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
export default ResetPassword;

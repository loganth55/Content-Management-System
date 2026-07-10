import { useState } from "react";
import { forgotPassword } from "../../services/authApi";
import { toast } from "react-toastify";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
   const handleSubmit = async (e) => {
     e.preventDefault();

     try {
       setLoading(true);

       const data = await forgotPassword(email);

       toast.success(data.message);

       setEmail("");
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
        type="submit"
        className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>

        <p className="text-gray-500 mb-6">
          Enter your email address and we'll send you a password reset link.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 outline-none mb-6"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;

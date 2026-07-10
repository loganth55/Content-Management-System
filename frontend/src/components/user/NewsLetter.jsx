import { subscribe } from "../../services/subscriberApi";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
function NewsLetter() {
  const [email, setEmail] = useState("");

const handleSubscribe = async () => {
  try {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedUser.email !== email) {
      toast.error("This is not your registered email.");
      return;
    }

    const data = await subscribe(email);

    toast.success(data.message);

    setEmail("");
  } catch (err) {
    console.log(err);
    console.log(err.response);
    console.log(err.response?.data);

    toast.error(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center">
        <p className="text-blue-400 font-semibold uppercase tracking-wider mb-3">
          Newsletter
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
          Stay Updated With Tech Blog
        </h2>

        <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-8">
          Subscribe to receive the latest blogs, web development tutorials, AI
          updates, and software engineering articles directly in your inbox.
        </p>

        <div className="flex-1 rounded-xl px-4 py-3 outline-none text-black">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-14 px-5 rounded-2xl bg-slate-800 border border-slate-600 text-white placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
          />

          <button
            onClick={handleSubscribe}
            className="ml-4 bg-blue-600 text-white px-8 py-3 rounded-xl"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;

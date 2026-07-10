import { BookOpen } from "lucide-react";
import * as CountUpModule from "react-countup";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getHomeStats } from "../../services/homeApi";
function Hero() {
  
  const navigate = useNavigate();

const CountUp = CountUpModule.default.default;
 console.log(CountUp);
  const [stats, setStats] = useState({
    blogs: 0,
    categories: 0,
    users: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getHomeStats();

        setStats(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 md:py-28">
      {/* Background Blur */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl"></div>
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 rounded-full border border-blue-200 bg-white px-5 py-2 shadow-sm">
          <BookOpen className="h-5 w-5 text-blue-600" />

          <span className="text-sm font-semibold tracking-wide text-slate-700">
            THE TECH JOURNAL
          </span>
        </div>
        {/* Heading */}
        <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
          Ideas That
          <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Shape Tomorrow
          </span>
        </h1>
        {/* Description */}
        <p className="mx-auto mt-8 max-w-4xl text-lg leading-9 text-slate-600">
          Explore a world of knowledge through expertly crafted articles,
          practical tutorials, and thought-provoking insights. Stay ahead of
          emerging trends, expand your expertise, and discover ideas that
          inspire innovation, continuous learning, and meaningful growth in the
          ever-evolving world of technology.
        </p>
        {/* Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => navigate("/blogs")}
            className="rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl"
          >
            Explore Articles
          </button>

          <button
            onClick={() => navigate("/categories")}
            className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-blue-600 hover:shadow-xl"
          >
            Browse Categories
          </button>
        </div>{" "}
        {/* Stats */} {/* Stats */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <h3 className="text-3xl font-bold text-slate-900">
              <CountUp
                end={stats.blogs}
                duration={2.5}
                enableScrollSpy
                scrollSpyOnce
              />
              +
            </h3>

            <p className="mt-2 text-slate-500">Published Articles</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-slate-900">
              <CountUp
                end={stats.categories}
                duration={2.5}
                enableScrollSpy
                scrollSpyOnce
              />
            </h3>

            <p className="mt-2 text-slate-500">Categories</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-slate-900">
              <CountUp
                end={stats.users}
                duration={2.5}
                enableScrollSpy
                scrollSpyOnce
              />
              +
            </h3>

            <p className="mt-2 text-slate-500">Users</p>
          </div>
        </div>{" "}
      </div>{" "}
    </section>
  );
}

export default Hero;

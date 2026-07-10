import React from "react";
import { Search } from "lucide-react";
import { useState,useEffect } from "react";
import DashboardGraph from "../../components/user/DashboardGraph";
import BlogStatusChart from "../../components/user/BlogStatusChart";
import TopCategories from "../../components/user/TopCategories";

import {
  FileText,
  CheckCircle2,
  FileClock,
  MessageSquareText,
} from "lucide-react";
import { getDashboardStats, getTopCategories } from "../../services/dashboardApi";
import { getMonthlyBlogs } from "../../services/dashboardApi";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
const [stats, setStats] = useState({
    totalBlogs:0,
    totalPublished:0,
    totalDrafts:0,
    totalComments:0,
})
const [monthlyBlogs, setMonthlyBlogs] = useState([]);

const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
const[topCategories,setTopCategories] = useState([]);

useEffect(() => {
  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();

      console.log(data);

      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchStats();
}, []);

useEffect(() => {

  const fetchMonthlyBlogs = async () => {
    try {
      const data = await getMonthlyBlogs(selectedYear);
      setMonthlyBlogs(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchMonthlyBlogs();
}, [selectedYear]);


useEffect(()=>{
  const fetchTopCategories = async()=>{
    try {
      const data = await getTopCategories();
      setTopCategories(data);
      console.log("Top Categories:", data);
    } catch (err) {
      console.log(err);
    }
  }
  fetchTopCategories();
},[])
console.log("Top Categories:", topCategories);

  return (
    <div className="min-h-screen bg-[#08111F] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left */}
          <div>
            <p className="text-slate-400 text-lg mb-2">Dashboard</p>

            <h1 className="text-5xl font-bold">Hello, {user?.name} 👋</h1>

            <p className="text-slate-400 mt-4 text-lg">
              Welcome back! Here's what's happening with your blog today.
            </p>
          </div>

          {/* Search */}
          <div className="w-full lg:w-[420px]">
            
          </div>
        </div>

        {/* Statistics Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-14">
          {/* Total Blogs */}
          <div className="bg-[#13284B] border border-[#274774] rounded-3xl p-6 hover:border-blue-500 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)] transition-all duration-300">
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-3xl">
                <FileText className="w-8 h-8 text-blue-400" />
              </div>

              <span className="text-sm text-green-400 font-medium">Total</span>
            </div>

            <h3 className="text-slate-400 mt-8">Total Blogs</h3>

            <h1 className="text-5xl font-bold mt-2">{stats.totalBlogs}</h1>
          </div>

          {/* Published */}
          <div className="bg-[#13284B] border border-[#274774] rounded-3xl p-6 hover:border-green-500 hover:shadow-[0_0_35px_rgba(34,197,94,0.25)] transition-all duration-300">
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-3xl">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>

              <span className="text-sm text-green-400">Live</span>
            </div>

            <h3 className="text-slate-400 mt-8">Published</h3>

            <h1 className="text-5xl font-bold mt-2">{stats.totalPublished}</h1>
          </div>

          {/* Draft */}
          <div className="bg-[#13284B] border border-[#274774] rounded-3xl p-6 hover:border-yellow-500 hover:shadow-[0_0_35px_rgba(234,179,8,0.25)] transition-all duration-300">
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-3xl">
                <FileClock className="w-8 h-8 text-yellow-400" />
              </div>

              <span className="text-sm text-yellow-400">Pending</span>
            </div>

            <h3 className="text-slate-400 mt-8">Drafts</h3>

            <h1 className="text-5xl font-bold mt-2">{stats.totalDrafts}</h1>
          </div>

          {/* Comments */}
          <div className="bg-[#13284B] border border-[#274774] rounded-3xl p-6 hover:border-purple-500 hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] transition-all duration-300">
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-3xl">
                <MessageSquareText className="w-8 h-8 text-purple-400" />
              </div>

              <span className="text-sm text-purple-400">Total</span>
            </div>

            <h3 className="text-slate-400 mt-8">Comments</h3>

            <h1 className="text-5xl font-bold mt-2">{stats.totalComments}</h1>
          </div>
        </section>

        {/* Graph */}
        <section className="mt-10">
          <div className="grid grid-cols-1 xl:grid-cols-11 gap-8">
            <div className="xl:col-span-6">
              <DashboardGraph
                monthlyBlogs={monthlyBlogs}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                totalPublished={stats.totalPublished}
                totalComments={stats.totalComments}
              />
            </div>

            <div className="xl:col-span-5">
              <BlogStatusChart
                totalPublished={stats.totalPublished}
                totalDrafts={stats.totalDrafts}
              />
              <br></br>
              <TopCategories topCategories={topCategories} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;

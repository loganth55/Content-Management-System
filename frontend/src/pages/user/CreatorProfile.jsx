import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../services/profileApi";
import { FileText, CheckCircle2, Eye } from "lucide-react";
import CreatorGraph from "../../components/user/CreatorGraph";
import BlogStatusChart from "../../components/user/BlogStatusChart";
import CreatorTopCategories from "../../components/user/CreatorTopCategories";
import { Star } from "lucide-react";
function CreatorProfile() {
  const { id } = useParams();


  console.log("Profile ID:", id);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [monthlyBlogs, setMonthlyBlogs] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(id);

        console.log(data);

        setProfile(data.profile);
        setStats(data.stats);
        setRecentBlogs(data.recentBlogs);
        setMonthlyBlogs(data.monthlyBlogs);
        setStats(data.stats);
        console.log("Monthly Blogs:", data.monthlyBlogs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile || !stats) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-[#08111F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 lg:py-10">
        <div className="bg-[#13284B] border border-[#274774] rounded-3xl p-5 sm:p-7 lg:p-10">
          <div className="flex flex-col xl:flex-row items-center xl:items-center justify-between gap-8 lg:gap-10">
            {/* Left */}
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full xl:w-auto">
              {/* Avatar */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl font-bold shrink-0">
                {profile.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="text-center sm:text-left">
                <div className="flex justify-center sm:justify-start items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                    {profile.name}
                  </h1>

                  {/* Verified Badge */}
                  <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
                    ✔
                  </div>
                </div>

                <p className="text-slate-400 mt-2">Verified Creator</p>

                <p className="text-slate-400 mt-3">
                  📅{" "}
                  {profile.createdAt
                    ? `Joined ${new Date(profile.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          year: "numeric",
                        },
                      )}`
                    : "Joined Date Unavailable"}
                </p>
              </div>
            </div>

            {/* Right */}

            <div className="border-t lg:border-t-0 lg:border-l border-[#274774] pt-6 lg:pt-0 lg:pl-12 text-center w-full lg:w-auto">
              <div className="w-16 h-16 rounded-full bg-[#1E335A] flex items-center justify-center mx-auto">
                👁
              </div>

              <p className="text-slate-400 mt-4">Profile Views</p>

              <h2 className="text-4xl font-bold text-blue-500 mt-2">
                {profile.profileViews}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
          {/* Total Blogs */}
          <div className="bg-[#13284B] rounded-3xl p-6 border border-[#274774] hover:border-blue-500 transition">
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <FileText className="w-7 h-7 text-blue-400" />
              </div>

              <span className="text-blue-400 text-sm">Total</span>
            </div>

            <h3 className="text-slate-400 mt-6">Total Blogs</h3>

            <h1 className="text-5xl font-bold mt-2">{stats.totalBlogs}</h1>
          </div>

          {/* Published */}
          <div className="bg-[#13284B] rounded-3xl p-6 border border-[#274774] hover:border-green-500 transition">
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-green-400" />
              </div>

              <span className="text-green-400 text-sm">Live</span>
            </div>

            <h3 className="text-slate-400 mt-6">Published</h3>

            <h1 className="text-5xl font-bold mt-2">{stats.publishedBlogs}</h1>
          </div>

          {/* Profile Views */}
          <div className="bg-[#13284B] rounded-3xl p-6 border border-[#274774] hover:border-purple-500 transition">
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                <Eye className="w-7 h-7 text-purple-400" />
              </div>

              <span className="text-purple-400 text-sm">Views</span>
            </div>

            <h3 className="text-slate-400 mt-6">Profile Views</h3>

            <h1 className="text-5xl font-bold mt-2">{profile.profileViews}</h1>
          </div>
          <div className="bg-[#13284B] rounded-3xl p-6 border border-[#274774] hover:border-yellow-500 transition">
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
                <Star className="w-7 h-7 text-yellow-400" />
              </div>

              <span className="text-yellow-400 text-sm">Score</span>
            </div>

            <h3 className="text-slate-400 mt-6">Creator Score</h3>

            <h1 className="text-5xl font-bold mt-2 text-yellow-300">
              {stats.creatorScore}
            </h1>
          </div>
        </section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <section className="mt-10">
            <div className="grid grid-cols-1 xl:grid-cols-13 gap-8">
              {/* Left Side */}
              <div className="xl:col-span-7">
                <CreatorGraph monthlyBlogs={monthlyBlogs} />
              </div>

              {/* Right Side */}
              <div className="xl:col-span-6 flex flex-col gap-8">
                <BlogStatusChart
                  totalPublished={stats.publishedBlogs}
                  totalDrafts={stats.draftBlogs}
                />
                <CreatorTopCategories recentBlogs={recentBlogs} />{" "}
                {/* Top Categories will come here */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

}
export default CreatorProfile;
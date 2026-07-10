import {
  Brain,
  Cpu,
  Database,
  Monitor,
  Server,
  Globe,
  Code2,
  Laptop,
  Shield,
  Boxes,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function TopCategories({ topCategories }) {
  const icons = [
    Brain,
    Cpu,
    Database,
    Monitor,
    Server,
    Globe,
    Code2,
    Laptop,
    Shield,
    Boxes,
  ];
  const navigate = useNavigate();

  const cardColors = [
    {
      card: "from-purple-900/40 to-purple-700/10 border-purple-500/30",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      card: "from-blue-900/40 to-blue-700/10 border-blue-500/30",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      card: "from-emerald-900/40 to-emerald-700/10 border-emerald-500/30",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
    },
    {
      card: "from-orange-900/40 to-orange-700/10 border-orange-500/30",
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-400",
    },
    {
      card: "from-cyan-900/40 to-cyan-700/10 border-cyan-500/30",
      iconBg: "bg-cyan-500/20",
      iconColor: "text-cyan-400",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#13284B] to-[#0E203B] rounded-3xl border border-[#274774] p-8">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Top Categories</h2>

          <p className="text-slate-400 mt-2 text-lg">
            Your most used categories
          </p>
        </div>

        <button
          onClick={() => navigate("/categories")}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-[#2A4A77] text-white hover:border-blue-500 transition"
        >
          View All
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {topCategories.slice(0, 3).map((item, index) => {
          const Icon = icons[index % icons.length];
          const color = cardColors[index % cardColors.length];

          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${color.card} border rounded-2xl p-5 h-40 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${color.iconBg} flex items-center justify-center`}
              >
                <Icon className={color.iconColor} size={24} />
              </div>

              <h3 className="text-white text-xl font-semibold mt-5">
                {item.category}
              </h3>

              <p className="text-slate-400 text-base mt-1">
                {item.total} Blog{item.total > 1 ? "s" : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopCategories;

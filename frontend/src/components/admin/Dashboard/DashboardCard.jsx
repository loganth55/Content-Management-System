import {
  Users,
  FileText,
  FolderOpen,
  MessageCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { ResponsiveContainer, AreaChart, Area } from "recharts";

const cardConfig = [
  {
    key: "users",
    title: "Total Users",
    icon: Users,
    dataKey: "users",
    color: "#7C3AED",
    bg: "bg-violet-100",
    iconColor: "text-violet-600",
    gradientId: "usersGradient",
  },
  {
    key: "blogs",
    title: "Total Blogs",
    icon: FileText,
    dataKey: "blogs",
    color: "#2563EB",
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
    gradientId: "blogsGradient",
  },
  {
    key: "categories",
    title: "Total Categories",
    icon: FolderOpen,
    dataKey: "categories",
    color: "#22C55E",
    bg: "bg-green-100",
    iconColor: "text-green-600",
    gradientId: "categoriesGradient",
  },
  {
    key: "comments",
    title: "Total Comments",
    icon: MessageCircle,
    dataKey: "comments",
    color: "#F97316",
    bg: "bg-orange-100",
    iconColor: "text-orange-500",
    gradientId: "commentsGradient",
  },
];

function DashboardCard({ cards }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cardConfig.map((card) => {
        const data = cards[card.key];
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Header */}

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-3">{data.total}</h2>
              </div>

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.bg}`}
              >
                <Icon className={card.iconColor} size={28} />
              </div>
            </div>

            {/* Bottom */}

            <div className="flex items-end justify-between mt-6">
              <div>
                <div className="flex items-center gap-2">
                  {data.growth >= 0 ? (
                    <TrendingUp className="text-green-500" size={18} />
                  ) : (
                    <TrendingDown className="text-red-500" size={18} />
                  )}

                  <span
                    className={`font-semibold ${
                      data.growth >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {Math.abs(data.growth).toFixed(1)}%
                  </span>
                </div>

                <p className="text-gray-400 text-xs mt-1">vs last 7 days</p>
              </div>

              <div className="w-28 h-12">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data.trend}
                    margin={{
                      top: 5,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id={card.gradientId}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={card.color}
                          stopOpacity={0.35}
                        />

                        <stop
                          offset="95%"
                          stopColor={card.color}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <Area
                      type="natural"
                      dataKey={card.dataKey}
                      stroke={card.color}
                      strokeWidth={2.5}
                      fill={`url(#${card.gradientId})`}
                      dot={false}
                      activeDot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardCard;
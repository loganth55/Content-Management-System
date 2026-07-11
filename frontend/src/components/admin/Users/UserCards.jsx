import {
  Users,
  UserCheck,
  UserPlus,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { ResponsiveContainer, LineChart, Line } from "recharts";
import * as CountUpModule from "react-countup";

function UserCards({ cards }) {
  const CountUp = CountUpModule.default.default;
  const cardData = [
    {
      title: "Total Users",
      value: cards.totalUsers,
      growth: cards.totalUsersGrowth,
      trend: cards.totalUsersTrend,
      icon: <Users size={22} />,
      iconColor: "bg-violet-100 text-violet-600",
      lineColor: "#7C3AED",
    },
    {
      title: "Active Users",
      value: cards.activeUsers,
      growth: cards.activeUsersGrowth,
      trend: cards.activeUsersTrend,
      icon: <UserCheck size={22} />,
      iconColor: "bg-green-100 text-green-600",
      lineColor: "#16A34A",
    },
    {
      title: "New Users",
      value: cards.newUsers,
      growth: cards.newUsersGrowth,
      trend: cards.newUsersTrend,
      icon: <UserPlus size={22} />,
      iconColor: "bg-blue-100 text-blue-600",
      lineColor: "#2563EB",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cardData.map((card) => (
        <div
          key={card.title}
          className="relative bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-48 overflow-hidden"
        >
          {/* Icon */}
          <div
            className={`absolute top-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center ${card.iconColor}`}
          >
            {card.icon}
          </div>

          {/* Title */}
          <p className="text-gray-500 text-sm">{card.title}</p>

          {/* Value */}
          <h2 className="text-5xl font-bold mt-2">
            <CountUp
              end={card.value}
              duration={2}
              enableScrollSpy
              scrollSpyOnce
            />
          </h2>

          {/* Growth */}
          <div className="mt-6">
            <div className="flex items-center gap-2">
              {card.growth >= 0 ? (
                <TrendingUp size={16} className="text-green-600" />
              ) : (
                <TrendingDown size={16} className="text-red-600" />
              )}

              <span
                className={`font-bold ${
                  card.growth >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {Math.abs(card.growth)}%
              </span>
            </div>

            <p className="text-gray-400 text-sm mt-1">vs last 7 days</p>
          </div>

          {/* Small Sparkline */}
          <div className="absolute bottom-4 right-4 w-32 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={card.trend.map((value) => ({
                  value,
                }))}
              >
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={card.lineColor}
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                  isAnimationActive
                  animationDuration={1800}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserCards;

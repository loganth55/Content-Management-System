import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function WeeklyPlatformChart({ weeklyPlatformActivity }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Weekly Platform Activity</h2>

          <p className="text-gray-500 text-sm mt-1">
            Users, Blogs & Comments this week
          </p>
        </div>
      </div>

      <div className="h-[330px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyPlatformActivity}
            barGap={6}
            barCategoryGap="20%"
            margin={{
              top: 10,
              right: 10,
              left: -15,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis dataKey="day" tickLine={false} axisLine={false} />

            <YAxis tickLine={false} axisLine={false} />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="users"
              fill="#8B5CF6"
              radius={[8, 8, 0, 0]}
              maxBarSize={16}
            />

            <Bar
              dataKey="blogs"
              fill="#3B82F6"
              radius={[8, 8, 0, 0]}
              maxBarSize={16}
            />

            <Bar
              dataKey="comments"
              fill="#22C55E"
              radius={[8, 8, 0, 0]}
              maxBarSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeeklyPlatformChart;

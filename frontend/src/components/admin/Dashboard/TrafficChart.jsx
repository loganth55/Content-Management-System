import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function TrafficChart({ trafficOverview }) {

console.log(trafficOverview);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Platform Traffic Overview</h2>

          <p className="text-gray-500 text-sm mt-1">Blogs created this week</p>
        </div>

        <select className="border rounded-lg px-3 py-2 text-sm outline-none">
          <option>Last 7 Days</option>
        </select>
      </div>

      <div className="h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trafficOverview}
            margin={{
              top: 10,
              right: 20,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6D5DFC" stopOpacity={0.35} />

                <stop offset="100%" stopColor="#6D5DFC" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />

            <XAxis dataKey="_id" tickLine={false} axisLine={false} />

            <YAxis tickLine={false} axisLine={false} />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="blogs"
              stroke="#6D5DFC"
              strokeWidth={3}
              fill="url(#trafficGradient)"
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "#fff",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TrafficChart;

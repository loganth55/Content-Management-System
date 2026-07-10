import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function MonthlyChart({ monthlyBlogs }) {
  return (
    <div className="h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyBlogs}
          margin={{
            top: 20,
            right: 20,
            left: -20,
            bottom: 10,
          }}
          barCategoryGap="35%"
          barGap={6}
        >
          <defs>
            <linearGradient id="publishedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F8BFF" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>

            <linearGradient id="draftGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDBA74" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="#29466C"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="month"
            tick={{
              fill: "#CBD5E1",
              fontSize: 13,
            }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tick={{
              fill: "#94A3B8",
              fontSize: 13,
            }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            cursor={{
              fill: "rgba(255,255,255,.03)",
            }}
            contentStyle={{
              background: "#08111F",
              border: "1px solid #2E4D78",
              borderRadius: "18px",
              color: "white",
            }}
          />

          <Bar
            dataKey="published"
            fill="url(#publishedGradient)"
            radius={[12, 12, 0, 0]}
            maxBarSize={16}
            animationDuration={1400}
          />
          <Bar
            dataKey="drafts"
            fill="url(#draftGradient)"
            radius={[12, 12, 0, 0]}
            maxBarSize={16}
            animationDuration={1400}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyChart;

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#7C3AED", "#2563EB", "#22C55E", "#F97316"];

function ContentDistribution({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full">
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Content Distribution</h2>

        <p className="text-sm text-gray-500 mt-1">Platform data overview</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Donut */}

        <div className="relative w-56 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={4}
                stroke="white"
                strokeWidth={3}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Center */}

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold">{total}</h2>

            <p className="text-gray-500 text-sm">Total</p>
          </div>
        </div>

        {/* Legend */}

        <div className="flex-1 space-y-5 w-full">
          {data.map((item, index) => (
            <div key={item.name} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: COLORS[index],
                  }}
                />

                <span className="text-gray-700">{item.name}</span>
              </div>

              <div className="text-right">
                <p className="font-semibold">{item.value}</p>

                <p className="text-xs text-gray-400">
                  {((item.value / total) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContentDistribution;

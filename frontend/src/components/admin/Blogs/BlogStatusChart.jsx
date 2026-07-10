import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "#8B5CF6", // Purple - Total
  "#22C55E", // Green - Published
  "#F59E0B", // Orange - Draft
];
function BlogStatusChart({ data = [], totalBlogs }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-bold">Blog Status</h2>

      <p className="text-gray-500 text-sm mb-6">Published vs Draft Blogs</p>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h2 className="text-3xl font-bold">{totalBlogs}</h2>

          <p className="text-sm text-gray-500">Total Blogs</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5 space-y-3">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />
              <span>{item.name}</span>
            </div>

            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogStatusChart;

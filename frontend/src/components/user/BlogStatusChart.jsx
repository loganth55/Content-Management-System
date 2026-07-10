import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function BlogStatusChart({ totalPublished, totalDrafts }) {
  const total = totalPublished + totalDrafts;

  const data = [
    {
      name: "Published",
      value: totalPublished,
    },
    {
      name: "Drafts",
      value: totalDrafts,
    },
  ];

  const COLORS = ["#4F8BFF", "#F59E0B"];

  const publishedPercentage =
    total === 0 ? 0 : ((totalPublished / total) * 100).toFixed(1);

  const draftPercentage =
    total === 0 ? 0 : ((totalDrafts / total) * 100).toFixed(1);

  return (
    <div className="w-100% bg-gradient-to-br from-[#13284B] to-[#0E203B] rounded-3xl border border-[#274774] p-8">
      {/* Header */}

      <h2 className="w-100% text-2xl font-bold text-white">Blog Status</h2>

      <p className="text-slate-400 mt-1">Distribution of your blog status</p>

      {/* Chart */}

      <div className="mt-10 flex flex-col xl:flex-row items-center xl:items-center gap-10">
        {/* Donut */}
        <div className="flex justify-center flex-shrink-0">
          <ResponsiveContainer width="180" height={180}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={70}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((item, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <text
                x="50%"
                y="47%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="34"
                fontWeight="700"
              >
                {total}
              </text>

              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#94A3B8"
                fontSize="14"
              >
                Total Blogs
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col w-full gap-8">
          <div className="flex items-center">
            <div className="flex items-center gap-3 w-40">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>

              <span className="text-white text-lg">Published</span>
            </div>

            <span className="text-white font-semibold whitespace-nowrap">
              {totalPublished} ({publishedPercentage}%)
            </span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-3 w-40">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>

              <span className="text-white text-lg">Drafts</span>
            </div>

            <span className="text-white font-semibold whitespace-nowrap">
              {totalDrafts} ({draftPercentage}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogStatusChart;

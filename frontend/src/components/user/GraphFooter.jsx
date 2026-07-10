import { TrendingUp, Target, MessageCircle } from "lucide-react";
function GraphFooter({ monthlyBlogs, totalPublished, totalComments }) {
  // Find the month with the highest total blogs
  const mostActiveMonth =
    monthlyBlogs.length > 0
      ? monthlyBlogs.reduce((prev, current) =>
          prev.blogs > current.blogs ? prev : current,
        ).month
      : "N/A";

  return (
    <div className="grid grid-cols-3 gap-6 mt-8 border-t border-[#274774] pt-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-500/15 flex items-center justify-center">
          <TrendingUp className="w-7 h-7 text-blue-400" />
        </div>

        <div>
          <p className="text-slate-400 text-sm">Most Active Month</p>

          <h3 className="text-3xl font-bold text-white">
            {mostActiveMonth || "N/A"}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-green-500/15 flex items-center justify-center">
          <Target className="w-7 h-7 text-green-400" />
        </div>

        <div>
          <p className="text-slate-400 text-sm">Total Published</p>

          <h3 className="text-3xl font-bold text-white">{totalPublished}</h3>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-orange-500/15 flex items-center justify-center">
          <MessageCircle className="w-7 h-7 text-orange-400" />
        </div>

        <div>
          <p className="text-slate-400 text-sm">Total Comments</p>

          <h3 className="text-3xl font-bold text-white">{totalComments}</h3>
        </div>
      </div>
    </div>
  );
}

export default GraphFooter;


import CreatorMonthlyChart from "./CreatorMonthlyChart";


function CreatorGraph({ 
  monthlyBlogs,
  selectedYear,
  setSelectedYear,
  totalPublished,
  totalComments,
}) {
  return (
    <div className="bg-gradient-to-br from-[#13284B] to-[#0E203B] border border-[#274774] rounded-3xl p-8 min-h-[720px] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Publishing Activity</h2>

          <p className="text-slate-400 mt-1">Monthly published blogs</p>
        </div>
      </div>

      <CreatorMonthlyChart monthlyBlogs={monthlyBlogs} />
    </div>
  );
}

export default CreatorGraph;

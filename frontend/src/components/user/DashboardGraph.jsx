import GraphHeader from "./GraphHeader";
import GraphLegend from "./GraphLegend";
import MonthlyChart from "./MonthlyChart";
import GraphFooter from "./GraphFooter";

function DashboardGraph({
  monthlyBlogs,
  selectedYear,
  setSelectedYear,
  totalPublished,
  totalComments,
}) {
  return (
    <div className="bg-gradient-to-br from-[#13284B] to-[#0E203B] border border-[#274774] rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <GraphHeader
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      <GraphLegend />

      <MonthlyChart monthlyBlogs={monthlyBlogs} />

      <GraphFooter
        monthlyBlogs={monthlyBlogs}
        totalPublished={totalPublished}
        totalComments={totalComments}
      />
    </div>
  );
}

export default DashboardGraph;

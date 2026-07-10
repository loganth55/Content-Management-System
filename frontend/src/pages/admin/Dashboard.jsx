import { useEffect, useState } from "react";
import DashboardCard from "../../components/admin/Dashboard/DashboardCard";
import TrafficChart from "../../components/admin/Dashboard/TrafficChart";
import WeeklyPlatformChart from "../../components/admin/Dashboard/WeeklyPlatformChart";
import CategoryChart from "../../components/admin/Dashboard/CategoryChart";
import ActivityFeed from "../../components/admin/Dashboard/ActivityFeed";
import ContentDistribution from "../../components/admin/Dashboard/ContentDistribution";
import { getDashboardData } from "../../services/adminDashboardApi";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

const fetchDashboard = async () => {
  try {
    const response = await getDashboardData();

    console.log("API Response:", response);

    setDashboard(response.data);
    console.log(dashboard);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

if (loading || !dashboard) {
  return (
    <div className="flex justify-center items-center h-screen">Loading...</div>
  );
}
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Welcome back, Admin 👋</h1>

        <p className="text-gray-500 mt-1">
          Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Cards */}

      <DashboardCard cards={dashboard.cards} />

      {/* Traffic + Categories */}

      {/* Traffic Overview */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TrafficChart trafficOverview={dashboard.trafficOverview} />
        </div>

        <ContentDistribution data={dashboard.contentDistribution} />
      </div>
      {/* Bottom Section */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <WeeklyPlatformChart
            weeklyPlatformActivity={dashboard.weeklyPlatformActivity}
          />
        </div>

        <div className="xl:col-span-1">
          <CategoryChart topCategories={dashboard.topCategories} />
        </div>

        <div className="xl:col-span-1">
          <ActivityFeed recentActivity={dashboard.recentActivity} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

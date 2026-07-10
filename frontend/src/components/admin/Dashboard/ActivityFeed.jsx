import { UserPlus, FileText } from "lucide-react";

function ActivityFeed({ recentActivity }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-full">
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-xl font-bold">Recent Activity</h2>

        <p className="text-gray-500 text-sm mt-1">
          Latest actions on the platform
        </p>
      </div>

      {/* Activity List */}

      <div className="space-y-5">
        {recentActivity.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">
            {/* Icon */}

            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center
              ${activity.type === "user" ? "bg-blue-100" : "bg-green-100"}`}
            >
              {activity.type === "user" ? (
                <UserPlus className="text-blue-600" size={18} />
              ) : (
                <FileText className="text-green-600" size={18} />
              )}
            </div>

            {/* Message */}

            <div className="flex-1">
              <p className="text-sm font-medium">{activity.message}</p>

              <p className="text-xs text-gray-500 mt-1">
                {activity.createdAt
                  ? new Date(activity.createdAt).toLocaleString()
                  : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;

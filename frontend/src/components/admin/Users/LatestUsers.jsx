import { User } from "lucide-react";

function LatestUsers({ users }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Latest Users</h2>

        <p className="text-sm text-gray-500 mt-1">Recently joined members</p>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                <User size={20} className="text-indigo-600" />
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold truncate">{user.name}</h3>

                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
            </div>

            <span className="text-xs text-gray-400 shrink-0">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestUsers;

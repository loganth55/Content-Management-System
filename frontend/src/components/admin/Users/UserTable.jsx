import { Trash2, ShieldCheck, ShieldOff } from "lucide-react";

function UsersTable({ users, onDelete, onToggleStatus }) {
  console.log("Table Users:", users);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}

      <div className="px-6 py-5 border-b">
        <h2 className="text-xl font-semibold">Users List</h2>

        <p className="text-sm text-gray-500 mt-1">Manage registered users</p>
      </div>

      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-[900px] w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">User</th>

              <th className="text-left px-6 py-4 font-semibold">Role</th>

              <th className="text-left px-6 py-4 font-semibold">Status</th>

              <th className="text-left px-6 py-4 font-semibold">
                Profile Views
              </th>

              <th className="text-center px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* User */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 min-w-[220px]">
                      <div className="w-11 h-11 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {user.name}
                        </h3>

                        <p className="text-sm text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.isBlocked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  {/* Profile Views */}

                  <td className="px-6 py-4 font-medium">{user.profileViews}</td>

                  {/* Actions */}

                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => onToggleStatus(user._id)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                          user.isBlocked
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          {user.isBlocked ? (
                            <>
                              <ShieldCheck size={16} />
                              Unblock
                            </>
                          ) : (
                            <>
                              <ShieldOff size={16} />
                              Block
                            </>
                          )}
                        </div>
                      </button>

                      <button
                        onClick={() => onDelete(user._id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-16">
                  <h2 className="text-xl font-semibold text-gray-700">
                    No users found
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Try changing your search or filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;

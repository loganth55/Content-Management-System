import { Search } from "lucide-react";

function UserFilters({ search, setSearch, role, setRole, status, setStatus }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}

        <div className="relative md:col-span-2">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Role */}

        <select
          value={role}
          onChange={(e) => {
            console.log("Role Changed:", e.target.value);
            setRole(e.target.value);
          }}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => {
            console.log("Status Changed:", e.target.value);
            setStatus(e.target.value);
          }}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
    </div>
  );
}

export default UserFilters;

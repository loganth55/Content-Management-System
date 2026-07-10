import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  toggleUserStatus,
} from "../../services/usersApi";

import UserCards from "../../components/admin/Users/UserCards";
import MonthlyGrowth from "../../components/admin/Users/MonthlyGrowth";
import LatestUsers from "../../components/admin/Users/LatestUsers";
import UserFilters from "../../components/admin/Users/UserFilters";
import UserTable from "../../components/admin/Users/UserTable";
import Pagination from "../../components/admin/Users/Pagination";

function Users() {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("");

  const [status, setStatus] = useState("");

  console.log({
    page,
    search,
    role,
    status,
  });

useEffect(() => {
  fetchUsers();
}, [page, search, role, status]);


  const fetchUsers = async () => {
    try {
      console.log("Fetching with:", {
        page,
        search,
        role,
        status,
      });

     const response = await getUsers(page, search, role, status);
       console.log("Sending:", {
         page,
         search,
         role,
         status,
       });
     console.log("Users returned:", response.data.users);

     setData(response.data);
     
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteUser(id);

      alert(response.message);

      fetchUsers();
    } catch (error) {
      console.log(error.response);

      alert("Failed to update blog status.");
    }
  };


const handleToggleStatus = async (id) => {
  const confirmStatus = window.confirm(
    "Are you sure you want to change the blog status?",
  );

  if (!confirmStatus) return;

  try {
    const response = await toggleBlogStatus(id);

    alert(response.message);

    fetchBlogs();
  } catch (error) {
    console.log(error);

    alert("Failed to update blog status.");
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Users Management</h1>

        <p className="text-gray-500 mt-1">Manage all registered users.</p>
      </div>

      {/* Cards */}

      <UserCards cards={data?.cards} />

      {/* Main Section */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left */}

        <div className="xl:col-span-2 space-y-6">
          <UserFilters
            search={search}
            setSearch={setSearch}
            role={role}
            setRole={setRole}
            status={status}
            setStatus={setStatus}
          />

          <UserTable
            users={data.users}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />

          <Pagination
            pagination={data.pagination}
            page={page}
            setPage={setPage}
          />
        </div>

        {/* Right */}

        <div className="space-y-6">
          <MonthlyGrowth data={data.monthlyUsersGrowth} />

          <LatestUsers users={data.latestUsers} />
        </div>
      </div>
    </div>
  );
}

export default Users;

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../components/admin/Sidebar";

function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Content */}
      <div className="flex-1">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between bg-white shadow-md p-4 sticky top-0 z-30">
          <button onClick={() => setIsOpen(true)}>
            <FiMenu size={26} />
          </button>

          <h1 className="text-xl font-bold">
            Blog<span className="text-blue-600">Admin</span>
          </h1>

          <div className="w-6"></div>
        </div>

        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

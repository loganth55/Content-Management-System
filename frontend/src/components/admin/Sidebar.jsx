import {
  FiGrid,
  FiUsers,
  FiFileText,
  FiFolder,
  FiMessageCircle,
  FiX,
} from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function Sidebar({ isOpen, setIsOpen }) {

const admin = JSON.parse(localStorage.getItem("user"));

const [showMenu, setShowMenu] = useState(false);

const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setShowMenu(false);

  navigate("/login", { replace: true });
};
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FiGrid />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FiUsers />,
    },
    {
      name: "Blogs",
      path: "/admin/blogs",
      icon: <FiFileText />,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <FiFolder />,
    },
  
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          z-50
          h-screen
          w-64
          bg-white
          border-r
          shadow-lg
          transition-transform
          duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-2xl font-bold">
            Blog<span className="text-blue-600">Admin</span>
          </h1>

          <button onClick={() => setIsOpen(false)} className="lg:hidden">
            <FiX size={24} />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-6 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
            >
              {item.icon}

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Profile */}
        {/* Profile */}
        {/* Profile */}
        <div className="border-t p-5 mt-auto">
          <button onClick={() => setShowMenu(!showMenu)} className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {admin?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)}
                </div>

                <div className="text-left">
                  <h2 className="font-semibold leading-5">{admin?.name}</h2>

                
                </div>
              </div>

              <span className="text-gray-500 text-lg">
                {showMenu ? "▲" : "▼"}
              </span>
            </div>
          </button>

          {showMenu && (
            <div className="mt-4 border-t pt-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition"
              >
                <FiLogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

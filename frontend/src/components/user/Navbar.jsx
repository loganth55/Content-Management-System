import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePostAdd } from "react-icons/md";
import { HiFolderOpen } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user") || "null");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900"></div>

              <h1 className="text-xl font-bold text-slate-900">Tech Blog</h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <Link to="/">Home</Link>
              <Link to="/blogs">Blogs</Link>
              <Link to="/categories">Categories</Link>
              <Link to="/bookmarks">Bookmarks</Link>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {token ? (
                <div className="relative">
                  {/* Profile Button */}
                  <div
                    onClick={() => setDropdown(!dropdown)}
                    className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 px-3 py-2 rounded-xl transition"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">
                      {user?.name?.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="hidden lg:flex flex-1 min-w-0 flex-col">
                      <span className="truncate text-sm font-semibold text-slate-800">
                        {user?.name?.split(" ")[0]}
                      </span>

                      <span className="truncate text-xs text-slate-500">
                        View Profile
                      </span>
                    </div>

                    <svg
                      className={`w-4 h-4 text-slate-500 transition-transform ${
                        dropdown ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Dropdown */}
                  {dropdown && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileProfileOpen(false);
                          }}
                          className="flex items-center gap-3 px-5 py-4 hover:bg-slate-100"
                        >
                          <CgProfile size={22} />
                          My Profile
                        </Link>

                        <Link
                          to="/create-post"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileProfileOpen(false);
                          }}
                          className="flex items-center gap-3 px-5 py-4 hover:bg-slate-100"
                        >
                          <MdOutlinePostAdd size={22} />
                          Write Blog
                        </Link>

                        <Link
                          to="/my-blogs"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileProfileOpen(false);
                          }}
                          className="flex items-center gap-3 px-5 py-4 hover:bg-slate-100"
                        >
                          <HiFolderOpen size={22} />
                          My Blogs
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50 border-t"
                        >
                          <IoLogOutOutline size={20} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <button className="text-sm font-medium text-slate-700">
                      Log in
                    </button>
                  </Link>

                  <Link to="/register">
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
            {/* Mobile Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {/* Mobile Drawer */}
      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="text-xl font-bold">Tech Blog</h2>

            <button onClick={() => setMobileMenuOpen(false)}>
              <X size={28} />
            </button>
          </div>

          <div className="p-5">
            {token && (
              <div className="mb-6">
                {/* Profile Card */}
                <div
                  onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold text-lg">
                      {user?.name?.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {user?.name}
                      </h3>
                    </div>
                  </div>

                  <svg
                    className={`w-5 h-5 transition-transform ${
                      mobileProfileOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Dropdown */}

                {mobileProfileOpen && (
                  <div className="mt-3 bg-white rounded-2xl border overflow-hidden shadow">
                    <Link
                      to="/profile"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileProfileOpen(false);
                      }}
                      className="flex items-center gap-3 px-5 py-4 hover:bg-slate-100"
                    >
                      <CgProfile size={22} />
                      My Profile
                    </Link>

                    <Link
                      to="/create-post"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileProfileOpen(false);
                      }}
                      className="flex items-center gap-3 px-5 py-4 hover:bg-slate-100"
                    >
                      <MdOutlinePostAdd size={22} />
                      Write Blog
                    </Link>

                    <Link
                      to="/my-blogs"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileProfileOpen(false);
                      }}
                      className="flex items-center gap-3 px-5 py-4 hover:bg-slate-100"
                    >
                      <HiFolderOpen size={22} />
                      My Blogs
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50 border-t"
                    >
                      <IoLogOutOutline size={20} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Navigation */}
            <div className="flex flex-col gap-6 text-lg">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>

              <Link to="/blogs" onClick={() => setMobileMenuOpen(false)}>
                Blogs
              </Link>

              <Link to="/categories" onClick={() => setMobileMenuOpen(false)}>
                Categories
              </Link>

              <Link to="/bookmarks" onClick={() => setMobileMenuOpen(false)}>
                Bookmarks
              </Link>
            </div>

            {/* Bottom Buttons */}
            {!token && (
              <div className="mt-10 grid grid-cols-2 gap-3">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full border border-slate-300 py-3 rounded-xl font-semibold hover:bg-slate-100 transition">
                    Login
                  </button>
                </Link>

                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

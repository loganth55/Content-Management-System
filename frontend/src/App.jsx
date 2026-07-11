import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

// Route Protection
import ProtectedAdminRoute from "./pages/admin/ProtectedAdminRoute";
import ProtectedRoute from "./pages/user/ProtectedRoute";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Blog from "./pages/admin/Blog";
import AdminCategory from "./pages/admin/AdminCategory";

// User Pages
import Home from "./pages/user/Home";
import Blogs from "./pages/user/Blogs";
import BlogDetails from "./pages/user/BlogDetails";
import Category from "./pages/user/Category";
import CategoryBlogs from "./pages/user/CategoryBlogs";
import CreatePost from "./pages/user/CreatePost";
import MyBlogs from "./pages/user/MyBlogs";
import UserEditBlog from "./pages/user/UserEditBlog";
import Profile from "./pages/user/Profile";
import Bookmarks from "./pages/user/Bookmarks";
import CreatorProfile from "./pages/user/CreatorProfile";

// Auth Pages
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="categories" element={<AdminCategory />} />
        </Route>

        {/* ================= USER ROUTES ================= */}

        <Route element={<UserLayout />}>
          <Route
            path="/"
            element={
            
                <Home />
          
            }
          />

          <Route
            path="/blogs"
            element={
              
                <Blogs />
            
            }
          />

          <Route
            path="/blog/:id"
            element={
            
                <BlogDetails />
            
            }
          />

          <Route
            path="/categories"
            element={
          
                <Category />
          
            }
          />

          <Route
            path="/category/:categoryName"
            element={
            
                <CategoryBlogs />
    
            }
          />

          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-blogs"
            element={
              <ProtectedRoute>
                <MyBlogs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editpost/:id"
            element={
              <ProtectedRoute>
                <UserEditBlog />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <CreatorProfile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ================= AUTH ROUTES ================= */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;

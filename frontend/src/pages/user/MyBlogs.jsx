import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMyBlogs } from "../../services/blogApi";

function MyBlogs(){

    const IMAGE_BASE_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [myBlogs, setMyBlogs] = useState([]);
  
    useEffect(()=>{
    const fetchMyBlogs = async()=>{
      try {
        
        const data = await getMyBlogs()
        setMyBlogs(data)
        console.log(data)
        console.log(setMyBlogs)
     }
       catch (err) {
        console.log("Error fetching blogs:", err);
      }
    }
    fetchMyBlogs()
    },[])
     
   
   return (
     <div className="min-h-screen bg-slate-100 py-10">
       <div className="max-w-7xl mx-auto px-6">
         {/* Header */}
         <div className="flex items-center justify-between mb-10">
           <div>
             <h1 className="text-4xl font-bold text-slate-900">My Blogs</h1>

             <p className="text-slate-500 mt-2">
               Manage all your published blogs
             </p>
           </div>

           <button
             onClick={() => navigate("/create-post")}
             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
           >
             + Create Blog
           </button>
         </div>

         {myBlogs.length === 0 ? (
           <div className="bg-white rounded-3xl border p-16 text-center">
             <div className="text-6xl mb-4">📝</div>

             <h2 className="text-3xl font-bold">No Blogs Found</h2>

             <p className="text-slate-500 mt-3 mb-8">
               Start writing your first blog.
             </p>

             <button
               onClick={() => navigate("/create-post")}
               className="bg-blue-600 text-white px-6 py-3 rounded-xl"
             >
               Create First Blog
             </button>
           </div>
         ) : (
           <div className="hidden md:block bg-white rounded-3xl shadow overflow-hidden">
             {/* Header */}
             <div className="grid grid-cols-12 bg-slate-100 px-6 py-4 font-semibold">
               <div className="col-span-5">Blog</div>
               <div className="col-span-2 text-center">Category</div>
               <div className="col-span-1 text-center">Status</div>
               <div className="col-span-2 text-center">Date</div>
               <div className="col-span-2 text-center">Actions</div>
             </div>

             {myBlogs.map((item) => (
               <div
                 key={item._id}
                 className="grid grid-cols-12 items-center gap-4 px-6 py-5 border-b hover:bg-slate-50 transition"
               >
                 {/* Blog */}
                 <div className="col-span-5 flex items-center gap-4">
                   <img
                     src={`${IMAGE_BASE_URL}${item.img}`}
                     alt={item.title}
                     className="w-28 h-20 rounded-xl object-cover"
                   />

                   <div>
                     <h2 className="font-semibold text-slate-900 text-lg line-clamp-1">
                       {item.title}
                     </h2>

                     <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                       {item.description}
                     </p>
                   </div>
                 </div>

                 {/* Category */}
                 <div className="col-span-2 flex justify-center">
                   <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                     {item.category}
                   </span>
                 </div>

                 {/* Status */}
                 <div className="col-span-1 flex justify-center">
                   <span
                     className={`px-3 py-1 rounded-full text-sm font-medium ${
                       item.status === "Published"
                         ? "bg-green-100 text-green-700"
                         : "bg-yellow-100 text-yellow-700"
                     }`}
                   >
                     {item.status}
                   </span>
                 </div>

                 {/* Date */}
                 <div className="col-span-2 text-center text-slate-500 text-sm">
                   {new Date(item.createdAt).toLocaleDateString("en-GB", {
                     day: "numeric",
                     month: "short",
                     year: "numeric",
                   })}
                 </div>

                 {/* Actions */}
                 <div className="col-span-2 flex justify-center gap-3">
                   <button
                     onClick={() => navigate(`/blog/${item._id}`)}
                     className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-100 transition font-medium"
                   >
                     👁 View
                   </button>

                   <button
                     onClick={() => navigate(`/editpost/${item._id}`)}
                     className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-yellow-100 transition font-medium"
                   >
                     ✏ Edit
                   </button>
                 </div>
               </div>
             ))}
           </div>
         )}
       </div>
       <div className="md:hidden space-y-5">
         {myBlogs.map((item) => (
           <div
             key={item._id}
             className="bg-white rounded-2xl shadow border overflow-hidden"
           >
             <img
               src={`${IMAGE_BASE_URL}${item.img}`}
               alt={item.title}
               className="w-full h-48 object-cover"
             />

             <div className="p-5">
               <div className="flex justify-between items-center mb-3">
                 <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                   {item.category}
                 </span>

                 <span
                   className={`px-3 py-1 rounded-full text-sm ${
                     item.status === "Published"
                       ? "bg-green-100 text-green-700"
                       : "bg-yellow-100 text-yellow-700"
                   }`}
                 >
                   {item.status}
                 </span>
               </div>

               <h2 className="text-xl font-bold mb-2">{item.title}</h2>

               <p className="text-slate-500 line-clamp-2 mb-4">
                 {item.description}
               </p>

               <p className="text-sm text-slate-400 mb-5">
                 {new Date(item.createdAt).toLocaleDateString()}
               </p>

               <div className="flex gap-3">
                 <button
                   onClick={() => navigate(`/blog/${item._id}`)}
                   className="flex-1 bg-slate-100 py-3 rounded-xl hover:bg-blue-100"
                 >
                   👁 View
                 </button>

                 <button
                   onClick={() => navigate(`/editpost/${item._id}`)}
                   className="flex-1 bg-slate-100 py-3 rounded-xl hover:bg-yellow-100"
                 >
                   ✏ Edit
                 </button>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   );
}
export default MyBlogs
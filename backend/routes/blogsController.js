const Blog = require("../model/schema");

const getBlogs = async(req,res)=>{
    try{
        const totalBlogs = await Blog.countDocuments()
        const publishedBlogs = await Blog.countDocuments(
            {
                status:"Published"
            }
        )
        const draftBlogs =  await Blog.countDocuments({
            status:"Draft"
        })
        const today = new Date()
        const last7Days = new Date()
        last7Days.setDate(today.getDate()-7)
        last7Days.setHours(0, 0, 0, 0);
        const weeklyPublishedBlogs = await Blog.countDocuments({
            publishedAt:{
                $gte:last7Days,
            }
        })

          const TOTAL_BLOG_TARGET = 2000;
          const PUBLISHED_BLOG_TARGET = 1800;
          const DRAFT_BLOG_TARGET = 10;
          const RECENT_BLOG_TARGET = 1000;

          const totalBlogGrowth = Number((totalBlogs/TOTAL_BLOG_TARGET)*100).toFixed(1)
          const publishedBlogGrowth = Number((publishedBlogs/PUBLISHED_BLOG_TARGET)*100).toFixed(1)
          const draftBlogGrowth = Number((draftBlogs/DRAFT_BLOG_TARGET)*100).toFixed(1)
          const weeklyPublishedBlogGrowth = Number((weeklyPublishedBlogs/RECENT_BLOG_TARGET)*100).toFixed(1)

          const blogTrend = await Blog.aggregate([

                 {
                    $match:{
                        publishedAt:{
                            $gte:last7Days,
                        }
                    }
                 },
                 {
        $group: {
          _id: {
            $dayOfWeek: "$publishedAt",
          },
          blogs: {
            $sum: 1,
          },
        },
      },

          ])
            const trend = Array(7).fill(0);

        blogTrend.forEach((item) => {
              trend[item._id - 1] = item.blogs;
            });


        const cards = {
          totalBlogs,
          publishedBlogs,
          draftBlogs,
          weeklyPublishedBlogs,

          totalBlogGrowth,
          publishedBlogGrowth,
          draftBlogGrowth,
          weeklyPublishedBlogGrowth,

          totalBlogTrend: trend,
          publishedBlogTrend: trend,
          draftBlogTrend: trend,
          weeklyPublishedBlogTrend: trend,
        };
         const weeklyBlogsGrowth = await Blog.aggregate([
           {
             $match: {
               publishedAt: {
                 $gte: last7Days,
               },
             },
           },
           {
             $group: {
               _id: {
                 $dayOfWeek: "$publishedAt",
               },
               blogs: {
                 $sum: 1,
               },
             },
           },
         ]);
        const days = ["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const formattedWeeklyBlogsGrowth = days
            .slice(1)
            .map((day, index) => {
              const data = weeklyBlogsGrowth.find(
                (item) => item._id === index + 1,
              );

              return {
                day,
                blogs: data ? data.blogs : 0,
              };
            });

                     const blogList = await Blog.find()
                       .sort({
                         createdAt: -1,
                       })
                       .limit(5)
                       .select("title author category status createdAt");

         const page = Number(req.query.page) || 1;

         const limit = 6;

         const skip = (page - 1) * limit;

         const search = req.query.search || "";

        const status = req.query.status || "";

        const category = req.query.category || "";

  const filter = {};
  const andConditions = [];
  if (search) {
    andConditions.push({
      $or: [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          author: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    });
  }


   if (status) {
     andConditions.push({
       status,
     });
   }

       if (category) {
         andConditions.push({
           category,
         });
       }
        if (andConditions.length > 0) {
          filter.$and = andConditions;
        }

    const blogs = await Blog.find(filter)
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

         const total = await Blog.countDocuments(filter)
         
         const pagination = {
           currentPage: page,
           totalPages: Math.ceil(total / limit),
           totalBlogs: total,
           hasNextPage: page < Math.ceil(total / limit),
           hasPrevPage: page > 1,
         };


                     const blogStatus = [
                       {
                         name: "Total",
                         value: totalBlogs,
                       },
                       {
                         name: "Published",
                         value: publishedBlogs,
                       },
                       {
                         name: "Draft",
                         value: draftBlogs,
                       },
                     ];

        res.status(200).json({
          success: true,
          message: "blogs fetched successfully.",
          data: {
            cards,
            weeklyBlogsGrowth: formattedWeeklyBlogsGrowth,
            blogList,
            blogStatus,
            pagination,
            blogs
          },
        });




    }
    catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

  const deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;

      const blog = await Blog.findById(id);

      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found.",
        });
      }

      await Blog.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Blog deleted successfully.",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  const toggleBlogStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }
    blog.status = blog.status === "Published" ? "Draft" : "Published";
    await blog.save();
    return res.status(200).json({
      success: true,
      message:
        blog.status === "Published"
          ? "Blog published successfully."
          : "Blog moved to draft successfully.",
      data: blog,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  getBlogs,
  deleteBlog,
  toggleBlogStatus,
};
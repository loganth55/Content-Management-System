const User = require("../model/userSchema");

const getUsers = async (req, res) => {
  try {
    // ==========================================
    // USER CARDS
    // ==========================================

    const totalUsers = await User.countDocuments();

    const activeUsers = await User.countDocuments({
      $or: [{ isBlocked: false }, { isBlocked: { $exists: false } }],
    });

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const newUsers = await User.countDocuments({
      createdAt: {
        $gte: startOfMonth,
      },
    });

  const USER_TARGET = 2000;
  const ACTIVE_USER_TARGET = 1800;
  const NEW_USER_TARGET = 200;

  const today = new Date();

  const last7Days = new Date();
  last7Days.setDate(today.getDate() - 7);
    
  const totalUsersGrowth = Number(
    ((totalUsers / USER_TARGET) * 100).toFixed(1),
  );

  const activeUsersGrowth = Number(
    ((activeUsers / ACTIVE_USER_TARGET) * 100).toFixed(1),
  );

  const newUsersGrowth = Number(
    ((newUsers / NEW_USER_TARGET) * 100).toFixed(1),
  );

    const userTrend = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: last7Days,
          },
        },
      },
      {
        $group: {
          _id: {
            $dayOfWeek: "$createdAt",
          },
          users: {
            $sum: 1,
          },
        },
      },
    ]);

    const trend = Array(7).fill(0);

    userTrend.forEach((item) => {
      trend[item._id - 1] = item.users;
    });

    const cards = {
      totalUsers,
      activeUsers,
      newUsers,

      totalUsersGrowth,
      activeUsersGrowth,
      newUsersGrowth,

      totalUsersTrend: trend,
      activeUsersTrend: trend,
      newUsersTrend: trend,
    };

    const monthlyUsersGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          users: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const months = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedMonthlyUsersGrowth = months.slice(1).map((month, index) => {
      const data = monthlyUsersGrowth.find((item) => item._id === index + 1);

      return {
        month,
        users: data ? data.users : 0,
      };
    });

    const latestUsers = await User.find()
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .select("name email role createdAt");

    const page = Number(req.query.page) || 1;

    const limit = 10;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const role = req.query.role || "";

    const status = req.query.status || "";

    console.log("Query:", req.query);
    console.log("Search:", search);
    console.log("Role:", role);
    console.log("Status:", status);

    const filter = {};
    const andConditions = [];

    // Search
    if (search) {
      andConditions.push({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      });
    }

    // Role
    if (role === "user") {
      andConditions.push({
        $or: [{ role: "user" }, { role: { $exists: false } }],
      });
    }

    if (role === "admin") {
      andConditions.push({
        role: "admin",
      });
    }

    // Status
    if (status === "active") {
      andConditions.push({
        $or: [{ isBlocked: false }, { isBlocked: { $exists: false } }],
      });
    }

    if (status === "blocked") {
      andConditions.push({
        isBlocked: true,
      });
    }

    if (andConditions.length > 0) {
      filter.$and = andConditions;
    }
    // ==========================================
    // USERS TABLE
    // ==========================================

    console.log("Filter:", filter);

    const allUsers = await User.find();

    console.log(
      allUsers.map((u) => ({
        name: u.name,
        role: JSON.stringify(u.role),
        isBlocked: u.isBlocked,
      })),
    );

    console.log("Collection:", User.collection.name);
    console.log("Filter:", JSON.stringify(filter));

    const test1 = await User.find({ role: "user" });
    console.log("find({ role: 'user' }):", test1.length);

    const test2 = await User.find({ isBlocked: false });
    console.log("find({ isBlocked: false }):", test2.length);

    const test3 = await User.find({
      role: "user",
      isBlocked: false,
    });
    console.log("find({ role: 'user', isBlocked: false }):", test3.length);

    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-password");

    console.log("Final users:", users.length);

    console.log("Users Found:", users.length);

    const total = await User.countDocuments(filter);

    // ==========================================
    // PAGINATION
    // ==========================================

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    };

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      data: {
        cards,
        monthlyUsersGrowth: formattedMonthlyUsersGrowth,
        latestUsers,
        users,
        pagination,
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
};

  
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot be deleted",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot be blocked.",
      });
    }

    user.isBlocked = !user.isBlocked;

    await user.save();

    return res.status(200).json({
      success: true,
      message: user.isBlocked
        ? "User blocked successfully."
        : "User unblocked successfully.",
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getUsers,

  deleteUser,
  toggleUserStatus,
  
};


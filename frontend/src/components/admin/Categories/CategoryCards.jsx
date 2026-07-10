import { FolderKanban, CheckCircle, BookOpen, TrendingUp } from "lucide-react";

function CategoryCards({ cards }) {
  const data = [
    {
      title: "Total Categories",
      value: cards.totalCategories,
      growth: cards.totalCategoryGrowth,
      icon: FolderKanban,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Active Categories",
      value: cards.activeCategories,
      growth: cards.activeCategoryGrowth,
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Blogs Assigned",
      value: cards.blogsAssigned,
      growth: cards.blogsAssignedGrowth,
      icon: BookOpen,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>

                <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
              </div>

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.iconBg}`}
              >
                <Icon className={`${item.iconColor}`} size={28} />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6">
              <TrendingUp size={18} className="text-green-600" />

              <span className="text-green-600 font-semibold">
                {item.growth}%
              </span>

              <span className="text-gray-500 text-sm">vs target</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryCards;

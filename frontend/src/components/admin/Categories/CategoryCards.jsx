
import * as CountUpModule from "react-countup";
import { FolderKanban, CheckCircle, BookOpen, TrendingUp } from "lucide-react";

function CategoryCards({ cards }) {

  const CountUp = CountUpModule.default.default;
   console.log(CountUp);
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
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {data.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="w-full min-w-0 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 lg:p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">{item.title}</p>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2">
                  <CountUp end={item.value} duration={2} separator="," />
                </h2>
              </div>

              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center ${item.iconBg}`}
              >
                <Icon className={item.iconColor} size={20} />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-4 sm:mt-5">
              <TrendingUp size={18} className="text-green-600" />

              <span className="text-green-600 font-semibold text-sm sm:text-base">
                {item.growth}%
              </span>

              <span className="text-gray-500 text-xs sm:text-sm">
                vs target
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryCards;

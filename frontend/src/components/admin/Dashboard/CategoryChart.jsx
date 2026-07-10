function CategoryChart({ topCategories }) {
  const colors = [
    "bg-violet-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-pink-500",
  ];

  const maxValue = Math.max(...topCategories.map((item) => item.blogs));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-semibold">Top 5 Categories</h2>

          <p className="text-sm text-gray-500 mt-1">
            Most published categories
          </p>
        </div>

        
      </div>

      {/* Categories */}

      <div className="space-y-7">
        {topCategories.map((item, index) => (
          <div key={item.category}>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-700 font-medium">{item.category}</p>

              <p className="font-semibold">{item.blogs}</p>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className={`${colors[index]} h-2.5 rounded-full transition-all duration-700`}
                style={{
                  width: `${(item.blogs / maxValue) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryChart;

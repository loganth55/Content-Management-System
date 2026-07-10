function Pagination({ pagination, page, setPage }) {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between bg-white border rounded-2xl p-5 shadow-sm">
      {/* Left */}
      <p className="text-sm text-gray-500">
        Showing page{" "}
        <span className="font-semibold text-gray-700">
          {pagination.currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-700">
          {pagination.totalPages}
        </span>
      </p>

      {/* Right */}
      <div className="flex gap-3">
        <button
          onClick={() => setPage(page - 1)}
          disabled={!pagination.hasPrevPage}
          className={`px-5 py-2 rounded-lg font-medium transition
            ${
              pagination.hasPrevPage
                ? "bg-violet-600 text-white hover:bg-violet-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Previous
        </button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={!pagination.hasNextPage}
          className={`px-5 py-2 rounded-lg font-medium transition
            ${
              pagination.hasNextPage
                ? "bg-violet-600 text-white hover:bg-violet-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;

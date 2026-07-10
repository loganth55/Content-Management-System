function Pagination({ pagination, page, setPage }) {
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-4">
      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex gap-3">
        <button
          disabled={!hasPrevPage}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-lg border transition ${
            hasPrevPage ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Previous
        </button>

        <button
          disabled={!hasNextPage}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-lg border transition ${
            hasNextPage ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
